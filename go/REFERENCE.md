# FreeMusicApi2 Golang SDK Reference

Complete API reference for the FreeMusicApi2 Golang SDK.


## FreeMusicApi2SDK

### Constructor

```go
func NewFreeMusicApi2SDK(options map[string]any) *FreeMusicApi2SDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *FreeMusicApi2SDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *FreeMusicApi2SDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `V1List(data map[string]any) FreeMusicApi2Entity`

Create a new `V1List` entity instance. Pass `nil` for no initial data.

#### `V1Lookup(data map[string]any) FreeMusicApi2Entity`

Create a new `V1Lookup` entity instance. Pass `nil` for no initial data.

#### `V1Search(data map[string]any) FreeMusicApi2Entity`

Create a new `V1Search` entity instance. Pass `nil` for no initial data.

#### `V2List(data map[string]any) FreeMusicApi2Entity`

Create a new `V2List` entity instance. Pass `nil` for no initial data.

#### `V2Lookup(data map[string]any) FreeMusicApi2Entity`

Create a new `V2Lookup` entity instance. Pass `nil` for no initial data.

#### `V2Search(data map[string]any) FreeMusicApi2Entity`

Create a new `V2Search` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## V1ListEntity

```go
v1List := client.V1List(nil)
fmt.Println(v1List.GetName()) // "v1_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `int` | No |  |
| `idArtist` | `int` | No |  |
| `idIMVDB` | `int` | No |  |
| `idLyric` | `int` | No |  |
| `idTrack` | `int` | No |  |
| `intCD` | `int` | No |  |
| `intDuration` | `int` | No |  |
| `intLoved` | `int` | No |  |
| `intMusicVidComments` | `int` | No |  |
| `intMusicVidDislikes` | `int` | No |  |
| `intMusicVidFavorites` | `int` | No |  |
| `intMusicVidLikes` | `int` | No |  |
| `intMusicVidViews` | `int` | No |  |
| `intScore` | `int` | No |  |
| `intScoreVotes` | `int` | No |  |
| `intTotalListeners` | `int` | No |  |
| `intTotalPlays` | `int` | No |  |
| `intTrackNumber` | `int` | No |  |
| `loved` | `[]any` | No |  |
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
| `trending` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V1List(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V1ListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V1LookupEntity

```go
v1Lookup := client.V1Lookup(nil)
fmt.Println(v1Lookup.GetName()) // "v1_lookup"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `int` | No |  |
| `idArtist` | `int` | No |  |
| `idIMVDB` | `int` | No |  |
| `idLabel` | `int` | No |  |
| `idLyric` | `int` | No |  |
| `idTrack` | `int` | No |  |
| `intBornYear` | `int` | No |  |
| `intCD` | `int` | No |  |
| `intCharted` | `int` | No |  |
| `intDiedYear` | `int` | No |  |
| `intDuration` | `int` | No |  |
| `intFormedYear` | `int` | No |  |
| `intLoved` | `int` | No |  |
| `intMembers` | `int` | No |  |
| `intMusicVidComments` | `int` | No |  |
| `intMusicVidDislikes` | `int` | No |  |
| `intMusicVidFavorites` | `int` | No |  |
| `intMusicVidLikes` | `int` | No |  |
| `intMusicVidViews` | `int` | No |  |
| `intSales` | `int` | No |  |
| `intScore` | `int` | No |  |
| `intScoreVotes` | `int` | No |  |
| `intTotalListeners` | `int` | No |  |
| `intTotalPlays` | `int` | No |  |
| `intTrackNumber` | `int` | No |  |
| `intYearReleased` | `int` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V1Lookup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V1LookupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V1SearchEntity

```go
v1Search := client.V1Search(nil)
fmt.Println(v1Search.GetName()) // "v1_search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `int` | No |  |
| `idArtist` | `int` | No |  |
| `idIMVDB` | `int` | No |  |
| `idLabel` | `int` | No |  |
| `idLyric` | `int` | No |  |
| `idTrack` | `int` | No |  |
| `intBornYear` | `int` | No |  |
| `intCD` | `int` | No |  |
| `intCharted` | `int` | No |  |
| `intDiedYear` | `int` | No |  |
| `intDuration` | `int` | No |  |
| `intFormedYear` | `int` | No |  |
| `intLoved` | `int` | No |  |
| `intMembers` | `int` | No |  |
| `intMusicVidComments` | `int` | No |  |
| `intMusicVidDislikes` | `int` | No |  |
| `intMusicVidFavorites` | `int` | No |  |
| `intMusicVidLikes` | `int` | No |  |
| `intMusicVidViews` | `int` | No |  |
| `intSales` | `int` | No |  |
| `intScore` | `int` | No |  |
| `intScoreVotes` | `int` | No |  |
| `intTotalListeners` | `int` | No |  |
| `intTotalPlays` | `int` | No |  |
| `intTrackNumber` | `int` | No |  |
| `intYearReleased` | `int` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V1Search(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V1SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V2ListEntity

```go
v2List := client.V2List(nil)
fmt.Println(v2List.GetName()) // "v2_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V2List(nil).Load(map[string]any{"artist_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V2ListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V2LookupEntity

```go
v2Lookup := client.V2Lookup(nil)
fmt.Println(v2Lookup.GetName()) // "v2_lookup"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `[]any` | No |  |
| `artists` | `[]any` | No |  |
| `tracks` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V2Lookup(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V2LookupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V2SearchEntity

```go
v2Search := client.V2Search(nil)
fmt.Println(v2Search.GetName()) // "v2_search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `[]any` | No |  |
| `artists` | `[]any` | No |  |
| `tracks` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V2Search(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V2SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewFreeMusicApi2SDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

