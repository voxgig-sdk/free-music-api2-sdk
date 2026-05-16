# FreeMusicApi2 SDK exists test

require "minitest/autorun"
require_relative "../FreeMusicApi2_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FreeMusicApi2SDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
