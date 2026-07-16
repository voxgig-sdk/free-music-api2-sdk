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
| `id_album` | `int` | No |  |
| `id_artist` | `int` | No |  |
| `id_imvdb` | `int` | No |  |
| `id_lyric` | `int` | No |  |
| `id_track` | `int` | No |  |
| `int_cd` | `int` | No |  |
| `int_duration` | `int` | No |  |
| `int_loved` | `int` | No |  |
| `int_music_vid_comment` | `int` | No |  |
| `int_music_vid_dislike` | `int` | No |  |
| `int_music_vid_favorite` | `int` | No |  |
| `int_music_vid_like` | `int` | No |  |
| `int_music_vid_view` | `int` | No |  |
| `int_score` | `int` | No |  |
| `int_score_vote` | `int` | No |  |
| `int_total_listener` | `int` | No |  |
| `int_total_play` | `int` | No |  |
| `int_track_number` | `int` | No |  |
| `loved` | `array` | No |  |
| `str_album` | `string` | No |  |
| `str_artist` | `string` | No |  |
| `str_artist_alternate` | `string` | No |  |
| `str_description_en` | `string` | No |  |
| `str_genre` | `string` | No |  |
| `str_locked` | `string` | No |  |
| `str_mood` | `string` | No |  |
| `str_music_brainz_album_id` | `string` | No |  |
| `str_music_brainz_artist_id` | `string` | No |  |
| `str_music_brainz_id` | `string` | No |  |
| `str_music_vid` | `string` | No |  |
| `str_music_vid_company` | `string` | No |  |
| `str_music_vid_director` | `string` | No |  |
| `str_music_vid_screen1` | `string` | No |  |
| `str_music_vid_screen2` | `string` | No |  |
| `str_music_vid_screen3` | `string` | No |  |
| `str_style` | `string` | No |  |
| `str_theme` | `string` | No |  |
| `str_track` | `string` | No |  |
| `str_track_lyric` | `string` | No |  |
| `str_track_thumb` | `string` | No |  |
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
| `id_album` | `int` | No |  |
| `id_artist` | `int` | No |  |
| `id_imvdb` | `int` | No |  |
| `id_label` | `int` | No |  |
| `id_lyric` | `int` | No |  |
| `id_track` | `int` | No |  |
| `int_born_year` | `int` | No |  |
| `int_cd` | `int` | No |  |
| `int_charted` | `int` | No |  |
| `int_died_year` | `int` | No |  |
| `int_duration` | `int` | No |  |
| `int_formed_year` | `int` | No |  |
| `int_loved` | `int` | No |  |
| `int_member` | `int` | No |  |
| `int_music_vid_comment` | `int` | No |  |
| `int_music_vid_dislike` | `int` | No |  |
| `int_music_vid_favorite` | `int` | No |  |
| `int_music_vid_like` | `int` | No |  |
| `int_music_vid_view` | `int` | No |  |
| `int_sale` | `int` | No |  |
| `int_score` | `int` | No |  |
| `int_score_vote` | `int` | No |  |
| `int_total_listener` | `int` | No |  |
| `int_total_play` | `int` | No |  |
| `int_track_number` | `int` | No |  |
| `int_year_released` | `int` | No |  |
| `str_album` | `string` | No |  |
| `str_album3_d_case` | `string` | No |  |
| `str_album3_d_face` | `string` | No |  |
| `str_album3_d_flat` | `string` | No |  |
| `str_album3_d_thumb` | `string` | No |  |
| `str_album_c_dart` | `string` | No |  |
| `str_album_spine` | `string` | No |  |
| `str_album_stripped` | `string` | No |  |
| `str_album_thumb` | `string` | No |  |
| `str_album_thumb_back` | `string` | No |  |
| `str_album_thumb_hq` | `string` | No |  |
| `str_all_music_id` | `string` | No |  |
| `str_amazon_id` | `string` | No |  |
| `str_apple_music` | `string` | No |  |
| `str_artist` | `string` | No |  |
| `str_artist_alternate` | `string` | No |  |
| `str_artist_banner` | `string` | No |  |
| `str_artist_clearart` | `string` | No |  |
| `str_artist_cutout` | `string` | No |  |
| `str_artist_fanart` | `string` | No |  |
| `str_artist_fanart2` | `string` | No |  |
| `str_artist_fanart3` | `string` | No |  |
| `str_artist_fanart4` | `string` | No |  |
| `str_artist_logo` | `string` | No |  |
| `str_artist_stripped` | `string` | No |  |
| `str_artist_thumb` | `string` | No |  |
| `str_artist_wide_thumb` | `string` | No |  |
| `str_bbc_review_id` | `string` | No |  |
| `str_biography_cn` | `string` | No |  |
| `str_biography_de` | `string` | No |  |
| `str_biography_e` | `string` | No |  |
| `str_biography_en` | `string` | No |  |
| `str_biography_fr` | `string` | No |  |
| `str_biography_hu` | `string` | No |  |
| `str_biography_il` | `string` | No |  |
| `str_biography_it` | `string` | No |  |
| `str_biography_jp` | `string` | No |  |
| `str_biography_nl` | `string` | No |  |
| `str_biography_no` | `string` | No |  |
| `str_biography_pl` | `string` | No |  |
| `str_biography_pt` | `string` | No |  |
| `str_biography_ru` | `string` | No |  |
| `str_biography_se` | `string` | No |  |
| `str_country` | `string` | No |  |
| `str_country_code` | `string` | No |  |
| `str_description_en` | `string` | No |  |
| `str_disbanded` | `string` | No |  |
| `str_discogs_id` | `string` | No |  |
| `str_facebook` | `string` | No |  |
| `str_gender` | `string` | No |  |
| `str_genius_id` | `string` | No |  |
| `str_genre` | `string` | No |  |
| `str_instagram` | `string` | No |  |
| `str_itunes_id` | `string` | No |  |
| `str_label` | `string` | No |  |
| `str_last_fm_chart` | `string` | No |  |
| `str_location` | `string` | No |  |
| `str_locked` | `string` | No |  |
| `str_lyric_wiki_id` | `string` | No |  |
| `str_mood` | `string` | No |  |
| `str_music_brainz_album_id` | `string` | No |  |
| `str_music_brainz_artist_id` | `string` | No |  |
| `str_music_brainz_id` | `string` | No |  |
| `str_music_moz_id` | `string` | No |  |
| `str_music_vid` | `string` | No |  |
| `str_music_vid_company` | `string` | No |  |
| `str_music_vid_director` | `string` | No |  |
| `str_music_vid_screen1` | `string` | No |  |
| `str_music_vid_screen2` | `string` | No |  |
| `str_music_vid_screen3` | `string` | No |  |
| `str_rate_your_music_id` | `string` | No |  |
| `str_release_format` | `string` | No |  |
| `str_review` | `string` | No |  |
| `str_sound_cloud` | `string` | No |  |
| `str_speed` | `string` | No |  |
| `str_spotify` | `string` | No |  |
| `str_style` | `string` | No |  |
| `str_theme` | `string` | No |  |
| `str_track` | `string` | No |  |
| `str_track_lyric` | `string` | No |  |
| `str_track_thumb` | `string` | No |  |
| `str_twitter` | `string` | No |  |
| `str_website` | `string` | No |  |
| `str_wikidata_id` | `string` | No |  |
| `str_wikipedia_id` | `string` | No |  |
| `str_youtube` | `string` | No |  |

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
| `id_album` | `int` | No |  |
| `id_artist` | `int` | No |  |
| `id_imvdb` | `int` | No |  |
| `id_label` | `int` | No |  |
| `id_lyric` | `int` | No |  |
| `id_track` | `int` | No |  |
| `int_born_year` | `int` | No |  |
| `int_cd` | `int` | No |  |
| `int_charted` | `int` | No |  |
| `int_died_year` | `int` | No |  |
| `int_duration` | `int` | No |  |
| `int_formed_year` | `int` | No |  |
| `int_loved` | `int` | No |  |
| `int_member` | `int` | No |  |
| `int_music_vid_comment` | `int` | No |  |
| `int_music_vid_dislike` | `int` | No |  |
| `int_music_vid_favorite` | `int` | No |  |
| `int_music_vid_like` | `int` | No |  |
| `int_music_vid_view` | `int` | No |  |
| `int_sale` | `int` | No |  |
| `int_score` | `int` | No |  |
| `int_score_vote` | `int` | No |  |
| `int_total_listener` | `int` | No |  |
| `int_total_play` | `int` | No |  |
| `int_track_number` | `int` | No |  |
| `int_year_released` | `int` | No |  |
| `str_album` | `string` | No |  |
| `str_album3_d_case` | `string` | No |  |
| `str_album3_d_face` | `string` | No |  |
| `str_album3_d_flat` | `string` | No |  |
| `str_album3_d_thumb` | `string` | No |  |
| `str_album_c_dart` | `string` | No |  |
| `str_album_spine` | `string` | No |  |
| `str_album_stripped` | `string` | No |  |
| `str_album_thumb` | `string` | No |  |
| `str_album_thumb_back` | `string` | No |  |
| `str_album_thumb_hq` | `string` | No |  |
| `str_all_music_id` | `string` | No |  |
| `str_amazon_id` | `string` | No |  |
| `str_artist` | `string` | No |  |
| `str_artist_alternate` | `string` | No |  |
| `str_artist_banner` | `string` | No |  |
| `str_artist_clearart` | `string` | No |  |
| `str_artist_cutout` | `string` | No |  |
| `str_artist_fanart` | `string` | No |  |
| `str_artist_fanart2` | `string` | No |  |
| `str_artist_fanart3` | `string` | No |  |
| `str_artist_fanart4` | `string` | No |  |
| `str_artist_logo` | `string` | No |  |
| `str_artist_stripped` | `string` | No |  |
| `str_artist_thumb` | `string` | No |  |
| `str_artist_wide_thumb` | `string` | No |  |
| `str_bbc_review_id` | `string` | No |  |
| `str_biography_cn` | `string` | No |  |
| `str_biography_de` | `string` | No |  |
| `str_biography_e` | `string` | No |  |
| `str_biography_en` | `string` | No |  |
| `str_biography_fr` | `string` | No |  |
| `str_biography_hu` | `string` | No |  |
| `str_biography_il` | `string` | No |  |
| `str_biography_it` | `string` | No |  |
| `str_biography_jp` | `string` | No |  |
| `str_biography_nl` | `string` | No |  |
| `str_biography_no` | `string` | No |  |
| `str_biography_pl` | `string` | No |  |
| `str_biography_pt` | `string` | No |  |
| `str_biography_ru` | `string` | No |  |
| `str_biography_se` | `string` | No |  |
| `str_country` | `string` | No |  |
| `str_country_code` | `string` | No |  |
| `str_description_en` | `string` | No |  |
| `str_disbanded` | `string` | No |  |
| `str_discogs_id` | `string` | No |  |
| `str_facebook` | `string` | No |  |
| `str_gender` | `string` | No |  |
| `str_genius_id` | `string` | No |  |
| `str_genre` | `string` | No |  |
| `str_itunes_id` | `string` | No |  |
| `str_label` | `string` | No |  |
| `str_last_fm_chart` | `string` | No |  |
| `str_location` | `string` | No |  |
| `str_locked` | `string` | No |  |
| `str_lyric_wiki_id` | `string` | No |  |
| `str_mood` | `string` | No |  |
| `str_music_brainz_album_id` | `string` | No |  |
| `str_music_brainz_artist_id` | `string` | No |  |
| `str_music_brainz_id` | `string` | No |  |
| `str_music_moz_id` | `string` | No |  |
| `str_music_vid` | `string` | No |  |
| `str_music_vid_company` | `string` | No |  |
| `str_music_vid_director` | `string` | No |  |
| `str_music_vid_screen1` | `string` | No |  |
| `str_music_vid_screen2` | `string` | No |  |
| `str_music_vid_screen3` | `string` | No |  |
| `str_rate_your_music_id` | `string` | No |  |
| `str_release_format` | `string` | No |  |
| `str_review` | `string` | No |  |
| `str_speed` | `string` | No |  |
| `str_style` | `string` | No |  |
| `str_theme` | `string` | No |  |
| `str_track` | `string` | No |  |
| `str_track_lyric` | `string` | No |  |
| `str_track_thumb` | `string` | No |  |
| `str_twitter` | `string` | No |  |
| `str_website` | `string` | No |  |
| `str_wikidata_id` | `string` | No |  |
| `str_wikipedia_id` | `string` | No |  |

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
| `album` | `array` | No |  |

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
| `album` | `array` | No |  |
| `artist` | `array` | No |  |
| `track` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->V2Lookup()->load();
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
| `album` | `array` | No |  |
| `artist` | `array` | No |  |
| `track` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->V2Search()->load();
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

