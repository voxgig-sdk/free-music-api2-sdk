

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FreeMusicApi2SDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('V2ListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_MUSIC_API2_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_MUSIC_API2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeMusicApi2SDK.test()
    const ent = testsdk.V2List()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_MUSIC_API2_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'v2_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"albums":{"a":true,"h":"Albums","n":"albums","r":false,"t":"`$ARRAY`","key$":"albums","index$":0}},"name":"v2_list","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /list/discography/{artistId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":111239,"k":"param","n":"artist_id","or":"artistId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/list/discography/{artistId}","q":{"exist":["artist_id"]},"r":{"param":{"artistId":"artist_id"}},"s":[{"lit":"list"},{"lit":"discography"},{"var":"artist_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"v2_list","name__orig":"v2_list","Name":"V2List","name_":"v2_list","name-":"v2-list","NAME":"V2_LIST","index$":3}, {"active":true,"entity":"v2_list","key$":"BasicV2ListFlow","kind":"basic","name":"BasicV2ListFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"v2_list_ref01","srcdatavar":"v2_list_ref01_data","suffix":"_dt0"},"m":{"id":"v2_list01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-v2_list_ref01"}}],"index$":0}]}, 'V2List', {"GET /list/discography/{artistId}":{"protocol":"http","parameters":[{"name":"artistId","in":"path","description":"Artist ID","required":true,"schema":{"type":"integer"},"example":111239,"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let v2_list_ref01_data = Object.values(setup.data.existing.v2_list)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const v2_list_ref01_ent = client.V2List()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/v2_list/V2ListTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FreeMusicApi2SDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['v2_list01','v2_list02','v2_list03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_MUSIC_API2_TEST_V2_LIST_ENTID': idmap,
    'FREE_MUSIC_API2_TEST_LIVE': 'FALSE',
    'FREE_MUSIC_API2_TEST_EXPLAIN': 'FALSE',
    'FREE_MUSIC_API2_APIKEY': '',
  })

  idmap = env['FREE_MUSIC_API2_TEST_V2_LIST_ENTID']

  const live = 'TRUE' === env.FREE_MUSIC_API2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_MUSIC_API2_TEST_V2_LIST_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FreeMusicApi2SDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.FREE_MUSIC_API2_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FREE_MUSIC_API2_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
