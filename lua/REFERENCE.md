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
| `idAlbum` | `number` | No |  |
| `idArtist` | `number` | No |  |
| `idIMVDB` | `number` | No |  |
| `idLyric` | `number` | No |  |
| `idTrack` | `number` | No |  |
| `intCD` | `number` | No |  |
| `intDuration` | `number` | No |  |
| `intLoved` | `number` | No |  |
| `intMusicVidComments` | `number` | No |  |
| `intMusicVidDislikes` | `number` | No |  |
| `intMusicVidFavorites` | `number` | No |  |
| `intMusicVidLikes` | `number` | No |  |
| `intMusicVidViews` | `number` | No |  |
| `intScore` | `number` | No |  |
| `intScoreVotes` | `number` | No |  |
| `intTotalListeners` | `number` | No |  |
| `intTotalPlays` | `number` | No |  |
| `intTrackNumber` | `number` | No |  |
| `loved` | `table` | No |  |
| `strAlbum` | `string` | No |  |
| `strArtist` | `string` | No |  |
| `strArtistAlternate` | `string` | No |  |
| `strDescriptionEN` | `string` | No |  |
| `strGenre` | `string` | No |  |
| `strLocked` | `string` | No |  |
| `strMood` | `string` | No |  |
| `strMusicBrainzAlbumID` | `string` | No |  |
| `strMusicBrainzArtistID` | `string` | No |  |
| `strMusicBrainzID` | `string` | No |  |
| `strMusicVid` | `string` | No |  |
| `strMusicVidCompany` | `string` | No |  |
| `strMusicVidDirector` | `string` | No |  |
| `strMusicVidScreen1` | `string` | No |  |
| `strMusicVidScreen2` | `string` | No |  |
| `strMusicVidScreen3` | `string` | No |  |
| `strStyle` | `string` | No |  |
| `strTheme` | `string` | No |  |
| `strTrack` | `string` | No |  |
| `strTrackLyrics` | `string` | No |  |
| `strTrackThumb` | `string` | No |  |
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
| `idAlbum` | `number` | No |  |
| `idArtist` | `number` | No |  |
| `idIMVDB` | `number` | No |  |
| `idLabel` | `number` | No |  |
| `idLyric` | `number` | No |  |
| `idTrack` | `number` | No |  |
| `intBornYear` | `number` | No |  |
| `intCD` | `number` | No |  |
| `intCharted` | `number` | No |  |
| `intDiedYear` | `number` | No |  |
| `intDuration` | `number` | No |  |
| `intFormedYear` | `number` | No |  |
| `intLoved` | `number` | No |  |
| `intMembers` | `number` | No |  |
| `intMusicVidComments` | `number` | No |  |
| `intMusicVidDislikes` | `number` | No |  |
| `intMusicVidFavorites` | `number` | No |  |
| `intMusicVidLikes` | `number` | No |  |
| `intMusicVidViews` | `number` | No |  |
| `intSales` | `number` | No |  |
| `intScore` | `number` | No |  |
| `intScoreVotes` | `number` | No |  |
| `intTotalListeners` | `number` | No |  |
| `intTotalPlays` | `number` | No |  |
| `intTrackNumber` | `number` | No |  |
| `intYearReleased` | `number` | No |  |
| `strAlbum` | `string` | No |  |
| `strAlbum3DCase` | `string` | No |  |
| `strAlbum3DFace` | `string` | No |  |
| `strAlbum3DFlat` | `string` | No |  |
| `strAlbum3DThumb` | `string` | No |  |
| `strAlbumCDart` | `string` | No |  |
| `strAlbumSpine` | `string` | No |  |
| `strAlbumStripped` | `string` | No |  |
| `strAlbumThumb` | `string` | No |  |
| `strAlbumThumbBack` | `string` | No |  |
| `strAlbumThumbHQ` | `string` | No |  |
| `strAllMusicID` | `string` | No |  |
| `strAmazonID` | `string` | No |  |
| `strAppleMusic` | `string` | No |  |
| `strArtist` | `string` | No |  |
| `strArtistAlternate` | `string` | No |  |
| `strArtistBanner` | `string` | No |  |
| `strArtistClearart` | `string` | No |  |
| `strArtistCutout` | `string` | No |  |
| `strArtistFanart` | `string` | No |  |
| `strArtistFanart2` | `string` | No |  |
| `strArtistFanart3` | `string` | No |  |
| `strArtistFanart4` | `string` | No |  |
| `strArtistLogo` | `string` | No |  |
| `strArtistStripped` | `string` | No |  |
| `strArtistThumb` | `string` | No |  |
| `strArtistWideThumb` | `string` | No |  |
| `strBBCReviewID` | `string` | No |  |
| `strBiographyCN` | `string` | No |  |
| `strBiographyDE` | `string` | No |  |
| `strBiographyEN` | `string` | No |  |
| `strBiographyES` | `string` | No |  |
| `strBiographyFR` | `string` | No |  |
| `strBiographyHU` | `string` | No |  |
| `strBiographyIL` | `string` | No |  |
| `strBiographyIT` | `string` | No |  |
| `strBiographyJP` | `string` | No |  |
| `strBiographyNL` | `string` | No |  |
| `strBiographyNO` | `string` | No |  |
| `strBiographyPL` | `string` | No |  |
| `strBiographyPT` | `string` | No |  |
| `strBiographyRU` | `string` | No |  |
| `strBiographySE` | `string` | No |  |
| `strCountry` | `string` | No |  |
| `strCountryCode` | `string` | No |  |
| `strDescriptionEN` | `string` | No |  |
| `strDisbanded` | `string` | No |  |
| `strDiscogsID` | `string` | No |  |
| `strFacebook` | `string` | No |  |
| `strGender` | `string` | No |  |
| `strGeniusID` | `string` | No |  |
| `strGenre` | `string` | No |  |
| `strInstagram` | `string` | No |  |
| `strItunesID` | `string` | No |  |
| `strLabel` | `string` | No |  |
| `strLastFMChart` | `string` | No |  |
| `strLocation` | `string` | No |  |
| `strLocked` | `string` | No |  |
| `strLyricWikiID` | `string` | No |  |
| `strMood` | `string` | No |  |
| `strMusicBrainzAlbumID` | `string` | No |  |
| `strMusicBrainzArtistID` | `string` | No |  |
| `strMusicBrainzID` | `string` | No |  |
| `strMusicMozID` | `string` | No |  |
| `strMusicVid` | `string` | No |  |
| `strMusicVidCompany` | `string` | No |  |
| `strMusicVidDirector` | `string` | No |  |
| `strMusicVidScreen1` | `string` | No |  |
| `strMusicVidScreen2` | `string` | No |  |
| `strMusicVidScreen3` | `string` | No |  |
| `strRateYourMusicID` | `string` | No |  |
| `strReleaseFormat` | `string` | No |  |
| `strReview` | `string` | No |  |
| `strSoundCloud` | `string` | No |  |
| `strSpeed` | `string` | No |  |
| `strSpotify` | `string` | No |  |
| `strStyle` | `string` | No |  |
| `strTheme` | `string` | No |  |
| `strTrack` | `string` | No |  |
| `strTrackLyrics` | `string` | No |  |
| `strTrackThumb` | `string` | No |  |
| `strTwitter` | `string` | No |  |
| `strWebsite` | `string` | No |  |
| `strWikidataID` | `string` | No |  |
| `strWikipediaID` | `string` | No |  |
| `strYoutube` | `string` | No |  |

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
| `idAlbum` | `number` | No |  |
| `idArtist` | `number` | No |  |
| `idIMVDB` | `number` | No |  |
| `idLabel` | `number` | No |  |
| `idLyric` | `number` | No |  |
| `idTrack` | `number` | No |  |
| `intBornYear` | `number` | No |  |
| `intCD` | `number` | No |  |
| `intCharted` | `number` | No |  |
| `intDiedYear` | `number` | No |  |
| `intDuration` | `number` | No |  |
| `intFormedYear` | `number` | No |  |
| `intLoved` | `number` | No |  |
| `intMembers` | `number` | No |  |
| `intMusicVidComments` | `number` | No |  |
| `intMusicVidDislikes` | `number` | No |  |
| `intMusicVidFavorites` | `number` | No |  |
| `intMusicVidLikes` | `number` | No |  |
| `intMusicVidViews` | `number` | No |  |
| `intSales` | `number` | No |  |
| `intScore` | `number` | No |  |
| `intScoreVotes` | `number` | No |  |
| `intTotalListeners` | `number` | No |  |
| `intTotalPlays` | `number` | No |  |
| `intTrackNumber` | `number` | No |  |
| `intYearReleased` | `number` | No |  |
| `strAlbum` | `string` | No |  |
| `strAlbum3DCase` | `string` | No |  |
| `strAlbum3DFace` | `string` | No |  |
| `strAlbum3DFlat` | `string` | No |  |
| `strAlbum3DThumb` | `string` | No |  |
| `strAlbumCDart` | `string` | No |  |
| `strAlbumSpine` | `string` | No |  |
| `strAlbumStripped` | `string` | No |  |
| `strAlbumThumb` | `string` | No |  |
| `strAlbumThumbBack` | `string` | No |  |
| `strAlbumThumbHQ` | `string` | No |  |
| `strAllMusicID` | `string` | No |  |
| `strAmazonID` | `string` | No |  |
| `strArtist` | `string` | No |  |
| `strArtistAlternate` | `string` | No |  |
| `strArtistBanner` | `string` | No |  |
| `strArtistClearart` | `string` | No |  |
| `strArtistCutout` | `string` | No |  |
| `strArtistFanart` | `string` | No |  |
| `strArtistFanart2` | `string` | No |  |
| `strArtistFanart3` | `string` | No |  |
| `strArtistFanart4` | `string` | No |  |
| `strArtistLogo` | `string` | No |  |
| `strArtistStripped` | `string` | No |  |
| `strArtistThumb` | `string` | No |  |
| `strArtistWideThumb` | `string` | No |  |
| `strBBCReviewID` | `string` | No |  |
| `strBiographyCN` | `string` | No |  |
| `strBiographyDE` | `string` | No |  |
| `strBiographyEN` | `string` | No |  |
| `strBiographyES` | `string` | No |  |
| `strBiographyFR` | `string` | No |  |
| `strBiographyHU` | `string` | No |  |
| `strBiographyIL` | `string` | No |  |
| `strBiographyIT` | `string` | No |  |
| `strBiographyJP` | `string` | No |  |
| `strBiographyNL` | `string` | No |  |
| `strBiographyNO` | `string` | No |  |
| `strBiographyPL` | `string` | No |  |
| `strBiographyPT` | `string` | No |  |
| `strBiographyRU` | `string` | No |  |
| `strBiographySE` | `string` | No |  |
| `strCountry` | `string` | No |  |
| `strCountryCode` | `string` | No |  |
| `strDescriptionEN` | `string` | No |  |
| `strDisbanded` | `string` | No |  |
| `strDiscogsID` | `string` | No |  |
| `strFacebook` | `string` | No |  |
| `strGender` | `string` | No |  |
| `strGeniusID` | `string` | No |  |
| `strGenre` | `string` | No |  |
| `strItunesID` | `string` | No |  |
| `strLabel` | `string` | No |  |
| `strLastFMChart` | `string` | No |  |
| `strLocation` | `string` | No |  |
| `strLocked` | `string` | No |  |
| `strLyricWikiID` | `string` | No |  |
| `strMood` | `string` | No |  |
| `strMusicBrainzAlbumID` | `string` | No |  |
| `strMusicBrainzArtistID` | `string` | No |  |
| `strMusicBrainzID` | `string` | No |  |
| `strMusicMozID` | `string` | No |  |
| `strMusicVid` | `string` | No |  |
| `strMusicVidCompany` | `string` | No |  |
| `strMusicVidDirector` | `string` | No |  |
| `strMusicVidScreen1` | `string` | No |  |
| `strMusicVidScreen2` | `string` | No |  |
| `strMusicVidScreen3` | `string` | No |  |
| `strRateYourMusicID` | `string` | No |  |
| `strReleaseFormat` | `string` | No |  |
| `strReview` | `string` | No |  |
| `strSpeed` | `string` | No |  |
| `strStyle` | `string` | No |  |
| `strTheme` | `string` | No |  |
| `strTrack` | `string` | No |  |
| `strTrackLyrics` | `string` | No |  |
| `strTrackThumb` | `string` | No |  |
| `strTwitter` | `string` | No |  |
| `strWebsite` | `string` | No |  |
| `strWikidataID` | `string` | No |  |
| `strWikipediaID` | `string` | No |  |

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
local result, err = client:V2Lookup():load()
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
local result, err = client:V2Search():load()
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

