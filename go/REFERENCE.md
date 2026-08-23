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
| `loved` | `[]any` | No |  |
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
result, err := client.V2Lookup(nil).Load(map[string]any{"album_id": 1}, nil)
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
result, err := client.V2Search(nil).Load(map[string]any{"album_name": "album_name"}, nil)
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

