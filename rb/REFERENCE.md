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
| `id_album` | `Integer` | No |  |
| `id_artist` | `Integer` | No |  |
| `id_imvdb` | `Integer` | No |  |
| `id_lyric` | `Integer` | No |  |
| `id_track` | `Integer` | No |  |
| `int_cd` | `Integer` | No |  |
| `int_duration` | `Integer` | No |  |
| `int_loved` | `Integer` | No |  |
| `int_music_vid_comment` | `Integer` | No |  |
| `int_music_vid_dislike` | `Integer` | No |  |
| `int_music_vid_favorite` | `Integer` | No |  |
| `int_music_vid_like` | `Integer` | No |  |
| `int_music_vid_view` | `Integer` | No |  |
| `int_score` | `Integer` | No |  |
| `int_score_vote` | `Integer` | No |  |
| `int_total_listener` | `Integer` | No |  |
| `int_total_play` | `Integer` | No |  |
| `int_track_number` | `Integer` | No |  |
| `loved` | `Array` | No |  |
| `str_album` | `String` | No |  |
| `str_artist` | `String` | No |  |
| `str_artist_alternate` | `String` | No |  |
| `str_description_en` | `String` | No |  |
| `str_genre` | `String` | No |  |
| `str_locked` | `String` | No |  |
| `str_mood` | `String` | No |  |
| `str_music_brainz_album_id` | `String` | No |  |
| `str_music_brainz_artist_id` | `String` | No |  |
| `str_music_brainz_id` | `String` | No |  |
| `str_music_vid` | `String` | No |  |
| `str_music_vid_company` | `String` | No |  |
| `str_music_vid_director` | `String` | No |  |
| `str_music_vid_screen1` | `String` | No |  |
| `str_music_vid_screen2` | `String` | No |  |
| `str_music_vid_screen3` | `String` | No |  |
| `str_style` | `String` | No |  |
| `str_theme` | `String` | No |  |
| `str_track` | `String` | No |  |
| `str_track_lyric` | `String` | No |  |
| `str_track_thumb` | `String` | No |  |
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
| `id_album` | `Integer` | No |  |
| `id_artist` | `Integer` | No |  |
| `id_imvdb` | `Integer` | No |  |
| `id_label` | `Integer` | No |  |
| `id_lyric` | `Integer` | No |  |
| `id_track` | `Integer` | No |  |
| `int_born_year` | `Integer` | No |  |
| `int_cd` | `Integer` | No |  |
| `int_charted` | `Integer` | No |  |
| `int_died_year` | `Integer` | No |  |
| `int_duration` | `Integer` | No |  |
| `int_formed_year` | `Integer` | No |  |
| `int_loved` | `Integer` | No |  |
| `int_member` | `Integer` | No |  |
| `int_music_vid_comment` | `Integer` | No |  |
| `int_music_vid_dislike` | `Integer` | No |  |
| `int_music_vid_favorite` | `Integer` | No |  |
| `int_music_vid_like` | `Integer` | No |  |
| `int_music_vid_view` | `Integer` | No |  |
| `int_sale` | `Integer` | No |  |
| `int_score` | `Integer` | No |  |
| `int_score_vote` | `Integer` | No |  |
| `int_total_listener` | `Integer` | No |  |
| `int_total_play` | `Integer` | No |  |
| `int_track_number` | `Integer` | No |  |
| `int_year_released` | `Integer` | No |  |
| `str_album` | `String` | No |  |
| `str_album3_d_case` | `String` | No |  |
| `str_album3_d_face` | `String` | No |  |
| `str_album3_d_flat` | `String` | No |  |
| `str_album3_d_thumb` | `String` | No |  |
| `str_album_c_dart` | `String` | No |  |
| `str_album_spine` | `String` | No |  |
| `str_album_stripped` | `String` | No |  |
| `str_album_thumb` | `String` | No |  |
| `str_album_thumb_back` | `String` | No |  |
| `str_album_thumb_hq` | `String` | No |  |
| `str_all_music_id` | `String` | No |  |
| `str_amazon_id` | `String` | No |  |
| `str_apple_music` | `String` | No |  |
| `str_artist` | `String` | No |  |
| `str_artist_alternate` | `String` | No |  |
| `str_artist_banner` | `String` | No |  |
| `str_artist_clearart` | `String` | No |  |
| `str_artist_cutout` | `String` | No |  |
| `str_artist_fanart` | `String` | No |  |
| `str_artist_fanart2` | `String` | No |  |
| `str_artist_fanart3` | `String` | No |  |
| `str_artist_fanart4` | `String` | No |  |
| `str_artist_logo` | `String` | No |  |
| `str_artist_stripped` | `String` | No |  |
| `str_artist_thumb` | `String` | No |  |
| `str_artist_wide_thumb` | `String` | No |  |
| `str_bbc_review_id` | `String` | No |  |
| `str_biography_cn` | `String` | No |  |
| `str_biography_de` | `String` | No |  |
| `str_biography_e` | `String` | No |  |
| `str_biography_en` | `String` | No |  |
| `str_biography_fr` | `String` | No |  |
| `str_biography_hu` | `String` | No |  |
| `str_biography_il` | `String` | No |  |
| `str_biography_it` | `String` | No |  |
| `str_biography_jp` | `String` | No |  |
| `str_biography_nl` | `String` | No |  |
| `str_biography_no` | `String` | No |  |
| `str_biography_pl` | `String` | No |  |
| `str_biography_pt` | `String` | No |  |
| `str_biography_ru` | `String` | No |  |
| `str_biography_se` | `String` | No |  |
| `str_country` | `String` | No |  |
| `str_country_code` | `String` | No |  |
| `str_description_en` | `String` | No |  |
| `str_disbanded` | `String` | No |  |
| `str_discogs_id` | `String` | No |  |
| `str_facebook` | `String` | No |  |
| `str_gender` | `String` | No |  |
| `str_genius_id` | `String` | No |  |
| `str_genre` | `String` | No |  |
| `str_instagram` | `String` | No |  |
| `str_itunes_id` | `String` | No |  |
| `str_label` | `String` | No |  |
| `str_last_fm_chart` | `String` | No |  |
| `str_location` | `String` | No |  |
| `str_locked` | `String` | No |  |
| `str_lyric_wiki_id` | `String` | No |  |
| `str_mood` | `String` | No |  |
| `str_music_brainz_album_id` | `String` | No |  |
| `str_music_brainz_artist_id` | `String` | No |  |
| `str_music_brainz_id` | `String` | No |  |
| `str_music_moz_id` | `String` | No |  |
| `str_music_vid` | `String` | No |  |
| `str_music_vid_company` | `String` | No |  |
| `str_music_vid_director` | `String` | No |  |
| `str_music_vid_screen1` | `String` | No |  |
| `str_music_vid_screen2` | `String` | No |  |
| `str_music_vid_screen3` | `String` | No |  |
| `str_rate_your_music_id` | `String` | No |  |
| `str_release_format` | `String` | No |  |
| `str_review` | `String` | No |  |
| `str_sound_cloud` | `String` | No |  |
| `str_speed` | `String` | No |  |
| `str_spotify` | `String` | No |  |
| `str_style` | `String` | No |  |
| `str_theme` | `String` | No |  |
| `str_track` | `String` | No |  |
| `str_track_lyric` | `String` | No |  |
| `str_track_thumb` | `String` | No |  |
| `str_twitter` | `String` | No |  |
| `str_website` | `String` | No |  |
| `str_wikidata_id` | `String` | No |  |
| `str_wikipedia_id` | `String` | No |  |
| `str_youtube` | `String` | No |  |

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
| `id_album` | `Integer` | No |  |
| `id_artist` | `Integer` | No |  |
| `id_imvdb` | `Integer` | No |  |
| `id_label` | `Integer` | No |  |
| `id_lyric` | `Integer` | No |  |
| `id_track` | `Integer` | No |  |
| `int_born_year` | `Integer` | No |  |
| `int_cd` | `Integer` | No |  |
| `int_charted` | `Integer` | No |  |
| `int_died_year` | `Integer` | No |  |
| `int_duration` | `Integer` | No |  |
| `int_formed_year` | `Integer` | No |  |
| `int_loved` | `Integer` | No |  |
| `int_member` | `Integer` | No |  |
| `int_music_vid_comment` | `Integer` | No |  |
| `int_music_vid_dislike` | `Integer` | No |  |
| `int_music_vid_favorite` | `Integer` | No |  |
| `int_music_vid_like` | `Integer` | No |  |
| `int_music_vid_view` | `Integer` | No |  |
| `int_sale` | `Integer` | No |  |
| `int_score` | `Integer` | No |  |
| `int_score_vote` | `Integer` | No |  |
| `int_total_listener` | `Integer` | No |  |
| `int_total_play` | `Integer` | No |  |
| `int_track_number` | `Integer` | No |  |
| `int_year_released` | `Integer` | No |  |
| `str_album` | `String` | No |  |
| `str_album3_d_case` | `String` | No |  |
| `str_album3_d_face` | `String` | No |  |
| `str_album3_d_flat` | `String` | No |  |
| `str_album3_d_thumb` | `String` | No |  |
| `str_album_c_dart` | `String` | No |  |
| `str_album_spine` | `String` | No |  |
| `str_album_stripped` | `String` | No |  |
| `str_album_thumb` | `String` | No |  |
| `str_album_thumb_back` | `String` | No |  |
| `str_album_thumb_hq` | `String` | No |  |
| `str_all_music_id` | `String` | No |  |
| `str_amazon_id` | `String` | No |  |
| `str_artist` | `String` | No |  |
| `str_artist_alternate` | `String` | No |  |
| `str_artist_banner` | `String` | No |  |
| `str_artist_clearart` | `String` | No |  |
| `str_artist_cutout` | `String` | No |  |
| `str_artist_fanart` | `String` | No |  |
| `str_artist_fanart2` | `String` | No |  |
| `str_artist_fanart3` | `String` | No |  |
| `str_artist_fanart4` | `String` | No |  |
| `str_artist_logo` | `String` | No |  |
| `str_artist_stripped` | `String` | No |  |
| `str_artist_thumb` | `String` | No |  |
| `str_artist_wide_thumb` | `String` | No |  |
| `str_bbc_review_id` | `String` | No |  |
| `str_biography_cn` | `String` | No |  |
| `str_biography_de` | `String` | No |  |
| `str_biography_e` | `String` | No |  |
| `str_biography_en` | `String` | No |  |
| `str_biography_fr` | `String` | No |  |
| `str_biography_hu` | `String` | No |  |
| `str_biography_il` | `String` | No |  |
| `str_biography_it` | `String` | No |  |
| `str_biography_jp` | `String` | No |  |
| `str_biography_nl` | `String` | No |  |
| `str_biography_no` | `String` | No |  |
| `str_biography_pl` | `String` | No |  |
| `str_biography_pt` | `String` | No |  |
| `str_biography_ru` | `String` | No |  |
| `str_biography_se` | `String` | No |  |
| `str_country` | `String` | No |  |
| `str_country_code` | `String` | No |  |
| `str_description_en` | `String` | No |  |
| `str_disbanded` | `String` | No |  |
| `str_discogs_id` | `String` | No |  |
| `str_facebook` | `String` | No |  |
| `str_gender` | `String` | No |  |
| `str_genius_id` | `String` | No |  |
| `str_genre` | `String` | No |  |
| `str_itunes_id` | `String` | No |  |
| `str_label` | `String` | No |  |
| `str_last_fm_chart` | `String` | No |  |
| `str_location` | `String` | No |  |
| `str_locked` | `String` | No |  |
| `str_lyric_wiki_id` | `String` | No |  |
| `str_mood` | `String` | No |  |
| `str_music_brainz_album_id` | `String` | No |  |
| `str_music_brainz_artist_id` | `String` | No |  |
| `str_music_brainz_id` | `String` | No |  |
| `str_music_moz_id` | `String` | No |  |
| `str_music_vid` | `String` | No |  |
| `str_music_vid_company` | `String` | No |  |
| `str_music_vid_director` | `String` | No |  |
| `str_music_vid_screen1` | `String` | No |  |
| `str_music_vid_screen2` | `String` | No |  |
| `str_music_vid_screen3` | `String` | No |  |
| `str_rate_your_music_id` | `String` | No |  |
| `str_release_format` | `String` | No |  |
| `str_review` | `String` | No |  |
| `str_speed` | `String` | No |  |
| `str_style` | `String` | No |  |
| `str_theme` | `String` | No |  |
| `str_track` | `String` | No |  |
| `str_track_lyric` | `String` | No |  |
| `str_track_thumb` | `String` | No |  |
| `str_twitter` | `String` | No |  |
| `str_website` | `String` | No |  |
| `str_wikidata_id` | `String` | No |  |
| `str_wikipedia_id` | `String` | No |  |

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
| `album` | `Array` | No |  |

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
| `album` | `Array` | No |  |
| `artist` | `Array` | No |  |
| `track` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V2Lookup.load()
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
| `album` | `Array` | No |  |
| `artist` | `Array` | No |  |
| `track` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V2Search.load()
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

