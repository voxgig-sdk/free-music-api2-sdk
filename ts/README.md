# FreeMusicApi2 TypeScript SDK



The TypeScript SDK for the FreeMusicApi2 API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/free-music-api2-sdk/releases](https://github.com/voxgig-sdk/free-music-api2-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { FreeMusicApi2SDK } from '@voxgig-sdk/free-music-api2'

const client = new FreeMusicApi2SDK({
  apikey: process.env.FREE_MUSIC_API2_APIKEY,
})
```

### 2. List v1lists

```ts
const result = await client.v1list.list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = FreeMusicApi2SDK.test()

const result = await client.v1list.load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new FreeMusicApi2SDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.v1list

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new FreeMusicApi2SDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### FreeMusicApi2SDK

#### Constructor

```ts
new FreeMusicApi2SDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `V1List(data?)` | `V1ListEntity` | Create a V1List entity instance. |
| `V1Lookup(data?)` | `V1LookupEntity` | Create a V1Lookup entity instance. |
| `V1Search(data?)` | `V1SearchEntity` | Create a V1Search entity instance. |
| `V2List(data?)` | `V2ListEntity` | Create a V2List entity instance. |
| `V2Lookup(data?)` | `V2LookupEntity` | Create a V2Lookup entity instance. |
| `V2Search(data?)` | `V2SearchEntity` | Create a V2Search entity instance. |
| `tester(testopts?, sdkopts?)` | `FreeMusicApi2SDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `FreeMusicApi2SDK.test(testopts?, sdkopts?)` | `FreeMusicApi2SDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FreeMusicApi2SDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list.

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

Operations: list.

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

Operations: list.

API path: `/searchalbum.php`

#### V2List

| Field | Description |
| --- | --- |
| `album` |  |

Operations: load.

API path: `/list/discography/{artistId}`

#### V2Lookup

| Field | Description |
| --- | --- |
| `album` |  |
| `artist` |  |
| `track` |  |

Operations: load.

API path: `/lookup/album/{albumId}`

#### V2Search

| Field | Description |
| --- | --- |
| `album` |  |
| `artist` |  |
| `track` |  |

Operations: load.

API path: `/search/album/{albumName}`



## Entities


### V1List

Create an instance: `const v1_list = client.v1_list`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id_album` | ``$INTEGER`` |  |
| `id_artist` | ``$INTEGER`` |  |
| `id_imvdb` | ``$INTEGER`` |  |
| `id_lyric` | ``$INTEGER`` |  |
| `id_track` | ``$INTEGER`` |  |
| `int_cd` | ``$INTEGER`` |  |
| `int_duration` | ``$INTEGER`` |  |
| `int_loved` | ``$INTEGER`` |  |
| `int_music_vid_comment` | ``$INTEGER`` |  |
| `int_music_vid_dislike` | ``$INTEGER`` |  |
| `int_music_vid_favorite` | ``$INTEGER`` |  |
| `int_music_vid_like` | ``$INTEGER`` |  |
| `int_music_vid_view` | ``$INTEGER`` |  |
| `int_score` | ``$INTEGER`` |  |
| `int_score_vote` | ``$INTEGER`` |  |
| `int_total_listener` | ``$INTEGER`` |  |
| `int_total_play` | ``$INTEGER`` |  |
| `int_track_number` | ``$INTEGER`` |  |
| `loved` | ``$ARRAY`` |  |
| `str_album` | ``$STRING`` |  |
| `str_artist` | ``$STRING`` |  |
| `str_artist_alternate` | ``$STRING`` |  |
| `str_description_en` | ``$STRING`` |  |
| `str_genre` | ``$STRING`` |  |
| `str_locked` | ``$STRING`` |  |
| `str_mood` | ``$STRING`` |  |
| `str_music_brainz_album_id` | ``$STRING`` |  |
| `str_music_brainz_artist_id` | ``$STRING`` |  |
| `str_music_brainz_id` | ``$STRING`` |  |
| `str_music_vid` | ``$STRING`` |  |
| `str_music_vid_company` | ``$STRING`` |  |
| `str_music_vid_director` | ``$STRING`` |  |
| `str_music_vid_screen1` | ``$STRING`` |  |
| `str_music_vid_screen2` | ``$STRING`` |  |
| `str_music_vid_screen3` | ``$STRING`` |  |
| `str_style` | ``$STRING`` |  |
| `str_theme` | ``$STRING`` |  |
| `str_track` | ``$STRING`` |  |
| `str_track_lyric` | ``$STRING`` |  |
| `str_track_thumb` | ``$STRING`` |  |
| `trending` | ``$ARRAY`` |  |

#### Example: List

```ts
const v1_lists = await client.v1_list.list()
```


### V1Lookup

Create an instance: `const v1_lookup = client.v1_lookup`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id_album` | ``$INTEGER`` |  |
| `id_artist` | ``$INTEGER`` |  |
| `id_imvdb` | ``$INTEGER`` |  |
| `id_label` | ``$INTEGER`` |  |
| `id_lyric` | ``$INTEGER`` |  |
| `id_track` | ``$INTEGER`` |  |
| `int_born_year` | ``$INTEGER`` |  |
| `int_cd` | ``$INTEGER`` |  |
| `int_charted` | ``$INTEGER`` |  |
| `int_died_year` | ``$INTEGER`` |  |
| `int_duration` | ``$INTEGER`` |  |
| `int_formed_year` | ``$INTEGER`` |  |
| `int_loved` | ``$INTEGER`` |  |
| `int_member` | ``$INTEGER`` |  |
| `int_music_vid_comment` | ``$INTEGER`` |  |
| `int_music_vid_dislike` | ``$INTEGER`` |  |
| `int_music_vid_favorite` | ``$INTEGER`` |  |
| `int_music_vid_like` | ``$INTEGER`` |  |
| `int_music_vid_view` | ``$INTEGER`` |  |
| `int_sale` | ``$INTEGER`` |  |
| `int_score` | ``$INTEGER`` |  |
| `int_score_vote` | ``$INTEGER`` |  |
| `int_total_listener` | ``$INTEGER`` |  |
| `int_total_play` | ``$INTEGER`` |  |
| `int_track_number` | ``$INTEGER`` |  |
| `int_year_released` | ``$INTEGER`` |  |
| `str_album` | ``$STRING`` |  |
| `str_album3_d_case` | ``$STRING`` |  |
| `str_album3_d_face` | ``$STRING`` |  |
| `str_album3_d_flat` | ``$STRING`` |  |
| `str_album3_d_thumb` | ``$STRING`` |  |
| `str_album_c_dart` | ``$STRING`` |  |
| `str_album_spine` | ``$STRING`` |  |
| `str_album_stripped` | ``$STRING`` |  |
| `str_album_thumb` | ``$STRING`` |  |
| `str_album_thumb_back` | ``$STRING`` |  |
| `str_album_thumb_hq` | ``$STRING`` |  |
| `str_all_music_id` | ``$STRING`` |  |
| `str_amazon_id` | ``$STRING`` |  |
| `str_apple_music` | ``$STRING`` |  |
| `str_artist` | ``$STRING`` |  |
| `str_artist_alternate` | ``$STRING`` |  |
| `str_artist_banner` | ``$STRING`` |  |
| `str_artist_clearart` | ``$STRING`` |  |
| `str_artist_cutout` | ``$STRING`` |  |
| `str_artist_fanart` | ``$STRING`` |  |
| `str_artist_fanart2` | ``$STRING`` |  |
| `str_artist_fanart3` | ``$STRING`` |  |
| `str_artist_fanart4` | ``$STRING`` |  |
| `str_artist_logo` | ``$STRING`` |  |
| `str_artist_stripped` | ``$STRING`` |  |
| `str_artist_thumb` | ``$STRING`` |  |
| `str_artist_wide_thumb` | ``$STRING`` |  |
| `str_bbc_review_id` | ``$STRING`` |  |
| `str_biography_cn` | ``$STRING`` |  |
| `str_biography_de` | ``$STRING`` |  |
| `str_biography_e` | ``$STRING`` |  |
| `str_biography_en` | ``$STRING`` |  |
| `str_biography_fr` | ``$STRING`` |  |
| `str_biography_hu` | ``$STRING`` |  |
| `str_biography_il` | ``$STRING`` |  |
| `str_biography_it` | ``$STRING`` |  |
| `str_biography_jp` | ``$STRING`` |  |
| `str_biography_nl` | ``$STRING`` |  |
| `str_biography_no` | ``$STRING`` |  |
| `str_biography_pl` | ``$STRING`` |  |
| `str_biography_pt` | ``$STRING`` |  |
| `str_biography_ru` | ``$STRING`` |  |
| `str_biography_se` | ``$STRING`` |  |
| `str_country` | ``$STRING`` |  |
| `str_country_code` | ``$STRING`` |  |
| `str_description_en` | ``$STRING`` |  |
| `str_disbanded` | ``$STRING`` |  |
| `str_discogs_id` | ``$STRING`` |  |
| `str_facebook` | ``$STRING`` |  |
| `str_gender` | ``$STRING`` |  |
| `str_genius_id` | ``$STRING`` |  |
| `str_genre` | ``$STRING`` |  |
| `str_instagram` | ``$STRING`` |  |
| `str_itunes_id` | ``$STRING`` |  |
| `str_label` | ``$STRING`` |  |
| `str_last_fm_chart` | ``$STRING`` |  |
| `str_location` | ``$STRING`` |  |
| `str_locked` | ``$STRING`` |  |
| `str_lyric_wiki_id` | ``$STRING`` |  |
| `str_mood` | ``$STRING`` |  |
| `str_music_brainz_album_id` | ``$STRING`` |  |
| `str_music_brainz_artist_id` | ``$STRING`` |  |
| `str_music_brainz_id` | ``$STRING`` |  |
| `str_music_moz_id` | ``$STRING`` |  |
| `str_music_vid` | ``$STRING`` |  |
| `str_music_vid_company` | ``$STRING`` |  |
| `str_music_vid_director` | ``$STRING`` |  |
| `str_music_vid_screen1` | ``$STRING`` |  |
| `str_music_vid_screen2` | ``$STRING`` |  |
| `str_music_vid_screen3` | ``$STRING`` |  |
| `str_rate_your_music_id` | ``$STRING`` |  |
| `str_release_format` | ``$STRING`` |  |
| `str_review` | ``$STRING`` |  |
| `str_sound_cloud` | ``$STRING`` |  |
| `str_speed` | ``$STRING`` |  |
| `str_spotify` | ``$STRING`` |  |
| `str_style` | ``$STRING`` |  |
| `str_theme` | ``$STRING`` |  |
| `str_track` | ``$STRING`` |  |
| `str_track_lyric` | ``$STRING`` |  |
| `str_track_thumb` | ``$STRING`` |  |
| `str_twitter` | ``$STRING`` |  |
| `str_website` | ``$STRING`` |  |
| `str_wikidata_id` | ``$STRING`` |  |
| `str_wikipedia_id` | ``$STRING`` |  |
| `str_youtube` | ``$STRING`` |  |

#### Example: List

```ts
const v1_lookups = await client.v1_lookup.list()
```


### V1Search

Create an instance: `const v1_search = client.v1_search`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id_album` | ``$INTEGER`` |  |
| `id_artist` | ``$INTEGER`` |  |
| `id_imvdb` | ``$INTEGER`` |  |
| `id_label` | ``$INTEGER`` |  |
| `id_lyric` | ``$INTEGER`` |  |
| `id_track` | ``$INTEGER`` |  |
| `int_born_year` | ``$INTEGER`` |  |
| `int_cd` | ``$INTEGER`` |  |
| `int_charted` | ``$INTEGER`` |  |
| `int_died_year` | ``$INTEGER`` |  |
| `int_duration` | ``$INTEGER`` |  |
| `int_formed_year` | ``$INTEGER`` |  |
| `int_loved` | ``$INTEGER`` |  |
| `int_member` | ``$INTEGER`` |  |
| `int_music_vid_comment` | ``$INTEGER`` |  |
| `int_music_vid_dislike` | ``$INTEGER`` |  |
| `int_music_vid_favorite` | ``$INTEGER`` |  |
| `int_music_vid_like` | ``$INTEGER`` |  |
| `int_music_vid_view` | ``$INTEGER`` |  |
| `int_sale` | ``$INTEGER`` |  |
| `int_score` | ``$INTEGER`` |  |
| `int_score_vote` | ``$INTEGER`` |  |
| `int_total_listener` | ``$INTEGER`` |  |
| `int_total_play` | ``$INTEGER`` |  |
| `int_track_number` | ``$INTEGER`` |  |
| `int_year_released` | ``$INTEGER`` |  |
| `str_album` | ``$STRING`` |  |
| `str_album3_d_case` | ``$STRING`` |  |
| `str_album3_d_face` | ``$STRING`` |  |
| `str_album3_d_flat` | ``$STRING`` |  |
| `str_album3_d_thumb` | ``$STRING`` |  |
| `str_album_c_dart` | ``$STRING`` |  |
| `str_album_spine` | ``$STRING`` |  |
| `str_album_stripped` | ``$STRING`` |  |
| `str_album_thumb` | ``$STRING`` |  |
| `str_album_thumb_back` | ``$STRING`` |  |
| `str_album_thumb_hq` | ``$STRING`` |  |
| `str_all_music_id` | ``$STRING`` |  |
| `str_amazon_id` | ``$STRING`` |  |
| `str_artist` | ``$STRING`` |  |
| `str_artist_alternate` | ``$STRING`` |  |
| `str_artist_banner` | ``$STRING`` |  |
| `str_artist_clearart` | ``$STRING`` |  |
| `str_artist_cutout` | ``$STRING`` |  |
| `str_artist_fanart` | ``$STRING`` |  |
| `str_artist_fanart2` | ``$STRING`` |  |
| `str_artist_fanart3` | ``$STRING`` |  |
| `str_artist_fanart4` | ``$STRING`` |  |
| `str_artist_logo` | ``$STRING`` |  |
| `str_artist_stripped` | ``$STRING`` |  |
| `str_artist_thumb` | ``$STRING`` |  |
| `str_artist_wide_thumb` | ``$STRING`` |  |
| `str_bbc_review_id` | ``$STRING`` |  |
| `str_biography_cn` | ``$STRING`` |  |
| `str_biography_de` | ``$STRING`` |  |
| `str_biography_e` | ``$STRING`` |  |
| `str_biography_en` | ``$STRING`` |  |
| `str_biography_fr` | ``$STRING`` |  |
| `str_biography_hu` | ``$STRING`` |  |
| `str_biography_il` | ``$STRING`` |  |
| `str_biography_it` | ``$STRING`` |  |
| `str_biography_jp` | ``$STRING`` |  |
| `str_biography_nl` | ``$STRING`` |  |
| `str_biography_no` | ``$STRING`` |  |
| `str_biography_pl` | ``$STRING`` |  |
| `str_biography_pt` | ``$STRING`` |  |
| `str_biography_ru` | ``$STRING`` |  |
| `str_biography_se` | ``$STRING`` |  |
| `str_country` | ``$STRING`` |  |
| `str_country_code` | ``$STRING`` |  |
| `str_description_en` | ``$STRING`` |  |
| `str_disbanded` | ``$STRING`` |  |
| `str_discogs_id` | ``$STRING`` |  |
| `str_facebook` | ``$STRING`` |  |
| `str_gender` | ``$STRING`` |  |
| `str_genius_id` | ``$STRING`` |  |
| `str_genre` | ``$STRING`` |  |
| `str_itunes_id` | ``$STRING`` |  |
| `str_label` | ``$STRING`` |  |
| `str_last_fm_chart` | ``$STRING`` |  |
| `str_location` | ``$STRING`` |  |
| `str_locked` | ``$STRING`` |  |
| `str_lyric_wiki_id` | ``$STRING`` |  |
| `str_mood` | ``$STRING`` |  |
| `str_music_brainz_album_id` | ``$STRING`` |  |
| `str_music_brainz_artist_id` | ``$STRING`` |  |
| `str_music_brainz_id` | ``$STRING`` |  |
| `str_music_moz_id` | ``$STRING`` |  |
| `str_music_vid` | ``$STRING`` |  |
| `str_music_vid_company` | ``$STRING`` |  |
| `str_music_vid_director` | ``$STRING`` |  |
| `str_music_vid_screen1` | ``$STRING`` |  |
| `str_music_vid_screen2` | ``$STRING`` |  |
| `str_music_vid_screen3` | ``$STRING`` |  |
| `str_rate_your_music_id` | ``$STRING`` |  |
| `str_release_format` | ``$STRING`` |  |
| `str_review` | ``$STRING`` |  |
| `str_speed` | ``$STRING`` |  |
| `str_style` | ``$STRING`` |  |
| `str_theme` | ``$STRING`` |  |
| `str_track` | ``$STRING`` |  |
| `str_track_lyric` | ``$STRING`` |  |
| `str_track_thumb` | ``$STRING`` |  |
| `str_twitter` | ``$STRING`` |  |
| `str_website` | ``$STRING`` |  |
| `str_wikidata_id` | ``$STRING`` |  |
| `str_wikipedia_id` | ``$STRING`` |  |

#### Example: List

```ts
const v1_searchs = await client.v1_search.list()
```


### V2List

Create an instance: `const v2_list = client.v2_list`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | ``$ARRAY`` |  |

#### Example: Load

```ts
const v2_list = await client.v2_list.load({ id: 'v2_list_id' })
```


### V2Lookup

Create an instance: `const v2_lookup = client.v2_lookup`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | ``$ARRAY`` |  |
| `artist` | ``$ARRAY`` |  |
| `track` | ``$ARRAY`` |  |

#### Example: Load

```ts
const v2_lookup = await client.v2_lookup.load({ id: 'v2_lookup_id' })
```


### V2Search

Create an instance: `const v2_search = client.v2_search`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | ``$ARRAY`` |  |
| `artist` | ``$ARRAY`` |  |
| `track` | ``$ARRAY`` |  |

#### Example: Load

```ts
const v2_search = await client.v2_search.load({ id: 'v2_search_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
free-music-api2/
├── src/
│   ├── FreeMusicApi2SDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { FreeMusicApi2SDK } from '@voxgig-sdk/free-music-api2'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const v1list = client.v1list
await v1list.load({ id: "example_id" })

// v1list.data() now returns the loaded v1list data
// v1list.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
