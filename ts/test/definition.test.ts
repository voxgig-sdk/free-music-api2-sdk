import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "v1_list",
    "accessor": "V1List",
    "op": "list",
    "method": "GET",
    "path": "/trending.php",
    "args": [],
    "select": {
      "country": "us",
      "format": "albums",
      "type": "itunes"
    },
    "headers": [],
    "query": [
      "country",
      "type",
      "format"
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "trending": [
        {}
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v1_list",
    "accessor": "V1List",
    "op": "list",
    "method": "GET",
    "path": "/mostloved.php",
    "args": [],
    "select": {
      "format": "track"
    },
    "headers": [],
    "query": [
      "format"
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "loved": [
        {}
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v1_lookup",
    "accessor": "V1Lookup",
    "op": "list",
    "method": "GET",
    "path": "/track.php",
    "args": [],
    "select": {
      "h": 32793500,
      "m": 2115888
    },
    "headers": [],
    "query": [
      "m",
      "h"
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "track": [
        {
          "idAlbum": 1,
          "idArtist": 1,
          "idIMVDB": 1,
          "idLyric": 1,
          "idTrack": 1,
          "intCD": 1,
          "intDuration": 1,
          "intLoved": 1,
          "intMusicVidComments": 1,
          "intMusicVidDislikes": 1,
          "intMusicVidFavorites": 1,
          "intMusicVidLikes": 1,
          "intMusicVidViews": 1,
          "intScore": 1,
          "intScoreVotes": 1,
          "intTotalListeners": 1,
          "intTotalPlays": 1,
          "intTrackNumber": 1,
          "strAlbum": "x",
          "strArtist": "x",
          "strArtistAlternate": "x",
          "strDescriptionEN": "x",
          "strGenre": "x",
          "strLocked": "x",
          "strMood": "x",
          "strMusicBrainzAlbumID": "x",
          "strMusicBrainzArtistID": "x",
          "strMusicBrainzID": "x",
          "strMusicVid": "x",
          "strMusicVidCompany": "x",
          "strMusicVidDirector": "x",
          "strMusicVidScreen1": "x",
          "strMusicVidScreen2": "x",
          "strMusicVidScreen3": "x",
          "strStyle": "x",
          "strTheme": "x",
          "strTrack": "x",
          "strTrackLyrics": "x",
          "strTrackThumb": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v1_lookup",
    "accessor": "V1Lookup",
    "op": "list",
    "method": "GET",
    "path": "/album.php",
    "args": [],
    "select": {
      "i": 112024,
      "m": 2115888
    },
    "headers": [],
    "query": [
      "i",
      "m"
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "album": [
        {
          "idAlbum": 1,
          "idArtist": 1,
          "idLabel": 1,
          "intLoved": 1,
          "intSales": 1,
          "intScore": 1,
          "intScoreVotes": 1,
          "intYearReleased": 1,
          "strAlbum": "x",
          "strAlbum3DCase": "x",
          "strAlbum3DFace": "x",
          "strAlbum3DFlat": "x",
          "strAlbum3DThumb": "x",
          "strAlbumCDart": "x",
          "strAlbumSpine": "x",
          "strAlbumStripped": "x",
          "strAlbumThumb": "x",
          "strAlbumThumbBack": "x",
          "strAlbumThumbHQ": "x",
          "strAllMusicID": "x",
          "strAmazonID": "x",
          "strArtist": "x",
          "strArtistStripped": "x",
          "strBBCReviewID": "x",
          "strDescriptionEN": "x",
          "strDiscogsID": "x",
          "strGeniusID": "x",
          "strGenre": "x",
          "strItunesID": "x",
          "strLabel": "x",
          "strLocation": "x",
          "strLocked": "x",
          "strLyricWikiID": "x",
          "strMood": "x",
          "strMusicBrainzArtistID": "x",
          "strMusicBrainzID": "x",
          "strMusicMozID": "x",
          "strRateYourMusicID": "x",
          "strReleaseFormat": "x",
          "strReview": "x",
          "strSpeed": "x",
          "strStyle": "x",
          "strTheme": "x",
          "strWikidataID": "x",
          "strWikipediaID": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v1_search",
    "accessor": "V1Search",
    "op": "list",
    "method": "GET",
    "path": "/searchalbum.php",
    "args": [],
    "select": {
      "a": "Homework",
      "s": "daft_punk"
    },
    "headers": [],
    "query": [
      "s",
      "a"
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "album": [
        {
          "idAlbum": 1,
          "idArtist": 1,
          "idLabel": 1,
          "intLoved": 1,
          "intSales": 1,
          "intScore": 1,
          "intScoreVotes": 1,
          "intYearReleased": 1,
          "strAlbum": "x",
          "strAlbum3DCase": "x",
          "strAlbum3DFace": "x",
          "strAlbum3DFlat": "x",
          "strAlbum3DThumb": "x",
          "strAlbumCDart": "x",
          "strAlbumSpine": "x",
          "strAlbumStripped": "x",
          "strAlbumThumb": "x",
          "strAlbumThumbBack": "x",
          "strAlbumThumbHQ": "x",
          "strAllMusicID": "x",
          "strAmazonID": "x",
          "strArtist": "x",
          "strArtistStripped": "x",
          "strBBCReviewID": "x",
          "strDescriptionEN": "x",
          "strDiscogsID": "x",
          "strGeniusID": "x",
          "strGenre": "x",
          "strItunesID": "x",
          "strLabel": "x",
          "strLocation": "x",
          "strLocked": "x",
          "strLyricWikiID": "x",
          "strMood": "x",
          "strMusicBrainzArtistID": "x",
          "strMusicBrainzID": "x",
          "strMusicMozID": "x",
          "strRateYourMusicID": "x",
          "strReleaseFormat": "x",
          "strReview": "x",
          "strSpeed": "x",
          "strStyle": "x",
          "strTheme": "x",
          "strWikidataID": "x",
          "strWikipediaID": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v1_search",
    "accessor": "V1Search",
    "op": "list",
    "method": "GET",
    "path": "/searchtrack.php",
    "args": [],
    "select": {
      "s": "coldplay",
      "t": "yellow"
    },
    "headers": [],
    "query": [
      "s",
      "t"
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "track": [
        {
          "idAlbum": 1,
          "idArtist": 1,
          "idIMVDB": 1,
          "idLyric": 1,
          "idTrack": 1,
          "intCD": 1,
          "intDuration": 1,
          "intLoved": 1,
          "intMusicVidComments": 1,
          "intMusicVidDislikes": 1,
          "intMusicVidFavorites": 1,
          "intMusicVidLikes": 1,
          "intMusicVidViews": 1,
          "intScore": 1,
          "intScoreVotes": 1,
          "intTotalListeners": 1,
          "intTotalPlays": 1,
          "intTrackNumber": 1,
          "strAlbum": "x",
          "strArtist": "x",
          "strArtistAlternate": "x",
          "strDescriptionEN": "x",
          "strGenre": "x",
          "strLocked": "x",
          "strMood": "x",
          "strMusicBrainzAlbumID": "x",
          "strMusicBrainzArtistID": "x",
          "strMusicBrainzID": "x",
          "strMusicVid": "x",
          "strMusicVidCompany": "x",
          "strMusicVidDirector": "x",
          "strMusicVidScreen1": "x",
          "strMusicVidScreen2": "x",
          "strMusicVidScreen3": "x",
          "strStyle": "x",
          "strTheme": "x",
          "strTrack": "x",
          "strTrackLyrics": "x",
          "strTrackThumb": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v2_list",
    "accessor": "V2List",
    "op": "load",
    "method": "GET",
    "path": "/list/discography/{artistId}",
    "args": [
      {
        "name": "artist_id",
        "wire": "artistId",
        "value": 111239
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "albums": [
        {
          "idAlbum": 1,
          "idArtist": 1,
          "idLabel": 1,
          "strAlbum": "x",
          "strAlbumStripped": "x",
          "strArtist": "x",
          "strArtistStripped": "x",
          "intYearReleased": 1,
          "strStyle": "x",
          "strGenre": "x",
          "strLabel": "x",
          "strReleaseFormat": "x",
          "intSales": 1,
          "strAlbumThumb": "x",
          "strAlbumThumbHQ": "x",
          "strAlbumThumbBack": "x",
          "strAlbumCDart": "x",
          "strAlbumSpine": "x",
          "strAlbum3DCase": "x",
          "strAlbum3DFlat": "x",
          "strAlbum3DFace": "x",
          "strAlbum3DThumb": "x",
          "strDescriptionEN": "x",
          "intLoved": 1,
          "intScore": 1,
          "intScoreVotes": 1,
          "strReview": "x",
          "strMood": "x",
          "strTheme": "x",
          "strSpeed": "x",
          "strLocation": "x",
          "strMusicBrainzID": "x",
          "strMusicBrainzArtistID": "x",
          "strAllMusicID": "x",
          "strBBCReviewID": "x",
          "strRateYourMusicID": "x",
          "strDiscogsID": "x",
          "strWikidataID": "x",
          "strWikipediaID": "x",
          "strGeniusID": "x",
          "strLyricWikiID": "x",
          "strMusicMozID": "x",
          "strItunesID": "x",
          "strAmazonID": "x",
          "strLocked": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v2_lookup",
    "accessor": "V2Lookup",
    "op": "load",
    "method": "GET",
    "path": "/lookup/album/{albumId}",
    "args": [
      {
        "name": "album_id",
        "wire": "albumId",
        "value": 2109615
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "albums": [
        {
          "idAlbum": 1,
          "idArtist": 1,
          "idLabel": 1,
          "strAlbum": "x",
          "strAlbumStripped": "x",
          "strArtist": "x",
          "strArtistStripped": "x",
          "intYearReleased": 1,
          "strStyle": "x",
          "strGenre": "x",
          "strLabel": "x",
          "strReleaseFormat": "x",
          "intSales": 1,
          "strAlbumThumb": "x",
          "strAlbumThumbHQ": "x",
          "strAlbumThumbBack": "x",
          "strAlbumCDart": "x",
          "strAlbumSpine": "x",
          "strAlbum3DCase": "x",
          "strAlbum3DFlat": "x",
          "strAlbum3DFace": "x",
          "strAlbum3DThumb": "x",
          "strDescriptionEN": "x",
          "intLoved": 1,
          "intScore": 1,
          "intScoreVotes": 1,
          "strReview": "x",
          "strMood": "x",
          "strTheme": "x",
          "strSpeed": "x",
          "strLocation": "x",
          "strMusicBrainzID": "x",
          "strMusicBrainzArtistID": "x",
          "strAllMusicID": "x",
          "strBBCReviewID": "x",
          "strRateYourMusicID": "x",
          "strDiscogsID": "x",
          "strWikidataID": "x",
          "strWikipediaID": "x",
          "strGeniusID": "x",
          "strLyricWikiID": "x",
          "strMusicMozID": "x",
          "strItunesID": "x",
          "strAmazonID": "x",
          "strLocked": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v2_lookup",
    "accessor": "V2Lookup",
    "op": "load",
    "method": "GET",
    "path": "/lookup/artist/{artistId}",
    "args": [
      {
        "name": "artist_id",
        "wire": "artistId",
        "value": 111239
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "artists": [
        {
          "idArtist": 1,
          "strArtist": "x",
          "strArtistAlternate": "x",
          "strLabel": "x",
          "idLabel": 1,
          "intFormedYear": 1,
          "intBornYear": 1,
          "intDiedYear": 1,
          "strDisbanded": "x",
          "strStyle": "x",
          "strGenre": "x",
          "strMood": "x",
          "strWebsite": "x",
          "strFacebook": "x",
          "strTwitter": "x",
          "strBiographyEN": "x",
          "strBiographyCN": "x",
          "strBiographyDE": "x",
          "strBiographyFR": "x",
          "strBiographyIT": "x",
          "strBiographyJP": "x",
          "strBiographyRU": "x",
          "strBiographyES": "x",
          "strBiographyPT": "x",
          "strBiographySE": "x",
          "strBiographyNL": "x",
          "strBiographyHU": "x",
          "strBiographyNO": "x",
          "strBiographyIL": "x",
          "strBiographyPL": "x",
          "strGender": "x",
          "intMembers": 1,
          "strCountry": "x",
          "strCountryCode": "x",
          "strArtistThumb": "x",
          "strArtistLogo": "x",
          "strArtistCutout": "x",
          "strArtistClearart": "x",
          "strArtistWideThumb": "x",
          "strArtistFanart": "x",
          "strArtistFanart2": "x",
          "strArtistFanart3": "x",
          "strArtistFanart4": "x",
          "strArtistBanner": "x",
          "strMusicBrainzID": "x",
          "strLastFMChart": "x",
          "intCharted": 1,
          "strLocked": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v2_lookup",
    "accessor": "V2Lookup",
    "op": "load",
    "method": "GET",
    "path": "/lookup/track/{trackId}",
    "args": [
      {
        "name": "track_id",
        "wire": "trackId",
        "value": 32724183
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "tracks": [
        {
          "idTrack": 1,
          "idAlbum": 1,
          "idArtist": 1,
          "idLyric": 1,
          "idIMVDB": 1,
          "strTrack": "x",
          "strAlbum": "x",
          "strArtist": "x",
          "strArtistAlternate": "x",
          "intCD": 1,
          "intDuration": 1,
          "strGenre": "x",
          "strMood": "x",
          "strStyle": "x",
          "strTheme": "x",
          "strDescriptionEN": "x",
          "strTrackThumb": "x",
          "strTrackLyrics": "x",
          "strMusicVid": "x",
          "strMusicVidDirector": "x",
          "strMusicVidCompany": "x",
          "strMusicVidScreen1": "x",
          "strMusicVidScreen2": "x",
          "strMusicVidScreen3": "x",
          "intMusicVidViews": 1,
          "intMusicVidLikes": 1,
          "intMusicVidDislikes": 1,
          "intMusicVidFavorites": 1,
          "intMusicVidComments": 1,
          "intTrackNumber": 1,
          "intLoved": 1,
          "intScore": 1,
          "intScoreVotes": 1,
          "intTotalListeners": 1,
          "intTotalPlays": 1,
          "strMusicBrainzID": "x",
          "strMusicBrainzAlbumID": "x",
          "strMusicBrainzArtistID": "x",
          "strLocked": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v2_search",
    "accessor": "V2Search",
    "op": "load",
    "method": "GET",
    "path": "/search/album/{albumName}",
    "args": [
      {
        "name": "album_name",
        "wire": "albumName",
        "value": "parachutes"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "albums": [
        {
          "idAlbum": 1,
          "idArtist": 1,
          "idLabel": 1,
          "strAlbum": "x",
          "strAlbumStripped": "x",
          "strArtist": "x",
          "strArtistStripped": "x",
          "intYearReleased": 1,
          "strStyle": "x",
          "strGenre": "x",
          "strLabel": "x",
          "strReleaseFormat": "x",
          "intSales": 1,
          "strAlbumThumb": "x",
          "strAlbumThumbHQ": "x",
          "strAlbumThumbBack": "x",
          "strAlbumCDart": "x",
          "strAlbumSpine": "x",
          "strAlbum3DCase": "x",
          "strAlbum3DFlat": "x",
          "strAlbum3DFace": "x",
          "strAlbum3DThumb": "x",
          "strDescriptionEN": "x",
          "intLoved": 1,
          "intScore": 1,
          "intScoreVotes": 1,
          "strReview": "x",
          "strMood": "x",
          "strTheme": "x",
          "strSpeed": "x",
          "strLocation": "x",
          "strMusicBrainzID": "x",
          "strMusicBrainzArtistID": "x",
          "strAllMusicID": "x",
          "strBBCReviewID": "x",
          "strRateYourMusicID": "x",
          "strDiscogsID": "x",
          "strWikidataID": "x",
          "strWikipediaID": "x",
          "strGeniusID": "x",
          "strLyricWikiID": "x",
          "strMusicMozID": "x",
          "strItunesID": "x",
          "strAmazonID": "x",
          "strLocked": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v2_search",
    "accessor": "V2Search",
    "op": "load",
    "method": "GET",
    "path": "/search/artist/{artistName}",
    "args": [
      {
        "name": "artist_name",
        "wire": "artistName",
        "value": "coldplay"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "artists": [
        {
          "idArtist": 1,
          "strArtist": "x",
          "strArtistAlternate": "x",
          "strLabel": "x",
          "idLabel": 1,
          "intFormedYear": 1,
          "intBornYear": 1,
          "intDiedYear": 1,
          "strDisbanded": "x",
          "strStyle": "x",
          "strGenre": "x",
          "strMood": "x",
          "strWebsite": "x",
          "strFacebook": "x",
          "strTwitter": "x",
          "strBiographyEN": "x",
          "strBiographyCN": "x",
          "strBiographyDE": "x",
          "strBiographyFR": "x",
          "strBiographyIT": "x",
          "strBiographyJP": "x",
          "strBiographyRU": "x",
          "strBiographyES": "x",
          "strBiographyPT": "x",
          "strBiographySE": "x",
          "strBiographyNL": "x",
          "strBiographyHU": "x",
          "strBiographyNO": "x",
          "strBiographyIL": "x",
          "strBiographyPL": "x",
          "strGender": "x",
          "intMembers": 1,
          "strCountry": "x",
          "strCountryCode": "x",
          "strArtistThumb": "x",
          "strArtistLogo": "x",
          "strArtistCutout": "x",
          "strArtistClearart": "x",
          "strArtistWideThumb": "x",
          "strArtistFanart": "x",
          "strArtistFanart2": "x",
          "strArtistFanart3": "x",
          "strArtistFanart4": "x",
          "strArtistBanner": "x",
          "strMusicBrainzID": "x",
          "strLastFMChart": "x",
          "intCharted": 1,
          "strLocked": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v2_search",
    "accessor": "V2Search",
    "op": "load",
    "method": "GET",
    "path": "/search/track/{trackName}",
    "args": [
      {
        "name": "track_name",
        "wire": "trackName",
        "value": "yellow"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "tracks": [
        {
          "idTrack": 1,
          "idAlbum": 1,
          "idArtist": 1,
          "idLyric": 1,
          "idIMVDB": 1,
          "strTrack": "x",
          "strAlbum": "x",
          "strArtist": "x",
          "strArtistAlternate": "x",
          "intCD": 1,
          "intDuration": 1,
          "strGenre": "x",
          "strMood": "x",
          "strStyle": "x",
          "strTheme": "x",
          "strDescriptionEN": "x",
          "strTrackThumb": "x",
          "strTrackLyrics": "x",
          "strMusicVid": "x",
          "strMusicVidDirector": "x",
          "strMusicVidCompany": "x",
          "strMusicVidScreen1": "x",
          "strMusicVidScreen2": "x",
          "strMusicVidScreen3": "x",
          "intMusicVidViews": 1,
          "intMusicVidLikes": 1,
          "intMusicVidDislikes": 1,
          "intMusicVidFavorites": 1,
          "intMusicVidComments": 1,
          "intTrackNumber": 1,
          "intLoved": 1,
          "intScore": 1,
          "intScoreVotes": 1,
          "intTotalListeners": 1,
          "intTotalPlays": 1,
          "strMusicBrainzID": "x",
          "strMusicBrainzAlbumID": "x",
          "strMusicBrainzArtistID": "x",
          "strLocked": "x"
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
