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
| `idAlbum` | `int` | No |  |
| `idArtist` | `int` | No |  |
| `idIMVDB` | `int` | No |  |
| `idLyric` | `int` | No |  |
| `idTrack` | `int` | No |  |
| `intCD` | `int` | No |  |
| `intDuration` | `int` | No |  |
| `intLoved` | `int` | No |  |
| `intMusicVidComments` | `int` | No |  |
| `intMusicVidDislikes` | `int` | No |  |
| `intMusicVidFavorites` | `int` | No |  |
| `intMusicVidLikes` | `int` | No |  |
| `intMusicVidViews` | `int` | No |  |
| `intScore` | `int` | No |  |
| `intScoreVotes` | `int` | No |  |
| `intTotalListeners` | `int` | No |  |
| `intTotalPlays` | `int` | No |  |
| `intTrackNumber` | `int` | No |  |
| `loved` | `list` | No |  |
| `strAlbum` | `str` | No |  |
| `strArtist` | `str` | No |  |
| `strArtistAlternate` | `str` | No |  |
| `strDescriptionEN` | `str` | No |  |
| `strGenre` | `str` | No |  |
| `strLocked` | `str` | No |  |
| `strMood` | `str` | No |  |
| `strMusicBrainzAlbumID` | `str` | No |  |
| `strMusicBrainzArtistID` | `str` | No |  |
| `strMusicBrainzID` | `str` | No |  |
| `strMusicVid` | `str` | No |  |
| `strMusicVidCompany` | `str` | No |  |
| `strMusicVidDirector` | `str` | No |  |
| `strMusicVidScreen1` | `str` | No |  |
| `strMusicVidScreen2` | `str` | No |  |
| `strMusicVidScreen3` | `str` | No |  |
| `strStyle` | `str` | No |  |
| `strTheme` | `str` | No |  |
| `strTrack` | `str` | No |  |
| `strTrackLyrics` | `str` | No |  |
| `strTrackThumb` | `str` | No |  |
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
| `idAlbum` | `int` | No |  |
| `idArtist` | `int` | No |  |
| `idIMVDB` | `int` | No |  |
| `idLabel` | `int` | No |  |
| `idLyric` | `int` | No |  |
| `idTrack` | `int` | No |  |
| `intBornYear` | `int` | No |  |
| `intCD` | `int` | No |  |
| `intCharted` | `int` | No |  |
| `intDiedYear` | `int` | No |  |
| `intDuration` | `int` | No |  |
| `intFormedYear` | `int` | No |  |
| `intLoved` | `int` | No |  |
| `intMembers` | `int` | No |  |
| `intMusicVidComments` | `int` | No |  |
| `intMusicVidDislikes` | `int` | No |  |
| `intMusicVidFavorites` | `int` | No |  |
| `intMusicVidLikes` | `int` | No |  |
| `intMusicVidViews` | `int` | No |  |
| `intSales` | `int` | No |  |
| `intScore` | `int` | No |  |
| `intScoreVotes` | `int` | No |  |
| `intTotalListeners` | `int` | No |  |
| `intTotalPlays` | `int` | No |  |
| `intTrackNumber` | `int` | No |  |
| `intYearReleased` | `int` | No |  |
| `strAlbum` | `str` | No |  |
| `strAlbum3DCase` | `str` | No |  |
| `strAlbum3DFace` | `str` | No |  |
| `strAlbum3DFlat` | `str` | No |  |
| `strAlbum3DThumb` | `str` | No |  |
| `strAlbumCDart` | `str` | No |  |
| `strAlbumSpine` | `str` | No |  |
| `strAlbumStripped` | `str` | No |  |
| `strAlbumThumb` | `str` | No |  |
| `strAlbumThumbBack` | `str` | No |  |
| `strAlbumThumbHQ` | `str` | No |  |
| `strAllMusicID` | `str` | No |  |
| `strAmazonID` | `str` | No |  |
| `strAppleMusic` | `str` | No |  |
| `strArtist` | `str` | No |  |
| `strArtistAlternate` | `str` | No |  |
| `strArtistBanner` | `str` | No |  |
| `strArtistClearart` | `str` | No |  |
| `strArtistCutout` | `str` | No |  |
| `strArtistFanart` | `str` | No |  |
| `strArtistFanart2` | `str` | No |  |
| `strArtistFanart3` | `str` | No |  |
| `strArtistFanart4` | `str` | No |  |
| `strArtistLogo` | `str` | No |  |
| `strArtistStripped` | `str` | No |  |
| `strArtistThumb` | `str` | No |  |
| `strArtistWideThumb` | `str` | No |  |
| `strBBCReviewID` | `str` | No |  |
| `strBiographyCN` | `str` | No |  |
| `strBiographyDE` | `str` | No |  |
| `strBiographyEN` | `str` | No |  |
| `strBiographyES` | `str` | No |  |
| `strBiographyFR` | `str` | No |  |
| `strBiographyHU` | `str` | No |  |
| `strBiographyIL` | `str` | No |  |
| `strBiographyIT` | `str` | No |  |
| `strBiographyJP` | `str` | No |  |
| `strBiographyNL` | `str` | No |  |
| `strBiographyNO` | `str` | No |  |
| `strBiographyPL` | `str` | No |  |
| `strBiographyPT` | `str` | No |  |
| `strBiographyRU` | `str` | No |  |
| `strBiographySE` | `str` | No |  |
| `strCountry` | `str` | No |  |
| `strCountryCode` | `str` | No |  |
| `strDescriptionEN` | `str` | No |  |
| `strDisbanded` | `str` | No |  |
| `strDiscogsID` | `str` | No |  |
| `strFacebook` | `str` | No |  |
| `strGender` | `str` | No |  |
| `strGeniusID` | `str` | No |  |
| `strGenre` | `str` | No |  |
| `strInstagram` | `str` | No |  |
| `strItunesID` | `str` | No |  |
| `strLabel` | `str` | No |  |
| `strLastFMChart` | `str` | No |  |
| `strLocation` | `str` | No |  |
| `strLocked` | `str` | No |  |
| `strLyricWikiID` | `str` | No |  |
| `strMood` | `str` | No |  |
| `strMusicBrainzAlbumID` | `str` | No |  |
| `strMusicBrainzArtistID` | `str` | No |  |
| `strMusicBrainzID` | `str` | No |  |
| `strMusicMozID` | `str` | No |  |
| `strMusicVid` | `str` | No |  |
| `strMusicVidCompany` | `str` | No |  |
| `strMusicVidDirector` | `str` | No |  |
| `strMusicVidScreen1` | `str` | No |  |
| `strMusicVidScreen2` | `str` | No |  |
| `strMusicVidScreen3` | `str` | No |  |
| `strRateYourMusicID` | `str` | No |  |
| `strReleaseFormat` | `str` | No |  |
| `strReview` | `str` | No |  |
| `strSoundCloud` | `str` | No |  |
| `strSpeed` | `str` | No |  |
| `strSpotify` | `str` | No |  |
| `strStyle` | `str` | No |  |
| `strTheme` | `str` | No |  |
| `strTrack` | `str` | No |  |
| `strTrackLyrics` | `str` | No |  |
| `strTrackThumb` | `str` | No |  |
| `strTwitter` | `str` | No |  |
| `strWebsite` | `str` | No |  |
| `strWikidataID` | `str` | No |  |
| `strWikipediaID` | `str` | No |  |
| `strYoutube` | `str` | No |  |

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
| `idAlbum` | `int` | No |  |
| `idArtist` | `int` | No |  |
| `idIMVDB` | `int` | No |  |
| `idLabel` | `int` | No |  |
| `idLyric` | `int` | No |  |
| `idTrack` | `int` | No |  |
| `intBornYear` | `int` | No |  |
| `intCD` | `int` | No |  |
| `intCharted` | `int` | No |  |
| `intDiedYear` | `int` | No |  |
| `intDuration` | `int` | No |  |
| `intFormedYear` | `int` | No |  |
| `intLoved` | `int` | No |  |
| `intMembers` | `int` | No |  |
| `intMusicVidComments` | `int` | No |  |
| `intMusicVidDislikes` | `int` | No |  |
| `intMusicVidFavorites` | `int` | No |  |
| `intMusicVidLikes` | `int` | No |  |
| `intMusicVidViews` | `int` | No |  |
| `intSales` | `int` | No |  |
| `intScore` | `int` | No |  |
| `intScoreVotes` | `int` | No |  |
| `intTotalListeners` | `int` | No |  |
| `intTotalPlays` | `int` | No |  |
| `intTrackNumber` | `int` | No |  |
| `intYearReleased` | `int` | No |  |
| `strAlbum` | `str` | No |  |
| `strAlbum3DCase` | `str` | No |  |
| `strAlbum3DFace` | `str` | No |  |
| `strAlbum3DFlat` | `str` | No |  |
| `strAlbum3DThumb` | `str` | No |  |
| `strAlbumCDart` | `str` | No |  |
| `strAlbumSpine` | `str` | No |  |
| `strAlbumStripped` | `str` | No |  |
| `strAlbumThumb` | `str` | No |  |
| `strAlbumThumbBack` | `str` | No |  |
| `strAlbumThumbHQ` | `str` | No |  |
| `strAllMusicID` | `str` | No |  |
| `strAmazonID` | `str` | No |  |
| `strArtist` | `str` | No |  |
| `strArtistAlternate` | `str` | No |  |
| `strArtistBanner` | `str` | No |  |
| `strArtistClearart` | `str` | No |  |
| `strArtistCutout` | `str` | No |  |
| `strArtistFanart` | `str` | No |  |
| `strArtistFanart2` | `str` | No |  |
| `strArtistFanart3` | `str` | No |  |
| `strArtistFanart4` | `str` | No |  |
| `strArtistLogo` | `str` | No |  |
| `strArtistStripped` | `str` | No |  |
| `strArtistThumb` | `str` | No |  |
| `strArtistWideThumb` | `str` | No |  |
| `strBBCReviewID` | `str` | No |  |
| `strBiographyCN` | `str` | No |  |
| `strBiographyDE` | `str` | No |  |
| `strBiographyEN` | `str` | No |  |
| `strBiographyES` | `str` | No |  |
| `strBiographyFR` | `str` | No |  |
| `strBiographyHU` | `str` | No |  |
| `strBiographyIL` | `str` | No |  |
| `strBiographyIT` | `str` | No |  |
| `strBiographyJP` | `str` | No |  |
| `strBiographyNL` | `str` | No |  |
| `strBiographyNO` | `str` | No |  |
| `strBiographyPL` | `str` | No |  |
| `strBiographyPT` | `str` | No |  |
| `strBiographyRU` | `str` | No |  |
| `strBiographySE` | `str` | No |  |
| `strCountry` | `str` | No |  |
| `strCountryCode` | `str` | No |  |
| `strDescriptionEN` | `str` | No |  |
| `strDisbanded` | `str` | No |  |
| `strDiscogsID` | `str` | No |  |
| `strFacebook` | `str` | No |  |
| `strGender` | `str` | No |  |
| `strGeniusID` | `str` | No |  |
| `strGenre` | `str` | No |  |
| `strItunesID` | `str` | No |  |
| `strLabel` | `str` | No |  |
| `strLastFMChart` | `str` | No |  |
| `strLocation` | `str` | No |  |
| `strLocked` | `str` | No |  |
| `strLyricWikiID` | `str` | No |  |
| `strMood` | `str` | No |  |
| `strMusicBrainzAlbumID` | `str` | No |  |
| `strMusicBrainzArtistID` | `str` | No |  |
| `strMusicBrainzID` | `str` | No |  |
| `strMusicMozID` | `str` | No |  |
| `strMusicVid` | `str` | No |  |
| `strMusicVidCompany` | `str` | No |  |
| `strMusicVidDirector` | `str` | No |  |
| `strMusicVidScreen1` | `str` | No |  |
| `strMusicVidScreen2` | `str` | No |  |
| `strMusicVidScreen3` | `str` | No |  |
| `strRateYourMusicID` | `str` | No |  |
| `strReleaseFormat` | `str` | No |  |
| `strReview` | `str` | No |  |
| `strSpeed` | `str` | No |  |
| `strStyle` | `str` | No |  |
| `strTheme` | `str` | No |  |
| `strTrack` | `str` | No |  |
| `strTrackLyrics` | `str` | No |  |
| `strTrackThumb` | `str` | No |  |
| `strTwitter` | `str` | No |  |
| `strWebsite` | `str` | No |  |
| `strWikidataID` | `str` | No |  |
| `strWikipediaID` | `str` | No |  |

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
| `albums` | `list` | No |  |

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
| `albums` | `list` | No |  |
| `artists` | `list` | No |  |
| `tracks` | `list` | No |  |

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
| `albums` | `list` | No |  |
| `artists` | `list` | No |  |
| `tracks` | `list` | No |  |

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

