

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


describe('V2SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_MUSIC_API2_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_MUSIC_API2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeMusicApi2SDK.test()
    const ent = testsdk.V2Search()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FreeMusicApi2SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.V2Search().list({"album_name":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_MUSIC_API2_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'v2_search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"idAlbum":{"a":true,"h":"Id Album","n":"idAlbum","r":false,"sh":"Unique album ID","t":"`$INTEGER`","key$":"idAlbum","index$":0},"idArtist":{"a":true,"h":"Id Artist","n":"idArtist","r":false,"sh":"Artist ID","t":"`$INTEGER`","key$":"idArtist","index$":1},"idIMVDB":{"a":true,"h":"Id Imvdb","n":"idIMVDB","r":false,"sh":"IMVDB ID","t":"`$INTEGER`","key$":"idIMVDB","index$":2},"idLabel":{"a":true,"h":"Id Label","n":"idLabel","r":false,"sh":"Label ID","t":"`$INTEGER`","key$":"idLabel","index$":3},"idLyric":{"a":true,"h":"Id Lyric","n":"idLyric","r":false,"sh":"Lyrics ID","t":"`$INTEGER`","key$":"idLyric","index$":4},"idTrack":{"a":true,"h":"Id Track","n":"idTrack","r":false,"sh":"Unique track ID","t":"`$INTEGER`","key$":"idTrack","index$":5},"intBornYear":{"a":true,"h":"Int Born Year","n":"intBornYear","r":false,"sh":"Birth year of the artist","t":"`$INTEGER`","key$":"intBornYear","index$":6},"intCD":{"a":true,"h":"Int Cd","n":"intCD","r":false,"sh":"CD number","t":"`$INTEGER`","key$":"intCD","index$":7},"intCharted":{"a":true,"h":"Int Charted","n":"intCharted","r":false,"sh":"Chart position","t":"`$INTEGER`","key$":"intCharted","index$":8},"intDiedYear":{"a":true,"h":"Int Died Year","n":"intDiedYear","r":false,"sh":"Year the artist died (if applicable)","t":"`$INTEGER`","key$":"intDiedYear","index$":9},"intDuration":{"a":true,"h":"Int Duration","n":"intDuration","r":false,"sh":"Track duration in milliseconds","t":"`$INTEGER`","key$":"intDuration","index$":10},"intFormedYear":{"a":true,"h":"Int Formed Year","n":"intFormedYear","r":false,"sh":"Year the artist/band was formed","t":"`$INTEGER`","key$":"intFormedYear","index$":11},"intLoved":{"a":true,"h":"Int Loved","n":"intLoved","r":false,"sh":"Number of loves/likes","t":"`$INTEGER`","key$":"intLoved","index$":12},"intMembers":{"a":true,"h":"Int Members","n":"intMembers","r":false,"sh":"Number of band members","t":"`$INTEGER`","key$":"intMembers","index$":13},"intMusicVidComments":{"a":true,"h":"Int Music Vid Comments","n":"intMusicVidComments","r":false,"sh":"Number of music video comments","t":"`$INTEGER`","key$":"intMusicVidComments","index$":14},"intMusicVidDislikes":{"a":true,"h":"Int Music Vid Dislikes","n":"intMusicVidDislikes","r":false,"sh":"Number of music video dislikes","t":"`$INTEGER`","key$":"intMusicVidDislikes","index$":15},"intMusicVidFavorites":{"a":true,"h":"Int Music Vid Favorites","n":"intMusicVidFavorites","r":false,"sh":"Number of music video favorites","t":"`$INTEGER`","key$":"intMusicVidFavorites","index$":16},"intMusicVidLikes":{"a":true,"h":"Int Music Vid Likes","n":"intMusicVidLikes","r":false,"sh":"Number of music video likes","t":"`$INTEGER`","key$":"intMusicVidLikes","index$":17},"intMusicVidViews":{"a":true,"h":"Int Music Vid Views","n":"intMusicVidViews","r":false,"sh":"Number of music video views","t":"`$INTEGER`","key$":"intMusicVidViews","index$":18},"intSales":{"a":true,"h":"Int Sales","n":"intSales","r":false,"sh":"Number of sales","t":"`$INTEGER`","key$":"intSales","index$":19},"intScore":{"a":true,"h":"Int Score","n":"intScore","r":false,"sh":"Album score","t":"`$INTEGER`","key$":"intScore","index$":20},"intScoreVotes":{"a":true,"h":"Int Score Votes","n":"intScoreVotes","r":false,"sh":"Number of score votes","t":"`$INTEGER`","key$":"intScoreVotes","index$":21},"intTotalListeners":{"a":true,"h":"Int Total Listeners","n":"intTotalListeners","r":false,"sh":"Total number of listeners","t":"`$INTEGER`","key$":"intTotalListeners","index$":22},"intTotalPlays":{"a":true,"h":"Int Total Plays","n":"intTotalPlays","r":false,"sh":"Total number of plays","t":"`$INTEGER`","key$":"intTotalPlays","index$":23},"intTrackNumber":{"a":true,"h":"Int Track Number","n":"intTrackNumber","r":false,"sh":"Track number on album","t":"`$INTEGER`","key$":"intTrackNumber","index$":24},"intYearReleased":{"a":true,"h":"Int Year Released","n":"intYearReleased","r":false,"sh":"Year the album was released","t":"`$INTEGER`","key$":"intYearReleased","index$":25},"strAlbum":{"a":true,"h":"Str Album","n":"strAlbum","r":false,"sh":"Album title","t":"`$STRING`","key$":"strAlbum","index$":26},"strAlbum3DCase":{"a":true,"h":"Str Album3 D Case","n":"strAlbum3DCase","r":false,"sh":"URL to 3D case image","t":"`$STRING`","key$":"strAlbum3DCase","index$":27},"strAlbum3DFace":{"a":true,"h":"Str Album3 D Face","n":"strAlbum3DFace","r":false,"sh":"URL to 3D face image","t":"`$STRING`","key$":"strAlbum3DFace","index$":28},"strAlbum3DFlat":{"a":true,"h":"Str Album3 D Flat","n":"strAlbum3DFlat","r":false,"sh":"URL to 3D flat image","t":"`$STRING`","key$":"strAlbum3DFlat","index$":29},"strAlbum3DThumb":{"a":true,"h":"Str Album3 D Thumb","n":"strAlbum3DThumb","r":false,"sh":"URL to 3D thumbnail","t":"`$STRING`","key$":"strAlbum3DThumb","index$":30},"strAlbumCDart":{"a":true,"h":"Str Album C Dart","n":"strAlbumCDart","r":false,"sh":"URL to CD art","t":"`$STRING`","key$":"strAlbumCDart","index$":31},"strAlbumSpine":{"a":true,"h":"Str Album Spine","n":"strAlbumSpine","r":false,"sh":"URL to album spine image","t":"`$STRING`","key$":"strAlbumSpine","index$":32},"strAlbumStripped":{"a":true,"h":"Str Album Stripped","n":"strAlbumStripped","r":false,"sh":"Album title without special characters","t":"`$STRING`","key$":"strAlbumStripped","index$":33},"strAlbumThumb":{"a":true,"h":"Str Album Thumb","n":"strAlbumThumb","r":false,"sh":"URL to album thumbnail","t":"`$STRING`","key$":"strAlbumThumb","index$":34},"strAlbumThumbBack":{"a":true,"h":"Str Album Thumb Back","n":"strAlbumThumbBack","r":false,"sh":"URL to back of album cover","t":"`$STRING`","key$":"strAlbumThumbBack","index$":35},"strAlbumThumbHQ":{"a":true,"h":"Str Album Thumb Hq","n":"strAlbumThumbHQ","r":false,"sh":"URL to high quality album thumbnail","t":"`$STRING`","key$":"strAlbumThumbHQ","index$":36},"strAllMusicID":{"a":true,"h":"Str All Music Id","n":"strAllMusicID","r":false,"sh":"AllMusic ID","t":"`$STRING`","key$":"strAllMusicID","index$":37},"strAmazonID":{"a":true,"h":"Str Amazon Id","n":"strAmazonID","r":false,"sh":"Amazon ID","t":"`$STRING`","key$":"strAmazonID","index$":38},"strArtist":{"a":true,"h":"Str Artist","n":"strArtist","r":false,"sh":"Artist name","t":"`$STRING`","key$":"strArtist","index$":39},"strArtistAlternate":{"a":true,"h":"Str Artist Alternate","n":"strArtistAlternate","r":false,"sh":"Alternate artist name","t":"`$STRING`","key$":"strArtistAlternate","index$":40},"strArtistBanner":{"a":true,"h":"Str Artist Banner","n":"strArtistBanner","r":false,"sh":"URL to artist banner","t":"`$STRING`","key$":"strArtistBanner","index$":41},"strArtistClearart":{"a":true,"h":"Str Artist Clearart","n":"strArtistClearart","r":false,"sh":"URL to artist clearart","t":"`$STRING`","key$":"strArtistClearart","index$":42},"strArtistCutout":{"a":true,"h":"Str Artist Cutout","n":"strArtistCutout","r":false,"sh":"URL to artist cutout image","t":"`$STRING`","key$":"strArtistCutout","index$":43},"strArtistFanart":{"a":true,"h":"Str Artist Fanart","n":"strArtistFanart","r":false,"sh":"URL to artist fanart","t":"`$STRING`","key$":"strArtistFanart","index$":44},"strArtistFanart2":{"a":true,"h":"Str Artist Fanart2","n":"strArtistFanart2","r":false,"sh":"URL to alternate artist fanart","t":"`$STRING`","key$":"strArtistFanart2","index$":45},"strArtistFanart3":{"a":true,"h":"Str Artist Fanart3","n":"strArtistFanart3","r":false,"sh":"URL to third artist fanart","t":"`$STRING`","key$":"strArtistFanart3","index$":46},"strArtistFanart4":{"a":true,"h":"Str Artist Fanart4","n":"strArtistFanart4","r":false,"sh":"URL to fourth artist fanart","t":"`$STRING`","key$":"strArtistFanart4","index$":47},"strArtistLogo":{"a":true,"h":"Str Artist Logo","n":"strArtistLogo","r":false,"sh":"URL to artist logo","t":"`$STRING`","key$":"strArtistLogo","index$":48},"strArtistStripped":{"a":true,"h":"Str Artist Stripped","n":"strArtistStripped","r":false,"sh":"Artist name without special characters","t":"`$STRING`","key$":"strArtistStripped","index$":49},"strArtistThumb":{"a":true,"h":"Str Artist Thumb","n":"strArtistThumb","r":false,"sh":"URL to artist thumbnail image","t":"`$STRING`","key$":"strArtistThumb","index$":50},"strArtistWideThumb":{"a":true,"h":"Str Artist Wide Thumb","n":"strArtistWideThumb","r":false,"sh":"URL to artist wide thumbnail","t":"`$STRING`","key$":"strArtistWideThumb","index$":51},"strBBCReviewID":{"a":true,"h":"Str Bbc Review Id","n":"strBBCReviewID","r":false,"sh":"BBC Review ID","t":"`$STRING`","key$":"strBBCReviewID","index$":52},"strBiographyCN":{"a":true,"h":"Str Biography Cn","n":"strBiographyCN","r":false,"sh":"Artist biography in Chinese","t":"`$STRING`","key$":"strBiographyCN","index$":53},"strBiographyDE":{"a":true,"h":"Str Biography De","n":"strBiographyDE","r":false,"sh":"Artist biography in German","t":"`$STRING`","key$":"strBiographyDE","index$":54},"strBiographyEN":{"a":true,"h":"Str Biography En","n":"strBiographyEN","r":false,"sh":"Artist biography in English","t":"`$STRING`","key$":"strBiographyEN","index$":55},"strBiographyES":{"a":true,"h":"Str Biography Es","n":"strBiographyES","r":false,"sh":"Artist biography in Spanish","t":"`$STRING`","key$":"strBiographyES","index$":56},"strBiographyFR":{"a":true,"h":"Str Biography Fr","n":"strBiographyFR","r":false,"sh":"Artist biography in French","t":"`$STRING`","key$":"strBiographyFR","index$":57},"strBiographyHU":{"a":true,"h":"Str Biography Hu","n":"strBiographyHU","r":false,"sh":"Artist biography in Hungarian","t":"`$STRING`","key$":"strBiographyHU","index$":58},"strBiographyIL":{"a":true,"h":"Str Biography Il","n":"strBiographyIL","r":false,"sh":"Artist biography in Hebrew","t":"`$STRING`","key$":"strBiographyIL","index$":59},"strBiographyIT":{"a":true,"h":"Str Biography It","n":"strBiographyIT","r":false,"sh":"Artist biography in Italian","t":"`$STRING`","key$":"strBiographyIT","index$":60},"strBiographyJP":{"a":true,"h":"Str Biography Jp","n":"strBiographyJP","r":false,"sh":"Artist biography in Japanese","t":"`$STRING`","key$":"strBiographyJP","index$":61},"strBiographyNL":{"a":true,"h":"Str Biography Nl","n":"strBiographyNL","r":false,"sh":"Artist biography in Dutch","t":"`$STRING`","key$":"strBiographyNL","index$":62},"strBiographyNO":{"a":true,"h":"Str Biography No","n":"strBiographyNO","r":false,"sh":"Artist biography in Norwegian","t":"`$STRING`","key$":"strBiographyNO","index$":63},"strBiographyPL":{"a":true,"h":"Str Biography Pl","n":"strBiographyPL","r":false,"sh":"Artist biography in Polish","t":"`$STRING`","key$":"strBiographyPL","index$":64},"strBiographyPT":{"a":true,"h":"Str Biography Pt","n":"strBiographyPT","r":false,"sh":"Artist biography in Portuguese","t":"`$STRING`","key$":"strBiographyPT","index$":65},"strBiographyRU":{"a":true,"h":"Str Biography Ru","n":"strBiographyRU","r":false,"sh":"Artist biography in Russian","t":"`$STRING`","key$":"strBiographyRU","index$":66},"strBiographySE":{"a":true,"h":"Str Biography Se","n":"strBiographySE","r":false,"sh":"Artist biography in Swedish","t":"`$STRING`","key$":"strBiographySE","index$":67},"strCountry":{"a":true,"h":"Str Country","n":"strCountry","r":false,"sh":"Country of origin","t":"`$STRING`","key$":"strCountry","index$":68},"strCountryCode":{"a":true,"h":"Str Country Code","n":"strCountryCode","r":false,"sh":"Country code","t":"`$STRING`","key$":"strCountryCode","index$":69},"strDescriptionEN":{"a":true,"h":"Str Description En","n":"strDescriptionEN","r":false,"sh":"Album description in English","t":"`$STRING`","key$":"strDescriptionEN","index$":70},"strDisbanded":{"a":true,"h":"Str Disbanded","n":"strDisbanded","r":false,"sh":"Disbanded status","t":"`$STRING`","key$":"strDisbanded","index$":71},"strDiscogsID":{"a":true,"h":"Str Discogs Id","n":"strDiscogsID","r":false,"sh":"Discogs ID","t":"`$STRING`","key$":"strDiscogsID","index$":72},"strFacebook":{"a":true,"h":"Str Facebook","n":"strFacebook","r":false,"sh":"Facebook page URL","t":"`$STRING`","key$":"strFacebook","index$":73},"strGender":{"a":true,"h":"Str Gender","n":"strGender","r":false,"sh":"Artist gender","t":"`$STRING`","key$":"strGender","index$":74},"strGeniusID":{"a":true,"h":"Str Genius Id","n":"strGeniusID","r":false,"sh":"Genius ID","t":"`$STRING`","key$":"strGeniusID","index$":75},"strGenre":{"a":true,"h":"Str Genre","n":"strGenre","r":false,"sh":"Album genre","t":"`$STRING`","key$":"strGenre","index$":76},"strItunesID":{"a":true,"h":"Str Itunes Id","n":"strItunesID","r":false,"sh":"iTunes ID","t":"`$STRING`","key$":"strItunesID","index$":77},"strLabel":{"a":true,"h":"Str Label","n":"strLabel","r":false,"sh":"Record label","t":"`$STRING`","key$":"strLabel","index$":78},"strLastFMChart":{"a":true,"h":"Str Last Fm Chart","n":"strLastFMChart","r":false,"sh":"Last.fm chart URL","t":"`$STRING`","key$":"strLastFMChart","index$":79},"strLocation":{"a":true,"h":"Str Location","n":"strLocation","r":false,"sh":"Recording location","t":"`$STRING`","key$":"strLocation","index$":80},"strLocked":{"a":true,"h":"Str Locked","n":"strLocked","r":false,"sh":"Whether the record is locked","t":"`$STRING`","key$":"strLocked","index$":81},"strLyricWikiID":{"a":true,"h":"Str Lyric Wiki Id","n":"strLyricWikiID","r":false,"sh":"LyricWiki ID","t":"`$STRING`","key$":"strLyricWikiID","index$":82},"strMood":{"a":true,"h":"Str Mood","n":"strMood","r":false,"sh":"Album mood","t":"`$STRING`","key$":"strMood","index$":83},"strMusicBrainzAlbumID":{"a":true,"h":"Str Music Brainz Album Id","n":"strMusicBrainzAlbumID","r":false,"sh":"MusicBrainz Album ID","t":"`$STRING`","key$":"strMusicBrainzAlbumID","index$":84},"strMusicBrainzArtistID":{"a":true,"h":"Str Music Brainz Artist Id","n":"strMusicBrainzArtistID","r":false,"sh":"MusicBrainz Artist ID","t":"`$STRING`","key$":"strMusicBrainzArtistID","index$":85},"strMusicBrainzID":{"a":true,"h":"Str Music Brainz Id","n":"strMusicBrainzID","r":false,"sh":"MusicBrainz Release Group ID","t":"`$STRING`","key$":"strMusicBrainzID","index$":86},"strMusicMozID":{"a":true,"h":"Str Music Moz Id","n":"strMusicMozID","r":false,"sh":"MusicMoz ID","t":"`$STRING`","key$":"strMusicMozID","index$":87},"strMusicVid":{"a":true,"h":"Str Music Vid","n":"strMusicVid","r":false,"sh":"URL to music video","t":"`$STRING`","key$":"strMusicVid","index$":88},"strMusicVidCompany":{"a":true,"h":"Str Music Vid Company","n":"strMusicVidCompany","r":false,"sh":"Music video production company","t":"`$STRING`","key$":"strMusicVidCompany","index$":89},"strMusicVidDirector":{"a":true,"h":"Str Music Vid Director","n":"strMusicVidDirector","r":false,"sh":"Music video director","t":"`$STRING`","key$":"strMusicVidDirector","index$":90},"strMusicVidScreen1":{"a":true,"h":"Str Music Vid Screen1","n":"strMusicVidScreen1","r":false,"sh":"URL to music video screenshot 1","t":"`$STRING`","key$":"strMusicVidScreen1","index$":91},"strMusicVidScreen2":{"a":true,"h":"Str Music Vid Screen2","n":"strMusicVidScreen2","r":false,"sh":"URL to music video screenshot 2","t":"`$STRING`","key$":"strMusicVidScreen2","index$":92},"strMusicVidScreen3":{"a":true,"h":"Str Music Vid Screen3","n":"strMusicVidScreen3","r":false,"sh":"URL to music video screenshot 3","t":"`$STRING`","key$":"strMusicVidScreen3","index$":93},"strRateYourMusicID":{"a":true,"h":"Str Rate Your Music Id","n":"strRateYourMusicID","r":false,"sh":"RateYourMusic ID","t":"`$STRING`","key$":"strRateYourMusicID","index$":94},"strReleaseFormat":{"a":true,"h":"Str Release Format","n":"strReleaseFormat","r":false,"sh":"Release format (CD, Vinyl, etc.)","t":"`$STRING`","key$":"strReleaseFormat","index$":95},"strReview":{"a":true,"h":"Str Review","n":"strReview","r":false,"sh":"Album review","t":"`$STRING`","key$":"strReview","index$":96},"strSpeed":{"a":true,"h":"Str Speed","n":"strSpeed","r":false,"sh":"Album speed","t":"`$STRING`","key$":"strSpeed","index$":97},"strStyle":{"a":true,"h":"Str Style","n":"strStyle","r":false,"sh":"Album style","t":"`$STRING`","key$":"strStyle","index$":98},"strTheme":{"a":true,"h":"Str Theme","n":"strTheme","r":false,"sh":"Album theme","t":"`$STRING`","key$":"strTheme","index$":99},"strTrack":{"a":true,"h":"Str Track","n":"strTrack","r":false,"sh":"Track title","t":"`$STRING`","key$":"strTrack","index$":100},"strTrackLyrics":{"a":true,"h":"Str Track Lyrics","n":"strTrackLyrics","r":false,"sh":"Track lyrics","t":"`$STRING`","key$":"strTrackLyrics","index$":101},"strTrackThumb":{"a":true,"h":"Str Track Thumb","n":"strTrackThumb","r":false,"sh":"URL to track thumbnail","t":"`$STRING`","key$":"strTrackThumb","index$":102},"strTwitter":{"a":true,"h":"Str Twitter","n":"strTwitter","r":false,"sh":"Twitter profile URL","t":"`$STRING`","key$":"strTwitter","index$":103},"strWebsite":{"a":true,"h":"Str Website","n":"strWebsite","r":false,"sh":"Official website URL","t":"`$STRING`","key$":"strWebsite","index$":104},"strWikidataID":{"a":true,"h":"Str Wikidata Id","n":"strWikidataID","r":false,"sh":"Wikidata ID","t":"`$STRING`","key$":"strWikidataID","index$":105},"strWikipediaID":{"a":true,"h":"Str Wikipedia Id","n":"strWikipediaID","r":false,"sh":"Wikipedia ID","t":"`$STRING`","key$":"strWikipediaID","index$":106}},"name":"v2_search","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search/album/{albumName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"parachutes","k":"param","n":"album_name","or":"albumName","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/search/album/{albumName}","q":{"exist":["album_name"]},"r":{"param":{"albumName":"album_name"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"},{"lit":"album"},{"var":"album_name"}],"t":{"req":"`reqdata`","res":"`body.albums`"},"index$":0},{"a":true,"co":{"id":"GET /search/artist/{artistName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"coldplay","k":"param","n":"artist_name","or":"artistName","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/search/artist/{artistName}","q":{"exist":["artist_name"]},"r":{"param":{"artistName":"artist_name"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"},{"lit":"artist"},{"var":"artist_name"}],"t":{"req":"`reqdata`","res":"`body.artists`"},"index$":1},{"a":true,"co":{"id":"GET /search/track/{trackName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"yellow","k":"param","n":"track_name","or":"trackName","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/search/track/{trackName}","q":{"exist":["track_name"]},"r":{"param":{"trackName":"track_name"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"},{"lit":"track"},{"var":"track_name"}],"t":{"req":"`reqdata`","res":"`body.tracks`"},"index$":2}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"v2_search","name__orig":"v2_search","Name":"V2Search","name_":"v2_search","name-":"v2-search","NAME":"V2_SEARCH","index$":5}, {"active":true,"entity":"v2_search","key$":"BasicV2SearchFlow","kind":"basic","name":"BasicV2SearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"track_name":"track_name01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"v2_search_ref01"}}],"index$":0}]}, 'V2Search', {"GET /search/album/{albumName}":{"protocol":"http","parameters":[{"name":"albumName","in":"path","description":"Album name to search for","required":true,"schema":{"type":"string"},"example":"parachutes","index$":0}]},"GET /search/artist/{artistName}":{"protocol":"http","parameters":[{"name":"artistName","in":"path","description":"Artist name to search for","required":true,"schema":{"type":"string"},"example":"coldplay","index$":0}]},"GET /search/track/{trackName}":{"protocol":"http","parameters":[{"name":"trackName","in":"path","description":"Track name to search for","required":true,"schema":{"type":"string"},"example":"yellow","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let v2_search_ref01_data = Object.values(setup.data.existing.v2_search)[0] as any

    // LIST
    const v2_search_ref01_ent = client.V2Search()
    const v2_search_ref01_match: any = {}
    v2_search_ref01_match['track_name'] = setup.idmap['track_name01']

    const v2_search_ref01_list = (await v2_search_ref01_ent.list(v2_search_ref01_match)).map((e: any) => e.data())


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
    ['v2_search01','v2_search02','v2_search03','track_name01'],
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
  
