

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FreeMusicApi2SDK, BaseFeature, config, stdutil } from '../../..'

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


describe('V1ListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_MUSIC_API2_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_MUSIC_API2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeMusicApi2SDK.test()
    const ent = testsdk.V1List()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('v1_list hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of FreeMusicApi2SDK.test(offline).V1List().stream('list')) { }
    }, /offline/)

    for await (const _item of FreeMusicApi2SDK.test(offline).V1List()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = FreeMusicApi2SDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.V1List().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of FreeMusicApi2SDK.test().V1List().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new FreeMusicApi2SDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.V1List().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.V1List().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FreeMusicApi2SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.V1List().list({"country":1,"format":"x","type":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_MUSIC_API2_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'v1_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"idAlbum":{"a":true,"h":"Id Album","n":"idAlbum","r":false,"sh":"Album ID","t":"`$INTEGER`","key$":"idAlbum","index$":0},"idArtist":{"a":true,"h":"Id Artist","n":"idArtist","r":false,"sh":"Artist ID","t":"`$INTEGER`","key$":"idArtist","index$":1},"idIMVDB":{"a":true,"h":"Id Imvdb","n":"idIMVDB","r":false,"sh":"IMVDB ID","t":"`$INTEGER`","key$":"idIMVDB","index$":2},"idLyric":{"a":true,"h":"Id Lyric","n":"idLyric","r":false,"sh":"Lyrics ID","t":"`$INTEGER`","key$":"idLyric","index$":3},"idTrack":{"a":true,"h":"Id Track","n":"idTrack","r":false,"sh":"Track ID","t":"`$INTEGER`","key$":"idTrack","index$":4},"intCD":{"a":true,"h":"Int Cd","n":"intCD","r":false,"sh":"CD number","t":"`$INTEGER`","key$":"intCD","index$":5},"intDuration":{"a":true,"h":"Int Duration","n":"intDuration","r":false,"sh":"Track duration in milliseconds","t":"`$INTEGER`","key$":"intDuration","index$":6},"intLoved":{"a":true,"h":"Int Loved","n":"intLoved","r":false,"sh":"Number of loves/likes","t":"`$INTEGER`","key$":"intLoved","index$":7},"intMusicVidComments":{"a":true,"h":"Int Music Vid Comments","n":"intMusicVidComments","r":false,"sh":"Number of music video comments","t":"`$INTEGER`","key$":"intMusicVidComments","index$":8},"intMusicVidDislikes":{"a":true,"h":"Int Music Vid Dislikes","n":"intMusicVidDislikes","r":false,"sh":"Number of music video dislikes","t":"`$INTEGER`","key$":"intMusicVidDislikes","index$":9},"intMusicVidFavorites":{"a":true,"h":"Int Music Vid Favorites","n":"intMusicVidFavorites","r":false,"sh":"Number of music video favorites","t":"`$INTEGER`","key$":"intMusicVidFavorites","index$":10},"intMusicVidLikes":{"a":true,"h":"Int Music Vid Likes","n":"intMusicVidLikes","r":false,"sh":"Number of music video likes","t":"`$INTEGER`","key$":"intMusicVidLikes","index$":11},"intMusicVidViews":{"a":true,"h":"Int Music Vid Views","n":"intMusicVidViews","r":false,"sh":"Number of music video views","t":"`$INTEGER`","key$":"intMusicVidViews","index$":12},"intScore":{"a":true,"h":"Int Score","n":"intScore","r":false,"sh":"Track score","t":"`$INTEGER`","key$":"intScore","index$":13},"intScoreVotes":{"a":true,"h":"Int Score Votes","n":"intScoreVotes","r":false,"sh":"Number of score votes","t":"`$INTEGER`","key$":"intScoreVotes","index$":14},"intTotalListeners":{"a":true,"h":"Int Total Listeners","n":"intTotalListeners","r":false,"sh":"Total number of listeners","t":"`$INTEGER`","key$":"intTotalListeners","index$":15},"intTotalPlays":{"a":true,"h":"Int Total Plays","n":"intTotalPlays","r":false,"sh":"Total number of plays","t":"`$INTEGER`","key$":"intTotalPlays","index$":16},"intTrackNumber":{"a":true,"h":"Int Track Number","n":"intTrackNumber","r":false,"sh":"Track number on album","t":"`$INTEGER`","key$":"intTrackNumber","index$":17},"loved":{"a":true,"h":"Loved","n":"loved","r":false,"t":"`$ARRAY`","key$":"loved","index$":18},"strAlbum":{"a":true,"h":"Str Album","n":"strAlbum","r":false,"sh":"Album title","t":"`$STRING`","key$":"strAlbum","index$":19},"strArtist":{"a":true,"h":"Str Artist","n":"strArtist","r":false,"sh":"Artist name","t":"`$STRING`","key$":"strArtist","index$":20},"strArtistAlternate":{"a":true,"h":"Str Artist Alternate","n":"strArtistAlternate","r":false,"sh":"Alternate artist name","t":"`$STRING`","key$":"strArtistAlternate","index$":21},"strDescriptionEN":{"a":true,"h":"Str Description En","n":"strDescriptionEN","r":false,"sh":"Video description in English","t":"`$STRING`","key$":"strDescriptionEN","index$":22},"strGenre":{"a":true,"h":"Str Genre","n":"strGenre","r":false,"sh":"Track genre","t":"`$STRING`","key$":"strGenre","index$":23},"strLocked":{"a":true,"h":"Str Locked","n":"strLocked","r":false,"sh":"Whether the record is locked","t":"`$STRING`","key$":"strLocked","index$":24},"strMood":{"a":true,"h":"Str Mood","n":"strMood","r":false,"sh":"Track mood","t":"`$STRING`","key$":"strMood","index$":25},"strMusicBrainzAlbumID":{"a":true,"h":"Str Music Brainz Album Id","n":"strMusicBrainzAlbumID","r":false,"sh":"MusicBrainz Album ID","t":"`$STRING`","key$":"strMusicBrainzAlbumID","index$":26},"strMusicBrainzArtistID":{"a":true,"h":"Str Music Brainz Artist Id","n":"strMusicBrainzArtistID","r":false,"sh":"MusicBrainz Artist ID","t":"`$STRING`","key$":"strMusicBrainzArtistID","index$":27},"strMusicBrainzID":{"a":true,"h":"Str Music Brainz Id","n":"strMusicBrainzID","r":false,"sh":"MusicBrainz Recording ID","t":"`$STRING`","key$":"strMusicBrainzID","index$":28},"strMusicVid":{"a":true,"h":"Str Music Vid","n":"strMusicVid","r":false,"sh":"URL to music video","t":"`$STRING`","key$":"strMusicVid","index$":29},"strMusicVidCompany":{"a":true,"h":"Str Music Vid Company","n":"strMusicVidCompany","r":false,"sh":"Music video production company","t":"`$STRING`","key$":"strMusicVidCompany","index$":30},"strMusicVidDirector":{"a":true,"h":"Str Music Vid Director","n":"strMusicVidDirector","r":false,"sh":"Music video director","t":"`$STRING`","key$":"strMusicVidDirector","index$":31},"strMusicVidScreen1":{"a":true,"h":"Str Music Vid Screen1","n":"strMusicVidScreen1","r":false,"sh":"URL to music video screenshot 1","t":"`$STRING`","key$":"strMusicVidScreen1","index$":32},"strMusicVidScreen2":{"a":true,"h":"Str Music Vid Screen2","n":"strMusicVidScreen2","r":false,"sh":"URL to music video screenshot 2","t":"`$STRING`","key$":"strMusicVidScreen2","index$":33},"strMusicVidScreen3":{"a":true,"h":"Str Music Vid Screen3","n":"strMusicVidScreen3","r":false,"sh":"URL to music video screenshot 3","t":"`$STRING`","key$":"strMusicVidScreen3","index$":34},"strStyle":{"a":true,"h":"Str Style","n":"strStyle","r":false,"sh":"Track style","t":"`$STRING`","key$":"strStyle","index$":35},"strTheme":{"a":true,"h":"Str Theme","n":"strTheme","r":false,"sh":"Track theme","t":"`$STRING`","key$":"strTheme","index$":36},"strTrack":{"a":true,"h":"Str Track","n":"strTrack","r":false,"sh":"Track title","t":"`$STRING`","key$":"strTrack","index$":37},"strTrackLyrics":{"a":true,"h":"Str Track Lyrics","n":"strTrackLyrics","r":false,"sh":"Track lyrics","t":"`$STRING`","key$":"strTrackLyrics","index$":38},"strTrackThumb":{"a":true,"h":"Str Track Thumb","n":"strTrackThumb","r":false,"sh":"URL to track thumbnail","t":"`$STRING`","key$":"strTrackThumb","index$":39},"trending":{"a":true,"h":"Trending","n":"trending","r":false,"t":"`$ARRAY`","key$":"trending","index$":40}},"name":"v1_list","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /trending.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"us","k":"query","n":"country","or":"country","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"albums","k":"query","n":"format","or":"format","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"itunes","k":"query","n":"type","or":"type","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/trending.php","q":{"exist":["country","format","type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"trending.php"}],"t":{"req":"`reqdata`","res":"`body.trending`"},"index$":0},{"a":true,"co":{"id":"GET /mostloved.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"track","k":"query","n":"format","or":"format","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/mostloved.php","q":{"exist":["format"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mostloved.php"}],"t":{"req":"`reqdata`","res":"`body.loved`"},"index$":1},{"a":true,"co":{"id":"GET /mvid-mb.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"cc197bad-dc9c-440d-a5b5-d52ba2e14234","k":"query","n":"i","or":"i","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/mvid-mb.php","q":{"exist":["i"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mvid-mb.php"}],"t":{"req":"`reqdata`","res":"`body.mvids`"},"index$":2},{"a":true,"co":{"id":"GET /mvid.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":112024,"k":"query","n":"i","or":"i","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/mvid.php","q":{"exist":["i"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mvid.php"}],"t":{"req":"`reqdata`","res":"`body.mvids`"},"index$":3},{"a":true,"co":{"id":"GET /track-top10-mb.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"cc197bad-dc9c-440d-a5b5-d52ba2e14234","k":"query","n":"s","or":"s","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/track-top10-mb.php","q":{"exist":["s"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"track-top10-mb.php"}],"t":{"req":"`reqdata`","res":"`body.track`"},"index$":4},{"a":true,"co":{"id":"GET /track-top10.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"coldplay","k":"query","n":"s","or":"s","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/track-top10.php","q":{"exist":["s"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"track-top10.php"}],"t":{"req":"`reqdata`","res":"`body.track`"},"index$":5}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"v1_list","name__orig":"v1_list","Name":"V1List","name_":"v1_list","name-":"v1-list","NAME":"V1_LIST","index$":0}, {"active":true,"entity":"v1_list","key$":"BasicV1ListFlow","kind":"basic","name":"BasicV1ListFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"v1_list_ref01"}}],"index$":0}]}, 'V1List', {"GET /trending.php":{"protocol":"http","parameters":[{"name":"country","in":"query","description":"Country code","required":true,"schema":{"type":"string"},"example":"us","index$":0},{"name":"type","in":"query","description":"Chart type","required":true,"schema":{"type":"string","enum":["itunes"]},"example":"itunes","index$":1},{"name":"format","in":"query","description":"Format type (albums or singles)","required":true,"schema":{"type":"string","enum":["albums","singles"]},"example":"albums","index$":2}]},"GET /mostloved.php":{"protocol":"http","parameters":[{"name":"format","in":"query","description":"Format type (track or album)","required":true,"schema":{"type":"string","enum":["track","album"]},"example":"track","index$":0}]},"GET /mvid-mb.php":{"protocol":"http","parameters":[{"name":"i","in":"query","description":"MusicBrainz Artist ID","required":true,"schema":{"type":"string"},"example":"cc197bad-dc9c-440d-a5b5-d52ba2e14234","index$":0}]},"GET /mvid.php":{"protocol":"http","parameters":[{"name":"i","in":"query","description":"Artist ID","required":true,"schema":{"type":"integer"},"example":112024,"index$":0}]},"GET /track-top10-mb.php":{"protocol":"http","parameters":[{"name":"s","in":"query","description":"MusicBrainz Artist ID","required":true,"schema":{"type":"string"},"example":"cc197bad-dc9c-440d-a5b5-d52ba2e14234","index$":0}]},"GET /track-top10.php":{"protocol":"http","parameters":[{"name":"s","in":"query","description":"Artist name","required":true,"schema":{"type":"string"},"example":"coldplay","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let v1_list_ref01_data = Object.values(setup.data.existing.v1_list)[0] as any

    // LIST
    const v1_list_ref01_ent = client.V1List()
    const v1_list_ref01_match: any = {}

    const v1_list_ref01_list = (await v1_list_ref01_ent.list(v1_list_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/v1_list/V1ListTestData.json')

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
    ['v1_list01','v1_list02','v1_list03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_MUSIC_API2_TEST_V1_LIST_ENTID': idmap,
    'FREE_MUSIC_API2_TEST_LIVE': 'FALSE',
    'FREE_MUSIC_API2_TEST_EXPLAIN': 'FALSE',
    'FREE_MUSIC_API2_APIKEY': '',
  })

  idmap = env['FREE_MUSIC_API2_TEST_V1_LIST_ENTID']

  const live = 'TRUE' === env.FREE_MUSIC_API2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_MUSIC_API2_TEST_V1_LIST_ENTID']
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
  
