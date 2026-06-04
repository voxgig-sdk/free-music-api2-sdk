# V2Search entity test

require "minitest/autorun"
require "json"
require_relative "../FreeMusicApi2_sdk"
require_relative "runner"

class V2SearchEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FreeMusicApi2SDK.test(nil, nil)
    ent = testsdk.V2Search(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = v2_search_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "v2_search." + _op, _live ? "live" : "unit")
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
    v2_search_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.v2_search")))
    v2_search_ref01_data = nil
    if v2_search_ref01_data_raw.length > 0
      v2_search_ref01_data = Helpers.to_map(v2_search_ref01_data_raw[0][1])
    end

    # LOAD
    v2_search_ref01_ent = client.V2Search(nil)
    v2_search_ref01_match_dt0 = {}
    v2_search_ref01_data_dt0_loaded, err = v2_search_ref01_ent.load(v2_search_ref01_match_dt0, nil)
    assert_nil err
    assert !v2_search_ref01_data_dt0_loaded.nil?

  end
end

def v2_search_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "v2_search", "V2SearchTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FreeMusicApi2SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["v2_search01", "v2_search02", "v2_search03", "album01", "album02", "album03", "artist01", "artist02", "artist03", "track01", "track02", "track03"],
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
  })

  idmap_resolved = Helpers.to_map(
    env["FREEMUSICAPI__TEST_V__SEARCH_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FREEMUSICAPI__TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
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
