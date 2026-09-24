"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('V2SearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FREE_MUSIC_API2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FREE_MUSIC_API2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FreeMusicApi2SDK.test();
        const ent = testsdk.V2Search();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FREE_MUSIC_API2_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'v2_search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "albums": { "a": true, "h": "Albums", "n": "albums", "r": false, "t": "`$ARRAY`", "key$": "albums", "index$": 0 }, "artists": { "a": true, "h": "Artists", "n": "artists", "r": false, "t": "`$ARRAY`", "key$": "artists", "index$": 1 }, "tracks": { "a": true, "h": "Tracks", "n": "tracks", "r": false, "t": "`$ARRAY`", "key$": "tracks", "index$": 2 } }, "name": "v2_search", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /search/album/{albumName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "parachutes", "k": "param", "n": "album_name", "or": "album_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/search/album/{albumName}", "q": { "exist": ["album_name"] }, "r": { "param": { "albumName": "album_name" } }, "s": [{ "lit": "search" }, { "lit": "album" }, { "var": "album_name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /search/artist/{artistName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "coldplay", "k": "param", "n": "artist_name", "or": "artist_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/search/artist/{artistName}", "q": { "exist": ["artist_name"] }, "r": { "param": { "artistName": "artist_name" } }, "s": [{ "lit": "search" }, { "lit": "artist" }, { "var": "artist_name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /search/track/{trackName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "yellow", "k": "param", "n": "track_name", "or": "track_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/search/track/{trackName}", "q": { "exist": ["track_name"] }, "r": { "param": { "trackName": "track_name" } }, "s": [{ "lit": "search" }, { "lit": "track" }, { "var": "track_name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "v2_search", "name__orig": "v2_search", "Name": "V2Search", "name_": "v2_search", "name-": "v2-search", "NAME": "V2_SEARCH", "index$": 5 }, { "active": true, "entity": "v2_search", "key$": "BasicV2SearchFlow", "kind": "basic", "name": "BasicV2SearchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "v2_search_ref01", "srcdatavar": "v2_search_ref01_data", "suffix": "_dt0" }, "m": { "id": "v2_search01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-v2_search_ref01" } }], "index$": 0 }] }, 'V2Search', { "GET /search/album/{albumName}": { "protocol": "http", "operationId": "searchAlbumV2", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "albums": { "type": "array", "items": { "type": "object", "properties": { "idAlbum": { "description": "Unique album ID", "type": "integer" }, "idArtist": { "description": "Artist ID", "type": "integer" }, "idLabel": { "description": "Label ID", "type": "integer" }, "strAlbum": { "description": "Album title", "type": "string" }, "strAlbumStripped": { "description": "Album title without special characters", "type": "string" }, "strArtist": { "description": "Artist name", "type": "string" }, "strArtistStripped": { "description": "Artist name without special characters", "type": "string" }, "intYearReleased": { "description": "Year the album was released", "type": "integer" }, "strStyle": { "description": "Album style", "type": "string" }, "strGenre": { "description": "Album genre", "type": "string" }, "strLabel": { "description": "Record label", "type": "string" }, "strReleaseFormat": { "description": "Release format (CD, Vinyl, etc.)", "type": "string" }, "intSales": { "description": "Number of sales", "type": "integer" }, "strAlbumThumb": { "description": "URL to album thumbnail", "type": "string" }, "strAlbumThumbHQ": { "description": "URL to high quality album thumbnail", "type": "string" }, "strAlbumThumbBack": { "description": "URL to back of album cover", "type": "string" }, "strAlbumCDart": { "description": "URL to CD art", "type": "string" }, "strAlbumSpine": { "description": "URL to album spine image", "type": "string" }, "strAlbum3DCase": { "description": "URL to 3D case image", "type": "string" }, "strAlbum3DFlat": { "description": "URL to 3D flat image", "type": "string" }, "strAlbum3DFace": { "description": "URL to 3D face image", "type": "string" }, "strAlbum3DThumb": { "description": "URL to 3D thumbnail", "type": "string" }, "strDescriptionEN": { "description": "Album description in English", "type": "string" }, "intLoved": { "description": "Number of loves/likes", "type": "integer" }, "intScore": { "description": "Album score", "type": "integer" }, "intScoreVotes": { "description": "Number of score votes", "type": "integer" }, "strReview": { "description": "Album review", "type": "string" }, "strMood": { "description": "Album mood", "type": "string" }, "strTheme": { "description": "Album theme", "type": "string" }, "strSpeed": { "description": "Album speed", "type": "string" }, "strLocation": { "description": "Recording location", "type": "string" }, "strMusicBrainzID": { "description": "MusicBrainz Release Group ID", "type": "string" }, "strMusicBrainzArtistID": { "description": "MusicBrainz Artist ID", "type": "string" }, "strAllMusicID": { "description": "AllMusic ID", "type": "string" }, "strBBCReviewID": { "description": "BBC Review ID", "type": "string" }, "strRateYourMusicID": { "description": "RateYourMusic ID", "type": "string" }, "strDiscogsID": { "description": "Discogs ID", "type": "string" }, "strWikidataID": { "description": "Wikidata ID", "type": "string" }, "strWikipediaID": { "description": "Wikipedia ID", "type": "string" }, "strGeniusID": { "description": "Genius ID", "type": "string" }, "strLyricWikiID": { "description": "LyricWiki ID", "type": "string" }, "strMusicMozID": { "description": "MusicMoz ID", "type": "string" }, "strItunesID": { "description": "iTunes ID", "type": "string" }, "strAmazonID": { "description": "Amazon ID", "type": "string" }, "strLocked": { "description": "Whether the record is locked", "type": "string" } }, "x-ref": "#/components/schemas/Album" }, "key$": "albums" } }, "index$": 0 } } } }, "401": { "description": "Unauthorized - Invalid or missing API key" }, "429": { "description": "Rate limit exceeded" } }, "parameters": [{ "name": "albumName", "in": "path", "description": "Album name to search for", "required": true, "schema": { "type": "string" }, "example": "parachutes", "index$": 0 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-KEY", "description": "API key for v2 endpoints (Premium users only)" } } }, "GET /search/artist/{artistName}": { "protocol": "http", "operationId": "searchArtistV2", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "artists": { "type": "array", "items": { "type": "object", "properties": { "idArtist": { "description": "Unique artist ID", "type": "integer" }, "strArtist": { "description": "Artist name", "type": "string" }, "strArtistAlternate": { "description": "Alternate artist name", "type": "string" }, "strLabel": { "description": "Record label", "type": "string" }, "idLabel": { "description": "Label ID", "type": "integer" }, "intFormedYear": { "description": "Year the artist/band was formed", "type": "integer" }, "intBornYear": { "description": "Birth year of the artist", "type": "integer" }, "intDiedYear": { "description": "Year the artist died (if applicable)", "type": "integer" }, "strDisbanded": { "description": "Disbanded status", "type": "string" }, "strStyle": { "description": "Musical style", "type": "string" }, "strGenre": { "description": "Music genre", "type": "string" }, "strMood": { "description": "Musical mood", "type": "string" }, "strWebsite": { "description": "Official website URL", "type": "string" }, "strFacebook": { "description": "Facebook page URL", "type": "string" }, "strTwitter": { "description": "Twitter profile URL", "type": "string" }, "strBiographyEN": { "description": "Artist biography in English", "type": "string" }, "strBiographyCN": { "description": "Artist biography in Chinese", "type": "string" }, "strBiographyDE": { "description": "Artist biography in German", "type": "string" }, "strBiographyFR": { "description": "Artist biography in French", "type": "string" }, "strBiographyIT": { "description": "Artist biography in Italian", "type": "string" }, "strBiographyJP": { "description": "Artist biography in Japanese", "type": "string" }, "strBiographyRU": { "description": "Artist biography in Russian", "type": "string" }, "strBiographyES": { "description": "Artist biography in Spanish", "type": "string" }, "strBiographyPT": { "description": "Artist biography in Portuguese", "type": "string" }, "strBiographySE": { "description": "Artist biography in Swedish", "type": "string" }, "strBiographyNL": { "description": "Artist biography in Dutch", "type": "string" }, "strBiographyHU": { "description": "Artist biography in Hungarian", "type": "string" }, "strBiographyNO": { "description": "Artist biography in Norwegian", "type": "string" }, "strBiographyIL": { "description": "Artist biography in Hebrew", "type": "string" }, "strBiographyPL": { "description": "Artist biography in Polish", "type": "string" }, "strGender": { "description": "Artist gender", "type": "string" }, "intMembers": { "description": "Number of band members", "type": "integer" }, "strCountry": { "description": "Country of origin", "type": "string" }, "strCountryCode": { "description": "Country code", "type": "string" }, "strArtistThumb": { "description": "URL to artist thumbnail image", "type": "string" }, "strArtistLogo": { "description": "URL to artist logo", "type": "string" }, "strArtistCutout": { "description": "URL to artist cutout image", "type": "string" }, "strArtistClearart": { "description": "URL to artist clearart", "type": "string" }, "strArtistWideThumb": { "description": "URL to artist wide thumbnail", "type": "string" }, "strArtistFanart": { "description": "URL to artist fanart", "type": "string" }, "strArtistFanart2": { "description": "URL to alternate artist fanart", "type": "string" }, "strArtistFanart3": { "description": "URL to third artist fanart", "type": "string" }, "strArtistFanart4": { "description": "URL to fourth artist fanart", "type": "string" }, "strArtistBanner": { "description": "URL to artist banner", "type": "string" }, "strMusicBrainzID": { "description": "MusicBrainz Artist ID", "type": "string" }, "strLastFMChart": { "description": "Last.fm chart URL", "type": "string" }, "intCharted": { "description": "Chart position", "type": "integer" }, "strLocked": { "description": "Whether the record is locked", "type": "string" } }, "x-ref": "#/components/schemas/Artist" }, "key$": "artists" } }, "index$": 0 } } } }, "401": { "description": "Unauthorized - Invalid or missing API key" }, "429": { "description": "Rate limit exceeded" } }, "parameters": [{ "name": "artistName", "in": "path", "description": "Artist name to search for", "required": true, "schema": { "type": "string" }, "example": "coldplay", "index$": 0 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-KEY", "description": "API key for v2 endpoints (Premium users only)" } } }, "GET /search/track/{trackName}": { "protocol": "http", "operationId": "searchTrackV2", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "tracks": { "type": "array", "items": { "type": "object", "properties": { "idTrack": { "description": "Unique track ID", "type": "integer" }, "idAlbum": { "description": "Album ID", "type": "integer" }, "idArtist": { "description": "Artist ID", "type": "integer" }, "idLyric": { "description": "Lyrics ID", "type": "integer" }, "idIMVDB": { "description": "IMVDB ID", "type": "integer" }, "strTrack": { "description": "Track title", "type": "string" }, "strAlbum": { "description": "Album title", "type": "string" }, "strArtist": { "description": "Artist name", "type": "string" }, "strArtistAlternate": { "description": "Alternate artist name", "type": "string" }, "intCD": { "description": "CD number", "type": "integer" }, "intDuration": { "description": "Track duration in milliseconds", "type": "integer" }, "strGenre": { "description": "Track genre", "type": "string" }, "strMood": { "description": "Track mood", "type": "string" }, "strStyle": { "description": "Track style", "type": "string" }, "strTheme": { "description": "Track theme", "type": "string" }, "strDescriptionEN": { "description": "Track description in English", "type": "string" }, "strTrackThumb": { "description": "URL to track thumbnail", "type": "string" }, "strTrackLyrics": { "description": "Track lyrics", "type": "string" }, "strMusicVid": { "description": "URL to music video", "type": "string" }, "strMusicVidDirector": { "description": "Music video director", "type": "string" }, "strMusicVidCompany": { "description": "Music video production company", "type": "string" }, "strMusicVidScreen1": { "description": "URL to music video screenshot 1", "type": "string" }, "strMusicVidScreen2": { "description": "URL to music video screenshot 2", "type": "string" }, "strMusicVidScreen3": { "description": "URL to music video screenshot 3", "type": "string" }, "intMusicVidViews": { "description": "Number of music video views", "type": "integer" }, "intMusicVidLikes": { "description": "Number of music video likes", "type": "integer" }, "intMusicVidDislikes": { "description": "Number of music video dislikes", "type": "integer" }, "intMusicVidFavorites": { "description": "Number of music video favorites", "type": "integer" }, "intMusicVidComments": { "description": "Number of music video comments", "type": "integer" }, "intTrackNumber": { "description": "Track number on album", "type": "integer" }, "intLoved": { "description": "Number of loves/likes", "type": "integer" }, "intScore": { "description": "Track score", "type": "integer" }, "intScoreVotes": { "description": "Number of score votes", "type": "integer" }, "intTotalListeners": { "description": "Total number of listeners", "type": "integer" }, "intTotalPlays": { "description": "Total number of plays", "type": "integer" }, "strMusicBrainzID": { "description": "MusicBrainz Recording ID", "type": "string" }, "strMusicBrainzAlbumID": { "description": "MusicBrainz Album ID", "type": "string" }, "strMusicBrainzArtistID": { "description": "MusicBrainz Artist ID", "type": "string" }, "strLocked": { "description": "Whether the record is locked", "type": "string" } }, "x-ref": "#/components/schemas/Track" }, "key$": "tracks" } }, "index$": 0 } } } }, "401": { "description": "Unauthorized - Invalid or missing API key" }, "429": { "description": "Rate limit exceeded" } }, "parameters": [{ "name": "trackName", "in": "path", "description": "Track name to search for", "required": true, "schema": { "type": "string" }, "example": "yellow", "index$": 0 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-KEY", "description": "API key for v2 endpoints (Premium users only)" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let v2_search_ref01_data = Object.values(setup.data.existing.v2_search)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const v2_search_ref01_ent = client.V2Search();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/v2_search/V2SearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FreeMusicApi2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['v2_search01', 'v2_search02', 'v2_search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FREE_MUSIC_API2_TEST_V2_SEARCH_ENTID': idmap,
        'FREE_MUSIC_API2_TEST_LIVE': 'FALSE',
        'FREE_MUSIC_API2_TEST_EXPLAIN': 'FALSE',
        'FREE_MUSIC_API2_APIKEY': '',
    });
    idmap = env['FREE_MUSIC_API2_TEST_V2_SEARCH_ENTID'];
    const live = 'TRUE' === env.FREE_MUSIC_API2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FREE_MUSIC_API2_TEST_V2_SEARCH_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FreeMusicApi2SDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.FREE_MUSIC_API2_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.FREE_MUSIC_API2_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=V2SearchEntity.test.js.map