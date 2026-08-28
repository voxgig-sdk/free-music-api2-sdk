# FreeMusicApi2 Ruby SDK Reference

Complete API reference for the FreeMusicApi2 Ruby SDK.


## FreeMusicApi2SDK

### Constructor

```ruby
require_relative 'FreeMusicApi2_sdk'

client = FreeMusicApi2SDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FreeMusicApi2SDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = FreeMusicApi2SDK.test
```


### Instance Methods

#### `V1List(data = nil)`

Create a new `V1List` entity instance. Pass `nil` for no initial data.

#### `V1Lookup(data = nil)`

Create a new `V1Lookup` entity instance. Pass `nil` for no initial data.

#### `V1Search(data = nil)`

Create a new `V1Search` entity instance. Pass `nil` for no initial data.

#### `V2List(data = nil)`

Create a new `V2List` entity instance. Pass `nil` for no initial data.

#### `V2Lookup(data = nil)`

Create a new `V2Lookup` entity instance. Pass `nil` for no initial data.

#### `V2Search(data = nil)`

Create a new `V2Search` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## V1ListEntity

```ruby
v1_list = client.V1List
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `Integer` | No | Album ID |
| `idArtist` | `Integer` | No | Artist ID |
| `idIMVDB` | `Integer` | No | IMVDB ID |
| `idLyric` | `Integer` | No | Lyrics ID |
| `idTrack` | `Integer` | No | Track ID |
| `intCD` | `Integer` | No | CD number |
| `intDuration` | `Integer` | No | Track duration in milliseconds |
| `intLoved` | `Integer` | No | Number of loves/likes |
| `intMusicVidComments` | `Integer` | No | Number of music video comments |
| `intMusicVidDislikes` | `Integer` | No | Number of music video dislikes |
| `intMusicVidFavorites` | `Integer` | No | Number of music video favorites |
| `intMusicVidLikes` | `Integer` | No | Number of music video likes |
| `intMusicVidViews` | `Integer` | No | Number of music video views |
| `intScore` | `Integer` | No | Track score |
| `intScoreVotes` | `Integer` | No | Number of score votes |
| `intTotalListeners` | `Integer` | No | Total number of listeners |
| `intTotalPlays` | `Integer` | No | Total number of plays |
| `intTrackNumber` | `Integer` | No | Track number on album |
| `loved` | `Array` | No |  |
| `strAlbum` | `String` | No | Album title |
| `strArtist` | `String` | No | Artist name |
| `strArtistAlternate` | `String` | No | Alternate artist name |
| `strDescriptionEN` | `String` | No | Video description in English |
| `strGenre` | `String` | No | Track genre |
| `strLocked` | `String` | No | Whether the record is locked |
| `strMood` | `String` | No | Track mood |
| `strMusicBrainzAlbumID` | `String` | No | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `String` | No | MusicBrainz Artist ID |
| `strMusicBrainzID` | `String` | No | MusicBrainz Recording ID |
| `strMusicVid` | `String` | No | URL to music video |
| `strMusicVidCompany` | `String` | No | Music video production company |
| `strMusicVidDirector` | `String` | No | Music video director |
| `strMusicVidScreen1` | `String` | No | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `String` | No | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `String` | No | URL to music video screenshot 3 |
| `strStyle` | `String` | No | Track style |
| `strTheme` | `String` | No | Track theme |
| `strTrack` | `String` | No | Track title |
| `strTrackLyrics` | `String` | No | Track lyrics |
| `strTrackThumb` | `String` | No | URL to track thumbnail |
| `trending` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.V1List.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V1ListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V1LookupEntity

```ruby
v1_lookup = client.V1Lookup
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `Integer` | No | Album ID |
| `idArtist` | `Integer` | No | Artist ID |
| `idIMVDB` | `Integer` | No | IMVDB ID |
| `idLabel` | `Integer` | No | Label ID |
| `idLyric` | `Integer` | No | Lyrics ID |
| `idTrack` | `Integer` | No | Unique track ID |
| `intBornYear` | `Integer` | No | Birth year of the artist |
| `intCD` | `Integer` | No | CD number |
| `intCharted` | `Integer` | No | Chart position |
| `intDiedYear` | `Integer` | No | Year the artist died (if applicable) |
| `intDuration` | `Integer` | No | Track duration in milliseconds |
| `intFormedYear` | `Integer` | No | Year the artist/band was formed |
| `intLoved` | `Integer` | No | Number of loves/likes |
| `intMembers` | `Integer` | No | Number of band members |
| `intMusicVidComments` | `Integer` | No | Number of music video comments |
| `intMusicVidDislikes` | `Integer` | No | Number of music video dislikes |
| `intMusicVidFavorites` | `Integer` | No | Number of music video favorites |
| `intMusicVidLikes` | `Integer` | No | Number of music video likes |
| `intMusicVidViews` | `Integer` | No | Number of music video views |
| `intSales` | `Integer` | No | Number of sales |
| `intScore` | `Integer` | No | Track score |
| `intScoreVotes` | `Integer` | No | Number of score votes |
| `intTotalListeners` | `Integer` | No | Total number of listeners |
| `intTotalPlays` | `Integer` | No | Total number of plays |
| `intTrackNumber` | `Integer` | No | Track number on album |
| `intYearReleased` | `Integer` | No | Year the album was released |
| `strAlbum` | `String` | No | Album title |
| `strAlbum3DCase` | `String` | No | URL to 3D case image |
| `strAlbum3DFace` | `String` | No | URL to 3D face image |
| `strAlbum3DFlat` | `String` | No | URL to 3D flat image |
| `strAlbum3DThumb` | `String` | No | URL to 3D thumbnail |
| `strAlbumCDart` | `String` | No | URL to CD art |
| `strAlbumSpine` | `String` | No | URL to album spine image |
| `strAlbumStripped` | `String` | No | Album title without special characters |
| `strAlbumThumb` | `String` | No | URL to album thumbnail |
| `strAlbumThumbBack` | `String` | No | URL to back of album cover |
| `strAlbumThumbHQ` | `String` | No | URL to high quality album thumbnail |
| `strAllMusicID` | `String` | No | AllMusic ID |
| `strAmazonID` | `String` | No | Amazon ID |
| `strAppleMusic` | `String` | No | Apple Music artist URL |
| `strArtist` | `String` | No | Artist name |
| `strArtistAlternate` | `String` | No | Alternate artist name |
| `strArtistBanner` | `String` | No | URL to artist banner |
| `strArtistClearart` | `String` | No | URL to artist clearart |
| `strArtistCutout` | `String` | No | URL to artist cutout image |
| `strArtistFanart` | `String` | No | URL to artist fanart |
| `strArtistFanart2` | `String` | No | URL to alternate artist fanart |
| `strArtistFanart3` | `String` | No | URL to third artist fanart |
| `strArtistFanart4` | `String` | No | URL to fourth artist fanart |
| `strArtistLogo` | `String` | No | URL to artist logo |
| `strArtistStripped` | `String` | No | Artist name without special characters |
| `strArtistThumb` | `String` | No | URL to artist thumbnail image |
| `strArtistWideThumb` | `String` | No | URL to artist wide thumbnail |
| `strBBCReviewID` | `String` | No | BBC Review ID |
| `strBiographyCN` | `String` | No | Artist biography in Chinese |
| `strBiographyDE` | `String` | No | Artist biography in German |
| `strBiographyEN` | `String` | No | Artist biography in English |
| `strBiographyES` | `String` | No | Artist biography in Spanish |
| `strBiographyFR` | `String` | No | Artist biography in French |
| `strBiographyHU` | `String` | No | Artist biography in Hungarian |
| `strBiographyIL` | `String` | No | Artist biography in Hebrew |
| `strBiographyIT` | `String` | No | Artist biography in Italian |
| `strBiographyJP` | `String` | No | Artist biography in Japanese |
| `strBiographyNL` | `String` | No | Artist biography in Dutch |
| `strBiographyNO` | `String` | No | Artist biography in Norwegian |
| `strBiographyPL` | `String` | No | Artist biography in Polish |
| `strBiographyPT` | `String` | No | Artist biography in Portuguese |
| `strBiographyRU` | `String` | No | Artist biography in Russian |
| `strBiographySE` | `String` | No | Artist biography in Swedish |
| `strCountry` | `String` | No | Country of origin |
| `strCountryCode` | `String` | No | Country code |
| `strDescriptionEN` | `String` | No | Track description in English |
| `strDisbanded` | `String` | No | Disbanded status |
| `strDiscogsID` | `String` | No | Discogs ID |
| `strFacebook` | `String` | No | Facebook page URL |
| `strGender` | `String` | No | Artist gender |
| `strGeniusID` | `String` | No | Genius ID |
| `strGenre` | `String` | No | Track genre |
| `strInstagram` | `String` | No | Instagram profile URL |
| `strItunesID` | `String` | No | iTunes ID |
| `strLabel` | `String` | No | Record label |
| `strLastFMChart` | `String` | No | Last.fm chart URL |
| `strLocation` | `String` | No | Recording location |
| `strLocked` | `String` | No | Whether the record is locked |
| `strLyricWikiID` | `String` | No | LyricWiki ID |
| `strMood` | `String` | No | Track mood |
| `strMusicBrainzAlbumID` | `String` | No | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `String` | No | MusicBrainz Artist ID |
| `strMusicBrainzID` | `String` | No | MusicBrainz Recording ID |
| `strMusicMozID` | `String` | No | MusicMoz ID |
| `strMusicVid` | `String` | No | URL to music video |
| `strMusicVidCompany` | `String` | No | Music video production company |
| `strMusicVidDirector` | `String` | No | Music video director |
| `strMusicVidScreen1` | `String` | No | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `String` | No | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `String` | No | URL to music video screenshot 3 |
| `strRateYourMusicID` | `String` | No | RateYourMusic ID |
| `strReleaseFormat` | `String` | No | Release format (CD, Vinyl, etc.) |
| `strReview` | `String` | No | Album review |
| `strSoundCloud` | `String` | No | SoundCloud profile URL |
| `strSpeed` | `String` | No | Album speed |
| `strSpotify` | `String` | No | Spotify artist URL |
| `strStyle` | `String` | No | Track style |
| `strTheme` | `String` | No | Track theme |
| `strTrack` | `String` | No | Track title |
| `strTrackLyrics` | `String` | No | Track lyrics |
| `strTrackThumb` | `String` | No | URL to track thumbnail |
| `strTwitter` | `String` | No | Twitter profile URL |
| `strWebsite` | `String` | No | Official website URL |
| `strWikidataID` | `String` | No | Wikidata ID |
| `strWikipediaID` | `String` | No | Wikipedia ID |
| `strYoutube` | `String` | No | YouTube channel URL |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.V1Lookup.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V1LookupEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V1SearchEntity

```ruby
v1_search = client.V1Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `idAlbum` | `Integer` | No | Unique album ID |
| `idArtist` | `Integer` | No | Artist ID |
| `idIMVDB` | `Integer` | No | IMVDB ID |
| `idLabel` | `Integer` | No | Label ID |
| `idLyric` | `Integer` | No | Lyrics ID |
| `idTrack` | `Integer` | No | Unique track ID |
| `intBornYear` | `Integer` | No | Birth year of the artist |
| `intCD` | `Integer` | No | CD number |
| `intCharted` | `Integer` | No | Chart position |
| `intDiedYear` | `Integer` | No | Year the artist died (if applicable) |
| `intDuration` | `Integer` | No | Track duration in milliseconds |
| `intFormedYear` | `Integer` | No | Year the artist/band was formed |
| `intLoved` | `Integer` | No | Number of loves/likes |
| `intMembers` | `Integer` | No | Number of band members |
| `intMusicVidComments` | `Integer` | No | Number of music video comments |
| `intMusicVidDislikes` | `Integer` | No | Number of music video dislikes |
| `intMusicVidFavorites` | `Integer` | No | Number of music video favorites |
| `intMusicVidLikes` | `Integer` | No | Number of music video likes |
| `intMusicVidViews` | `Integer` | No | Number of music video views |
| `intSales` | `Integer` | No | Number of sales |
| `intScore` | `Integer` | No | Album score |
| `intScoreVotes` | `Integer` | No | Number of score votes |
| `intTotalListeners` | `Integer` | No | Total number of listeners |
| `intTotalPlays` | `Integer` | No | Total number of plays |
| `intTrackNumber` | `Integer` | No | Track number on album |
| `intYearReleased` | `Integer` | No | Year the album was released |
| `strAlbum` | `String` | No | Album title |
| `strAlbum3DCase` | `String` | No | URL to 3D case image |
| `strAlbum3DFace` | `String` | No | URL to 3D face image |
| `strAlbum3DFlat` | `String` | No | URL to 3D flat image |
| `strAlbum3DThumb` | `String` | No | URL to 3D thumbnail |
| `strAlbumCDart` | `String` | No | URL to CD art |
| `strAlbumSpine` | `String` | No | URL to album spine image |
| `strAlbumStripped` | `String` | No | Album title without special characters |
| `strAlbumThumb` | `String` | No | URL to album thumbnail |
| `strAlbumThumbBack` | `String` | No | URL to back of album cover |
| `strAlbumThumbHQ` | `String` | No | URL to high quality album thumbnail |
| `strAllMusicID` | `String` | No | AllMusic ID |
| `strAmazonID` | `String` | No | Amazon ID |
| `strArtist` | `String` | No | Artist name |
| `strArtistAlternate` | `String` | No | Alternate artist name |
| `strArtistBanner` | `String` | No | URL to artist banner |
| `strArtistClearart` | `String` | No | URL to artist clearart |
| `strArtistCutout` | `String` | No | URL to artist cutout image |
| `strArtistFanart` | `String` | No | URL to artist fanart |
| `strArtistFanart2` | `String` | No | URL to alternate artist fanart |
| `strArtistFanart3` | `String` | No | URL to third artist fanart |
| `strArtistFanart4` | `String` | No | URL to fourth artist fanart |
| `strArtistLogo` | `String` | No | URL to artist logo |
| `strArtistStripped` | `String` | No | Artist name without special characters |
| `strArtistThumb` | `String` | No | URL to artist thumbnail image |
| `strArtistWideThumb` | `String` | No | URL to artist wide thumbnail |
| `strBBCReviewID` | `String` | No | BBC Review ID |
| `strBiographyCN` | `String` | No | Artist biography in Chinese |
| `strBiographyDE` | `String` | No | Artist biography in German |
| `strBiographyEN` | `String` | No | Artist biography in English |
| `strBiographyES` | `String` | No | Artist biography in Spanish |
| `strBiographyFR` | `String` | No | Artist biography in French |
| `strBiographyHU` | `String` | No | Artist biography in Hungarian |
| `strBiographyIL` | `String` | No | Artist biography in Hebrew |
| `strBiographyIT` | `String` | No | Artist biography in Italian |
| `strBiographyJP` | `String` | No | Artist biography in Japanese |
| `strBiographyNL` | `String` | No | Artist biography in Dutch |
| `strBiographyNO` | `String` | No | Artist biography in Norwegian |
| `strBiographyPL` | `String` | No | Artist biography in Polish |
| `strBiographyPT` | `String` | No | Artist biography in Portuguese |
| `strBiographyRU` | `String` | No | Artist biography in Russian |
| `strBiographySE` | `String` | No | Artist biography in Swedish |
| `strCountry` | `String` | No | Country of origin |
| `strCountryCode` | `String` | No | Country code |
| `strDescriptionEN` | `String` | No | Album description in English |
| `strDisbanded` | `String` | No | Disbanded status |
| `strDiscogsID` | `String` | No | Discogs ID |
| `strFacebook` | `String` | No | Facebook page URL |
| `strGender` | `String` | No | Artist gender |
| `strGeniusID` | `String` | No | Genius ID |
| `strGenre` | `String` | No | Album genre |
| `strItunesID` | `String` | No | iTunes ID |
| `strLabel` | `String` | No | Record label |
| `strLastFMChart` | `String` | No | Last.fm chart URL |
| `strLocation` | `String` | No | Recording location |
| `strLocked` | `String` | No | Whether the record is locked |
| `strLyricWikiID` | `String` | No | LyricWiki ID |
| `strMood` | `String` | No | Album mood |
| `strMusicBrainzAlbumID` | `String` | No | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `String` | No | MusicBrainz Artist ID |
| `strMusicBrainzID` | `String` | No | MusicBrainz Release Group ID |
| `strMusicMozID` | `String` | No | MusicMoz ID |
| `strMusicVid` | `String` | No | URL to music video |
| `strMusicVidCompany` | `String` | No | Music video production company |
| `strMusicVidDirector` | `String` | No | Music video director |
| `strMusicVidScreen1` | `String` | No | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `String` | No | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `String` | No | URL to music video screenshot 3 |
| `strRateYourMusicID` | `String` | No | RateYourMusic ID |
| `strReleaseFormat` | `String` | No | Release format (CD, Vinyl, etc.) |
| `strReview` | `String` | No | Album review |
| `strSpeed` | `String` | No | Album speed |
| `strStyle` | `String` | No | Album style |
| `strTheme` | `String` | No | Album theme |
| `strTrack` | `String` | No | Track title |
| `strTrackLyrics` | `String` | No | Track lyrics |
| `strTrackThumb` | `String` | No | URL to track thumbnail |
| `strTwitter` | `String` | No | Twitter profile URL |
| `strWebsite` | `String` | No | Official website URL |
| `strWikidataID` | `String` | No | Wikidata ID |
| `strWikipediaID` | `String` | No | Wikipedia ID |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.V1Search.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V1SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V2ListEntity

```ruby
v2_list = client.V2List
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V2List.load({ "artist_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V2ListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V2LookupEntity

```ruby
v2_lookup = client.V2Lookup
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `Array` | No |  |
| `artists` | `Array` | No |  |
| `tracks` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V2Lookup.load({ "album_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V2LookupEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V2SearchEntity

```ruby
v2_search = client.V2Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `Array` | No |  |
| `artists` | `Array` | No |  |
| `tracks` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V2Search.load({ "album_name" => "album_name" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V2SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = FreeMusicApi2SDK.new({
  "feature" => {
    "test" => { "active" => true },
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

