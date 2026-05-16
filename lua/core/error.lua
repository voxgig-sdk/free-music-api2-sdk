-- FreeMusicApi2 SDK error

local FreeMusicApi2Error = {}
FreeMusicApi2Error.__index = FreeMusicApi2Error


function FreeMusicApi2Error.new(code, msg, ctx)
  local self = setmetatable({}, FreeMusicApi2Error)
  self.is_sdk_error = true
  self.sdk = "FreeMusicApi2"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FreeMusicApi2Error:error()
  return self.msg
end


function FreeMusicApi2Error:__tostring()
  return self.msg
end


return FreeMusicApi2Error
