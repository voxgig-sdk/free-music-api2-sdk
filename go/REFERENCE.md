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

#### `Test() *FreeMusicApi2SDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *FreeMusicApi2SDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
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
v1List := client.V1List(nil)
fmt.Println(v1List.GetName()) // "v1_list"
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
| `loved` | `[]any` | No |  |
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
| `trending` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V1List(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
v1Lookup := client.V1Lookup(nil)
fmt.Println(v1Lookup.GetName()) // "v1_lookup"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V1Lookup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
v1Search := client.V1Search(nil)
fmt.Println(v1Search.GetName()) // "v1_search"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V1Search(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
v2List := client.V2List(nil)
fmt.Println(v2List.GetName()) // "v2_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V2List(nil).Load(map[string]any{"artist_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
v2Lookup := client.V2Lookup(nil)
fmt.Println(v2Lookup.GetName()) // "v2_lookup"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `[]any` | No |  |
| `artist` | `[]any` | No |  |
| `track` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V2Lookup(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
v2Search := client.V2Search(nil)
fmt.Println(v2Search.GetName()) // "v2_search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `[]any` | No |  |
| `artist` | `[]any` | No |  |
| `track` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V2Search(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

