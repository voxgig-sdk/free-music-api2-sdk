# FreeMusicApi2 SDK utility: make_context
require_relative '../core/context'
module FreeMusicApi2Utilities
  MakeContext = ->(ctxmap, basectx) {
    FreeMusicApi2Context.new(ctxmap, basectx)
  }
end
