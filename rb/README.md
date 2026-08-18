# FreeMusicApi2 Ruby SDK



The Ruby SDK for the FreeMusicApi2 API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.V1List` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/free-music-api2-sdk/releases](https://github.com/voxgig-sdk/free-music-api2-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "FreeMusicApi2_sdk"

client = FreeMusicApi2SDK.new({
  "apikey" => ENV["FREE_MUSIC_API2_APIKEY"],
})
```

### 2. List v1list records

```ruby
begin
  # list returns an Array of V1List records — iterate directly.
  v1lists = client.V1List.list
  v1lists.each do |item|
    puts "#{item["idAlbum"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a v2list

V2List is nested under artist, so provide the `artist_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the V2List record (raises on error).
  v2list = client.V2List.load({ "artist_id" => 1 })
  puts v2list
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  v2lookup = client.V2Lookup.load({ "album_id" => 1 })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = FreeMusicApi2SDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
v2lookup = client.V2Lookup.load({ "album_id" => 1 })
puts v2lookup
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = FreeMusicApi2SDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### FreeMusicApi2SDK

```ruby
require_relative "FreeMusicApi2_sdk"
client = FreeMusicApi2SDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = FreeMusicApi2SDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FreeMusicApi2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `FreeMusicApi2Error` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `v1_list = client.V1List`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idAlbum` | `Integer` |  |
| `idArtist` | `Integer` |  |
| `idIMVDB` | `Integer` |  |
| `idLyric` | `Integer` |  |
| `idTrack` | `Integer` |  |
| `intCD` | `Integer` |  |
| `intDuration` | `Integer` |  |
| `intLoved` | `Integer` |  |
| `intMusicVidComments` | `Integer` |  |
| `intMusicVidDislikes` | `Integer` |  |
| `intMusicVidFavorites` | `Integer` |  |
| `intMusicVidLikes` | `Integer` |  |
| `intMusicVidViews` | `Integer` |  |
| `intScore` | `Integer` |  |
| `intScoreVotes` | `Integer` |  |
| `intTotalListeners` | `Integer` |  |
| `intTotalPlays` | `Integer` |  |
| `intTrackNumber` | `Integer` |  |
| `loved` | `Array` |  |
| `strAlbum` | `String` |  |
| `strArtist` | `String` |  |
| `strArtistAlternate` | `String` |  |
| `strDescriptionEN` | `String` |  |
| `strGenre` | `String` |  |
| `strLocked` | `String` |  |
| `strMood` | `String` |  |
| `strMusicBrainzAlbumID` | `String` |  |
| `strMusicBrainzArtistID` | `String` |  |
| `strMusicBrainzID` | `String` |  |
| `strMusicVid` | `String` |  |
| `strMusicVidCompany` | `String` |  |
| `strMusicVidDirector` | `String` |  |
| `strMusicVidScreen1` | `String` |  |
| `strMusicVidScreen2` | `String` |  |
| `strMusicVidScreen3` | `String` |  |
| `strStyle` | `String` |  |
| `strTheme` | `String` |  |
| `strTrack` | `String` |  |
| `strTrackLyrics` | `String` |  |
| `strTrackThumb` | `String` |  |
| `trending` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of V1List records (raises on error).
v1_lists = client.V1List.list
```


### V1Lookup

Create an instance: `v1_lookup = client.V1Lookup`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idAlbum` | `Integer` |  |
| `idArtist` | `Integer` |  |
| `idIMVDB` | `Integer` |  |
| `idLabel` | `Integer` |  |
| `idLyric` | `Integer` |  |
| `idTrack` | `Integer` |  |
| `intBornYear` | `Integer` |  |
| `intCD` | `Integer` |  |
| `intCharted` | `Integer` |  |
| `intDiedYear` | `Integer` |  |
| `intDuration` | `Integer` |  |
| `intFormedYear` | `Integer` |  |
| `intLoved` | `Integer` |  |
| `intMembers` | `Integer` |  |
| `intMusicVidComments` | `Integer` |  |
| `intMusicVidDislikes` | `Integer` |  |
| `intMusicVidFavorites` | `Integer` |  |
| `intMusicVidLikes` | `Integer` |  |
| `intMusicVidViews` | `Integer` |  |
| `intSales` | `Integer` |  |
| `intScore` | `Integer` |  |
| `intScoreVotes` | `Integer` |  |
| `intTotalListeners` | `Integer` |  |
| `intTotalPlays` | `Integer` |  |
| `intTrackNumber` | `Integer` |  |
| `intYearReleased` | `Integer` |  |
| `strAlbum` | `String` |  |
| `strAlbum3DCase` | `String` |  |
| `strAlbum3DFace` | `String` |  |
| `strAlbum3DFlat` | `String` |  |
| `strAlbum3DThumb` | `String` |  |
| `strAlbumCDart` | `String` |  |
| `strAlbumSpine` | `String` |  |
| `strAlbumStripped` | `String` |  |
| `strAlbumThumb` | `String` |  |
| `strAlbumThumbBack` | `String` |  |
| `strAlbumThumbHQ` | `String` |  |
| `strAllMusicID` | `String` |  |
| `strAmazonID` | `String` |  |
| `strAppleMusic` | `String` |  |
| `strArtist` | `String` |  |
| `strArtistAlternate` | `String` |  |
| `strArtistBanner` | `String` |  |
| `strArtistClearart` | `String` |  |
| `strArtistCutout` | `String` |  |
| `strArtistFanart` | `String` |  |
| `strArtistFanart2` | `String` |  |
| `strArtistFanart3` | `String` |  |
| `strArtistFanart4` | `String` |  |
| `strArtistLogo` | `String` |  |
| `strArtistStripped` | `String` |  |
| `strArtistThumb` | `String` |  |
| `strArtistWideThumb` | `String` |  |
| `strBBCReviewID` | `String` |  |
| `strBiographyCN` | `String` |  |
| `strBiographyDE` | `String` |  |
| `strBiographyEN` | `String` |  |
| `strBiographyES` | `String` |  |
| `strBiographyFR` | `String` |  |
| `strBiographyHU` | `String` |  |
| `strBiographyIL` | `String` |  |
| `strBiographyIT` | `String` |  |
| `strBiographyJP` | `String` |  |
| `strBiographyNL` | `String` |  |
| `strBiographyNO` | `String` |  |
| `strBiographyPL` | `String` |  |
| `strBiographyPT` | `String` |  |
| `strBiographyRU` | `String` |  |
| `strBiographySE` | `String` |  |
| `strCountry` | `String` |  |
| `strCountryCode` | `String` |  |
| `strDescriptionEN` | `String` |  |
| `strDisbanded` | `String` |  |
| `strDiscogsID` | `String` |  |
| `strFacebook` | `String` |  |
| `strGender` | `String` |  |
| `strGeniusID` | `String` |  |
| `strGenre` | `String` |  |
| `strInstagram` | `String` |  |
| `strItunesID` | `String` |  |
| `strLabel` | `String` |  |
| `strLastFMChart` | `String` |  |
| `strLocation` | `String` |  |
| `strLocked` | `String` |  |
| `strLyricWikiID` | `String` |  |
| `strMood` | `String` |  |
| `strMusicBrainzAlbumID` | `String` |  |
| `strMusicBrainzArtistID` | `String` |  |
| `strMusicBrainzID` | `String` |  |
| `strMusicMozID` | `String` |  |
| `strMusicVid` | `String` |  |
| `strMusicVidCompany` | `String` |  |
| `strMusicVidDirector` | `String` |  |
| `strMusicVidScreen1` | `String` |  |
| `strMusicVidScreen2` | `String` |  |
| `strMusicVidScreen3` | `String` |  |
| `strRateYourMusicID` | `String` |  |
| `strReleaseFormat` | `String` |  |
| `strReview` | `String` |  |
| `strSoundCloud` | `String` |  |
| `strSpeed` | `String` |  |
| `strSpotify` | `String` |  |
| `strStyle` | `String` |  |
| `strTheme` | `String` |  |
| `strTrack` | `String` |  |
| `strTrackLyrics` | `String` |  |
| `strTrackThumb` | `String` |  |
| `strTwitter` | `String` |  |
| `strWebsite` | `String` |  |
| `strWikidataID` | `String` |  |
| `strWikipediaID` | `String` |  |
| `strYoutube` | `String` |  |

#### Example: List

```ruby
# list returns an Array of V1Lookup records (raises on error).
v1_lookups = client.V1Lookup.list
```


### V1Search

Create an instance: `v1_search = client.V1Search`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idAlbum` | `Integer` |  |
| `idArtist` | `Integer` |  |
| `idIMVDB` | `Integer` |  |
| `idLabel` | `Integer` |  |
| `idLyric` | `Integer` |  |
| `idTrack` | `Integer` |  |
| `intBornYear` | `Integer` |  |
| `intCD` | `Integer` |  |
| `intCharted` | `Integer` |  |
| `intDiedYear` | `Integer` |  |
| `intDuration` | `Integer` |  |
| `intFormedYear` | `Integer` |  |
| `intLoved` | `Integer` |  |
| `intMembers` | `Integer` |  |
| `intMusicVidComments` | `Integer` |  |
| `intMusicVidDislikes` | `Integer` |  |
| `intMusicVidFavorites` | `Integer` |  |
| `intMusicVidLikes` | `Integer` |  |
| `intMusicVidViews` | `Integer` |  |
| `intSales` | `Integer` |  |
| `intScore` | `Integer` |  |
| `intScoreVotes` | `Integer` |  |
| `intTotalListeners` | `Integer` |  |
| `intTotalPlays` | `Integer` |  |
| `intTrackNumber` | `Integer` |  |
| `intYearReleased` | `Integer` |  |
| `strAlbum` | `String` |  |
| `strAlbum3DCase` | `String` |  |
| `strAlbum3DFace` | `String` |  |
| `strAlbum3DFlat` | `String` |  |
| `strAlbum3DThumb` | `String` |  |
| `strAlbumCDart` | `String` |  |
| `strAlbumSpine` | `String` |  |
| `strAlbumStripped` | `String` |  |
| `strAlbumThumb` | `String` |  |
| `strAlbumThumbBack` | `String` |  |
| `strAlbumThumbHQ` | `String` |  |
| `strAllMusicID` | `String` |  |
| `strAmazonID` | `String` |  |
| `strArtist` | `String` |  |
| `strArtistAlternate` | `String` |  |
| `strArtistBanner` | `String` |  |
| `strArtistClearart` | `String` |  |
| `strArtistCutout` | `String` |  |
| `strArtistFanart` | `String` |  |
| `strArtistFanart2` | `String` |  |
| `strArtistFanart3` | `String` |  |
| `strArtistFanart4` | `String` |  |
| `strArtistLogo` | `String` |  |
| `strArtistStripped` | `String` |  |
| `strArtistThumb` | `String` |  |
| `strArtistWideThumb` | `String` |  |
| `strBBCReviewID` | `String` |  |
| `strBiographyCN` | `String` |  |
| `strBiographyDE` | `String` |  |
| `strBiographyEN` | `String` |  |
| `strBiographyES` | `String` |  |
| `strBiographyFR` | `String` |  |
| `strBiographyHU` | `String` |  |
| `strBiographyIL` | `String` |  |
| `strBiographyIT` | `String` |  |
| `strBiographyJP` | `String` |  |
| `strBiographyNL` | `String` |  |
| `strBiographyNO` | `String` |  |
| `strBiographyPL` | `String` |  |
| `strBiographyPT` | `String` |  |
| `strBiographyRU` | `String` |  |
| `strBiographySE` | `String` |  |
| `strCountry` | `String` |  |
| `strCountryCode` | `String` |  |
| `strDescriptionEN` | `String` |  |
| `strDisbanded` | `String` |  |
| `strDiscogsID` | `String` |  |
| `strFacebook` | `String` |  |
| `strGender` | `String` |  |
| `strGeniusID` | `String` |  |
| `strGenre` | `String` |  |
| `strItunesID` | `String` |  |
| `strLabel` | `String` |  |
| `strLastFMChart` | `String` |  |
| `strLocation` | `String` |  |
| `strLocked` | `String` |  |
| `strLyricWikiID` | `String` |  |
| `strMood` | `String` |  |
| `strMusicBrainzAlbumID` | `String` |  |
| `strMusicBrainzArtistID` | `String` |  |
| `strMusicBrainzID` | `String` |  |
| `strMusicMozID` | `String` |  |
| `strMusicVid` | `String` |  |
| `strMusicVidCompany` | `String` |  |
| `strMusicVidDirector` | `String` |  |
| `strMusicVidScreen1` | `String` |  |
| `strMusicVidScreen2` | `String` |  |
| `strMusicVidScreen3` | `String` |  |
| `strRateYourMusicID` | `String` |  |
| `strReleaseFormat` | `String` |  |
| `strReview` | `String` |  |
| `strSpeed` | `String` |  |
| `strStyle` | `String` |  |
| `strTheme` | `String` |  |
| `strTrack` | `String` |  |
| `strTrackLyrics` | `String` |  |
| `strTrackThumb` | `String` |  |
| `strTwitter` | `String` |  |
| `strWebsite` | `String` |  |
| `strWikidataID` | `String` |  |
| `strWikipediaID` | `String` |  |

#### Example: List

```ruby
# list returns an Array of V1Search records (raises on error).
v1_searchs = client.V1Search.list
```


### V2List

Create an instance: `v2_list = client.V2List`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the V2List record (raises on error).
v2_list = client.V2List.load({ "artist_id" => 1 })
```


### V2Lookup

Create an instance: `v2_lookup = client.V2Lookup`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `Array` |  |
| `artists` | `Array` |  |
| `tracks` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the V2Lookup record (raises on error).
v2_lookup = client.V2Lookup.load({ "album_id" => 1 })
```


### V2Search

Create an instance: `v2_search = client.V2Search`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `Array` |  |
| `artists` | `Array` |  |
| `tracks` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the V2Search record (raises on error).
v2_search = client.V2Search.load({ "album_name" => "album_name" })
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── FreeMusicApi2_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`FreeMusicApi2_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
v2lookup = client.V2Lookup
v2lookup.load({ "album_id" => 1 })

# v2lookup.data_get now returns the v2lookup data from the last load
# v2lookup.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
