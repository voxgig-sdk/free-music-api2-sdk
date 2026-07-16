# FreeMusicApi2 Lua SDK Reference

Complete API reference for the FreeMusicApi2 Lua SDK.


## FreeMusicApi2SDK

### Constructor

```lua
local sdk = require("free-music-api2_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `V1List(data)`

Create a new `V1List` entity instance. Pass `nil` for no initial data.

#### `V1Lookup(data)`

Create a new `V1Lookup` entity instance. Pass `nil` for no initial data.

#### `V1Search(data)`

Create a new `V1Search` entity instance. Pass `nil` for no initial data.

#### `V2List(data)`

Create a new `V2List` entity instance. Pass `nil` for no initial data.

#### `V2Lookup(data)`

Create a new `V2Lookup` entity instance. Pass `nil` for no initial data.

#### `V2Search(data)`

Create a new `V2Search` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## V1ListEntity

```lua
local v1_list = client:V1List(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id_album` | `number` | No |  |
| `id_artist` | `number` | No |  |
| `id_imvdb` | `number` | No |  |
| `id_lyric` | `number` | No |  |
| `id_track` | `number` | No |  |
| `int_cd` | `number` | No |  |
| `int_duration` | `number` | No |  |
| `int_loved` | `number` | No |  |
| `int_music_vid_comment` | `number` | No |  |
| `int_music_vid_dislike` | `number` | No |  |
| `int_music_vid_favorite` | `number` | No |  |
| `int_music_vid_like` | `number` | No |  |
| `int_music_vid_view` | `number` | No |  |
| `int_score` | `number` | No |  |
| `int_score_vote` | `number` | No |  |
| `int_total_listener` | `number` | No |  |
| `int_total_play` | `number` | No |  |
| `int_track_number` | `number` | No |  |
| `loved` | `table` | No |  |
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
| `trending` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:V1List():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1ListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V1LookupEntity

```lua
local v1_lookup = client:V1Lookup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id_album` | `number` | No |  |
| `id_artist` | `number` | No |  |
| `id_imvdb` | `number` | No |  |
| `id_label` | `number` | No |  |
| `id_lyric` | `number` | No |  |
| `id_track` | `number` | No |  |
| `int_born_year` | `number` | No |  |
| `int_cd` | `number` | No |  |
| `int_charted` | `number` | No |  |
| `int_died_year` | `number` | No |  |
| `int_duration` | `number` | No |  |
| `int_formed_year` | `number` | No |  |
| `int_loved` | `number` | No |  |
| `int_member` | `number` | No |  |
| `int_music_vid_comment` | `number` | No |  |
| `int_music_vid_dislike` | `number` | No |  |
| `int_music_vid_favorite` | `number` | No |  |
| `int_music_vid_like` | `number` | No |  |
| `int_music_vid_view` | `number` | No |  |
| `int_sale` | `number` | No |  |
| `int_score` | `number` | No |  |
| `int_score_vote` | `number` | No |  |
| `int_total_listener` | `number` | No |  |
| `int_total_play` | `number` | No |  |
| `int_track_number` | `number` | No |  |
| `int_year_released` | `number` | No |  |
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:V1Lookup():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1LookupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V1SearchEntity

```lua
local v1_search = client:V1Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id_album` | `number` | No |  |
| `id_artist` | `number` | No |  |
| `id_imvdb` | `number` | No |  |
| `id_label` | `number` | No |  |
| `id_lyric` | `number` | No |  |
| `id_track` | `number` | No |  |
| `int_born_year` | `number` | No |  |
| `int_cd` | `number` | No |  |
| `int_charted` | `number` | No |  |
| `int_died_year` | `number` | No |  |
| `int_duration` | `number` | No |  |
| `int_formed_year` | `number` | No |  |
| `int_loved` | `number` | No |  |
| `int_member` | `number` | No |  |
| `int_music_vid_comment` | `number` | No |  |
| `int_music_vid_dislike` | `number` | No |  |
| `int_music_vid_favorite` | `number` | No |  |
| `int_music_vid_like` | `number` | No |  |
| `int_music_vid_view` | `number` | No |  |
| `int_sale` | `number` | No |  |
| `int_score` | `number` | No |  |
| `int_score_vote` | `number` | No |  |
| `int_total_listener` | `number` | No |  |
| `int_total_play` | `number` | No |  |
| `int_track_number` | `number` | No |  |
| `int_year_released` | `number` | No |  |
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:V1Search():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V2ListEntity

```lua
local v2_list = client:V2List(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:V2List():load({ artist_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2ListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V2LookupEntity

```lua
local v2_lookup = client:V2Lookup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `table` | No |  |
| `artist` | `table` | No |  |
| `track` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:V2Lookup():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2LookupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V2SearchEntity

```lua
local v2_search = client:V2Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `table` | No |  |
| `artist` | `table` | No |  |
| `track` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:V2Search():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

