# FreeMusicApi2 TypeScript SDK



The TypeScript SDK for the FreeMusicApi2 API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.V1List()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
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

`list()` resolves to an array of V1List ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const v1lists = await client.V1List().list({ country: "example", format: "example", type: "example" })

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
  const v2lookup = await client.V2Lookup().load({ album_id: 1 })
  console.log(v2lookup)
} catch (err) {
  console.error('load failed:', err)
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

const v2lookup = await client.V2Lookup().load({ album_id: 1 })
// v2lookup is the entity, populated with mock response data
// — call v2lookup.data() for the record itself
console.log(v2lookup)
```

You can also use the instance method:

```ts
const client = new FreeMusicApi2SDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.V2Lookup()

// First call runs the operation and stores its result
await entity.load({ album_id: 1 })

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

Operations: list.

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

Operations: list.

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

Operations: list.

API path: `/searchalbum.php`

#### V2List

| Field | Description |
| --- | --- |
| `albums` |  |

Operations: load.

API path: `/list/discography/{artistId}`

#### V2Lookup

| Field | Description |
| --- | --- |
| `albums` |  |
| `artists` |  |
| `tracks` |  |

Operations: load.

API path: `/lookup/album/{albumId}`

#### V2Search

| Field | Description |
| --- | --- |
| `albums` |  |
| `artists` |  |
| `tracks` |  |

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
| `idAlbum` | `number` | Album ID |
| `idArtist` | `number` | Artist ID |
| `idIMVDB` | `number` | IMVDB ID |
| `idLyric` | `number` | Lyrics ID |
| `idTrack` | `number` | Track ID |
| `intCD` | `number` | CD number |
| `intDuration` | `number` | Track duration in milliseconds |
| `intLoved` | `number` | Number of loves/likes |
| `intMusicVidComments` | `number` | Number of music video comments |
| `intMusicVidDislikes` | `number` | Number of music video dislikes |
| `intMusicVidFavorites` | `number` | Number of music video favorites |
| `intMusicVidLikes` | `number` | Number of music video likes |
| `intMusicVidViews` | `number` | Number of music video views |
| `intScore` | `number` | Track score |
| `intScoreVotes` | `number` | Number of score votes |
| `intTotalListeners` | `number` | Total number of listeners |
| `intTotalPlays` | `number` | Total number of plays |
| `intTrackNumber` | `number` | Track number on album |
| `loved` | `any[]` |  |
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
| `trending` | `any[]` |  |

#### Example: List

```ts
const v1_lists = await client.V1List().list({ country: "example", format: "example", type: "example" })
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
| `idAlbum` | `number` | Album ID |
| `idArtist` | `number` | Artist ID |
| `idIMVDB` | `number` | IMVDB ID |
| `idLabel` | `number` | Label ID |
| `idLyric` | `number` | Lyrics ID |
| `idTrack` | `number` | Unique track ID |
| `intBornYear` | `number` | Birth year of the artist |
| `intCD` | `number` | CD number |
| `intCharted` | `number` | Chart position |
| `intDiedYear` | `number` | Year the artist died (if applicable) |
| `intDuration` | `number` | Track duration in milliseconds |
| `intFormedYear` | `number` | Year the artist/band was formed |
| `intLoved` | `number` | Number of loves/likes |
| `intMembers` | `number` | Number of band members |
| `intMusicVidComments` | `number` | Number of music video comments |
| `intMusicVidDislikes` | `number` | Number of music video dislikes |
| `intMusicVidFavorites` | `number` | Number of music video favorites |
| `intMusicVidLikes` | `number` | Number of music video likes |
| `intMusicVidViews` | `number` | Number of music video views |
| `intSales` | `number` | Number of sales |
| `intScore` | `number` | Track score |
| `intScoreVotes` | `number` | Number of score votes |
| `intTotalListeners` | `number` | Total number of listeners |
| `intTotalPlays` | `number` | Total number of plays |
| `intTrackNumber` | `number` | Track number on album |
| `intYearReleased` | `number` | Year the album was released |
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
| `idAlbum` | `number` | Unique album ID |
| `idArtist` | `number` | Artist ID |
| `idIMVDB` | `number` | IMVDB ID |
| `idLabel` | `number` | Label ID |
| `idLyric` | `number` | Lyrics ID |
| `idTrack` | `number` | Unique track ID |
| `intBornYear` | `number` | Birth year of the artist |
| `intCD` | `number` | CD number |
| `intCharted` | `number` | Chart position |
| `intDiedYear` | `number` | Year the artist died (if applicable) |
| `intDuration` | `number` | Track duration in milliseconds |
| `intFormedYear` | `number` | Year the artist/band was formed |
| `intLoved` | `number` | Number of loves/likes |
| `intMembers` | `number` | Number of band members |
| `intMusicVidComments` | `number` | Number of music video comments |
| `intMusicVidDislikes` | `number` | Number of music video dislikes |
| `intMusicVidFavorites` | `number` | Number of music video favorites |
| `intMusicVidLikes` | `number` | Number of music video likes |
| `intMusicVidViews` | `number` | Number of music video views |
| `intSales` | `number` | Number of sales |
| `intScore` | `number` | Album score |
| `intScoreVotes` | `number` | Number of score votes |
| `intTotalListeners` | `number` | Total number of listeners |
| `intTotalPlays` | `number` | Total number of plays |
| `intTrackNumber` | `number` | Track number on album |
| `intYearReleased` | `number` | Year the album was released |
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

```ts
const v1_searchs = await client.V1Search().list({ s: "example" })
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
| `albums` | `any[]` |  |

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
| `albums` | `any[]` |  |
| `artists` | `any[]` |  |
| `tracks` | `any[]` |  |

#### Example: Load

```ts
const v2_lookup = await client.V2Lookup().load({ album_id: 1 })
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
| `albums` | `any[]` |  |
| `artists` | `any[]` |  |
| `tracks` | `any[]` |  |

#### Example: Load

```ts
const v2_search = await client.V2Search().load({ album_name: 'album_name' })
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
const v2lookup = client.V2Lookup()
await v2lookup.load({ album_id: 1 })

// v2lookup.data() now returns the v2lookup data from the last `load`
// v2lookup.match() returns the last match criteria
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
