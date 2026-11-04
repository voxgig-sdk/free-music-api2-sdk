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
(0, node_test_1.describe)('V2ListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FREE_MUSIC_API2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FREE_MUSIC_API2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FreeMusicApi2SDK.test();
        const ent = testsdk.V2List();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.FreeMusicApi2SDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.V2List().list({ "artist_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FREE_MUSIC_API2_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'v2_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "idAlbum": { "a": true, "h": "Id Album", "n": "idAlbum", "r": false, "sh": "Unique album ID", "t": "`$INTEGER`", "key$": "idAlbum", "index$": 0 }, "idArtist": { "a": true, "h": "Id Artist", "n": "idArtist", "r": false, "sh": "Artist ID", "t": "`$INTEGER`", "key$": "idArtist", "index$": 1 }, "idLabel": { "a": true, "h": "Id Label", "n": "idLabel", "r": false, "sh": "Label ID", "t": "`$INTEGER`", "key$": "idLabel", "index$": 2 }, "intLoved": { "a": true, "h": "Int Loved", "n": "intLoved", "r": false, "sh": "Number of loves/likes", "t": "`$INTEGER`", "key$": "intLoved", "index$": 3 }, "intSales": { "a": true, "h": "Int Sales", "n": "intSales", "r": false, "sh": "Number of sales", "t": "`$INTEGER`", "key$": "intSales", "index$": 4 }, "intScore": { "a": true, "h": "Int Score", "n": "intScore", "r": false, "sh": "Album score", "t": "`$INTEGER`", "key$": "intScore", "index$": 5 }, "intScoreVotes": { "a": true, "h": "Int Score Votes", "n": "intScoreVotes", "r": false, "sh": "Number of score votes", "t": "`$INTEGER`", "key$": "intScoreVotes", "index$": 6 }, "intYearReleased": { "a": true, "h": "Int Year Released", "n": "intYearReleased", "r": false, "sh": "Year the album was released", "t": "`$INTEGER`", "key$": "intYearReleased", "index$": 7 }, "strAlbum": { "a": true, "h": "Str Album", "n": "strAlbum", "r": false, "sh": "Album title", "t": "`$STRING`", "key$": "strAlbum", "index$": 8 }, "strAlbum3DCase": { "a": true, "h": "Str Album3 D Case", "n": "strAlbum3DCase", "r": false, "sh": "URL to 3D case image", "t": "`$STRING`", "key$": "strAlbum3DCase", "index$": 9 }, "strAlbum3DFace": { "a": true, "h": "Str Album3 D Face", "n": "strAlbum3DFace", "r": false, "sh": "URL to 3D face image", "t": "`$STRING`", "key$": "strAlbum3DFace", "index$": 10 }, "strAlbum3DFlat": { "a": true, "h": "Str Album3 D Flat", "n": "strAlbum3DFlat", "r": false, "sh": "URL to 3D flat image", "t": "`$STRING`", "key$": "strAlbum3DFlat", "index$": 11 }, "strAlbum3DThumb": { "a": true, "h": "Str Album3 D Thumb", "n": "strAlbum3DThumb", "r": false, "sh": "URL to 3D thumbnail", "t": "`$STRING`", "key$": "strAlbum3DThumb", "index$": 12 }, "strAlbumCDart": { "a": true, "h": "Str Album C Dart", "n": "strAlbumCDart", "r": false, "sh": "URL to CD art", "t": "`$STRING`", "key$": "strAlbumCDart", "index$": 13 }, "strAlbumSpine": { "a": true, "h": "Str Album Spine", "n": "strAlbumSpine", "r": false, "sh": "URL to album spine image", "t": "`$STRING`", "key$": "strAlbumSpine", "index$": 14 }, "strAlbumStripped": { "a": true, "h": "Str Album Stripped", "n": "strAlbumStripped", "r": false, "sh": "Album title without special characters", "t": "`$STRING`", "key$": "strAlbumStripped", "index$": 15 }, "strAlbumThumb": { "a": true, "h": "Str Album Thumb", "n": "strAlbumThumb", "r": false, "sh": "URL to album thumbnail", "t": "`$STRING`", "key$": "strAlbumThumb", "index$": 16 }, "strAlbumThumbBack": { "a": true, "h": "Str Album Thumb Back", "n": "strAlbumThumbBack", "r": false, "sh": "URL to back of album cover", "t": "`$STRING`", "key$": "strAlbumThumbBack", "index$": 17 }, "strAlbumThumbHQ": { "a": true, "h": "Str Album Thumb Hq", "n": "strAlbumThumbHQ", "r": false, "sh": "URL to high quality album thumbnail", "t": "`$STRING`", "key$": "strAlbumThumbHQ", "index$": 18 }, "strAllMusicID": { "a": true, "h": "Str All Music Id", "n": "strAllMusicID", "r": false, "sh": "AllMusic ID", "t": "`$STRING`", "key$": "strAllMusicID", "index$": 19 }, "strAmazonID": { "a": true, "h": "Str Amazon Id", "n": "strAmazonID", "r": false, "sh": "Amazon ID", "t": "`$STRING`", "key$": "strAmazonID", "index$": 20 }, "strArtist": { "a": true, "h": "Str Artist", "n": "strArtist", "r": false, "sh": "Artist name", "t": "`$STRING`", "key$": "strArtist", "index$": 21 }, "strArtistStripped": { "a": true, "h": "Str Artist Stripped", "n": "strArtistStripped", "r": false, "sh": "Artist name without special characters", "t": "`$STRING`", "key$": "strArtistStripped", "index$": 22 }, "strBBCReviewID": { "a": true, "h": "Str Bbc Review Id", "n": "strBBCReviewID", "r": false, "sh": "BBC Review ID", "t": "`$STRING`", "key$": "strBBCReviewID", "index$": 23 }, "strDescriptionEN": { "a": true, "h": "Str Description En", "n": "strDescriptionEN", "r": false, "sh": "Album description in English", "t": "`$STRING`", "key$": "strDescriptionEN", "index$": 24 }, "strDiscogsID": { "a": true, "h": "Str Discogs Id", "n": "strDiscogsID", "r": false, "sh": "Discogs ID", "t": "`$STRING`", "key$": "strDiscogsID", "index$": 25 }, "strGeniusID": { "a": true, "h": "Str Genius Id", "n": "strGeniusID", "r": false, "sh": "Genius ID", "t": "`$STRING`", "key$": "strGeniusID", "index$": 26 }, "strGenre": { "a": true, "h": "Str Genre", "n": "strGenre", "r": false, "sh": "Album genre", "t": "`$STRING`", "key$": "strGenre", "index$": 27 }, "strItunesID": { "a": true, "h": "Str Itunes Id", "n": "strItunesID", "r": false, "sh": "iTunes ID", "t": "`$STRING`", "key$": "strItunesID", "index$": 28 }, "strLabel": { "a": true, "h": "Str Label", "n": "strLabel", "r": false, "sh": "Record label", "t": "`$STRING`", "key$": "strLabel", "index$": 29 }, "strLocation": { "a": true, "h": "Str Location", "n": "strLocation", "r": false, "sh": "Recording location", "t": "`$STRING`", "key$": "strLocation", "index$": 30 }, "strLocked": { "a": true, "h": "Str Locked", "n": "strLocked", "r": false, "sh": "Whether the record is locked", "t": "`$STRING`", "key$": "strLocked", "index$": 31 }, "strLyricWikiID": { "a": true, "h": "Str Lyric Wiki Id", "n": "strLyricWikiID", "r": false, "sh": "LyricWiki ID", "t": "`$STRING`", "key$": "strLyricWikiID", "index$": 32 }, "strMood": { "a": true, "h": "Str Mood", "n": "strMood", "r": false, "sh": "Album mood", "t": "`$STRING`", "key$": "strMood", "index$": 33 }, "strMusicBrainzArtistID": { "a": true, "h": "Str Music Brainz Artist Id", "n": "strMusicBrainzArtistID", "r": false, "sh": "MusicBrainz Artist ID", "t": "`$STRING`", "key$": "strMusicBrainzArtistID", "index$": 34 }, "strMusicBrainzID": { "a": true, "h": "Str Music Brainz Id", "n": "strMusicBrainzID", "r": false, "sh": "MusicBrainz Release Group ID", "t": "`$STRING`", "key$": "strMusicBrainzID", "index$": 35 }, "strMusicMozID": { "a": true, "h": "Str Music Moz Id", "n": "strMusicMozID", "r": false, "sh": "MusicMoz ID", "t": "`$STRING`", "key$": "strMusicMozID", "index$": 36 }, "strRateYourMusicID": { "a": true, "h": "Str Rate Your Music Id", "n": "strRateYourMusicID", "r": false, "sh": "RateYourMusic ID", "t": "`$STRING`", "key$": "strRateYourMusicID", "index$": 37 }, "strReleaseFormat": { "a": true, "h": "Str Release Format", "n": "strReleaseFormat", "r": false, "sh": "Release format (CD, Vinyl, etc.)", "t": "`$STRING`", "key$": "strReleaseFormat", "index$": 38 }, "strReview": { "a": true, "h": "Str Review", "n": "strReview", "r": false, "sh": "Album review", "t": "`$STRING`", "key$": "strReview", "index$": 39 }, "strSpeed": { "a": true, "h": "Str Speed", "n": "strSpeed", "r": false, "sh": "Album speed", "t": "`$STRING`", "key$": "strSpeed", "index$": 40 }, "strStyle": { "a": true, "h": "Str Style", "n": "strStyle", "r": false, "sh": "Album style", "t": "`$STRING`", "key$": "strStyle", "index$": 41 }, "strTheme": { "a": true, "h": "Str Theme", "n": "strTheme", "r": false, "sh": "Album theme", "t": "`$STRING`", "key$": "strTheme", "index$": 42 }, "strWikidataID": { "a": true, "h": "Str Wikidata Id", "n": "strWikidataID", "r": false, "sh": "Wikidata ID", "t": "`$STRING`", "key$": "strWikidataID", "index$": 43 }, "strWikipediaID": { "a": true, "h": "Str Wikipedia Id", "n": "strWikipediaID", "r": false, "sh": "Wikipedia ID", "t": "`$STRING`", "key$": "strWikipediaID", "index$": 44 } }, "name": "v2_list", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /list/discography/{artistId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 111239, "k": "param", "n": "artist_id", "or": "artistId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/list/discography/{artistId}", "q": { "exist": ["artist_id"] }, "r": { "param": { "artistId": "artist_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "list" }, { "lit": "discography" }, { "var": "artist_id" }], "t": { "req": "`reqdata`", "res": "`body.albums`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "v2_list", "name__orig": "v2_list", "Name": "V2List", "name_": "v2_list", "name-": "v2-list", "NAME": "V2_LIST", "index$": 3 }, { "active": true, "entity": "v2_list", "key$": "BasicV2ListFlow", "kind": "basic", "name": "BasicV2ListFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "artist_id": "artist01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "v2_list_ref01" } }], "index$": 0 }] }, 'V2List', { "GET /list/discography/{artistId}": { "protocol": "http", "parameters": [{ "name": "artistId", "in": "path", "description": "Artist ID", "required": true, "schema": { "type": "integer" }, "example": 111239, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let v2_list_ref01_data = Object.values(setup.data.existing.v2_list)[0];
        // LIST
        const v2_list_ref01_ent = client.V2List();
        const v2_list_ref01_match = {};
        v2_list_ref01_match['artist_id'] = setup.idmap['artist01'];
        const v2_list_ref01_list = (await v2_list_ref01_ent.list(v2_list_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
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
    let idmap = transform(['v2_list01', 'v2_list02', 'v2_list03', 'artist01'], {
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