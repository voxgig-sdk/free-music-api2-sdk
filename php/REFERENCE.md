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
| `loved` | `array` | No |  |
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

