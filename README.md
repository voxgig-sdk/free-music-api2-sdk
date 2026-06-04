# FreeMusicApi2 SDK

Search and look up artists, albums, tracks, music videos and charts from TheAudioDB's community music metadata catalogue

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Free Music API

[TheAudioDB](https://www.theaudiodb.com/) is a community-driven music metadata and fanart database. It offers a JSON HTTP API covering artists, albums, tracks, music videos and chart/trending lists, with high-resolution artwork (logos, banners, clearart, thumbs, 3D album cases) for many entries.

What the API exposes:

- Search for artists, albums and tracks by name
- Look up artists, albums and tracks by TheAudioDB ID or by MusicBrainz ID
- List music videos for an artist and discography information
- Retrieve trending and most-loved chart lists

Authentication uses an API key in the URL path for v1 (`/api/v1/json/{key}/...`) and the `X-API-KEY` header for v2. The test/free key is `123`. The v2 endpoints are gated to paid plans. Rate limiting is per-minute and tier-dependent; over-limit requests return 429.

## Try it

**TypeScript**
```bash
npm install free-music-api2
```

**Python**
```bash
pip install free-music-api2-sdk
```

**PHP**
```bash
composer require voxgig/free-music-api2-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/free-music-api2-sdk/go
```

**Ruby**
```bash
gem install free-music-api2-sdk
```

**Lua**
```bash
luarocks install free-music-api2-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { FreeMusicApi2SDK } from 'free-music-api2'

const client = new FreeMusicApi2SDK({})

// List all v1lists
const v1lists = await client.V1List().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o free-music-api2-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "free-music-api2": {
      "command": "/abs/path/to/free-music-api2-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **V1List** | v1 list endpoints for collections such as an artist's music videos, charts, trending and most-loved items (e.g. `/api/v1/json/{key}/mvid.php`, `/api/v1/json/{key}/trending.php`, `/api/v1/json/{key}/mostloved.php`). | `/trending.php` |
| **V1Lookup** | v1 lookup endpoints that fetch a single artist, album or track by TheAudioDB ID or MusicBrainz ID (e.g. `/api/v1/json/{key}/artist.php`, `/album.php`, `/track.php`). | `/track.php` |
| **V1Search** | v1 search endpoints for finding artists, albums and tracks by name (e.g. `/api/v1/json/{key}/search.php`, `/searchalbum.php`, `/searchtrack.php`). | `/searchalbum.php` |
| **V2List** | v2 list endpoints (premium tier) covering artist discography and related collections under `/api/v2/json/...`, authenticated with the `X-API-KEY` header. | `/list/discography/{artistId}` |
| **V2Lookup** | v2 lookup endpoints (premium tier) for fetching individual artists, albums and tracks under `/api/v2/json/...`. | `/lookup/album/{albumId}` |
| **V2Search** | v2 search endpoints (premium tier) for artist, album and track search under `/api/v2/json/...`. | `/search/album/{albumName}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from freemusicapi2_sdk import FreeMusicApi2SDK

client = FreeMusicApi2SDK({})

# List all v1lists
v1lists, err = client.V1List(None).list(None, None)
```

### PHP

```php
<?php
require_once 'freemusicapi2_sdk.php';

$client = new FreeMusicApi2SDK([]);

// List all v1lists
[$v1lists, $err] = $client->V1List(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/free-music-api2-sdk/go"

client := sdk.NewFreeMusicApi2SDK(map[string]any{})

// List all v1lists
v1lists, err := client.V1List(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "FreeMusicApi2_sdk"

client = FreeMusicApi2SDK.new({})

# List all v1lists
v1lists, err = client.V1List(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("free-music-api2_sdk")

local client = sdk.new({})

-- List all v1lists
local v1lists, err = client:V1List(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FreeMusicApi2SDK.test()
const result = await client.V1List().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FreeMusicApi2SDK.test(None, None)
result, err = client.V1List(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FreeMusicApi2SDK::test(null, null);
[$result, $err] = $client->V1List(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.V1List(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FreeMusicApi2SDK.test(nil, nil)
result, err = client.V1List(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:V1List(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Free Music API

- Upstream: [https://www.theaudiodb.com/](https://www.theaudiodb.com/)
- API docs: [https://www.theaudiodb.com/free_music_api](https://www.theaudiodb.com/free_music_api)

- TheAudioDB is a community-maintained metadata and fanart site running since 2012.
- The free API key `123` is intended for testing/development; production usage is expected to use a paid key.
- Free tier is limited to roughly 30 requests/minute; premium and business tiers raise that ceiling. Exceeding the limit returns HTTP 429.
- Check TheAudioDB's Terms and Privacy pages for attribution and acceptable-use details.

---

Generated from the Free Music API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
