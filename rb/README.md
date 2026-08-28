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

Create an instance: `v1_list = client.V1List`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `idAlbum` | `Integer` | Album ID |
| `idArtist` | `Integer` | Artist ID |
| `idIMVDB` | `Integer` | IMVDB ID |
| `idLyric` | `Integer` | Lyrics ID |
| `idTrack` | `Integer` | Track ID |
| `intCD` | `Integer` | CD number |
| `intDuration` | `Integer` | Track duration in milliseconds |
| `intLoved` | `Integer` | Number of loves/likes |
| `intMusicVidComments` | `Integer` | Number of music video comments |
| `intMusicVidDislikes` | `Integer` | Number of music video dislikes |
| `intMusicVidFavorites` | `Integer` | Number of music video favorites |
| `intMusicVidLikes` | `Integer` | Number of music video likes |
| `intMusicVidViews` | `Integer` | Number of music video views |
| `intScore` | `Integer` | Track score |
| `intScoreVotes` | `Integer` | Number of score votes |
| `intTotalListeners` | `Integer` | Total number of listeners |
| `intTotalPlays` | `Integer` | Total number of plays |
| `intTrackNumber` | `Integer` | Track number on album |
| `loved` | `Array` |  |
| `strAlbum` | `String` | Album title |
| `strArtist` | `String` | Artist name |
| `strArtistAlternate` | `String` | Alternate artist name |
| `strDescriptionEN` | `String` | Video description in English |
| `strGenre` | `String` | Track genre |
| `strLocked` | `String` | Whether the record is locked |
| `strMood` | `String` | Track mood |
| `strMusicBrainzAlbumID` | `String` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `String` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `String` | MusicBrainz Recording ID |
| `strMusicVid` | `String` | URL to music video |
| `strMusicVidCompany` | `String` | Music video production company |
| `strMusicVidDirector` | `String` | Music video director |
| `strMusicVidScreen1` | `String` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `String` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `String` | URL to music video screenshot 3 |
| `strStyle` | `String` | Track style |
| `strTheme` | `String` | Track theme |
| `strTrack` | `String` | Track title |
| `strTrackLyrics` | `String` | Track lyrics |
| `strTrackThumb` | `String` | URL to track thumbnail |
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
| `idAlbum` | `Integer` | Album ID |
| `idArtist` | `Integer` | Artist ID |
| `idIMVDB` | `Integer` | IMVDB ID |
| `idLabel` | `Integer` | Label ID |
| `idLyric` | `Integer` | Lyrics ID |
| `idTrack` | `Integer` | Unique track ID |
| `intBornYear` | `Integer` | Birth year of the artist |
| `intCD` | `Integer` | CD number |
| `intCharted` | `Integer` | Chart position |
| `intDiedYear` | `Integer` | Year the artist died (if applicable) |
| `intDuration` | `Integer` | Track duration in milliseconds |
| `intFormedYear` | `Integer` | Year the artist/band was formed |
| `intLoved` | `Integer` | Number of loves/likes |
| `intMembers` | `Integer` | Number of band members |
| `intMusicVidComments` | `Integer` | Number of music video comments |
| `intMusicVidDislikes` | `Integer` | Number of music video dislikes |
| `intMusicVidFavorites` | `Integer` | Number of music video favorites |
| `intMusicVidLikes` | `Integer` | Number of music video likes |
| `intMusicVidViews` | `Integer` | Number of music video views |
| `intSales` | `Integer` | Number of sales |
| `intScore` | `Integer` | Track score |
| `intScoreVotes` | `Integer` | Number of score votes |
| `intTotalListeners` | `Integer` | Total number of listeners |
| `intTotalPlays` | `Integer` | Total number of plays |
| `intTrackNumber` | `Integer` | Track number on album |
| `intYearReleased` | `Integer` | Year the album was released |
| `strAlbum` | `String` | Album title |
| `strAlbum3DCase` | `String` | URL to 3D case image |
| `strAlbum3DFace` | `String` | URL to 3D face image |
| `strAlbum3DFlat` | `String` | URL to 3D flat image |
| `strAlbum3DThumb` | `String` | URL to 3D thumbnail |
| `strAlbumCDart` | `String` | URL to CD art |
| `strAlbumSpine` | `String` | URL to album spine image |
| `strAlbumStripped` | `String` | Album title without special characters |
| `strAlbumThumb` | `String` | URL to album thumbnail |
| `strAlbumThumbBack` | `String` | URL to back of album cover |
| `strAlbumThumbHQ` | `String` | URL to high quality album thumbnail |
| `strAllMusicID` | `String` | AllMusic ID |
| `strAmazonID` | `String` | Amazon ID |
| `strAppleMusic` | `String` | Apple Music artist URL |
| `strArtist` | `String` | Artist name |
| `strArtistAlternate` | `String` | Alternate artist name |
| `strArtistBanner` | `String` | URL to artist banner |
| `strArtistClearart` | `String` | URL to artist clearart |
| `strArtistCutout` | `String` | URL to artist cutout image |
| `strArtistFanart` | `String` | URL to artist fanart |
| `strArtistFanart2` | `String` | URL to alternate artist fanart |
| `strArtistFanart3` | `String` | URL to third artist fanart |
| `strArtistFanart4` | `String` | URL to fourth artist fanart |
| `strArtistLogo` | `String` | URL to artist logo |
| `strArtistStripped` | `String` | Artist name without special characters |
| `strArtistThumb` | `String` | URL to artist thumbnail image |
| `strArtistWideThumb` | `String` | URL to artist wide thumbnail |
| `strBBCReviewID` | `String` | BBC Review ID |
| `strBiographyCN` | `String` | Artist biography in Chinese |
| `strBiographyDE` | `String` | Artist biography in German |
| `strBiographyEN` | `String` | Artist biography in English |
| `strBiographyES` | `String` | Artist biography in Spanish |
| `strBiographyFR` | `String` | Artist biography in French |
| `strBiographyHU` | `String` | Artist biography in Hungarian |
| `strBiographyIL` | `String` | Artist biography in Hebrew |
| `strBiographyIT` | `String` | Artist biography in Italian |
| `strBiographyJP` | `String` | Artist biography in Japanese |
| `strBiographyNL` | `String` | Artist biography in Dutch |
| `strBiographyNO` | `String` | Artist biography in Norwegian |
| `strBiographyPL` | `String` | Artist biography in Polish |
| `strBiographyPT` | `String` | Artist biography in Portuguese |
| `strBiographyRU` | `String` | Artist biography in Russian |
| `strBiographySE` | `String` | Artist biography in Swedish |
| `strCountry` | `String` | Country of origin |
| `strCountryCode` | `String` | Country code |
| `strDescriptionEN` | `String` | Track description in English |
| `strDisbanded` | `String` | Disbanded status |
| `strDiscogsID` | `String` | Discogs ID |
| `strFacebook` | `String` | Facebook page URL |
| `strGender` | `String` | Artist gender |
| `strGeniusID` | `String` | Genius ID |
| `strGenre` | `String` | Track genre |
| `strInstagram` | `String` | Instagram profile URL |
| `strItunesID` | `String` | iTunes ID |
| `strLabel` | `String` | Record label |
| `strLastFMChart` | `String` | Last.fm chart URL |
| `strLocation` | `String` | Recording location |
| `strLocked` | `String` | Whether the record is locked |
| `strLyricWikiID` | `String` | LyricWiki ID |
| `strMood` | `String` | Track mood |
| `strMusicBrainzAlbumID` | `String` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `String` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `String` | MusicBrainz Recording ID |
| `strMusicMozID` | `String` | MusicMoz ID |
| `strMusicVid` | `String` | URL to music video |
| `strMusicVidCompany` | `String` | Music video production company |
| `strMusicVidDirector` | `String` | Music video director |
| `strMusicVidScreen1` | `String` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `String` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `String` | URL to music video screenshot 3 |
| `strRateYourMusicID` | `String` | RateYourMusic ID |
| `strReleaseFormat` | `String` | Release format (CD, Vinyl, etc.) |
| `strReview` | `String` | Album review |
| `strSoundCloud` | `String` | SoundCloud profile URL |
| `strSpeed` | `String` | Album speed |
| `strSpotify` | `String` | Spotify artist URL |
| `strStyle` | `String` | Track style |
| `strTheme` | `String` | Track theme |
| `strTrack` | `String` | Track title |
| `strTrackLyrics` | `String` | Track lyrics |
| `strTrackThumb` | `String` | URL to track thumbnail |
| `strTwitter` | `String` | Twitter profile URL |
| `strWebsite` | `String` | Official website URL |
| `strWikidataID` | `String` | Wikidata ID |
| `strWikipediaID` | `String` | Wikipedia ID |
| `strYoutube` | `String` | YouTube channel URL |

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
| `idAlbum` | `Integer` | Unique album ID |
| `idArtist` | `Integer` | Artist ID |
| `idIMVDB` | `Integer` | IMVDB ID |
| `idLabel` | `Integer` | Label ID |
| `idLyric` | `Integer` | Lyrics ID |
| `idTrack` | `Integer` | Unique track ID |
| `intBornYear` | `Integer` | Birth year of the artist |
| `intCD` | `Integer` | CD number |
| `intCharted` | `Integer` | Chart position |
| `intDiedYear` | `Integer` | Year the artist died (if applicable) |
| `intDuration` | `Integer` | Track duration in milliseconds |
| `intFormedYear` | `Integer` | Year the artist/band was formed |
| `intLoved` | `Integer` | Number of loves/likes |
| `intMembers` | `Integer` | Number of band members |
| `intMusicVidComments` | `Integer` | Number of music video comments |
| `intMusicVidDislikes` | `Integer` | Number of music video dislikes |
| `intMusicVidFavorites` | `Integer` | Number of music video favorites |
| `intMusicVidLikes` | `Integer` | Number of music video likes |
| `intMusicVidViews` | `Integer` | Number of music video views |
| `intSales` | `Integer` | Number of sales |
| `intScore` | `Integer` | Album score |
| `intScoreVotes` | `Integer` | Number of score votes |
| `intTotalListeners` | `Integer` | Total number of listeners |
| `intTotalPlays` | `Integer` | Total number of plays |
| `intTrackNumber` | `Integer` | Track number on album |
| `intYearReleased` | `Integer` | Year the album was released |
| `strAlbum` | `String` | Album title |
| `strAlbum3DCase` | `String` | URL to 3D case image |
| `strAlbum3DFace` | `String` | URL to 3D face image |
| `strAlbum3DFlat` | `String` | URL to 3D flat image |
| `strAlbum3DThumb` | `String` | URL to 3D thumbnail |
| `strAlbumCDart` | `String` | URL to CD art |
| `strAlbumSpine` | `String` | URL to album spine image |
| `strAlbumStripped` | `String` | Album title without special characters |
| `strAlbumThumb` | `String` | URL to album thumbnail |
| `strAlbumThumbBack` | `String` | URL to back of album cover |
| `strAlbumThumbHQ` | `String` | URL to high quality album thumbnail |
| `strAllMusicID` | `String` | AllMusic ID |
| `strAmazonID` | `String` | Amazon ID |
| `strArtist` | `String` | Artist name |
| `strArtistAlternate` | `String` | Alternate artist name |
| `strArtistBanner` | `String` | URL to artist banner |
| `strArtistClearart` | `String` | URL to artist clearart |
| `strArtistCutout` | `String` | URL to artist cutout image |
| `strArtistFanart` | `String` | URL to artist fanart |
| `strArtistFanart2` | `String` | URL to alternate artist fanart |
| `strArtistFanart3` | `String` | URL to third artist fanart |
| `strArtistFanart4` | `String` | URL to fourth artist fanart |
| `strArtistLogo` | `String` | URL to artist logo |
| `strArtistStripped` | `String` | Artist name without special characters |
| `strArtistThumb` | `String` | URL to artist thumbnail image |
| `strArtistWideThumb` | `String` | URL to artist wide thumbnail |
| `strBBCReviewID` | `String` | BBC Review ID |
| `strBiographyCN` | `String` | Artist biography in Chinese |
| `strBiographyDE` | `String` | Artist biography in German |
| `strBiographyEN` | `String` | Artist biography in English |
| `strBiographyES` | `String` | Artist biography in Spanish |
| `strBiographyFR` | `String` | Artist biography in French |
| `strBiographyHU` | `String` | Artist biography in Hungarian |
| `strBiographyIL` | `String` | Artist biography in Hebrew |
| `strBiographyIT` | `String` | Artist biography in Italian |
| `strBiographyJP` | `String` | Artist biography in Japanese |
| `strBiographyNL` | `String` | Artist biography in Dutch |
| `strBiographyNO` | `String` | Artist biography in Norwegian |
| `strBiographyPL` | `String` | Artist biography in Polish |
| `strBiographyPT` | `String` | Artist biography in Portuguese |
| `strBiographyRU` | `String` | Artist biography in Russian |
| `strBiographySE` | `String` | Artist biography in Swedish |
| `strCountry` | `String` | Country of origin |
| `strCountryCode` | `String` | Country code |
| `strDescriptionEN` | `String` | Album description in English |
| `strDisbanded` | `String` | Disbanded status |
| `strDiscogsID` | `String` | Discogs ID |
| `strFacebook` | `String` | Facebook page URL |
| `strGender` | `String` | Artist gender |
| `strGeniusID` | `String` | Genius ID |
| `strGenre` | `String` | Album genre |
| `strItunesID` | `String` | iTunes ID |
| `strLabel` | `String` | Record label |
| `strLastFMChart` | `String` | Last.fm chart URL |
| `strLocation` | `String` | Recording location |
| `strLocked` | `String` | Whether the record is locked |
| `strLyricWikiID` | `String` | LyricWiki ID |
| `strMood` | `String` | Album mood |
| `strMusicBrainzAlbumID` | `String` | MusicBrainz Album ID |
| `strMusicBrainzArtistID` | `String` | MusicBrainz Artist ID |
| `strMusicBrainzID` | `String` | MusicBrainz Release Group ID |
| `strMusicMozID` | `String` | MusicMoz ID |
| `strMusicVid` | `String` | URL to music video |
| `strMusicVidCompany` | `String` | Music video production company |
| `strMusicVidDirector` | `String` | Music video director |
| `strMusicVidScreen1` | `String` | URL to music video screenshot 1 |
| `strMusicVidScreen2` | `String` | URL to music video screenshot 2 |
| `strMusicVidScreen3` | `String` | URL to music video screenshot 3 |
| `strRateYourMusicID` | `String` | RateYourMusic ID |
| `strReleaseFormat` | `String` | Release format (CD, Vinyl, etc.) |
| `strReview` | `String` | Album review |
| `strSpeed` | `String` | Album speed |
| `strStyle` | `String` | Album style |
| `strTheme` | `String` | Album theme |
| `strTrack` | `String` | Track title |
| `strTrackLyrics` | `String` | Track lyrics |
| `strTrackThumb` | `String` | URL to track thumbnail |
| `strTwitter` | `String` | Twitter profile URL |
| `strWebsite` | `String` | Official website URL |
| `strWikidataID` | `String` | Wikidata ID |
| `strWikipediaID` | `String` | Wikipedia ID |

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
