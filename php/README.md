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
        echo $item["id_album"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a v2list

V2List is nested under artist, so provide the `artist_id`.

```php
try {
    // load() returns the bare V2List record (throws on error).
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
    $v1lists = $client->V1List()->list();
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

// Entity ops return the bare mock record (throws on error).
$v1list = $client->V1List()->list();
print_r($v1list);
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

Entity operations return the bare result data (an `array` for single-entity
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
| `id_album` |  |
| `id_artist` |  |
| `id_imvdb` |  |
| `id_lyric` |  |
| `id_track` |  |
| `int_cd` |  |
| `int_duration` |  |
| `int_loved` |  |
| `int_music_vid_comment` |  |
| `int_music_vid_dislike` |  |
| `int_music_vid_favorite` |  |
| `int_music_vid_like` |  |
| `int_music_vid_view` |  |
| `int_score` |  |
| `int_score_vote` |  |
| `int_total_listener` |  |
| `int_total_play` |  |
| `int_track_number` |  |
| `loved` |  |
| `str_album` |  |
| `str_artist` |  |
| `str_artist_alternate` |  |
| `str_description_en` |  |
| `str_genre` |  |
| `str_locked` |  |
| `str_mood` |  |
| `str_music_brainz_album_id` |  |
| `str_music_brainz_artist_id` |  |
| `str_music_brainz_id` |  |
| `str_music_vid` |  |
| `str_music_vid_company` |  |
| `str_music_vid_director` |  |
| `str_music_vid_screen1` |  |
| `str_music_vid_screen2` |  |
| `str_music_vid_screen3` |  |
| `str_style` |  |
| `str_theme` |  |
| `str_track` |  |
| `str_track_lyric` |  |
| `str_track_thumb` |  |
| `trending` |  |

Operations: List.

API path: `/trending.php`

#### V1Lookup

| Field | Description |
| --- | --- |
| `id_album` |  |
| `id_artist` |  |
| `id_imvdb` |  |
| `id_label` |  |
| `id_lyric` |  |
| `id_track` |  |
| `int_born_year` |  |
| `int_cd` |  |
| `int_charted` |  |
| `int_died_year` |  |
| `int_duration` |  |
| `int_formed_year` |  |
| `int_loved` |  |
| `int_member` |  |
| `int_music_vid_comment` |  |
| `int_music_vid_dislike` |  |
| `int_music_vid_favorite` |  |
| `int_music_vid_like` |  |
| `int_music_vid_view` |  |
| `int_sale` |  |
| `int_score` |  |
| `int_score_vote` |  |
| `int_total_listener` |  |
| `int_total_play` |  |
| `int_track_number` |  |
| `int_year_released` |  |
| `str_album` |  |
| `str_album3_d_case` |  |
| `str_album3_d_face` |  |
| `str_album3_d_flat` |  |
| `str_album3_d_thumb` |  |
| `str_album_c_dart` |  |
| `str_album_spine` |  |
| `str_album_stripped` |  |
| `str_album_thumb` |  |
| `str_album_thumb_back` |  |
| `str_album_thumb_hq` |  |
| `str_all_music_id` |  |
| `str_amazon_id` |  |
| `str_apple_music` |  |
| `str_artist` |  |
| `str_artist_alternate` |  |
| `str_artist_banner` |  |
| `str_artist_clearart` |  |
| `str_artist_cutout` |  |
| `str_artist_fanart` |  |
| `str_artist_fanart2` |  |
| `str_artist_fanart3` |  |
| `str_artist_fanart4` |  |
| `str_artist_logo` |  |
| `str_artist_stripped` |  |
| `str_artist_thumb` |  |
| `str_artist_wide_thumb` |  |
| `str_bbc_review_id` |  |
| `str_biography_cn` |  |
| `str_biography_de` |  |
| `str_biography_e` |  |
| `str_biography_en` |  |
| `str_biography_fr` |  |
| `str_biography_hu` |  |
| `str_biography_il` |  |
| `str_biography_it` |  |
| `str_biography_jp` |  |
| `str_biography_nl` |  |
| `str_biography_no` |  |
| `str_biography_pl` |  |
| `str_biography_pt` |  |
| `str_biography_ru` |  |
| `str_biography_se` |  |
| `str_country` |  |
| `str_country_code` |  |
| `str_description_en` |  |
| `str_disbanded` |  |
| `str_discogs_id` |  |
| `str_facebook` |  |
| `str_gender` |  |
| `str_genius_id` |  |
| `str_genre` |  |
| `str_instagram` |  |
| `str_itunes_id` |  |
| `str_label` |  |
| `str_last_fm_chart` |  |
| `str_location` |  |
| `str_locked` |  |
| `str_lyric_wiki_id` |  |
| `str_mood` |  |
| `str_music_brainz_album_id` |  |
| `str_music_brainz_artist_id` |  |
| `str_music_brainz_id` |  |
| `str_music_moz_id` |  |
| `str_music_vid` |  |
| `str_music_vid_company` |  |
| `str_music_vid_director` |  |
| `str_music_vid_screen1` |  |
| `str_music_vid_screen2` |  |
| `str_music_vid_screen3` |  |
| `str_rate_your_music_id` |  |
| `str_release_format` |  |
| `str_review` |  |
| `str_sound_cloud` |  |
| `str_speed` |  |
| `str_spotify` |  |
| `str_style` |  |
| `str_theme` |  |
| `str_track` |  |
| `str_track_lyric` |  |
| `str_track_thumb` |  |
| `str_twitter` |  |
| `str_website` |  |
| `str_wikidata_id` |  |
| `str_wikipedia_id` |  |
| `str_youtube` |  |

Operations: List.

API path: `/track.php`

#### V1Search

| Field | Description |
| --- | --- |
| `id_album` |  |
| `id_artist` |  |
| `id_imvdb` |  |
| `id_label` |  |
| `id_lyric` |  |
| `id_track` |  |
| `int_born_year` |  |
| `int_cd` |  |
| `int_charted` |  |
| `int_died_year` |  |
| `int_duration` |  |
| `int_formed_year` |  |
| `int_loved` |  |
| `int_member` |  |
| `int_music_vid_comment` |  |
| `int_music_vid_dislike` |  |
| `int_music_vid_favorite` |  |
| `int_music_vid_like` |  |
| `int_music_vid_view` |  |
| `int_sale` |  |
| `int_score` |  |
| `int_score_vote` |  |
| `int_total_listener` |  |
| `int_total_play` |  |
| `int_track_number` |  |
| `int_year_released` |  |
| `str_album` |  |
| `str_album3_d_case` |  |
| `str_album3_d_face` |  |
| `str_album3_d_flat` |  |
| `str_album3_d_thumb` |  |
| `str_album_c_dart` |  |
| `str_album_spine` |  |
| `str_album_stripped` |  |
| `str_album_thumb` |  |
| `str_album_thumb_back` |  |
| `str_album_thumb_hq` |  |
| `str_all_music_id` |  |
| `str_amazon_id` |  |
| `str_artist` |  |
| `str_artist_alternate` |  |
| `str_artist_banner` |  |
| `str_artist_clearart` |  |
| `str_artist_cutout` |  |
| `str_artist_fanart` |  |
| `str_artist_fanart2` |  |
| `str_artist_fanart3` |  |
| `str_artist_fanart4` |  |
| `str_artist_logo` |  |
| `str_artist_stripped` |  |
| `str_artist_thumb` |  |
| `str_artist_wide_thumb` |  |
| `str_bbc_review_id` |  |
| `str_biography_cn` |  |
| `str_biography_de` |  |
| `str_biography_e` |  |
| `str_biography_en` |  |
| `str_biography_fr` |  |
| `str_biography_hu` |  |
| `str_biography_il` |  |
| `str_biography_it` |  |
| `str_biography_jp` |  |
| `str_biography_nl` |  |
| `str_biography_no` |  |
| `str_biography_pl` |  |
| `str_biography_pt` |  |
| `str_biography_ru` |  |
| `str_biography_se` |  |
| `str_country` |  |
| `str_country_code` |  |
| `str_description_en` |  |
| `str_disbanded` |  |
| `str_discogs_id` |  |
| `str_facebook` |  |
| `str_gender` |  |
| `str_genius_id` |  |
| `str_genre` |  |
| `str_itunes_id` |  |
| `str_label` |  |
| `str_last_fm_chart` |  |
| `str_location` |  |
| `str_locked` |  |
| `str_lyric_wiki_id` |  |
| `str_mood` |  |
| `str_music_brainz_album_id` |  |
| `str_music_brainz_artist_id` |  |
| `str_music_brainz_id` |  |
| `str_music_moz_id` |  |
| `str_music_vid` |  |
| `str_music_vid_company` |  |
| `str_music_vid_director` |  |
| `str_music_vid_screen1` |  |
| `str_music_vid_screen2` |  |
| `str_music_vid_screen3` |  |
| `str_rate_your_music_id` |  |
| `str_release_format` |  |
| `str_review` |  |
| `str_speed` |  |
| `str_style` |  |
| `str_theme` |  |
| `str_track` |  |
| `str_track_lyric` |  |
| `str_track_thumb` |  |
| `str_twitter` |  |
| `str_website` |  |
| `str_wikidata_id` |  |
| `str_wikipedia_id` |  |

Operations: List.

API path: `/searchalbum.php`

#### V2List

| Field | Description |
| --- | --- |
| `album` |  |

Operations: Load.

API path: `/list/discography/{artistId}`

#### V2Lookup

| Field | Description |
| --- | --- |
| `album` |  |
| `artist` |  |
| `track` |  |

Operations: Load.

API path: `/lookup/album/{albumId}`

#### V2Search

| Field | Description |
| --- | --- |
| `album` |  |
| `artist` |  |
| `track` |  |

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
| `id_album` | `int` |  |
| `id_artist` | `int` |  |
| `id_imvdb` | `int` |  |
| `id_lyric` | `int` |  |
| `id_track` | `int` |  |
| `int_cd` | `int` |  |
| `int_duration` | `int` |  |
| `int_loved` | `int` |  |
| `int_music_vid_comment` | `int` |  |
| `int_music_vid_dislike` | `int` |  |
| `int_music_vid_favorite` | `int` |  |
| `int_music_vid_like` | `int` |  |
| `int_music_vid_view` | `int` |  |
| `int_score` | `int` |  |
| `int_score_vote` | `int` |  |
| `int_total_listener` | `int` |  |
| `int_total_play` | `int` |  |
| `int_track_number` | `int` |  |
| `loved` | `array` |  |
| `str_album` | `string` |  |
| `str_artist` | `string` |  |
| `str_artist_alternate` | `string` |  |
| `str_description_en` | `string` |  |
| `str_genre` | `string` |  |
| `str_locked` | `string` |  |
| `str_mood` | `string` |  |
| `str_music_brainz_album_id` | `string` |  |
| `str_music_brainz_artist_id` | `string` |  |
| `str_music_brainz_id` | `string` |  |
| `str_music_vid` | `string` |  |
| `str_music_vid_company` | `string` |  |
| `str_music_vid_director` | `string` |  |
| `str_music_vid_screen1` | `string` |  |
| `str_music_vid_screen2` | `string` |  |
| `str_music_vid_screen3` | `string` |  |
| `str_style` | `string` |  |
| `str_theme` | `string` |  |
| `str_track` | `string` |  |
| `str_track_lyric` | `string` |  |
| `str_track_thumb` | `string` |  |
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
| `id_album` | `int` |  |
| `id_artist` | `int` |  |
| `id_imvdb` | `int` |  |
| `id_label` | `int` |  |
| `id_lyric` | `int` |  |
| `id_track` | `int` |  |
| `int_born_year` | `int` |  |
| `int_cd` | `int` |  |
| `int_charted` | `int` |  |
| `int_died_year` | `int` |  |
| `int_duration` | `int` |  |
| `int_formed_year` | `int` |  |
| `int_loved` | `int` |  |
| `int_member` | `int` |  |
| `int_music_vid_comment` | `int` |  |
| `int_music_vid_dislike` | `int` |  |
| `int_music_vid_favorite` | `int` |  |
| `int_music_vid_like` | `int` |  |
| `int_music_vid_view` | `int` |  |
| `int_sale` | `int` |  |
| `int_score` | `int` |  |
| `int_score_vote` | `int` |  |
| `int_total_listener` | `int` |  |
| `int_total_play` | `int` |  |
| `int_track_number` | `int` |  |
| `int_year_released` | `int` |  |
| `str_album` | `string` |  |
| `str_album3_d_case` | `string` |  |
| `str_album3_d_face` | `string` |  |
| `str_album3_d_flat` | `string` |  |
| `str_album3_d_thumb` | `string` |  |
| `str_album_c_dart` | `string` |  |
| `str_album_spine` | `string` |  |
| `str_album_stripped` | `string` |  |
| `str_album_thumb` | `string` |  |
| `str_album_thumb_back` | `string` |  |
| `str_album_thumb_hq` | `string` |  |
| `str_all_music_id` | `string` |  |
| `str_amazon_id` | `string` |  |
| `str_apple_music` | `string` |  |
| `str_artist` | `string` |  |
| `str_artist_alternate` | `string` |  |
| `str_artist_banner` | `string` |  |
| `str_artist_clearart` | `string` |  |
| `str_artist_cutout` | `string` |  |
| `str_artist_fanart` | `string` |  |
| `str_artist_fanart2` | `string` |  |
| `str_artist_fanart3` | `string` |  |
| `str_artist_fanart4` | `string` |  |
| `str_artist_logo` | `string` |  |
| `str_artist_stripped` | `string` |  |
| `str_artist_thumb` | `string` |  |
| `str_artist_wide_thumb` | `string` |  |
| `str_bbc_review_id` | `string` |  |
| `str_biography_cn` | `string` |  |
| `str_biography_de` | `string` |  |
| `str_biography_e` | `string` |  |
| `str_biography_en` | `string` |  |
| `str_biography_fr` | `string` |  |
| `str_biography_hu` | `string` |  |
| `str_biography_il` | `string` |  |
| `str_biography_it` | `string` |  |
| `str_biography_jp` | `string` |  |
| `str_biography_nl` | `string` |  |
| `str_biography_no` | `string` |  |
| `str_biography_pl` | `string` |  |
| `str_biography_pt` | `string` |  |
| `str_biography_ru` | `string` |  |
| `str_biography_se` | `string` |  |
| `str_country` | `string` |  |
| `str_country_code` | `string` |  |
| `str_description_en` | `string` |  |
| `str_disbanded` | `string` |  |
| `str_discogs_id` | `string` |  |
| `str_facebook` | `string` |  |
| `str_gender` | `string` |  |
| `str_genius_id` | `string` |  |
| `str_genre` | `string` |  |
| `str_instagram` | `string` |  |
| `str_itunes_id` | `string` |  |
| `str_label` | `string` |  |
| `str_last_fm_chart` | `string` |  |
| `str_location` | `string` |  |
| `str_locked` | `string` |  |
| `str_lyric_wiki_id` | `string` |  |
| `str_mood` | `string` |  |
| `str_music_brainz_album_id` | `string` |  |
| `str_music_brainz_artist_id` | `string` |  |
| `str_music_brainz_id` | `string` |  |
| `str_music_moz_id` | `string` |  |
| `str_music_vid` | `string` |  |
| `str_music_vid_company` | `string` |  |
| `str_music_vid_director` | `string` |  |
| `str_music_vid_screen1` | `string` |  |
| `str_music_vid_screen2` | `string` |  |
| `str_music_vid_screen3` | `string` |  |
| `str_rate_your_music_id` | `string` |  |
| `str_release_format` | `string` |  |
| `str_review` | `string` |  |
| `str_sound_cloud` | `string` |  |
| `str_speed` | `string` |  |
| `str_spotify` | `string` |  |
| `str_style` | `string` |  |
| `str_theme` | `string` |  |
| `str_track` | `string` |  |
| `str_track_lyric` | `string` |  |
| `str_track_thumb` | `string` |  |
| `str_twitter` | `string` |  |
| `str_website` | `string` |  |
| `str_wikidata_id` | `string` |  |
| `str_wikipedia_id` | `string` |  |
| `str_youtube` | `string` |  |

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
| `id_album` | `int` |  |
| `id_artist` | `int` |  |
| `id_imvdb` | `int` |  |
| `id_label` | `int` |  |
| `id_lyric` | `int` |  |
| `id_track` | `int` |  |
| `int_born_year` | `int` |  |
| `int_cd` | `int` |  |
| `int_charted` | `int` |  |
| `int_died_year` | `int` |  |
| `int_duration` | `int` |  |
| `int_formed_year` | `int` |  |
| `int_loved` | `int` |  |
| `int_member` | `int` |  |
| `int_music_vid_comment` | `int` |  |
| `int_music_vid_dislike` | `int` |  |
| `int_music_vid_favorite` | `int` |  |
| `int_music_vid_like` | `int` |  |
| `int_music_vid_view` | `int` |  |
| `int_sale` | `int` |  |
| `int_score` | `int` |  |
| `int_score_vote` | `int` |  |
| `int_total_listener` | `int` |  |
| `int_total_play` | `int` |  |
| `int_track_number` | `int` |  |
| `int_year_released` | `int` |  |
| `str_album` | `string` |  |
| `str_album3_d_case` | `string` |  |
| `str_album3_d_face` | `string` |  |
| `str_album3_d_flat` | `string` |  |
| `str_album3_d_thumb` | `string` |  |
| `str_album_c_dart` | `string` |  |
| `str_album_spine` | `string` |  |
| `str_album_stripped` | `string` |  |
| `str_album_thumb` | `string` |  |
| `str_album_thumb_back` | `string` |  |
| `str_album_thumb_hq` | `string` |  |
| `str_all_music_id` | `string` |  |
| `str_amazon_id` | `string` |  |
| `str_artist` | `string` |  |
| `str_artist_alternate` | `string` |  |
| `str_artist_banner` | `string` |  |
| `str_artist_clearart` | `string` |  |
| `str_artist_cutout` | `string` |  |
| `str_artist_fanart` | `string` |  |
| `str_artist_fanart2` | `string` |  |
| `str_artist_fanart3` | `string` |  |
| `str_artist_fanart4` | `string` |  |
| `str_artist_logo` | `string` |  |
| `str_artist_stripped` | `string` |  |
| `str_artist_thumb` | `string` |  |
| `str_artist_wide_thumb` | `string` |  |
| `str_bbc_review_id` | `string` |  |
| `str_biography_cn` | `string` |  |
| `str_biography_de` | `string` |  |
| `str_biography_e` | `string` |  |
| `str_biography_en` | `string` |  |
| `str_biography_fr` | `string` |  |
| `str_biography_hu` | `string` |  |
| `str_biography_il` | `string` |  |
| `str_biography_it` | `string` |  |
| `str_biography_jp` | `string` |  |
| `str_biography_nl` | `string` |  |
| `str_biography_no` | `string` |  |
| `str_biography_pl` | `string` |  |
| `str_biography_pt` | `string` |  |
| `str_biography_ru` | `string` |  |
| `str_biography_se` | `string` |  |
| `str_country` | `string` |  |
| `str_country_code` | `string` |  |
| `str_description_en` | `string` |  |
| `str_disbanded` | `string` |  |
| `str_discogs_id` | `string` |  |
| `str_facebook` | `string` |  |
| `str_gender` | `string` |  |
| `str_genius_id` | `string` |  |
| `str_genre` | `string` |  |
| `str_itunes_id` | `string` |  |
| `str_label` | `string` |  |
| `str_last_fm_chart` | `string` |  |
| `str_location` | `string` |  |
| `str_locked` | `string` |  |
| `str_lyric_wiki_id` | `string` |  |
| `str_mood` | `string` |  |
| `str_music_brainz_album_id` | `string` |  |
| `str_music_brainz_artist_id` | `string` |  |
| `str_music_brainz_id` | `string` |  |
| `str_music_moz_id` | `string` |  |
| `str_music_vid` | `string` |  |
| `str_music_vid_company` | `string` |  |
| `str_music_vid_director` | `string` |  |
| `str_music_vid_screen1` | `string` |  |
| `str_music_vid_screen2` | `string` |  |
| `str_music_vid_screen3` | `string` |  |
| `str_rate_your_music_id` | `string` |  |
| `str_release_format` | `string` |  |
| `str_review` | `string` |  |
| `str_speed` | `string` |  |
| `str_style` | `string` |  |
| `str_theme` | `string` |  |
| `str_track` | `string` |  |
| `str_track_lyric` | `string` |  |
| `str_track_thumb` | `string` |  |
| `str_twitter` | `string` |  |
| `str_website` | `string` |  |
| `str_wikidata_id` | `string` |  |
| `str_wikipedia_id` | `string` |  |

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
| `album` | `array` |  |

#### Example: Load

```php
// load() returns the bare V2List record (throws on error).
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
| `album` | `array` |  |
| `artist` | `array` |  |
| `track` | `array` |  |

#### Example: Load

```php
// load() returns the bare V2Lookup record (throws on error).
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
| `album` | `array` |  |
| `artist` | `array` |  |
| `track` | `array` |  |

#### Example: Load

```php
// load() returns the bare V2Search record (throws on error).
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$v1list = $client->V1List();
$v1list->list();

// $v1list->data_get() now returns the v1list data from the last list
// $v1list->match_get() returns the last match criteria
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
