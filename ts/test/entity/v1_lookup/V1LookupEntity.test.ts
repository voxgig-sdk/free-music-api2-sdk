

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


describe('V1LookupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_MUSIC_API2_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_MUSIC_API2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeMusicApi2SDK.test()
    const ent = testsdk.V1Lookup()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('v1_lookup hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of FreeMusicApi2SDK.test(offline).V1Lookup().stream('list')) { }
    }, /offline/)

    for await (const _item of FreeMusicApi2SDK.test(offline).V1Lookup()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = FreeMusicApi2SDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.V1Lookup().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of FreeMusicApi2SDK.test().V1Lookup().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new FreeMusicApi2SDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.V1Lookup().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.V1Lookup().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FreeMusicApi2SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.V1Lookup().list({"i":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_MUSIC_API2_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'v1_lookup.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"idAlbum":{"a":true,"h":"Id Album","n":"idAlbum","r":false,"sh":"Unique album ID","t":"`$INTEGER`","key$":"idAlbum","index$":0},"idArtist":{"a":true,"h":"Id Artist","n":"idArtist","r":false,"sh":"Artist ID","t":"`$INTEGER`","key$":"idArtist","index$":1},"idIMVDB":{"a":true,"h":"Id Imvdb","n":"idIMVDB","r":false,"sh":"IMVDB ID","t":"`$INTEGER`","key$":"idIMVDB","index$":2},"idLabel":{"a":true,"h":"Id Label","n":"idLabel","r":false,"sh":"Label ID","t":"`$INTEGER`","key$":"idLabel","index$":3},"idLyric":{"a":true,"h":"Id Lyric","n":"idLyric","r":false,"sh":"Lyrics ID","t":"`$INTEGER`","key$":"idLyric","index$":4},"idTrack":{"a":true,"h":"Id Track","n":"idTrack","r":false,"sh":"Unique track ID","t":"`$INTEGER`","key$":"idTrack","index$":5},"intBornYear":{"a":true,"h":"Int Born Year","n":"intBornYear","r":false,"sh":"Birth year of the artist","t":"`$INTEGER`","key$":"intBornYear","index$":6},"intCD":{"a":true,"h":"Int Cd","n":"intCD","r":false,"sh":"CD number","t":"`$INTEGER`","key$":"intCD","index$":7},"intCharted":{"a":true,"h":"Int Charted","n":"intCharted","r":false,"sh":"Chart position","t":"`$INTEGER`","key$":"intCharted","index$":8},"intDiedYear":{"a":true,"h":"Int Died Year","n":"intDiedYear","r":false,"sh":"Year the artist died (if applicable)","t":"`$INTEGER`","key$":"intDiedYear","index$":9},"intDuration":{"a":true,"h":"Int Duration","n":"intDuration","r":false,"sh":"Track duration in milliseconds","t":"`$INTEGER`","key$":"intDuration","index$":10},"intFormedYear":{"a":true,"h":"Int Formed Year","n":"intFormedYear","r":false,"sh":"Year the artist/band was formed","t":"`$INTEGER`","key$":"intFormedYear","index$":11},"intLoved":{"a":true,"h":"Int Loved","n":"intLoved","r":false,"sh":"Number of loves/likes","t":"`$INTEGER`","key$":"intLoved","index$":12},"intMembers":{"a":true,"h":"Int Members","n":"intMembers","r":false,"sh":"Number of band members","t":"`$INTEGER`","key$":"intMembers","index$":13},"intMusicVidComments":{"a":true,"h":"Int Music Vid Comments","n":"intMusicVidComments","r":false,"sh":"Number of music video comments","t":"`$INTEGER`","key$":"intMusicVidComments","index$":14},"intMusicVidDislikes":{"a":true,"h":"Int Music Vid Dislikes","n":"intMusicVidDislikes","r":false,"sh":"Number of music video dislikes","t":"`$INTEGER`","key$":"intMusicVidDislikes","index$":15},"intMusicVidFavorites":{"a":true,"h":"Int Music Vid Favorites","n":"intMusicVidFavorites","r":false,"sh":"Number of music video favorites","t":"`$INTEGER`","key$":"intMusicVidFavorites","index$":16},"intMusicVidLikes":{"a":true,"h":"Int Music Vid Likes","n":"intMusicVidLikes","r":false,"sh":"Number of music video likes","t":"`$INTEGER`","key$":"intMusicVidLikes","index$":17},"intMusicVidViews":{"a":true,"h":"Int Music Vid Views","n":"intMusicVidViews","r":false,"sh":"Number of music video views","t":"`$INTEGER`","key$":"intMusicVidViews","index$":18},"intSales":{"a":true,"h":"Int Sales","n":"intSales","r":false,"sh":"Number of sales","t":"`$INTEGER`","key$":"intSales","index$":19},"intScore":{"a":true,"h":"Int Score","n":"intScore","r":false,"sh":"Album score","t":"`$INTEGER`","key$":"intScore","index$":20},"intScoreVotes":{"a":true,"h":"Int Score Votes","n":"intScoreVotes","r":false,"sh":"Number of score votes","t":"`$INTEGER`","key$":"intScoreVotes","index$":21},"intTotalListeners":{"a":true,"h":"Int Total Listeners","n":"intTotalListeners","r":false,"sh":"Total number of listeners","t":"`$INTEGER`","key$":"intTotalListeners","index$":22},"intTotalPlays":{"a":true,"h":"Int Total Plays","n":"intTotalPlays","r":false,"sh":"Total number of plays","t":"`$INTEGER`","key$":"intTotalPlays","index$":23},"intTrackNumber":{"a":true,"h":"Int Track Number","n":"intTrackNumber","r":false,"sh":"Track number on album","t":"`$INTEGER`","key$":"intTrackNumber","index$":24},"intYearReleased":{"a":true,"h":"Int Year Released","n":"intYearReleased","r":false,"sh":"Year the album was released","t":"`$INTEGER`","key$":"intYearReleased","index$":25},"strAlbum":{"a":true,"h":"Str Album","n":"strAlbum","r":false,"sh":"Album title","t":"`$STRING`","key$":"strAlbum","index$":26},"strAlbum3DCase":{"a":true,"h":"Str Album3 D Case","n":"strAlbum3DCase","r":false,"sh":"URL to 3D case image","t":"`$STRING`","key$":"strAlbum3DCase","index$":27},"strAlbum3DFace":{"a":true,"h":"Str Album3 D Face","n":"strAlbum3DFace","r":false,"sh":"URL to 3D face image","t":"`$STRING`","key$":"strAlbum3DFace","index$":28},"strAlbum3DFlat":{"a":true,"h":"Str Album3 D Flat","n":"strAlbum3DFlat","r":false,"sh":"URL to 3D flat image","t":"`$STRING`","key$":"strAlbum3DFlat","index$":29},"strAlbum3DThumb":{"a":true,"h":"Str Album3 D Thumb","n":"strAlbum3DThumb","r":false,"sh":"URL to 3D thumbnail","t":"`$STRING`","key$":"strAlbum3DThumb","index$":30},"strAlbumCDart":{"a":true,"h":"Str Album C Dart","n":"strAlbumCDart","r":false,"sh":"URL to CD art","t":"`$STRING`","key$":"strAlbumCDart","index$":31},"strAlbumSpine":{"a":true,"h":"Str Album Spine","n":"strAlbumSpine","r":false,"sh":"URL to album spine image","t":"`$STRING`","key$":"strAlbumSpine","index$":32},"strAlbumStripped":{"a":true,"h":"Str Album Stripped","n":"strAlbumStripped","r":false,"sh":"Album title without special characters","t":"`$STRING`","key$":"strAlbumStripped","index$":33},"strAlbumThumb":{"a":true,"h":"Str Album Thumb","n":"strAlbumThumb","r":false,"sh":"URL to album thumbnail","t":"`$STRING`","key$":"strAlbumThumb","index$":34},"strAlbumThumbBack":{"a":true,"h":"Str Album Thumb Back","n":"strAlbumThumbBack","r":false,"sh":"URL to back of album cover","t":"`$STRING`","key$":"strAlbumThumbBack","index$":35},"strAlbumThumbHQ":{"a":true,"h":"Str Album Thumb Hq","n":"strAlbumThumbHQ","r":false,"sh":"URL to high quality album thumbnail","t":"`$STRING`","key$":"strAlbumThumbHQ","index$":36},"strAllMusicID":{"a":true,"h":"Str All Music Id","n":"strAllMusicID","r":false,"sh":"AllMusic ID","t":"`$STRING`","key$":"strAllMusicID","index$":37},"strAmazonID":{"a":true,"h":"Str Amazon Id","n":"strAmazonID","r":false,"sh":"Amazon ID","t":"`$STRING`","key$":"strAmazonID","index$":38},"strAppleMusic":{"a":true,"h":"Str Apple Music","n":"strAppleMusic","r":false,"sh":"Apple Music artist URL","t":"`$STRING`","key$":"strAppleMusic","index$":39},"strArtist":{"a":true,"h":"Str Artist","n":"strArtist","r":false,"sh":"Artist name","t":"`$STRING`","key$":"strArtist","index$":40},"strArtistAlternate":{"a":true,"h":"Str Artist Alternate","n":"strArtistAlternate","r":false,"sh":"Alternate artist name","t":"`$STRING`","key$":"strArtistAlternate","index$":41},"strArtistBanner":{"a":true,"h":"Str Artist Banner","n":"strArtistBanner","r":false,"sh":"URL to artist banner","t":"`$STRING`","key$":"strArtistBanner","index$":42},"strArtistClearart":{"a":true,"h":"Str Artist Clearart","n":"strArtistClearart","r":false,"sh":"URL to artist clearart","t":"`$STRING`","key$":"strArtistClearart","index$":43},"strArtistCutout":{"a":true,"h":"Str Artist Cutout","n":"strArtistCutout","r":false,"sh":"URL to artist cutout image","t":"`$STRING`","key$":"strArtistCutout","index$":44},"strArtistFanart":{"a":true,"h":"Str Artist Fanart","n":"strArtistFanart","r":false,"sh":"URL to artist fanart","t":"`$STRING`","key$":"strArtistFanart","index$":45},"strArtistFanart2":{"a":true,"h":"Str Artist Fanart2","n":"strArtistFanart2","r":false,"sh":"URL to alternate artist fanart","t":"`$STRING`","key$":"strArtistFanart2","index$":46},"strArtistFanart3":{"a":true,"h":"Str Artist Fanart3","n":"strArtistFanart3","r":false,"sh":"URL to third artist fanart","t":"`$STRING`","key$":"strArtistFanart3","index$":47},"strArtistFanart4":{"a":true,"h":"Str Artist Fanart4","n":"strArtistFanart4","r":false,"sh":"URL to fourth artist fanart","t":"`$STRING`","key$":"strArtistFanart4","index$":48},"strArtistLogo":{"a":true,"h":"Str Artist Logo","n":"strArtistLogo","r":false,"sh":"URL to artist logo","t":"`$STRING`","key$":"strArtistLogo","index$":49},"strArtistStripped":{"a":true,"h":"Str Artist Stripped","n":"strArtistStripped","r":false,"sh":"Artist name without special characters","t":"`$STRING`","key$":"strArtistStripped","index$":50},"strArtistThumb":{"a":true,"h":"Str Artist Thumb","n":"strArtistThumb","r":false,"sh":"URL to artist thumbnail image","t":"`$STRING`","key$":"strArtistThumb","index$":51},"strArtistWideThumb":{"a":true,"h":"Str Artist Wide Thumb","n":"strArtistWideThumb","r":false,"sh":"URL to artist wide thumbnail","t":"`$STRING`","key$":"strArtistWideThumb","index$":52},"strBBCReviewID":{"a":true,"h":"Str Bbc Review Id","n":"strBBCReviewID","r":false,"sh":"BBC Review ID","t":"`$STRING`","key$":"strBBCReviewID","index$":53},"strBiographyCN":{"a":true,"h":"Str Biography Cn","n":"strBiographyCN","r":false,"sh":"Artist biography in Chinese","t":"`$STRING`","key$":"strBiographyCN","index$":54},"strBiographyDE":{"a":true,"h":"Str Biography De","n":"strBiographyDE","r":false,"sh":"Artist biography in German","t":"`$STRING`","key$":"strBiographyDE","index$":55},"strBiographyEN":{"a":true,"h":"Str Biography En","n":"strBiographyEN","r":false,"sh":"Artist biography in English","t":"`$STRING`","key$":"strBiographyEN","index$":56},"strBiographyES":{"a":true,"h":"Str Biography Es","n":"strBiographyES","r":false,"sh":"Artist biography in Spanish","t":"`$STRING`","key$":"strBiographyES","index$":57},"strBiographyFR":{"a":true,"h":"Str Biography Fr","n":"strBiographyFR","r":false,"sh":"Artist biography in French","t":"`$STRING`","key$":"strBiographyFR","index$":58},"strBiographyHU":{"a":true,"h":"Str Biography Hu","n":"strBiographyHU","r":false,"sh":"Artist biography in Hungarian","t":"`$STRING`","key$":"strBiographyHU","index$":59},"strBiographyIL":{"a":true,"h":"Str Biography Il","n":"strBiographyIL","r":false,"sh":"Artist biography in Hebrew","t":"`$STRING`","key$":"strBiographyIL","index$":60},"strBiographyIT":{"a":true,"h":"Str Biography It","n":"strBiographyIT","r":false,"sh":"Artist biography in Italian","t":"`$STRING`","key$":"strBiographyIT","index$":61},"strBiographyJP":{"a":true,"h":"Str Biography Jp","n":"strBiographyJP","r":false,"sh":"Artist biography in Japanese","t":"`$STRING`","key$":"strBiographyJP","index$":62},"strBiographyNL":{"a":true,"h":"Str Biography Nl","n":"strBiographyNL","r":false,"sh":"Artist biography in Dutch","t":"`$STRING`","key$":"strBiographyNL","index$":63},"strBiographyNO":{"a":true,"h":"Str Biography No","n":"strBiographyNO","r":false,"sh":"Artist biography in Norwegian","t":"`$STRING`","key$":"strBiographyNO","index$":64},"strBiographyPL":{"a":true,"h":"Str Biography Pl","n":"strBiographyPL","r":false,"sh":"Artist biography in Polish","t":"`$STRING`","key$":"strBiographyPL","index$":65},"strBiographyPT":{"a":true,"h":"Str Biography Pt","n":"strBiographyPT","r":false,"sh":"Artist biography in Portuguese","t":"`$STRING`","key$":"strBiographyPT","index$":66},"strBiographyRU":{"a":true,"h":"Str Biography Ru","n":"strBiographyRU","r":false,"sh":"Artist biography in Russian","t":"`$STRING`","key$":"strBiographyRU","index$":67},"strBiographySE":{"a":true,"h":"Str Biography Se","n":"strBiographySE","r":false,"sh":"Artist biography in Swedish","t":"`$STRING`","key$":"strBiographySE","index$":68},"strCountry":{"a":true,"h":"Str Country","n":"strCountry","r":false,"sh":"Country of origin","t":"`$STRING`","key$":"strCountry","index$":69},"strCountryCode":{"a":true,"h":"Str Country Code","n":"strCountryCode","r":false,"sh":"Country code","t":"`$STRING`","key$":"strCountryCode","index$":70},"strDescriptionEN":{"a":true,"h":"Str Description En","n":"strDescriptionEN","r":false,"sh":"Album description in English","t":"`$STRING`","key$":"strDescriptionEN","index$":71},"strDisbanded":{"a":true,"h":"Str Disbanded","n":"strDisbanded","r":false,"sh":"Disbanded status","t":"`$STRING`","key$":"strDisbanded","index$":72},"strDiscogsID":{"a":true,"h":"Str Discogs Id","n":"strDiscogsID","r":false,"sh":"Discogs ID","t":"`$STRING`","key$":"strDiscogsID","index$":73},"strFacebook":{"a":true,"h":"Str Facebook","n":"strFacebook","r":false,"sh":"Facebook page URL","t":"`$STRING`","key$":"strFacebook","index$":74},"strGender":{"a":true,"h":"Str Gender","n":"strGender","r":false,"sh":"Artist gender","t":"`$STRING`","key$":"strGender","index$":75},"strGeniusID":{"a":true,"h":"Str Genius Id","n":"strGeniusID","r":false,"sh":"Genius ID","t":"`$STRING`","key$":"strGeniusID","index$":76},"strGenre":{"a":true,"h":"Str Genre","n":"strGenre","r":false,"sh":"Album genre","t":"`$STRING`","key$":"strGenre","index$":77},"strInstagram":{"a":true,"h":"Str Instagram","n":"strInstagram","r":false,"sh":"Instagram profile URL","t":"`$STRING`","key$":"strInstagram","index$":78},"strItunesID":{"a":true,"h":"Str Itunes Id","n":"strItunesID","r":false,"sh":"iTunes ID","t":"`$STRING`","key$":"strItunesID","index$":79},"strLabel":{"a":true,"h":"Str Label","n":"strLabel","r":false,"sh":"Record label","t":"`$STRING`","key$":"strLabel","index$":80},"strLastFMChart":{"a":true,"h":"Str Last Fm Chart","n":"strLastFMChart","r":false,"sh":"Last.fm chart URL","t":"`$STRING`","key$":"strLastFMChart","index$":81},"strLocation":{"a":true,"h":"Str Location","n":"strLocation","r":false,"sh":"Recording location","t":"`$STRING`","key$":"strLocation","index$":82},"strLocked":{"a":true,"h":"Str Locked","n":"strLocked","r":false,"sh":"Whether the record is locked","t":"`$STRING`","key$":"strLocked","index$":83},"strLyricWikiID":{"a":true,"h":"Str Lyric Wiki Id","n":"strLyricWikiID","r":false,"sh":"LyricWiki ID","t":"`$STRING`","key$":"strLyricWikiID","index$":84},"strMood":{"a":true,"h":"Str Mood","n":"strMood","r":false,"sh":"Album mood","t":"`$STRING`","key$":"strMood","index$":85},"strMusicBrainzAlbumID":{"a":true,"h":"Str Music Brainz Album Id","n":"strMusicBrainzAlbumID","r":false,"sh":"MusicBrainz Album ID","t":"`$STRING`","key$":"strMusicBrainzAlbumID","index$":86},"strMusicBrainzArtistID":{"a":true,"h":"Str Music Brainz Artist Id","n":"strMusicBrainzArtistID","r":false,"sh":"MusicBrainz Artist ID","t":"`$STRING`","key$":"strMusicBrainzArtistID","index$":87},"strMusicBrainzID":{"a":true,"h":"Str Music Brainz Id","n":"strMusicBrainzID","r":false,"sh":"MusicBrainz Release Group ID","t":"`$STRING`","key$":"strMusicBrainzID","index$":88},"strMusicMozID":{"a":true,"h":"Str Music Moz Id","n":"strMusicMozID","r":false,"sh":"MusicMoz ID","t":"`$STRING`","key$":"strMusicMozID","index$":89},"strMusicVid":{"a":true,"h":"Str Music Vid","n":"strMusicVid","r":false,"sh":"URL to music video","t":"`$STRING`","key$":"strMusicVid","index$":90},"strMusicVidCompany":{"a":true,"h":"Str Music Vid Company","n":"strMusicVidCompany","r":false,"sh":"Music video production company","t":"`$STRING`","key$":"strMusicVidCompany","index$":91},"strMusicVidDirector":{"a":true,"h":"Str Music Vid Director","n":"strMusicVidDirector","r":false,"sh":"Music video director","t":"`$STRING`","key$":"strMusicVidDirector","index$":92},"strMusicVidScreen1":{"a":true,"h":"Str Music Vid Screen1","n":"strMusicVidScreen1","r":false,"sh":"URL to music video screenshot 1","t":"`$STRING`","key$":"strMusicVidScreen1","index$":93},"strMusicVidScreen2":{"a":true,"h":"Str Music Vid Screen2","n":"strMusicVidScreen2","r":false,"sh":"URL to music video screenshot 2","t":"`$STRING`","key$":"strMusicVidScreen2","index$":94},"strMusicVidScreen3":{"a":true,"h":"Str Music Vid Screen3","n":"strMusicVidScreen3","r":false,"sh":"URL to music video screenshot 3","t":"`$STRING`","key$":"strMusicVidScreen3","index$":95},"strRateYourMusicID":{"a":true,"h":"Str Rate Your Music Id","n":"strRateYourMusicID","r":false,"sh":"RateYourMusic ID","t":"`$STRING`","key$":"strRateYourMusicID","index$":96},"strReleaseFormat":{"a":true,"h":"Str Release Format","n":"strReleaseFormat","r":false,"sh":"Release format (CD, Vinyl, etc.)","t":"`$STRING`","key$":"strReleaseFormat","index$":97},"strReview":{"a":true,"h":"Str Review","n":"strReview","r":false,"sh":"Album review","t":"`$STRING`","key$":"strReview","index$":98},"strSoundCloud":{"a":true,"h":"Str Sound Cloud","n":"strSoundCloud","r":false,"sh":"SoundCloud profile URL","t":"`$STRING`","key$":"strSoundCloud","index$":99},"strSpeed":{"a":true,"h":"Str Speed","n":"strSpeed","r":false,"sh":"Album speed","t":"`$STRING`","key$":"strSpeed","index$":100},"strSpotify":{"a":true,"h":"Str Spotify","n":"strSpotify","r":false,"sh":"Spotify artist URL","t":"`$STRING`","key$":"strSpotify","index$":101},"strStyle":{"a":true,"h":"Str Style","n":"strStyle","r":false,"sh":"Album style","t":"`$STRING`","key$":"strStyle","index$":102},"strTheme":{"a":true,"h":"Str Theme","n":"strTheme","r":false,"sh":"Album theme","t":"`$STRING`","key$":"strTheme","index$":103},"strTrack":{"a":true,"h":"Str Track","n":"strTrack","r":false,"sh":"Track title","t":"`$STRING`","key$":"strTrack","index$":104},"strTrackLyrics":{"a":true,"h":"Str Track Lyrics","n":"strTrackLyrics","r":false,"sh":"Track lyrics","t":"`$STRING`","key$":"strTrackLyrics","index$":105},"strTrackThumb":{"a":true,"h":"Str Track Thumb","n":"strTrackThumb","r":false,"sh":"URL to track thumbnail","t":"`$STRING`","key$":"strTrackThumb","index$":106},"strTwitter":{"a":true,"h":"Str Twitter","n":"strTwitter","r":false,"sh":"Twitter profile URL","t":"`$STRING`","key$":"strTwitter","index$":107},"strWebsite":{"a":true,"h":"Str Website","n":"strWebsite","r":false,"sh":"Official website URL","t":"`$STRING`","key$":"strWebsite","index$":108},"strWikidataID":{"a":true,"h":"Str Wikidata Id","n":"strWikidataID","r":false,"sh":"Wikidata ID","t":"`$STRING`","key$":"strWikidataID","index$":109},"strWikipediaID":{"a":true,"h":"Str Wikipedia Id","n":"strWikipediaID","r":false,"sh":"Wikipedia ID","t":"`$STRING`","key$":"strWikipediaID","index$":110},"strYoutube":{"a":true,"h":"Str Youtube","n":"strYoutube","r":false,"sh":"YouTube channel URL","t":"`$STRING`","key$":"strYoutube","index$":111}},"name":"v1_lookup","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /album-mb.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"1dc4c347-a1db-32aa-b14f-bc9cc507b843","k":"query","n":"i","or":"i","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/album-mb.php","q":{"exist":["i"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"album-mb.php"}],"t":{"req":"`reqdata`","res":"`body.album`"},"index$":0},{"a":true,"co":{"id":"GET /artist-mb.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"cc197bad-dc9c-440d-a5b5-d52ba2e14234","k":"query","n":"i","or":"i","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/artist-mb.php","q":{"exist":["i"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"artist-mb.php"}],"t":{"req":"`reqdata`","res":"`body.artists`"},"index$":1},{"a":true,"co":{"id":"GET /artist-social.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":112024,"k":"query","n":"i","or":"i","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/artist-social.php","q":{"exist":["i"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"artist-social.php"}],"t":{"req":"`reqdata`","res":"`body.artists`"},"index$":2},{"a":true,"co":{"id":"GET /artist.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":112024,"k":"query","n":"i","or":"i","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/artist.php","q":{"exist":["i"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"artist.php"}],"t":{"req":"`reqdata`","res":"`body.artists`"},"index$":3},{"a":true,"co":{"id":"GET /track-mb.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"50369905-68ca-48d2-912d-b37330ff7dc3","k":"query","n":"i","or":"i","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/track-mb.php","q":{"exist":["i"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"track-mb.php"}],"t":{"req":"`reqdata`","res":"`body.track`"},"index$":4},{"a":true,"co":{"id":"GET /album.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":112024,"k":"query","n":"i","or":"i","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2115888,"k":"query","n":"m","or":"m","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/album.php","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"album.php"}],"t":{"req":"`reqdata`","res":"`body.album`"},"index$":5},{"a":true,"co":{"id":"GET /track.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":32793500,"k":"query","n":"h","or":"h","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2115888,"k":"query","n":"m","or":"m","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/track.php","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"track.php"}],"t":{"req":"`reqdata`","res":"`body.track`"},"index$":6}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"v1_lookup","name__orig":"v1_lookup","Name":"V1Lookup","name_":"v1_lookup","name-":"v1-lookup","NAME":"V1_LOOKUP","index$":1}, {"active":true,"entity":"v1_lookup","key$":"BasicV1LookupFlow","kind":"basic","name":"BasicV1LookupFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"v1_lookup_ref01"}}],"index$":0}]}, 'V1Lookup', {"GET /album-mb.php":{"protocol":"http","parameters":[{"name":"i","in":"query","description":"MusicBrainz Release Group ID","required":true,"schema":{"type":"string"},"example":"1dc4c347-a1db-32aa-b14f-bc9cc507b843","index$":0}]},"GET /artist-mb.php":{"protocol":"http","parameters":[{"name":"i","in":"query","description":"MusicBrainz Artist ID","required":true,"schema":{"type":"string"},"example":"cc197bad-dc9c-440d-a5b5-d52ba2e14234","index$":0}]},"GET /artist-social.php":{"protocol":"http","parameters":[{"name":"i","in":"query","description":"Artist ID","required":true,"schema":{"type":"integer"},"example":112024,"index$":0}]},"GET /artist.php":{"protocol":"http","parameters":[{"name":"i","in":"query","description":"Artist ID","required":true,"schema":{"type":"integer"},"example":112024,"index$":0}]},"GET /track-mb.php":{"protocol":"http","parameters":[{"name":"i","in":"query","description":"MusicBrainz Recording ID","required":true,"schema":{"type":"string"},"example":"50369905-68ca-48d2-912d-b37330ff7dc3","index$":0}]},"GET /album.php":{"protocol":"http","parameters":[{"name":"i","in":"query","description":"Artist ID","required":false,"schema":{"type":"integer"},"example":112024,"index$":0},{"name":"m","in":"query","description":"Album ID","required":false,"schema":{"type":"integer"},"example":2115888,"index$":1}]},"GET /track.php":{"protocol":"http","parameters":[{"name":"m","in":"query","description":"Album ID","required":false,"schema":{"type":"integer"},"example":2115888,"index$":0},{"name":"h","in":"query","description":"Track ID","required":false,"schema":{"type":"integer"},"example":32793500,"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let v1_lookup_ref01_data = Object.values(setup.data.existing.v1_lookup)[0] as any

    // LIST
    const v1_lookup_ref01_ent = client.V1Lookup()
    const v1_lookup_ref01_match: any = {}

    const v1_lookup_ref01_list = (await v1_lookup_ref01_ent.list(v1_lookup_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/v1_lookup/V1LookupTestData.json')

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
    ['v1_lookup01','v1_lookup02','v1_lookup03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_MUSIC_API2_TEST_V1_LOOKUP_ENTID': idmap,
    'FREE_MUSIC_API2_TEST_LIVE': 'FALSE',
    'FREE_MUSIC_API2_TEST_EXPLAIN': 'FALSE',
    'FREE_MUSIC_API2_APIKEY': '',
  })

  idmap = env['FREE_MUSIC_API2_TEST_V1_LOOKUP_ENTID']

  const live = 'TRUE' === env.FREE_MUSIC_API2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_MUSIC_API2_TEST_V1_LOOKUP_ENTID']
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
  
