# FreeMusicApi2 PHP SDK



The PHP SDK for the FreeMusicApi2 API — an entity-oriented client using PHP conventions.

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
        echo $item["id"] . " " . $item["name"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
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
    echo "Error: " . $result["err"]->getMessage();
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

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = FreeMusicApi2SDK::test([
    "entity" => ["v1list" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$v1list = $client->V1List()->load(["id" => "test01"]);
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
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
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
| `id_album` | ``$INTEGER`` |  |
| `id_artist` | ``$INTEGER`` |  |
| `id_imvdb` | ``$INTEGER`` |  |
| `id_lyric` | ``$INTEGER`` |  |
| `id_track` | ``$INTEGER`` |  |
| `int_cd` | ``$INTEGER`` |  |
| `int_duration` | ``$INTEGER`` |  |
| `int_loved` | ``$INTEGER`` |  |
| `int_music_vid_comment` | ``$INTEGER`` |  |
| `int_music_vid_dislike` | ``$INTEGER`` |  |
| `int_music_vid_favorite` | ``$INTEGER`` |  |
| `int_music_vid_like` | ``$INTEGER`` |  |
| `int_music_vid_view` | ``$INTEGER`` |  |
| `int_score` | ``$INTEGER`` |  |
| `int_score_vote` | ``$INTEGER`` |  |
| `int_total_listener` | ``$INTEGER`` |  |
| `int_total_play` | ``$INTEGER`` |  |
| `int_track_number` | ``$INTEGER`` |  |
| `loved` | ``$ARRAY`` |  |
| `str_album` | ``$STRING`` |  |
| `str_artist` | ``$STRING`` |  |
| `str_artist_alternate` | ``$STRING`` |  |
| `str_description_en` | ``$STRING`` |  |
| `str_genre` | ``$STRING`` |  |
| `str_locked` | ``$STRING`` |  |
| `str_mood` | ``$STRING`` |  |
| `str_music_brainz_album_id` | ``$STRING`` |  |
| `str_music_brainz_artist_id` | ``$STRING`` |  |
| `str_music_brainz_id` | ``$STRING`` |  |
| `str_music_vid` | ``$STRING`` |  |
| `str_music_vid_company` | ``$STRING`` |  |
| `str_music_vid_director` | ``$STRING`` |  |
| `str_music_vid_screen1` | ``$STRING`` |  |
| `str_music_vid_screen2` | ``$STRING`` |  |
| `str_music_vid_screen3` | ``$STRING`` |  |
| `str_style` | ``$STRING`` |  |
| `str_theme` | ``$STRING`` |  |
| `str_track` | ``$STRING`` |  |
| `str_track_lyric` | ``$STRING`` |  |
| `str_track_thumb` | ``$STRING`` |  |
| `trending` | ``$ARRAY`` |  |

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
| `id_album` | ``$INTEGER`` |  |
| `id_artist` | ``$INTEGER`` |  |
| `id_imvdb` | ``$INTEGER`` |  |
| `id_label` | ``$INTEGER`` |  |
| `id_lyric` | ``$INTEGER`` |  |
| `id_track` | ``$INTEGER`` |  |
| `int_born_year` | ``$INTEGER`` |  |
| `int_cd` | ``$INTEGER`` |  |
| `int_charted` | ``$INTEGER`` |  |
| `int_died_year` | ``$INTEGER`` |  |
| `int_duration` | ``$INTEGER`` |  |
| `int_formed_year` | ``$INTEGER`` |  |
| `int_loved` | ``$INTEGER`` |  |
| `int_member` | ``$INTEGER`` |  |
| `int_music_vid_comment` | ``$INTEGER`` |  |
| `int_music_vid_dislike` | ``$INTEGER`` |  |
| `int_music_vid_favorite` | ``$INTEGER`` |  |
| `int_music_vid_like` | ``$INTEGER`` |  |
| `int_music_vid_view` | ``$INTEGER`` |  |
| `int_sale` | ``$INTEGER`` |  |
| `int_score` | ``$INTEGER`` |  |
| `int_score_vote` | ``$INTEGER`` |  |
| `int_total_listener` | ``$INTEGER`` |  |
| `int_total_play` | ``$INTEGER`` |  |
| `int_track_number` | ``$INTEGER`` |  |
| `int_year_released` | ``$INTEGER`` |  |
| `str_album` | ``$STRING`` |  |
| `str_album3_d_case` | ``$STRING`` |  |
| `str_album3_d_face` | ``$STRING`` |  |
| `str_album3_d_flat` | ``$STRING`` |  |
| `str_album3_d_thumb` | ``$STRING`` |  |
| `str_album_c_dart` | ``$STRING`` |  |
| `str_album_spine` | ``$STRING`` |  |
| `str_album_stripped` | ``$STRING`` |  |
| `str_album_thumb` | ``$STRING`` |  |
| `str_album_thumb_back` | ``$STRING`` |  |
| `str_album_thumb_hq` | ``$STRING`` |  |
| `str_all_music_id` | ``$STRING`` |  |
| `str_amazon_id` | ``$STRING`` |  |
| `str_apple_music` | ``$STRING`` |  |
| `str_artist` | ``$STRING`` |  |
| `str_artist_alternate` | ``$STRING`` |  |
| `str_artist_banner` | ``$STRING`` |  |
| `str_artist_clearart` | ``$STRING`` |  |
| `str_artist_cutout` | ``$STRING`` |  |
| `str_artist_fanart` | ``$STRING`` |  |
| `str_artist_fanart2` | ``$STRING`` |  |
| `str_artist_fanart3` | ``$STRING`` |  |
| `str_artist_fanart4` | ``$STRING`` |  |
| `str_artist_logo` | ``$STRING`` |  |
| `str_artist_stripped` | ``$STRING`` |  |
| `str_artist_thumb` | ``$STRING`` |  |
| `str_artist_wide_thumb` | ``$STRING`` |  |
| `str_bbc_review_id` | ``$STRING`` |  |
| `str_biography_cn` | ``$STRING`` |  |
| `str_biography_de` | ``$STRING`` |  |
| `str_biography_e` | ``$STRING`` |  |
| `str_biography_en` | ``$STRING`` |  |
| `str_biography_fr` | ``$STRING`` |  |
| `str_biography_hu` | ``$STRING`` |  |
| `str_biography_il` | ``$STRING`` |  |
| `str_biography_it` | ``$STRING`` |  |
| `str_biography_jp` | ``$STRING`` |  |
| `str_biography_nl` | ``$STRING`` |  |
| `str_biography_no` | ``$STRING`` |  |
| `str_biography_pl` | ``$STRING`` |  |
| `str_biography_pt` | ``$STRING`` |  |
| `str_biography_ru` | ``$STRING`` |  |
| `str_biography_se` | ``$STRING`` |  |
| `str_country` | ``$STRING`` |  |
| `str_country_code` | ``$STRING`` |  |
| `str_description_en` | ``$STRING`` |  |
| `str_disbanded` | ``$STRING`` |  |
| `str_discogs_id` | ``$STRING`` |  |
| `str_facebook` | ``$STRING`` |  |
| `str_gender` | ``$STRING`` |  |
| `str_genius_id` | ``$STRING`` |  |
| `str_genre` | ``$STRING`` |  |
| `str_instagram` | ``$STRING`` |  |
| `str_itunes_id` | ``$STRING`` |  |
| `str_label` | ``$STRING`` |  |
| `str_last_fm_chart` | ``$STRING`` |  |
| `str_location` | ``$STRING`` |  |
| `str_locked` | ``$STRING`` |  |
| `str_lyric_wiki_id` | ``$STRING`` |  |
| `str_mood` | ``$STRING`` |  |
| `str_music_brainz_album_id` | ``$STRING`` |  |
| `str_music_brainz_artist_id` | ``$STRING`` |  |
| `str_music_brainz_id` | ``$STRING`` |  |
| `str_music_moz_id` | ``$STRING`` |  |
| `str_music_vid` | ``$STRING`` |  |
| `str_music_vid_company` | ``$STRING`` |  |
| `str_music_vid_director` | ``$STRING`` |  |
| `str_music_vid_screen1` | ``$STRING`` |  |
| `str_music_vid_screen2` | ``$STRING`` |  |
| `str_music_vid_screen3` | ``$STRING`` |  |
| `str_rate_your_music_id` | ``$STRING`` |  |
| `str_release_format` | ``$STRING`` |  |
| `str_review` | ``$STRING`` |  |
| `str_sound_cloud` | ``$STRING`` |  |
| `str_speed` | ``$STRING`` |  |
| `str_spotify` | ``$STRING`` |  |
| `str_style` | ``$STRING`` |  |
| `str_theme` | ``$STRING`` |  |
| `str_track` | ``$STRING`` |  |
| `str_track_lyric` | ``$STRING`` |  |
| `str_track_thumb` | ``$STRING`` |  |
| `str_twitter` | ``$STRING`` |  |
| `str_website` | ``$STRING`` |  |
| `str_wikidata_id` | ``$STRING`` |  |
| `str_wikipedia_id` | ``$STRING`` |  |
| `str_youtube` | ``$STRING`` |  |

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
| `id_album` | ``$INTEGER`` |  |
| `id_artist` | ``$INTEGER`` |  |
| `id_imvdb` | ``$INTEGER`` |  |
| `id_label` | ``$INTEGER`` |  |
| `id_lyric` | ``$INTEGER`` |  |
| `id_track` | ``$INTEGER`` |  |
| `int_born_year` | ``$INTEGER`` |  |
| `int_cd` | ``$INTEGER`` |  |
| `int_charted` | ``$INTEGER`` |  |
| `int_died_year` | ``$INTEGER`` |  |
| `int_duration` | ``$INTEGER`` |  |
| `int_formed_year` | ``$INTEGER`` |  |
| `int_loved` | ``$INTEGER`` |  |
| `int_member` | ``$INTEGER`` |  |
| `int_music_vid_comment` | ``$INTEGER`` |  |
| `int_music_vid_dislike` | ``$INTEGER`` |  |
| `int_music_vid_favorite` | ``$INTEGER`` |  |
| `int_music_vid_like` | ``$INTEGER`` |  |
| `int_music_vid_view` | ``$INTEGER`` |  |
| `int_sale` | ``$INTEGER`` |  |
| `int_score` | ``$INTEGER`` |  |
| `int_score_vote` | ``$INTEGER`` |  |
| `int_total_listener` | ``$INTEGER`` |  |
| `int_total_play` | ``$INTEGER`` |  |
| `int_track_number` | ``$INTEGER`` |  |
| `int_year_released` | ``$INTEGER`` |  |
| `str_album` | ``$STRING`` |  |
| `str_album3_d_case` | ``$STRING`` |  |
| `str_album3_d_face` | ``$STRING`` |  |
| `str_album3_d_flat` | ``$STRING`` |  |
| `str_album3_d_thumb` | ``$STRING`` |  |
| `str_album_c_dart` | ``$STRING`` |  |
| `str_album_spine` | ``$STRING`` |  |
| `str_album_stripped` | ``$STRING`` |  |
| `str_album_thumb` | ``$STRING`` |  |
| `str_album_thumb_back` | ``$STRING`` |  |
| `str_album_thumb_hq` | ``$STRING`` |  |
| `str_all_music_id` | ``$STRING`` |  |
| `str_amazon_id` | ``$STRING`` |  |
| `str_artist` | ``$STRING`` |  |
| `str_artist_alternate` | ``$STRING`` |  |
| `str_artist_banner` | ``$STRING`` |  |
| `str_artist_clearart` | ``$STRING`` |  |
| `str_artist_cutout` | ``$STRING`` |  |
| `str_artist_fanart` | ``$STRING`` |  |
| `str_artist_fanart2` | ``$STRING`` |  |
| `str_artist_fanart3` | ``$STRING`` |  |
| `str_artist_fanart4` | ``$STRING`` |  |
| `str_artist_logo` | ``$STRING`` |  |
| `str_artist_stripped` | ``$STRING`` |  |
| `str_artist_thumb` | ``$STRING`` |  |
| `str_artist_wide_thumb` | ``$STRING`` |  |
| `str_bbc_review_id` | ``$STRING`` |  |
| `str_biography_cn` | ``$STRING`` |  |
| `str_biography_de` | ``$STRING`` |  |
| `str_biography_e` | ``$STRING`` |  |
| `str_biography_en` | ``$STRING`` |  |
| `str_biography_fr` | ``$STRING`` |  |
| `str_biography_hu` | ``$STRING`` |  |
| `str_biography_il` | ``$STRING`` |  |
| `str_biography_it` | ``$STRING`` |  |
| `str_biography_jp` | ``$STRING`` |  |
| `str_biography_nl` | ``$STRING`` |  |
| `str_biography_no` | ``$STRING`` |  |
| `str_biography_pl` | ``$STRING`` |  |
| `str_biography_pt` | ``$STRING`` |  |
| `str_biography_ru` | ``$STRING`` |  |
| `str_biography_se` | ``$STRING`` |  |
| `str_country` | ``$STRING`` |  |
| `str_country_code` | ``$STRING`` |  |
| `str_description_en` | ``$STRING`` |  |
| `str_disbanded` | ``$STRING`` |  |
| `str_discogs_id` | ``$STRING`` |  |
| `str_facebook` | ``$STRING`` |  |
| `str_gender` | ``$STRING`` |  |
| `str_genius_id` | ``$STRING`` |  |
| `str_genre` | ``$STRING`` |  |
| `str_itunes_id` | ``$STRING`` |  |
| `str_label` | ``$STRING`` |  |
| `str_last_fm_chart` | ``$STRING`` |  |
| `str_location` | ``$STRING`` |  |
| `str_locked` | ``$STRING`` |  |
| `str_lyric_wiki_id` | ``$STRING`` |  |
| `str_mood` | ``$STRING`` |  |
| `str_music_brainz_album_id` | ``$STRING`` |  |
| `str_music_brainz_artist_id` | ``$STRING`` |  |
| `str_music_brainz_id` | ``$STRING`` |  |
| `str_music_moz_id` | ``$STRING`` |  |
| `str_music_vid` | ``$STRING`` |  |
| `str_music_vid_company` | ``$STRING`` |  |
| `str_music_vid_director` | ``$STRING`` |  |
| `str_music_vid_screen1` | ``$STRING`` |  |
| `str_music_vid_screen2` | ``$STRING`` |  |
| `str_music_vid_screen3` | ``$STRING`` |  |
| `str_rate_your_music_id` | ``$STRING`` |  |
| `str_release_format` | ``$STRING`` |  |
| `str_review` | ``$STRING`` |  |
| `str_speed` | ``$STRING`` |  |
| `str_style` | ``$STRING`` |  |
| `str_theme` | ``$STRING`` |  |
| `str_track` | ``$STRING`` |  |
| `str_track_lyric` | ``$STRING`` |  |
| `str_track_thumb` | ``$STRING`` |  |
| `str_twitter` | ``$STRING`` |  |
| `str_website` | ``$STRING`` |  |
| `str_wikidata_id` | ``$STRING`` |  |
| `str_wikipedia_id` | ``$STRING`` |  |

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
| `album` | ``$ARRAY`` |  |

#### Example: Load

```php
// load() returns the bare V2List record (throws on error).
$v2_list = $client->V2List()->load(["id" => "v2_list_id"]);
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
| `album` | ``$ARRAY`` |  |
| `artist` | ``$ARRAY`` |  |
| `track` | ``$ARRAY`` |  |

#### Example: Load

```php
// load() returns the bare V2Lookup record (throws on error).
$v2_lookup = $client->V2Lookup()->load(["id" => "v2_lookup_id"]);
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
| `album` | ``$ARRAY`` |  |
| `artist` | ``$ARRAY`` |  |
| `track` | ``$ARRAY`` |  |

#### Example: Load

```php
// load() returns the bare V2Search record (throws on error).
$v2_search = $client->V2Search()->load(["id" => "v2_search_id"]);
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

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
$v1list = $client->V1List();
$v1list->load(["id" => "example_id"]);

// $v1list->dataGet() now returns the loaded v1list data
// $v1list->matchGet() returns the last match criteria
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
