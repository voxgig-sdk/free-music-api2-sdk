# FreeMusicApi2 Golang SDK



The Golang SDK for the FreeMusicApi2 API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.V1List(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
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
| `"idAlbum"` | Album ID |
| `"idArtist"` | Artist ID |
| `"idIMVDB"` | IMVDB ID |
| `"idLyric"` | Lyrics ID |
| `"idTrack"` | Track ID |
| `"intCD"` | CD number |
| `"intDuration"` | Track duration in milliseconds |
| `"intLoved"` | Number of loves/likes |
| `"intMusicVidComments"` | Number of music video comments |
| `"intMusicVidDislikes"` | Number of music video dislikes |
| `"intMusicVidFavorites"` | Number of music video favorites |
| `"intMusicVidLikes"` | Number of music video likes |
| `"intMusicVidViews"` | Number of music video views |
| `"intScore"` | Track score |
| `"intScoreVotes"` | Number of score votes |
| `"intTotalListeners"` | Total number of listeners |
| `"intTotalPlays"` | Total number of plays |
| `"intTrackNumber"` | Track number on album |
| `"loved"` |  |
| `"strAlbum"` | Album title |
| `"strArtist"` | Artist name |
| `"strArtistAlternate"` | Alternate artist name |
| `"strDescriptionEN"` | Video description in English |
| `"strGenre"` | Track genre |
| `"strLocked"` | Whether the record is locked |
| `"strMood"` | Track mood |
| `"strMusicBrainzAlbumID"` | MusicBrainz Album ID |
| `"strMusicBrainzArtistID"` | MusicBrainz Artist ID |
| `"strMusicBrainzID"` | MusicBrainz Recording ID |
| `"strMusicVid"` | URL to music video |
| `"strMusicVidCompany"` | Music video production company |
| `"strMusicVidDirector"` | Music video director |
| `"strMusicVidScreen1"` | URL to music video screenshot 1 |
| `"strMusicVidScreen2"` | URL to music video screenshot 2 |
| `"strMusicVidScreen3"` | URL to music video screenshot 3 |
| `"strStyle"` | Track style |
| `"strTheme"` | Track theme |
| `"strTrack"` | Track title |
| `"strTrackLyrics"` | Track lyrics |
| `"strTrackThumb"` | URL to track thumbnail |
| `"trending"` |  |

Operations: List.

API path: `/trending.php`

#### V1Lookup

| Field | Description |
| --- | --- |
| `"idAlbum"` | Album ID |
| `"idArtist"` | Artist ID |
| `"idIMVDB"` | IMVDB ID |
| `"idLabel"` | Label ID |
| `"idLyric"` | Lyrics ID |
| `"idTrack"` | Unique track ID |
| `"intBornYear"` | Birth year of the artist |
| `"intCD"` | CD number |
| `"intCharted"` | Chart position |
| `"intDiedYear"` | Year the artist died (if applicable) |
| `"intDuration"` | Track duration in milliseconds |
| `"intFormedYear"` | Year the artist/band was formed |
| `"intLoved"` | Number of loves/likes |
| `"intMembers"` | Number of band members |
| `"intMusicVidComments"` | Number of music video comments |
| `"intMusicVidDislikes"` | Number of music video dislikes |
| `"intMusicVidFavorites"` | Number of music video favorites |
| `"intMusicVidLikes"` | Number of music video likes |
| `"intMusicVidViews"` | Number of music video views |
| `"intSales"` | Number of sales |
| `"intScore"` | Track score |
| `"intScoreVotes"` | Number of score votes |
| `"intTotalListeners"` | Total number of listeners |
| `"intTotalPlays"` | Total number of plays |
| `"intTrackNumber"` | Track number on album |
| `"intYearReleased"` | Year the album was released |
| `"strAlbum"` | Album title |
| `"strAlbum3DCase"` | URL to 3D case image |
| `"strAlbum3DFace"` | URL to 3D face image |
| `"strAlbum3DFlat"` | URL to 3D flat image |
| `"strAlbum3DThumb"` | URL to 3D thumbnail |
| `"strAlbumCDart"` | URL to CD art |
| `"strAlbumSpine"` | URL to album spine image |
| `"strAlbumStripped"` | Album title without special characters |
| `"strAlbumThumb"` | URL to album thumbnail |
| `"strAlbumThumbBack"` | URL to back of album cover |
| `"strAlbumThumbHQ"` | URL to high quality album thumbnail |
| `"strAllMusicID"` | AllMusic ID |
| `"strAmazonID"` | Amazon ID |
| `"strAppleMusic"` | Apple Music artist URL |
| `"strArtist"` | Artist name |
| `"strArtistAlternate"` | Alternate artist name |
| `"strArtistBanner"` | URL to artist banner |
| `"strArtistClearart"` | URL to artist clearart |
| `"strArtistCutout"` | URL to artist cutout image |
| `"strArtistFanart"` | URL to artist fanart |
| `"strArtistFanart2"` | URL to alternate artist fanart |
| `"strArtistFanart3"` | URL to third artist fanart |
| `"strArtistFanart4"` | URL to fourth artist fanart |
| `"strArtistLogo"` | URL to artist logo |
| `"strArtistStripped"` | Artist name without special characters |
| `"strArtistThumb"` | URL to artist thumbnail image |
| `"strArtistWideThumb"` | URL to artist wide thumbnail |
| `"strBBCReviewID"` | BBC Review ID |
| `"strBiographyCN"` | Artist biography in Chinese |
| `"strBiographyDE"` | Artist biography in German |
| `"strBiographyEN"` | Artist biography in English |
| `"strBiographyES"` | Artist biography in Spanish |
| `"strBiographyFR"` | Artist biography in French |
| `"strBiographyHU"` | Artist biography in Hungarian |
| `"strBiographyIL"` | Artist biography in Hebrew |
| `"strBiographyIT"` | Artist biography in Italian |
| `"strBiographyJP"` | Artist biography in Japanese |
| `"strBiographyNL"` | Artist biography in Dutch |
| `"strBiographyNO"` | Artist biography in Norwegian |
| `"strBiographyPL"` | Artist biography in Polish |
| `"strBiographyPT"` | Artist biography in Portuguese |
| `"strBiographyRU"` | Artist biography in Russian |
| `"strBiographySE"` | Artist biography in Swedish |
| `"strCountry"` | Country of origin |
| `"strCountryCode"` | Country code |
| `"strDescriptionEN"` | Track description in English |
| `"strDisbanded"` | Disbanded status |
| `"strDiscogsID"` | Discogs ID |
| `"strFacebook"` | Facebook page URL |
| `"strGender"` | Artist gender |
| `"strGeniusID"` | Genius ID |
| `"strGenre"` | Track genre |
| `"strInstagram"` | Instagram profile URL |
| `"strItunesID"` | iTunes ID |
| `"strLabel"` | Record label |
| `"strLastFMChart"` | Last.fm chart URL |
| `"strLocation"` | Recording location |
| `"strLocked"` | Whether the record is locked |
| `"strLyricWikiID"` | LyricWiki ID |
| `"strMood"` | Track mood |
| `"strMusicBrainzAlbumID"` | MusicBrainz Album ID |
| `"strMusicBrainzArtistID"` | MusicBrainz Artist ID |
| `"strMusicBrainzID"` | MusicBrainz Recording ID |
| `"strMusicMozID"` | MusicMoz ID |
| `"strMusicVid"` | URL to music video |
| `"strMusicVidCompany"` | Music video production company |
| `"strMusicVidDirector"` | Music video director |
| `"strMusicVidScreen1"` | URL to music video screenshot 1 |
| `"strMusicVidScreen2"` | URL to music video screenshot 2 |
| `"strMusicVidScreen3"` | URL to music video screenshot 3 |
| `"strRateYourMusicID"` | RateYourMusic ID |
| `"strReleaseFormat"` | Release format (CD, Vinyl, etc.) |
| `"strReview"` | Album review |
| `"strSoundCloud"` | SoundCloud profile URL |
| `"strSpeed"` | Album speed |
| `"strSpotify"` | Spotify artist URL |
| `"strStyle"` | Track style |
| `"strTheme"` | Track theme |
| `"strTrack"` | Track title |
| `"strTrackLyrics"` | Track lyrics |
| `"strTrackThumb"` | URL to track thumbnail |
| `"strTwitter"` | Twitter profile URL |
| `"strWebsite"` | Official website URL |
| `"strWikidataID"` | Wikidata ID |
| `"strWikipediaID"` | Wikipedia ID |
| `"strYoutube"` | YouTube channel URL |

Operations: List.

API path: `/track.php`

#### V1Search

| Field | Description |
| --- | --- |
| `"idAlbum"` | Unique album ID |
| `"idArtist"` | Artist ID |
| `"idIMVDB"` | IMVDB ID |
| `"idLabel"` | Label ID |
| `"idLyric"` | Lyrics ID |
| `"idTrack"` | Unique track ID |
| `"intBornYear"` | Birth year of the artist |
| `"intCD"` | CD number |
| `"intCharted"` | Chart position |
| `"intDiedYear"` | Year the artist died (if applicable) |
| `"intDuration"` | Track duration in milliseconds |
| `"intFormedYear"` | Year the artist/band was formed |
| `"intLoved"` | Number of loves/likes |
| `"intMembers"` | Number of band members |
| `"intMusicVidComments"` | Number of music video comments |
| `"intMusicVidDislikes"` | Number of music video dislikes |
| `"intMusicVidFavorites"` | Number of music video favorites |
| `"intMusicVidLikes"` | Number of music video likes |
| `"intMusicVidViews"` | Number of music video views |
| `"intSales"` | Number of sales |
| `"intScore"` | Album score |
| `"intScoreVotes"` | Number of score votes |
| `"intTotalListeners"` | Total number of listeners |
| `"intTotalPlays"` | Total number of plays |
| `"intTrackNumber"` | Track number on album |
| `"intYearReleased"` | Year the album was released |
| `"strAlbum"` | Album title |
| `"strAlbum3DCase"` | URL to 3D case image |
| `"strAlbum3DFace"` | URL to 3D face image |
| `"strAlbum3DFlat"` | URL to 3D flat image |
| `"strAlbum3DThumb"` | URL to 3D thumbnail |
| `"strAlbumCDart"` | URL to CD art |
| `"strAlbumSpine"` | URL to album spine image |
| `"strAlbumStripped"` | Album title without special characters |
| `"strAlbumThumb"` | URL to album thumbnail |
| `"strAlbumThumbBack"` | URL to back of album cover |
| `"strAlbumThumbHQ"` | URL to high quality album thumbnail |
| `"strAllMusicID"` | AllMusic ID |
| `"strAmazonID"` | Amazon ID |
| `"strArtist"` | Artist name |
| `"strArtistAlternate"` | Alternate artist name |
| `"strArtistBanner"` | URL to artist banner |
| `"strArtistClearart"` | URL to artist clearart |
| `"strArtistCutout"` | URL to artist cutout image |
| `"strArtistFanart"` | URL to artist fanart |
| `"strArtistFanart2"` | URL to alternate artist fanart |
| `"strArtistFanart3"` | URL to third artist fanart |
| `"strArtistFanart4"` | URL to fourth artist fanart |
| `"strArtistLogo"` | URL to artist logo |
| `"strArtistStripped"` | Artist name without special characters |
| `"strArtistThumb"` | URL to artist thumbnail image |
| `"strArtistWideThumb"` | URL to artist wide thumbnail |
| `"strBBCReviewID"` | BBC Review ID |
| `"strBiographyCN"` | Artist biography in Chinese |
| `"strBiographyDE"` | Artist biography in German |
| `"strBiographyEN"` | Artist biography in English |
| `"strBiographyES"` | Artist biography in Spanish |
| `"strBiographyFR"` | Artist biography in French |
| `"strBiographyHU"` | Artist biography in Hungarian |
| `"strBiographyIL"` | Artist biography in Hebrew |
| `"strBiographyIT"` | Artist biography in Italian |
| `"strBiographyJP"` | Artist biography in Japanese |
| `"strBiographyNL"` | Artist biography in Dutch |
| `"strBiographyNO"` | Artist biography in Norwegian |
| `"strBiographyPL"` | Artist biography in Polish |
| `"strBiographyPT"` | Artist biography in Portuguese |
| `"strBiographyRU"` | Artist biography in Russian |
| `"strBiographySE"` | Artist biography in Swedish |
| `"strCountry"` | Country of origin |
| `"strCountryCode"` | Country code |
| `"strDescriptionEN"` | Album description in English |
| `"strDisbanded"` | Disbanded status |
| `"strDiscogsID"` | Discogs ID |
| `"strFacebook"` | Facebook page URL |
| `"strGender"` | Artist gender |
| `"strGeniusID"` | Genius ID |
| `"strGenre"` | Album genre |
| `"strItunesID"` | iTunes ID |
| `"strLabel"` | Record label |
| `"strLastFMChart"` | Last.fm chart URL |
| `"strLocation"` | Recording location |
| `"strLocked"` | Whether the record is locked |
| `"strLyricWikiID"` | LyricWiki ID |
| `"strMood"` | Album mood |
| `"strMusicBrainzAlbumID"` | MusicBrainz Album ID |
| `"strMusicBrainzArtistID"` | MusicBrainz Artist ID |
| `"strMusicBrainzID"` | MusicBrainz Release Group ID |
| `"strMusicMozID"` | MusicMoz ID |
| `"strMusicVid"` | URL to music video |
| `"strMusicVidCompany"` | Music video production company |
| `"strMusicVidDirector"` | Music video director |
| `"strMusicVidScreen1"` | URL to music video screenshot 1 |
| `"strMusicVidScreen2"` | URL to music video screenshot 2 |
| `"strMusicVidScreen3"` | URL to music video screenshot 3 |
| `"strRateYourMusicID"` | RateYourMusic ID |
| `"strReleaseFormat"` | Release format (CD, Vinyl, etc.) |
| `"strReview"` | Album review |
| `"strSpeed"` | Album speed |
| `"strStyle"` | Album style |
| `"strTheme"` | Album theme |
| `"strTrack"` | Track title |
| `"strTrackLyrics"` | Track lyrics |
| `"strTrackThumb"` | URL to track thumbnail |
| `"strTwitter"` | Twitter profile URL |
| `"strWebsite"` | Official website URL |
| `"strWikidataID"` | Wikidata ID |
| `"strWikipediaID"` | Wikipedia ID |

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
| `idAlbum` | `int` | Album ID |
| `idArtist` | `int` | Artist ID |
| `idIMVDB` | `int` | IMVDB ID |
| `idLyric` | `int` | Lyrics ID |
| `idTrack` | `int` | Track ID |
| `intCD` | `int` | CD number |
| `intDuration` | `int` | Track duration in milliseconds |
| `intLoved` | `int` | Number of loves/likes |
| `intMusicVidComments` | `int` | Number of music video comments |
| `intMusicVidDislikes` | `int` | Number of music video dislikes |
| `intMusicVidFavorites` | `int` | Number of music video favorites |
| `intMusicVidLikes` | `int` | Number of music video likes |
| `intMusicVidViews` | `int` | Number of music video views |
| `intScore` | `int` | Track score |
| `intScoreVotes` | `int` | Number of score votes |
| `intTotalListeners` | `int` | Total number of listeners |
| `intTotalPlays` | `int` | Total number of plays |
| `intTrackNumber` | `int` | Track number on album |
| `loved` | `[]any` |  |
| `strAlbum` | `string` | Album title |
| `strArtist` | `string` | Artist name |
| `strArtistAlternate` | `string` | Alternate artist name |
| `strDescriptionEN` | `string` | Video description in English |
| `strGenre` | `string` | Track genre |
| `strLocked` | `string` | Whether the record is locked |
| `strMood` | `string` | Track mood |
| `strMusicBrainzAlbumID` | `string` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `string` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `string` | MusicBrainz Recording ID |
| `strMusicVid` | `string` | URL to music video |
| `strMusicVidCompany` | `string` | Music video production company |
| `strMusicVidDirector` | `string` | Music video director |
| `strMusicVidScreen1` | `string` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `string` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `string` | URL to music video screenshot 3 |
| `strStyle` | `string` | Track style |
| `strTheme` | `string` | Track theme |
| `strTrack` | `string` | Track title |
| `strTrackLyrics` | `string` | Track lyrics |
| `strTrackThumb` | `string` | URL to track thumbnail |
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
| `idAlbum` | `int` | Album ID |
| `idArtist` | `int` | Artist ID |
| `idIMVDB` | `int` | IMVDB ID |
| `idLabel` | `int` | Label ID |
| `idLyric` | `int` | Lyrics ID |
| `idTrack` | `int` | Unique track ID |
| `intBornYear` | `int` | Birth year of the artist |
| `intCD` | `int` | CD number |
| `intCharted` | `int` | Chart position |
| `intDiedYear` | `int` | Year the artist died (if applicable) |
| `intDuration` | `int` | Track duration in milliseconds |
| `intFormedYear` | `int` | Year the artist/band was formed |
| `intLoved` | `int` | Number of loves/likes |
| `intMembers` | `int` | Number of band members |
| `intMusicVidComments` | `int` | Number of music video comments |
| `intMusicVidDislikes` | `int` | Number of music video dislikes |
| `intMusicVidFavorites` | `int` | Number of music video favorites |
| `intMusicVidLikes` | `int` | Number of music video likes |
| `intMusicVidViews` | `int` | Number of music video views |
| `intSales` | `int` | Number of sales |
| `intScore` | `int` | Track score |
| `intScoreVotes` | `int` | Number of score votes |
| `intTotalListeners` | `int` | Total number of listeners |
| `intTotalPlays` | `int` | Total number of plays |
| `intTrackNumber` | `int` | Track number on album |
| `intYearReleased` | `int` | Year the album was released |
| `strAlbum` | `string` | Album title |
| `strAlbum3DCase` | `string` | URL to 3D case image |
| `strAlbum3DFace` | `string` | URL to 3D face image |
| `strAlbum3DFlat` | `string` | URL to 3D flat image |
| `strAlbum3DThumb` | `string` | URL to 3D thumbnail |
| `strAlbumCDart` | `string` | URL to CD art |
| `strAlbumSpine` | `string` | URL to album spine image |
| `strAlbumStripped` | `string` | Album title without special characters |
| `strAlbumThumb` | `string` | URL to album thumbnail |
| `strAlbumThumbBack` | `string` | URL to back of album cover |
| `strAlbumThumbHQ` | `string` | URL to high quality album thumbnail |
| `strAllMusicID` | `string` | AllMusic ID |
| `strAmazonID` | `string` | Amazon ID |
| `strAppleMusic` | `string` | Apple Music artist URL |
| `strArtist` | `string` | Artist name |
| `strArtistAlternate` | `string` | Alternate artist name |
| `strArtistBanner` | `string` | URL to artist banner |
| `strArtistClearart` | `string` | URL to artist clearart |
| `strArtistCutout` | `string` | URL to artist cutout image |
| `strArtistFanart` | `string` | URL to artist fanart |
| `strArtistFanart2` | `string` | URL to alternate artist fanart |
| `strArtistFanart3` | `string` | URL to third artist fanart |
| `strArtistFanart4` | `string` | URL to fourth artist fanart |
| `strArtistLogo` | `string` | URL to artist logo |
| `strArtistStripped` | `string` | Artist name without special characters |
| `strArtistThumb` | `string` | URL to artist thumbnail image |
| `strArtistWideThumb` | `string` | URL to artist wide thumbnail |
| `strBBCReviewID` | `string` | BBC Review ID |
| `strBiographyCN` | `string` | Artist biography in Chinese |
| `strBiographyDE` | `string` | Artist biography in German |
| `strBiographyEN` | `string` | Artist biography in English |
| `strBiographyES` | `string` | Artist biography in Spanish |
| `strBiographyFR` | `string` | Artist biography in French |
| `strBiographyHU` | `string` | Artist biography in Hungarian |
| `strBiographyIL` | `string` | Artist biography in Hebrew |
| `strBiographyIT` | `string` | Artist biography in Italian |
| `strBiographyJP` | `string` | Artist biography in Japanese |
| `strBiographyNL` | `string` | Artist biography in Dutch |
| `strBiographyNO` | `string` | Artist biography in Norwegian |
| `strBiographyPL` | `string` | Artist biography in Polish |
| `strBiographyPT` | `string` | Artist biography in Portuguese |
| `strBiographyRU` | `string` | Artist biography in Russian |
| `strBiographySE` | `string` | Artist biography in Swedish |
| `strCountry` | `string` | Country of origin |
| `strCountryCode` | `string` | Country code |
| `strDescriptionEN` | `string` | Track description in English |
| `strDisbanded` | `string` | Disbanded status |
| `strDiscogsID` | `string` | Discogs ID |
| `strFacebook` | `string` | Facebook page URL |
| `strGender` | `string` | Artist gender |
| `strGeniusID` | `string` | Genius ID |
| `strGenre` | `string` | Track genre |
| `strInstagram` | `string` | Instagram profile URL |
| `strItunesID` | `string` | iTunes ID |
| `strLabel` | `string` | Record label |
| `strLastFMChart` | `string` | Last.fm chart URL |
| `strLocation` | `string` | Recording location |
| `strLocked` | `string` | Whether the record is locked |
| `strLyricWikiID` | `string` | LyricWiki ID |
| `strMood` | `string` | Track mood |
| `strMusicBrainzAlbumID` | `string` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `string` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `string` | MusicBrainz Recording ID |
| `strMusicMozID` | `string` | MusicMoz ID |
| `strMusicVid` | `string` | URL to music video |
| `strMusicVidCompany` | `string` | Music video production company |
| `strMusicVidDirector` | `string` | Music video director |
| `strMusicVidScreen1` | `string` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `string` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `string` | URL to music video screenshot 3 |
| `strRateYourMusicID` | `string` | RateYourMusic ID |
| `strReleaseFormat` | `string` | Release format (CD, Vinyl, etc.) |
| `strReview` | `string` | Album review |
| `strSoundCloud` | `string` | SoundCloud profile URL |
| `strSpeed` | `string` | Album speed |
| `strSpotify` | `string` | Spotify artist URL |
| `strStyle` | `string` | Track style |
| `strTheme` | `string` | Track theme |
| `strTrack` | `string` | Track title |
| `strTrackLyrics` | `string` | Track lyrics |
| `strTrackThumb` | `string` | URL to track thumbnail |
| `strTwitter` | `string` | Twitter profile URL |
| `strWebsite` | `string` | Official website URL |
| `strWikidataID` | `string` | Wikidata ID |
| `strWikipediaID` | `string` | Wikipedia ID |
| `strYoutube` | `string` | YouTube channel URL |

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
| `idAlbum` | `int` | Unique album ID |
| `idArtist` | `int` | Artist ID |
| `idIMVDB` | `int` | IMVDB ID |
| `idLabel` | `int` | Label ID |
| `idLyric` | `int` | Lyrics ID |
| `idTrack` | `int` | Unique track ID |
| `intBornYear` | `int` | Birth year of the artist |
| `intCD` | `int` | CD number |
| `intCharted` | `int` | Chart position |
| `intDiedYear` | `int` | Year the artist died (if applicable) |
| `intDuration` | `int` | Track duration in milliseconds |
| `intFormedYear` | `int` | Year the artist/band was formed |
| `intLoved` | `int` | Number of loves/likes |
| `intMembers` | `int` | Number of band members |
| `intMusicVidComments` | `int` | Number of music video comments |
| `intMusicVidDislikes` | `int` | Number of music video dislikes |
| `intMusicVidFavorites` | `int` | Number of music video favorites |
| `intMusicVidLikes` | `int` | Number of music video likes |
| `intMusicVidViews` | `int` | Number of music video views |
| `intSales` | `int` | Number of sales |
| `intScore` | `int` | Album score |
| `intScoreVotes` | `int` | Number of score votes |
| `intTotalListeners` | `int` | Total number of listeners |
| `intTotalPlays` | `int` | Total number of plays |
| `intTrackNumber` | `int` | Track number on album |
| `intYearReleased` | `int` | Year the album was released |
| `strAlbum` | `string` | Album title |
| `strAlbum3DCase` | `string` | URL to 3D case image |
| `strAlbum3DFace` | `string` | URL to 3D face image |
| `strAlbum3DFlat` | `string` | URL to 3D flat image |
| `strAlbum3DThumb` | `string` | URL to 3D thumbnail |
| `strAlbumCDart` | `string` | URL to CD art |
| `strAlbumSpine` | `string` | URL to album spine image |
| `strAlbumStripped` | `string` | Album title without special characters |
| `strAlbumThumb` | `string` | URL to album thumbnail |
| `strAlbumThumbBack` | `string` | URL to back of album cover |
| `strAlbumThumbHQ` | `string` | URL to high quality album thumbnail |
| `strAllMusicID` | `string` | AllMusic ID |
| `strAmazonID` | `string` | Amazon ID |
| `strArtist` | `string` | Artist name |
| `strArtistAlternate` | `string` | Alternate artist name |
| `strArtistBanner` | `string` | URL to artist banner |
| `strArtistClearart` | `string` | URL to artist clearart |
| `strArtistCutout` | `string` | URL to artist cutout image |
| `strArtistFanart` | `string` | URL to artist fanart |
| `strArtistFanart2` | `string` | URL to alternate artist fanart |
| `strArtistFanart3` | `string` | URL to third artist fanart |
| `strArtistFanart4` | `string` | URL to fourth artist fanart |
| `strArtistLogo` | `string` | URL to artist logo |
| `strArtistStripped` | `string` | Artist name without special characters |
| `strArtistThumb` | `string` | URL to artist thumbnail image |
| `strArtistWideThumb` | `string` | URL to artist wide thumbnail |
| `strBBCReviewID` | `string` | BBC Review ID |
| `strBiographyCN` | `string` | Artist biography in Chinese |
| `strBiographyDE` | `string` | Artist biography in German |
| `strBiographyEN` | `string` | Artist biography in English |
| `strBiographyES` | `string` | Artist biography in Spanish |
| `strBiographyFR` | `string` | Artist biography in French |
| `strBiographyHU` | `string` | Artist biography in Hungarian |
| `strBiographyIL` | `string` | Artist biography in Hebrew |
| `strBiographyIT` | `string` | Artist biography in Italian |
| `strBiographyJP` | `string` | Artist biography in Japanese |
| `strBiographyNL` | `string` | Artist biography in Dutch |
| `strBiographyNO` | `string` | Artist biography in Norwegian |
| `strBiographyPL` | `string` | Artist biography in Polish |
| `strBiographyPT` | `string` | Artist biography in Portuguese |
| `strBiographyRU` | `string` | Artist biography in Russian |
| `strBiographySE` | `string` | Artist biography in Swedish |
| `strCountry` | `string` | Country of origin |
| `strCountryCode` | `string` | Country code |
| `strDescriptionEN` | `string` | Album description in English |
| `strDisbanded` | `string` | Disbanded status |
| `strDiscogsID` | `string` | Discogs ID |
| `strFacebook` | `string` | Facebook page URL |
| `strGender` | `string` | Artist gender |
| `strGeniusID` | `string` | Genius ID |
| `strGenre` | `string` | Album genre |
| `strItunesID` | `string` | iTunes ID |
| `strLabel` | `string` | Record label |
| `strLastFMChart` | `string` | Last.fm chart URL |
| `strLocation` | `string` | Recording location |
| `strLocked` | `string` | Whether the record is locked |
| `strLyricWikiID` | `string` | LyricWiki ID |
| `strMood` | `string` | Album mood |
| `strMusicBrainzAlbumID` | `string` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `string` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `string` | MusicBrainz Release Group ID |
| `strMusicMozID` | `string` | MusicMoz ID |
| `strMusicVid` | `string` | URL to music video |
| `strMusicVidCompany` | `string` | Music video production company |
| `strMusicVidDirector` | `string` | Music video director |
| `strMusicVidScreen1` | `string` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `string` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `string` | URL to music video screenshot 3 |
| `strRateYourMusicID` | `string` | RateYourMusic ID |
| `strReleaseFormat` | `string` | Release format (CD, Vinyl, etc.) |
| `strReview` | `string` | Album review |
| `strSpeed` | `string` | Album speed |
| `strStyle` | `string` | Album style |
| `strTheme` | `string` | Album theme |
| `strTrack` | `string` | Track title |
| `strTrackLyrics` | `string` | Track lyrics |
| `strTrackThumb` | `string` | URL to track thumbnail |
| `strTwitter` | `string` | Twitter profile URL |
| `strWebsite` | `string` | Official website URL |
| `strWikidataID` | `string` | Wikidata ID |
| `strWikipediaID` | `string` | Wikipedia ID |

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
