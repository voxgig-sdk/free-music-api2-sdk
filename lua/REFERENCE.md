# FreeMusicApi2 Lua SDK Reference

Complete API reference for the FreeMusicApi2 Lua SDK.


## FreeMusicApi2SDK

### Constructor

```lua
local sdk = require("free-music-api2_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `V1List(data)`

Create a new `V1List` entity instance. Pass `nil` for no initial data.

#### `V1Lookup(data)`

Create a new `V1Lookup` entity instance. Pass `nil` for no initial data.

#### `V1Search(data)`

Create a new `V1Search` entity instance. Pass `nil` for no initial data.

#### `V2List(data)`

Create a new `V2List` entity instance. Pass `nil` for no initial data.

#### `V2Lookup(data)`

Create a new `V2Lookup` entity instance. Pass `nil` for no initial data.

#### `V2Search(data)`

Create a new `V2Search` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## V1ListEntity

```lua
local v1_list = client:V1List(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `number` | No | Album ID |
| `idArtist` | `number` | No | Artist ID |
| `idIMVDB` | `number` | No | IMVDB ID |
| `idLyric` | `number` | No | Lyrics ID |
| `idTrack` | `number` | No | Track ID |
| `intCD` | `number` | No | CD number |
| `intDuration` | `number` | No | Track duration in milliseconds |
| `intLoved` | `number` | No | Number of loves/likes |
| `intMusicVidComments` | `number` | No | Number of music video comments |
| `intMusicVidDislikes` | `number` | No | Number of music video dislikes |
| `intMusicVidFavorites` | `number` | No | Number of music video favorites |
| `intMusicVidLikes` | `number` | No | Number of music video likes |
| `intMusicVidViews` | `number` | No | Number of music video views |
| `intScore` | `number` | No | Track score |
| `intScoreVotes` | `number` | No | Number of score votes |
| `intTotalListeners` | `number` | No | Total number of listeners |
| `intTotalPlays` | `number` | No | Total number of plays |
| `intTrackNumber` | `number` | No | Track number on album |
| `loved` | `table` | No |  |
| `strAlbum` | `string` | No | Album title |
| `strArtist` | `string` | No | Artist name |
| `strArtistAlternate` | `string` | No | Alternate artist name |
| `strDescriptionEN` | `string` | No | Video description in English |
| `strGenre` | `string` | No | Track genre |
| `strLocked` | `string` | No | Whether the record is locked |
| `strMood` | `string` | No | Track mood |
| `strMusicBrainzAlbumID` | `string` | No | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `string` | No | MusicBrainz Artist ID |
| `strMusicBrainzID` | `string` | No | MusicBrainz Recording ID |
| `strMusicVid` | `string` | No | URL to music video |
| `strMusicVidCompany` | `string` | No | Music video production company |
| `strMusicVidDirector` | `string` | No | Music video director |
| `strMusicVidScreen1` | `string` | No | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `string` | No | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `string` | No | URL to music video screenshot 3 |
| `strStyle` | `string` | No | Track style |
| `strTheme` | `string` | No | Track theme |
| `strTrack` | `string` | No | Track title |
| `strTrackLyrics` | `string` | No | Track lyrics |
| `strTrackThumb` | `string` | No | URL to track thumbnail |
| `trending` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:V1List():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1ListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V1LookupEntity

```lua
local v1_lookup = client:V1Lookup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `number` | No | Album ID |
| `idArtist` | `number` | No | Artist ID |
| `idIMVDB` | `number` | No | IMVDB ID |
| `idLabel` | `number` | No | Label ID |
| `idLyric` | `number` | No | Lyrics ID |
| `idTrack` | `number` | No | Unique track ID |
| `intBornYear` | `number` | No | Birth year of the artist |
| `intCD` | `number` | No | CD number |
| `intCharted` | `number` | No | Chart position |
| `intDiedYear` | `number` | No | Year the artist died (if applicable) |
| `intDuration` | `number` | No | Track duration in milliseconds |
| `intFormedYear` | `number` | No | Year the artist/band was formed |
| `intLoved` | `number` | No | Number of loves/likes |
| `intMembers` | `number` | No | Number of band members |
| `intMusicVidComments` | `number` | No | Number of music video comments |
| `intMusicVidDislikes` | `number` | No | Number of music video dislikes |
| `intMusicVidFavorites` | `number` | No | Number of music video favorites |
| `intMusicVidLikes` | `number` | No | Number of music video likes |
| `intMusicVidViews` | `number` | No | Number of music video views |
| `intSales` | `number` | No | Number of sales |
| `intScore` | `number` | No | Track score |
| `intScoreVotes` | `number` | No | Number of score votes |
| `intTotalListeners` | `number` | No | Total number of listeners |
| `intTotalPlays` | `number` | No | Total number of plays |
| `intTrackNumber` | `number` | No | Track number on album |
| `intYearReleased` | `number` | No | Year the album was released |
| `strAlbum` | `string` | No | Album title |
| `strAlbum3DCase` | `string` | No | URL to 3D case image |
| `strAlbum3DFace` | `string` | No | URL to 3D face image |
| `strAlbum3DFlat` | `string` | No | URL to 3D flat image |
| `strAlbum3DThumb` | `string` | No | URL to 3D thumbnail |
| `strAlbumCDart` | `string` | No | URL to CD art |
| `strAlbumSpine` | `string` | No | URL to album spine image |
| `strAlbumStripped` | `string` | No | Album title without special characters |
| `strAlbumThumb` | `string` | No | URL to album thumbnail |
| `strAlbumThumbBack` | `string` | No | URL to back of album cover |
| `strAlbumThumbHQ` | `string` | No | URL to high quality album thumbnail |
| `strAllMusicID` | `string` | No | AllMusic ID |
| `strAmazonID` | `string` | No | Amazon ID |
| `strAppleMusic` | `string` | No | Apple Music artist URL |
| `strArtist` | `string` | No | Artist name |
| `strArtistAlternate` | `string` | No | Alternate artist name |
| `strArtistBanner` | `string` | No | URL to artist banner |
| `strArtistClearart` | `string` | No | URL to artist clearart |
| `strArtistCutout` | `string` | No | URL to artist cutout image |
| `strArtistFanart` | `string` | No | URL to artist fanart |
| `strArtistFanart2` | `string` | No | URL to alternate artist fanart |
| `strArtistFanart3` | `string` | No | URL to third artist fanart |
| `strArtistFanart4` | `string` | No | URL to fourth artist fanart |
| `strArtistLogo` | `string` | No | URL to artist logo |
| `strArtistStripped` | `string` | No | Artist name without special characters |
| `strArtistThumb` | `string` | No | URL to artist thumbnail image |
| `strArtistWideThumb` | `string` | No | URL to artist wide thumbnail |
| `strBBCReviewID` | `string` | No | BBC Review ID |
| `strBiographyCN` | `string` | No | Artist biography in Chinese |
| `strBiographyDE` | `string` | No | Artist biography in German |
| `strBiographyEN` | `string` | No | Artist biography in English |
| `strBiographyES` | `string` | No | Artist biography in Spanish |
| `strBiographyFR` | `string` | No | Artist biography in French |
| `strBiographyHU` | `string` | No | Artist biography in Hungarian |
| `strBiographyIL` | `string` | No | Artist biography in Hebrew |
| `strBiographyIT` | `string` | No | Artist biography in Italian |
| `strBiographyJP` | `string` | No | Artist biography in Japanese |
| `strBiographyNL` | `string` | No | Artist biography in Dutch |
| `strBiographyNO` | `string` | No | Artist biography in Norwegian |
| `strBiographyPL` | `string` | No | Artist biography in Polish |
| `strBiographyPT` | `string` | No | Artist biography in Portuguese |
| `strBiographyRU` | `string` | No | Artist biography in Russian |
| `strBiographySE` | `string` | No | Artist biography in Swedish |
| `strCountry` | `string` | No | Country of origin |
| `strCountryCode` | `string` | No | Country code |
| `strDescriptionEN` | `string` | No | Track description in English |
| `strDisbanded` | `string` | No | Disbanded status |
| `strDiscogsID` | `string` | No | Discogs ID |
| `strFacebook` | `string` | No | Facebook page URL |
| `strGender` | `string` | No | Artist gender |
| `strGeniusID` | `string` | No | Genius ID |
| `strGenre` | `string` | No | Track genre |
| `strInstagram` | `string` | No | Instagram profile URL |
| `strItunesID` | `string` | No | iTunes ID |
| `strLabel` | `string` | No | Record label |
| `strLastFMChart` | `string` | No | Last.fm chart URL |
| `strLocation` | `string` | No | Recording location |
| `strLocked` | `string` | No | Whether the record is locked |
| `strLyricWikiID` | `string` | No | LyricWiki ID |
| `strMood` | `string` | No | Track mood |
| `strMusicBrainzAlbumID` | `string` | No | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `string` | No | MusicBrainz Artist ID |
| `strMusicBrainzID` | `string` | No | MusicBrainz Recording ID |
| `strMusicMozID` | `string` | No | MusicMoz ID |
| `strMusicVid` | `string` | No | URL to music video |
| `strMusicVidCompany` | `string` | No | Music video production company |
| `strMusicVidDirector` | `string` | No | Music video director |
| `strMusicVidScreen1` | `string` | No | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `string` | No | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `string` | No | URL to music video screenshot 3 |
| `strRateYourMusicID` | `string` | No | RateYourMusic ID |
| `strReleaseFormat` | `string` | No | Release format (CD, Vinyl, etc.) |
| `strReview` | `string` | No | Album review |
| `strSoundCloud` | `string` | No | SoundCloud profile URL |
| `strSpeed` | `string` | No | Album speed |
| `strSpotify` | `string` | No | Spotify artist URL |
| `strStyle` | `string` | No | Track style |
| `strTheme` | `string` | No | Track theme |
| `strTrack` | `string` | No | Track title |
| `strTrackLyrics` | `string` | No | Track lyrics |
| `strTrackThumb` | `string` | No | URL to track thumbnail |
| `strTwitter` | `string` | No | Twitter profile URL |
| `strWebsite` | `string` | No | Official website URL |
| `strWikidataID` | `string` | No | Wikidata ID |
| `strWikipediaID` | `string` | No | Wikipedia ID |
| `strYoutube` | `string` | No | YouTube channel URL |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:V1Lookup():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1LookupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V1SearchEntity

```lua
local v1_search = client:V1Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `number` | No | Unique album ID |
| `idArtist` | `number` | No | Artist ID |
| `idIMVDB` | `number` | No | IMVDB ID |
| `idLabel` | `number` | No | Label ID |
| `idLyric` | `number` | No | Lyrics ID |
| `idTrack` | `number` | No | Unique track ID |
| `intBornYear` | `number` | No | Birth year of the artist |
| `intCD` | `number` | No | CD number |
| `intCharted` | `number` | No | Chart position |
| `intDiedYear` | `number` | No | Year the artist died (if applicable) |
| `intDuration` | `number` | No | Track duration in milliseconds |
| `intFormedYear` | `number` | No | Year the artist/band was formed |
| `intLoved` | `number` | No | Number of loves/likes |
| `intMembers` | `number` | No | Number of band members |
| `intMusicVidComments` | `number` | No | Number of music video comments |
| `intMusicVidDislikes` | `number` | No | Number of music video dislikes |
| `intMusicVidFavorites` | `number` | No | Number of music video favorites |
| `intMusicVidLikes` | `number` | No | Number of music video likes |
| `intMusicVidViews` | `number` | No | Number of music video views |
| `intSales` | `number` | No | Number of sales |
| `intScore` | `number` | No | Album score |
| `intScoreVotes` | `number` | No | Number of score votes |
| `intTotalListeners` | `number` | No | Total number of listeners |
| `intTotalPlays` | `number` | No | Total number of plays |
| `intTrackNumber` | `number` | No | Track number on album |
| `intYearReleased` | `number` | No | Year the album was released |
| `strAlbum` | `string` | No | Album title |
| `strAlbum3DCase` | `string` | No | URL to 3D case image |
| `strAlbum3DFace` | `string` | No | URL to 3D face image |
| `strAlbum3DFlat` | `string` | No | URL to 3D flat image |
| `strAlbum3DThumb` | `string` | No | URL to 3D thumbnail |
| `strAlbumCDart` | `string` | No | URL to CD art |
| `strAlbumSpine` | `string` | No | URL to album spine image |
| `strAlbumStripped` | `string` | No | Album title without special characters |
| `strAlbumThumb` | `string` | No | URL to album thumbnail |
| `strAlbumThumbBack` | `string` | No | URL to back of album cover |
| `strAlbumThumbHQ` | `string` | No | URL to high quality album thumbnail |
| `strAllMusicID` | `string` | No | AllMusic ID |
| `strAmazonID` | `string` | No | Amazon ID |
| `strArtist` | `string` | No | Artist name |
| `strArtistAlternate` | `string` | No | Alternate artist name |
| `strArtistBanner` | `string` | No | URL to artist banner |
| `strArtistClearart` | `string` | No | URL to artist clearart |
| `strArtistCutout` | `string` | No | URL to artist cutout image |
| `strArtistFanart` | `string` | No | URL to artist fanart |
| `strArtistFanart2` | `string` | No | URL to alternate artist fanart |
| `strArtistFanart3` | `string` | No | URL to third artist fanart |
| `strArtistFanart4` | `string` | No | URL to fourth artist fanart |
| `strArtistLogo` | `string` | No | URL to artist logo |
| `strArtistStripped` | `string` | No | Artist name without special characters |
| `strArtistThumb` | `string` | No | URL to artist thumbnail image |
| `strArtistWideThumb` | `string` | No | URL to artist wide thumbnail |
| `strBBCReviewID` | `string` | No | BBC Review ID |
| `strBiographyCN` | `string` | No | Artist biography in Chinese |
| `strBiographyDE` | `string` | No | Artist biography in German |
| `strBiographyEN` | `string` | No | Artist biography in English |
| `strBiographyES` | `string` | No | Artist biography in Spanish |
| `strBiographyFR` | `string` | No | Artist biography in French |
| `strBiographyHU` | `string` | No | Artist biography in Hungarian |
| `strBiographyIL` | `string` | No | Artist biography in Hebrew |
| `strBiographyIT` | `string` | No | Artist biography in Italian |
| `strBiographyJP` | `string` | No | Artist biography in Japanese |
| `strBiographyNL` | `string` | No | Artist biography in Dutch |
| `strBiographyNO` | `string` | No | Artist biography in Norwegian |
| `strBiographyPL` | `string` | No | Artist biography in Polish |
| `strBiographyPT` | `string` | No | Artist biography in Portuguese |
| `strBiographyRU` | `string` | No | Artist biography in Russian |
| `strBiographySE` | `string` | No | Artist biography in Swedish |
| `strCountry` | `string` | No | Country of origin |
| `strCountryCode` | `string` | No | Country code |
| `strDescriptionEN` | `string` | No | Album description in English |
| `strDisbanded` | `string` | No | Disbanded status |
| `strDiscogsID` | `string` | No | Discogs ID |
| `strFacebook` | `string` | No | Facebook page URL |
| `strGender` | `string` | No | Artist gender |
| `strGeniusID` | `string` | No | Genius ID |
| `strGenre` | `string` | No | Album genre |
| `strItunesID` | `string` | No | iTunes ID |
| `strLabel` | `string` | No | Record label |
| `strLastFMChart` | `string` | No | Last.fm chart URL |
| `strLocation` | `string` | No | Recording location |
| `strLocked` | `string` | No | Whether the record is locked |
| `strLyricWikiID` | `string` | No | LyricWiki ID |
| `strMood` | `string` | No | Album mood |
| `strMusicBrainzAlbumID` | `string` | No | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `string` | No | MusicBrainz Artist ID |
| `strMusicBrainzID` | `string` | No | MusicBrainz Release Group ID |
| `strMusicMozID` | `string` | No | MusicMoz ID |
| `strMusicVid` | `string` | No | URL to music video |
| `strMusicVidCompany` | `string` | No | Music video production company |
| `strMusicVidDirector` | `string` | No | Music video director |
| `strMusicVidScreen1` | `string` | No | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `string` | No | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `string` | No | URL to music video screenshot 3 |
| `strRateYourMusicID` | `string` | No | RateYourMusic ID |
| `strReleaseFormat` | `string` | No | Release format (CD, Vinyl, etc.) |
| `strReview` | `string` | No | Album review |
| `strSpeed` | `string` | No | Album speed |
| `strStyle` | `string` | No | Album style |
| `strTheme` | `string` | No | Album theme |
| `strTrack` | `string` | No | Track title |
| `strTrackLyrics` | `string` | No | Track lyrics |
| `strTrackThumb` | `string` | No | URL to track thumbnail |
| `strTwitter` | `string` | No | Twitter profile URL |
| `strWebsite` | `string` | No | Official website URL |
| `strWikidataID` | `string` | No | Wikidata ID |
| `strWikipediaID` | `string` | No | Wikipedia ID |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:V1Search():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V2ListEntity

```lua
local v2_list = client:V2List(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:V2List():load({ artist_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2ListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V2LookupEntity

```lua
local v2_lookup = client:V2Lookup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `table` | No |  |
| `artists` | `table` | No |  |
| `tracks` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:V2Lookup():load({ album_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2LookupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V2SearchEntity

```lua
local v2_search = client:V2Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `table` | No |  |
| `artists` | `table` | No |  |
| `tracks` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:V2Search():load({ album_name = "album_name" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
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

