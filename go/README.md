# FreeMusicApi2 Golang SDK



The Golang SDK for the FreeMusicApi2 API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.V1List(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/free-music-api2-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/free-music-api2-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/free-music-api2-sdk/go=../free-music-api2-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/free-music-api2-sdk/go"
)

func main() {
    client := sdk.NewFreeMusicApi2SDK(map[string]any{
        "apikey": os.Getenv("FREE_MUSIC_API2_APIKEY"),
    })

    // List v1List records — the value is the array of records itself.
    v1Lists, err := client.V1List(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range v1Lists.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
v1lists, err := client.V1List(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = v1lists
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

v1List, err := client.V1List(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(v1List) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewFreeMusicApi2SDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewFreeMusicApi2SDK

```go
func NewFreeMusicApi2SDK(options map[string]any) *FreeMusicApi2SDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *FreeMusicApi2SDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FreeMusicApi2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `V1List` | `(data map[string]any) FreeMusicApi2Entity` | Create a V1List entity instance. |
| `V1Lookup` | `(data map[string]any) FreeMusicApi2Entity` | Create a V1Lookup entity instance. |
| `V1Search` | `(data map[string]any) FreeMusicApi2Entity` | Create a V1Search entity instance. |
| `V2List` | `(data map[string]any) FreeMusicApi2Entity` | Create a V2List entity instance. |
| `V2Lookup` | `(data map[string]any) FreeMusicApi2Entity` | Create a V2Lookup entity instance. |
| `V2Search` | `(data map[string]any) FreeMusicApi2Entity` | Create a V2Search entity instance. |

### Entity interface (FreeMusicApi2Entity)

All entities implement the `FreeMusicApi2Entity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    v1List, err := client.V1List(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // v1List is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### V1List

| Field | Description |
| --- | --- |
| `"id_album"` |  |
| `"id_artist"` |  |
| `"id_imvdb"` |  |
| `"id_lyric"` |  |
| `"id_track"` |  |
| `"int_cd"` |  |
| `"int_duration"` |  |
| `"int_loved"` |  |
| `"int_music_vid_comment"` |  |
| `"int_music_vid_dislike"` |  |
| `"int_music_vid_favorite"` |  |
| `"int_music_vid_like"` |  |
| `"int_music_vid_view"` |  |
| `"int_score"` |  |
| `"int_score_vote"` |  |
| `"int_total_listener"` |  |
| `"int_total_play"` |  |
| `"int_track_number"` |  |
| `"loved"` |  |
| `"str_album"` |  |
| `"str_artist"` |  |
| `"str_artist_alternate"` |  |
| `"str_description_en"` |  |
| `"str_genre"` |  |
| `"str_locked"` |  |
| `"str_mood"` |  |
| `"str_music_brainz_album_id"` |  |
| `"str_music_brainz_artist_id"` |  |
| `"str_music_brainz_id"` |  |
| `"str_music_vid"` |  |
| `"str_music_vid_company"` |  |
| `"str_music_vid_director"` |  |
| `"str_music_vid_screen1"` |  |
| `"str_music_vid_screen2"` |  |
| `"str_music_vid_screen3"` |  |
| `"str_style"` |  |
| `"str_theme"` |  |
| `"str_track"` |  |
| `"str_track_lyric"` |  |
| `"str_track_thumb"` |  |
| `"trending"` |  |

Operations: List.

API path: `/trending.php`

#### V1Lookup

| Field | Description |
| --- | --- |
| `"id_album"` |  |
| `"id_artist"` |  |
| `"id_imvdb"` |  |
| `"id_label"` |  |
| `"id_lyric"` |  |
| `"id_track"` |  |
| `"int_born_year"` |  |
| `"int_cd"` |  |
| `"int_charted"` |  |
| `"int_died_year"` |  |
| `"int_duration"` |  |
| `"int_formed_year"` |  |
| `"int_loved"` |  |
| `"int_member"` |  |
| `"int_music_vid_comment"` |  |
| `"int_music_vid_dislike"` |  |
| `"int_music_vid_favorite"` |  |
| `"int_music_vid_like"` |  |
| `"int_music_vid_view"` |  |
| `"int_sale"` |  |
| `"int_score"` |  |
| `"int_score_vote"` |  |
| `"int_total_listener"` |  |
| `"int_total_play"` |  |
| `"int_track_number"` |  |
| `"int_year_released"` |  |
| `"str_album"` |  |
| `"str_album3_d_case"` |  |
| `"str_album3_d_face"` |  |
| `"str_album3_d_flat"` |  |
| `"str_album3_d_thumb"` |  |
| `"str_album_c_dart"` |  |
| `"str_album_spine"` |  |
| `"str_album_stripped"` |  |
| `"str_album_thumb"` |  |
| `"str_album_thumb_back"` |  |
| `"str_album_thumb_hq"` |  |
| `"str_all_music_id"` |  |
| `"str_amazon_id"` |  |
| `"str_apple_music"` |  |
| `"str_artist"` |  |
| `"str_artist_alternate"` |  |
| `"str_artist_banner"` |  |
| `"str_artist_clearart"` |  |
| `"str_artist_cutout"` |  |
| `"str_artist_fanart"` |  |
| `"str_artist_fanart2"` |  |
| `"str_artist_fanart3"` |  |
| `"str_artist_fanart4"` |  |
| `"str_artist_logo"` |  |
| `"str_artist_stripped"` |  |
| `"str_artist_thumb"` |  |
| `"str_artist_wide_thumb"` |  |
| `"str_bbc_review_id"` |  |
| `"str_biography_cn"` |  |
| `"str_biography_de"` |  |
| `"str_biography_e"` |  |
| `"str_biography_en"` |  |
| `"str_biography_fr"` |  |
| `"str_biography_hu"` |  |
| `"str_biography_il"` |  |
| `"str_biography_it"` |  |
| `"str_biography_jp"` |  |
| `"str_biography_nl"` |  |
| `"str_biography_no"` |  |
| `"str_biography_pl"` |  |
| `"str_biography_pt"` |  |
| `"str_biography_ru"` |  |
| `"str_biography_se"` |  |
| `"str_country"` |  |
| `"str_country_code"` |  |
| `"str_description_en"` |  |
| `"str_disbanded"` |  |
| `"str_discogs_id"` |  |
| `"str_facebook"` |  |
| `"str_gender"` |  |
| `"str_genius_id"` |  |
| `"str_genre"` |  |
| `"str_instagram"` |  |
| `"str_itunes_id"` |  |
| `"str_label"` |  |
| `"str_last_fm_chart"` |  |
| `"str_location"` |  |
| `"str_locked"` |  |
| `"str_lyric_wiki_id"` |  |
| `"str_mood"` |  |
| `"str_music_brainz_album_id"` |  |
| `"str_music_brainz_artist_id"` |  |
| `"str_music_brainz_id"` |  |
| `"str_music_moz_id"` |  |
| `"str_music_vid"` |  |
| `"str_music_vid_company"` |  |
| `"str_music_vid_director"` |  |
| `"str_music_vid_screen1"` |  |
| `"str_music_vid_screen2"` |  |
| `"str_music_vid_screen3"` |  |
| `"str_rate_your_music_id"` |  |
| `"str_release_format"` |  |
| `"str_review"` |  |
| `"str_sound_cloud"` |  |
| `"str_speed"` |  |
| `"str_spotify"` |  |
| `"str_style"` |  |
| `"str_theme"` |  |
| `"str_track"` |  |
| `"str_track_lyric"` |  |
| `"str_track_thumb"` |  |
| `"str_twitter"` |  |
| `"str_website"` |  |
| `"str_wikidata_id"` |  |
| `"str_wikipedia_id"` |  |
| `"str_youtube"` |  |

Operations: List.

API path: `/track.php`

#### V1Search

| Field | Description |
| --- | --- |
| `"id_album"` |  |
| `"id_artist"` |  |
| `"id_imvdb"` |  |
| `"id_label"` |  |
| `"id_lyric"` |  |
| `"id_track"` |  |
| `"int_born_year"` |  |
| `"int_cd"` |  |
| `"int_charted"` |  |
| `"int_died_year"` |  |
| `"int_duration"` |  |
| `"int_formed_year"` |  |
| `"int_loved"` |  |
| `"int_member"` |  |
| `"int_music_vid_comment"` |  |
| `"int_music_vid_dislike"` |  |
| `"int_music_vid_favorite"` |  |
| `"int_music_vid_like"` |  |
| `"int_music_vid_view"` |  |
| `"int_sale"` |  |
| `"int_score"` |  |
| `"int_score_vote"` |  |
| `"int_total_listener"` |  |
| `"int_total_play"` |  |
| `"int_track_number"` |  |
| `"int_year_released"` |  |
| `"str_album"` |  |
| `"str_album3_d_case"` |  |
| `"str_album3_d_face"` |  |
| `"str_album3_d_flat"` |  |
| `"str_album3_d_thumb"` |  |
| `"str_album_c_dart"` |  |
| `"str_album_spine"` |  |
| `"str_album_stripped"` |  |
| `"str_album_thumb"` |  |
| `"str_album_thumb_back"` |  |
| `"str_album_thumb_hq"` |  |
| `"str_all_music_id"` |  |
| `"str_amazon_id"` |  |
| `"str_artist"` |  |
| `"str_artist_alternate"` |  |
| `"str_artist_banner"` |  |
| `"str_artist_clearart"` |  |
| `"str_artist_cutout"` |  |
| `"str_artist_fanart"` |  |
| `"str_artist_fanart2"` |  |
| `"str_artist_fanart3"` |  |
| `"str_artist_fanart4"` |  |
| `"str_artist_logo"` |  |
| `"str_artist_stripped"` |  |
| `"str_artist_thumb"` |  |
| `"str_artist_wide_thumb"` |  |
| `"str_bbc_review_id"` |  |
| `"str_biography_cn"` |  |
| `"str_biography_de"` |  |
| `"str_biography_e"` |  |
| `"str_biography_en"` |  |
| `"str_biography_fr"` |  |
| `"str_biography_hu"` |  |
| `"str_biography_il"` |  |
| `"str_biography_it"` |  |
| `"str_biography_jp"` |  |
| `"str_biography_nl"` |  |
| `"str_biography_no"` |  |
| `"str_biography_pl"` |  |
| `"str_biography_pt"` |  |
| `"str_biography_ru"` |  |
| `"str_biography_se"` |  |
| `"str_country"` |  |
| `"str_country_code"` |  |
| `"str_description_en"` |  |
| `"str_disbanded"` |  |
| `"str_discogs_id"` |  |
| `"str_facebook"` |  |
| `"str_gender"` |  |
| `"str_genius_id"` |  |
| `"str_genre"` |  |
| `"str_itunes_id"` |  |
| `"str_label"` |  |
| `"str_last_fm_chart"` |  |
| `"str_location"` |  |
| `"str_locked"` |  |
| `"str_lyric_wiki_id"` |  |
| `"str_mood"` |  |
| `"str_music_brainz_album_id"` |  |
| `"str_music_brainz_artist_id"` |  |
| `"str_music_brainz_id"` |  |
| `"str_music_moz_id"` |  |
| `"str_music_vid"` |  |
| `"str_music_vid_company"` |  |
| `"str_music_vid_director"` |  |
| `"str_music_vid_screen1"` |  |
| `"str_music_vid_screen2"` |  |
| `"str_music_vid_screen3"` |  |
| `"str_rate_your_music_id"` |  |
| `"str_release_format"` |  |
| `"str_review"` |  |
| `"str_speed"` |  |
| `"str_style"` |  |
| `"str_theme"` |  |
| `"str_track"` |  |
| `"str_track_lyric"` |  |
| `"str_track_thumb"` |  |
| `"str_twitter"` |  |
| `"str_website"` |  |
| `"str_wikidata_id"` |  |
| `"str_wikipedia_id"` |  |

Operations: List.

API path: `/searchalbum.php`

#### V2List

| Field | Description |
| --- | --- |
| `"album"` |  |

Operations: Load.

API path: `/list/discography/{artistId}`

#### V2Lookup

| Field | Description |
| --- | --- |
| `"album"` |  |
| `"artist"` |  |
| `"track"` |  |

Operations: Load.

API path: `/lookup/album/{albumId}`

#### V2Search

| Field | Description |
| --- | --- |
| `"album"` |  |
| `"artist"` |  |
| `"track"` |  |

Operations: Load.

API path: `/search/album/{albumName}`



## Entities


### V1List

Create an instance: `v1List := client.V1List(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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
| `loved` | `[]any` |  |
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
| `trending` | `[]any` |  |

#### Example: List

```go
v1Lists, err := client.V1List(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v1Lists) // the array of records
```


### V1Lookup

Create an instance: `v1Lookup := client.V1Lookup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
v1Lookups, err := client.V1Lookup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v1Lookups) // the array of records
```


### V1Search

Create an instance: `v1Search := client.V1Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
v1Searchs, err := client.V1Search(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v1Searchs) // the array of records
```


### V2List

Create an instance: `v2List := client.V2List(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `[]any` |  |

#### Example: Load

```go
v2List, err := client.V2List(nil).Load(map[string]any{"artist_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(v2List) // the loaded record
```


### V2Lookup

Create an instance: `v2Lookup := client.V2Lookup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `[]any` |  |
| `artist` | `[]any` |  |
| `track` | `[]any` |  |

#### Example: Load

```go
v2Lookup, err := client.V2Lookup(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v2Lookup) // the loaded record
```


### V2Search

Create an instance: `v2Search := client.V2Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `[]any` |  |
| `artist` | `[]any` |  |
| `track` | `[]any` |  |

#### Example: Load

```go
v2Search, err := client.V2Search(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v2Search) // the loaded record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/free-music-api2-sdk/go/
├── free-music-api2.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/free-music-api2-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
v1list := client.V1List(nil)
v1list.List(nil, nil)

// v1list.Data() now returns the v1list data from the last list
// v1list.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
