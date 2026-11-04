-- V2List entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("free-music-api2_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("V2ListEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:V2List(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:V2List(nil):list({ ["artist_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = v2_list_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "v2_list." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _live_key, _live_ex in pairs({["artist01"] = 111239}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          setup.idmap[_live_key] = _live_ex
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local v2_list_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.v2_list")))
    local v2_list_ref01_data = nil
    if #v2_list_ref01_data_raw > 0 then
      v2_list_ref01_data = helpers.to_map(v2_list_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local v2_list_ref01_ent = client:V2List(nil)
    local v2_list_ref01_match = {
      ["artist_id"] = setup.idmap["artist01"],
    }

    local v2_list_ref01_list_result, err = v2_list_ref01_ent:list(v2_list_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(v2_list_ref01_list_result)

  end)
end)

function v2_list_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/v2_list/V2ListTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read v2_list test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "v2_list01", "v2_list02", "v2_list03", "artist01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("FREE_MUSIC_API2_TEST_V2_LIST_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["FREE_MUSIC_API2_TEST_V2_LIST_ENTID"] = idmap,
    ["FREE_MUSIC_API2_TEST_LIVE"] = "FALSE",
    ["FREE_MUSIC_API2_TEST_EXPLAIN"] = "FALSE",
    ["FREE_MUSIC_API2_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["FREE_MUSIC_API2_TEST_V2_LIST_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["FREE_MUSIC_API2_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["FREE_MUSIC_API2_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["FREE_MUSIC_API2_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["FREE_MUSIC_API2_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
