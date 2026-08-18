# FreeMusicApi2 PHP SDK Reference

Complete API reference for the FreeMusicApi2 PHP SDK.


## FreeMusicApi2SDK

### Constructor

```php
require_once __DIR__ . '/freemusicapi2_sdk.php';

$client = new FreeMusicApi2SDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FreeMusicApi2SDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = FreeMusicApi2SDK::test();
```


### Instance Methods

#### `V1List($data = null)`

Create a new `V1ListEntity` instance. Pass `null` for no initial data.

#### `V1Lookup($data = null)`

Create a new `V1LookupEntity` instance. Pass `null` for no initial data.

#### `V1Search($data = null)`

Create a new `V1SearchEntity` instance. Pass `null` for no initial data.

#### `V2List($data = null)`

Create a new `V2ListEntity` instance. Pass `null` for no initial data.

#### `V2Lookup($data = null)`

Create a new `V2LookupEntity` instance. Pass `null` for no initial data.

#### `V2Search($data = null)`

Create a new `V2SearchEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): FreeMusicApi2Utility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## V1ListEntity

```php
$v1_list = $client->V1List();
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
| `loved` | `array` | No |  |
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
| `trending` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->V1List()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V1ListEntity`

Create a new `V1ListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## V1LookupEntity

```php
$v1_lookup = $client->V1Lookup();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->V1Lookup()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V1LookupEntity`

Create a new `V1LookupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## V1SearchEntity

```php
$v1_search = $client->V1Search();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->V1Search()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V1SearchEntity`

Create a new `V1SearchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## V2ListEntity

```php
$v2_list = $client->V2List();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->V2List()->load(["artist_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V2ListEntity`

Create a new `V2ListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## V2LookupEntity

```php
$v2_lookup = $client->V2Lookup();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `array` | No |  |
| `artists` | `array` | No |  |
| `tracks` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->V2Lookup()->load(["album_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V2LookupEntity`

Create a new `V2LookupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## V2SearchEntity

```php
$v2_search = $client->V2Search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `array` | No |  |
| `artists` | `array` | No |  |
| `tracks` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->V2Search()->load(["album_name" => "album_name"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V2SearchEntity`

Create a new `V2SearchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new FreeMusicApi2SDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

