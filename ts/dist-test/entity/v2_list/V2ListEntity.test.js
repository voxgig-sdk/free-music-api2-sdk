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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('V2ListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FREE_MUSIC_API2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FREE_MUSIC_API2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FreeMusicApi2SDK.test();
        const ent = testsdk.V2List();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FREE_MUSIC_API2_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'v2_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "albums", "req": false, "type": "`$ARRAY`", "index$": 0 }], "name": "v2_list", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 111239, "kind": "param", "name": "artist_id", "orig": "artist_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /list/discography/{artistId}", "json": "{\"operationId\":\"getDiscographyV2\",\"parameters\":[{\"description\":\"Artist ID\",\"example\":111239,\"in\":\"path\",\"name\":\"artistId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"albums\":{\"items\":{\"properties\":{\"idAlbum\":{\"description\":\"Unique album ID\",\"type\":\"integer\"},\"idArtist\":{\"description\":\"Artist ID\",\"type\":\"integer\"},\"idLabel\":{\"description\":\"Label ID\",\"type\":\"integer\"},\"intLoved\":{\"description\":\"Number of loves/likes\",\"type\":\"integer\"},\"intSales\":{\"description\":\"Number of sales\",\"type\":\"integer\"},\"intScore\":{\"description\":\"Album score\",\"type\":\"integer\"},\"intScoreVotes\":{\"description\":\"Number of score votes\",\"type\":\"integer\"},\"intYearReleased\":{\"description\":\"Year the album was released\",\"type\":\"integer\"},\"strAlbum\":{\"description\":\"Album title\",\"type\":\"string\"},\"strAlbum3DCase\":{\"description\":\"URL to 3D case image\",\"type\":\"string\"},\"strAlbum3DFace\":{\"description\":\"URL to 3D face image\",\"type\":\"string\"},\"strAlbum3DFlat\":{\"description\":\"URL to 3D flat image\",\"type\":\"string\"},\"strAlbum3DThumb\":{\"description\":\"URL to 3D thumbnail\",\"type\":\"string\"},\"strAlbumCDart\":{\"description\":\"URL to CD art\",\"type\":\"string\"},\"strAlbumSpine\":{\"description\":\"URL to album spine image\",\"type\":\"string\"},\"strAlbumStripped\":{\"description\":\"Album title without special characters\",\"type\":\"string\"},\"strAlbumThumb\":{\"description\":\"URL to album thumbnail\",\"type\":\"string\"},\"strAlbumThumbBack\":{\"description\":\"URL to back of album cover\",\"type\":\"string\"},\"strAlbumThumbHQ\":{\"description\":\"URL to high quality album thumbnail\",\"type\":\"string\"},\"strAllMusicID\":{\"description\":\"AllMusic ID\",\"type\":\"string\"},\"strAmazonID\":{\"description\":\"Amazon ID\",\"type\":\"string\"},\"strArtist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"strArtistStripped\":{\"description\":\"Artist name without special characters\",\"type\":\"string\"},\"strBBCReviewID\":{\"description\":\"BBC Review ID\",\"type\":\"string\"},\"strDescriptionEN\":{\"description\":\"Album description in English\",\"type\":\"string\"},\"strDiscogsID\":{\"description\":\"Discogs ID\",\"type\":\"string\"},\"strGeniusID\":{\"description\":\"Genius ID\",\"type\":\"string\"},\"strGenre\":{\"description\":\"Album genre\",\"type\":\"string\"},\"strItunesID\":{\"description\":\"iTunes ID\",\"type\":\"string\"},\"strLabel\":{\"description\":\"Record label\",\"type\":\"string\"},\"strLocation\":{\"description\":\"Recording location\",\"type\":\"string\"},\"strLocked\":{\"description\":\"Whether the record is locked\",\"type\":\"string\"},\"strLyricWikiID\":{\"description\":\"LyricWiki ID\",\"type\":\"string\"},\"strMood\":{\"description\":\"Album mood\",\"type\":\"string\"},\"strMusicBrainzArtistID\":{\"description\":\"MusicBrainz Artist ID\",\"type\":\"string\"},\"strMusicBrainzID\":{\"description\":\"MusicBrainz Release Group ID\",\"type\":\"string\"},\"strMusicMozID\":{\"description\":\"MusicMoz ID\",\"type\":\"string\"},\"strRateYourMusicID\":{\"description\":\"RateYourMusic ID\",\"type\":\"string\"},\"strReleaseFormat\":{\"description\":\"Release format (CD, Vinyl, etc.)\",\"type\":\"string\"},\"strReview\":{\"description\":\"Album review\",\"type\":\"string\"},\"strSpeed\":{\"description\":\"Album speed\",\"type\":\"string\"},\"strStyle\":{\"description\":\"Album style\",\"type\":\"string\"},\"strTheme\":{\"description\":\"Album theme\",\"type\":\"string\"},\"strWikidataID\":{\"description\":\"Wikidata ID\",\"type\":\"string\"},\"strWikipediaID\":{\"description\":\"Wikipedia ID\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"description\":\"Unauthorized - Invalid or missing API key\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for v2 endpoints (Premium users only)\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/list/discography/{artistId}", "rename": { "param": { "artistId": "artist_id" } }, "segments": [{ "lit": "list" }, { "lit": "discography" }, { "var": "artist_id" }], "select": { "exist": ["artist_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["discography"]] }, "key$": "v2_list", "name__orig": "v2_list", "Name": "V2List", "name_": "v2_list", "name-": "v2-list", "NAME": "V2_LIST", "index$": 3 }, { "active": true, "entity": "v2_list", "key$": "BasicV2ListFlow", "kind": "basic", "name": "BasicV2ListFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "v2_list_ref01", "srcdatavar": "v2_list_ref01_data", "suffix": "_dt0" }, "match": { "id": "v2_list01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-v2_list_ref01" } }], "index$": 0 }] }, 'V2List');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let v2_list_ref01_data = Object.values(setup.data.existing.v2_list)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const v2_list_ref01_ent = client.V2List();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/v2_list/V2ListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FreeMusicApi2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['v2_list01', 'v2_list02', 'v2_list03', 'discography01', 'discography02', 'discography03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FREE_MUSIC_API2_TEST_V2_LIST_ENTID': idmap,
        'FREE_MUSIC_API2_TEST_LIVE': 'FALSE',
        'FREE_MUSIC_API2_TEST_EXPLAIN': 'FALSE',
        'FREE_MUSIC_API2_APIKEY': '',
    });
    idmap = env['FREE_MUSIC_API2_TEST_V2_LIST_ENTID'];
    const live = 'TRUE' === env.FREE_MUSIC_API2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FREE_MUSIC_API2_TEST_V2_LIST_ENTID'];
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
//# sourceMappingURL=V2ListEntity.test.js.map