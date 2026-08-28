# FreeMusicApi2 Python SDK Reference

Complete API reference for the FreeMusicApi2 Python SDK.


## FreeMusicApi2SDK

### Constructor

```python
from freemusicapi2_sdk import FreeMusicApi2SDK

client = FreeMusicApi2SDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FreeMusicApi2SDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = FreeMusicApi2SDK.test()
```


### Instance Methods

#### `V1List(data=None)`

Create a new `V1ListEntity` instance. Pass `None` for no initial data.

#### `V1Lookup(data=None)`

Create a new `V1LookupEntity` instance. Pass `None` for no initial data.

#### `V1Search(data=None)`

Create a new `V1SearchEntity` instance. Pass `None` for no initial data.

#### `V2List(data=None)`

Create a new `V2ListEntity` instance. Pass `None` for no initial data.

#### `V2Lookup(data=None)`

Create a new `V2LookupEntity` instance. Pass `None` for no initial data.

#### `V2Search(data=None)`

Create a new `V2SearchEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## V1ListEntity

```python
v1_list = client.V1List()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `int` | No | Album ID |
| `idArtist` | `int` | No | Artist ID |
| `idIMVDB` | `int` | No | IMVDB ID |
| `idLyric` | `int` | No | Lyrics ID |
| `idTrack` | `int` | No | Track ID |
| `intCD` | `int` | No | CD number |
| `intDuration` | `int` | No | Track duration in milliseconds |
| `intLoved` | `int` | No | Number of loves/likes |
| `intMusicVidComments` | `int` | No | Number of music video comments |
| `intMusicVidDislikes` | `int` | No | Number of music video dislikes |
| `intMusicVidFavorites` | `int` | No | Number of music video favorites |
| `intMusicVidLikes` | `int` | No | Number of music video likes |
| `intMusicVidViews` | `int` | No | Number of music video views |
| `intScore` | `int` | No | Track score |
| `intScoreVotes` | `int` | No | Number of score votes |
| `intTotalListeners` | `int` | No | Total number of listeners |
| `intTotalPlays` | `int` | No | Total number of plays |
| `intTrackNumber` | `int` | No | Track number on album |
| `loved` | `list` | No |  |
| `strAlbum` | `str` | No | Album title |
| `strArtist` | `str` | No | Artist name |
| `strArtistAlternate` | `str` | No | Alternate artist name |
| `strDescriptionEN` | `str` | No | Video description in English |
| `strGenre` | `str` | No | Track genre |
| `strLocked` | `str` | No | Whether the record is locked |
| `strMood` | `str` | No | Track mood |
| `strMusicBrainzAlbumID` | `str` | No | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `str` | No | MusicBrainz Artist ID |
| `strMusicBrainzID` | `str` | No | MusicBrainz Recording ID |
| `strMusicVid` | `str` | No | URL to music video |
| `strMusicVidCompany` | `str` | No | Music video production company |
| `strMusicVidDirector` | `str` | No | Music video director |
| `strMusicVidScreen1` | `str` | No | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `str` | No | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `str` | No | URL to music video screenshot 3 |
| `strStyle` | `str` | No | Track style |
| `strTheme` | `str` | No | Track theme |
| `strTrack` | `str` | No | Track title |
| `strTrackLyrics` | `str` | No | Track lyrics |
| `strTrackThumb` | `str` | No | URL to track thumbnail |
| `trending` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V1List().list({"country": "example", "format": "example", "type": "example"})
for v1_list in results:
    print(v1_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1ListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V1LookupEntity

```python
v1_lookup = client.V1Lookup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `int` | No | Album ID |
| `idArtist` | `int` | No | Artist ID |
| `idIMVDB` | `int` | No | IMVDB ID |
| `idLabel` | `int` | No | Label ID |
| `idLyric` | `int` | No | Lyrics ID |
| `idTrack` | `int` | No | Unique track ID |
| `intBornYear` | `int` | No | Birth year of the artist |
| `intCD` | `int` | No | CD number |
| `intCharted` | `int` | No | Chart position |
| `intDiedYear` | `int` | No | Year the artist died (if applicable) |
| `intDuration` | `int` | No | Track duration in milliseconds |
| `intFormedYear` | `int` | No | Year the artist/band was formed |
| `intLoved` | `int` | No | Number of loves/likes |
| `intMembers` | `int` | No | Number of band members |
| `intMusicVidComments` | `int` | No | Number of music video comments |
| `intMusicVidDislikes` | `int` | No | Number of music video dislikes |
| `intMusicVidFavorites` | `int` | No | Number of music video favorites |
| `intMusicVidLikes` | `int` | No | Number of music video likes |
| `intMusicVidViews` | `int` | No | Number of music video views |
| `intSales` | `int` | No | Number of sales |
| `intScore` | `int` | No | Track score |
| `intScoreVotes` | `int` | No | Number of score votes |
| `intTotalListeners` | `int` | No | Total number of listeners |
| `intTotalPlays` | `int` | No | Total number of plays |
| `intTrackNumber` | `int` | No | Track number on album |
| `intYearReleased` | `int` | No | Year the album was released |
| `strAlbum` | `str` | No | Album title |
| `strAlbum3DCase` | `str` | No | URL to 3D case image |
| `strAlbum3DFace` | `str` | No | URL to 3D face image |
| `strAlbum3DFlat` | `str` | No | URL to 3D flat image |
| `strAlbum3DThumb` | `str` | No | URL to 3D thumbnail |
| `strAlbumCDart` | `str` | No | URL to CD art |
| `strAlbumSpine` | `str` | No | URL to album spine image |
| `strAlbumStripped` | `str` | No | Album title without special characters |
| `strAlbumThumb` | `str` | No | URL to album thumbnail |
| `strAlbumThumbBack` | `str` | No | URL to back of album cover |
| `strAlbumThumbHQ` | `str` | No | URL to high quality album thumbnail |
| `strAllMusicID` | `str` | No | AllMusic ID |
| `strAmazonID` | `str` | No | Amazon ID |
| `strAppleMusic` | `str` | No | Apple Music artist URL |
| `strArtist` | `str` | No | Artist name |
| `strArtistAlternate` | `str` | No | Alternate artist name |
| `strArtistBanner` | `str` | No | URL to artist banner |
| `strArtistClearart` | `str` | No | URL to artist clearart |
| `strArtistCutout` | `str` | No | URL to artist cutout image |
| `strArtistFanart` | `str` | No | URL to artist fanart |
| `strArtistFanart2` | `str` | No | URL to alternate artist fanart |
| `strArtistFanart3` | `str` | No | URL to third artist fanart |
| `strArtistFanart4` | `str` | No | URL to fourth artist fanart |
| `strArtistLogo` | `str` | No | URL to artist logo |
| `strArtistStripped` | `str` | No | Artist name without special characters |
| `strArtistThumb` | `str` | No | URL to artist thumbnail image |
| `strArtistWideThumb` | `str` | No | URL to artist wide thumbnail |
| `strBBCReviewID` | `str` | No | BBC Review ID |
| `strBiographyCN` | `str` | No | Artist biography in Chinese |
| `strBiographyDE` | `str` | No | Artist biography in German |
| `strBiographyEN` | `str` | No | Artist biography in English |
| `strBiographyES` | `str` | No | Artist biography in Spanish |
| `strBiographyFR` | `str` | No | Artist biography in French |
| `strBiographyHU` | `str` | No | Artist biography in Hungarian |
| `strBiographyIL` | `str` | No | Artist biography in Hebrew |
| `strBiographyIT` | `str` | No | Artist biography in Italian |
| `strBiographyJP` | `str` | No | Artist biography in Japanese |
| `strBiographyNL` | `str` | No | Artist biography in Dutch |
| `strBiographyNO` | `str` | No | Artist biography in Norwegian |
| `strBiographyPL` | `str` | No | Artist biography in Polish |
| `strBiographyPT` | `str` | No | Artist biography in Portuguese |
| `strBiographyRU` | `str` | No | Artist biography in Russian |
| `strBiographySE` | `str` | No | Artist biography in Swedish |
| `strCountry` | `str` | No | Country of origin |
| `strCountryCode` | `str` | No | Country code |
| `strDescriptionEN` | `str` | No | Track description in English |
| `strDisbanded` | `str` | No | Disbanded status |
| `strDiscogsID` | `str` | No | Discogs ID |
| `strFacebook` | `str` | No | Facebook page URL |
| `strGender` | `str` | No | Artist gender |
| `strGeniusID` | `str` | No | Genius ID |
| `strGenre` | `str` | No | Track genre |
| `strInstagram` | `str` | No | Instagram profile URL |
| `strItunesID` | `str` | No | iTunes ID |
| `strLabel` | `str` | No | Record label |
| `strLastFMChart` | `str` | No | Last.fm chart URL |
| `strLocation` | `str` | No | Recording location |
| `strLocked` | `str` | No | Whether the record is locked |
| `strLyricWikiID` | `str` | No | LyricWiki ID |
| `strMood` | `str` | No | Track mood |
| `strMusicBrainzAlbumID` | `str` | No | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `str` | No | MusicBrainz Artist ID |
| `strMusicBrainzID` | `str` | No | MusicBrainz Recording ID |
| `strMusicMozID` | `str` | No | MusicMoz ID |
| `strMusicVid` | `str` | No | URL to music video |
| `strMusicVidCompany` | `str` | No | Music video production company |
| `strMusicVidDirector` | `str` | No | Music video director |
| `strMusicVidScreen1` | `str` | No | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `str` | No | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `str` | No | URL to music video screenshot 3 |
| `strRateYourMusicID` | `str` | No | RateYourMusic ID |
| `strReleaseFormat` | `str` | No | Release format (CD, Vinyl, etc.) |
| `strReview` | `str` | No | Album review |
| `strSoundCloud` | `str` | No | SoundCloud profile URL |
| `strSpeed` | `str` | No | Album speed |
| `strSpotify` | `str` | No | Spotify artist URL |
| `strStyle` | `str` | No | Track style |
| `strTheme` | `str` | No | Track theme |
| `strTrack` | `str` | No | Track title |
| `strTrackLyrics` | `str` | No | Track lyrics |
| `strTrackThumb` | `str` | No | URL to track thumbnail |
| `strTwitter` | `str` | No | Twitter profile URL |
| `strWebsite` | `str` | No | Official website URL |
| `strWikidataID` | `str` | No | Wikidata ID |
| `strWikipediaID` | `str` | No | Wikipedia ID |
| `strYoutube` | `str` | No | YouTube channel URL |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V1Lookup().list()
for v1_lookup in results:
    print(v1_lookup)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1LookupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V1SearchEntity

```python
v1_search = client.V1Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `int` | No | Unique album ID |
| `idArtist` | `int` | No | Artist ID |
| `idIMVDB` | `int` | No | IMVDB ID |
| `idLabel` | `int` | No | Label ID |
| `idLyric` | `int` | No | Lyrics ID |
| `idTrack` | `int` | No | Unique track ID |
| `intBornYear` | `int` | No | Birth year of the artist |
| `intCD` | `int` | No | CD number |
| `intCharted` | `int` | No | Chart position |
| `intDiedYear` | `int` | No | Year the artist died (if applicable) |
| `intDuration` | `int` | No | Track duration in milliseconds |
| `intFormedYear` | `int` | No | Year the artist/band was formed |
| `intLoved` | `int` | No | Number of loves/likes |
| `intMembers` | `int` | No | Number of band members |
| `intMusicVidComments` | `int` | No | Number of music video comments |
| `intMusicVidDislikes` | `int` | No | Number of music video dislikes |
| `intMusicVidFavorites` | `int` | No | Number of music video favorites |
| `intMusicVidLikes` | `int` | No | Number of music video likes |
| `intMusicVidViews` | `int` | No | Number of music video views |
| `intSales` | `int` | No | Number of sales |
| `intScore` | `int` | No | Album score |
| `intScoreVotes` | `int` | No | Number of score votes |
| `intTotalListeners` | `int` | No | Total number of listeners |
| `intTotalPlays` | `int` | No | Total number of plays |
| `intTrackNumber` | `int` | No | Track number on album |
| `intYearReleased` | `int` | No | Year the album was released |
| `strAlbum` | `str` | No | Album title |
| `strAlbum3DCase` | `str` | No | URL to 3D case image |
| `strAlbum3DFace` | `str` | No | URL to 3D face image |
| `strAlbum3DFlat` | `str` | No | URL to 3D flat image |
| `strAlbum3DThumb` | `str` | No | URL to 3D thumbnail |
| `strAlbumCDart` | `str` | No | URL to CD art |
| `strAlbumSpine` | `str` | No | URL to album spine image |
| `strAlbumStripped` | `str` | No | Album title without special characters |
| `strAlbumThumb` | `str` | No | URL to album thumbnail |
| `strAlbumThumbBack` | `str` | No | URL to back of album cover |
| `strAlbumThumbHQ` | `str` | No | URL to high quality album thumbnail |
| `strAllMusicID` | `str` | No | AllMusic ID |
| `strAmazonID` | `str` | No | Amazon ID |
| `strArtist` | `str` | No | Artist name |
| `strArtistAlternate` | `str` | No | Alternate artist name |
| `strArtistBanner` | `str` | No | URL to artist banner |
| `strArtistClearart` | `str` | No | URL to artist clearart |
| `strArtistCutout` | `str` | No | URL to artist cutout image |
| `strArtistFanart` | `str` | No | URL to artist fanart |
| `strArtistFanart2` | `str` | No | URL to alternate artist fanart |
| `strArtistFanart3` | `str` | No | URL to third artist fanart |
| `strArtistFanart4` | `str` | No | URL to fourth artist fanart |
| `strArtistLogo` | `str` | No | URL to artist logo |
| `strArtistStripped` | `str` | No | Artist name without special characters |
| `strArtistThumb` | `str` | No | URL to artist thumbnail image |
| `strArtistWideThumb` | `str` | No | URL to artist wide thumbnail |
| `strBBCReviewID` | `str` | No | BBC Review ID |
| `strBiographyCN` | `str` | No | Artist biography in Chinese |
| `strBiographyDE` | `str` | No | Artist biography in German |
| `strBiographyEN` | `str` | No | Artist biography in English |
| `strBiographyES` | `str` | No | Artist biography in Spanish |
| `strBiographyFR` | `str` | No | Artist biography in French |
| `strBiographyHU` | `str` | No | Artist biography in Hungarian |
| `strBiographyIL` | `str` | No | Artist biography in Hebrew |
| `strBiographyIT` | `str` | No | Artist biography in Italian |
| `strBiographyJP` | `str` | No | Artist biography in Japanese |
| `strBiographyNL` | `str` | No | Artist biography in Dutch |
| `strBiographyNO` | `str` | No | Artist biography in Norwegian |
| `strBiographyPL` | `str` | No | Artist biography in Polish |
| `strBiographyPT` | `str` | No | Artist biography in Portuguese |
| `strBiographyRU` | `str` | No | Artist biography in Russian |
| `strBiographySE` | `str` | No | Artist biography in Swedish |
| `strCountry` | `str` | No | Country of origin |
| `strCountryCode` | `str` | No | Country code |
| `strDescriptionEN` | `str` | No | Album description in English |
| `strDisbanded` | `str` | No | Disbanded status |
| `strDiscogsID` | `str` | No | Discogs ID |
| `strFacebook` | `str` | No | Facebook page URL |
| `strGender` | `str` | No | Artist gender |
| `strGeniusID` | `str` | No | Genius ID |
| `strGenre` | `str` | No | Album genre |
| `strItunesID` | `str` | No | iTunes ID |
| `strLabel` | `str` | No | Record label |
| `strLastFMChart` | `str` | No | Last.fm chart URL |
| `strLocation` | `str` | No | Recording location |
| `strLocked` | `str` | No | Whether the record is locked |
| `strLyricWikiID` | `str` | No | LyricWiki ID |
| `strMood` | `str` | No | Album mood |
| `strMusicBrainzAlbumID` | `str` | No | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `str` | No | MusicBrainz Artist ID |
| `strMusicBrainzID` | `str` | No | MusicBrainz Release Group ID |
| `strMusicMozID` | `str` | No | MusicMoz ID |
| `strMusicVid` | `str` | No | URL to music video |
| `strMusicVidCompany` | `str` | No | Music video production company |
| `strMusicVidDirector` | `str` | No | Music video director |
| `strMusicVidScreen1` | `str` | No | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `str` | No | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `str` | No | URL to music video screenshot 3 |
| `strRateYourMusicID` | `str` | No | RateYourMusic ID |
| `strReleaseFormat` | `str` | No | Release format (CD, Vinyl, etc.) |
| `strReview` | `str` | No | Album review |
| `strSpeed` | `str` | No | Album speed |
| `strStyle` | `str` | No | Album style |
| `strTheme` | `str` | No | Album theme |
| `strTrack` | `str` | No | Track title |
| `strTrackLyrics` | `str` | No | Track lyrics |
| `strTrackThumb` | `str` | No | URL to track thumbnail |
| `strTwitter` | `str` | No | Twitter profile URL |
| `strWebsite` | `str` | No | Official website URL |
| `strWikidataID` | `str` | No | Wikidata ID |
| `strWikipediaID` | `str` | No | Wikipedia ID |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V1Search().list({"s": "example"})
for v1_search in results:
    print(v1_search)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V2ListEntity

```python
v2_list = client.V2List()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V2List().load({"artist_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2ListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V2LookupEntity

```python
v2_lookup = client.V2Lookup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `list` | No |  |
| `artists` | `list` | No |  |
| `tracks` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V2Lookup().load({"album_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2LookupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V2SearchEntity

```python
v2_search = client.V2Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `list` | No |  |
| `artists` | `list` | No |  |
| `tracks` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V2Search().load({"album_name": "album_name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = FreeMusicApi2SDK({
    "feature": {
        "test": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

