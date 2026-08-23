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
    $v2lookup = $client->V2Lookup()->load(["album_id" => 1]);
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
$v2lookup = $client->V2Lookup()->load(["album_id" => 1]);
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
| `idAlbum` | Album ID |
| `idArtist` | Artist ID |
| `idIMVDB` | IMVDB ID |
| `idLyric` | Lyrics ID |
| `idTrack` | Track ID |
| `intCD` | CD number |
| `intDuration` | Track duration in milliseconds |
| `intLoved` | Number of loves/likes |
| `intMusicVidComments` | Number of music video comments |
| `intMusicVidDislikes` | Number of music video dislikes |
| `intMusicVidFavorites` | Number of music video favorites |
| `intMusicVidLikes` | Number of music video likes |
| `intMusicVidViews` | Number of music video views |
| `intScore` | Track score |
| `intScoreVotes` | Number of score votes |
| `intTotalListeners` | Total number of listeners |
| `intTotalPlays` | Total number of plays |
| `intTrackNumber` | Track number on album |
| `loved` |  |
| `strAlbum` | Album title |
| `strArtist` | Artist name |
| `strArtistAlternate` | Alternate artist name |
| `strDescriptionEN` | Video description in English |
| `strGenre` | Track genre |
| `strLocked` | Whether the record is locked |
| `strMood` | Track mood |
| `strMusicBrainzAlbumID` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | MusicBrainz Artist ID |
| `strMusicBrainzID` | MusicBrainz Recording ID |
| `strMusicVid` | URL to music video |
| `strMusicVidCompany` | Music video production company |
| `strMusicVidDirector` | Music video director |
| `strMusicVidScreen1` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | URL to music video screenshot 3 |
| `strStyle` | Track style |
| `strTheme` | Track theme |
| `strTrack` | Track title |
| `strTrackLyrics` | Track lyrics |
| `strTrackThumb` | URL to track thumbnail |
| `trending` |  |

Operations: List.

API path: `/trending.php`

#### V1Lookup

| Field | Description |
| --- | --- |
| `idAlbum` | Album ID |
| `idArtist` | Artist ID |
| `idIMVDB` | IMVDB ID |
| `idLabel` | Label ID |
| `idLyric` | Lyrics ID |
| `idTrack` | Unique track ID |
| `intBornYear` | Birth year of the artist |
| `intCD` | CD number |
| `intCharted` | Chart position |
| `intDiedYear` | Year the artist died (if applicable) |
| `intDuration` | Track duration in milliseconds |
| `intFormedYear` | Year the artist/band was formed |
| `intLoved` | Number of loves/likes |
| `intMembers` | Number of band members |
| `intMusicVidComments` | Number of music video comments |
| `intMusicVidDislikes` | Number of music video dislikes |
| `intMusicVidFavorites` | Number of music video favorites |
| `intMusicVidLikes` | Number of music video likes |
| `intMusicVidViews` | Number of music video views |
| `intSales` | Number of sales |
| `intScore` | Track score |
| `intScoreVotes` | Number of score votes |
| `intTotalListeners` | Total number of listeners |
| `intTotalPlays` | Total number of plays |
| `intTrackNumber` | Track number on album |
| `intYearReleased` | Year the album was released |
| `strAlbum` | Album title |
| `strAlbum3DCase` | URL to 3D case image |
| `strAlbum3DFace` | URL to 3D face image |
| `strAlbum3DFlat` | URL to 3D flat image |
| `strAlbum3DThumb` | URL to 3D thumbnail |
| `strAlbumCDart` | URL to CD art |
| `strAlbumSpine` | URL to album spine image |
| `strAlbumStripped` | Album title without special characters |
| `strAlbumThumb` | URL to album thumbnail |
| `strAlbumThumbBack` | URL to back of album cover |
| `strAlbumThumbHQ` | URL to high quality album thumbnail |
| `strAllMusicID` | AllMusic ID |
| `strAmazonID` | Amazon ID |
| `strAppleMusic` | Apple Music artist URL |
| `strArtist` | Artist name |
| `strArtistAlternate` | Alternate artist name |
| `strArtistBanner` | URL to artist banner |
| `strArtistClearart` | URL to artist clearart |
| `strArtistCutout` | URL to artist cutout image |
| `strArtistFanart` | URL to artist fanart |
| `strArtistFanart2` | URL to alternate artist fanart |
| `strArtistFanart3` | URL to third artist fanart |
| `strArtistFanart4` | URL to fourth artist fanart |
| `strArtistLogo` | URL to artist logo |
| `strArtistStripped` | Artist name without special characters |
| `strArtistThumb` | URL to artist thumbnail image |
| `strArtistWideThumb` | URL to artist wide thumbnail |
| `strBBCReviewID` | BBC Review ID |
| `strBiographyCN` | Artist biography in Chinese |
| `strBiographyDE` | Artist biography in German |
| `strBiographyEN` | Artist biography in English |
| `strBiographyES` | Artist biography in Spanish |
| `strBiographyFR` | Artist biography in French |
| `strBiographyHU` | Artist biography in Hungarian |
| `strBiographyIL` | Artist biography in Hebrew |
| `strBiographyIT` | Artist biography in Italian |
| `strBiographyJP` | Artist biography in Japanese |
| `strBiographyNL` | Artist biography in Dutch |
| `strBiographyNO` | Artist biography in Norwegian |
| `strBiographyPL` | Artist biography in Polish |
| `strBiographyPT` | Artist biography in Portuguese |
| `strBiographyRU` | Artist biography in Russian |
| `strBiographySE` | Artist biography in Swedish |
| `strCountry` | Country of origin |
| `strCountryCode` | Country code |
| `strDescriptionEN` | Track description in English |
| `strDisbanded` | Disbanded status |
| `strDiscogsID` | Discogs ID |
| `strFacebook` | Facebook page URL |
| `strGender` | Artist gender |
| `strGeniusID` | Genius ID |
| `strGenre` | Track genre |
| `strInstagram` | Instagram profile URL |
| `strItunesID` | iTunes ID |
| `strLabel` | Record label |
| `strLastFMChart` | Last.fm chart URL |
| `strLocation` | Recording location |
| `strLocked` | Whether the record is locked |
| `strLyricWikiID` | LyricWiki ID |
| `strMood` | Track mood |
| `strMusicBrainzAlbumID` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | MusicBrainz Artist ID |
| `strMusicBrainzID` | MusicBrainz Recording ID |
| `strMusicMozID` | MusicMoz ID |
| `strMusicVid` | URL to music video |
| `strMusicVidCompany` | Music video production company |
| `strMusicVidDirector` | Music video director |
| `strMusicVidScreen1` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | URL to music video screenshot 3 |
| `strRateYourMusicID` | RateYourMusic ID |
| `strReleaseFormat` | Release format (CD, Vinyl, etc.) |
| `strReview` | Album review |
| `strSoundCloud` | SoundCloud profile URL |
| `strSpeed` | Album speed |
| `strSpotify` | Spotify artist URL |
| `strStyle` | Track style |
| `strTheme` | Track theme |
| `strTrack` | Track title |
| `strTrackLyrics` | Track lyrics |
| `strTrackThumb` | URL to track thumbnail |
| `strTwitter` | Twitter profile URL |
| `strWebsite` | Official website URL |
| `strWikidataID` | Wikidata ID |
| `strWikipediaID` | Wikipedia ID |
| `strYoutube` | YouTube channel URL |

Operations: List.

API path: `/track.php`

#### V1Search

| Field | Description |
| --- | --- |
| `idAlbum` | Unique album ID |
| `idArtist` | Artist ID |
| `idIMVDB` | IMVDB ID |
| `idLabel` | Label ID |
| `idLyric` | Lyrics ID |
| `idTrack` | Unique track ID |
| `intBornYear` | Birth year of the artist |
| `intCD` | CD number |
| `intCharted` | Chart position |
| `intDiedYear` | Year the artist died (if applicable) |
| `intDuration` | Track duration in milliseconds |
| `intFormedYear` | Year the artist/band was formed |
| `intLoved` | Number of loves/likes |
| `intMembers` | Number of band members |
| `intMusicVidComments` | Number of music video comments |
| `intMusicVidDislikes` | Number of music video dislikes |
| `intMusicVidFavorites` | Number of music video favorites |
| `intMusicVidLikes` | Number of music video likes |
| `intMusicVidViews` | Number of music video views |
| `intSales` | Number of sales |
| `intScore` | Album score |
| `intScoreVotes` | Number of score votes |
| `intTotalListeners` | Total number of listeners |
| `intTotalPlays` | Total number of plays |
| `intTrackNumber` | Track number on album |
| `intYearReleased` | Year the album was released |
| `strAlbum` | Album title |
| `strAlbum3DCase` | URL to 3D case image |
| `strAlbum3DFace` | URL to 3D face image |
| `strAlbum3DFlat` | URL to 3D flat image |
| `strAlbum3DThumb` | URL to 3D thumbnail |
| `strAlbumCDart` | URL to CD art |
| `strAlbumSpine` | URL to album spine image |
| `strAlbumStripped` | Album title without special characters |
| `strAlbumThumb` | URL to album thumbnail |
| `strAlbumThumbBack` | URL to back of album cover |
| `strAlbumThumbHQ` | URL to high quality album thumbnail |
| `strAllMusicID` | AllMusic ID |
| `strAmazonID` | Amazon ID |
| `strArtist` | Artist name |
| `strArtistAlternate` | Alternate artist name |
| `strArtistBanner` | URL to artist banner |
| `strArtistClearart` | URL to artist clearart |
| `strArtistCutout` | URL to artist cutout image |
| `strArtistFanart` | URL to artist fanart |
| `strArtistFanart2` | URL to alternate artist fanart |
| `strArtistFanart3` | URL to third artist fanart |
| `strArtistFanart4` | URL to fourth artist fanart |
| `strArtistLogo` | URL to artist logo |
| `strArtistStripped` | Artist name without special characters |
| `strArtistThumb` | URL to artist thumbnail image |
| `strArtistWideThumb` | URL to artist wide thumbnail |
| `strBBCReviewID` | BBC Review ID |
| `strBiographyCN` | Artist biography in Chinese |
| `strBiographyDE` | Artist biography in German |
| `strBiographyEN` | Artist biography in English |
| `strBiographyES` | Artist biography in Spanish |
| `strBiographyFR` | Artist biography in French |
| `strBiographyHU` | Artist biography in Hungarian |
| `strBiographyIL` | Artist biography in Hebrew |
| `strBiographyIT` | Artist biography in Italian |
| `strBiographyJP` | Artist biography in Japanese |
| `strBiographyNL` | Artist biography in Dutch |
| `strBiographyNO` | Artist biography in Norwegian |
| `strBiographyPL` | Artist biography in Polish |
| `strBiographyPT` | Artist biography in Portuguese |
| `strBiographyRU` | Artist biography in Russian |
| `strBiographySE` | Artist biography in Swedish |
| `strCountry` | Country of origin |
| `strCountryCode` | Country code |
| `strDescriptionEN` | Album description in English |
| `strDisbanded` | Disbanded status |
| `strDiscogsID` | Discogs ID |
| `strFacebook` | Facebook page URL |
| `strGender` | Artist gender |
| `strGeniusID` | Genius ID |
| `strGenre` | Album genre |
| `strItunesID` | iTunes ID |
| `strLabel` | Record label |
| `strLastFMChart` | Last.fm chart URL |
| `strLocation` | Recording location |
| `strLocked` | Whether the record is locked |
| `strLyricWikiID` | LyricWiki ID |
| `strMood` | Album mood |
| `strMusicBrainzAlbumID` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | MusicBrainz Artist ID |
| `strMusicBrainzID` | MusicBrainz Release Group ID |
| `strMusicMozID` | MusicMoz ID |
| `strMusicVid` | URL to music video |
| `strMusicVidCompany` | Music video production company |
| `strMusicVidDirector` | Music video director |
| `strMusicVidScreen1` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | URL to music video screenshot 3 |
| `strRateYourMusicID` | RateYourMusic ID |
| `strReleaseFormat` | Release format (CD, Vinyl, etc.) |
| `strReview` | Album review |
| `strSpeed` | Album speed |
| `strStyle` | Album style |
| `strTheme` | Album theme |
| `strTrack` | Track title |
| `strTrackLyrics` | Track lyrics |
| `strTrackThumb` | URL to track thumbnail |
| `strTwitter` | Twitter profile URL |
| `strWebsite` | Official website URL |
| `strWikidataID` | Wikidata ID |
| `strWikipediaID` | Wikipedia ID |

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
| `idAlbum` | `int` | Album ID |
| `idArtist` | `int` | Artist ID |
| `idIMVDB` | `int` | IMVDB ID |
| `idLyric` | `int` | Lyrics ID |
| `idTrack` | `int` | Track ID |
| `intCD` | `int` | CD number |
| `intDuration` | `int` | Track duration in milliseconds |
| `intLoved` | `int` | Number of loves/likes |
| `intMusicVidComments` | `int` | Number of music video comments |
| `intMusicVidDislikes` | `int` | Number of music video dislikes |
| `intMusicVidFavorites` | `int` | Number of music video favorites |
| `intMusicVidLikes` | `int` | Number of music video likes |
| `intMusicVidViews` | `int` | Number of music video views |
| `intScore` | `int` | Track score |
| `intScoreVotes` | `int` | Number of score votes |
| `intTotalListeners` | `int` | Total number of listeners |
| `intTotalPlays` | `int` | Total number of plays |
| `intTrackNumber` | `int` | Track number on album |
| `loved` | `array` |  |
| `strAlbum` | `string` | Album title |
| `strArtist` | `string` | Artist name |
| `strArtistAlternate` | `string` | Alternate artist name |
| `strDescriptionEN` | `string` | Video description in English |
| `strGenre` | `string` | Track genre |
| `strLocked` | `string` | Whether the record is locked |
| `strMood` | `string` | Track mood |
| `strMusicBrainzAlbumID` | `string` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `string` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `string` | MusicBrainz Recording ID |
| `strMusicVid` | `string` | URL to music video |
| `strMusicVidCompany` | `string` | Music video production company |
| `strMusicVidDirector` | `string` | Music video director |
| `strMusicVidScreen1` | `string` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `string` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `string` | URL to music video screenshot 3 |
| `strStyle` | `string` | Track style |
| `strTheme` | `string` | Track theme |
| `strTrack` | `string` | Track title |
| `strTrackLyrics` | `string` | Track lyrics |
| `strTrackThumb` | `string` | URL to track thumbnail |
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
| `idAlbum` | `int` | Album ID |
| `idArtist` | `int` | Artist ID |
| `idIMVDB` | `int` | IMVDB ID |
| `idLabel` | `int` | Label ID |
| `idLyric` | `int` | Lyrics ID |
| `idTrack` | `int` | Unique track ID |
| `intBornYear` | `int` | Birth year of the artist |
| `intCD` | `int` | CD number |
| `intCharted` | `int` | Chart position |
| `intDiedYear` | `int` | Year the artist died (if applicable) |
| `intDuration` | `int` | Track duration in milliseconds |
| `intFormedYear` | `int` | Year the artist/band was formed |
| `intLoved` | `int` | Number of loves/likes |
| `intMembers` | `int` | Number of band members |
| `intMusicVidComments` | `int` | Number of music video comments |
| `intMusicVidDislikes` | `int` | Number of music video dislikes |
| `intMusicVidFavorites` | `int` | Number of music video favorites |
| `intMusicVidLikes` | `int` | Number of music video likes |
| `intMusicVidViews` | `int` | Number of music video views |
| `intSales` | `int` | Number of sales |
| `intScore` | `int` | Track score |
| `intScoreVotes` | `int` | Number of score votes |
| `intTotalListeners` | `int` | Total number of listeners |
| `intTotalPlays` | `int` | Total number of plays |
| `intTrackNumber` | `int` | Track number on album |
| `intYearReleased` | `int` | Year the album was released |
| `strAlbum` | `string` | Album title |
| `strAlbum3DCase` | `string` | URL to 3D case image |
| `strAlbum3DFace` | `string` | URL to 3D face image |
| `strAlbum3DFlat` | `string` | URL to 3D flat image |
| `strAlbum3DThumb` | `string` | URL to 3D thumbnail |
| `strAlbumCDart` | `string` | URL to CD art |
| `strAlbumSpine` | `string` | URL to album spine image |
| `strAlbumStripped` | `string` | Album title without special characters |
| `strAlbumThumb` | `string` | URL to album thumbnail |
| `strAlbumThumbBack` | `string` | URL to back of album cover |
| `strAlbumThumbHQ` | `string` | URL to high quality album thumbnail |
| `strAllMusicID` | `string` | AllMusic ID |
| `strAmazonID` | `string` | Amazon ID |
| `strAppleMusic` | `string` | Apple Music artist URL |
| `strArtist` | `string` | Artist name |
| `strArtistAlternate` | `string` | Alternate artist name |
| `strArtistBanner` | `string` | URL to artist banner |
| `strArtistClearart` | `string` | URL to artist clearart |
| `strArtistCutout` | `string` | URL to artist cutout image |
| `strArtistFanart` | `string` | URL to artist fanart |
| `strArtistFanart2` | `string` | URL to alternate artist fanart |
| `strArtistFanart3` | `string` | URL to third artist fanart |
| `strArtistFanart4` | `string` | URL to fourth artist fanart |
| `strArtistLogo` | `string` | URL to artist logo |
| `strArtistStripped` | `string` | Artist name without special characters |
| `strArtistThumb` | `string` | URL to artist thumbnail image |
| `strArtistWideThumb` | `string` | URL to artist wide thumbnail |
| `strBBCReviewID` | `string` | BBC Review ID |
| `strBiographyCN` | `string` | Artist biography in Chinese |
| `strBiographyDE` | `string` | Artist biography in German |
| `strBiographyEN` | `string` | Artist biography in English |
| `strBiographyES` | `string` | Artist biography in Spanish |
| `strBiographyFR` | `string` | Artist biography in French |
| `strBiographyHU` | `string` | Artist biography in Hungarian |
| `strBiographyIL` | `string` | Artist biography in Hebrew |
| `strBiographyIT` | `string` | Artist biography in Italian |
| `strBiographyJP` | `string` | Artist biography in Japanese |
| `strBiographyNL` | `string` | Artist biography in Dutch |
| `strBiographyNO` | `string` | Artist biography in Norwegian |
| `strBiographyPL` | `string` | Artist biography in Polish |
| `strBiographyPT` | `string` | Artist biography in Portuguese |
| `strBiographyRU` | `string` | Artist biography in Russian |
| `strBiographySE` | `string` | Artist biography in Swedish |
| `strCountry` | `string` | Country of origin |
| `strCountryCode` | `string` | Country code |
| `strDescriptionEN` | `string` | Track description in English |
| `strDisbanded` | `string` | Disbanded status |
| `strDiscogsID` | `string` | Discogs ID |
| `strFacebook` | `string` | Facebook page URL |
| `strGender` | `string` | Artist gender |
| `strGeniusID` | `string` | Genius ID |
| `strGenre` | `string` | Track genre |
| `strInstagram` | `string` | Instagram profile URL |
| `strItunesID` | `string` | iTunes ID |
| `strLabel` | `string` | Record label |
| `strLastFMChart` | `string` | Last.fm chart URL |
| `strLocation` | `string` | Recording location |
| `strLocked` | `string` | Whether the record is locked |
| `strLyricWikiID` | `string` | LyricWiki ID |
| `strMood` | `string` | Track mood |
| `strMusicBrainzAlbumID` | `string` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `string` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `string` | MusicBrainz Recording ID |
| `strMusicMozID` | `string` | MusicMoz ID |
| `strMusicVid` | `string` | URL to music video |
| `strMusicVidCompany` | `string` | Music video production company |
| `strMusicVidDirector` | `string` | Music video director |
| `strMusicVidScreen1` | `string` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `string` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `string` | URL to music video screenshot 3 |
| `strRateYourMusicID` | `string` | RateYourMusic ID |
| `strReleaseFormat` | `string` | Release format (CD, Vinyl, etc.) |
| `strReview` | `string` | Album review |
| `strSoundCloud` | `string` | SoundCloud profile URL |
| `strSpeed` | `string` | Album speed |
| `strSpotify` | `string` | Spotify artist URL |
| `strStyle` | `string` | Track style |
| `strTheme` | `string` | Track theme |
| `strTrack` | `string` | Track title |
| `strTrackLyrics` | `string` | Track lyrics |
| `strTrackThumb` | `string` | URL to track thumbnail |
| `strTwitter` | `string` | Twitter profile URL |
| `strWebsite` | `string` | Official website URL |
| `strWikidataID` | `string` | Wikidata ID |
| `strWikipediaID` | `string` | Wikipedia ID |
| `strYoutube` | `string` | YouTube channel URL |

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
| `idAlbum` | `int` | Unique album ID |
| `idArtist` | `int` | Artist ID |
| `idIMVDB` | `int` | IMVDB ID |
| `idLabel` | `int` | Label ID |
| `idLyric` | `int` | Lyrics ID |
| `idTrack` | `int` | Unique track ID |
| `intBornYear` | `int` | Birth year of the artist |
| `intCD` | `int` | CD number |
| `intCharted` | `int` | Chart position |
| `intDiedYear` | `int` | Year the artist died (if applicable) |
| `intDuration` | `int` | Track duration in milliseconds |
| `intFormedYear` | `int` | Year the artist/band was formed |
| `intLoved` | `int` | Number of loves/likes |
| `intMembers` | `int` | Number of band members |
| `intMusicVidComments` | `int` | Number of music video comments |
| `intMusicVidDislikes` | `int` | Number of music video dislikes |
| `intMusicVidFavorites` | `int` | Number of music video favorites |
| `intMusicVidLikes` | `int` | Number of music video likes |
| `intMusicVidViews` | `int` | Number of music video views |
| `intSales` | `int` | Number of sales |
| `intScore` | `int` | Album score |
| `intScoreVotes` | `int` | Number of score votes |
| `intTotalListeners` | `int` | Total number of listeners |
| `intTotalPlays` | `int` | Total number of plays |
| `intTrackNumber` | `int` | Track number on album |
| `intYearReleased` | `int` | Year the album was released |
| `strAlbum` | `string` | Album title |
| `strAlbum3DCase` | `string` | URL to 3D case image |
| `strAlbum3DFace` | `string` | URL to 3D face image |
| `strAlbum3DFlat` | `string` | URL to 3D flat image |
| `strAlbum3DThumb` | `string` | URL to 3D thumbnail |
| `strAlbumCDart` | `string` | URL to CD art |
| `strAlbumSpine` | `string` | URL to album spine image |
| `strAlbumStripped` | `string` | Album title without special characters |
| `strAlbumThumb` | `string` | URL to album thumbnail |
| `strAlbumThumbBack` | `string` | URL to back of album cover |
| `strAlbumThumbHQ` | `string` | URL to high quality album thumbnail |
| `strAllMusicID` | `string` | AllMusic ID |
| `strAmazonID` | `string` | Amazon ID |
| `strArtist` | `string` | Artist name |
| `strArtistAlternate` | `string` | Alternate artist name |
| `strArtistBanner` | `string` | URL to artist banner |
| `strArtistClearart` | `string` | URL to artist clearart |
| `strArtistCutout` | `string` | URL to artist cutout image |
| `strArtistFanart` | `string` | URL to artist fanart |
| `strArtistFanart2` | `string` | URL to alternate artist fanart |
| `strArtistFanart3` | `string` | URL to third artist fanart |
| `strArtistFanart4` | `string` | URL to fourth artist fanart |
| `strArtistLogo` | `string` | URL to artist logo |
| `strArtistStripped` | `string` | Artist name without special characters |
| `strArtistThumb` | `string` | URL to artist thumbnail image |
| `strArtistWideThumb` | `string` | URL to artist wide thumbnail |
| `strBBCReviewID` | `string` | BBC Review ID |
| `strBiographyCN` | `string` | Artist biography in Chinese |
| `strBiographyDE` | `string` | Artist biography in German |
| `strBiographyEN` | `string` | Artist biography in English |
| `strBiographyES` | `string` | Artist biography in Spanish |
| `strBiographyFR` | `string` | Artist biography in French |
| `strBiographyHU` | `string` | Artist biography in Hungarian |
| `strBiographyIL` | `string` | Artist biography in Hebrew |
| `strBiographyIT` | `string` | Artist biography in Italian |
| `strBiographyJP` | `string` | Artist biography in Japanese |
| `strBiographyNL` | `string` | Artist biography in Dutch |
| `strBiographyNO` | `string` | Artist biography in Norwegian |
| `strBiographyPL` | `string` | Artist biography in Polish |
| `strBiographyPT` | `string` | Artist biography in Portuguese |
| `strBiographyRU` | `string` | Artist biography in Russian |
| `strBiographySE` | `string` | Artist biography in Swedish |
| `strCountry` | `string` | Country of origin |
| `strCountryCode` | `string` | Country code |
| `strDescriptionEN` | `string` | Album description in English |
| `strDisbanded` | `string` | Disbanded status |
| `strDiscogsID` | `string` | Discogs ID |
| `strFacebook` | `string` | Facebook page URL |
| `strGender` | `string` | Artist gender |
| `strGeniusID` | `string` | Genius ID |
| `strGenre` | `string` | Album genre |
| `strItunesID` | `string` | iTunes ID |
| `strLabel` | `string` | Record label |
| `strLastFMChart` | `string` | Last.fm chart URL |
| `strLocation` | `string` | Recording location |
| `strLocked` | `string` | Whether the record is locked |
| `strLyricWikiID` | `string` | LyricWiki ID |
| `strMood` | `string` | Album mood |
| `strMusicBrainzAlbumID` | `string` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `string` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `string` | MusicBrainz Release Group ID |
| `strMusicMozID` | `string` | MusicMoz ID |
| `strMusicVid` | `string` | URL to music video |
| `strMusicVidCompany` | `string` | Music video production company |
| `strMusicVidDirector` | `string` | Music video director |
| `strMusicVidScreen1` | `string` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `string` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `string` | URL to music video screenshot 3 |
| `strRateYourMusicID` | `string` | RateYourMusic ID |
| `strReleaseFormat` | `string` | Release format (CD, Vinyl, etc.) |
| `strReview` | `string` | Album review |
| `strSpeed` | `string` | Album speed |
| `strStyle` | `string` | Album style |
| `strTheme` | `string` | Album theme |
| `strTrack` | `string` | Track title |
| `strTrackLyrics` | `string` | Track lyrics |
| `strTrackThumb` | `string` | URL to track thumbnail |
| `strTwitter` | `string` | Twitter profile URL |
| `strWebsite` | `string` | Official website URL |
| `strWikidataID` | `string` | Wikidata ID |
| `strWikipediaID` | `string` | Wikipedia ID |

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
$v2_lookup = $client->V2Lookup()->load(["album_id" => 1]);
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
$v2_search = $client->V2Search()->load(["album_name" => "album_name"]);
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
$v2lookup->load(["album_id" => 1]);

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
