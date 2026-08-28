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
    v1lists = client.V1List().list({"country": "example", "format": "example", "type": "example"})
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
| `idAlbum` | Album ID |
| `idArtist` | Artist ID |
| `idIMVDB` | IMVDB ID |
| `idLyric` | Lyrics ID |
| `idTrack` | Track ID |
| `intCD` | CD number |
| `intDuration` | Track duration in milliseconds |
| `intLoved` | Number of loves/likes |
| `intMusicVidComments` | Number of music video comments |
| `intMusicVidDislikes` | Number of music video dislikes |
| `intMusicVidFavorites` | Number of music video favorites |
| `intMusicVidLikes` | Number of music video likes |
| `intMusicVidViews` | Number of music video views |
| `intScore` | Track score |
| `intScoreVotes` | Number of score votes |
| `intTotalListeners` | Total number of listeners |
| `intTotalPlays` | Total number of plays |
| `intTrackNumber` | Track number on album |
| `loved` |  |
| `strAlbum` | Album title |
| `strArtist` | Artist name |
| `strArtistAlternate` | Alternate artist name |
| `strDescriptionEN` | Video description in English |
| `strGenre` | Track genre |
| `strLocked` | Whether the record is locked |
| `strMood` | Track mood |
| `strMusicBrainzAlbumID` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | MusicBrainz Artist ID |
| `strMusicBrainzID` | MusicBrainz Recording ID |
| `strMusicVid` | URL to music video |
| `strMusicVidCompany` | Music video production company |
| `strMusicVidDirector` | Music video director |
| `strMusicVidScreen1` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | URL to music video screenshot 3 |
| `strStyle` | Track style |
| `strTheme` | Track theme |
| `strTrack` | Track title |
| `strTrackLyrics` | Track lyrics |
| `strTrackThumb` | URL to track thumbnail |
| `trending` |  |

Operations: List.

API path: `/trending.php`

#### V1Lookup

| Field | Description |
| --- | --- |
| `idAlbum` | Album ID |
| `idArtist` | Artist ID |
| `idIMVDB` | IMVDB ID |
| `idLabel` | Label ID |
| `idLyric` | Lyrics ID |
| `idTrack` | Unique track ID |
| `intBornYear` | Birth year of the artist |
| `intCD` | CD number |
| `intCharted` | Chart position |
| `intDiedYear` | Year the artist died (if applicable) |
| `intDuration` | Track duration in milliseconds |
| `intFormedYear` | Year the artist/band was formed |
| `intLoved` | Number of loves/likes |
| `intMembers` | Number of band members |
| `intMusicVidComments` | Number of music video comments |
| `intMusicVidDislikes` | Number of music video dislikes |
| `intMusicVidFavorites` | Number of music video favorites |
| `intMusicVidLikes` | Number of music video likes |
| `intMusicVidViews` | Number of music video views |
| `intSales` | Number of sales |
| `intScore` | Track score |
| `intScoreVotes` | Number of score votes |
| `intTotalListeners` | Total number of listeners |
| `intTotalPlays` | Total number of plays |
| `intTrackNumber` | Track number on album |
| `intYearReleased` | Year the album was released |
| `strAlbum` | Album title |
| `strAlbum3DCase` | URL to 3D case image |
| `strAlbum3DFace` | URL to 3D face image |
| `strAlbum3DFlat` | URL to 3D flat image |
| `strAlbum3DThumb` | URL to 3D thumbnail |
| `strAlbumCDart` | URL to CD art |
| `strAlbumSpine` | URL to album spine image |
| `strAlbumStripped` | Album title without special characters |
| `strAlbumThumb` | URL to album thumbnail |
| `strAlbumThumbBack` | URL to back of album cover |
| `strAlbumThumbHQ` | URL to high quality album thumbnail |
| `strAllMusicID` | AllMusic ID |
| `strAmazonID` | Amazon ID |
| `strAppleMusic` | Apple Music artist URL |
| `strArtist` | Artist name |
| `strArtistAlternate` | Alternate artist name |
| `strArtistBanner` | URL to artist banner |
| `strArtistClearart` | URL to artist clearart |
| `strArtistCutout` | URL to artist cutout image |
| `strArtistFanart` | URL to artist fanart |
| `strArtistFanart2` | URL to alternate artist fanart |
| `strArtistFanart3` | URL to third artist fanart |
| `strArtistFanart4` | URL to fourth artist fanart |
| `strArtistLogo` | URL to artist logo |
| `strArtistStripped` | Artist name without special characters |
| `strArtistThumb` | URL to artist thumbnail image |
| `strArtistWideThumb` | URL to artist wide thumbnail |
| `strBBCReviewID` | BBC Review ID |
| `strBiographyCN` | Artist biography in Chinese |
| `strBiographyDE` | Artist biography in German |
| `strBiographyEN` | Artist biography in English |
| `strBiographyES` | Artist biography in Spanish |
| `strBiographyFR` | Artist biography in French |
| `strBiographyHU` | Artist biography in Hungarian |
| `strBiographyIL` | Artist biography in Hebrew |
| `strBiographyIT` | Artist biography in Italian |
| `strBiographyJP` | Artist biography in Japanese |
| `strBiographyNL` | Artist biography in Dutch |
| `strBiographyNO` | Artist biography in Norwegian |
| `strBiographyPL` | Artist biography in Polish |
| `strBiographyPT` | Artist biography in Portuguese |
| `strBiographyRU` | Artist biography in Russian |
| `strBiographySE` | Artist biography in Swedish |
| `strCountry` | Country of origin |
| `strCountryCode` | Country code |
| `strDescriptionEN` | Track description in English |
| `strDisbanded` | Disbanded status |
| `strDiscogsID` | Discogs ID |
| `strFacebook` | Facebook page URL |
| `strGender` | Artist gender |
| `strGeniusID` | Genius ID |
| `strGenre` | Track genre |
| `strInstagram` | Instagram profile URL |
| `strItunesID` | iTunes ID |
| `strLabel` | Record label |
| `strLastFMChart` | Last.fm chart URL |
| `strLocation` | Recording location |
| `strLocked` | Whether the record is locked |
| `strLyricWikiID` | LyricWiki ID |
| `strMood` | Track mood |
| `strMusicBrainzAlbumID` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | MusicBrainz Artist ID |
| `strMusicBrainzID` | MusicBrainz Recording ID |
| `strMusicMozID` | MusicMoz ID |
| `strMusicVid` | URL to music video |
| `strMusicVidCompany` | Music video production company |
| `strMusicVidDirector` | Music video director |
| `strMusicVidScreen1` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | URL to music video screenshot 3 |
| `strRateYourMusicID` | RateYourMusic ID |
| `strReleaseFormat` | Release format (CD, Vinyl, etc.) |
| `strReview` | Album review |
| `strSoundCloud` | SoundCloud profile URL |
| `strSpeed` | Album speed |
| `strSpotify` | Spotify artist URL |
| `strStyle` | Track style |
| `strTheme` | Track theme |
| `strTrack` | Track title |
| `strTrackLyrics` | Track lyrics |
| `strTrackThumb` | URL to track thumbnail |
| `strTwitter` | Twitter profile URL |
| `strWebsite` | Official website URL |
| `strWikidataID` | Wikidata ID |
| `strWikipediaID` | Wikipedia ID |
| `strYoutube` | YouTube channel URL |

Operations: List.

API path: `/track.php`

#### V1Search

| Field | Description |
| --- | --- |
| `idAlbum` | Unique album ID |
| `idArtist` | Artist ID |
| `idIMVDB` | IMVDB ID |
| `idLabel` | Label ID |
| `idLyric` | Lyrics ID |
| `idTrack` | Unique track ID |
| `intBornYear` | Birth year of the artist |
| `intCD` | CD number |
| `intCharted` | Chart position |
| `intDiedYear` | Year the artist died (if applicable) |
| `intDuration` | Track duration in milliseconds |
| `intFormedYear` | Year the artist/band was formed |
| `intLoved` | Number of loves/likes |
| `intMembers` | Number of band members |
| `intMusicVidComments` | Number of music video comments |
| `intMusicVidDislikes` | Number of music video dislikes |
| `intMusicVidFavorites` | Number of music video favorites |
| `intMusicVidLikes` | Number of music video likes |
| `intMusicVidViews` | Number of music video views |
| `intSales` | Number of sales |
| `intScore` | Album score |
| `intScoreVotes` | Number of score votes |
| `intTotalListeners` | Total number of listeners |
| `intTotalPlays` | Total number of plays |
| `intTrackNumber` | Track number on album |
| `intYearReleased` | Year the album was released |
| `strAlbum` | Album title |
| `strAlbum3DCase` | URL to 3D case image |
| `strAlbum3DFace` | URL to 3D face image |
| `strAlbum3DFlat` | URL to 3D flat image |
| `strAlbum3DThumb` | URL to 3D thumbnail |
| `strAlbumCDart` | URL to CD art |
| `strAlbumSpine` | URL to album spine image |
| `strAlbumStripped` | Album title without special characters |
| `strAlbumThumb` | URL to album thumbnail |
| `strAlbumThumbBack` | URL to back of album cover |
| `strAlbumThumbHQ` | URL to high quality album thumbnail |
| `strAllMusicID` | AllMusic ID |
| `strAmazonID` | Amazon ID |
| `strArtist` | Artist name |
| `strArtistAlternate` | Alternate artist name |
| `strArtistBanner` | URL to artist banner |
| `strArtistClearart` | URL to artist clearart |
| `strArtistCutout` | URL to artist cutout image |
| `strArtistFanart` | URL to artist fanart |
| `strArtistFanart2` | URL to alternate artist fanart |
| `strArtistFanart3` | URL to third artist fanart |
| `strArtistFanart4` | URL to fourth artist fanart |
| `strArtistLogo` | URL to artist logo |
| `strArtistStripped` | Artist name without special characters |
| `strArtistThumb` | URL to artist thumbnail image |
| `strArtistWideThumb` | URL to artist wide thumbnail |
| `strBBCReviewID` | BBC Review ID |
| `strBiographyCN` | Artist biography in Chinese |
| `strBiographyDE` | Artist biography in German |
| `strBiographyEN` | Artist biography in English |
| `strBiographyES` | Artist biography in Spanish |
| `strBiographyFR` | Artist biography in French |
| `strBiographyHU` | Artist biography in Hungarian |
| `strBiographyIL` | Artist biography in Hebrew |
| `strBiographyIT` | Artist biography in Italian |
| `strBiographyJP` | Artist biography in Japanese |
| `strBiographyNL` | Artist biography in Dutch |
| `strBiographyNO` | Artist biography in Norwegian |
| `strBiographyPL` | Artist biography in Polish |
| `strBiographyPT` | Artist biography in Portuguese |
| `strBiographyRU` | Artist biography in Russian |
| `strBiographySE` | Artist biography in Swedish |
| `strCountry` | Country of origin |
| `strCountryCode` | Country code |
| `strDescriptionEN` | Album description in English |
| `strDisbanded` | Disbanded status |
| `strDiscogsID` | Discogs ID |
| `strFacebook` | Facebook page URL |
| `strGender` | Artist gender |
| `strGeniusID` | Genius ID |
| `strGenre` | Album genre |
| `strItunesID` | iTunes ID |
| `strLabel` | Record label |
| `strLastFMChart` | Last.fm chart URL |
| `strLocation` | Recording location |
| `strLocked` | Whether the record is locked |
| `strLyricWikiID` | LyricWiki ID |
| `strMood` | Album mood |
| `strMusicBrainzAlbumID` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | MusicBrainz Artist ID |
| `strMusicBrainzID` | MusicBrainz Release Group ID |
| `strMusicMozID` | MusicMoz ID |
| `strMusicVid` | URL to music video |
| `strMusicVidCompany` | Music video production company |
| `strMusicVidDirector` | Music video director |
| `strMusicVidScreen1` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | URL to music video screenshot 3 |
| `strRateYourMusicID` | RateYourMusic ID |
| `strReleaseFormat` | Release format (CD, Vinyl, etc.) |
| `strReview` | Album review |
| `strSpeed` | Album speed |
| `strStyle` | Album style |
| `strTheme` | Album theme |
| `strTrack` | Track title |
| `strTrackLyrics` | Track lyrics |
| `strTrackThumb` | URL to track thumbnail |
| `strTwitter` | Twitter profile URL |
| `strWebsite` | Official website URL |
| `strWikidataID` | Wikidata ID |
| `strWikipediaID` | Wikipedia ID |

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
| `loved` | `list` |  |
| `strAlbum` | `str` | Album title |
| `strArtist` | `str` | Artist name |
| `strArtistAlternate` | `str` | Alternate artist name |
| `strDescriptionEN` | `str` | Video description in English |
| `strGenre` | `str` | Track genre |
| `strLocked` | `str` | Whether the record is locked |
| `strMood` | `str` | Track mood |
| `strMusicBrainzAlbumID` | `str` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `str` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `str` | MusicBrainz Recording ID |
| `strMusicVid` | `str` | URL to music video |
| `strMusicVidCompany` | `str` | Music video production company |
| `strMusicVidDirector` | `str` | Music video director |
| `strMusicVidScreen1` | `str` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `str` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `str` | URL to music video screenshot 3 |
| `strStyle` | `str` | Track style |
| `strTheme` | `str` | Track theme |
| `strTrack` | `str` | Track title |
| `strTrackLyrics` | `str` | Track lyrics |
| `strTrackThumb` | `str` | URL to track thumbnail |
| `trending` | `list` |  |

#### Example: List

```python
v1_lists = client.V1List().list({"country": "example", "format": "example", "type": "example"})
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
| `strAlbum` | `str` | Album title |
| `strAlbum3DCase` | `str` | URL to 3D case image |
| `strAlbum3DFace` | `str` | URL to 3D face image |
| `strAlbum3DFlat` | `str` | URL to 3D flat image |
| `strAlbum3DThumb` | `str` | URL to 3D thumbnail |
| `strAlbumCDart` | `str` | URL to CD art |
| `strAlbumSpine` | `str` | URL to album spine image |
| `strAlbumStripped` | `str` | Album title without special characters |
| `strAlbumThumb` | `str` | URL to album thumbnail |
| `strAlbumThumbBack` | `str` | URL to back of album cover |
| `strAlbumThumbHQ` | `str` | URL to high quality album thumbnail |
| `strAllMusicID` | `str` | AllMusic ID |
| `strAmazonID` | `str` | Amazon ID |
| `strAppleMusic` | `str` | Apple Music artist URL |
| `strArtist` | `str` | Artist name |
| `strArtistAlternate` | `str` | Alternate artist name |
| `strArtistBanner` | `str` | URL to artist banner |
| `strArtistClearart` | `str` | URL to artist clearart |
| `strArtistCutout` | `str` | URL to artist cutout image |
| `strArtistFanart` | `str` | URL to artist fanart |
| `strArtistFanart2` | `str` | URL to alternate artist fanart |
| `strArtistFanart3` | `str` | URL to third artist fanart |
| `strArtistFanart4` | `str` | URL to fourth artist fanart |
| `strArtistLogo` | `str` | URL to artist logo |
| `strArtistStripped` | `str` | Artist name without special characters |
| `strArtistThumb` | `str` | URL to artist thumbnail image |
| `strArtistWideThumb` | `str` | URL to artist wide thumbnail |
| `strBBCReviewID` | `str` | BBC Review ID |
| `strBiographyCN` | `str` | Artist biography in Chinese |
| `strBiographyDE` | `str` | Artist biography in German |
| `strBiographyEN` | `str` | Artist biography in English |
| `strBiographyES` | `str` | Artist biography in Spanish |
| `strBiographyFR` | `str` | Artist biography in French |
| `strBiographyHU` | `str` | Artist biography in Hungarian |
| `strBiographyIL` | `str` | Artist biography in Hebrew |
| `strBiographyIT` | `str` | Artist biography in Italian |
| `strBiographyJP` | `str` | Artist biography in Japanese |
| `strBiographyNL` | `str` | Artist biography in Dutch |
| `strBiographyNO` | `str` | Artist biography in Norwegian |
| `strBiographyPL` | `str` | Artist biography in Polish |
| `strBiographyPT` | `str` | Artist biography in Portuguese |
| `strBiographyRU` | `str` | Artist biography in Russian |
| `strBiographySE` | `str` | Artist biography in Swedish |
| `strCountry` | `str` | Country of origin |
| `strCountryCode` | `str` | Country code |
| `strDescriptionEN` | `str` | Track description in English |
| `strDisbanded` | `str` | Disbanded status |
| `strDiscogsID` | `str` | Discogs ID |
| `strFacebook` | `str` | Facebook page URL |
| `strGender` | `str` | Artist gender |
| `strGeniusID` | `str` | Genius ID |
| `strGenre` | `str` | Track genre |
| `strInstagram` | `str` | Instagram profile URL |
| `strItunesID` | `str` | iTunes ID |
| `strLabel` | `str` | Record label |
| `strLastFMChart` | `str` | Last.fm chart URL |
| `strLocation` | `str` | Recording location |
| `strLocked` | `str` | Whether the record is locked |
| `strLyricWikiID` | `str` | LyricWiki ID |
| `strMood` | `str` | Track mood |
| `strMusicBrainzAlbumID` | `str` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `str` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `str` | MusicBrainz Recording ID |
| `strMusicMozID` | `str` | MusicMoz ID |
| `strMusicVid` | `str` | URL to music video |
| `strMusicVidCompany` | `str` | Music video production company |
| `strMusicVidDirector` | `str` | Music video director |
| `strMusicVidScreen1` | `str` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `str` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `str` | URL to music video screenshot 3 |
| `strRateYourMusicID` | `str` | RateYourMusic ID |
| `strReleaseFormat` | `str` | Release format (CD, Vinyl, etc.) |
| `strReview` | `str` | Album review |
| `strSoundCloud` | `str` | SoundCloud profile URL |
| `strSpeed` | `str` | Album speed |
| `strSpotify` | `str` | Spotify artist URL |
| `strStyle` | `str` | Track style |
| `strTheme` | `str` | Track theme |
| `strTrack` | `str` | Track title |
| `strTrackLyrics` | `str` | Track lyrics |
| `strTrackThumb` | `str` | URL to track thumbnail |
| `strTwitter` | `str` | Twitter profile URL |
| `strWebsite` | `str` | Official website URL |
| `strWikidataID` | `str` | Wikidata ID |
| `strWikipediaID` | `str` | Wikipedia ID |
| `strYoutube` | `str` | YouTube channel URL |

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
| `strAlbum` | `str` | Album title |
| `strAlbum3DCase` | `str` | URL to 3D case image |
| `strAlbum3DFace` | `str` | URL to 3D face image |
| `strAlbum3DFlat` | `str` | URL to 3D flat image |
| `strAlbum3DThumb` | `str` | URL to 3D thumbnail |
| `strAlbumCDart` | `str` | URL to CD art |
| `strAlbumSpine` | `str` | URL to album spine image |
| `strAlbumStripped` | `str` | Album title without special characters |
| `strAlbumThumb` | `str` | URL to album thumbnail |
| `strAlbumThumbBack` | `str` | URL to back of album cover |
| `strAlbumThumbHQ` | `str` | URL to high quality album thumbnail |
| `strAllMusicID` | `str` | AllMusic ID |
| `strAmazonID` | `str` | Amazon ID |
| `strArtist` | `str` | Artist name |
| `strArtistAlternate` | `str` | Alternate artist name |
| `strArtistBanner` | `str` | URL to artist banner |
| `strArtistClearart` | `str` | URL to artist clearart |
| `strArtistCutout` | `str` | URL to artist cutout image |
| `strArtistFanart` | `str` | URL to artist fanart |
| `strArtistFanart2` | `str` | URL to alternate artist fanart |
| `strArtistFanart3` | `str` | URL to third artist fanart |
| `strArtistFanart4` | `str` | URL to fourth artist fanart |
| `strArtistLogo` | `str` | URL to artist logo |
| `strArtistStripped` | `str` | Artist name without special characters |
| `strArtistThumb` | `str` | URL to artist thumbnail image |
| `strArtistWideThumb` | `str` | URL to artist wide thumbnail |
| `strBBCReviewID` | `str` | BBC Review ID |
| `strBiographyCN` | `str` | Artist biography in Chinese |
| `strBiographyDE` | `str` | Artist biography in German |
| `strBiographyEN` | `str` | Artist biography in English |
| `strBiographyES` | `str` | Artist biography in Spanish |
| `strBiographyFR` | `str` | Artist biography in French |
| `strBiographyHU` | `str` | Artist biography in Hungarian |
| `strBiographyIL` | `str` | Artist biography in Hebrew |
| `strBiographyIT` | `str` | Artist biography in Italian |
| `strBiographyJP` | `str` | Artist biography in Japanese |
| `strBiographyNL` | `str` | Artist biography in Dutch |
| `strBiographyNO` | `str` | Artist biography in Norwegian |
| `strBiographyPL` | `str` | Artist biography in Polish |
| `strBiographyPT` | `str` | Artist biography in Portuguese |
| `strBiographyRU` | `str` | Artist biography in Russian |
| `strBiographySE` | `str` | Artist biography in Swedish |
| `strCountry` | `str` | Country of origin |
| `strCountryCode` | `str` | Country code |
| `strDescriptionEN` | `str` | Album description in English |
| `strDisbanded` | `str` | Disbanded status |
| `strDiscogsID` | `str` | Discogs ID |
| `strFacebook` | `str` | Facebook page URL |
| `strGender` | `str` | Artist gender |
| `strGeniusID` | `str` | Genius ID |
| `strGenre` | `str` | Album genre |
| `strItunesID` | `str` | iTunes ID |
| `strLabel` | `str` | Record label |
| `strLastFMChart` | `str` | Last.fm chart URL |
| `strLocation` | `str` | Recording location |
| `strLocked` | `str` | Whether the record is locked |
| `strLyricWikiID` | `str` | LyricWiki ID |
| `strMood` | `str` | Album mood |
| `strMusicBrainzAlbumID` | `str` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `str` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `str` | MusicBrainz Release Group ID |
| `strMusicMozID` | `str` | MusicMoz ID |
| `strMusicVid` | `str` | URL to music video |
| `strMusicVidCompany` | `str` | Music video production company |
| `strMusicVidDirector` | `str` | Music video director |
| `strMusicVidScreen1` | `str` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `str` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `str` | URL to music video screenshot 3 |
| `strRateYourMusicID` | `str` | RateYourMusic ID |
| `strReleaseFormat` | `str` | Release format (CD, Vinyl, etc.) |
| `strReview` | `str` | Album review |
| `strSpeed` | `str` | Album speed |
| `strStyle` | `str` | Album style |
| `strTheme` | `str` | Album theme |
| `strTrack` | `str` | Track title |
| `strTrackLyrics` | `str` | Track lyrics |
| `strTrackThumb` | `str` | URL to track thumbnail |
| `strTwitter` | `str` | Twitter profile URL |
| `strWebsite` | `str` | Official website URL |
| `strWikidataID` | `str` | Wikidata ID |
| `strWikipediaID` | `str` | Wikipedia ID |

#### Example: List

```python
v1_searchs = client.V1Search().list({"s": "example"})
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

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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
