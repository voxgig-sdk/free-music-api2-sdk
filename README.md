# FreeMusicApi2 SDK

Free Music API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { FreeMusicApi2SDK } from 'free-music-api2'

const client = new FreeMusicApi2SDK({
  apikey: process.env.FREE-MUSIC-API2_APIKEY,
})

// List all v1lists
const v1lists = await client.V1List().list()
console.log(v1lists.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **V1List** |  | `/trending.php` |
| **V1Lookup** |  | `/track.php` |
| **V1Search** |  | `/searchalbum.php` |
| **V2List** |  | `/list/discography/{artistId}` |
| **V2Lookup** |  | `/lookup/album/{albumId}` |
| **V2Search** |  | `/search/album/{albumName}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from freemusicapi2_sdk import FreeMusicApi2SDK

client = FreeMusicApi2SDK({
    "apikey": os.environ.get("FREE-MUSIC-API2_APIKEY"),
})

# List all v1lists
v1lists, err = client.V1List().list()
print(v1lists)
```

### PHP

```php
<?php
require_once 'freemusicapi2_sdk.php';

$client = new FreeMusicApi2SDK([
    "apikey" => getenv("FREE-MUSIC-API2_APIKEY"),
]);

// List all v1lists
[$v1lists, $err] = $client->V1List()->list();
print_r($v1lists);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/free-music-api2-sdk/go"

client := sdk.NewFreeMusicApi2SDK(map[string]any{
    "apikey": os.Getenv("FREE-MUSIC-API2_APIKEY"),
})

// List all v1lists
v1lists, err := client.V1List(nil).List(nil, nil)
fmt.Println(v1lists)
```

### Ruby

```ruby
require_relative "FreeMusicApi2_sdk"

client = FreeMusicApi2SDK.new({
  "apikey" => ENV["FREE-MUSIC-API2_APIKEY"],
})

# List all v1lists
v1lists, err = client.V1List().list
puts v1lists
```

### Lua

```lua
local sdk = require("free-music-api2_sdk")

local client = sdk.new({
  apikey = os.getenv("FREE-MUSIC-API2_APIKEY"),
})

-- List all v1lists
local v1lists, err = client:V1List():list()
print(v1lists)
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
client = FreeMusicApi2SDK.test()
result, err = client.V1List().load({"id": "test01"})
```

### PHP

```php
$client = FreeMusicApi2SDK::test();
[$result, $err] = $client->V1List()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.V1List(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FreeMusicApi2SDK.test
result, err = client.V1List().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:V1List():load({ id = "test01" })
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

---

Generated from the Free Music API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
