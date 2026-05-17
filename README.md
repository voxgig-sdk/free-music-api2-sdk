# FreeMusicApi2 SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


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

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/free-music-api2-sdk/go"

client := sdk.NewFreeMusicApi2SDK(map[string]any{
    "apikey": os.Getenv("FREE-MUSIC-API2_APIKEY"),
})

// List all v1lists
v1lists, err := client.V1List(nil).List(nil, nil)
```

### Lua

```lua
local sdk = require("free-music-api2_sdk")

local client = sdk.new({
  apikey = os.getenv("FREE-MUSIC-API2_APIKEY"),
})

-- List all v1lists
local v1lists, err = client:V1List(nil):list(nil, nil)
```

### PHP

```php
<?php
require_once 'freemusicapi2_sdk.php';

$client = new FreeMusicApi2SDK([
    "apikey" => getenv("FREE-MUSIC-API2_APIKEY"),
]);

// List all v1lists
[$v1lists, $err] = $client->V1List(null)->list(null, null);
```

### Python

```python
import os
from freemusicapi2_sdk import FreeMusicApi2SDK

client = FreeMusicApi2SDK({
    "apikey": os.environ.get("FREE-MUSIC-API2_APIKEY"),
})

# List all v1lists
v1lists, err = client.V1List(None).list(None, None)
```

### Ruby

```ruby
require_relative "FreeMusicApi2_sdk"

client = FreeMusicApi2SDK.new({
  "apikey" => ENV["FREE-MUSIC-API2_APIKEY"],
})

# List all v1lists
v1lists, err = client.V1List(nil).list(nil, nil)
```

### TypeScript

```ts
import { FreeMusicApi2SDK } from 'free-music-api2'

const client = new FreeMusicApi2SDK({
  apikey: process.env.FREE-MUSIC-API2_APIKEY,
})

// List all v1lists
const v1lists = await client.V1List().list()
```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.V1List(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:V1List(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = FreeMusicApi2SDK::test(null, null);
[$result, $err] = $client->V1List(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = FreeMusicApi2SDK.test(None, None)
result, err = client.V1List(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = FreeMusicApi2SDK.test(nil, nil)
result, err = client.V1List(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = FreeMusicApi2SDK.test()
const result = await client.V1List().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

