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
v2lookup, err := client.V2Lookup(nil).Load(map[string]any{"album_id": 1}, nil)
if err != nil {
    // handle err
    return
}
_ = v2lookup
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

v2Lookup, err := client.V2Lookup(nil).Load(
    map[string]any{"album_id": 1}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(v2Lookup) // the returned mock data
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
| `"idAlbum"` |  |
| `"idArtist"` |  |
| `"idIMVDB"` |  |
| `"idLyric"` |  |
| `"idTrack"` |  |
| `"intCD"` |  |
| `"intDuration"` |  |
| `"intLoved"` |  |
| `"intMusicVidComments"` |  |
| `"intMusicVidDislikes"` |  |
| `"intMusicVidFavorites"` |  |
| `"intMusicVidLikes"` |  |
| `"intMusicVidViews"` |  |
| `"intScore"` |  |
| `"intScoreVotes"` |  |
| `"intTotalListeners"` |  |
| `"intTotalPlays"` |  |
| `"intTrackNumber"` |  |
| `"loved"` |  |
| `"strAlbum"` |  |
| `"strArtist"` |  |
| `"strArtistAlternate"` |  |
| `"strDescriptionEN"` |  |
| `"strGenre"` |  |
| `"strLocked"` |  |
| `"strMood"` |  |
| `"strMusicBrainzAlbumID"` |  |
| `"strMusicBrainzArtistID"` |  |
| `"strMusicBrainzID"` |  |
| `"strMusicVid"` |  |
| `"strMusicVidCompany"` |  |
| `"strMusicVidDirector"` |  |
| `"strMusicVidScreen1"` |  |
| `"strMusicVidScreen2"` |  |
| `"strMusicVidScreen3"` |  |
| `"strStyle"` |  |
| `"strTheme"` |  |
| `"strTrack"` |  |
| `"strTrackLyrics"` |  |
| `"strTrackThumb"` |  |
| `"trending"` |  |

Operations: List.

API path: `/trending.php`

#### V1Lookup

| Field | Description |
| --- | --- |
| `"idAlbum"` |  |
| `"idArtist"` |  |
| `"idIMVDB"` |  |
| `"idLabel"` |  |
| `"idLyric"` |  |
| `"idTrack"` |  |
| `"intBornYear"` |  |
| `"intCD"` |  |
| `"intCharted"` |  |
| `"intDiedYear"` |  |
| `"intDuration"` |  |
| `"intFormedYear"` |  |
| `"intLoved"` |  |
| `"intMembers"` |  |
| `"intMusicVidComments"` |  |
| `"intMusicVidDislikes"` |  |
| `"intMusicVidFavorites"` |  |
| `"intMusicVidLikes"` |  |
| `"intMusicVidViews"` |  |
| `"intSales"` |  |
| `"intScore"` |  |
| `"intScoreVotes"` |  |
| `"intTotalListeners"` |  |
| `"intTotalPlays"` |  |
| `"intTrackNumber"` |  |
| `"intYearReleased"` |  |
| `"strAlbum"` |  |
| `"strAlbum3DCase"` |  |
| `"strAlbum3DFace"` |  |
| `"strAlbum3DFlat"` |  |
| `"strAlbum3DThumb"` |  |
| `"strAlbumCDart"` |  |
| `"strAlbumSpine"` |  |
| `"strAlbumStripped"` |  |
| `"strAlbumThumb"` |  |
| `"strAlbumThumbBack"` |  |
| `"strAlbumThumbHQ"` |  |
| `"strAllMusicID"` |  |
| `"strAmazonID"` |  |
| `"strAppleMusic"` |  |
| `"strArtist"` |  |
| `"strArtistAlternate"` |  |
| `"strArtistBanner"` |  |
| `"strArtistClearart"` |  |
| `"strArtistCutout"` |  |
| `"strArtistFanart"` |  |
| `"strArtistFanart2"` |  |
| `"strArtistFanart3"` |  |
| `"strArtistFanart4"` |  |
| `"strArtistLogo"` |  |
| `"strArtistStripped"` |  |
| `"strArtistThumb"` |  |
| `"strArtistWideThumb"` |  |
| `"strBBCReviewID"` |  |
| `"strBiographyCN"` |  |
| `"strBiographyDE"` |  |
| `"strBiographyEN"` |  |
| `"strBiographyES"` |  |
| `"strBiographyFR"` |  |
| `"strBiographyHU"` |  |
| `"strBiographyIL"` |  |
| `"strBiographyIT"` |  |
| `"strBiographyJP"` |  |
| `"strBiographyNL"` |  |
| `"strBiographyNO"` |  |
| `"strBiographyPL"` |  |
| `"strBiographyPT"` |  |
| `"strBiographyRU"` |  |
| `"strBiographySE"` |  |
| `"strCountry"` |  |
| `"strCountryCode"` |  |
| `"strDescriptionEN"` |  |
| `"strDisbanded"` |  |
| `"strDiscogsID"` |  |
| `"strFacebook"` |  |
| `"strGender"` |  |
| `"strGeniusID"` |  |
| `"strGenre"` |  |
| `"strInstagram"` |  |
| `"strItunesID"` |  |
| `"strLabel"` |  |
| `"strLastFMChart"` |  |
| `"strLocation"` |  |
| `"strLocked"` |  |
| `"strLyricWikiID"` |  |
| `"strMood"` |  |
| `"strMusicBrainzAlbumID"` |  |
| `"strMusicBrainzArtistID"` |  |
| `"strMusicBrainzID"` |  |
| `"strMusicMozID"` |  |
| `"strMusicVid"` |  |
| `"strMusicVidCompany"` |  |
| `"strMusicVidDirector"` |  |
| `"strMusicVidScreen1"` |  |
| `"strMusicVidScreen2"` |  |
| `"strMusicVidScreen3"` |  |
| `"strRateYourMusicID"` |  |
| `"strReleaseFormat"` |  |
| `"strReview"` |  |
| `"strSoundCloud"` |  |
| `"strSpeed"` |  |
| `"strSpotify"` |  |
| `"strStyle"` |  |
| `"strTheme"` |  |
| `"strTrack"` |  |
| `"strTrackLyrics"` |  |
| `"strTrackThumb"` |  |
| `"strTwitter"` |  |
| `"strWebsite"` |  |
| `"strWikidataID"` |  |
| `"strWikipediaID"` |  |
| `"strYoutube"` |  |

Operations: List.

API path: `/track.php`

#### V1Search

| Field | Description |
| --- | --- |
| `"idAlbum"` |  |
| `"idArtist"` |  |
| `"idIMVDB"` |  |
| `"idLabel"` |  |
| `"idLyric"` |  |
| `"idTrack"` |  |
| `"intBornYear"` |  |
| `"intCD"` |  |
| `"intCharted"` |  |
| `"intDiedYear"` |  |
| `"intDuration"` |  |
| `"intFormedYear"` |  |
| `"intLoved"` |  |
| `"intMembers"` |  |
| `"intMusicVidComments"` |  |
| `"intMusicVidDislikes"` |  |
| `"intMusicVidFavorites"` |  |
| `"intMusicVidLikes"` |  |
| `"intMusicVidViews"` |  |
| `"intSales"` |  |
| `"intScore"` |  |
| `"intScoreVotes"` |  |
| `"intTotalListeners"` |  |
| `"intTotalPlays"` |  |
| `"intTrackNumber"` |  |
| `"intYearReleased"` |  |
| `"strAlbum"` |  |
| `"strAlbum3DCase"` |  |
| `"strAlbum3DFace"` |  |
| `"strAlbum3DFlat"` |  |
| `"strAlbum3DThumb"` |  |
| `"strAlbumCDart"` |  |
| `"strAlbumSpine"` |  |
| `"strAlbumStripped"` |  |
| `"strAlbumThumb"` |  |
| `"strAlbumThumbBack"` |  |
| `"strAlbumThumbHQ"` |  |
| `"strAllMusicID"` |  |
| `"strAmazonID"` |  |
| `"strArtist"` |  |
| `"strArtistAlternate"` |  |
| `"strArtistBanner"` |  |
| `"strArtistClearart"` |  |
| `"strArtistCutout"` |  |
| `"strArtistFanart"` |  |
| `"strArtistFanart2"` |  |
| `"strArtistFanart3"` |  |
| `"strArtistFanart4"` |  |
| `"strArtistLogo"` |  |
| `"strArtistStripped"` |  |
| `"strArtistThumb"` |  |
| `"strArtistWideThumb"` |  |
| `"strBBCReviewID"` |  |
| `"strBiographyCN"` |  |
| `"strBiographyDE"` |  |
| `"strBiographyEN"` |  |
| `"strBiographyES"` |  |
| `"strBiographyFR"` |  |
| `"strBiographyHU"` |  |
| `"strBiographyIL"` |  |
| `"strBiographyIT"` |  |
| `"strBiographyJP"` |  |
| `"strBiographyNL"` |  |
| `"strBiographyNO"` |  |
| `"strBiographyPL"` |  |
| `"strBiographyPT"` |  |
| `"strBiographyRU"` |  |
| `"strBiographySE"` |  |
| `"strCountry"` |  |
| `"strCountryCode"` |  |
| `"strDescriptionEN"` |  |
| `"strDisbanded"` |  |
| `"strDiscogsID"` |  |
| `"strFacebook"` |  |
| `"strGender"` |  |
| `"strGeniusID"` |  |
| `"strGenre"` |  |
| `"strItunesID"` |  |
| `"strLabel"` |  |
| `"strLastFMChart"` |  |
| `"strLocation"` |  |
| `"strLocked"` |  |
| `"strLyricWikiID"` |  |
| `"strMood"` |  |
| `"strMusicBrainzAlbumID"` |  |
| `"strMusicBrainzArtistID"` |  |
| `"strMusicBrainzID"` |  |
| `"strMusicMozID"` |  |
| `"strMusicVid"` |  |
| `"strMusicVidCompany"` |  |
| `"strMusicVidDirector"` |  |
| `"strMusicVidScreen1"` |  |
| `"strMusicVidScreen2"` |  |
| `"strMusicVidScreen3"` |  |
| `"strRateYourMusicID"` |  |
| `"strReleaseFormat"` |  |
| `"strReview"` |  |
| `"strSpeed"` |  |
| `"strStyle"` |  |
| `"strTheme"` |  |
| `"strTrack"` |  |
| `"strTrackLyrics"` |  |
| `"strTrackThumb"` |  |
| `"strTwitter"` |  |
| `"strWebsite"` |  |
| `"strWikidataID"` |  |
| `"strWikipediaID"` |  |

Operations: List.

API path: `/searchalbum.php`

#### V2List

| Field | Description |
| --- | --- |
| `"albums"` |  |

Operations: Load.

API path: `/list/discography/{artistId}`

#### V2Lookup

| Field | Description |
| --- | --- |
| `"albums"` |  |
| `"artists"` |  |
| `"tracks"` |  |

Operations: Load.

API path: `/lookup/album/{albumId}`

#### V2Search

| Field | Description |
| --- | --- |
| `"albums"` |  |
| `"artists"` |  |
| `"tracks"` |  |

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
| `idAlbum` | `int` |  |
| `idArtist` | `int` |  |
| `idIMVDB` | `int` |  |
| `idLyric` | `int` |  |
| `idTrack` | `int` |  |
| `intCD` | `int` |  |
| `intDuration` | `int` |  |
| `intLoved` | `int` |  |
| `intMusicVidComments` | `int` |  |
| `intMusicVidDislikes` | `int` |  |
| `intMusicVidFavorites` | `int` |  |
| `intMusicVidLikes` | `int` |  |
| `intMusicVidViews` | `int` |  |
| `intScore` | `int` |  |
| `intScoreVotes` | `int` |  |
| `intTotalListeners` | `int` |  |
| `intTotalPlays` | `int` |  |
| `intTrackNumber` | `int` |  |
| `loved` | `[]any` |  |
| `strAlbum` | `string` |  |
| `strArtist` | `string` |  |
| `strArtistAlternate` | `string` |  |
| `strDescriptionEN` | `string` |  |
| `strGenre` | `string` |  |
| `strLocked` | `string` |  |
| `strMood` | `string` |  |
| `strMusicBrainzAlbumID` | `string` |  |
| `strMusicBrainzArtistID` | `string` |  |
| `strMusicBrainzID` | `string` |  |
| `strMusicVid` | `string` |  |
| `strMusicVidCompany` | `string` |  |
| `strMusicVidDirector` | `string` |  |
| `strMusicVidScreen1` | `string` |  |
| `strMusicVidScreen2` | `string` |  |
| `strMusicVidScreen3` | `string` |  |
| `strStyle` | `string` |  |
| `strTheme` | `string` |  |
| `strTrack` | `string` |  |
| `strTrackLyrics` | `string` |  |
| `strTrackThumb` | `string` |  |
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
| `idAlbum` | `int` |  |
| `idArtist` | `int` |  |
| `idIMVDB` | `int` |  |
| `idLabel` | `int` |  |
| `idLyric` | `int` |  |
| `idTrack` | `int` |  |
| `intBornYear` | `int` |  |
| `intCD` | `int` |  |
| `intCharted` | `int` |  |
| `intDiedYear` | `int` |  |
| `intDuration` | `int` |  |
| `intFormedYear` | `int` |  |
| `intLoved` | `int` |  |
| `intMembers` | `int` |  |
| `intMusicVidComments` | `int` |  |
| `intMusicVidDislikes` | `int` |  |
| `intMusicVidFavorites` | `int` |  |
| `intMusicVidLikes` | `int` |  |
| `intMusicVidViews` | `int` |  |
| `intSales` | `int` |  |
| `intScore` | `int` |  |
| `intScoreVotes` | `int` |  |
| `intTotalListeners` | `int` |  |
| `intTotalPlays` | `int` |  |
| `intTrackNumber` | `int` |  |
| `intYearReleased` | `int` |  |
| `strAlbum` | `string` |  |
| `strAlbum3DCase` | `string` |  |
| `strAlbum3DFace` | `string` |  |
| `strAlbum3DFlat` | `string` |  |
| `strAlbum3DThumb` | `string` |  |
| `strAlbumCDart` | `string` |  |
| `strAlbumSpine` | `string` |  |
| `strAlbumStripped` | `string` |  |
| `strAlbumThumb` | `string` |  |
| `strAlbumThumbBack` | `string` |  |
| `strAlbumThumbHQ` | `string` |  |
| `strAllMusicID` | `string` |  |
| `strAmazonID` | `string` |  |
| `strAppleMusic` | `string` |  |
| `strArtist` | `string` |  |
| `strArtistAlternate` | `string` |  |
| `strArtistBanner` | `string` |  |
| `strArtistClearart` | `string` |  |
| `strArtistCutout` | `string` |  |
| `strArtistFanart` | `string` |  |
| `strArtistFanart2` | `string` |  |
| `strArtistFanart3` | `string` |  |
| `strArtistFanart4` | `string` |  |
| `strArtistLogo` | `string` |  |
| `strArtistStripped` | `string` |  |
| `strArtistThumb` | `string` |  |
| `strArtistWideThumb` | `string` |  |
| `strBBCReviewID` | `string` |  |
| `strBiographyCN` | `string` |  |
| `strBiographyDE` | `string` |  |
| `strBiographyEN` | `string` |  |
| `strBiographyES` | `string` |  |
| `strBiographyFR` | `string` |  |
| `strBiographyHU` | `string` |  |
| `strBiographyIL` | `string` |  |
| `strBiographyIT` | `string` |  |
| `strBiographyJP` | `string` |  |
| `strBiographyNL` | `string` |  |
| `strBiographyNO` | `string` |  |
| `strBiographyPL` | `string` |  |
| `strBiographyPT` | `string` |  |
| `strBiographyRU` | `string` |  |
| `strBiographySE` | `string` |  |
| `strCountry` | `string` |  |
| `strCountryCode` | `string` |  |
| `strDescriptionEN` | `string` |  |
| `strDisbanded` | `string` |  |
| `strDiscogsID` | `string` |  |
| `strFacebook` | `string` |  |
| `strGender` | `string` |  |
| `strGeniusID` | `string` |  |
| `strGenre` | `string` |  |
| `strInstagram` | `string` |  |
| `strItunesID` | `string` |  |
| `strLabel` | `string` |  |
| `strLastFMChart` | `string` |  |
| `strLocation` | `string` |  |
| `strLocked` | `string` |  |
| `strLyricWikiID` | `string` |  |
| `strMood` | `string` |  |
| `strMusicBrainzAlbumID` | `string` |  |
| `strMusicBrainzArtistID` | `string` |  |
| `strMusicBrainzID` | `string` |  |
| `strMusicMozID` | `string` |  |
| `strMusicVid` | `string` |  |
| `strMusicVidCompany` | `string` |  |
| `strMusicVidDirector` | `string` |  |
| `strMusicVidScreen1` | `string` |  |
| `strMusicVidScreen2` | `string` |  |
| `strMusicVidScreen3` | `string` |  |
| `strRateYourMusicID` | `string` |  |
| `strReleaseFormat` | `string` |  |
| `strReview` | `string` |  |
| `strSoundCloud` | `string` |  |
| `strSpeed` | `string` |  |
| `strSpotify` | `string` |  |
| `strStyle` | `string` |  |
| `strTheme` | `string` |  |
| `strTrack` | `string` |  |
| `strTrackLyrics` | `string` |  |
| `strTrackThumb` | `string` |  |
| `strTwitter` | `string` |  |
| `strWebsite` | `string` |  |
| `strWikidataID` | `string` |  |
| `strWikipediaID` | `string` |  |
| `strYoutube` | `string` |  |

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
| `idAlbum` | `int` |  |
| `idArtist` | `int` |  |
| `idIMVDB` | `int` |  |
| `idLabel` | `int` |  |
| `idLyric` | `int` |  |
| `idTrack` | `int` |  |
| `intBornYear` | `int` |  |
| `intCD` | `int` |  |
| `intCharted` | `int` |  |
| `intDiedYear` | `int` |  |
| `intDuration` | `int` |  |
| `intFormedYear` | `int` |  |
| `intLoved` | `int` |  |
| `intMembers` | `int` |  |
| `intMusicVidComments` | `int` |  |
| `intMusicVidDislikes` | `int` |  |
| `intMusicVidFavorites` | `int` |  |
| `intMusicVidLikes` | `int` |  |
| `intMusicVidViews` | `int` |  |
| `intSales` | `int` |  |
| `intScore` | `int` |  |
| `intScoreVotes` | `int` |  |
| `intTotalListeners` | `int` |  |
| `intTotalPlays` | `int` |  |
| `intTrackNumber` | `int` |  |
| `intYearReleased` | `int` |  |
| `strAlbum` | `string` |  |
| `strAlbum3DCase` | `string` |  |
| `strAlbum3DFace` | `string` |  |
| `strAlbum3DFlat` | `string` |  |
| `strAlbum3DThumb` | `string` |  |
| `strAlbumCDart` | `string` |  |
| `strAlbumSpine` | `string` |  |
| `strAlbumStripped` | `string` |  |
| `strAlbumThumb` | `string` |  |
| `strAlbumThumbBack` | `string` |  |
| `strAlbumThumbHQ` | `string` |  |
| `strAllMusicID` | `string` |  |
| `strAmazonID` | `string` |  |
| `strArtist` | `string` |  |
| `strArtistAlternate` | `string` |  |
| `strArtistBanner` | `string` |  |
| `strArtistClearart` | `string` |  |
| `strArtistCutout` | `string` |  |
| `strArtistFanart` | `string` |  |
| `strArtistFanart2` | `string` |  |
| `strArtistFanart3` | `string` |  |
| `strArtistFanart4` | `string` |  |
| `strArtistLogo` | `string` |  |
| `strArtistStripped` | `string` |  |
| `strArtistThumb` | `string` |  |
| `strArtistWideThumb` | `string` |  |
| `strBBCReviewID` | `string` |  |
| `strBiographyCN` | `string` |  |
| `strBiographyDE` | `string` |  |
| `strBiographyEN` | `string` |  |
| `strBiographyES` | `string` |  |
| `strBiographyFR` | `string` |  |
| `strBiographyHU` | `string` |  |
| `strBiographyIL` | `string` |  |
| `strBiographyIT` | `string` |  |
| `strBiographyJP` | `string` |  |
| `strBiographyNL` | `string` |  |
| `strBiographyNO` | `string` |  |
| `strBiographyPL` | `string` |  |
| `strBiographyPT` | `string` |  |
| `strBiographyRU` | `string` |  |
| `strBiographySE` | `string` |  |
| `strCountry` | `string` |  |
| `strCountryCode` | `string` |  |
| `strDescriptionEN` | `string` |  |
| `strDisbanded` | `string` |  |
| `strDiscogsID` | `string` |  |
| `strFacebook` | `string` |  |
| `strGender` | `string` |  |
| `strGeniusID` | `string` |  |
| `strGenre` | `string` |  |
| `strItunesID` | `string` |  |
| `strLabel` | `string` |  |
| `strLastFMChart` | `string` |  |
| `strLocation` | `string` |  |
| `strLocked` | `string` |  |
| `strLyricWikiID` | `string` |  |
| `strMood` | `string` |  |
| `strMusicBrainzAlbumID` | `string` |  |
| `strMusicBrainzArtistID` | `string` |  |
| `strMusicBrainzID` | `string` |  |
| `strMusicMozID` | `string` |  |
| `strMusicVid` | `string` |  |
| `strMusicVidCompany` | `string` |  |
| `strMusicVidDirector` | `string` |  |
| `strMusicVidScreen1` | `string` |  |
| `strMusicVidScreen2` | `string` |  |
| `strMusicVidScreen3` | `string` |  |
| `strRateYourMusicID` | `string` |  |
| `strReleaseFormat` | `string` |  |
| `strReview` | `string` |  |
| `strSpeed` | `string` |  |
| `strStyle` | `string` |  |
| `strTheme` | `string` |  |
| `strTrack` | `string` |  |
| `strTrackLyrics` | `string` |  |
| `strTrackThumb` | `string` |  |
| `strTwitter` | `string` |  |
| `strWebsite` | `string` |  |
| `strWikidataID` | `string` |  |
| `strWikipediaID` | `string` |  |

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
| `albums` | `[]any` |  |

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
| `albums` | `[]any` |  |
| `artists` | `[]any` |  |
| `tracks` | `[]any` |  |

#### Example: Load

```go
v2Lookup, err := client.V2Lookup(nil).Load(map[string]any{"album_id": 1}, nil)
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
| `albums` | `[]any` |  |
| `artists` | `[]any` |  |
| `tracks` | `[]any` |  |

#### Example: Load

```go
v2Search, err := client.V2Search(nil).Load(map[string]any{"album_name": "album_name"}, nil)
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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
v2lookup := client.V2Lookup(nil)
v2lookup.Load(map[string]any{"album_id": 1}, nil)

// v2lookup.Data() now returns the v2lookup data from the last load
// v2lookup.Match() returns the last match criteria
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
