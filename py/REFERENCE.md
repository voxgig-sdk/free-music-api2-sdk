# FreeMusicApi2 Python SDK Reference

Complete API reference for the FreeMusicApi2 Python SDK.


## FreeMusicApi2SDK

### Constructor

```python
from freemusicapi2_sdk import FreeMusicApi2SDK

client = FreeMusicApi2SDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FreeMusicApi2SDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = FreeMusicApi2SDK.test()
```


### Instance Methods

#### `V1List(data=None)`

Create a new `V1ListEntity` instance. Pass `None` for no initial data.

#### `V1Lookup(data=None)`

Create a new `V1LookupEntity` instance. Pass `None` for no initial data.

#### `V1Search(data=None)`

Create a new `V1SearchEntity` instance. Pass `None` for no initial data.

#### `V2List(data=None)`

Create a new `V2ListEntity` instance. Pass `None` for no initial data.

#### `V2Lookup(data=None)`

Create a new `V2LookupEntity` instance. Pass `None` for no initial data.

#### `V2Search(data=None)`

Create a new `V2SearchEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## V1ListEntity

```python
v1_list = client.V1List()
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
| `loved` | `list` | No |  |
| `str_album` | `str` | No |  |
| `str_artist` | `str` | No |  |
| `str_artist_alternate` | `str` | No |  |
| `str_description_en` | `str` | No |  |
| `str_genre` | `str` | No |  |
| `str_locked` | `str` | No |  |
| `str_mood` | `str` | No |  |
| `str_music_brainz_album_id` | `str` | No |  |
| `str_music_brainz_artist_id` | `str` | No |  |
| `str_music_brainz_id` | `str` | No |  |
| `str_music_vid` | `str` | No |  |
| `str_music_vid_company` | `str` | No |  |
| `str_music_vid_director` | `str` | No |  |
| `str_music_vid_screen1` | `str` | No |  |
| `str_music_vid_screen2` | `str` | No |  |
| `str_music_vid_screen3` | `str` | No |  |
| `str_style` | `str` | No |  |
| `str_theme` | `str` | No |  |
| `str_track` | `str` | No |  |
| `str_track_lyric` | `str` | No |  |
| `str_track_thumb` | `str` | No |  |
| `trending` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V1List().list()
for v1_list in results:
    print(v1_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1ListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V1LookupEntity

```python
v1_lookup = client.V1Lookup()
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
| `str_album` | `str` | No |  |
| `str_album3_d_case` | `str` | No |  |
| `str_album3_d_face` | `str` | No |  |
| `str_album3_d_flat` | `str` | No |  |
| `str_album3_d_thumb` | `str` | No |  |
| `str_album_c_dart` | `str` | No |  |
| `str_album_spine` | `str` | No |  |
| `str_album_stripped` | `str` | No |  |
| `str_album_thumb` | `str` | No |  |
| `str_album_thumb_back` | `str` | No |  |
| `str_album_thumb_hq` | `str` | No |  |
| `str_all_music_id` | `str` | No |  |
| `str_amazon_id` | `str` | No |  |
| `str_apple_music` | `str` | No |  |
| `str_artist` | `str` | No |  |
| `str_artist_alternate` | `str` | No |  |
| `str_artist_banner` | `str` | No |  |
| `str_artist_clearart` | `str` | No |  |
| `str_artist_cutout` | `str` | No |  |
| `str_artist_fanart` | `str` | No |  |
| `str_artist_fanart2` | `str` | No |  |
| `str_artist_fanart3` | `str` | No |  |
| `str_artist_fanart4` | `str` | No |  |
| `str_artist_logo` | `str` | No |  |
| `str_artist_stripped` | `str` | No |  |
| `str_artist_thumb` | `str` | No |  |
| `str_artist_wide_thumb` | `str` | No |  |
| `str_bbc_review_id` | `str` | No |  |
| `str_biography_cn` | `str` | No |  |
| `str_biography_de` | `str` | No |  |
| `str_biography_e` | `str` | No |  |
| `str_biography_en` | `str` | No |  |
| `str_biography_fr` | `str` | No |  |
| `str_biography_hu` | `str` | No |  |
| `str_biography_il` | `str` | No |  |
| `str_biography_it` | `str` | No |  |
| `str_biography_jp` | `str` | No |  |
| `str_biography_nl` | `str` | No |  |
| `str_biography_no` | `str` | No |  |
| `str_biography_pl` | `str` | No |  |
| `str_biography_pt` | `str` | No |  |
| `str_biography_ru` | `str` | No |  |
| `str_biography_se` | `str` | No |  |
| `str_country` | `str` | No |  |
| `str_country_code` | `str` | No |  |
| `str_description_en` | `str` | No |  |
| `str_disbanded` | `str` | No |  |
| `str_discogs_id` | `str` | No |  |
| `str_facebook` | `str` | No |  |
| `str_gender` | `str` | No |  |
| `str_genius_id` | `str` | No |  |
| `str_genre` | `str` | No |  |
| `str_instagram` | `str` | No |  |
| `str_itunes_id` | `str` | No |  |
| `str_label` | `str` | No |  |
| `str_last_fm_chart` | `str` | No |  |
| `str_location` | `str` | No |  |
| `str_locked` | `str` | No |  |
| `str_lyric_wiki_id` | `str` | No |  |
| `str_mood` | `str` | No |  |
| `str_music_brainz_album_id` | `str` | No |  |
| `str_music_brainz_artist_id` | `str` | No |  |
| `str_music_brainz_id` | `str` | No |  |
| `str_music_moz_id` | `str` | No |  |
| `str_music_vid` | `str` | No |  |
| `str_music_vid_company` | `str` | No |  |
| `str_music_vid_director` | `str` | No |  |
| `str_music_vid_screen1` | `str` | No |  |
| `str_music_vid_screen2` | `str` | No |  |
| `str_music_vid_screen3` | `str` | No |  |
| `str_rate_your_music_id` | `str` | No |  |
| `str_release_format` | `str` | No |  |
| `str_review` | `str` | No |  |
| `str_sound_cloud` | `str` | No |  |
| `str_speed` | `str` | No |  |
| `str_spotify` | `str` | No |  |
| `str_style` | `str` | No |  |
| `str_theme` | `str` | No |  |
| `str_track` | `str` | No |  |
| `str_track_lyric` | `str` | No |  |
| `str_track_thumb` | `str` | No |  |
| `str_twitter` | `str` | No |  |
| `str_website` | `str` | No |  |
| `str_wikidata_id` | `str` | No |  |
| `str_wikipedia_id` | `str` | No |  |
| `str_youtube` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V1Lookup().list()
for v1_lookup in results:
    print(v1_lookup)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1LookupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V1SearchEntity

```python
v1_search = client.V1Search()
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
| `str_album` | `str` | No |  |
| `str_album3_d_case` | `str` | No |  |
| `str_album3_d_face` | `str` | No |  |
| `str_album3_d_flat` | `str` | No |  |
| `str_album3_d_thumb` | `str` | No |  |
| `str_album_c_dart` | `str` | No |  |
| `str_album_spine` | `str` | No |  |
| `str_album_stripped` | `str` | No |  |
| `str_album_thumb` | `str` | No |  |
| `str_album_thumb_back` | `str` | No |  |
| `str_album_thumb_hq` | `str` | No |  |
| `str_all_music_id` | `str` | No |  |
| `str_amazon_id` | `str` | No |  |
| `str_artist` | `str` | No |  |
| `str_artist_alternate` | `str` | No |  |
| `str_artist_banner` | `str` | No |  |
| `str_artist_clearart` | `str` | No |  |
| `str_artist_cutout` | `str` | No |  |
| `str_artist_fanart` | `str` | No |  |
| `str_artist_fanart2` | `str` | No |  |
| `str_artist_fanart3` | `str` | No |  |
| `str_artist_fanart4` | `str` | No |  |
| `str_artist_logo` | `str` | No |  |
| `str_artist_stripped` | `str` | No |  |
| `str_artist_thumb` | `str` | No |  |
| `str_artist_wide_thumb` | `str` | No |  |
| `str_bbc_review_id` | `str` | No |  |
| `str_biography_cn` | `str` | No |  |
| `str_biography_de` | `str` | No |  |
| `str_biography_e` | `str` | No |  |
| `str_biography_en` | `str` | No |  |
| `str_biography_fr` | `str` | No |  |
| `str_biography_hu` | `str` | No |  |
| `str_biography_il` | `str` | No |  |
| `str_biography_it` | `str` | No |  |
| `str_biography_jp` | `str` | No |  |
| `str_biography_nl` | `str` | No |  |
| `str_biography_no` | `str` | No |  |
| `str_biography_pl` | `str` | No |  |
| `str_biography_pt` | `str` | No |  |
| `str_biography_ru` | `str` | No |  |
| `str_biography_se` | `str` | No |  |
| `str_country` | `str` | No |  |
| `str_country_code` | `str` | No |  |
| `str_description_en` | `str` | No |  |
| `str_disbanded` | `str` | No |  |
| `str_discogs_id` | `str` | No |  |
| `str_facebook` | `str` | No |  |
| `str_gender` | `str` | No |  |
| `str_genius_id` | `str` | No |  |
| `str_genre` | `str` | No |  |
| `str_itunes_id` | `str` | No |  |
| `str_label` | `str` | No |  |
| `str_last_fm_chart` | `str` | No |  |
| `str_location` | `str` | No |  |
| `str_locked` | `str` | No |  |
| `str_lyric_wiki_id` | `str` | No |  |
| `str_mood` | `str` | No |  |
| `str_music_brainz_album_id` | `str` | No |  |
| `str_music_brainz_artist_id` | `str` | No |  |
| `str_music_brainz_id` | `str` | No |  |
| `str_music_moz_id` | `str` | No |  |
| `str_music_vid` | `str` | No |  |
| `str_music_vid_company` | `str` | No |  |
| `str_music_vid_director` | `str` | No |  |
| `str_music_vid_screen1` | `str` | No |  |
| `str_music_vid_screen2` | `str` | No |  |
| `str_music_vid_screen3` | `str` | No |  |
| `str_rate_your_music_id` | `str` | No |  |
| `str_release_format` | `str` | No |  |
| `str_review` | `str` | No |  |
| `str_speed` | `str` | No |  |
| `str_style` | `str` | No |  |
| `str_theme` | `str` | No |  |
| `str_track` | `str` | No |  |
| `str_track_lyric` | `str` | No |  |
| `str_track_thumb` | `str` | No |  |
| `str_twitter` | `str` | No |  |
| `str_website` | `str` | No |  |
| `str_wikidata_id` | `str` | No |  |
| `str_wikipedia_id` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V1Search().list()
for v1_search in results:
    print(v1_search)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V2ListEntity

```python
v2_list = client.V2List()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V2List().load({"artist_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2ListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V2LookupEntity

```python
v2_lookup = client.V2Lookup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `list` | No |  |
| `artist` | `list` | No |  |
| `track` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V2Lookup().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2LookupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V2SearchEntity

```python
v2_search = client.V2Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `list` | No |  |
| `artist` | `list` | No |  |
| `track` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V2Search().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V2SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = FreeMusicApi2SDK({
    "feature": {
        "test": {"active": True},
    },
})
```

