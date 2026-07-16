# FreeMusicApi2 Python SDK



The Python SDK for the FreeMusicApi2 API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.V1List()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/free-music-api2-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from freemusicapi2_sdk import FreeMusicApi2SDK

client = FreeMusicApi2SDK({
    "apikey": os.environ.get("FREE_MUSIC_API2_APIKEY"),
})
```

### 2. List v1list records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    v1lists = client.V1List().list()
    for v1list in v1lists:
        print(v1list)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a v2list

V2List is nested under artist, so provide the `artist_id`.
`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    v2list = client.V2List().load({"artist_id": 1})
    print(v2list)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    v1lists = client.V1List().list()
    print(v1lists)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = FreeMusicApi2SDK.test()

# Entity ops return the bare record and raise on error.
v1list = client.V1List().list()
# v1list contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = FreeMusicApi2SDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FREE_MUSIC_API2_TEST_LIVE=TRUE
FREE_MUSIC_API2_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### FreeMusicApi2SDK

```python
from freemusicapi2_sdk import FreeMusicApi2SDK

client = FreeMusicApi2SDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = FreeMusicApi2SDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### FreeMusicApi2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `V1List` | `(data) -> V1ListEntity` | Create a V1List entity instance. |
| `V1Lookup` | `(data) -> V1LookupEntity` | Create a V1Lookup entity instance. |
| `V1Search` | `(data) -> V1SearchEntity` | Create a V1Search entity instance. |
| `V2List` | `(data) -> V2ListEntity` | Create a V2List entity instance. |
| `V2Lookup` | `(data) -> V2LookupEntity` | Create a V2Lookup entity instance. |
| `V2Search` | `(data) -> V2SearchEntity` | Create a V2Search entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `v1_list = client.V1List()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

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
| `loved` | `list` |  |
| `str_album` | `str` |  |
| `str_artist` | `str` |  |
| `str_artist_alternate` | `str` |  |
| `str_description_en` | `str` |  |
| `str_genre` | `str` |  |
| `str_locked` | `str` |  |
| `str_mood` | `str` |  |
| `str_music_brainz_album_id` | `str` |  |
| `str_music_brainz_artist_id` | `str` |  |
| `str_music_brainz_id` | `str` |  |
| `str_music_vid` | `str` |  |
| `str_music_vid_company` | `str` |  |
| `str_music_vid_director` | `str` |  |
| `str_music_vid_screen1` | `str` |  |
| `str_music_vid_screen2` | `str` |  |
| `str_music_vid_screen3` | `str` |  |
| `str_style` | `str` |  |
| `str_theme` | `str` |  |
| `str_track` | `str` |  |
| `str_track_lyric` | `str` |  |
| `str_track_thumb` | `str` |  |
| `trending` | `list` |  |

#### Example: List

```python
v1_lists = client.V1List().list()
```


### V1Lookup

Create an instance: `v1_lookup = client.V1Lookup()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

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
| `str_album` | `str` |  |
| `str_album3_d_case` | `str` |  |
| `str_album3_d_face` | `str` |  |
| `str_album3_d_flat` | `str` |  |
| `str_album3_d_thumb` | `str` |  |
| `str_album_c_dart` | `str` |  |
| `str_album_spine` | `str` |  |
| `str_album_stripped` | `str` |  |
| `str_album_thumb` | `str` |  |
| `str_album_thumb_back` | `str` |  |
| `str_album_thumb_hq` | `str` |  |
| `str_all_music_id` | `str` |  |
| `str_amazon_id` | `str` |  |
| `str_apple_music` | `str` |  |
| `str_artist` | `str` |  |
| `str_artist_alternate` | `str` |  |
| `str_artist_banner` | `str` |  |
| `str_artist_clearart` | `str` |  |
| `str_artist_cutout` | `str` |  |
| `str_artist_fanart` | `str` |  |
| `str_artist_fanart2` | `str` |  |
| `str_artist_fanart3` | `str` |  |
| `str_artist_fanart4` | `str` |  |
| `str_artist_logo` | `str` |  |
| `str_artist_stripped` | `str` |  |
| `str_artist_thumb` | `str` |  |
| `str_artist_wide_thumb` | `str` |  |
| `str_bbc_review_id` | `str` |  |
| `str_biography_cn` | `str` |  |
| `str_biography_de` | `str` |  |
| `str_biography_e` | `str` |  |
| `str_biography_en` | `str` |  |
| `str_biography_fr` | `str` |  |
| `str_biography_hu` | `str` |  |
| `str_biography_il` | `str` |  |
| `str_biography_it` | `str` |  |
| `str_biography_jp` | `str` |  |
| `str_biography_nl` | `str` |  |
| `str_biography_no` | `str` |  |
| `str_biography_pl` | `str` |  |
| `str_biography_pt` | `str` |  |
| `str_biography_ru` | `str` |  |
| `str_biography_se` | `str` |  |
| `str_country` | `str` |  |
| `str_country_code` | `str` |  |
| `str_description_en` | `str` |  |
| `str_disbanded` | `str` |  |
| `str_discogs_id` | `str` |  |
| `str_facebook` | `str` |  |
| `str_gender` | `str` |  |
| `str_genius_id` | `str` |  |
| `str_genre` | `str` |  |
| `str_instagram` | `str` |  |
| `str_itunes_id` | `str` |  |
| `str_label` | `str` |  |
| `str_last_fm_chart` | `str` |  |
| `str_location` | `str` |  |
| `str_locked` | `str` |  |
| `str_lyric_wiki_id` | `str` |  |
| `str_mood` | `str` |  |
| `str_music_brainz_album_id` | `str` |  |
| `str_music_brainz_artist_id` | `str` |  |
| `str_music_brainz_id` | `str` |  |
| `str_music_moz_id` | `str` |  |
| `str_music_vid` | `str` |  |
| `str_music_vid_company` | `str` |  |
| `str_music_vid_director` | `str` |  |
| `str_music_vid_screen1` | `str` |  |
| `str_music_vid_screen2` | `str` |  |
| `str_music_vid_screen3` | `str` |  |
| `str_rate_your_music_id` | `str` |  |
| `str_release_format` | `str` |  |
| `str_review` | `str` |  |
| `str_sound_cloud` | `str` |  |
| `str_speed` | `str` |  |
| `str_spotify` | `str` |  |
| `str_style` | `str` |  |
| `str_theme` | `str` |  |
| `str_track` | `str` |  |
| `str_track_lyric` | `str` |  |
| `str_track_thumb` | `str` |  |
| `str_twitter` | `str` |  |
| `str_website` | `str` |  |
| `str_wikidata_id` | `str` |  |
| `str_wikipedia_id` | `str` |  |
| `str_youtube` | `str` |  |

#### Example: List

```python
v1_lookups = client.V1Lookup().list()
```


### V1Search

Create an instance: `v1_search = client.V1Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

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
| `str_album` | `str` |  |
| `str_album3_d_case` | `str` |  |
| `str_album3_d_face` | `str` |  |
| `str_album3_d_flat` | `str` |  |
| `str_album3_d_thumb` | `str` |  |
| `str_album_c_dart` | `str` |  |
| `str_album_spine` | `str` |  |
| `str_album_stripped` | `str` |  |
| `str_album_thumb` | `str` |  |
| `str_album_thumb_back` | `str` |  |
| `str_album_thumb_hq` | `str` |  |
| `str_all_music_id` | `str` |  |
| `str_amazon_id` | `str` |  |
| `str_artist` | `str` |  |
| `str_artist_alternate` | `str` |  |
| `str_artist_banner` | `str` |  |
| `str_artist_clearart` | `str` |  |
| `str_artist_cutout` | `str` |  |
| `str_artist_fanart` | `str` |  |
| `str_artist_fanart2` | `str` |  |
| `str_artist_fanart3` | `str` |  |
| `str_artist_fanart4` | `str` |  |
| `str_artist_logo` | `str` |  |
| `str_artist_stripped` | `str` |  |
| `str_artist_thumb` | `str` |  |
| `str_artist_wide_thumb` | `str` |  |
| `str_bbc_review_id` | `str` |  |
| `str_biography_cn` | `str` |  |
| `str_biography_de` | `str` |  |
| `str_biography_e` | `str` |  |
| `str_biography_en` | `str` |  |
| `str_biography_fr` | `str` |  |
| `str_biography_hu` | `str` |  |
| `str_biography_il` | `str` |  |
| `str_biography_it` | `str` |  |
| `str_biography_jp` | `str` |  |
| `str_biography_nl` | `str` |  |
| `str_biography_no` | `str` |  |
| `str_biography_pl` | `str` |  |
| `str_biography_pt` | `str` |  |
| `str_biography_ru` | `str` |  |
| `str_biography_se` | `str` |  |
| `str_country` | `str` |  |
| `str_country_code` | `str` |  |
| `str_description_en` | `str` |  |
| `str_disbanded` | `str` |  |
| `str_discogs_id` | `str` |  |
| `str_facebook` | `str` |  |
| `str_gender` | `str` |  |
| `str_genius_id` | `str` |  |
| `str_genre` | `str` |  |
| `str_itunes_id` | `str` |  |
| `str_label` | `str` |  |
| `str_last_fm_chart` | `str` |  |
| `str_location` | `str` |  |
| `str_locked` | `str` |  |
| `str_lyric_wiki_id` | `str` |  |
| `str_mood` | `str` |  |
| `str_music_brainz_album_id` | `str` |  |
| `str_music_brainz_artist_id` | `str` |  |
| `str_music_brainz_id` | `str` |  |
| `str_music_moz_id` | `str` |  |
| `str_music_vid` | `str` |  |
| `str_music_vid_company` | `str` |  |
| `str_music_vid_director` | `str` |  |
| `str_music_vid_screen1` | `str` |  |
| `str_music_vid_screen2` | `str` |  |
| `str_music_vid_screen3` | `str` |  |
| `str_rate_your_music_id` | `str` |  |
| `str_release_format` | `str` |  |
| `str_review` | `str` |  |
| `str_speed` | `str` |  |
| `str_style` | `str` |  |
| `str_theme` | `str` |  |
| `str_track` | `str` |  |
| `str_track_lyric` | `str` |  |
| `str_track_thumb` | `str` |  |
| `str_twitter` | `str` |  |
| `str_website` | `str` |  |
| `str_wikidata_id` | `str` |  |
| `str_wikipedia_id` | `str` |  |

#### Example: List

```python
v1_searchs = client.V1Search().list()
```


### V2List

Create an instance: `v2_list = client.V2List()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `list` |  |

#### Example: Load

```python
v2_list = client.V2List().load({"artist_id": 1})
```


### V2Lookup

Create an instance: `v2_lookup = client.V2Lookup()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `list` |  |
| `artist` | `list` |  |
| `track` | `list` |  |

#### Example: Load

```python
v2_lookup = client.V2Lookup().load()
```


### V2Search

Create an instance: `v2_search = client.V2Search()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `list` |  |
| `artist` | `list` |  |
| `track` | `list` |  |

#### Example: Load

```python
v2_search = client.V2Search().load()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── freemusicapi2_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`freemusicapi2_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
v1list = client.V1List()
v1list.list()

# v1list.data_get() now returns the v1list data from the last list
# v1list.match_get() returns the last match criteria
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
