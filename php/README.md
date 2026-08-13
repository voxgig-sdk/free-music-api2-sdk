# FreeMusicApi2 PHP SDK



The PHP SDK for the FreeMusicApi2 API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->V1List()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/free-music-api2-sdk/releases](https://github.com/voxgig-sdk/free-music-api2-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'freemusicapi2_sdk.php';

$client = new FreeMusicApi2SDK([
    "apikey" => getenv("FREE_MUSIC_API2_APIKEY"),
]);
```

### 2. List v1list records

```php
try {
    // list() returns an array of V1List records — iterate directly.
    $v1lists = $client->V1List()->list();
    foreach ($v1lists as $item) {
        echo $item["idAlbum"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a v2list

V2List is nested under artist, so provide the `artist_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the V2List record (throws on error).
    $v2list = $client->V2List()->load(["artist_id" => 1]);
    print_r($v2list);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $v2lookup = $client->V2Lookup()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = FreeMusicApi2SDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$v2lookup = $client->V2Lookup()->load();
print_r($v2lookup);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new FreeMusicApi2SDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
FREE_MUSIC_API2_TEST_LIVE=TRUE
FREE_MUSIC_API2_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### FreeMusicApi2SDK

```php
require_once 'freemusicapi2_sdk.php';
$client = new FreeMusicApi2SDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = FreeMusicApi2SDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### FreeMusicApi2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `V1List` | `($data): V1ListEntity` | Create a V1List entity instance. |
| `V1Lookup` | `($data): V1LookupEntity` | Create a V1Lookup entity instance. |
| `V1Search` | `($data): V1SearchEntity` | Create a V1Search entity instance. |
| `V2List` | `($data): V2ListEntity` | Create a V2List entity instance. |
| `V2Lookup` | `($data): V2LookupEntity` | Create a V2Lookup entity instance. |
| `V2Search` | `($data): V2SearchEntity` | Create a V2Search entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### V1List

| Field | Description |
| --- | --- |
| `idAlbum` |  |
| `idArtist` |  |
| `idIMVDB` |  |
| `idLyric` |  |
| `idTrack` |  |
| `intCD` |  |
| `intDuration` |  |
| `intLoved` |  |
| `intMusicVidComments` |  |
| `intMusicVidDislikes` |  |
| `intMusicVidFavorites` |  |
| `intMusicVidLikes` |  |
| `intMusicVidViews` |  |
| `intScore` |  |
| `intScoreVotes` |  |
| `intTotalListeners` |  |
| `intTotalPlays` |  |
| `intTrackNumber` |  |
| `loved` |  |
| `strAlbum` |  |
| `strArtist` |  |
| `strArtistAlternate` |  |
| `strDescriptionEN` |  |
| `strGenre` |  |
| `strLocked` |  |
| `strMood` |  |
| `strMusicBrainzAlbumID` |  |
| `strMusicBrainzArtistID` |  |
| `strMusicBrainzID` |  |
| `strMusicVid` |  |
| `strMusicVidCompany` |  |
| `strMusicVidDirector` |  |
| `strMusicVidScreen1` |  |
| `strMusicVidScreen2` |  |
| `strMusicVidScreen3` |  |
| `strStyle` |  |
| `strTheme` |  |
| `strTrack` |  |
| `strTrackLyrics` |  |
| `strTrackThumb` |  |
| `trending` |  |

Operations: List.

API path: `/trending.php`

#### V1Lookup

| Field | Description |
| --- | --- |
| `idAlbum` |  |
| `idArtist` |  |
| `idIMVDB` |  |
| `idLabel` |  |
| `idLyric` |  |
| `idTrack` |  |
| `intBornYear` |  |
| `intCD` |  |
| `intCharted` |  |
| `intDiedYear` |  |
| `intDuration` |  |
| `intFormedYear` |  |
| `intLoved` |  |
| `intMembers` |  |
| `intMusicVidComments` |  |
| `intMusicVidDislikes` |  |
| `intMusicVidFavorites` |  |
| `intMusicVidLikes` |  |
| `intMusicVidViews` |  |
| `intSales` |  |
| `intScore` |  |
| `intScoreVotes` |  |
| `intTotalListeners` |  |
| `intTotalPlays` |  |
| `intTrackNumber` |  |
| `intYearReleased` |  |
| `strAlbum` |  |
| `strAlbum3DCase` |  |
| `strAlbum3DFace` |  |
| `strAlbum3DFlat` |  |
| `strAlbum3DThumb` |  |
| `strAlbumCDart` |  |
| `strAlbumSpine` |  |
| `strAlbumStripped` |  |
| `strAlbumThumb` |  |
| `strAlbumThumbBack` |  |
| `strAlbumThumbHQ` |  |
| `strAllMusicID` |  |
| `strAmazonID` |  |
| `strAppleMusic` |  |
| `strArtist` |  |
| `strArtistAlternate` |  |
| `strArtistBanner` |  |
| `strArtistClearart` |  |
| `strArtistCutout` |  |
| `strArtistFanart` |  |
| `strArtistFanart2` |  |
| `strArtistFanart3` |  |
| `strArtistFanart4` |  |
| `strArtistLogo` |  |
| `strArtistStripped` |  |
| `strArtistThumb` |  |
| `strArtistWideThumb` |  |
| `strBBCReviewID` |  |
| `strBiographyCN` |  |
| `strBiographyDE` |  |
| `strBiographyEN` |  |
| `strBiographyES` |  |
| `strBiographyFR` |  |
| `strBiographyHU` |  |
| `strBiographyIL` |  |
| `strBiographyIT` |  |
| `strBiographyJP` |  |
| `strBiographyNL` |  |
| `strBiographyNO` |  |
| `strBiographyPL` |  |
| `strBiographyPT` |  |
| `strBiographyRU` |  |
| `strBiographySE` |  |
| `strCountry` |  |
| `strCountryCode` |  |
| `strDescriptionEN` |  |
| `strDisbanded` |  |
| `strDiscogsID` |  |
| `strFacebook` |  |
| `strGender` |  |
| `strGeniusID` |  |
| `strGenre` |  |
| `strInstagram` |  |
| `strItunesID` |  |
| `strLabel` |  |
| `strLastFMChart` |  |
| `strLocation` |  |
| `strLocked` |  |
| `strLyricWikiID` |  |
| `strMood` |  |
| `strMusicBrainzAlbumID` |  |
| `strMusicBrainzArtistID` |  |
| `strMusicBrainzID` |  |
| `strMusicMozID` |  |
| `strMusicVid` |  |
| `strMusicVidCompany` |  |
| `strMusicVidDirector` |  |
| `strMusicVidScreen1` |  |
| `strMusicVidScreen2` |  |
| `strMusicVidScreen3` |  |
| `strRateYourMusicID` |  |
| `strReleaseFormat` |  |
| `strReview` |  |
| `strSoundCloud` |  |
| `strSpeed` |  |
| `strSpotify` |  |
| `strStyle` |  |
| `strTheme` |  |
| `strTrack` |  |
| `strTrackLyrics` |  |
| `strTrackThumb` |  |
| `strTwitter` |  |
| `strWebsite` |  |
| `strWikidataID` |  |
| `strWikipediaID` |  |
| `strYoutube` |  |

Operations: List.

API path: `/track.php`

#### V1Search

| Field | Description |
| --- | --- |
| `idAlbum` |  |
| `idArtist` |  |
| `idIMVDB` |  |
| `idLabel` |  |
| `idLyric` |  |
| `idTrack` |  |
| `intBornYear` |  |
| `intCD` |  |
| `intCharted` |  |
| `intDiedYear` |  |
| `intDuration` |  |
| `intFormedYear` |  |
| `intLoved` |  |
| `intMembers` |  |
| `intMusicVidComments` |  |
| `intMusicVidDislikes` |  |
| `intMusicVidFavorites` |  |
| `intMusicVidLikes` |  |
| `intMusicVidViews` |  |
| `intSales` |  |
| `intScore` |  |
| `intScoreVotes` |  |
| `intTotalListeners` |  |
| `intTotalPlays` |  |
| `intTrackNumber` |  |
| `intYearReleased` |  |
| `strAlbum` |  |
| `strAlbum3DCase` |  |
| `strAlbum3DFace` |  |
| `strAlbum3DFlat` |  |
| `strAlbum3DThumb` |  |
| `strAlbumCDart` |  |
| `strAlbumSpine` |  |
| `strAlbumStripped` |  |
| `strAlbumThumb` |  |
| `strAlbumThumbBack` |  |
| `strAlbumThumbHQ` |  |
| `strAllMusicID` |  |
| `strAmazonID` |  |
| `strArtist` |  |
| `strArtistAlternate` |  |
| `strArtistBanner` |  |
| `strArtistClearart` |  |
| `strArtistCutout` |  |
| `strArtistFanart` |  |
| `strArtistFanart2` |  |
| `strArtistFanart3` |  |
| `strArtistFanart4` |  |
| `strArtistLogo` |  |
| `strArtistStripped` |  |
| `strArtistThumb` |  |
| `strArtistWideThumb` |  |
| `strBBCReviewID` |  |
| `strBiographyCN` |  |
| `strBiographyDE` |  |
| `strBiographyEN` |  |
| `strBiographyES` |  |
| `strBiographyFR` |  |
| `strBiographyHU` |  |
| `strBiographyIL` |  |
| `strBiographyIT` |  |
| `strBiographyJP` |  |
| `strBiographyNL` |  |
| `strBiographyNO` |  |
| `strBiographyPL` |  |
| `strBiographyPT` |  |
| `strBiographyRU` |  |
| `strBiographySE` |  |
| `strCountry` |  |
| `strCountryCode` |  |
| `strDescriptionEN` |  |
| `strDisbanded` |  |
| `strDiscogsID` |  |
| `strFacebook` |  |
| `strGender` |  |
| `strGeniusID` |  |
| `strGenre` |  |
| `strItunesID` |  |
| `strLabel` |  |
| `strLastFMChart` |  |
| `strLocation` |  |
| `strLocked` |  |
| `strLyricWikiID` |  |
| `strMood` |  |
| `strMusicBrainzAlbumID` |  |
| `strMusicBrainzArtistID` |  |
| `strMusicBrainzID` |  |
| `strMusicMozID` |  |
| `strMusicVid` |  |
| `strMusicVidCompany` |  |
| `strMusicVidDirector` |  |
| `strMusicVidScreen1` |  |
| `strMusicVidScreen2` |  |
| `strMusicVidScreen3` |  |
| `strRateYourMusicID` |  |
| `strReleaseFormat` |  |
| `strReview` |  |
| `strSpeed` |  |
| `strStyle` |  |
| `strTheme` |  |
| `strTrack` |  |
| `strTrackLyrics` |  |
| `strTrackThumb` |  |
| `strTwitter` |  |
| `strWebsite` |  |
| `strWikidataID` |  |
| `strWikipediaID` |  |

Operations: List.

API path: `/searchalbum.php`

#### V2List

| Field | Description |
| --- | --- |
| `albums` |  |

Operations: Load.

API path: `/list/discography/{artistId}`

#### V2Lookup

| Field | Description |
| --- | --- |
| `albums` |  |
| `artists` |  |
| `tracks` |  |

Operations: Load.

API path: `/lookup/album/{albumId}`

#### V2Search

| Field | Description |
| --- | --- |
| `albums` |  |
| `artists` |  |
| `tracks` |  |

Operations: Load.

API path: `/search/album/{albumName}`



## Entities


### V1List

Create an instance: `$v1_list = $client->V1List();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idAlbum` | `int` |  |
| `idArtist` | `int` |  |
| `idIMVDB` | `int` |  |
| `idLyric` | `int` |  |
| `idTrack` | `int` |  |
| `intCD` | `int` |  |
| `intDuration` | `int` |  |
| `intLoved` | `int` |  |
| `intMusicVidComments` | `int` |  |
| `intMusicVidDislikes` | `int` |  |
| `intMusicVidFavorites` | `int` |  |
| `intMusicVidLikes` | `int` |  |
| `intMusicVidViews` | `int` |  |
| `intScore` | `int` |  |
| `intScoreVotes` | `int` |  |
| `intTotalListeners` | `int` |  |
| `intTotalPlays` | `int` |  |
| `intTrackNumber` | `int` |  |
| `loved` | `array` |  |
| `strAlbum` | `string` |  |
| `strArtist` | `string` |  |
| `strArtistAlternate` | `string` |  |
| `strDescriptionEN` | `string` |  |
| `strGenre` | `string` |  |
| `strLocked` | `string` |  |
| `strMood` | `string` |  |
| `strMusicBrainzAlbumID` | `string` |  |
| `strMusicBrainzArtistID` | `string` |  |
| `strMusicBrainzID` | `string` |  |
| `strMusicVid` | `string` |  |
| `strMusicVidCompany` | `string` |  |
| `strMusicVidDirector` | `string` |  |
| `strMusicVidScreen1` | `string` |  |
| `strMusicVidScreen2` | `string` |  |
| `strMusicVidScreen3` | `string` |  |
| `strStyle` | `string` |  |
| `strTheme` | `string` |  |
| `strTrack` | `string` |  |
| `strTrackLyrics` | `string` |  |
| `strTrackThumb` | `string` |  |
| `trending` | `array` |  |

#### Example: List

```php
// list() returns an array of V1List records (throws on error).
$v1_lists = $client->V1List()->list();
```


### V1Lookup

Create an instance: `$v1_lookup = $client->V1Lookup();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idAlbum` | `int` |  |
| `idArtist` | `int` |  |
| `idIMVDB` | `int` |  |
| `idLabel` | `int` |  |
| `idLyric` | `int` |  |
| `idTrack` | `int` |  |
| `intBornYear` | `int` |  |
| `intCD` | `int` |  |
| `intCharted` | `int` |  |
| `intDiedYear` | `int` |  |
| `intDuration` | `int` |  |
| `intFormedYear` | `int` |  |
| `intLoved` | `int` |  |
| `intMembers` | `int` |  |
| `intMusicVidComments` | `int` |  |
| `intMusicVidDislikes` | `int` |  |
| `intMusicVidFavorites` | `int` |  |
| `intMusicVidLikes` | `int` |  |
| `intMusicVidViews` | `int` |  |
| `intSales` | `int` |  |
| `intScore` | `int` |  |
| `intScoreVotes` | `int` |  |
| `intTotalListeners` | `int` |  |
| `intTotalPlays` | `int` |  |
| `intTrackNumber` | `int` |  |
| `intYearReleased` | `int` |  |
| `strAlbum` | `string` |  |
| `strAlbum3DCase` | `string` |  |
| `strAlbum3DFace` | `string` |  |
| `strAlbum3DFlat` | `string` |  |
| `strAlbum3DThumb` | `string` |  |
| `strAlbumCDart` | `string` |  |
| `strAlbumSpine` | `string` |  |
| `strAlbumStripped` | `string` |  |
| `strAlbumThumb` | `string` |  |
| `strAlbumThumbBack` | `string` |  |
| `strAlbumThumbHQ` | `string` |  |
| `strAllMusicID` | `string` |  |
| `strAmazonID` | `string` |  |
| `strAppleMusic` | `string` |  |
| `strArtist` | `string` |  |
| `strArtistAlternate` | `string` |  |
| `strArtistBanner` | `string` |  |
| `strArtistClearart` | `string` |  |
| `strArtistCutout` | `string` |  |
| `strArtistFanart` | `string` |  |
| `strArtistFanart2` | `string` |  |
| `strArtistFanart3` | `string` |  |
| `strArtistFanart4` | `string` |  |
| `strArtistLogo` | `string` |  |
| `strArtistStripped` | `string` |  |
| `strArtistThumb` | `string` |  |
| `strArtistWideThumb` | `string` |  |
| `strBBCReviewID` | `string` |  |
| `strBiographyCN` | `string` |  |
| `strBiographyDE` | `string` |  |
| `strBiographyEN` | `string` |  |
| `strBiographyES` | `string` |  |
| `strBiographyFR` | `string` |  |
| `strBiographyHU` | `string` |  |
| `strBiographyIL` | `string` |  |
| `strBiographyIT` | `string` |  |
| `strBiographyJP` | `string` |  |
| `strBiographyNL` | `string` |  |
| `strBiographyNO` | `string` |  |
| `strBiographyPL` | `string` |  |
| `strBiographyPT` | `string` |  |
| `strBiographyRU` | `string` |  |
| `strBiographySE` | `string` |  |
| `strCountry` | `string` |  |
| `strCountryCode` | `string` |  |
| `strDescriptionEN` | `string` |  |
| `strDisbanded` | `string` |  |
| `strDiscogsID` | `string` |  |
| `strFacebook` | `string` |  |
| `strGender` | `string` |  |
| `strGeniusID` | `string` |  |
| `strGenre` | `string` |  |
| `strInstagram` | `string` |  |
| `strItunesID` | `string` |  |
| `strLabel` | `string` |  |
| `strLastFMChart` | `string` |  |
| `strLocation` | `string` |  |
| `strLocked` | `string` |  |
| `strLyricWikiID` | `string` |  |
| `strMood` | `string` |  |
| `strMusicBrainzAlbumID` | `string` |  |
| `strMusicBrainzArtistID` | `string` |  |
| `strMusicBrainzID` | `string` |  |
| `strMusicMozID` | `string` |  |
| `strMusicVid` | `string` |  |
| `strMusicVidCompany` | `string` |  |
| `strMusicVidDirector` | `string` |  |
| `strMusicVidScreen1` | `string` |  |
| `strMusicVidScreen2` | `string` |  |
| `strMusicVidScreen3` | `string` |  |
| `strRateYourMusicID` | `string` |  |
| `strReleaseFormat` | `string` |  |
| `strReview` | `string` |  |
| `strSoundCloud` | `string` |  |
| `strSpeed` | `string` |  |
| `strSpotify` | `string` |  |
| `strStyle` | `string` |  |
| `strTheme` | `string` |  |
| `strTrack` | `string` |  |
| `strTrackLyrics` | `string` |  |
| `strTrackThumb` | `string` |  |
| `strTwitter` | `string` |  |
| `strWebsite` | `string` |  |
| `strWikidataID` | `string` |  |
| `strWikipediaID` | `string` |  |
| `strYoutube` | `string` |  |

#### Example: List

```php
// list() returns an array of V1Lookup records (throws on error).
$v1_lookups = $client->V1Lookup()->list();
```


### V1Search

Create an instance: `$v1_search = $client->V1Search();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idAlbum` | `int` |  |
| `idArtist` | `int` |  |
| `idIMVDB` | `int` |  |
| `idLabel` | `int` |  |
| `idLyric` | `int` |  |
| `idTrack` | `int` |  |
| `intBornYear` | `int` |  |
| `intCD` | `int` |  |
| `intCharted` | `int` |  |
| `intDiedYear` | `int` |  |
| `intDuration` | `int` |  |
| `intFormedYear` | `int` |  |
| `intLoved` | `int` |  |
| `intMembers` | `int` |  |
| `intMusicVidComments` | `int` |  |
| `intMusicVidDislikes` | `int` |  |
| `intMusicVidFavorites` | `int` |  |
| `intMusicVidLikes` | `int` |  |
| `intMusicVidViews` | `int` |  |
| `intSales` | `int` |  |
| `intScore` | `int` |  |
| `intScoreVotes` | `int` |  |
| `intTotalListeners` | `int` |  |
| `intTotalPlays` | `int` |  |
| `intTrackNumber` | `int` |  |
| `intYearReleased` | `int` |  |
| `strAlbum` | `string` |  |
| `strAlbum3DCase` | `string` |  |
| `strAlbum3DFace` | `string` |  |
| `strAlbum3DFlat` | `string` |  |
| `strAlbum3DThumb` | `string` |  |
| `strAlbumCDart` | `string` |  |
| `strAlbumSpine` | `string` |  |
| `strAlbumStripped` | `string` |  |
| `strAlbumThumb` | `string` |  |
| `strAlbumThumbBack` | `string` |  |
| `strAlbumThumbHQ` | `string` |  |
| `strAllMusicID` | `string` |  |
| `strAmazonID` | `string` |  |
| `strArtist` | `string` |  |
| `strArtistAlternate` | `string` |  |
| `strArtistBanner` | `string` |  |
| `strArtistClearart` | `string` |  |
| `strArtistCutout` | `string` |  |
| `strArtistFanart` | `string` |  |
| `strArtistFanart2` | `string` |  |
| `strArtistFanart3` | `string` |  |
| `strArtistFanart4` | `string` |  |
| `strArtistLogo` | `string` |  |
| `strArtistStripped` | `string` |  |
| `strArtistThumb` | `string` |  |
| `strArtistWideThumb` | `string` |  |
| `strBBCReviewID` | `string` |  |
| `strBiographyCN` | `string` |  |
| `strBiographyDE` | `string` |  |
| `strBiographyEN` | `string` |  |
| `strBiographyES` | `string` |  |
| `strBiographyFR` | `string` |  |
| `strBiographyHU` | `string` |  |
| `strBiographyIL` | `string` |  |
| `strBiographyIT` | `string` |  |
| `strBiographyJP` | `string` |  |
| `strBiographyNL` | `string` |  |
| `strBiographyNO` | `string` |  |
| `strBiographyPL` | `string` |  |
| `strBiographyPT` | `string` |  |
| `strBiographyRU` | `string` |  |
| `strBiographySE` | `string` |  |
| `strCountry` | `string` |  |
| `strCountryCode` | `string` |  |
| `strDescriptionEN` | `string` |  |
| `strDisbanded` | `string` |  |
| `strDiscogsID` | `string` |  |
| `strFacebook` | `string` |  |
| `strGender` | `string` |  |
| `strGeniusID` | `string` |  |
| `strGenre` | `string` |  |
| `strItunesID` | `string` |  |
| `strLabel` | `string` |  |
| `strLastFMChart` | `string` |  |
| `strLocation` | `string` |  |
| `strLocked` | `string` |  |
| `strLyricWikiID` | `string` |  |
| `strMood` | `string` |  |
| `strMusicBrainzAlbumID` | `string` |  |
| `strMusicBrainzArtistID` | `string` |  |
| `strMusicBrainzID` | `string` |  |
| `strMusicMozID` | `string` |  |
| `strMusicVid` | `string` |  |
| `strMusicVidCompany` | `string` |  |
| `strMusicVidDirector` | `string` |  |
| `strMusicVidScreen1` | `string` |  |
| `strMusicVidScreen2` | `string` |  |
| `strMusicVidScreen3` | `string` |  |
| `strRateYourMusicID` | `string` |  |
| `strReleaseFormat` | `string` |  |
| `strReview` | `string` |  |
| `strSpeed` | `string` |  |
| `strStyle` | `string` |  |
| `strTheme` | `string` |  |
| `strTrack` | `string` |  |
| `strTrackLyrics` | `string` |  |
| `strTrackThumb` | `string` |  |
| `strTwitter` | `string` |  |
| `strWebsite` | `string` |  |
| `strWikidataID` | `string` |  |
| `strWikipediaID` | `string` |  |

#### Example: List

```php
// list() returns an array of V1Search records (throws on error).
$v1_searchs = $client->V1Search()->list();
```


### V2List

Create an instance: `$v2_list = $client->V2List();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the V2List record (throws on error).
$v2_list = $client->V2List()->load(["artist_id" => 1]);
```


### V2Lookup

Create an instance: `$v2_lookup = $client->V2Lookup();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `array` |  |
| `artists` | `array` |  |
| `tracks` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the V2Lookup record (throws on error).
$v2_lookup = $client->V2Lookup()->load();
```


### V2Search

Create an instance: `$v2_search = $client->V2Search();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `array` |  |
| `artists` | `array` |  |
| `tracks` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the V2Search record (throws on error).
$v2_search = $client->V2Search()->load();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── freemusicapi2_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`freemusicapi2_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$v2lookup = $client->V2Lookup();
$v2lookup->load();

// $v2lookup->data_get() now returns the v2lookup data from the last load
// $v2lookup->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
