

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


describe('V2LookupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_MUSIC_API2_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_MUSIC_API2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeMusicApi2SDK.test()
    const ent = testsdk.V2Lookup()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_MUSIC_API2_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'v2_lookup.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"albums":{"a":true,"h":"Albums","n":"albums","r":false,"t":"`$ARRAY`","key$":"albums","index$":0},"artists":{"a":true,"h":"Artists","n":"artists","r":false,"t":"`$ARRAY`","key$":"artists","index$":1},"tracks":{"a":true,"h":"Tracks","n":"tracks","r":false,"t":"`$ARRAY`","key$":"tracks","index$":2}},"name":"v2_lookup","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /lookup/album/{albumId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":2109615,"k":"param","n":"album_id","or":"albumId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/lookup/album/{albumId}","q":{"exist":["album_id"]},"r":{"param":{"albumId":"album_id"}},"s":[{"lit":"lookup"},{"lit":"album"},{"var":"album_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /lookup/artist/{artistId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":111239,"k":"param","n":"artist_id","or":"artistId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/lookup/artist/{artistId}","q":{"exist":["artist_id"]},"r":{"param":{"artistId":"artist_id"}},"s":[{"lit":"lookup"},{"lit":"artist"},{"var":"artist_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /lookup/album_mb/{musicBrainzId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1dc4c347-a1db-32aa-b14f-bc9cc507b843","k":"param","n":"music_brainz_id","or":"musicBrainzId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/lookup/album_mb/{musicBrainzId}","q":{"exist":["music_brainz_id"]},"r":{"param":{"musicBrainzId":"music_brainz_id"}},"s":[{"lit":"lookup"},{"lit":"album_mb"},{"var":"music_brainz_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /lookup/artist_mb/{musicBrainzId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"cc197bad-dc9c-440d-a5b5-d52ba2e14234","k":"param","n":"music_brainz_id","or":"musicBrainzId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/lookup/artist_mb/{musicBrainzId}","q":{"exist":["music_brainz_id"]},"r":{"param":{"musicBrainzId":"music_brainz_id"}},"s":[{"lit":"lookup"},{"lit":"artist_mb"},{"var":"music_brainz_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /lookup/track_mb/{musicBrainzId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"50369905-68ca-48d2-912d-b37330ff7dc3","k":"param","n":"music_brainz_id","or":"musicBrainzId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/lookup/track_mb/{musicBrainzId}","q":{"exist":["music_brainz_id"]},"r":{"param":{"musicBrainzId":"music_brainz_id"}},"s":[{"lit":"lookup"},{"lit":"track_mb"},{"var":"music_brainz_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"GET /lookup/track/{trackId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":32724183,"k":"param","n":"track_id","or":"trackId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/lookup/track/{trackId}","q":{"exist":["track_id"]},"r":{"param":{"trackId":"track_id"}},"s":[{"lit":"lookup"},{"lit":"track"},{"var":"track_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"v2_lookup","name__orig":"v2_lookup","Name":"V2Lookup","name_":"v2_lookup","name-":"v2-lookup","NAME":"V2_LOOKUP","index$":4}, {"active":true,"entity":"v2_lookup","key$":"BasicV2LookupFlow","kind":"basic","name":"BasicV2LookupFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"v2_lookup_ref01","srcdatavar":"v2_lookup_ref01_data","suffix":"_dt0"},"m":{"id":"v2_lookup01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-v2_lookup_ref01"}}],"index$":0}]}, 'V2Lookup', {"GET /lookup/album/{albumId}":{"protocol":"http","parameters":[{"name":"albumId","in":"path","description":"Album ID","required":true,"schema":{"type":"integer"},"example":2109615,"index$":0}]},"GET /lookup/artist/{artistId}":{"protocol":"http","parameters":[{"name":"artistId","in":"path","description":"Artist ID","required":true,"schema":{"type":"integer"},"example":111239,"index$":0}]},"GET /lookup/album_mb/{musicBrainzId}":{"protocol":"http","parameters":[{"name":"musicBrainzId","in":"path","description":"MusicBrainz Release Group ID","required":true,"schema":{"type":"string"},"example":"1dc4c347-a1db-32aa-b14f-bc9cc507b843","index$":0}]},"GET /lookup/artist_mb/{musicBrainzId}":{"protocol":"http","parameters":[{"name":"musicBrainzId","in":"path","description":"MusicBrainz Artist ID","required":true,"schema":{"type":"string"},"example":"cc197bad-dc9c-440d-a5b5-d52ba2e14234","index$":0}]},"GET /lookup/track_mb/{musicBrainzId}":{"protocol":"http","parameters":[{"name":"musicBrainzId","in":"path","description":"MusicBrainz Recording ID","required":true,"schema":{"type":"string"},"example":"50369905-68ca-48d2-912d-b37330ff7dc3","index$":0}]},"GET /lookup/track/{trackId}":{"protocol":"http","parameters":[{"name":"trackId","in":"path","description":"Track ID","required":true,"schema":{"type":"integer"},"example":32724183,"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let v2_lookup_ref01_data = Object.values(setup.data.existing.v2_lookup)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const v2_lookup_ref01_ent = client.V2Lookup()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/v2_lookup/V2LookupTestData.json')

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
    ['v2_lookup01','v2_lookup02','v2_lookup03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID': idmap,
    'FREE_MUSIC_API2_TEST_LIVE': 'FALSE',
    'FREE_MUSIC_API2_TEST_EXPLAIN': 'FALSE',
    'FREE_MUSIC_API2_APIKEY': '',
  })

  idmap = env['FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID']

  const live = 'TRUE' === env.FREE_MUSIC_API2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID']
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
  
