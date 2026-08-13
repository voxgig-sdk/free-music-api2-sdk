# FreeMusicApi2 Lua SDK



The Lua SDK for the FreeMusicApi2 API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:V1List()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/free-music-api2-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("free-music-api2_sdk")

local client = sdk.new({
  apikey = os.getenv("FREE_MUSIC_API2_APIKEY"),
})
```

### 2. List v1list records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local v1lists, err = client:V1List():list()
if err then error(err) end

for _, item in ipairs(v1lists) do
  print(item["strAlbum"])
end
```

### 3. Load a v2list

V2List is nested under artist, so provide the `artist_id`.

```lua
local v2list, err = client:V2List():load({ artist_id = 1 })
if err then error(err) end
print(v2list)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local v2lookup, err = client:V2Lookup():load()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:V2Lookup():load()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### FreeMusicApi2SDK

```lua
local sdk = require("free-music-api2_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FreeMusicApi2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local v2_list, err = client:V2List():load()
    if err then error(err) end
    -- v2_list is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### V1List

| Field | Description |
| --- | --- |
| `idAlbum` |  |
| `idArtist` |  |
| `idIMVDB` |  |
| `idLyric` |  |
| `idTrack` |  |
| `intCD` |  |
| `intDuration` |  |
| `intLoved` |  |
| `intMusicVidComments` |  |
| `intMusicVidDislikes` |  |
| `intMusicVidFavorites` |  |
| `intMusicVidLikes` |  |
| `intMusicVidViews` |  |
| `intScore` |  |
| `intScoreVotes` |  |
| `intTotalListeners` |  |
| `intTotalPlays` |  |
| `intTrackNumber` |  |
| `loved` |  |
| `strAlbum` |  |
| `strArtist` |  |
| `strArtistAlternate` |  |
| `strDescriptionEN` |  |
| `strGenre` |  |
| `strLocked` |  |
| `strMood` |  |
| `strMusicBrainzAlbumID` |  |
| `strMusicBrainzArtistID` |  |
| `strMusicBrainzID` |  |
| `strMusicVid` |  |
| `strMusicVidCompany` |  |
| `strMusicVidDirector` |  |
| `strMusicVidScreen1` |  |
| `strMusicVidScreen2` |  |
| `strMusicVidScreen3` |  |
| `strStyle` |  |
| `strTheme` |  |
| `strTrack` |  |
| `strTrackLyrics` |  |
| `strTrackThumb` |  |
| `trending` |  |

Operations: List.

API path: `/trending.php`

#### V1Lookup

| Field | Description |
| --- | --- |
| `idAlbum` |  |
| `idArtist` |  |
| `idIMVDB` |  |
| `idLabel` |  |
| `idLyric` |  |
| `idTrack` |  |
| `intBornYear` |  |
| `intCD` |  |
| `intCharted` |  |
| `intDiedYear` |  |
| `intDuration` |  |
| `intFormedYear` |  |
| `intLoved` |  |
| `intMembers` |  |
| `intMusicVidComments` |  |
| `intMusicVidDislikes` |  |
| `intMusicVidFavorites` |  |
| `intMusicVidLikes` |  |
| `intMusicVidViews` |  |
| `intSales` |  |
| `intScore` |  |
| `intScoreVotes` |  |
| `intTotalListeners` |  |
| `intTotalPlays` |  |
| `intTrackNumber` |  |
| `intYearReleased` |  |
| `strAlbum` |  |
| `strAlbum3DCase` |  |
| `strAlbum3DFace` |  |
| `strAlbum3DFlat` |  |
| `strAlbum3DThumb` |  |
| `strAlbumCDart` |  |
| `strAlbumSpine` |  |
| `strAlbumStripped` |  |
| `strAlbumThumb` |  |
| `strAlbumThumbBack` |  |
| `strAlbumThumbHQ` |  |
| `strAllMusicID` |  |
| `strAmazonID` |  |
| `strAppleMusic` |  |
| `strArtist` |  |
| `strArtistAlternate` |  |
| `strArtistBanner` |  |
| `strArtistClearart` |  |
| `strArtistCutout` |  |
| `strArtistFanart` |  |
| `strArtistFanart2` |  |
| `strArtistFanart3` |  |
| `strArtistFanart4` |  |
| `strArtistLogo` |  |
| `strArtistStripped` |  |
| `strArtistThumb` |  |
| `strArtistWideThumb` |  |
| `strBBCReviewID` |  |
| `strBiographyCN` |  |
| `strBiographyDE` |  |
| `strBiographyEN` |  |
| `strBiographyES` |  |
| `strBiographyFR` |  |
| `strBiographyHU` |  |
| `strBiographyIL` |  |
| `strBiographyIT` |  |
| `strBiographyJP` |  |
| `strBiographyNL` |  |
| `strBiographyNO` |  |
| `strBiographyPL` |  |
| `strBiographyPT` |  |
| `strBiographyRU` |  |
| `strBiographySE` |  |
| `strCountry` |  |
| `strCountryCode` |  |
| `strDescriptionEN` |  |
| `strDisbanded` |  |
| `strDiscogsID` |  |
| `strFacebook` |  |
| `strGender` |  |
| `strGeniusID` |  |
| `strGenre` |  |
| `strInstagram` |  |
| `strItunesID` |  |
| `strLabel` |  |
| `strLastFMChart` |  |
| `strLocation` |  |
| `strLocked` |  |
| `strLyricWikiID` |  |
| `strMood` |  |
| `strMusicBrainzAlbumID` |  |
| `strMusicBrainzArtistID` |  |
| `strMusicBrainzID` |  |
| `strMusicMozID` |  |
| `strMusicVid` |  |
| `strMusicVidCompany` |  |
| `strMusicVidDirector` |  |
| `strMusicVidScreen1` |  |
| `strMusicVidScreen2` |  |
| `strMusicVidScreen3` |  |
| `strRateYourMusicID` |  |
| `strReleaseFormat` |  |
| `strReview` |  |
| `strSoundCloud` |  |
| `strSpeed` |  |
| `strSpotify` |  |
| `strStyle` |  |
| `strTheme` |  |
| `strTrack` |  |
| `strTrackLyrics` |  |
| `strTrackThumb` |  |
| `strTwitter` |  |
| `strWebsite` |  |
| `strWikidataID` |  |
| `strWikipediaID` |  |
| `strYoutube` |  |

Operations: List.

API path: `/track.php`

#### V1Search

| Field | Description |
| --- | --- |
| `idAlbum` |  |
| `idArtist` |  |
| `idIMVDB` |  |
| `idLabel` |  |
| `idLyric` |  |
| `idTrack` |  |
| `intBornYear` |  |
| `intCD` |  |
| `intCharted` |  |
| `intDiedYear` |  |
| `intDuration` |  |
| `intFormedYear` |  |
| `intLoved` |  |
| `intMembers` |  |
| `intMusicVidComments` |  |
| `intMusicVidDislikes` |  |
| `intMusicVidFavorites` |  |
| `intMusicVidLikes` |  |
| `intMusicVidViews` |  |
| `intSales` |  |
| `intScore` |  |
| `intScoreVotes` |  |
| `intTotalListeners` |  |
| `intTotalPlays` |  |
| `intTrackNumber` |  |
| `intYearReleased` |  |
| `strAlbum` |  |
| `strAlbum3DCase` |  |
| `strAlbum3DFace` |  |
| `strAlbum3DFlat` |  |
| `strAlbum3DThumb` |  |
| `strAlbumCDart` |  |
| `strAlbumSpine` |  |
| `strAlbumStripped` |  |
| `strAlbumThumb` |  |
| `strAlbumThumbBack` |  |
| `strAlbumThumbHQ` |  |
| `strAllMusicID` |  |
| `strAmazonID` |  |
| `strArtist` |  |
| `strArtistAlternate` |  |
| `strArtistBanner` |  |
| `strArtistClearart` |  |
| `strArtistCutout` |  |
| `strArtistFanart` |  |
| `strArtistFanart2` |  |
| `strArtistFanart3` |  |
| `strArtistFanart4` |  |
| `strArtistLogo` |  |
| `strArtistStripped` |  |
| `strArtistThumb` |  |
| `strArtistWideThumb` |  |
| `strBBCReviewID` |  |
| `strBiographyCN` |  |
| `strBiographyDE` |  |
| `strBiographyEN` |  |
| `strBiographyES` |  |
| `strBiographyFR` |  |
| `strBiographyHU` |  |
| `strBiographyIL` |  |
| `strBiographyIT` |  |
| `strBiographyJP` |  |
| `strBiographyNL` |  |
| `strBiographyNO` |  |
| `strBiographyPL` |  |
| `strBiographyPT` |  |
| `strBiographyRU` |  |
| `strBiographySE` |  |
| `strCountry` |  |
| `strCountryCode` |  |
| `strDescriptionEN` |  |
| `strDisbanded` |  |
| `strDiscogsID` |  |
| `strFacebook` |  |
| `strGender` |  |
| `strGeniusID` |  |
| `strGenre` |  |
| `strItunesID` |  |
| `strLabel` |  |
| `strLastFMChart` |  |
| `strLocation` |  |
| `strLocked` |  |
| `strLyricWikiID` |  |
| `strMood` |  |
| `strMusicBrainzAlbumID` |  |
| `strMusicBrainzArtistID` |  |
| `strMusicBrainzID` |  |
| `strMusicMozID` |  |
| `strMusicVid` |  |
| `strMusicVidCompany` |  |
| `strMusicVidDirector` |  |
| `strMusicVidScreen1` |  |
| `strMusicVidScreen2` |  |
| `strMusicVidScreen3` |  |
| `strRateYourMusicID` |  |
| `strReleaseFormat` |  |
| `strReview` |  |
| `strSpeed` |  |
| `strStyle` |  |
| `strTheme` |  |
| `strTrack` |  |
| `strTrackLyrics` |  |
| `strTrackThumb` |  |
| `strTwitter` |  |
| `strWebsite` |  |
| `strWikidataID` |  |
| `strWikipediaID` |  |

Operations: List.

API path: `/searchalbum.php`

#### V2List

| Field | Description |
| --- | --- |
| `albums` |  |

Operations: Load.

API path: `/list/discography/{artistId}`

#### V2Lookup

| Field | Description |
| --- | --- |
| `albums` |  |
| `artists` |  |
| `tracks` |  |

Operations: Load.

API path: `/lookup/album/{albumId}`

#### V2Search

| Field | Description |
| --- | --- |
| `albums` |  |
| `artists` |  |
| `tracks` |  |

Operations: Load.

API path: `/search/album/{albumName}`



## Entities


### V1List

Create an instance: `local v1_list = client:V1List(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idAlbum` | `number` |  |
| `idArtist` | `number` |  |
| `idIMVDB` | `number` |  |
| `idLyric` | `number` |  |
| `idTrack` | `number` |  |
| `intCD` | `number` |  |
| `intDuration` | `number` |  |
| `intLoved` | `number` |  |
| `intMusicVidComments` | `number` |  |
| `intMusicVidDislikes` | `number` |  |
| `intMusicVidFavorites` | `number` |  |
| `intMusicVidLikes` | `number` |  |
| `intMusicVidViews` | `number` |  |
| `intScore` | `number` |  |
| `intScoreVotes` | `number` |  |
| `intTotalListeners` | `number` |  |
| `intTotalPlays` | `number` |  |
| `intTrackNumber` | `number` |  |
| `loved` | `table` |  |
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
| `trending` | `table` |  |

#### Example: List

```lua
local v1_lists, err = client:V1List():list()
```


### V1Lookup

Create an instance: `local v1_lookup = client:V1Lookup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idAlbum` | `number` |  |
| `idArtist` | `number` |  |
| `idIMVDB` | `number` |  |
| `idLabel` | `number` |  |
| `idLyric` | `number` |  |
| `idTrack` | `number` |  |
| `intBornYear` | `number` |  |
| `intCD` | `number` |  |
| `intCharted` | `number` |  |
| `intDiedYear` | `number` |  |
| `intDuration` | `number` |  |
| `intFormedYear` | `number` |  |
| `intLoved` | `number` |  |
| `intMembers` | `number` |  |
| `intMusicVidComments` | `number` |  |
| `intMusicVidDislikes` | `number` |  |
| `intMusicVidFavorites` | `number` |  |
| `intMusicVidLikes` | `number` |  |
| `intMusicVidViews` | `number` |  |
| `intSales` | `number` |  |
| `intScore` | `number` |  |
| `intScoreVotes` | `number` |  |
| `intTotalListeners` | `number` |  |
| `intTotalPlays` | `number` |  |
| `intTrackNumber` | `number` |  |
| `intYearReleased` | `number` |  |
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

```lua
local v1_lookups, err = client:V1Lookup():list()
```


### V1Search

Create an instance: `local v1_search = client:V1Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idAlbum` | `number` |  |
| `idArtist` | `number` |  |
| `idIMVDB` | `number` |  |
| `idLabel` | `number` |  |
| `idLyric` | `number` |  |
| `idTrack` | `number` |  |
| `intBornYear` | `number` |  |
| `intCD` | `number` |  |
| `intCharted` | `number` |  |
| `intDiedYear` | `number` |  |
| `intDuration` | `number` |  |
| `intFormedYear` | `number` |  |
| `intLoved` | `number` |  |
| `intMembers` | `number` |  |
| `intMusicVidComments` | `number` |  |
| `intMusicVidDislikes` | `number` |  |
| `intMusicVidFavorites` | `number` |  |
| `intMusicVidLikes` | `number` |  |
| `intMusicVidViews` | `number` |  |
| `intSales` | `number` |  |
| `intScore` | `number` |  |
| `intScoreVotes` | `number` |  |
| `intTotalListeners` | `number` |  |
| `intTotalPlays` | `number` |  |
| `intTrackNumber` | `number` |  |
| `intYearReleased` | `number` |  |
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

```lua
local v1_searchs, err = client:V1Search():list()
```


### V2List

Create an instance: `local v2_list = client:V2List(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `table` |  |

#### Example: Load

```lua
local v2_list, err = client:V2List():load({ artist_id = 1 })
```


### V2Lookup

Create an instance: `local v2_lookup = client:V2Lookup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `table` |  |
| `artists` | `table` |  |
| `tracks` | `table` |  |

#### Example: Load

```lua
local v2_lookup, err = client:V2Lookup():load()
```


### V2Search

Create an instance: `local v2_search = client:V2Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `table` |  |
| `artists` | `table` |  |
| `tracks` | `table` |  |

#### Example: Load

```lua
local v2_search, err = client:V2Search():load()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── free-music-api2_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`free-music-api2_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local v2lookup = client:V2Lookup()
v2lookup:load()

-- v2lookup:data_get() now returns the v2lookup data from the last load
-- v2lookup:match_get() returns the last match criteria
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
