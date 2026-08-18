# frozen_string_literal: true

# Typed models for the FreeMusicApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# V1List entity data model.
#
# @!attribute [rw] idAlbum
#   @return [Integer, nil]
#
# @!attribute [rw] idArtist
#   @return [Integer, nil]
#
# @!attribute [rw] idIMVDB
#   @return [Integer, nil]
#
# @!attribute [rw] idLyric
#   @return [Integer, nil]
#
# @!attribute [rw] idTrack
#   @return [Integer, nil]
#
# @!attribute [rw] intCD
#   @return [Integer, nil]
#
# @!attribute [rw] intDuration
#   @return [Integer, nil]
#
# @!attribute [rw] intLoved
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidComments
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidDislikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidFavorites
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidLikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidViews
#   @return [Integer, nil]
#
# @!attribute [rw] intScore
#   @return [Integer, nil]
#
# @!attribute [rw] intScoreVotes
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalListeners
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalPlays
#   @return [Integer, nil]
#
# @!attribute [rw] intTrackNumber
#   @return [Integer, nil]
#
# @!attribute [rw] loved
#   @return [Array, nil]
#
# @!attribute [rw] strAlbum
#   @return [String, nil]
#
# @!attribute [rw] strArtist
#   @return [String, nil]
#
# @!attribute [rw] strArtistAlternate
#   @return [String, nil]
#
# @!attribute [rw] strDescriptionEN
#   @return [String, nil]
#
# @!attribute [rw] strGenre
#   @return [String, nil]
#
# @!attribute [rw] strLocked
#   @return [String, nil]
#
# @!attribute [rw] strMood
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzAlbumID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzArtistID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzID
#   @return [String, nil]
#
# @!attribute [rw] strMusicVid
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidCompany
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidDirector
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen1
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen2
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen3
#   @return [String, nil]
#
# @!attribute [rw] strStyle
#   @return [String, nil]
#
# @!attribute [rw] strTheme
#   @return [String, nil]
#
# @!attribute [rw] strTrack
#   @return [String, nil]
#
# @!attribute [rw] strTrackLyrics
#   @return [String, nil]
#
# @!attribute [rw] strTrackThumb
#   @return [String, nil]
#
# @!attribute [rw] trending
#   @return [Array, nil]
V1List = Struct.new(
  :idAlbum,
  :idArtist,
  :idIMVDB,
  :idLyric,
  :idTrack,
  :intCD,
  :intDuration,
  :intLoved,
  :intMusicVidComments,
  :intMusicVidDislikes,
  :intMusicVidFavorites,
  :intMusicVidLikes,
  :intMusicVidViews,
  :intScore,
  :intScoreVotes,
  :intTotalListeners,
  :intTotalPlays,
  :intTrackNumber,
  :loved,
  :strAlbum,
  :strArtist,
  :strArtistAlternate,
  :strDescriptionEN,
  :strGenre,
  :strLocked,
  :strMood,
  :strMusicBrainzAlbumID,
  :strMusicBrainzArtistID,
  :strMusicBrainzID,
  :strMusicVid,
  :strMusicVidCompany,
  :strMusicVidDirector,
  :strMusicVidScreen1,
  :strMusicVidScreen2,
  :strMusicVidScreen3,
  :strStyle,
  :strTheme,
  :strTrack,
  :strTrackLyrics,
  :strTrackThumb,
  :trending,
  keyword_init: true
)

# Request payload for V1List#list.
#
# @!attribute [rw] idAlbum
#   @return [Integer, nil]
#
# @!attribute [rw] idArtist
#   @return [Integer, nil]
#
# @!attribute [rw] idIMVDB
#   @return [Integer, nil]
#
# @!attribute [rw] idLyric
#   @return [Integer, nil]
#
# @!attribute [rw] idTrack
#   @return [Integer, nil]
#
# @!attribute [rw] intCD
#   @return [Integer, nil]
#
# @!attribute [rw] intDuration
#   @return [Integer, nil]
#
# @!attribute [rw] intLoved
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidComments
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidDislikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidFavorites
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidLikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidViews
#   @return [Integer, nil]
#
# @!attribute [rw] intScore
#   @return [Integer, nil]
#
# @!attribute [rw] intScoreVotes
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalListeners
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalPlays
#   @return [Integer, nil]
#
# @!attribute [rw] intTrackNumber
#   @return [Integer, nil]
#
# @!attribute [rw] loved
#   @return [Array, nil]
#
# @!attribute [rw] strAlbum
#   @return [String, nil]
#
# @!attribute [rw] strArtist
#   @return [String, nil]
#
# @!attribute [rw] strArtistAlternate
#   @return [String, nil]
#
# @!attribute [rw] strDescriptionEN
#   @return [String, nil]
#
# @!attribute [rw] strGenre
#   @return [String, nil]
#
# @!attribute [rw] strLocked
#   @return [String, nil]
#
# @!attribute [rw] strMood
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzAlbumID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzArtistID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzID
#   @return [String, nil]
#
# @!attribute [rw] strMusicVid
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidCompany
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidDirector
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen1
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen2
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen3
#   @return [String, nil]
#
# @!attribute [rw] strStyle
#   @return [String, nil]
#
# @!attribute [rw] strTheme
#   @return [String, nil]
#
# @!attribute [rw] strTrack
#   @return [String, nil]
#
# @!attribute [rw] strTrackLyrics
#   @return [String, nil]
#
# @!attribute [rw] strTrackThumb
#   @return [String, nil]
#
# @!attribute [rw] trending
#   @return [Array, nil]
V1ListListMatch = Struct.new(
  :idAlbum,
  :idArtist,
  :idIMVDB,
  :idLyric,
  :idTrack,
  :intCD,
  :intDuration,
  :intLoved,
  :intMusicVidComments,
  :intMusicVidDislikes,
  :intMusicVidFavorites,
  :intMusicVidLikes,
  :intMusicVidViews,
  :intScore,
  :intScoreVotes,
  :intTotalListeners,
  :intTotalPlays,
  :intTrackNumber,
  :loved,
  :strAlbum,
  :strArtist,
  :strArtistAlternate,
  :strDescriptionEN,
  :strGenre,
  :strLocked,
  :strMood,
  :strMusicBrainzAlbumID,
  :strMusicBrainzArtistID,
  :strMusicBrainzID,
  :strMusicVid,
  :strMusicVidCompany,
  :strMusicVidDirector,
  :strMusicVidScreen1,
  :strMusicVidScreen2,
  :strMusicVidScreen3,
  :strStyle,
  :strTheme,
  :strTrack,
  :strTrackLyrics,
  :strTrackThumb,
  :trending,
  keyword_init: true
)

# V1Lookup entity data model.
#
# @!attribute [rw] idAlbum
#   @return [Integer, nil]
#
# @!attribute [rw] idArtist
#   @return [Integer, nil]
#
# @!attribute [rw] idIMVDB
#   @return [Integer, nil]
#
# @!attribute [rw] idLabel
#   @return [Integer, nil]
#
# @!attribute [rw] idLyric
#   @return [Integer, nil]
#
# @!attribute [rw] idTrack
#   @return [Integer, nil]
#
# @!attribute [rw] intBornYear
#   @return [Integer, nil]
#
# @!attribute [rw] intCD
#   @return [Integer, nil]
#
# @!attribute [rw] intCharted
#   @return [Integer, nil]
#
# @!attribute [rw] intDiedYear
#   @return [Integer, nil]
#
# @!attribute [rw] intDuration
#   @return [Integer, nil]
#
# @!attribute [rw] intFormedYear
#   @return [Integer, nil]
#
# @!attribute [rw] intLoved
#   @return [Integer, nil]
#
# @!attribute [rw] intMembers
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidComments
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidDislikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidFavorites
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidLikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidViews
#   @return [Integer, nil]
#
# @!attribute [rw] intSales
#   @return [Integer, nil]
#
# @!attribute [rw] intScore
#   @return [Integer, nil]
#
# @!attribute [rw] intScoreVotes
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalListeners
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalPlays
#   @return [Integer, nil]
#
# @!attribute [rw] intTrackNumber
#   @return [Integer, nil]
#
# @!attribute [rw] intYearReleased
#   @return [Integer, nil]
#
# @!attribute [rw] strAlbum
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DCase
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DFace
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DFlat
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DThumb
#   @return [String, nil]
#
# @!attribute [rw] strAlbumCDart
#   @return [String, nil]
#
# @!attribute [rw] strAlbumSpine
#   @return [String, nil]
#
# @!attribute [rw] strAlbumStripped
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumb
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumbBack
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumbHQ
#   @return [String, nil]
#
# @!attribute [rw] strAllMusicID
#   @return [String, nil]
#
# @!attribute [rw] strAmazonID
#   @return [String, nil]
#
# @!attribute [rw] strAppleMusic
#   @return [String, nil]
#
# @!attribute [rw] strArtist
#   @return [String, nil]
#
# @!attribute [rw] strArtistAlternate
#   @return [String, nil]
#
# @!attribute [rw] strArtistBanner
#   @return [String, nil]
#
# @!attribute [rw] strArtistClearart
#   @return [String, nil]
#
# @!attribute [rw] strArtistCutout
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart2
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart3
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart4
#   @return [String, nil]
#
# @!attribute [rw] strArtistLogo
#   @return [String, nil]
#
# @!attribute [rw] strArtistStripped
#   @return [String, nil]
#
# @!attribute [rw] strArtistThumb
#   @return [String, nil]
#
# @!attribute [rw] strArtistWideThumb
#   @return [String, nil]
#
# @!attribute [rw] strBBCReviewID
#   @return [String, nil]
#
# @!attribute [rw] strBiographyCN
#   @return [String, nil]
#
# @!attribute [rw] strBiographyDE
#   @return [String, nil]
#
# @!attribute [rw] strBiographyEN
#   @return [String, nil]
#
# @!attribute [rw] strBiographyES
#   @return [String, nil]
#
# @!attribute [rw] strBiographyFR
#   @return [String, nil]
#
# @!attribute [rw] strBiographyHU
#   @return [String, nil]
#
# @!attribute [rw] strBiographyIL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyIT
#   @return [String, nil]
#
# @!attribute [rw] strBiographyJP
#   @return [String, nil]
#
# @!attribute [rw] strBiographyNL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyNO
#   @return [String, nil]
#
# @!attribute [rw] strBiographyPL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyPT
#   @return [String, nil]
#
# @!attribute [rw] strBiographyRU
#   @return [String, nil]
#
# @!attribute [rw] strBiographySE
#   @return [String, nil]
#
# @!attribute [rw] strCountry
#   @return [String, nil]
#
# @!attribute [rw] strCountryCode
#   @return [String, nil]
#
# @!attribute [rw] strDescriptionEN
#   @return [String, nil]
#
# @!attribute [rw] strDisbanded
#   @return [String, nil]
#
# @!attribute [rw] strDiscogsID
#   @return [String, nil]
#
# @!attribute [rw] strFacebook
#   @return [String, nil]
#
# @!attribute [rw] strGender
#   @return [String, nil]
#
# @!attribute [rw] strGeniusID
#   @return [String, nil]
#
# @!attribute [rw] strGenre
#   @return [String, nil]
#
# @!attribute [rw] strInstagram
#   @return [String, nil]
#
# @!attribute [rw] strItunesID
#   @return [String, nil]
#
# @!attribute [rw] strLabel
#   @return [String, nil]
#
# @!attribute [rw] strLastFMChart
#   @return [String, nil]
#
# @!attribute [rw] strLocation
#   @return [String, nil]
#
# @!attribute [rw] strLocked
#   @return [String, nil]
#
# @!attribute [rw] strLyricWikiID
#   @return [String, nil]
#
# @!attribute [rw] strMood
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzAlbumID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzArtistID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzID
#   @return [String, nil]
#
# @!attribute [rw] strMusicMozID
#   @return [String, nil]
#
# @!attribute [rw] strMusicVid
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidCompany
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidDirector
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen1
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen2
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen3
#   @return [String, nil]
#
# @!attribute [rw] strRateYourMusicID
#   @return [String, nil]
#
# @!attribute [rw] strReleaseFormat
#   @return [String, nil]
#
# @!attribute [rw] strReview
#   @return [String, nil]
#
# @!attribute [rw] strSoundCloud
#   @return [String, nil]
#
# @!attribute [rw] strSpeed
#   @return [String, nil]
#
# @!attribute [rw] strSpotify
#   @return [String, nil]
#
# @!attribute [rw] strStyle
#   @return [String, nil]
#
# @!attribute [rw] strTheme
#   @return [String, nil]
#
# @!attribute [rw] strTrack
#   @return [String, nil]
#
# @!attribute [rw] strTrackLyrics
#   @return [String, nil]
#
# @!attribute [rw] strTrackThumb
#   @return [String, nil]
#
# @!attribute [rw] strTwitter
#   @return [String, nil]
#
# @!attribute [rw] strWebsite
#   @return [String, nil]
#
# @!attribute [rw] strWikidataID
#   @return [String, nil]
#
# @!attribute [rw] strWikipediaID
#   @return [String, nil]
#
# @!attribute [rw] strYoutube
#   @return [String, nil]
V1Lookup = Struct.new(
  :idAlbum,
  :idArtist,
  :idIMVDB,
  :idLabel,
  :idLyric,
  :idTrack,
  :intBornYear,
  :intCD,
  :intCharted,
  :intDiedYear,
  :intDuration,
  :intFormedYear,
  :intLoved,
  :intMembers,
  :intMusicVidComments,
  :intMusicVidDislikes,
  :intMusicVidFavorites,
  :intMusicVidLikes,
  :intMusicVidViews,
  :intSales,
  :intScore,
  :intScoreVotes,
  :intTotalListeners,
  :intTotalPlays,
  :intTrackNumber,
  :intYearReleased,
  :strAlbum,
  :strAlbum3DCase,
  :strAlbum3DFace,
  :strAlbum3DFlat,
  :strAlbum3DThumb,
  :strAlbumCDart,
  :strAlbumSpine,
  :strAlbumStripped,
  :strAlbumThumb,
  :strAlbumThumbBack,
  :strAlbumThumbHQ,
  :strAllMusicID,
  :strAmazonID,
  :strAppleMusic,
  :strArtist,
  :strArtistAlternate,
  :strArtistBanner,
  :strArtistClearart,
  :strArtistCutout,
  :strArtistFanart,
  :strArtistFanart2,
  :strArtistFanart3,
  :strArtistFanart4,
  :strArtistLogo,
  :strArtistStripped,
  :strArtistThumb,
  :strArtistWideThumb,
  :strBBCReviewID,
  :strBiographyCN,
  :strBiographyDE,
  :strBiographyEN,
  :strBiographyES,
  :strBiographyFR,
  :strBiographyHU,
  :strBiographyIL,
  :strBiographyIT,
  :strBiographyJP,
  :strBiographyNL,
  :strBiographyNO,
  :strBiographyPL,
  :strBiographyPT,
  :strBiographyRU,
  :strBiographySE,
  :strCountry,
  :strCountryCode,
  :strDescriptionEN,
  :strDisbanded,
  :strDiscogsID,
  :strFacebook,
  :strGender,
  :strGeniusID,
  :strGenre,
  :strInstagram,
  :strItunesID,
  :strLabel,
  :strLastFMChart,
  :strLocation,
  :strLocked,
  :strLyricWikiID,
  :strMood,
  :strMusicBrainzAlbumID,
  :strMusicBrainzArtistID,
  :strMusicBrainzID,
  :strMusicMozID,
  :strMusicVid,
  :strMusicVidCompany,
  :strMusicVidDirector,
  :strMusicVidScreen1,
  :strMusicVidScreen2,
  :strMusicVidScreen3,
  :strRateYourMusicID,
  :strReleaseFormat,
  :strReview,
  :strSoundCloud,
  :strSpeed,
  :strSpotify,
  :strStyle,
  :strTheme,
  :strTrack,
  :strTrackLyrics,
  :strTrackThumb,
  :strTwitter,
  :strWebsite,
  :strWikidataID,
  :strWikipediaID,
  :strYoutube,
  keyword_init: true
)

# Request payload for V1Lookup#list.
#
# @!attribute [rw] idAlbum
#   @return [Integer, nil]
#
# @!attribute [rw] idArtist
#   @return [Integer, nil]
#
# @!attribute [rw] idIMVDB
#   @return [Integer, nil]
#
# @!attribute [rw] idLabel
#   @return [Integer, nil]
#
# @!attribute [rw] idLyric
#   @return [Integer, nil]
#
# @!attribute [rw] idTrack
#   @return [Integer, nil]
#
# @!attribute [rw] intBornYear
#   @return [Integer, nil]
#
# @!attribute [rw] intCD
#   @return [Integer, nil]
#
# @!attribute [rw] intCharted
#   @return [Integer, nil]
#
# @!attribute [rw] intDiedYear
#   @return [Integer, nil]
#
# @!attribute [rw] intDuration
#   @return [Integer, nil]
#
# @!attribute [rw] intFormedYear
#   @return [Integer, nil]
#
# @!attribute [rw] intLoved
#   @return [Integer, nil]
#
# @!attribute [rw] intMembers
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidComments
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidDislikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidFavorites
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidLikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidViews
#   @return [Integer, nil]
#
# @!attribute [rw] intSales
#   @return [Integer, nil]
#
# @!attribute [rw] intScore
#   @return [Integer, nil]
#
# @!attribute [rw] intScoreVotes
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalListeners
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalPlays
#   @return [Integer, nil]
#
# @!attribute [rw] intTrackNumber
#   @return [Integer, nil]
#
# @!attribute [rw] intYearReleased
#   @return [Integer, nil]
#
# @!attribute [rw] strAlbum
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DCase
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DFace
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DFlat
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DThumb
#   @return [String, nil]
#
# @!attribute [rw] strAlbumCDart
#   @return [String, nil]
#
# @!attribute [rw] strAlbumSpine
#   @return [String, nil]
#
# @!attribute [rw] strAlbumStripped
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumb
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumbBack
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumbHQ
#   @return [String, nil]
#
# @!attribute [rw] strAllMusicID
#   @return [String, nil]
#
# @!attribute [rw] strAmazonID
#   @return [String, nil]
#
# @!attribute [rw] strAppleMusic
#   @return [String, nil]
#
# @!attribute [rw] strArtist
#   @return [String, nil]
#
# @!attribute [rw] strArtistAlternate
#   @return [String, nil]
#
# @!attribute [rw] strArtistBanner
#   @return [String, nil]
#
# @!attribute [rw] strArtistClearart
#   @return [String, nil]
#
# @!attribute [rw] strArtistCutout
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart2
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart3
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart4
#   @return [String, nil]
#
# @!attribute [rw] strArtistLogo
#   @return [String, nil]
#
# @!attribute [rw] strArtistStripped
#   @return [String, nil]
#
# @!attribute [rw] strArtistThumb
#   @return [String, nil]
#
# @!attribute [rw] strArtistWideThumb
#   @return [String, nil]
#
# @!attribute [rw] strBBCReviewID
#   @return [String, nil]
#
# @!attribute [rw] strBiographyCN
#   @return [String, nil]
#
# @!attribute [rw] strBiographyDE
#   @return [String, nil]
#
# @!attribute [rw] strBiographyEN
#   @return [String, nil]
#
# @!attribute [rw] strBiographyES
#   @return [String, nil]
#
# @!attribute [rw] strBiographyFR
#   @return [String, nil]
#
# @!attribute [rw] strBiographyHU
#   @return [String, nil]
#
# @!attribute [rw] strBiographyIL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyIT
#   @return [String, nil]
#
# @!attribute [rw] strBiographyJP
#   @return [String, nil]
#
# @!attribute [rw] strBiographyNL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyNO
#   @return [String, nil]
#
# @!attribute [rw] strBiographyPL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyPT
#   @return [String, nil]
#
# @!attribute [rw] strBiographyRU
#   @return [String, nil]
#
# @!attribute [rw] strBiographySE
#   @return [String, nil]
#
# @!attribute [rw] strCountry
#   @return [String, nil]
#
# @!attribute [rw] strCountryCode
#   @return [String, nil]
#
# @!attribute [rw] strDescriptionEN
#   @return [String, nil]
#
# @!attribute [rw] strDisbanded
#   @return [String, nil]
#
# @!attribute [rw] strDiscogsID
#   @return [String, nil]
#
# @!attribute [rw] strFacebook
#   @return [String, nil]
#
# @!attribute [rw] strGender
#   @return [String, nil]
#
# @!attribute [rw] strGeniusID
#   @return [String, nil]
#
# @!attribute [rw] strGenre
#   @return [String, nil]
#
# @!attribute [rw] strInstagram
#   @return [String, nil]
#
# @!attribute [rw] strItunesID
#   @return [String, nil]
#
# @!attribute [rw] strLabel
#   @return [String, nil]
#
# @!attribute [rw] strLastFMChart
#   @return [String, nil]
#
# @!attribute [rw] strLocation
#   @return [String, nil]
#
# @!attribute [rw] strLocked
#   @return [String, nil]
#
# @!attribute [rw] strLyricWikiID
#   @return [String, nil]
#
# @!attribute [rw] strMood
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzAlbumID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzArtistID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzID
#   @return [String, nil]
#
# @!attribute [rw] strMusicMozID
#   @return [String, nil]
#
# @!attribute [rw] strMusicVid
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidCompany
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidDirector
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen1
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen2
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen3
#   @return [String, nil]
#
# @!attribute [rw] strRateYourMusicID
#   @return [String, nil]
#
# @!attribute [rw] strReleaseFormat
#   @return [String, nil]
#
# @!attribute [rw] strReview
#   @return [String, nil]
#
# @!attribute [rw] strSoundCloud
#   @return [String, nil]
#
# @!attribute [rw] strSpeed
#   @return [String, nil]
#
# @!attribute [rw] strSpotify
#   @return [String, nil]
#
# @!attribute [rw] strStyle
#   @return [String, nil]
#
# @!attribute [rw] strTheme
#   @return [String, nil]
#
# @!attribute [rw] strTrack
#   @return [String, nil]
#
# @!attribute [rw] strTrackLyrics
#   @return [String, nil]
#
# @!attribute [rw] strTrackThumb
#   @return [String, nil]
#
# @!attribute [rw] strTwitter
#   @return [String, nil]
#
# @!attribute [rw] strWebsite
#   @return [String, nil]
#
# @!attribute [rw] strWikidataID
#   @return [String, nil]
#
# @!attribute [rw] strWikipediaID
#   @return [String, nil]
#
# @!attribute [rw] strYoutube
#   @return [String, nil]
V1LookupListMatch = Struct.new(
  :idAlbum,
  :idArtist,
  :idIMVDB,
  :idLabel,
  :idLyric,
  :idTrack,
  :intBornYear,
  :intCD,
  :intCharted,
  :intDiedYear,
  :intDuration,
  :intFormedYear,
  :intLoved,
  :intMembers,
  :intMusicVidComments,
  :intMusicVidDislikes,
  :intMusicVidFavorites,
  :intMusicVidLikes,
  :intMusicVidViews,
  :intSales,
  :intScore,
  :intScoreVotes,
  :intTotalListeners,
  :intTotalPlays,
  :intTrackNumber,
  :intYearReleased,
  :strAlbum,
  :strAlbum3DCase,
  :strAlbum3DFace,
  :strAlbum3DFlat,
  :strAlbum3DThumb,
  :strAlbumCDart,
  :strAlbumSpine,
  :strAlbumStripped,
  :strAlbumThumb,
  :strAlbumThumbBack,
  :strAlbumThumbHQ,
  :strAllMusicID,
  :strAmazonID,
  :strAppleMusic,
  :strArtist,
  :strArtistAlternate,
  :strArtistBanner,
  :strArtistClearart,
  :strArtistCutout,
  :strArtistFanart,
  :strArtistFanart2,
  :strArtistFanart3,
  :strArtistFanart4,
  :strArtistLogo,
  :strArtistStripped,
  :strArtistThumb,
  :strArtistWideThumb,
  :strBBCReviewID,
  :strBiographyCN,
  :strBiographyDE,
  :strBiographyEN,
  :strBiographyES,
  :strBiographyFR,
  :strBiographyHU,
  :strBiographyIL,
  :strBiographyIT,
  :strBiographyJP,
  :strBiographyNL,
  :strBiographyNO,
  :strBiographyPL,
  :strBiographyPT,
  :strBiographyRU,
  :strBiographySE,
  :strCountry,
  :strCountryCode,
  :strDescriptionEN,
  :strDisbanded,
  :strDiscogsID,
  :strFacebook,
  :strGender,
  :strGeniusID,
  :strGenre,
  :strInstagram,
  :strItunesID,
  :strLabel,
  :strLastFMChart,
  :strLocation,
  :strLocked,
  :strLyricWikiID,
  :strMood,
  :strMusicBrainzAlbumID,
  :strMusicBrainzArtistID,
  :strMusicBrainzID,
  :strMusicMozID,
  :strMusicVid,
  :strMusicVidCompany,
  :strMusicVidDirector,
  :strMusicVidScreen1,
  :strMusicVidScreen2,
  :strMusicVidScreen3,
  :strRateYourMusicID,
  :strReleaseFormat,
  :strReview,
  :strSoundCloud,
  :strSpeed,
  :strSpotify,
  :strStyle,
  :strTheme,
  :strTrack,
  :strTrackLyrics,
  :strTrackThumb,
  :strTwitter,
  :strWebsite,
  :strWikidataID,
  :strWikipediaID,
  :strYoutube,
  keyword_init: true
)

# V1Search entity data model.
#
# @!attribute [rw] idAlbum
#   @return [Integer, nil]
#
# @!attribute [rw] idArtist
#   @return [Integer, nil]
#
# @!attribute [rw] idIMVDB
#   @return [Integer, nil]
#
# @!attribute [rw] idLabel
#   @return [Integer, nil]
#
# @!attribute [rw] idLyric
#   @return [Integer, nil]
#
# @!attribute [rw] idTrack
#   @return [Integer, nil]
#
# @!attribute [rw] intBornYear
#   @return [Integer, nil]
#
# @!attribute [rw] intCD
#   @return [Integer, nil]
#
# @!attribute [rw] intCharted
#   @return [Integer, nil]
#
# @!attribute [rw] intDiedYear
#   @return [Integer, nil]
#
# @!attribute [rw] intDuration
#   @return [Integer, nil]
#
# @!attribute [rw] intFormedYear
#   @return [Integer, nil]
#
# @!attribute [rw] intLoved
#   @return [Integer, nil]
#
# @!attribute [rw] intMembers
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidComments
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidDislikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidFavorites
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidLikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidViews
#   @return [Integer, nil]
#
# @!attribute [rw] intSales
#   @return [Integer, nil]
#
# @!attribute [rw] intScore
#   @return [Integer, nil]
#
# @!attribute [rw] intScoreVotes
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalListeners
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalPlays
#   @return [Integer, nil]
#
# @!attribute [rw] intTrackNumber
#   @return [Integer, nil]
#
# @!attribute [rw] intYearReleased
#   @return [Integer, nil]
#
# @!attribute [rw] strAlbum
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DCase
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DFace
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DFlat
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DThumb
#   @return [String, nil]
#
# @!attribute [rw] strAlbumCDart
#   @return [String, nil]
#
# @!attribute [rw] strAlbumSpine
#   @return [String, nil]
#
# @!attribute [rw] strAlbumStripped
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumb
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumbBack
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumbHQ
#   @return [String, nil]
#
# @!attribute [rw] strAllMusicID
#   @return [String, nil]
#
# @!attribute [rw] strAmazonID
#   @return [String, nil]
#
# @!attribute [rw] strArtist
#   @return [String, nil]
#
# @!attribute [rw] strArtistAlternate
#   @return [String, nil]
#
# @!attribute [rw] strArtistBanner
#   @return [String, nil]
#
# @!attribute [rw] strArtistClearart
#   @return [String, nil]
#
# @!attribute [rw] strArtistCutout
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart2
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart3
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart4
#   @return [String, nil]
#
# @!attribute [rw] strArtistLogo
#   @return [String, nil]
#
# @!attribute [rw] strArtistStripped
#   @return [String, nil]
#
# @!attribute [rw] strArtistThumb
#   @return [String, nil]
#
# @!attribute [rw] strArtistWideThumb
#   @return [String, nil]
#
# @!attribute [rw] strBBCReviewID
#   @return [String, nil]
#
# @!attribute [rw] strBiographyCN
#   @return [String, nil]
#
# @!attribute [rw] strBiographyDE
#   @return [String, nil]
#
# @!attribute [rw] strBiographyEN
#   @return [String, nil]
#
# @!attribute [rw] strBiographyES
#   @return [String, nil]
#
# @!attribute [rw] strBiographyFR
#   @return [String, nil]
#
# @!attribute [rw] strBiographyHU
#   @return [String, nil]
#
# @!attribute [rw] strBiographyIL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyIT
#   @return [String, nil]
#
# @!attribute [rw] strBiographyJP
#   @return [String, nil]
#
# @!attribute [rw] strBiographyNL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyNO
#   @return [String, nil]
#
# @!attribute [rw] strBiographyPL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyPT
#   @return [String, nil]
#
# @!attribute [rw] strBiographyRU
#   @return [String, nil]
#
# @!attribute [rw] strBiographySE
#   @return [String, nil]
#
# @!attribute [rw] strCountry
#   @return [String, nil]
#
# @!attribute [rw] strCountryCode
#   @return [String, nil]
#
# @!attribute [rw] strDescriptionEN
#   @return [String, nil]
#
# @!attribute [rw] strDisbanded
#   @return [String, nil]
#
# @!attribute [rw] strDiscogsID
#   @return [String, nil]
#
# @!attribute [rw] strFacebook
#   @return [String, nil]
#
# @!attribute [rw] strGender
#   @return [String, nil]
#
# @!attribute [rw] strGeniusID
#   @return [String, nil]
#
# @!attribute [rw] strGenre
#   @return [String, nil]
#
# @!attribute [rw] strItunesID
#   @return [String, nil]
#
# @!attribute [rw] strLabel
#   @return [String, nil]
#
# @!attribute [rw] strLastFMChart
#   @return [String, nil]
#
# @!attribute [rw] strLocation
#   @return [String, nil]
#
# @!attribute [rw] strLocked
#   @return [String, nil]
#
# @!attribute [rw] strLyricWikiID
#   @return [String, nil]
#
# @!attribute [rw] strMood
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzAlbumID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzArtistID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzID
#   @return [String, nil]
#
# @!attribute [rw] strMusicMozID
#   @return [String, nil]
#
# @!attribute [rw] strMusicVid
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidCompany
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidDirector
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen1
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen2
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen3
#   @return [String, nil]
#
# @!attribute [rw] strRateYourMusicID
#   @return [String, nil]
#
# @!attribute [rw] strReleaseFormat
#   @return [String, nil]
#
# @!attribute [rw] strReview
#   @return [String, nil]
#
# @!attribute [rw] strSpeed
#   @return [String, nil]
#
# @!attribute [rw] strStyle
#   @return [String, nil]
#
# @!attribute [rw] strTheme
#   @return [String, nil]
#
# @!attribute [rw] strTrack
#   @return [String, nil]
#
# @!attribute [rw] strTrackLyrics
#   @return [String, nil]
#
# @!attribute [rw] strTrackThumb
#   @return [String, nil]
#
# @!attribute [rw] strTwitter
#   @return [String, nil]
#
# @!attribute [rw] strWebsite
#   @return [String, nil]
#
# @!attribute [rw] strWikidataID
#   @return [String, nil]
#
# @!attribute [rw] strWikipediaID
#   @return [String, nil]
V1Search = Struct.new(
  :idAlbum,
  :idArtist,
  :idIMVDB,
  :idLabel,
  :idLyric,
  :idTrack,
  :intBornYear,
  :intCD,
  :intCharted,
  :intDiedYear,
  :intDuration,
  :intFormedYear,
  :intLoved,
  :intMembers,
  :intMusicVidComments,
  :intMusicVidDislikes,
  :intMusicVidFavorites,
  :intMusicVidLikes,
  :intMusicVidViews,
  :intSales,
  :intScore,
  :intScoreVotes,
  :intTotalListeners,
  :intTotalPlays,
  :intTrackNumber,
  :intYearReleased,
  :strAlbum,
  :strAlbum3DCase,
  :strAlbum3DFace,
  :strAlbum3DFlat,
  :strAlbum3DThumb,
  :strAlbumCDart,
  :strAlbumSpine,
  :strAlbumStripped,
  :strAlbumThumb,
  :strAlbumThumbBack,
  :strAlbumThumbHQ,
  :strAllMusicID,
  :strAmazonID,
  :strArtist,
  :strArtistAlternate,
  :strArtistBanner,
  :strArtistClearart,
  :strArtistCutout,
  :strArtistFanart,
  :strArtistFanart2,
  :strArtistFanart3,
  :strArtistFanart4,
  :strArtistLogo,
  :strArtistStripped,
  :strArtistThumb,
  :strArtistWideThumb,
  :strBBCReviewID,
  :strBiographyCN,
  :strBiographyDE,
  :strBiographyEN,
  :strBiographyES,
  :strBiographyFR,
  :strBiographyHU,
  :strBiographyIL,
  :strBiographyIT,
  :strBiographyJP,
  :strBiographyNL,
  :strBiographyNO,
  :strBiographyPL,
  :strBiographyPT,
  :strBiographyRU,
  :strBiographySE,
  :strCountry,
  :strCountryCode,
  :strDescriptionEN,
  :strDisbanded,
  :strDiscogsID,
  :strFacebook,
  :strGender,
  :strGeniusID,
  :strGenre,
  :strItunesID,
  :strLabel,
  :strLastFMChart,
  :strLocation,
  :strLocked,
  :strLyricWikiID,
  :strMood,
  :strMusicBrainzAlbumID,
  :strMusicBrainzArtistID,
  :strMusicBrainzID,
  :strMusicMozID,
  :strMusicVid,
  :strMusicVidCompany,
  :strMusicVidDirector,
  :strMusicVidScreen1,
  :strMusicVidScreen2,
  :strMusicVidScreen3,
  :strRateYourMusicID,
  :strReleaseFormat,
  :strReview,
  :strSpeed,
  :strStyle,
  :strTheme,
  :strTrack,
  :strTrackLyrics,
  :strTrackThumb,
  :strTwitter,
  :strWebsite,
  :strWikidataID,
  :strWikipediaID,
  keyword_init: true
)

# Request payload for V1Search#list.
#
# @!attribute [rw] idAlbum
#   @return [Integer, nil]
#
# @!attribute [rw] idArtist
#   @return [Integer, nil]
#
# @!attribute [rw] idIMVDB
#   @return [Integer, nil]
#
# @!attribute [rw] idLabel
#   @return [Integer, nil]
#
# @!attribute [rw] idLyric
#   @return [Integer, nil]
#
# @!attribute [rw] idTrack
#   @return [Integer, nil]
#
# @!attribute [rw] intBornYear
#   @return [Integer, nil]
#
# @!attribute [rw] intCD
#   @return [Integer, nil]
#
# @!attribute [rw] intCharted
#   @return [Integer, nil]
#
# @!attribute [rw] intDiedYear
#   @return [Integer, nil]
#
# @!attribute [rw] intDuration
#   @return [Integer, nil]
#
# @!attribute [rw] intFormedYear
#   @return [Integer, nil]
#
# @!attribute [rw] intLoved
#   @return [Integer, nil]
#
# @!attribute [rw] intMembers
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidComments
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidDislikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidFavorites
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidLikes
#   @return [Integer, nil]
#
# @!attribute [rw] intMusicVidViews
#   @return [Integer, nil]
#
# @!attribute [rw] intSales
#   @return [Integer, nil]
#
# @!attribute [rw] intScore
#   @return [Integer, nil]
#
# @!attribute [rw] intScoreVotes
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalListeners
#   @return [Integer, nil]
#
# @!attribute [rw] intTotalPlays
#   @return [Integer, nil]
#
# @!attribute [rw] intTrackNumber
#   @return [Integer, nil]
#
# @!attribute [rw] intYearReleased
#   @return [Integer, nil]
#
# @!attribute [rw] strAlbum
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DCase
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DFace
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DFlat
#   @return [String, nil]
#
# @!attribute [rw] strAlbum3DThumb
#   @return [String, nil]
#
# @!attribute [rw] strAlbumCDart
#   @return [String, nil]
#
# @!attribute [rw] strAlbumSpine
#   @return [String, nil]
#
# @!attribute [rw] strAlbumStripped
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumb
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumbBack
#   @return [String, nil]
#
# @!attribute [rw] strAlbumThumbHQ
#   @return [String, nil]
#
# @!attribute [rw] strAllMusicID
#   @return [String, nil]
#
# @!attribute [rw] strAmazonID
#   @return [String, nil]
#
# @!attribute [rw] strArtist
#   @return [String, nil]
#
# @!attribute [rw] strArtistAlternate
#   @return [String, nil]
#
# @!attribute [rw] strArtistBanner
#   @return [String, nil]
#
# @!attribute [rw] strArtistClearart
#   @return [String, nil]
#
# @!attribute [rw] strArtistCutout
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart2
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart3
#   @return [String, nil]
#
# @!attribute [rw] strArtistFanart4
#   @return [String, nil]
#
# @!attribute [rw] strArtistLogo
#   @return [String, nil]
#
# @!attribute [rw] strArtistStripped
#   @return [String, nil]
#
# @!attribute [rw] strArtistThumb
#   @return [String, nil]
#
# @!attribute [rw] strArtistWideThumb
#   @return [String, nil]
#
# @!attribute [rw] strBBCReviewID
#   @return [String, nil]
#
# @!attribute [rw] strBiographyCN
#   @return [String, nil]
#
# @!attribute [rw] strBiographyDE
#   @return [String, nil]
#
# @!attribute [rw] strBiographyEN
#   @return [String, nil]
#
# @!attribute [rw] strBiographyES
#   @return [String, nil]
#
# @!attribute [rw] strBiographyFR
#   @return [String, nil]
#
# @!attribute [rw] strBiographyHU
#   @return [String, nil]
#
# @!attribute [rw] strBiographyIL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyIT
#   @return [String, nil]
#
# @!attribute [rw] strBiographyJP
#   @return [String, nil]
#
# @!attribute [rw] strBiographyNL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyNO
#   @return [String, nil]
#
# @!attribute [rw] strBiographyPL
#   @return [String, nil]
#
# @!attribute [rw] strBiographyPT
#   @return [String, nil]
#
# @!attribute [rw] strBiographyRU
#   @return [String, nil]
#
# @!attribute [rw] strBiographySE
#   @return [String, nil]
#
# @!attribute [rw] strCountry
#   @return [String, nil]
#
# @!attribute [rw] strCountryCode
#   @return [String, nil]
#
# @!attribute [rw] strDescriptionEN
#   @return [String, nil]
#
# @!attribute [rw] strDisbanded
#   @return [String, nil]
#
# @!attribute [rw] strDiscogsID
#   @return [String, nil]
#
# @!attribute [rw] strFacebook
#   @return [String, nil]
#
# @!attribute [rw] strGender
#   @return [String, nil]
#
# @!attribute [rw] strGeniusID
#   @return [String, nil]
#
# @!attribute [rw] strGenre
#   @return [String, nil]
#
# @!attribute [rw] strItunesID
#   @return [String, nil]
#
# @!attribute [rw] strLabel
#   @return [String, nil]
#
# @!attribute [rw] strLastFMChart
#   @return [String, nil]
#
# @!attribute [rw] strLocation
#   @return [String, nil]
#
# @!attribute [rw] strLocked
#   @return [String, nil]
#
# @!attribute [rw] strLyricWikiID
#   @return [String, nil]
#
# @!attribute [rw] strMood
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzAlbumID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzArtistID
#   @return [String, nil]
#
# @!attribute [rw] strMusicBrainzID
#   @return [String, nil]
#
# @!attribute [rw] strMusicMozID
#   @return [String, nil]
#
# @!attribute [rw] strMusicVid
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidCompany
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidDirector
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen1
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen2
#   @return [String, nil]
#
# @!attribute [rw] strMusicVidScreen3
#   @return [String, nil]
#
# @!attribute [rw] strRateYourMusicID
#   @return [String, nil]
#
# @!attribute [rw] strReleaseFormat
#   @return [String, nil]
#
# @!attribute [rw] strReview
#   @return [String, nil]
#
# @!attribute [rw] strSpeed
#   @return [String, nil]
#
# @!attribute [rw] strStyle
#   @return [String, nil]
#
# @!attribute [rw] strTheme
#   @return [String, nil]
#
# @!attribute [rw] strTrack
#   @return [String, nil]
#
# @!attribute [rw] strTrackLyrics
#   @return [String, nil]
#
# @!attribute [rw] strTrackThumb
#   @return [String, nil]
#
# @!attribute [rw] strTwitter
#   @return [String, nil]
#
# @!attribute [rw] strWebsite
#   @return [String, nil]
#
# @!attribute [rw] strWikidataID
#   @return [String, nil]
#
# @!attribute [rw] strWikipediaID
#   @return [String, nil]
V1SearchListMatch = Struct.new(
  :idAlbum,
  :idArtist,
  :idIMVDB,
  :idLabel,
  :idLyric,
  :idTrack,
  :intBornYear,
  :intCD,
  :intCharted,
  :intDiedYear,
  :intDuration,
  :intFormedYear,
  :intLoved,
  :intMembers,
  :intMusicVidComments,
  :intMusicVidDislikes,
  :intMusicVidFavorites,
  :intMusicVidLikes,
  :intMusicVidViews,
  :intSales,
  :intScore,
  :intScoreVotes,
  :intTotalListeners,
  :intTotalPlays,
  :intTrackNumber,
  :intYearReleased,
  :strAlbum,
  :strAlbum3DCase,
  :strAlbum3DFace,
  :strAlbum3DFlat,
  :strAlbum3DThumb,
  :strAlbumCDart,
  :strAlbumSpine,
  :strAlbumStripped,
  :strAlbumThumb,
  :strAlbumThumbBack,
  :strAlbumThumbHQ,
  :strAllMusicID,
  :strAmazonID,
  :strArtist,
  :strArtistAlternate,
  :strArtistBanner,
  :strArtistClearart,
  :strArtistCutout,
  :strArtistFanart,
  :strArtistFanart2,
  :strArtistFanart3,
  :strArtistFanart4,
  :strArtistLogo,
  :strArtistStripped,
  :strArtistThumb,
  :strArtistWideThumb,
  :strBBCReviewID,
  :strBiographyCN,
  :strBiographyDE,
  :strBiographyEN,
  :strBiographyES,
  :strBiographyFR,
  :strBiographyHU,
  :strBiographyIL,
  :strBiographyIT,
  :strBiographyJP,
  :strBiographyNL,
  :strBiographyNO,
  :strBiographyPL,
  :strBiographyPT,
  :strBiographyRU,
  :strBiographySE,
  :strCountry,
  :strCountryCode,
  :strDescriptionEN,
  :strDisbanded,
  :strDiscogsID,
  :strFacebook,
  :strGender,
  :strGeniusID,
  :strGenre,
  :strItunesID,
  :strLabel,
  :strLastFMChart,
  :strLocation,
  :strLocked,
  :strLyricWikiID,
  :strMood,
  :strMusicBrainzAlbumID,
  :strMusicBrainzArtistID,
  :strMusicBrainzID,
  :strMusicMozID,
  :strMusicVid,
  :strMusicVidCompany,
  :strMusicVidDirector,
  :strMusicVidScreen1,
  :strMusicVidScreen2,
  :strMusicVidScreen3,
  :strRateYourMusicID,
  :strReleaseFormat,
  :strReview,
  :strSpeed,
  :strStyle,
  :strTheme,
  :strTrack,
  :strTrackLyrics,
  :strTrackThumb,
  :strTwitter,
  :strWebsite,
  :strWikidataID,
  :strWikipediaID,
  keyword_init: true
)

# V2List entity data model.
#
# @!attribute [rw] albums
#   @return [Array, nil]
V2List = Struct.new(
  :albums,
  keyword_init: true
)

# Request payload for V2List#load.
#
# @!attribute [rw] artist_id
#   @return [Integer]
V2ListLoadMatch = Struct.new(
  :artist_id,
  keyword_init: true
)

# V2Lookup entity data model.
#
# @!attribute [rw] albums
#   @return [Array, nil]
#
# @!attribute [rw] artists
#   @return [Array, nil]
#
# @!attribute [rw] tracks
#   @return [Array, nil]
V2Lookup = Struct.new(
  :albums,
  :artists,
  :tracks,
  keyword_init: true
)

# Request payload for V2Lookup#load.
#
# @!attribute [rw] album_id
#   @return [Integer]
V2LookupLoadMatch = Struct.new(
  :album_id,
  keyword_init: true
)

# V2Search entity data model.
#
# @!attribute [rw] albums
#   @return [Array, nil]
#
# @!attribute [rw] artists
#   @return [Array, nil]
#
# @!attribute [rw] tracks
#   @return [Array, nil]
V2Search = Struct.new(
  :albums,
  :artists,
  :tracks,
  keyword_init: true
)

# Request payload for V2Search#load.
#
# @!attribute [rw] album_name
#   @return [String]
V2SearchLoadMatch = Struct.new(
  :album_name,
  keyword_init: true
)

