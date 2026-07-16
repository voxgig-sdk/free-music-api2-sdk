# FreeMusicApi2 TypeScript SDK



The TypeScript SDK for the FreeMusicApi2 API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.V1List()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

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

### 2. List v1list records

`list()` resolves to an array of V1List objects — iterate it directly:

```ts
const v1lists = await client.V1List().list()

for (const v1list of v1lists) {
  console.log(v1list)
}
```

### 3. Load a v2list

V2List is nested under artist, so provide the `artist_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const v2list = await client.V2List().load({
    artist_id: 1,
  })
  console.log(v2list)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const v1lists = await client.V1List().list()
  console.log(v1lists)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
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

if (result instanceof Error) {
  throw result
}
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

const v1list = await client.V1List().list()
// v1list is a bare entity populated with mock response data
console.log(v1list)
```

You can also use the instance method:

```ts
const client = new FreeMusicApi2SDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.V1List()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
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
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FreeMusicApi2SDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

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

Create an instance: `const v1_list = client.V1List()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id_album` | `number` |  |
| `id_artist` | `number` |  |
| `id_imvdb` | `number` |  |
| `id_lyric` | `number` |  |
| `id_track` | `number` |  |
| `int_cd` | `number` |  |
| `int_duration` | `number` |  |
| `int_loved` | `number` |  |
| `int_music_vid_comment` | `number` |  |
| `int_music_vid_dislike` | `number` |  |
| `int_music_vid_favorite` | `number` |  |
| `int_music_vid_like` | `number` |  |
| `int_music_vid_view` | `number` |  |
| `int_score` | `number` |  |
| `int_score_vote` | `number` |  |
| `int_total_listener` | `number` |  |
| `int_total_play` | `number` |  |
| `int_track_number` | `number` |  |
| `loved` | `any[]` |  |
| `str_album` | `string` |  |
| `str_artist` | `string` |  |
| `str_artist_alternate` | `string` |  |
| `str_description_en` | `string` |  |
| `str_genre` | `string` |  |
| `str_locked` | `string` |  |
| `str_mood` | `string` |  |
| `str_music_brainz_album_id` | `string` |  |
| `str_music_brainz_artist_id` | `string` |  |
| `str_music_brainz_id` | `string` |  |
| `str_music_vid` | `string` |  |
| `str_music_vid_company` | `string` |  |
| `str_music_vid_director` | `string` |  |
| `str_music_vid_screen1` | `string` |  |
| `str_music_vid_screen2` | `string` |  |
| `str_music_vid_screen3` | `string` |  |
| `str_style` | `string` |  |
| `str_theme` | `string` |  |
| `str_track` | `string` |  |
| `str_track_lyric` | `string` |  |
| `str_track_thumb` | `string` |  |
| `trending` | `any[]` |  |

#### Example: List

```ts
const v1_lists = await client.V1List().list()
```


### V1Lookup

Create an instance: `const v1_lookup = client.V1Lookup()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id_album` | `number` |  |
| `id_artist` | `number` |  |
| `id_imvdb` | `number` |  |
| `id_label` | `number` |  |
| `id_lyric` | `number` |  |
| `id_track` | `number` |  |
| `int_born_year` | `number` |  |
| `int_cd` | `number` |  |
| `int_charted` | `number` |  |
| `int_died_year` | `number` |  |
| `int_duration` | `number` |  |
| `int_formed_year` | `number` |  |
| `int_loved` | `number` |  |
| `int_member` | `number` |  |
| `int_music_vid_comment` | `number` |  |
| `int_music_vid_dislike` | `number` |  |
| `int_music_vid_favorite` | `number` |  |
| `int_music_vid_like` | `number` |  |
| `int_music_vid_view` | `number` |  |
| `int_sale` | `number` |  |
| `int_score` | `number` |  |
| `int_score_vote` | `number` |  |
| `int_total_listener` | `number` |  |
| `int_total_play` | `number` |  |
| `int_track_number` | `number` |  |
| `int_year_released` | `number` |  |
| `str_album` | `string` |  |
| `str_album3_d_case` | `string` |  |
| `str_album3_d_face` | `string` |  |
| `str_album3_d_flat` | `string` |  |
| `str_album3_d_thumb` | `string` |  |
| `str_album_c_dart` | `string` |  |
| `str_album_spine` | `string` |  |
| `str_album_stripped` | `string` |  |
| `str_album_thumb` | `string` |  |
| `str_album_thumb_back` | `string` |  |
| `str_album_thumb_hq` | `string` |  |
| `str_all_music_id` | `string` |  |
| `str_amazon_id` | `string` |  |
| `str_apple_music` | `string` |  |
| `str_artist` | `string` |  |
| `str_artist_alternate` | `string` |  |
| `str_artist_banner` | `string` |  |
| `str_artist_clearart` | `string` |  |
| `str_artist_cutout` | `string` |  |
| `str_artist_fanart` | `string` |  |
| `str_artist_fanart2` | `string` |  |
| `str_artist_fanart3` | `string` |  |
| `str_artist_fanart4` | `string` |  |
| `str_artist_logo` | `string` |  |
| `str_artist_stripped` | `string` |  |
| `str_artist_thumb` | `string` |  |
| `str_artist_wide_thumb` | `string` |  |
| `str_bbc_review_id` | `string` |  |
| `str_biography_cn` | `string` |  |
| `str_biography_de` | `string` |  |
| `str_biography_e` | `string` |  |
| `str_biography_en` | `string` |  |
| `str_biography_fr` | `string` |  |
| `str_biography_hu` | `string` |  |
| `str_biography_il` | `string` |  |
| `str_biography_it` | `string` |  |
| `str_biography_jp` | `string` |  |
| `str_biography_nl` | `string` |  |
| `str_biography_no` | `string` |  |
| `str_biography_pl` | `string` |  |
| `str_biography_pt` | `string` |  |
| `str_biography_ru` | `string` |  |
| `str_biography_se` | `string` |  |
| `str_country` | `string` |  |
| `str_country_code` | `string` |  |
| `str_description_en` | `string` |  |
| `str_disbanded` | `string` |  |
| `str_discogs_id` | `string` |  |
| `str_facebook` | `string` |  |
| `str_gender` | `string` |  |
| `str_genius_id` | `string` |  |
| `str_genre` | `string` |  |
| `str_instagram` | `string` |  |
| `str_itunes_id` | `string` |  |
| `str_label` | `string` |  |
| `str_last_fm_chart` | `string` |  |
| `str_location` | `string` |  |
| `str_locked` | `string` |  |
| `str_lyric_wiki_id` | `string` |  |
| `str_mood` | `string` |  |
| `str_music_brainz_album_id` | `string` |  |
| `str_music_brainz_artist_id` | `string` |  |
| `str_music_brainz_id` | `string` |  |
| `str_music_moz_id` | `string` |  |
| `str_music_vid` | `string` |  |
| `str_music_vid_company` | `string` |  |
| `str_music_vid_director` | `string` |  |
| `str_music_vid_screen1` | `string` |  |
| `str_music_vid_screen2` | `string` |  |
| `str_music_vid_screen3` | `string` |  |
| `str_rate_your_music_id` | `string` |  |
| `str_release_format` | `string` |  |
| `str_review` | `string` |  |
| `str_sound_cloud` | `string` |  |
| `str_speed` | `string` |  |
| `str_spotify` | `string` |  |
| `str_style` | `string` |  |
| `str_theme` | `string` |  |
| `str_track` | `string` |  |
| `str_track_lyric` | `string` |  |
| `str_track_thumb` | `string` |  |
| `str_twitter` | `string` |  |
| `str_website` | `string` |  |
| `str_wikidata_id` | `string` |  |
| `str_wikipedia_id` | `string` |  |
| `str_youtube` | `string` |  |

#### Example: List

```ts
const v1_lookups = await client.V1Lookup().list()
```


### V1Search

Create an instance: `const v1_search = client.V1Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id_album` | `number` |  |
| `id_artist` | `number` |  |
| `id_imvdb` | `number` |  |
| `id_label` | `number` |  |
| `id_lyric` | `number` |  |
| `id_track` | `number` |  |
| `int_born_year` | `number` |  |
| `int_cd` | `number` |  |
| `int_charted` | `number` |  |
| `int_died_year` | `number` |  |
| `int_duration` | `number` |  |
| `int_formed_year` | `number` |  |
| `int_loved` | `number` |  |
| `int_member` | `number` |  |
| `int_music_vid_comment` | `number` |  |
| `int_music_vid_dislike` | `number` |  |
| `int_music_vid_favorite` | `number` |  |
| `int_music_vid_like` | `number` |  |
| `int_music_vid_view` | `number` |  |
| `int_sale` | `number` |  |
| `int_score` | `number` |  |
| `int_score_vote` | `number` |  |
| `int_total_listener` | `number` |  |
| `int_total_play` | `number` |  |
| `int_track_number` | `number` |  |
| `int_year_released` | `number` |  |
| `str_album` | `string` |  |
| `str_album3_d_case` | `string` |  |
| `str_album3_d_face` | `string` |  |
| `str_album3_d_flat` | `string` |  |
| `str_album3_d_thumb` | `string` |  |
| `str_album_c_dart` | `string` |  |
| `str_album_spine` | `string` |  |
| `str_album_stripped` | `string` |  |
| `str_album_thumb` | `string` |  |
| `str_album_thumb_back` | `string` |  |
| `str_album_thumb_hq` | `string` |  |
| `str_all_music_id` | `string` |  |
| `str_amazon_id` | `string` |  |
| `str_artist` | `string` |  |
| `str_artist_alternate` | `string` |  |
| `str_artist_banner` | `string` |  |
| `str_artist_clearart` | `string` |  |
| `str_artist_cutout` | `string` |  |
| `str_artist_fanart` | `string` |  |
| `str_artist_fanart2` | `string` |  |
| `str_artist_fanart3` | `string` |  |
| `str_artist_fanart4` | `string` |  |
| `str_artist_logo` | `string` |  |
| `str_artist_stripped` | `string` |  |
| `str_artist_thumb` | `string` |  |
| `str_artist_wide_thumb` | `string` |  |
| `str_bbc_review_id` | `string` |  |
| `str_biography_cn` | `string` |  |
| `str_biography_de` | `string` |  |
| `str_biography_e` | `string` |  |
| `str_biography_en` | `string` |  |
| `str_biography_fr` | `string` |  |
| `str_biography_hu` | `string` |  |
| `str_biography_il` | `string` |  |
| `str_biography_it` | `string` |  |
| `str_biography_jp` | `string` |  |
| `str_biography_nl` | `string` |  |
| `str_biography_no` | `string` |  |
| `str_biography_pl` | `string` |  |
| `str_biography_pt` | `string` |  |
| `str_biography_ru` | `string` |  |
| `str_biography_se` | `string` |  |
| `str_country` | `string` |  |
| `str_country_code` | `string` |  |
| `str_description_en` | `string` |  |
| `str_disbanded` | `string` |  |
| `str_discogs_id` | `string` |  |
| `str_facebook` | `string` |  |
| `str_gender` | `string` |  |
| `str_genius_id` | `string` |  |
| `str_genre` | `string` |  |
| `str_itunes_id` | `string` |  |
| `str_label` | `string` |  |
| `str_last_fm_chart` | `string` |  |
| `str_location` | `string` |  |
| `str_locked` | `string` |  |
| `str_lyric_wiki_id` | `string` |  |
| `str_mood` | `string` |  |
| `str_music_brainz_album_id` | `string` |  |
| `str_music_brainz_artist_id` | `string` |  |
| `str_music_brainz_id` | `string` |  |
| `str_music_moz_id` | `string` |  |
| `str_music_vid` | `string` |  |
| `str_music_vid_company` | `string` |  |
| `str_music_vid_director` | `string` |  |
| `str_music_vid_screen1` | `string` |  |
| `str_music_vid_screen2` | `string` |  |
| `str_music_vid_screen3` | `string` |  |
| `str_rate_your_music_id` | `string` |  |
| `str_release_format` | `string` |  |
| `str_review` | `string` |  |
| `str_speed` | `string` |  |
| `str_style` | `string` |  |
| `str_theme` | `string` |  |
| `str_track` | `string` |  |
| `str_track_lyric` | `string` |  |
| `str_track_thumb` | `string` |  |
| `str_twitter` | `string` |  |
| `str_website` | `string` |  |
| `str_wikidata_id` | `string` |  |
| `str_wikipedia_id` | `string` |  |

#### Example: List

```ts
const v1_searchs = await client.V1Search().list()
```


### V2List

Create an instance: `const v2_list = client.V2List()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `any[]` |  |

#### Example: Load

```ts
const v2_list = await client.V2List().load({ artist_id: 1 })
```


### V2Lookup

Create an instance: `const v2_lookup = client.V2Lookup()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `any[]` |  |
| `artist` | `any[]` |  |
| `track` | `any[]` |  |

#### Example: Load

```ts
const v2_lookup = await client.V2Lookup().load()
```


### V2Search

Create an instance: `const v2_search = client.V2Search()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `any[]` |  |
| `artist` | `any[]` |  |
| `track` | `any[]` |  |

#### Example: Load

```ts
const v2_search = await client.V2Search().load()
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const v1list = client.V1List()
await v1list.list()

// v1list.data() now returns the v1list data from the last `list`
// v1list.match() returns the last match criteria
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
