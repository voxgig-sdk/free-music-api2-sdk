# V1Search entity test

require "minitest/autorun"
require "json"
require_relative "../FreeMusicApi2_sdk"
require_relative "runner"

class V1SearchEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FreeMusicApi2SDK.test(nil, nil)
    ent = testsdk.V1Search(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = v1_search_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "v1_search." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set FREEMUSICAPI__TEST_V__SEARCH_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    v1_search_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.v1_search")))
    v1_search_ref01_data = nil
    if v1_search_ref01_data_raw.length > 0
      v1_search_ref01_data = Helpers.to_map(v1_search_ref01_data_raw[0][1])
    end

    # LIST
    v1_search_ref01_ent = client.V1Search(nil)
    v1_search_ref01_match = {}

    v1_search_ref01_list_result, err = v1_search_ref01_ent.list(v1_search_ref01_match, nil)
    assert_nil err
    assert v1_search_ref01_list_result.is_a?(Array)

  end
end

def v1_search_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "v1_search", "V1SearchTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FreeMusicApi2SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["v1_search01", "v1_search02", "v1_search03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["FREEMUSICAPI__TEST_V__SEARCH_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FREEMUSICAPI__TEST_V__SEARCH_ENTID" => idmap,
    "FREEMUSICAPI__TEST_LIVE" => "FALSE",
    "FREEMUSICAPI__TEST_EXPLAIN" => "FALSE",
    "FREEMUSICAPI__APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["FREEMUSICAPI__TEST_V__SEARCH_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FREEMUSICAPI__TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["FREEMUSICAPI__APIKEY"],
      },
      extra || {},
    ])
    client = FreeMusicApi2SDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FREEMUSICAPI__TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FREEMUSICAPI__TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
