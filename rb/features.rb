# FreeMusicApi2 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FreeMusicApi2Features
  def self.make_feature(name)
    case name
    when "base"
      FreeMusicApi2BaseFeature.new
    when "test"
      FreeMusicApi2TestFeature.new
    else
      FreeMusicApi2BaseFeature.new
    end
  end
end
