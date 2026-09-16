# FreeMusicApi2 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FreeMusicApi2Features
  def self.make_feature(name)
    case name
    when "base"
      FreeMusicApi2BaseFeature.new
    when "ratelimit"
      FreeMusicApi2RatelimitFeature.new
    when "retry"
      FreeMusicApi2RetryFeature.new
    when "test"
      FreeMusicApi2TestFeature.new
    when "timeout"
      FreeMusicApi2TimeoutFeature.new
    else
      FreeMusicApi2BaseFeature.new
    end
  end
end
