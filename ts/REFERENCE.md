# FreeMusicApi2 TypeScript SDK Reference

Complete API reference for the FreeMusicApi2 TypeScript SDK.


## FreeMusicApi2SDK

### Constructor

```ts
new FreeMusicApi2SDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FreeMusicApi2SDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = FreeMusicApi2SDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `FreeMusicApi2SDK` instance in test mode.


### Instance Methods

#### `V1List(data?: object)`

Create a new `V1List` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V1ListEntity` instance.

#### `V1Lookup(data?: object)`

Create a new `V1Lookup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V1LookupEntity` instance.

#### `V1Search(data?: object)`

Create a new `V1Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V1SearchEntity` instance.

#### `V2List(data?: object)`

Create a new `V2List` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V2ListEntity` instance.

#### `V2Lookup(data?: object)`

Create a new `V2Lookup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V2LookupEntity` instance.

#### `V2Search(data?: object)`

Create a new `V2Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V2SearchEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `FreeMusicApi2SDK.test()`.

**Returns:** `FreeMusicApi2SDK` instance in test mode.


---

## V1ListEntity

```ts
const v1_list = client.V1List()
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
| `loved` | `any[]` | No |  |
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
| `trending` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.V1List().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V1ListEntity` instance with the same client and
options.

#### `client()`

Return the parent `FreeMusicApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## V1LookupEntity

```ts
const v1_lookup = client.V1Lookup()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.V1Lookup().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V1LookupEntity` instance with the same client and
options.

#### `client()`

Return the parent `FreeMusicApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## V1SearchEntity

```ts
const v1_search = client.V1Search()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.V1Search().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V1SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `FreeMusicApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## V2ListEntity

```ts
const v2_list = client.V2List()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `any[]` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.V2List().load({ artist_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V2ListEntity` instance with the same client and
options.

#### `client()`

Return the parent `FreeMusicApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## V2LookupEntity

```ts
const v2_lookup = client.V2Lookup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `any[]` | No |  |
| `artists` | `any[]` | No |  |
| `tracks` | `any[]` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.V2Lookup().load({ album_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V2LookupEntity` instance with the same client and
options.

#### `client()`

Return the parent `FreeMusicApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## V2SearchEntity

```ts
const v2_search = client.V2Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `any[]` | No |  |
| `artists` | `any[]` | No |  |
| `tracks` | `any[]` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.V2Search().load({ album_name: 'album_name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V2SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `FreeMusicApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new FreeMusicApi2SDK({
  feature: {
    test: { active: true },
  }
})
```

