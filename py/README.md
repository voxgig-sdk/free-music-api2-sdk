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
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

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
    v2lookup = client.V2Lookup().load({"album_id": 1})
    print(v2lookup)
except Exception as err:
    print(f"load failed: {err}")
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

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
v2lookup = client.V2Lookup().load({"album_id": 1})
# v2lookup contains the mock response record
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

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
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

Create an instance: `v1_list = client.V1List()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

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
| `loved` | `list` |  |
| `strAlbum` | `str` |  |
| `strArtist` | `str` |  |
| `strArtistAlternate` | `str` |  |
| `strDescriptionEN` | `str` |  |
| `strGenre` | `str` |  |
| `strLocked` | `str` |  |
| `strMood` | `str` |  |
| `strMusicBrainzAlbumID` | `str` |  |
| `strMusicBrainzArtistID` | `str` |  |
| `strMusicBrainzID` | `str` |  |
| `strMusicVid` | `str` |  |
| `strMusicVidCompany` | `str` |  |
| `strMusicVidDirector` | `str` |  |
| `strMusicVidScreen1` | `str` |  |
| `strMusicVidScreen2` | `str` |  |
| `strMusicVidScreen3` | `str` |  |
| `strStyle` | `str` |  |
| `strTheme` | `str` |  |
| `strTrack` | `str` |  |
| `strTrackLyrics` | `str` |  |
| `strTrackThumb` | `str` |  |
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
| `strAlbum` | `str` |  |
| `strAlbum3DCase` | `str` |  |
| `strAlbum3DFace` | `str` |  |
| `strAlbum3DFlat` | `str` |  |
| `strAlbum3DThumb` | `str` |  |
| `strAlbumCDart` | `str` |  |
| `strAlbumSpine` | `str` |  |
| `strAlbumStripped` | `str` |  |
| `strAlbumThumb` | `str` |  |
| `strAlbumThumbBack` | `str` |  |
| `strAlbumThumbHQ` | `str` |  |
| `strAllMusicID` | `str` |  |
| `strAmazonID` | `str` |  |
| `strAppleMusic` | `str` |  |
| `strArtist` | `str` |  |
| `strArtistAlternate` | `str` |  |
| `strArtistBanner` | `str` |  |
| `strArtistClearart` | `str` |  |
| `strArtistCutout` | `str` |  |
| `strArtistFanart` | `str` |  |
| `strArtistFanart2` | `str` |  |
| `strArtistFanart3` | `str` |  |
| `strArtistFanart4` | `str` |  |
| `strArtistLogo` | `str` |  |
| `strArtistStripped` | `str` |  |
| `strArtistThumb` | `str` |  |
| `strArtistWideThumb` | `str` |  |
| `strBBCReviewID` | `str` |  |
| `strBiographyCN` | `str` |  |
| `strBiographyDE` | `str` |  |
| `strBiographyEN` | `str` |  |
| `strBiographyES` | `str` |  |
| `strBiographyFR` | `str` |  |
| `strBiographyHU` | `str` |  |
| `strBiographyIL` | `str` |  |
| `strBiographyIT` | `str` |  |
| `strBiographyJP` | `str` |  |
| `strBiographyNL` | `str` |  |
| `strBiographyNO` | `str` |  |
| `strBiographyPL` | `str` |  |
| `strBiographyPT` | `str` |  |
| `strBiographyRU` | `str` |  |
| `strBiographySE` | `str` |  |
| `strCountry` | `str` |  |
| `strCountryCode` | `str` |  |
| `strDescriptionEN` | `str` |  |
| `strDisbanded` | `str` |  |
| `strDiscogsID` | `str` |  |
| `strFacebook` | `str` |  |
| `strGender` | `str` |  |
| `strGeniusID` | `str` |  |
| `strGenre` | `str` |  |
| `strInstagram` | `str` |  |
| `strItunesID` | `str` |  |
| `strLabel` | `str` |  |
| `strLastFMChart` | `str` |  |
| `strLocation` | `str` |  |
| `strLocked` | `str` |  |
| `strLyricWikiID` | `str` |  |
| `strMood` | `str` |  |
| `strMusicBrainzAlbumID` | `str` |  |
| `strMusicBrainzArtistID` | `str` |  |
| `strMusicBrainzID` | `str` |  |
| `strMusicMozID` | `str` |  |
| `strMusicVid` | `str` |  |
| `strMusicVidCompany` | `str` |  |
| `strMusicVidDirector` | `str` |  |
| `strMusicVidScreen1` | `str` |  |
| `strMusicVidScreen2` | `str` |  |
| `strMusicVidScreen3` | `str` |  |
| `strRateYourMusicID` | `str` |  |
| `strReleaseFormat` | `str` |  |
| `strReview` | `str` |  |
| `strSoundCloud` | `str` |  |
| `strSpeed` | `str` |  |
| `strSpotify` | `str` |  |
| `strStyle` | `str` |  |
| `strTheme` | `str` |  |
| `strTrack` | `str` |  |
| `strTrackLyrics` | `str` |  |
| `strTrackThumb` | `str` |  |
| `strTwitter` | `str` |  |
| `strWebsite` | `str` |  |
| `strWikidataID` | `str` |  |
| `strWikipediaID` | `str` |  |
| `strYoutube` | `str` |  |

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
| `strAlbum` | `str` |  |
| `strAlbum3DCase` | `str` |  |
| `strAlbum3DFace` | `str` |  |
| `strAlbum3DFlat` | `str` |  |
| `strAlbum3DThumb` | `str` |  |
| `strAlbumCDart` | `str` |  |
| `strAlbumSpine` | `str` |  |
| `strAlbumStripped` | `str` |  |
| `strAlbumThumb` | `str` |  |
| `strAlbumThumbBack` | `str` |  |
| `strAlbumThumbHQ` | `str` |  |
| `strAllMusicID` | `str` |  |
| `strAmazonID` | `str` |  |
| `strArtist` | `str` |  |
| `strArtistAlternate` | `str` |  |
| `strArtistBanner` | `str` |  |
| `strArtistClearart` | `str` |  |
| `strArtistCutout` | `str` |  |
| `strArtistFanart` | `str` |  |
| `strArtistFanart2` | `str` |  |
| `strArtistFanart3` | `str` |  |
| `strArtistFanart4` | `str` |  |
| `strArtistLogo` | `str` |  |
| `strArtistStripped` | `str` |  |
| `strArtistThumb` | `str` |  |
| `strArtistWideThumb` | `str` |  |
| `strBBCReviewID` | `str` |  |
| `strBiographyCN` | `str` |  |
| `strBiographyDE` | `str` |  |
| `strBiographyEN` | `str` |  |
| `strBiographyES` | `str` |  |
| `strBiographyFR` | `str` |  |
| `strBiographyHU` | `str` |  |
| `strBiographyIL` | `str` |  |
| `strBiographyIT` | `str` |  |
| `strBiographyJP` | `str` |  |
| `strBiographyNL` | `str` |  |
| `strBiographyNO` | `str` |  |
| `strBiographyPL` | `str` |  |
| `strBiographyPT` | `str` |  |
| `strBiographyRU` | `str` |  |
| `strBiographySE` | `str` |  |
| `strCountry` | `str` |  |
| `strCountryCode` | `str` |  |
| `strDescriptionEN` | `str` |  |
| `strDisbanded` | `str` |  |
| `strDiscogsID` | `str` |  |
| `strFacebook` | `str` |  |
| `strGender` | `str` |  |
| `strGeniusID` | `str` |  |
| `strGenre` | `str` |  |
| `strItunesID` | `str` |  |
| `strLabel` | `str` |  |
| `strLastFMChart` | `str` |  |
| `strLocation` | `str` |  |
| `strLocked` | `str` |  |
| `strLyricWikiID` | `str` |  |
| `strMood` | `str` |  |
| `strMusicBrainzAlbumID` | `str` |  |
| `strMusicBrainzArtistID` | `str` |  |
| `strMusicBrainzID` | `str` |  |
| `strMusicMozID` | `str` |  |
| `strMusicVid` | `str` |  |
| `strMusicVidCompany` | `str` |  |
| `strMusicVidDirector` | `str` |  |
| `strMusicVidScreen1` | `str` |  |
| `strMusicVidScreen2` | `str` |  |
| `strMusicVidScreen3` | `str` |  |
| `strRateYourMusicID` | `str` |  |
| `strReleaseFormat` | `str` |  |
| `strReview` | `str` |  |
| `strSpeed` | `str` |  |
| `strStyle` | `str` |  |
| `strTheme` | `str` |  |
| `strTrack` | `str` |  |
| `strTrackLyrics` | `str` |  |
| `strTrackThumb` | `str` |  |
| `strTwitter` | `str` |  |
| `strWebsite` | `str` |  |
| `strWikidataID` | `str` |  |
| `strWikipediaID` | `str` |  |

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
| `albums` | `list` |  |

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
| `albums` | `list` |  |
| `artists` | `list` |  |
| `tracks` | `list` |  |

#### Example: Load

```python
v2_lookup = client.V2Lookup().load({"album_id": 1})
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
| `albums` | `list` |  |
| `artists` | `list` |  |
| `tracks` | `list` |  |

#### Example: Load

```python
v2_search = client.V2Search().load({"album_name": "album_name"})
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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
v2lookup = client.V2Lookup()
v2lookup.load({"album_id": 1})

# v2lookup.data_get() now returns the v2lookup data from the last load
# v2lookup.match_get() returns the last match criteria
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
