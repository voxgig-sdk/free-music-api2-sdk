// FreeMusicApi2 Ts SDK

import { V1ListEntity } from './entity/V1ListEntity'
import { V1LookupEntity } from './entity/V1LookupEntity'
import { V1SearchEntity } from './entity/V1SearchEntity'
import { V2ListEntity } from './entity/V2ListEntity'
import { V2LookupEntity } from './entity/V2LookupEntity'
import { V2SearchEntity } from './entity/V2SearchEntity'

export type * from './FreeMusicApi2Types'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { FreeMusicApi2EntityBase } from './FreeMusicApi2EntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class FreeMusicApi2SDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _v1_list?: V1ListEntity

  // Idiomatic facade: `client.v1_list.list()` / `client.v1_list.load({ id })`.
  get v1_list(): V1ListEntity {
    return (this._v1_list ??= new V1ListEntity(this, undefined))
  }

  /** @deprecated Use `client.v1_list` instead. */
  V1List(data?: any) {
    const self = this
    return new V1ListEntity(self,data)
  }


  _v1_lookup?: V1LookupEntity

  // Idiomatic facade: `client.v1_lookup.list()` / `client.v1_lookup.load({ id })`.
  get v1_lookup(): V1LookupEntity {
    return (this._v1_lookup ??= new V1LookupEntity(this, undefined))
  }

  /** @deprecated Use `client.v1_lookup` instead. */
  V1Lookup(data?: any) {
    const self = this
    return new V1LookupEntity(self,data)
  }


  _v1_search?: V1SearchEntity

  // Idiomatic facade: `client.v1_search.list()` / `client.v1_search.load({ id })`.
  get v1_search(): V1SearchEntity {
    return (this._v1_search ??= new V1SearchEntity(this, undefined))
  }

  /** @deprecated Use `client.v1_search` instead. */
  V1Search(data?: any) {
    const self = this
    return new V1SearchEntity(self,data)
  }


  _v2_list?: V2ListEntity

  // Idiomatic facade: `client.v2_list.list()` / `client.v2_list.load({ id })`.
  get v2_list(): V2ListEntity {
    return (this._v2_list ??= new V2ListEntity(this, undefined))
  }

  /** @deprecated Use `client.v2_list` instead. */
  V2List(data?: any) {
    const self = this
    return new V2ListEntity(self,data)
  }


  _v2_lookup?: V2LookupEntity

  // Idiomatic facade: `client.v2_lookup.list()` / `client.v2_lookup.load({ id })`.
  get v2_lookup(): V2LookupEntity {
    return (this._v2_lookup ??= new V2LookupEntity(this, undefined))
  }

  /** @deprecated Use `client.v2_lookup` instead. */
  V2Lookup(data?: any) {
    const self = this
    return new V2LookupEntity(self,data)
  }


  _v2_search?: V2SearchEntity

  // Idiomatic facade: `client.v2_search.list()` / `client.v2_search.load({ id })`.
  get v2_search(): V2SearchEntity {
    return (this._v2_search ??= new V2SearchEntity(this, undefined))
  }

  /** @deprecated Use `client.v2_search` instead. */
  V2Search(data?: any) {
    const self = this
    return new V2SearchEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new FreeMusicApi2SDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return FreeMusicApi2SDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'FreeMusicApi2' }
  }

  toString() {
    return 'FreeMusicApi2 ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = FreeMusicApi2SDK


export {
  stdutil,

  BaseFeature,
  FreeMusicApi2EntityBase,

  FreeMusicApi2SDK,
  SDK,
}


