<?php
declare(strict_types=1);

// Typed models for the FreeMusicApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** V1List entity data model. */
class V1List
{
    public ?int $idAlbum = null;
    public ?int $idArtist = null;
    public ?int $idIMVDB = null;
    public ?int $idLyric = null;
    public ?int $idTrack = null;
    public ?int $intCD = null;
    public ?int $intDuration = null;
    public ?int $intLoved = null;
    public ?int $intMusicVidComments = null;
    public ?int $intMusicVidDislikes = null;
    public ?int $intMusicVidFavorites = null;
    public ?int $intMusicVidLikes = null;
    public ?int $intMusicVidViews = null;
    public ?int $intScore = null;
    public ?int $intScoreVotes = null;
    public ?int $intTotalListeners = null;
    public ?int $intTotalPlays = null;
    public ?int $intTrackNumber = null;
    public ?array $loved = null;
    public ?string $strAlbum = null;
    public ?string $strArtist = null;
    public ?string $strArtistAlternate = null;
    public ?string $strDescriptionEN = null;
    public ?string $strGenre = null;
    public ?string $strLocked = null;
    public ?string $strMood = null;
    public ?string $strMusicBrainzAlbumID = null;
    public ?string $strMusicBrainzArtistID = null;
    public ?string $strMusicBrainzID = null;
    public ?string $strMusicVid = null;
    public ?string $strMusicVidCompany = null;
    public ?string $strMusicVidDirector = null;
    public ?string $strMusicVidScreen1 = null;
    public ?string $strMusicVidScreen2 = null;
    public ?string $strMusicVidScreen3 = null;
    public ?string $strStyle = null;
    public ?string $strTheme = null;
    public ?string $strTrack = null;
    public ?string $strTrackLyrics = null;
    public ?string $strTrackThumb = null;
    public ?array $trending = null;
}

/** Request payload for V1List#list. */
class V1ListListMatch
{
    public ?int $idAlbum = null;
    public ?int $idArtist = null;
    public ?int $idIMVDB = null;
    public ?int $idLyric = null;
    public ?int $idTrack = null;
    public ?int $intCD = null;
    public ?int $intDuration = null;
    public ?int $intLoved = null;
    public ?int $intMusicVidComments = null;
    public ?int $intMusicVidDislikes = null;
    public ?int $intMusicVidFavorites = null;
    public ?int $intMusicVidLikes = null;
    public ?int $intMusicVidViews = null;
    public ?int $intScore = null;
    public ?int $intScoreVotes = null;
    public ?int $intTotalListeners = null;
    public ?int $intTotalPlays = null;
    public ?int $intTrackNumber = null;
    public ?array $loved = null;
    public ?string $strAlbum = null;
    public ?string $strArtist = null;
    public ?string $strArtistAlternate = null;
    public ?string $strDescriptionEN = null;
    public ?string $strGenre = null;
    public ?string $strLocked = null;
    public ?string $strMood = null;
    public ?string $strMusicBrainzAlbumID = null;
    public ?string $strMusicBrainzArtistID = null;
    public ?string $strMusicBrainzID = null;
    public ?string $strMusicVid = null;
    public ?string $strMusicVidCompany = null;
    public ?string $strMusicVidDirector = null;
    public ?string $strMusicVidScreen1 = null;
    public ?string $strMusicVidScreen2 = null;
    public ?string $strMusicVidScreen3 = null;
    public ?string $strStyle = null;
    public ?string $strTheme = null;
    public ?string $strTrack = null;
    public ?string $strTrackLyrics = null;
    public ?string $strTrackThumb = null;
    public ?array $trending = null;
}

/** V1Lookup entity data model. */
class V1Lookup
{
    public ?int $idAlbum = null;
    public ?int $idArtist = null;
    public ?int $idIMVDB = null;
    public ?int $idLabel = null;
    public ?int $idLyric = null;
    public ?int $idTrack = null;
    public ?int $intBornYear = null;
    public ?int $intCD = null;
    public ?int $intCharted = null;
    public ?int $intDiedYear = null;
    public ?int $intDuration = null;
    public ?int $intFormedYear = null;
    public ?int $intLoved = null;
    public ?int $intMembers = null;
    public ?int $intMusicVidComments = null;
    public ?int $intMusicVidDislikes = null;
    public ?int $intMusicVidFavorites = null;
    public ?int $intMusicVidLikes = null;
    public ?int $intMusicVidViews = null;
    public ?int $intSales = null;
    public ?int $intScore = null;
    public ?int $intScoreVotes = null;
    public ?int $intTotalListeners = null;
    public ?int $intTotalPlays = null;
    public ?int $intTrackNumber = null;
    public ?int $intYearReleased = null;
    public ?string $strAlbum = null;
    public ?string $strAlbum3DCase = null;
    public ?string $strAlbum3DFace = null;
    public ?string $strAlbum3DFlat = null;
    public ?string $strAlbum3DThumb = null;
    public ?string $strAlbumCDart = null;
    public ?string $strAlbumSpine = null;
    public ?string $strAlbumStripped = null;
    public ?string $strAlbumThumb = null;
    public ?string $strAlbumThumbBack = null;
    public ?string $strAlbumThumbHQ = null;
    public ?string $strAllMusicID = null;
    public ?string $strAmazonID = null;
    public ?string $strAppleMusic = null;
    public ?string $strArtist = null;
    public ?string $strArtistAlternate = null;
    public ?string $strArtistBanner = null;
    public ?string $strArtistClearart = null;
    public ?string $strArtistCutout = null;
    public ?string $strArtistFanart = null;
    public ?string $strArtistFanart2 = null;
    public ?string $strArtistFanart3 = null;
    public ?string $strArtistFanart4 = null;
    public ?string $strArtistLogo = null;
    public ?string $strArtistStripped = null;
    public ?string $strArtistThumb = null;
    public ?string $strArtistWideThumb = null;
    public ?string $strBBCReviewID = null;
    public ?string $strBiographyCN = null;
    public ?string $strBiographyDE = null;
    public ?string $strBiographyEN = null;
    public ?string $strBiographyES = null;
    public ?string $strBiographyFR = null;
    public ?string $strBiographyHU = null;
    public ?string $strBiographyIL = null;
    public ?string $strBiographyIT = null;
    public ?string $strBiographyJP = null;
    public ?string $strBiographyNL = null;
    public ?string $strBiographyNO = null;
    public ?string $strBiographyPL = null;
    public ?string $strBiographyPT = null;
    public ?string $strBiographyRU = null;
    public ?string $strBiographySE = null;
    public ?string $strCountry = null;
    public ?string $strCountryCode = null;
    public ?string $strDescriptionEN = null;
    public ?string $strDisbanded = null;
    public ?string $strDiscogsID = null;
    public ?string $strFacebook = null;
    public ?string $strGender = null;
    public ?string $strGeniusID = null;
    public ?string $strGenre = null;
    public ?string $strInstagram = null;
    public ?string $strItunesID = null;
    public ?string $strLabel = null;
    public ?string $strLastFMChart = null;
    public ?string $strLocation = null;
    public ?string $strLocked = null;
    public ?string $strLyricWikiID = null;
    public ?string $strMood = null;
    public ?string $strMusicBrainzAlbumID = null;
    public ?string $strMusicBrainzArtistID = null;
    public ?string $strMusicBrainzID = null;
    public ?string $strMusicMozID = null;
    public ?string $strMusicVid = null;
    public ?string $strMusicVidCompany = null;
    public ?string $strMusicVidDirector = null;
    public ?string $strMusicVidScreen1 = null;
    public ?string $strMusicVidScreen2 = null;
    public ?string $strMusicVidScreen3 = null;
    public ?string $strRateYourMusicID = null;
    public ?string $strReleaseFormat = null;
    public ?string $strReview = null;
    public ?string $strSoundCloud = null;
    public ?string $strSpeed = null;
    public ?string $strSpotify = null;
    public ?string $strStyle = null;
    public ?string $strTheme = null;
    public ?string $strTrack = null;
    public ?string $strTrackLyrics = null;
    public ?string $strTrackThumb = null;
    public ?string $strTwitter = null;
    public ?string $strWebsite = null;
    public ?string $strWikidataID = null;
    public ?string $strWikipediaID = null;
    public ?string $strYoutube = null;
}

/** Request payload for V1Lookup#list. */
class V1LookupListMatch
{
    public ?int $idAlbum = null;
    public ?int $idArtist = null;
    public ?int $idIMVDB = null;
    public ?int $idLabel = null;
    public ?int $idLyric = null;
    public ?int $idTrack = null;
    public ?int $intBornYear = null;
    public ?int $intCD = null;
    public ?int $intCharted = null;
    public ?int $intDiedYear = null;
    public ?int $intDuration = null;
    public ?int $intFormedYear = null;
    public ?int $intLoved = null;
    public ?int $intMembers = null;
    public ?int $intMusicVidComments = null;
    public ?int $intMusicVidDislikes = null;
    public ?int $intMusicVidFavorites = null;
    public ?int $intMusicVidLikes = null;
    public ?int $intMusicVidViews = null;
    public ?int $intSales = null;
    public ?int $intScore = null;
    public ?int $intScoreVotes = null;
    public ?int $intTotalListeners = null;
    public ?int $intTotalPlays = null;
    public ?int $intTrackNumber = null;
    public ?int $intYearReleased = null;
    public ?string $strAlbum = null;
    public ?string $strAlbum3DCase = null;
    public ?string $strAlbum3DFace = null;
    public ?string $strAlbum3DFlat = null;
    public ?string $strAlbum3DThumb = null;
    public ?string $strAlbumCDart = null;
    public ?string $strAlbumSpine = null;
    public ?string $strAlbumStripped = null;
    public ?string $strAlbumThumb = null;
    public ?string $strAlbumThumbBack = null;
    public ?string $strAlbumThumbHQ = null;
    public ?string $strAllMusicID = null;
    public ?string $strAmazonID = null;
    public ?string $strAppleMusic = null;
    public ?string $strArtist = null;
    public ?string $strArtistAlternate = null;
    public ?string $strArtistBanner = null;
    public ?string $strArtistClearart = null;
    public ?string $strArtistCutout = null;
    public ?string $strArtistFanart = null;
    public ?string $strArtistFanart2 = null;
    public ?string $strArtistFanart3 = null;
    public ?string $strArtistFanart4 = null;
    public ?string $strArtistLogo = null;
    public ?string $strArtistStripped = null;
    public ?string $strArtistThumb = null;
    public ?string $strArtistWideThumb = null;
    public ?string $strBBCReviewID = null;
    public ?string $strBiographyCN = null;
    public ?string $strBiographyDE = null;
    public ?string $strBiographyEN = null;
    public ?string $strBiographyES = null;
    public ?string $strBiographyFR = null;
    public ?string $strBiographyHU = null;
    public ?string $strBiographyIL = null;
    public ?string $strBiographyIT = null;
    public ?string $strBiographyJP = null;
    public ?string $strBiographyNL = null;
    public ?string $strBiographyNO = null;
    public ?string $strBiographyPL = null;
    public ?string $strBiographyPT = null;
    public ?string $strBiographyRU = null;
    public ?string $strBiographySE = null;
    public ?string $strCountry = null;
    public ?string $strCountryCode = null;
    public ?string $strDescriptionEN = null;
    public ?string $strDisbanded = null;
    public ?string $strDiscogsID = null;
    public ?string $strFacebook = null;
    public ?string $strGender = null;
    public ?string $strGeniusID = null;
    public ?string $strGenre = null;
    public ?string $strInstagram = null;
    public ?string $strItunesID = null;
    public ?string $strLabel = null;
    public ?string $strLastFMChart = null;
    public ?string $strLocation = null;
    public ?string $strLocked = null;
    public ?string $strLyricWikiID = null;
    public ?string $strMood = null;
    public ?string $strMusicBrainzAlbumID = null;
    public ?string $strMusicBrainzArtistID = null;
    public ?string $strMusicBrainzID = null;
    public ?string $strMusicMozID = null;
    public ?string $strMusicVid = null;
    public ?string $strMusicVidCompany = null;
    public ?string $strMusicVidDirector = null;
    public ?string $strMusicVidScreen1 = null;
    public ?string $strMusicVidScreen2 = null;
    public ?string $strMusicVidScreen3 = null;
    public ?string $strRateYourMusicID = null;
    public ?string $strReleaseFormat = null;
    public ?string $strReview = null;
    public ?string $strSoundCloud = null;
    public ?string $strSpeed = null;
    public ?string $strSpotify = null;
    public ?string $strStyle = null;
    public ?string $strTheme = null;
    public ?string $strTrack = null;
    public ?string $strTrackLyrics = null;
    public ?string $strTrackThumb = null;
    public ?string $strTwitter = null;
    public ?string $strWebsite = null;
    public ?string $strWikidataID = null;
    public ?string $strWikipediaID = null;
    public ?string $strYoutube = null;
}

/** V1Search entity data model. */
class V1Search
{
    public ?int $idAlbum = null;
    public ?int $idArtist = null;
    public ?int $idIMVDB = null;
    public ?int $idLabel = null;
    public ?int $idLyric = null;
    public ?int $idTrack = null;
    public ?int $intBornYear = null;
    public ?int $intCD = null;
    public ?int $intCharted = null;
    public ?int $intDiedYear = null;
    public ?int $intDuration = null;
    public ?int $intFormedYear = null;
    public ?int $intLoved = null;
    public ?int $intMembers = null;
    public ?int $intMusicVidComments = null;
    public ?int $intMusicVidDislikes = null;
    public ?int $intMusicVidFavorites = null;
    public ?int $intMusicVidLikes = null;
    public ?int $intMusicVidViews = null;
    public ?int $intSales = null;
    public ?int $intScore = null;
    public ?int $intScoreVotes = null;
    public ?int $intTotalListeners = null;
    public ?int $intTotalPlays = null;
    public ?int $intTrackNumber = null;
    public ?int $intYearReleased = null;
    public ?string $strAlbum = null;
    public ?string $strAlbum3DCase = null;
    public ?string $strAlbum3DFace = null;
    public ?string $strAlbum3DFlat = null;
    public ?string $strAlbum3DThumb = null;
    public ?string $strAlbumCDart = null;
    public ?string $strAlbumSpine = null;
    public ?string $strAlbumStripped = null;
    public ?string $strAlbumThumb = null;
    public ?string $strAlbumThumbBack = null;
    public ?string $strAlbumThumbHQ = null;
    public ?string $strAllMusicID = null;
    public ?string $strAmazonID = null;
    public ?string $strArtist = null;
    public ?string $strArtistAlternate = null;
    public ?string $strArtistBanner = null;
    public ?string $strArtistClearart = null;
    public ?string $strArtistCutout = null;
    public ?string $strArtistFanart = null;
    public ?string $strArtistFanart2 = null;
    public ?string $strArtistFanart3 = null;
    public ?string $strArtistFanart4 = null;
    public ?string $strArtistLogo = null;
    public ?string $strArtistStripped = null;
    public ?string $strArtistThumb = null;
    public ?string $strArtistWideThumb = null;
    public ?string $strBBCReviewID = null;
    public ?string $strBiographyCN = null;
    public ?string $strBiographyDE = null;
    public ?string $strBiographyEN = null;
    public ?string $strBiographyES = null;
    public ?string $strBiographyFR = null;
    public ?string $strBiographyHU = null;
    public ?string $strBiographyIL = null;
    public ?string $strBiographyIT = null;
    public ?string $strBiographyJP = null;
    public ?string $strBiographyNL = null;
    public ?string $strBiographyNO = null;
    public ?string $strBiographyPL = null;
    public ?string $strBiographyPT = null;
    public ?string $strBiographyRU = null;
    public ?string $strBiographySE = null;
    public ?string $strCountry = null;
    public ?string $strCountryCode = null;
    public ?string $strDescriptionEN = null;
    public ?string $strDisbanded = null;
    public ?string $strDiscogsID = null;
    public ?string $strFacebook = null;
    public ?string $strGender = null;
    public ?string $strGeniusID = null;
    public ?string $strGenre = null;
    public ?string $strItunesID = null;
    public ?string $strLabel = null;
    public ?string $strLastFMChart = null;
    public ?string $strLocation = null;
    public ?string $strLocked = null;
    public ?string $strLyricWikiID = null;
    public ?string $strMood = null;
    public ?string $strMusicBrainzAlbumID = null;
    public ?string $strMusicBrainzArtistID = null;
    public ?string $strMusicBrainzID = null;
    public ?string $strMusicMozID = null;
    public ?string $strMusicVid = null;
    public ?string $strMusicVidCompany = null;
    public ?string $strMusicVidDirector = null;
    public ?string $strMusicVidScreen1 = null;
    public ?string $strMusicVidScreen2 = null;
    public ?string $strMusicVidScreen3 = null;
    public ?string $strRateYourMusicID = null;
    public ?string $strReleaseFormat = null;
    public ?string $strReview = null;
    public ?string $strSpeed = null;
    public ?string $strStyle = null;
    public ?string $strTheme = null;
    public ?string $strTrack = null;
    public ?string $strTrackLyrics = null;
    public ?string $strTrackThumb = null;
    public ?string $strTwitter = null;
    public ?string $strWebsite = null;
    public ?string $strWikidataID = null;
    public ?string $strWikipediaID = null;
}

/** Request payload for V1Search#list. */
class V1SearchListMatch
{
    public ?int $idAlbum = null;
    public ?int $idArtist = null;
    public ?int $idIMVDB = null;
    public ?int $idLabel = null;
    public ?int $idLyric = null;
    public ?int $idTrack = null;
    public ?int $intBornYear = null;
    public ?int $intCD = null;
    public ?int $intCharted = null;
    public ?int $intDiedYear = null;
    public ?int $intDuration = null;
    public ?int $intFormedYear = null;
    public ?int $intLoved = null;
    public ?int $intMembers = null;
    public ?int $intMusicVidComments = null;
    public ?int $intMusicVidDislikes = null;
    public ?int $intMusicVidFavorites = null;
    public ?int $intMusicVidLikes = null;
    public ?int $intMusicVidViews = null;
    public ?int $intSales = null;
    public ?int $intScore = null;
    public ?int $intScoreVotes = null;
    public ?int $intTotalListeners = null;
    public ?int $intTotalPlays = null;
    public ?int $intTrackNumber = null;
    public ?int $intYearReleased = null;
    public ?string $strAlbum = null;
    public ?string $strAlbum3DCase = null;
    public ?string $strAlbum3DFace = null;
    public ?string $strAlbum3DFlat = null;
    public ?string $strAlbum3DThumb = null;
    public ?string $strAlbumCDart = null;
    public ?string $strAlbumSpine = null;
    public ?string $strAlbumStripped = null;
    public ?string $strAlbumThumb = null;
    public ?string $strAlbumThumbBack = null;
    public ?string $strAlbumThumbHQ = null;
    public ?string $strAllMusicID = null;
    public ?string $strAmazonID = null;
    public ?string $strArtist = null;
    public ?string $strArtistAlternate = null;
    public ?string $strArtistBanner = null;
    public ?string $strArtistClearart = null;
    public ?string $strArtistCutout = null;
    public ?string $strArtistFanart = null;
    public ?string $strArtistFanart2 = null;
    public ?string $strArtistFanart3 = null;
    public ?string $strArtistFanart4 = null;
    public ?string $strArtistLogo = null;
    public ?string $strArtistStripped = null;
    public ?string $strArtistThumb = null;
    public ?string $strArtistWideThumb = null;
    public ?string $strBBCReviewID = null;
    public ?string $strBiographyCN = null;
    public ?string $strBiographyDE = null;
    public ?string $strBiographyEN = null;
    public ?string $strBiographyES = null;
    public ?string $strBiographyFR = null;
    public ?string $strBiographyHU = null;
    public ?string $strBiographyIL = null;
    public ?string $strBiographyIT = null;
    public ?string $strBiographyJP = null;
    public ?string $strBiographyNL = null;
    public ?string $strBiographyNO = null;
    public ?string $strBiographyPL = null;
    public ?string $strBiographyPT = null;
    public ?string $strBiographyRU = null;
    public ?string $strBiographySE = null;
    public ?string $strCountry = null;
    public ?string $strCountryCode = null;
    public ?string $strDescriptionEN = null;
    public ?string $strDisbanded = null;
    public ?string $strDiscogsID = null;
    public ?string $strFacebook = null;
    public ?string $strGender = null;
    public ?string $strGeniusID = null;
    public ?string $strGenre = null;
    public ?string $strItunesID = null;
    public ?string $strLabel = null;
    public ?string $strLastFMChart = null;
    public ?string $strLocation = null;
    public ?string $strLocked = null;
    public ?string $strLyricWikiID = null;
    public ?string $strMood = null;
    public ?string $strMusicBrainzAlbumID = null;
    public ?string $strMusicBrainzArtistID = null;
    public ?string $strMusicBrainzID = null;
    public ?string $strMusicMozID = null;
    public ?string $strMusicVid = null;
    public ?string $strMusicVidCompany = null;
    public ?string $strMusicVidDirector = null;
    public ?string $strMusicVidScreen1 = null;
    public ?string $strMusicVidScreen2 = null;
    public ?string $strMusicVidScreen3 = null;
    public ?string $strRateYourMusicID = null;
    public ?string $strReleaseFormat = null;
    public ?string $strReview = null;
    public ?string $strSpeed = null;
    public ?string $strStyle = null;
    public ?string $strTheme = null;
    public ?string $strTrack = null;
    public ?string $strTrackLyrics = null;
    public ?string $strTrackThumb = null;
    public ?string $strTwitter = null;
    public ?string $strWebsite = null;
    public ?string $strWikidataID = null;
    public ?string $strWikipediaID = null;
}

/** V2List entity data model. */
class V2List
{
    public ?array $albums = null;
}

/** Request payload for V2List#load. */
class V2ListLoadMatch
{
    public int $artist_id;
}

/** V2Lookup entity data model. */
class V2Lookup
{
    public ?array $albums = null;
    public ?array $artists = null;
    public ?array $tracks = null;
}

/** Request payload for V2Lookup#load. */
class V2LookupLoadMatch
{
    public int $album_id;
}

/** V2Search entity data model. */
class V2Search
{
    public ?array $albums = null;
    public ?array $artists = null;
    public ?array $tracks = null;
}

/** Request payload for V2Search#load. */
class V2SearchLoadMatch
{
    public string $album_name;
}

