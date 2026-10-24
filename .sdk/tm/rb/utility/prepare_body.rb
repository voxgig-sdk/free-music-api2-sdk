# FreeMusicApi2 SDK utility: prepare_body
require_relative 'media'
module FreeMusicApi2Utilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return FreeMusicApi2Utilities.raw_body(ctx.reqdata) if FreeMusicApi2Utilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
