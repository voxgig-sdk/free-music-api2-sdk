# V1Lookup direct test

require "minitest/autorun"
require "json"
require_relative "../FreeMusicApi2_sdk"
require_relative "runner"

class V1LookupDirectTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def live_ok(result)
    status = Helpers.to_int(result["status"])
    result["err"].nil? && result["ok"] && status >= 200 && status < 300
  end

  def test_direct_list_v1_lookup
    setup = v1_lookup_direct_setup([
      { "id" => "direct01" },
      { "id" => "direct02" },
    ])
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-list-v1_lookup", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    Runner.live_pace if setup[:live]
    client = setup[:client]

    params = {}
    query = {}
    if setup[:live]
      query["i"] = "1dc4c347-a1db-32aa-b14f-bc9cc507b843"
    end

    result = client.direct({
      "path" => "album-mb.php",
      "method" => "GET",
      "params" => params,
      "query" => query,
    })
    if setup[:live]
      unless live_ok(result)
        Runner.live_miss(LIVE_STRICT, "Live list failed: " + Runner.live_describe(result))
      end
      if Runner.live_list(result["data"]).nil?
        Runner.live_miss(LIVE_STRICT, "Live list returned no list: " + Runner.live_describe(result))
      end
      assert Runner.live_list(result["data"]).is_a?(Array)
    else
      assert_nil result["err"]
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert result["data"].is_a?(Array)
      assert_equal 2, result["data"].length
      assert_equal 1, setup[:calls].length
    end
  end

end


def v1_lookup_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "FREE_MUSIC_API2_TEST_V1_LOOKUP_ENTID" => {},
    "FREE_MUSIC_API2_TEST_LIVE" => "FALSE",
    "FREE_MUSIC_API2_APIKEY" => "",
  })

  live = env["FREE_MUSIC_API2_TEST_LIVE"] == "TRUE"

  if live
    # Merged so the generated fields win: sdk-test-control.json's
    # test.client.options adds to the live client, it does not redirect it.
    merged_opts = Runner.live_client_options.merge({
      "apikey" => env["FREE_MUSIC_API2_APIKEY"],
    })
    client = FreeMusicApi2SDK.new(merged_opts)
    idmap = env["FREE_MUSIC_API2_TEST_V1_LOOKUP_ENTID"]
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: idmap.is_a?(Hash) ? idmap : {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = FreeMusicApi2SDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
