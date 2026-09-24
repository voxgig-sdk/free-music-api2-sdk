# Free Music API

The Free Music API by TheAudioDB provides access to various music-related data, including artist details, album information, track listings, and music charts. It supports multiple query types, allowing users to search by artist or album name, retrieve top tracks, and manage user ratings.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 6 entities and 28 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### V1List

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `idAlbum`: Album ID
- `idArtist`: Artist ID
- `idIMVDB`: IMVDB ID
- `idLyric`: Lyrics ID
- `idTrack`: Track ID

### V1Lookup

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `idAlbum`: Album ID
- `idArtist`: Artist ID
- `idIMVDB`: IMVDB ID
- `idLabel`: Label ID
- `idLyric`: Lyrics ID

### V1Search

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `idAlbum`: Unique album ID
- `idArtist`: Artist ID
- `idIMVDB`: IMVDB ID
- `idLabel`: Label ID
- `idLyric`: Lyrics ID

### V2List

Results: Successful response.

SDK operations: `load`.

### V2Lookup

Results: Successful response.

SDK operations: `load`.

### V2Search

Results: Successful response.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| V1List | `list` | `GET /trending.php` | See reference |
| V1List | `list` | `GET /mostloved.php` | See reference |
| V1List | `list` | `GET /mvid-mb.php` | See reference |
| V1List | `list` | `GET /mvid.php` | See reference |
| V1List | `list` | `GET /track-top10-mb.php` | See reference |
| V1List | `list` | `GET /track-top10.php` | See reference |
| V1Lookup | `list` | `GET /track.php` | See reference |
| V1Lookup | `list` | `GET /album.php` | See reference |
| V1Lookup | `list` | `GET /album-mb.php` | See reference |
| V1Lookup | `list` | `GET /artist-mb.php` | See reference |
| V1Lookup | `list` | `GET /artist-social.php` | See reference |
| V1Lookup | `list` | `GET /artist.php` | See reference |
| V1Lookup | `list` | `GET /track-mb.php` | See reference |
| V1Search | `list` | `GET /searchalbum.php` | See reference |
| V1Search | `list` | `GET /searchtrack.php` | See reference |
| V1Search | `list` | `GET /discography-mb.php` | See reference |
| V1Search | `list` | `GET /discography.php` | See reference |
| V1Search | `list` | `GET /search.php` | See reference |
| V2List | `load` | `GET /list/discography/{artistId}` | Required |
| V2Lookup | `load` | `GET /lookup/album/{albumId}` | Required |
| V2Lookup | `load` | `GET /lookup/artist/{artistId}` | Required |
| V2Lookup | `load` | `GET /lookup/album_mb/{musicBrainzId}` | Required |
| V2Lookup | `load` | `GET /lookup/artist_mb/{musicBrainzId}` | Required |
| V2Lookup | `load` | `GET /lookup/track_mb/{musicBrainzId}` | Required |
| V2Lookup | `load` | `GET /lookup/track/{trackId}` | Required |
| V2Search | `load` | `GET /search/album/{albumName}` | Required |
| V2Search | `load` | `GET /search/artist/{artistName}` | Required |
| V2Search | `load` | `GET /search/track/{trackName}` | Required |

## Connect to the API

- v1 API Server (Free Tier): `https://www.theaudiodb.com/api/v1/json/123`
- v1 API Server (Premium Tier): `https://www.theaudiodb.com/api/v1/json/{apiKey}`
- v2 API Server (Premium Only): `https://www.theaudiodb.com/api/v2/json`

The default credential is sent in the `X-API-KEY` header.

API key for v2 endpoints (Premium users only)

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `free-music-api2_list`: List records for an entity. Supported entities: `v1_list`, `v1_lookup`, `v1_search`.
- `free-music-api2_load`: Load one record for an entity. Supported entities: `v2_list`, `v2_lookup`, `v2_search`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

