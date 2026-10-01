

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


describe('V2SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_MUSIC_API2_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_MUSIC_API2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeMusicApi2SDK.test()
    const ent = testsdk.V2Search()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_MUSIC_API2_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'v2_search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"albums":{"a":true,"h":"Albums","n":"albums","r":false,"t":"`$ARRAY`","key$":"albums","index$":0},"artists":{"a":true,"h":"Artists","n":"artists","r":false,"t":"`$ARRAY`","key$":"artists","index$":1},"tracks":{"a":true,"h":"Tracks","n":"tracks","r":false,"t":"`$ARRAY`","key$":"tracks","index$":2}},"name":"v2_search","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /search/album/{albumName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"parachutes","k":"param","n":"album_name","or":"albumName","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/search/album/{albumName}","q":{"exist":["album_name"]},"r":{"param":{"albumName":"album_name"}},"s":[{"lit":"search"},{"lit":"album"},{"var":"album_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /search/artist/{artistName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"coldplay","k":"param","n":"artist_name","or":"artistName","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/search/artist/{artistName}","q":{"exist":["artist_name"]},"r":{"param":{"artistName":"artist_name"}},"s":[{"lit":"search"},{"lit":"artist"},{"var":"artist_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /search/track/{trackName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"yellow","k":"param","n":"track_name","or":"trackName","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/search/track/{trackName}","q":{"exist":["track_name"]},"r":{"param":{"trackName":"track_name"}},"s":[{"lit":"search"},{"lit":"track"},{"var":"track_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"v2_search","name__orig":"v2_search","Name":"V2Search","name_":"v2_search","name-":"v2-search","NAME":"V2_SEARCH","index$":5}, {"active":true,"entity":"v2_search","key$":"BasicV2SearchFlow","kind":"basic","name":"BasicV2SearchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"v2_search_ref01","srcdatavar":"v2_search_ref01_data","suffix":"_dt0"},"m":{"id":"v2_search01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-v2_search_ref01"}}],"index$":0}]}, 'V2Search', {"GET /search/album/{albumName}":{"protocol":"http","parameters":[{"name":"albumName","in":"path","description":"Album name to search for","required":true,"schema":{"type":"string"},"example":"parachutes","index$":0}]},"GET /search/artist/{artistName}":{"protocol":"http","parameters":[{"name":"artistName","in":"path","description":"Artist name to search for","required":true,"schema":{"type":"string"},"example":"coldplay","index$":0}]},"GET /search/track/{trackName}":{"protocol":"http","parameters":[{"name":"trackName","in":"path","description":"Track name to search for","required":true,"schema":{"type":"string"},"example":"yellow","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let v2_search_ref01_data = Object.values(setup.data.existing.v2_search)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const v2_search_ref01_ent = client.V2Search()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/v2_search/V2SearchTestData.json')

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
    ['v2_search01','v2_search02','v2_search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_MUSIC_API2_TEST_V2_SEARCH_ENTID': idmap,
    'FREE_MUSIC_API2_TEST_LIVE': 'FALSE',
    'FREE_MUSIC_API2_TEST_EXPLAIN': 'FALSE',
    'FREE_MUSIC_API2_APIKEY': '',
  })

  idmap = env['FREE_MUSIC_API2_TEST_V2_SEARCH_ENTID']

  const live = 'TRUE' === env.FREE_MUSIC_API2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_MUSIC_API2_TEST_V2_SEARCH_ENTID']
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
  
