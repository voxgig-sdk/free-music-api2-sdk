# V2Lookup entity test

require "minitest/autorun"
require "json"
require_relative "../FreeMusicApi2_sdk"
require_relative "runner"

class V2LookupEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = FreeMusicApi2SDK.test(nil, nil)
    ent = testsdk.V2Lookup(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = FreeMusicApi2Config.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = FreeMusicApi2SDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.V2Lookup(nil).list({ "album_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = v2_lookup_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "v2_lookup." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    v2_lookup_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.v2_lookup")))
    v2_lookup_ref01_data = nil
    if v2_lookup_ref01_data_raw.length > 0
      v2_lookup_ref01_data = Helpers.to_map(v2_lookup_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    v2_lookup_ref01_ent = client.V2Lookup(nil)
    v2_lookup_ref01_match = {
      "track_id" => setup[:idmap]["track01"],
    }
    if setup[:live]
      v2_lookup_ref01_match["album_id"] = 2109615
      v2_lookup_ref01_match.delete("track_id") if setup[:synthetic_only] || setup[:idmap]["track01"].nil?
    end

    v2_lookup_ref01_list_result = v2_lookup_ref01_ent.list(v2_lookup_ref01_match, nil)
    assert v2_lookup_ref01_list_result.is_a?(Array)

  end
end

def v2_lookup_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "v2_lookup", "V2LookupTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FreeMusicApi2SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["v2_lookup01", "v2_lookup02", "v2_lookup03", "track01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID" => idmap,
    "FREE_MUSIC_API2_TEST_LIVE" => "FALSE",
    "FREE_MUSIC_API2_TEST_EXPLAIN" => "FALSE",
    "FREE_MUSIC_API2_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID"])
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
