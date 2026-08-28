# Typed models for the FreeMusicApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class V1List(TypedDict, total=False):
    idAlbum: int
    idArtist: int
    idIMVDB: int
    idLyric: int
    idTrack: int
    intCD: int
    intDuration: int
    intLoved: int
    intMusicVidComments: int
    intMusicVidDislikes: int
    intMusicVidFavorites: int
    intMusicVidLikes: int
    intMusicVidViews: int
    intScore: int
    intScoreVotes: int
    intTotalListeners: int
    intTotalPlays: int
    intTrackNumber: int
    loved: list
    strAlbum: str
    strArtist: str
    strArtistAlternate: str
    strDescriptionEN: str
    strGenre: str
    strLocked: str
    strMood: str
    strMusicBrainzAlbumID: str
    strMusicBrainzArtistID: str
    strMusicBrainzID: str
    strMusicVid: str
    strMusicVidCompany: str
    strMusicVidDirector: str
    strMusicVidScreen1: str
    strMusicVidScreen2: str
    strMusicVidScreen3: str
    strStyle: str
    strTheme: str
    strTrack: str
    strTrackLyrics: str
    strTrackThumb: str
    trending: list


class V1ListListMatch(TypedDict):
    country: str
    format: str
    type: str


class V1Lookup(TypedDict, total=False):
    idAlbum: int
    idArtist: int
    idIMVDB: int
    idLabel: int
    idLyric: int
    idTrack: int
    intBornYear: int
    intCD: int
    intCharted: int
    intDiedYear: int
    intDuration: int
    intFormedYear: int
    intLoved: int
    intMembers: int
    intMusicVidComments: int
    intMusicVidDislikes: int
    intMusicVidFavorites: int
    intMusicVidLikes: int
    intMusicVidViews: int
    intSales: int
    intScore: int
    intScoreVotes: int
    intTotalListeners: int
    intTotalPlays: int
    intTrackNumber: int
    intYearReleased: int
    strAlbum: str
    strAlbum3DCase: str
    strAlbum3DFace: str
    strAlbum3DFlat: str
    strAlbum3DThumb: str
    strAlbumCDart: str
    strAlbumSpine: str
    strAlbumStripped: str
    strAlbumThumb: str
    strAlbumThumbBack: str
    strAlbumThumbHQ: str
    strAllMusicID: str
    strAmazonID: str
    strAppleMusic: str
    strArtist: str
    strArtistAlternate: str
    strArtistBanner: str
    strArtistClearart: str
    strArtistCutout: str
    strArtistFanart: str
    strArtistFanart2: str
    strArtistFanart3: str
    strArtistFanart4: str
    strArtistLogo: str
    strArtistStripped: str
    strArtistThumb: str
    strArtistWideThumb: str
    strBBCReviewID: str
    strBiographyCN: str
    strBiographyDE: str
    strBiographyEN: str
    strBiographyES: str
    strBiographyFR: str
    strBiographyHU: str
    strBiographyIL: str
    strBiographyIT: str
    strBiographyJP: str
    strBiographyNL: str
    strBiographyNO: str
    strBiographyPL: str
    strBiographyPT: str
    strBiographyRU: str
    strBiographySE: str
    strCountry: str
    strCountryCode: str
    strDescriptionEN: str
    strDisbanded: str
    strDiscogsID: str
    strFacebook: str
    strGender: str
    strGeniusID: str
    strGenre: str
    strInstagram: str
    strItunesID: str
    strLabel: str
    strLastFMChart: str
    strLocation: str
    strLocked: str
    strLyricWikiID: str
    strMood: str
    strMusicBrainzAlbumID: str
    strMusicBrainzArtistID: str
    strMusicBrainzID: str
    strMusicMozID: str
    strMusicVid: str
    strMusicVidCompany: str
    strMusicVidDirector: str
    strMusicVidScreen1: str
    strMusicVidScreen2: str
    strMusicVidScreen3: str
    strRateYourMusicID: str
    strReleaseFormat: str
    strReview: str
    strSoundCloud: str
    strSpeed: str
    strSpotify: str
    strStyle: str
    strTheme: str
    strTrack: str
    strTrackLyrics: str
    strTrackThumb: str
    strTwitter: str
    strWebsite: str
    strWikidataID: str
    strWikipediaID: str
    strYoutube: str


class V1LookupListMatch(TypedDict, total=False):
    h: int
    m: int


class V1Search(TypedDict, total=False):
    idAlbum: int
    idArtist: int
    idIMVDB: int
    idLabel: int
    idLyric: int
    idTrack: int
    intBornYear: int
    intCD: int
    intCharted: int
    intDiedYear: int
    intDuration: int
    intFormedYear: int
    intLoved: int
    intMembers: int
    intMusicVidComments: int
    intMusicVidDislikes: int
    intMusicVidFavorites: int
    intMusicVidLikes: int
    intMusicVidViews: int
    intSales: int
    intScore: int
    intScoreVotes: int
    intTotalListeners: int
    intTotalPlays: int
    intTrackNumber: int
    intYearReleased: int
    strAlbum: str
    strAlbum3DCase: str
    strAlbum3DFace: str
    strAlbum3DFlat: str
    strAlbum3DThumb: str
    strAlbumCDart: str
    strAlbumSpine: str
    strAlbumStripped: str
    strAlbumThumb: str
    strAlbumThumbBack: str
    strAlbumThumbHQ: str
    strAllMusicID: str
    strAmazonID: str
    strArtist: str
    strArtistAlternate: str
    strArtistBanner: str
    strArtistClearart: str
    strArtistCutout: str
    strArtistFanart: str
    strArtistFanart2: str
    strArtistFanart3: str
    strArtistFanart4: str
    strArtistLogo: str
    strArtistStripped: str
    strArtistThumb: str
    strArtistWideThumb: str
    strBBCReviewID: str
    strBiographyCN: str
    strBiographyDE: str
    strBiographyEN: str
    strBiographyES: str
    strBiographyFR: str
    strBiographyHU: str
    strBiographyIL: str
    strBiographyIT: str
    strBiographyJP: str
    strBiographyNL: str
    strBiographyNO: str
    strBiographyPL: str
    strBiographyPT: str
    strBiographyRU: str
    strBiographySE: str
    strCountry: str
    strCountryCode: str
    strDescriptionEN: str
    strDisbanded: str
    strDiscogsID: str
    strFacebook: str
    strGender: str
    strGeniusID: str
    strGenre: str
    strItunesID: str
    strLabel: str
    strLastFMChart: str
    strLocation: str
    strLocked: str
    strLyricWikiID: str
    strMood: str
    strMusicBrainzAlbumID: str
    strMusicBrainzArtistID: str
    strMusicBrainzID: str
    strMusicMozID: str
    strMusicVid: str
    strMusicVidCompany: str
    strMusicVidDirector: str
    strMusicVidScreen1: str
    strMusicVidScreen2: str
    strMusicVidScreen3: str
    strRateYourMusicID: str
    strReleaseFormat: str
    strReview: str
    strSpeed: str
    strStyle: str
    strTheme: str
    strTrack: str
    strTrackLyrics: str
    strTrackThumb: str
    strTwitter: str
    strWebsite: str
    strWikidataID: str
    strWikipediaID: str


class V1SearchListMatchRequired(TypedDict):
    s: str


class V1SearchListMatch(V1SearchListMatchRequired, total=False):
    a: str
    t: str


class V2List(TypedDict, total=False):
    albums: list


class V2ListLoadMatch(TypedDict):
    artist_id: int


class V2Lookup(TypedDict, total=False):
    albums: list
    artists: list
    tracks: list


class V2LookupLoadMatch(TypedDict):
    album_id: int


class V2Search(TypedDict, total=False):
    albums: list
    artists: list
    tracks: list


class V2SearchLoadMatch(TypedDict):
    album_name: str
