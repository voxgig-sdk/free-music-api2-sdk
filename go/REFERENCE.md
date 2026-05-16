# FreeMusicApi2 Golang SDK Reference

Complete API reference for the FreeMusicApi2 Golang SDK.


## FreeMusicApi2SDK

### Constructor

```go
func NewFreeMusicApi2SDK(options map[string]any) *FreeMusicApi2SDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TestSDK(testopts, sdkopts map[string]any) *FreeMusicApi2SDK`

Create a test client with mock features active. Both arguments may be `nil`.

```go
client := sdk.TestSDK(nil, nil)
```


### Instance Methods

#### `V1List(data map[string]any) FreeMusicApi2Entity`

Create a new `V1List` entity instance. Pass `nil` for no initial data.

#### `V1Lookup(data map[string]any) FreeMusicApi2Entity`

Create a new `V1Lookup` entity instance. Pass `nil` for no initial data.

#### `V1Search(data map[string]any) FreeMusicApi2Entity`

Create a new `V1Search` entity instance. Pass `nil` for no initial data.

#### `V2List(data map[string]any) FreeMusicApi2Entity`

Create a new `V2List` entity instance. Pass `nil` for no initial data.

#### `V2Lookup(data map[string]any) FreeMusicApi2Entity`

Create a new `V2Lookup` entity instance. Pass `nil` for no initial data.

#### `V2Search(data map[string]any) FreeMusicApi2Entity`

Create a new `V2Search` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## V1ListEntity

```go
v1_list := client.V1List(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id_album` | ``$INTEGER`` | No |  |
| `id_artist` | ``$INTEGER`` | No |  |
| `id_imvdb` | ``$INTEGER`` | No |  |
| `id_lyric` | ``$INTEGER`` | No |  |
| `id_track` | ``$INTEGER`` | No |  |
| `int_cd` | ``$INTEGER`` | No |  |
| `int_duration` | ``$INTEGER`` | No |  |
| `int_loved` | ``$INTEGER`` | No |  |
| `int_music_vid_comment` | ``$INTEGER`` | No |  |
| `int_music_vid_dislike` | ``$INTEGER`` | No |  |
| `int_music_vid_favorite` | ``$INTEGER`` | No |  |
| `int_music_vid_like` | ``$INTEGER`` | No |  |
| `int_music_vid_view` | ``$INTEGER`` | No |  |
| `int_score` | ``$INTEGER`` | No |  |
| `int_score_vote` | ``$INTEGER`` | No |  |
| `int_total_listener` | ``$INTEGER`` | No |  |
| `int_total_play` | ``$INTEGER`` | No |  |
| `int_track_number` | ``$INTEGER`` | No |  |
| `loved` | ``$ARRAY`` | No |  |
| `str_album` | ``$STRING`` | No |  |
| `str_artist` | ``$STRING`` | No |  |
| `str_artist_alternate` | ``$STRING`` | No |  |
| `str_description_en` | ``$STRING`` | No |  |
| `str_genre` | ``$STRING`` | No |  |
| `str_locked` | ``$STRING`` | No |  |
| `str_mood` | ``$STRING`` | No |  |
| `str_music_brainz_album_id` | ``$STRING`` | No |  |
| `str_music_brainz_artist_id` | ``$STRING`` | No |  |
| `str_music_brainz_id` | ``$STRING`` | No |  |
| `str_music_vid` | ``$STRING`` | No |  |
| `str_music_vid_company` | ``$STRING`` | No |  |
| `str_music_vid_director` | ``$STRING`` | No |  |
| `str_music_vid_screen1` | ``$STRING`` | No |  |
| `str_music_vid_screen2` | ``$STRING`` | No |  |
| `str_music_vid_screen3` | ``$STRING`` | No |  |
| `str_style` | ``$STRING`` | No |  |
| `str_theme` | ``$STRING`` | No |  |
| `str_track` | ``$STRING`` | No |  |
| `str_track_lyric` | ``$STRING`` | No |  |
| `str_track_thumb` | ``$STRING`` | No |  |
| `trending` | ``$ARRAY`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V1List(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V1ListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V1LookupEntity

```go
v1_lookup := client.V1Lookup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id_album` | ``$INTEGER`` | No |  |
| `id_artist` | ``$INTEGER`` | No |  |
| `id_imvdb` | ``$INTEGER`` | No |  |
| `id_label` | ``$INTEGER`` | No |  |
| `id_lyric` | ``$INTEGER`` | No |  |
| `id_track` | ``$INTEGER`` | No |  |
| `int_born_year` | ``$INTEGER`` | No |  |
| `int_cd` | ``$INTEGER`` | No |  |
| `int_charted` | ``$INTEGER`` | No |  |
| `int_died_year` | ``$INTEGER`` | No |  |
| `int_duration` | ``$INTEGER`` | No |  |
| `int_formed_year` | ``$INTEGER`` | No |  |
| `int_loved` | ``$INTEGER`` | No |  |
| `int_member` | ``$INTEGER`` | No |  |
| `int_music_vid_comment` | ``$INTEGER`` | No |  |
| `int_music_vid_dislike` | ``$INTEGER`` | No |  |
| `int_music_vid_favorite` | ``$INTEGER`` | No |  |
| `int_music_vid_like` | ``$INTEGER`` | No |  |
| `int_music_vid_view` | ``$INTEGER`` | No |  |
| `int_sale` | ``$INTEGER`` | No |  |
| `int_score` | ``$INTEGER`` | No |  |
| `int_score_vote` | ``$INTEGER`` | No |  |
| `int_total_listener` | ``$INTEGER`` | No |  |
| `int_total_play` | ``$INTEGER`` | No |  |
| `int_track_number` | ``$INTEGER`` | No |  |
| `int_year_released` | ``$INTEGER`` | No |  |
| `str_album` | ``$STRING`` | No |  |
| `str_album3_d_case` | ``$STRING`` | No |  |
| `str_album3_d_face` | ``$STRING`` | No |  |
| `str_album3_d_flat` | ``$STRING`` | No |  |
| `str_album3_d_thumb` | ``$STRING`` | No |  |
| `str_album_c_dart` | ``$STRING`` | No |  |
| `str_album_spine` | ``$STRING`` | No |  |
| `str_album_stripped` | ``$STRING`` | No |  |
| `str_album_thumb` | ``$STRING`` | No |  |
| `str_album_thumb_back` | ``$STRING`` | No |  |
| `str_album_thumb_hq` | ``$STRING`` | No |  |
| `str_all_music_id` | ``$STRING`` | No |  |
| `str_amazon_id` | ``$STRING`` | No |  |
| `str_apple_music` | ``$STRING`` | No |  |
| `str_artist` | ``$STRING`` | No |  |
| `str_artist_alternate` | ``$STRING`` | No |  |
| `str_artist_banner` | ``$STRING`` | No |  |
| `str_artist_clearart` | ``$STRING`` | No |  |
| `str_artist_cutout` | ``$STRING`` | No |  |
| `str_artist_fanart` | ``$STRING`` | No |  |
| `str_artist_fanart2` | ``$STRING`` | No |  |
| `str_artist_fanart3` | ``$STRING`` | No |  |
| `str_artist_fanart4` | ``$STRING`` | No |  |
| `str_artist_logo` | ``$STRING`` | No |  |
| `str_artist_stripped` | ``$STRING`` | No |  |
| `str_artist_thumb` | ``$STRING`` | No |  |
| `str_artist_wide_thumb` | ``$STRING`` | No |  |
| `str_bbc_review_id` | ``$STRING`` | No |  |
| `str_biography_cn` | ``$STRING`` | No |  |
| `str_biography_de` | ``$STRING`` | No |  |
| `str_biography_e` | ``$STRING`` | No |  |
| `str_biography_en` | ``$STRING`` | No |  |
| `str_biography_fr` | ``$STRING`` | No |  |
| `str_biography_hu` | ``$STRING`` | No |  |
| `str_biography_il` | ``$STRING`` | No |  |
| `str_biography_it` | ``$STRING`` | No |  |
| `str_biography_jp` | ``$STRING`` | No |  |
| `str_biography_nl` | ``$STRING`` | No |  |
| `str_biography_no` | ``$STRING`` | No |  |
| `str_biography_pl` | ``$STRING`` | No |  |
| `str_biography_pt` | ``$STRING`` | No |  |
| `str_biography_ru` | ``$STRING`` | No |  |
| `str_biography_se` | ``$STRING`` | No |  |
| `str_country` | ``$STRING`` | No |  |
| `str_country_code` | ``$STRING`` | No |  |
| `str_description_en` | ``$STRING`` | No |  |
| `str_disbanded` | ``$STRING`` | No |  |
| `str_discogs_id` | ``$STRING`` | No |  |
| `str_facebook` | ``$STRING`` | No |  |
| `str_gender` | ``$STRING`` | No |  |
| `str_genius_id` | ``$STRING`` | No |  |
| `str_genre` | ``$STRING`` | No |  |
| `str_instagram` | ``$STRING`` | No |  |
| `str_itunes_id` | ``$STRING`` | No |  |
| `str_label` | ``$STRING`` | No |  |
| `str_last_fm_chart` | ``$STRING`` | No |  |
| `str_location` | ``$STRING`` | No |  |
| `str_locked` | ``$STRING`` | No |  |
| `str_lyric_wiki_id` | ``$STRING`` | No |  |
| `str_mood` | ``$STRING`` | No |  |
| `str_music_brainz_album_id` | ``$STRING`` | No |  |
| `str_music_brainz_artist_id` | ``$STRING`` | No |  |
| `str_music_brainz_id` | ``$STRING`` | No |  |
| `str_music_moz_id` | ``$STRING`` | No |  |
| `str_music_vid` | ``$STRING`` | No |  |
| `str_music_vid_company` | ``$STRING`` | No |  |
| `str_music_vid_director` | ``$STRING`` | No |  |
| `str_music_vid_screen1` | ``$STRING`` | No |  |
| `str_music_vid_screen2` | ``$STRING`` | No |  |
| `str_music_vid_screen3` | ``$STRING`` | No |  |
| `str_rate_your_music_id` | ``$STRING`` | No |  |
| `str_release_format` | ``$STRING`` | No |  |
| `str_review` | ``$STRING`` | No |  |
| `str_sound_cloud` | ``$STRING`` | No |  |
| `str_speed` | ``$STRING`` | No |  |
| `str_spotify` | ``$STRING`` | No |  |
| `str_style` | ``$STRING`` | No |  |
| `str_theme` | ``$STRING`` | No |  |
| `str_track` | ``$STRING`` | No |  |
| `str_track_lyric` | ``$STRING`` | No |  |
| `str_track_thumb` | ``$STRING`` | No |  |
| `str_twitter` | ``$STRING`` | No |  |
| `str_website` | ``$STRING`` | No |  |
| `str_wikidata_id` | ``$STRING`` | No |  |
| `str_wikipedia_id` | ``$STRING`` | No |  |
| `str_youtube` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V1Lookup(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V1LookupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V1SearchEntity

```go
v1_search := client.V1Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id_album` | ``$INTEGER`` | No |  |
| `id_artist` | ``$INTEGER`` | No |  |
| `id_imvdb` | ``$INTEGER`` | No |  |
| `id_label` | ``$INTEGER`` | No |  |
| `id_lyric` | ``$INTEGER`` | No |  |
| `id_track` | ``$INTEGER`` | No |  |
| `int_born_year` | ``$INTEGER`` | No |  |
| `int_cd` | ``$INTEGER`` | No |  |
| `int_charted` | ``$INTEGER`` | No |  |
| `int_died_year` | ``$INTEGER`` | No |  |
| `int_duration` | ``$INTEGER`` | No |  |
| `int_formed_year` | ``$INTEGER`` | No |  |
| `int_loved` | ``$INTEGER`` | No |  |
| `int_member` | ``$INTEGER`` | No |  |
| `int_music_vid_comment` | ``$INTEGER`` | No |  |
| `int_music_vid_dislike` | ``$INTEGER`` | No |  |
| `int_music_vid_favorite` | ``$INTEGER`` | No |  |
| `int_music_vid_like` | ``$INTEGER`` | No |  |
| `int_music_vid_view` | ``$INTEGER`` | No |  |
| `int_sale` | ``$INTEGER`` | No |  |
| `int_score` | ``$INTEGER`` | No |  |
| `int_score_vote` | ``$INTEGER`` | No |  |
| `int_total_listener` | ``$INTEGER`` | No |  |
| `int_total_play` | ``$INTEGER`` | No |  |
| `int_track_number` | ``$INTEGER`` | No |  |
| `int_year_released` | ``$INTEGER`` | No |  |
| `str_album` | ``$STRING`` | No |  |
| `str_album3_d_case` | ``$STRING`` | No |  |
| `str_album3_d_face` | ``$STRING`` | No |  |
| `str_album3_d_flat` | ``$STRING`` | No |  |
| `str_album3_d_thumb` | ``$STRING`` | No |  |
| `str_album_c_dart` | ``$STRING`` | No |  |
| `str_album_spine` | ``$STRING`` | No |  |
| `str_album_stripped` | ``$STRING`` | No |  |
| `str_album_thumb` | ``$STRING`` | No |  |
| `str_album_thumb_back` | ``$STRING`` | No |  |
| `str_album_thumb_hq` | ``$STRING`` | No |  |
| `str_all_music_id` | ``$STRING`` | No |  |
| `str_amazon_id` | ``$STRING`` | No |  |
| `str_artist` | ``$STRING`` | No |  |
| `str_artist_alternate` | ``$STRING`` | No |  |
| `str_artist_banner` | ``$STRING`` | No |  |
| `str_artist_clearart` | ``$STRING`` | No |  |
| `str_artist_cutout` | ``$STRING`` | No |  |
| `str_artist_fanart` | ``$STRING`` | No |  |
| `str_artist_fanart2` | ``$STRING`` | No |  |
| `str_artist_fanart3` | ``$STRING`` | No |  |
| `str_artist_fanart4` | ``$STRING`` | No |  |
| `str_artist_logo` | ``$STRING`` | No |  |
| `str_artist_stripped` | ``$STRING`` | No |  |
| `str_artist_thumb` | ``$STRING`` | No |  |
| `str_artist_wide_thumb` | ``$STRING`` | No |  |
| `str_bbc_review_id` | ``$STRING`` | No |  |
| `str_biography_cn` | ``$STRING`` | No |  |
| `str_biography_de` | ``$STRING`` | No |  |
| `str_biography_e` | ``$STRING`` | No |  |
| `str_biography_en` | ``$STRING`` | No |  |
| `str_biography_fr` | ``$STRING`` | No |  |
| `str_biography_hu` | ``$STRING`` | No |  |
| `str_biography_il` | ``$STRING`` | No |  |
| `str_biography_it` | ``$STRING`` | No |  |
| `str_biography_jp` | ``$STRING`` | No |  |
| `str_biography_nl` | ``$STRING`` | No |  |
| `str_biography_no` | ``$STRING`` | No |  |
| `str_biography_pl` | ``$STRING`` | No |  |
| `str_biography_pt` | ``$STRING`` | No |  |
| `str_biography_ru` | ``$STRING`` | No |  |
| `str_biography_se` | ``$STRING`` | No |  |
| `str_country` | ``$STRING`` | No |  |
| `str_country_code` | ``$STRING`` | No |  |
| `str_description_en` | ``$STRING`` | No |  |
| `str_disbanded` | ``$STRING`` | No |  |
| `str_discogs_id` | ``$STRING`` | No |  |
| `str_facebook` | ``$STRING`` | No |  |
| `str_gender` | ``$STRING`` | No |  |
| `str_genius_id` | ``$STRING`` | No |  |
| `str_genre` | ``$STRING`` | No |  |
| `str_itunes_id` | ``$STRING`` | No |  |
| `str_label` | ``$STRING`` | No |  |
| `str_last_fm_chart` | ``$STRING`` | No |  |
| `str_location` | ``$STRING`` | No |  |
| `str_locked` | ``$STRING`` | No |  |
| `str_lyric_wiki_id` | ``$STRING`` | No |  |
| `str_mood` | ``$STRING`` | No |  |
| `str_music_brainz_album_id` | ``$STRING`` | No |  |
| `str_music_brainz_artist_id` | ``$STRING`` | No |  |
| `str_music_brainz_id` | ``$STRING`` | No |  |
| `str_music_moz_id` | ``$STRING`` | No |  |
| `str_music_vid` | ``$STRING`` | No |  |
| `str_music_vid_company` | ``$STRING`` | No |  |
| `str_music_vid_director` | ``$STRING`` | No |  |
| `str_music_vid_screen1` | ``$STRING`` | No |  |
| `str_music_vid_screen2` | ``$STRING`` | No |  |
| `str_music_vid_screen3` | ``$STRING`` | No |  |
| `str_rate_your_music_id` | ``$STRING`` | No |  |
| `str_release_format` | ``$STRING`` | No |  |
| `str_review` | ``$STRING`` | No |  |
| `str_speed` | ``$STRING`` | No |  |
| `str_style` | ``$STRING`` | No |  |
| `str_theme` | ``$STRING`` | No |  |
| `str_track` | ``$STRING`` | No |  |
| `str_track_lyric` | ``$STRING`` | No |  |
| `str_track_thumb` | ``$STRING`` | No |  |
| `str_twitter` | ``$STRING`` | No |  |
| `str_website` | ``$STRING`` | No |  |
| `str_wikidata_id` | ``$STRING`` | No |  |
| `str_wikipedia_id` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V1Search(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V1SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V2ListEntity

```go
v2_list := client.V2List(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | ``$ARRAY`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V2List(nil).Load(map[string]any{"id": "v2_list_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V2ListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V2LookupEntity

```go
v2_lookup := client.V2Lookup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | ``$ARRAY`` | No |  |
| `artist` | ``$ARRAY`` | No |  |
| `track` | ``$ARRAY`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V2Lookup(nil).Load(map[string]any{"id": "v2_lookup_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V2LookupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V2SearchEntity

```go
v2_search := client.V2Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | ``$ARRAY`` | No |  |
| `artist` | ``$ARRAY`` | No |  |
| `track` | ``$ARRAY`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V2Search(nil).Load(map[string]any{"id": "v2_search_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V2SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewFreeMusicApi2SDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

