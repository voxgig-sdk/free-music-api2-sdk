
import { Context } from './Context'


class FreeMusicApi2Error extends Error {

  isFreeMusicApi2Error = true

  sdk = 'FreeMusicApi2'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FreeMusicApi2Error
}

