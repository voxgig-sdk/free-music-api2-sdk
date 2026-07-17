-- FreeMusicApi2 SDK exists test

local sdk = require("free-music-api2_sdk")

describe("FreeMusicApi2SDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
