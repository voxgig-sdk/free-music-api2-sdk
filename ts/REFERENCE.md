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
| `loved` | `any[]` | No |  |
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
const result = await client.V2Lookup().load()
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
const result = await client.V2Search().load()
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

