# V1Lookup entity test

require "minitest/autorun"
require "json"
require_relative "../FreeMusicApi2_sdk"
require_relative "runner"

class V1LookupEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = FreeMusicApi2SDK.test(nil, nil)
    ent = testsdk.V1Lookup(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "v1_lookup" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = FreeMusicApi2SDK.test(seed, nil).V1Lookup(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "v1_lookup" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = FreeMusicApi2SDK.test(seed, nil)
    seen = base.V1Lookup(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = FreeMusicApi2Config.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = FreeMusicApi2SDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.V1Lookup(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < FreeMusicApi2BaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "v1_lookup hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      FreeMusicApi2SDK.test(offline, nil).V1Lookup(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    FreeMusicApi2SDK.test(offline, nil).V1Lookup(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = FreeMusicApi2Config.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = FreeMusicApi2SDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.V1Lookup(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    FreeMusicApi2SDK.test(nil, nil).V1Lookup(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = FreeMusicApi2SDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.V1Lookup(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.V1Lookup(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate_list_response
    cfg = FreeMusicApi2Config.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    opts = { "feature" => { "validate" => { "active" => true, "request" => false, "response" => true } } }
    listed = FreeMusicApi2SDK.test({ "entity" => { "v1_lookup" => { "v1" => {  } } } }, opts).V1Lookup(nil).list(nil, nil)
    assert_equal ["v1"], listed.map { |ent| ent.data_get["id"] }
    err = assert_raises(StandardError) do
      FreeMusicApi2SDK.test({ "entity" => { "v1_lookup" => { "v1" => { "idAlbum" => "x" } } } }, opts).V1Lookup(nil).list(nil, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_validate
    cfg = FreeMusicApi2Config.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = FreeMusicApi2SDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.V1Lookup(nil).list({ "i" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = v1_lookup_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "v1_lookup." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    v1_lookup_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.v1_lookup")))
    v1_lookup_ref01_data = nil
    if v1_lookup_ref01_data_raw.length > 0
      v1_lookup_ref01_data = Helpers.to_map(v1_lookup_ref01_data_raw[0][1])
    end

    # LIST
    v1_lookup_ref01_ent = client.V1Lookup(nil)
    v1_lookup_ref01_match = {}

    v1_lookup_ref01_list_result = v1_lookup_ref01_ent.list(v1_lookup_ref01_match, nil)
    assert v1_lookup_ref01_list_result.is_a?(Array)

  end
end

def v1_lookup_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "v1_lookup", "V1LookupTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FreeMusicApi2SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["v1_lookup01", "v1_lookup02", "v1_lookup03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["FREE_MUSIC_API2_TEST_V1_LOOKUP_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FREE_MUSIC_API2_TEST_V1_LOOKUP_ENTID" => idmap,
    "FREE_MUSIC_API2_TEST_LIVE" => "FALSE",
    "FREE_MUSIC_API2_TEST_EXPLAIN" => "FALSE",
    "FREE_MUSIC_API2_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["FREE_MUSIC_API2_TEST_V1_LOOKUP_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FREE_MUSIC_API2_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["FREE_MUSIC_API2_APIKEY"],
      },
      extra || {},
    ])
    client = FreeMusicApi2SDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FREE_MUSIC_API2_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FREE_MUSIC_API2_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
