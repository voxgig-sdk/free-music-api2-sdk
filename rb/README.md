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
    puts "#{item["id_album"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a v2list

V2List is nested under artist, so provide the `artist_id`.

```ruby
begin
  # load returns the bare V2List record (raises on error).
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
  v1lists = client.V1List.list()
rescue => err
  warn "list failed: #{err}"
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

# Entity ops return the bare mock record (raises on error).
v1list = client.V1List.list()
puts v1list
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

Create an instance: `v1_list = client.V1List`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id_album` | `Integer` |  |
| `id_artist` | `Integer` |  |
| `id_imvdb` | `Integer` |  |
| `id_lyric` | `Integer` |  |
| `id_track` | `Integer` |  |
| `int_cd` | `Integer` |  |
| `int_duration` | `Integer` |  |
| `int_loved` | `Integer` |  |
| `int_music_vid_comment` | `Integer` |  |
| `int_music_vid_dislike` | `Integer` |  |
| `int_music_vid_favorite` | `Integer` |  |
| `int_music_vid_like` | `Integer` |  |
| `int_music_vid_view` | `Integer` |  |
| `int_score` | `Integer` |  |
| `int_score_vote` | `Integer` |  |
| `int_total_listener` | `Integer` |  |
| `int_total_play` | `Integer` |  |
| `int_track_number` | `Integer` |  |
| `loved` | `Array` |  |
| `str_album` | `String` |  |
| `str_artist` | `String` |  |
| `str_artist_alternate` | `String` |  |
| `str_description_en` | `String` |  |
| `str_genre` | `String` |  |
| `str_locked` | `String` |  |
| `str_mood` | `String` |  |
| `str_music_brainz_album_id` | `String` |  |
| `str_music_brainz_artist_id` | `String` |  |
| `str_music_brainz_id` | `String` |  |
| `str_music_vid` | `String` |  |
| `str_music_vid_company` | `String` |  |
| `str_music_vid_director` | `String` |  |
| `str_music_vid_screen1` | `String` |  |
| `str_music_vid_screen2` | `String` |  |
| `str_music_vid_screen3` | `String` |  |
| `str_style` | `String` |  |
| `str_theme` | `String` |  |
| `str_track` | `String` |  |
| `str_track_lyric` | `String` |  |
| `str_track_thumb` | `String` |  |
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
| `id_album` | `Integer` |  |
| `id_artist` | `Integer` |  |
| `id_imvdb` | `Integer` |  |
| `id_label` | `Integer` |  |
| `id_lyric` | `Integer` |  |
| `id_track` | `Integer` |  |
| `int_born_year` | `Integer` |  |
| `int_cd` | `Integer` |  |
| `int_charted` | `Integer` |  |
| `int_died_year` | `Integer` |  |
| `int_duration` | `Integer` |  |
| `int_formed_year` | `Integer` |  |
| `int_loved` | `Integer` |  |
| `int_member` | `Integer` |  |
| `int_music_vid_comment` | `Integer` |  |
| `int_music_vid_dislike` | `Integer` |  |
| `int_music_vid_favorite` | `Integer` |  |
| `int_music_vid_like` | `Integer` |  |
| `int_music_vid_view` | `Integer` |  |
| `int_sale` | `Integer` |  |
| `int_score` | `Integer` |  |
| `int_score_vote` | `Integer` |  |
| `int_total_listener` | `Integer` |  |
| `int_total_play` | `Integer` |  |
| `int_track_number` | `Integer` |  |
| `int_year_released` | `Integer` |  |
| `str_album` | `String` |  |
| `str_album3_d_case` | `String` |  |
| `str_album3_d_face` | `String` |  |
| `str_album3_d_flat` | `String` |  |
| `str_album3_d_thumb` | `String` |  |
| `str_album_c_dart` | `String` |  |
| `str_album_spine` | `String` |  |
| `str_album_stripped` | `String` |  |
| `str_album_thumb` | `String` |  |
| `str_album_thumb_back` | `String` |  |
| `str_album_thumb_hq` | `String` |  |
| `str_all_music_id` | `String` |  |
| `str_amazon_id` | `String` |  |
| `str_apple_music` | `String` |  |
| `str_artist` | `String` |  |
| `str_artist_alternate` | `String` |  |
| `str_artist_banner` | `String` |  |
| `str_artist_clearart` | `String` |  |
| `str_artist_cutout` | `String` |  |
| `str_artist_fanart` | `String` |  |
| `str_artist_fanart2` | `String` |  |
| `str_artist_fanart3` | `String` |  |
| `str_artist_fanart4` | `String` |  |
| `str_artist_logo` | `String` |  |
| `str_artist_stripped` | `String` |  |
| `str_artist_thumb` | `String` |  |
| `str_artist_wide_thumb` | `String` |  |
| `str_bbc_review_id` | `String` |  |
| `str_biography_cn` | `String` |  |
| `str_biography_de` | `String` |  |
| `str_biography_e` | `String` |  |
| `str_biography_en` | `String` |  |
| `str_biography_fr` | `String` |  |
| `str_biography_hu` | `String` |  |
| `str_biography_il` | `String` |  |
| `str_biography_it` | `String` |  |
| `str_biography_jp` | `String` |  |
| `str_biography_nl` | `String` |  |
| `str_biography_no` | `String` |  |
| `str_biography_pl` | `String` |  |
| `str_biography_pt` | `String` |  |
| `str_biography_ru` | `String` |  |
| `str_biography_se` | `String` |  |
| `str_country` | `String` |  |
| `str_country_code` | `String` |  |
| `str_description_en` | `String` |  |
| `str_disbanded` | `String` |  |
| `str_discogs_id` | `String` |  |
| `str_facebook` | `String` |  |
| `str_gender` | `String` |  |
| `str_genius_id` | `String` |  |
| `str_genre` | `String` |  |
| `str_instagram` | `String` |  |
| `str_itunes_id` | `String` |  |
| `str_label` | `String` |  |
| `str_last_fm_chart` | `String` |  |
| `str_location` | `String` |  |
| `str_locked` | `String` |  |
| `str_lyric_wiki_id` | `String` |  |
| `str_mood` | `String` |  |
| `str_music_brainz_album_id` | `String` |  |
| `str_music_brainz_artist_id` | `String` |  |
| `str_music_brainz_id` | `String` |  |
| `str_music_moz_id` | `String` |  |
| `str_music_vid` | `String` |  |
| `str_music_vid_company` | `String` |  |
| `str_music_vid_director` | `String` |  |
| `str_music_vid_screen1` | `String` |  |
| `str_music_vid_screen2` | `String` |  |
| `str_music_vid_screen3` | `String` |  |
| `str_rate_your_music_id` | `String` |  |
| `str_release_format` | `String` |  |
| `str_review` | `String` |  |
| `str_sound_cloud` | `String` |  |
| `str_speed` | `String` |  |
| `str_spotify` | `String` |  |
| `str_style` | `String` |  |
| `str_theme` | `String` |  |
| `str_track` | `String` |  |
| `str_track_lyric` | `String` |  |
| `str_track_thumb` | `String` |  |
| `str_twitter` | `String` |  |
| `str_website` | `String` |  |
| `str_wikidata_id` | `String` |  |
| `str_wikipedia_id` | `String` |  |
| `str_youtube` | `String` |  |

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
| `id_album` | `Integer` |  |
| `id_artist` | `Integer` |  |
| `id_imvdb` | `Integer` |  |
| `id_label` | `Integer` |  |
| `id_lyric` | `Integer` |  |
| `id_track` | `Integer` |  |
| `int_born_year` | `Integer` |  |
| `int_cd` | `Integer` |  |
| `int_charted` | `Integer` |  |
| `int_died_year` | `Integer` |  |
| `int_duration` | `Integer` |  |
| `int_formed_year` | `Integer` |  |
| `int_loved` | `Integer` |  |
| `int_member` | `Integer` |  |
| `int_music_vid_comment` | `Integer` |  |
| `int_music_vid_dislike` | `Integer` |  |
| `int_music_vid_favorite` | `Integer` |  |
| `int_music_vid_like` | `Integer` |  |
| `int_music_vid_view` | `Integer` |  |
| `int_sale` | `Integer` |  |
| `int_score` | `Integer` |  |
| `int_score_vote` | `Integer` |  |
| `int_total_listener` | `Integer` |  |
| `int_total_play` | `Integer` |  |
| `int_track_number` | `Integer` |  |
| `int_year_released` | `Integer` |  |
| `str_album` | `String` |  |
| `str_album3_d_case` | `String` |  |
| `str_album3_d_face` | `String` |  |
| `str_album3_d_flat` | `String` |  |
| `str_album3_d_thumb` | `String` |  |
| `str_album_c_dart` | `String` |  |
| `str_album_spine` | `String` |  |
| `str_album_stripped` | `String` |  |
| `str_album_thumb` | `String` |  |
| `str_album_thumb_back` | `String` |  |
| `str_album_thumb_hq` | `String` |  |
| `str_all_music_id` | `String` |  |
| `str_amazon_id` | `String` |  |
| `str_artist` | `String` |  |
| `str_artist_alternate` | `String` |  |
| `str_artist_banner` | `String` |  |
| `str_artist_clearart` | `String` |  |
| `str_artist_cutout` | `String` |  |
| `str_artist_fanart` | `String` |  |
| `str_artist_fanart2` | `String` |  |
| `str_artist_fanart3` | `String` |  |
| `str_artist_fanart4` | `String` |  |
| `str_artist_logo` | `String` |  |
| `str_artist_stripped` | `String` |  |
| `str_artist_thumb` | `String` |  |
| `str_artist_wide_thumb` | `String` |  |
| `str_bbc_review_id` | `String` |  |
| `str_biography_cn` | `String` |  |
| `str_biography_de` | `String` |  |
| `str_biography_e` | `String` |  |
| `str_biography_en` | `String` |  |
| `str_biography_fr` | `String` |  |
| `str_biography_hu` | `String` |  |
| `str_biography_il` | `String` |  |
| `str_biography_it` | `String` |  |
| `str_biography_jp` | `String` |  |
| `str_biography_nl` | `String` |  |
| `str_biography_no` | `String` |  |
| `str_biography_pl` | `String` |  |
| `str_biography_pt` | `String` |  |
| `str_biography_ru` | `String` |  |
| `str_biography_se` | `String` |  |
| `str_country` | `String` |  |
| `str_country_code` | `String` |  |
| `str_description_en` | `String` |  |
| `str_disbanded` | `String` |  |
| `str_discogs_id` | `String` |  |
| `str_facebook` | `String` |  |
| `str_gender` | `String` |  |
| `str_genius_id` | `String` |  |
| `str_genre` | `String` |  |
| `str_itunes_id` | `String` |  |
| `str_label` | `String` |  |
| `str_last_fm_chart` | `String` |  |
| `str_location` | `String` |  |
| `str_locked` | `String` |  |
| `str_lyric_wiki_id` | `String` |  |
| `str_mood` | `String` |  |
| `str_music_brainz_album_id` | `String` |  |
| `str_music_brainz_artist_id` | `String` |  |
| `str_music_brainz_id` | `String` |  |
| `str_music_moz_id` | `String` |  |
| `str_music_vid` | `String` |  |
| `str_music_vid_company` | `String` |  |
| `str_music_vid_director` | `String` |  |
| `str_music_vid_screen1` | `String` |  |
| `str_music_vid_screen2` | `String` |  |
| `str_music_vid_screen3` | `String` |  |
| `str_rate_your_music_id` | `String` |  |
| `str_release_format` | `String` |  |
| `str_review` | `String` |  |
| `str_speed` | `String` |  |
| `str_style` | `String` |  |
| `str_theme` | `String` |  |
| `str_track` | `String` |  |
| `str_track_lyric` | `String` |  |
| `str_track_thumb` | `String` |  |
| `str_twitter` | `String` |  |
| `str_website` | `String` |  |
| `str_wikidata_id` | `String` |  |
| `str_wikipedia_id` | `String` |  |

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
| `album` | `Array` |  |

#### Example: Load

```ruby
# load returns the bare V2List record (raises on error).
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
| `album` | `Array` |  |
| `artist` | `Array` |  |
| `track` | `Array` |  |

#### Example: Load

```ruby
# load returns the bare V2Lookup record (raises on error).
v2_lookup = client.V2Lookup.load()
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
| `album` | `Array` |  |
| `artist` | `Array` |  |
| `track` | `Array` |  |

#### Example: Load

```ruby
# load returns the bare V2Search record (raises on error).
v2_search = client.V2Search.load()
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
v1list = client.V1List
v1list.list()

# v1list.data_get now returns the v1list data from the last list
# v1list.match_get returns the last match criteria
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
