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
(0, node_test_1.describe)('V1ListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FREE_MUSIC_API2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FREE_MUSIC_API2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FreeMusicApi2SDK.test();
        const ent = testsdk.V1List();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FREE_MUSIC_API2_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'v1_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "idAlbum", "req": false, "short": "Album ID", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "idArtist", "req": false, "short": "Artist ID", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "idIMVDB", "req": false, "short": "IMVDB ID", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "idLyric", "req": false, "short": "Lyrics ID", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "idTrack", "req": false, "short": "Track ID", "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "intCD", "req": false, "short": "CD number", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "intDuration", "req": false, "short": "Track duration in milliseconds", "type": "`$INTEGER`", "index$": 6 }, { "active": true, "name": "intLoved", "req": false, "short": "Number of loves/likes", "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "intMusicVidComments", "req": false, "short": "Number of music video comments", "type": "`$INTEGER`", "index$": 8 }, { "active": true, "name": "intMusicVidDislikes", "req": false, "short": "Number of music video dislikes", "type": "`$INTEGER`", "index$": 9 }, { "active": true, "name": "intMusicVidFavorites", "req": false, "short": "Number of music video favorites", "type": "`$INTEGER`", "index$": 10 }, { "active": true, "name": "intMusicVidLikes", "req": false, "short": "Number of music video likes", "type": "`$INTEGER`", "index$": 11 }, { "active": true, "name": "intMusicVidViews", "req": false, "short": "Number of music video views", "type": "`$INTEGER`", "index$": 12 }, { "active": true, "name": "intScore", "req": false, "short": "Track score", "type": "`$INTEGER`", "index$": 13 }, { "active": true, "name": "intScoreVotes", "req": false, "short": "Number of score votes", "type": "`$INTEGER`", "index$": 14 }, { "active": true, "name": "intTotalListeners", "req": false, "short": "Total number of listeners", "type": "`$INTEGER`", "index$": 15 }, { "active": true, "name": "intTotalPlays", "req": false, "short": "Total number of plays", "type": "`$INTEGER`", "index$": 16 }, { "active": true, "name": "intTrackNumber", "req": false, "short": "Track number on album", "type": "`$INTEGER`", "index$": 17 }, { "active": true, "name": "loved", "req": false, "type": "`$ARRAY`", "index$": 18 }, { "active": true, "name": "strAlbum", "req": false, "short": "Album title", "type": "`$STRING`", "index$": 19 }, { "active": true, "name": "strArtist", "req": false, "short": "Artist name", "type": "`$STRING`", "index$": 20 }, { "active": true, "name": "strArtistAlternate", "req": false, "short": "Alternate artist name", "type": "`$STRING`", "index$": 21 }, { "active": true, "name": "strDescriptionEN", "req": false, "short": "Video description in English", "type": "`$STRING`", "index$": 22 }, { "active": true, "name": "strGenre", "req": false, "short": "Track genre", "type": "`$STRING`", "index$": 23 }, { "active": true, "name": "strLocked", "req": false, "short": "Whether the record is locked", "type": "`$STRING`", "index$": 24 }, { "active": true, "name": "strMood", "req": false, "short": "Track mood", "type": "`$STRING`", "index$": 25 }, { "active": true, "name": "strMusicBrainzAlbumID", "req": false, "short": "MusicBrainz Album ID", "type": "`$STRING`", "index$": 26 }, { "active": true, "name": "strMusicBrainzArtistID", "req": false, "short": "MusicBrainz Artist ID", "type": "`$STRING`", "index$": 27 }, { "active": true, "name": "strMusicBrainzID", "req": false, "short": "MusicBrainz Recording ID", "type": "`$STRING`", "index$": 28 }, { "active": true, "name": "strMusicVid", "req": false, "short": "URL to music video", "type": "`$STRING`", "index$": 29 }, { "active": true, "name": "strMusicVidCompany", "req": false, "short": "Music video production company", "type": "`$STRING`", "index$": 30 }, { "active": true, "name": "strMusicVidDirector", "req": false, "short": "Music video director", "type": "`$STRING`", "index$": 31 }, { "active": true, "name": "strMusicVidScreen1", "req": false, "short": "URL to music video screenshot 1", "type": "`$STRING`", "index$": 32 }, { "active": true, "name": "strMusicVidScreen2", "req": false, "short": "URL to music video screenshot 2", "type": "`$STRING`", "index$": 33 }, { "active": true, "name": "strMusicVidScreen3", "req": false, "short": "URL to music video screenshot 3", "type": "`$STRING`", "index$": 34 }, { "active": true, "name": "strStyle", "req": false, "short": "Track style", "type": "`$STRING`", "index$": 35 }, { "active": true, "name": "strTheme", "req": false, "short": "Track theme", "type": "`$STRING`", "index$": 36 }, { "active": true, "name": "strTrack", "req": false, "short": "Track title", "type": "`$STRING`", "index$": 37 }, { "active": true, "name": "strTrackLyrics", "req": false, "short": "Track lyrics", "type": "`$STRING`", "index$": 38 }, { "active": true, "name": "strTrackThumb", "req": false, "short": "URL to track thumbnail", "type": "`$STRING`", "index$": 39 }, { "active": true, "name": "trending", "req": false, "type": "`$ARRAY`", "index$": 40 }], "name": "v1_list", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "us", "kind": "query", "name": "country", "orig": "country", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "albums", "kind": "query", "name": "format", "orig": "format", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "itunes", "kind": "query", "name": "type", "orig": "type", "reqd": true, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /trending.php", "json": "{\"operationId\":\"getTrending\",\"parameters\":[{\"description\":\"Country code\",\"example\":\"us\",\"in\":\"query\",\"name\":\"country\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Chart type\",\"example\":\"itunes\",\"in\":\"query\",\"name\":\"type\",\"required\":true,\"schema\":{\"enum\":[\"itunes\"],\"type\":\"string\"}},{\"description\":\"Format type (albums or singles)\",\"example\":\"albums\",\"in\":\"query\",\"name\":\"format\",\"required\":true,\"schema\":{\"enum\":[\"albums\",\"singles\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"trending\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for v2 endpoints (Premium users only)\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/trending.php", "segments": [{ "lit": "trending.php" }], "select": { "exist": ["country", "format", "type"] }, "transform": { "req": "`reqdata`", "res": "`body.trending`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "example": "track", "kind": "query", "name": "format", "orig": "format", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /mostloved.php", "json": "{\"operationId\":\"getMostLoved\",\"parameters\":[{\"description\":\"Format type (track or album)\",\"example\":\"track\",\"in\":\"query\",\"name\":\"format\",\"required\":true,\"schema\":{\"enum\":[\"track\",\"album\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"loved\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for v2 endpoints (Premium users only)\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/mostloved.php", "segments": [{ "lit": "mostloved.php" }], "select": { "exist": ["format"] }, "transform": { "req": "`reqdata`", "res": "`body.loved`" }, "index$": 1 }, { "active": true, "args": { "query": [{ "active": true, "example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234", "kind": "query", "name": "i", "orig": "i", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /mvid-mb.php", "json": "{\"operationId\":\"listMusicVideosMusicBrainz\",\"parameters\":[{\"description\":\"MusicBrainz Artist ID\",\"example\":\"cc197bad-dc9c-440d-a5b5-d52ba2e14234\",\"in\":\"query\",\"name\":\"i\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"mvids\":{\"items\":{\"properties\":{\"idAlbum\":{\"description\":\"Album ID\",\"type\":\"integer\"},\"idArtist\":{\"description\":\"Artist ID\",\"type\":\"integer\"},\"idTrack\":{\"description\":\"Track ID\",\"type\":\"integer\"},\"strDescriptionEN\":{\"description\":\"Video description in English\",\"type\":\"string\"},\"strMusicVid\":{\"description\":\"URL to music video\",\"type\":\"string\"},\"strTrack\":{\"description\":\"Track title\",\"type\":\"string\"},\"strTrackThumb\":{\"description\":\"URL to track thumbnail\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for v2 endpoints (Premium users only)\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/mvid-mb.php", "segments": [{ "lit": "mvid-mb.php" }], "select": { "exist": ["i"] }, "transform": { "req": "`reqdata`", "res": "`body.mvids`" }, "index$": 2 }, { "active": true, "args": { "query": [{ "active": true, "example": 112024, "kind": "query", "name": "i", "orig": "i", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /mvid.php", "json": "{\"operationId\":\"listMusicVideos\",\"parameters\":[{\"description\":\"Artist ID\",\"example\":112024,\"in\":\"query\",\"name\":\"i\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"mvids\":{\"items\":{\"properties\":{\"idAlbum\":{\"description\":\"Album ID\",\"type\":\"integer\"},\"idArtist\":{\"description\":\"Artist ID\",\"type\":\"integer\"},\"idTrack\":{\"description\":\"Track ID\",\"type\":\"integer\"},\"strDescriptionEN\":{\"description\":\"Video description in English\",\"type\":\"string\"},\"strMusicVid\":{\"description\":\"URL to music video\",\"type\":\"string\"},\"strTrack\":{\"description\":\"Track title\",\"type\":\"string\"},\"strTrackThumb\":{\"description\":\"URL to track thumbnail\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for v2 endpoints (Premium users only)\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/mvid.php", "segments": [{ "lit": "mvid.php" }], "select": { "exist": ["i"] }, "transform": { "req": "`reqdata`", "res": "`body.mvids`" }, "index$": 3 }, { "active": true, "args": { "query": [{ "active": true, "example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234", "kind": "query", "name": "s", "orig": "s", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /track-top10-mb.php", "json": "{\"operationId\":\"getTop10TracksMusicBrainz\",\"parameters\":[{\"description\":\"MusicBrainz Artist ID\",\"example\":\"cc197bad-dc9c-440d-a5b5-d52ba2e14234\",\"in\":\"query\",\"name\":\"s\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"track\":{\"items\":{\"properties\":{\"idAlbum\":{\"description\":\"Album ID\",\"type\":\"integer\"},\"idArtist\":{\"description\":\"Artist ID\",\"type\":\"integer\"},\"idIMVDB\":{\"description\":\"IMVDB ID\",\"type\":\"integer\"},\"idLyric\":{\"description\":\"Lyrics ID\",\"type\":\"integer\"},\"idTrack\":{\"description\":\"Unique track ID\",\"type\":\"integer\"},\"intCD\":{\"description\":\"CD number\",\"type\":\"integer\"},\"intDuration\":{\"description\":\"Track duration in milliseconds\",\"type\":\"integer\"},\"intLoved\":{\"description\":\"Number of loves/likes\",\"type\":\"integer\"},\"intMusicVidComments\":{\"description\":\"Number of music video comments\",\"type\":\"integer\"},\"intMusicVidDislikes\":{\"description\":\"Number of music video dislikes\",\"type\":\"integer\"},\"intMusicVidFavorites\":{\"description\":\"Number of music video favorites\",\"type\":\"integer\"},\"intMusicVidLikes\":{\"description\":\"Number of music video likes\",\"type\":\"integer\"},\"intMusicVidViews\":{\"description\":\"Number of music video views\",\"type\":\"integer\"},\"intScore\":{\"description\":\"Track score\",\"type\":\"integer\"},\"intScoreVotes\":{\"description\":\"Number of score votes\",\"type\":\"integer\"},\"intTotalListeners\":{\"description\":\"Total number of listeners\",\"type\":\"integer\"},\"intTotalPlays\":{\"description\":\"Total number of plays\",\"type\":\"integer\"},\"intTrackNumber\":{\"description\":\"Track number on album\",\"type\":\"integer\"},\"strAlbum\":{\"description\":\"Album title\",\"type\":\"string\"},\"strArtist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"strArtistAlternate\":{\"description\":\"Alternate artist name\",\"type\":\"string\"},\"strDescriptionEN\":{\"description\":\"Track description in English\",\"type\":\"string\"},\"strGenre\":{\"description\":\"Track genre\",\"type\":\"string\"},\"strLocked\":{\"description\":\"Whether the record is locked\",\"type\":\"string\"},\"strMood\":{\"description\":\"Track mood\",\"type\":\"string\"},\"strMusicBrainzAlbumID\":{\"description\":\"MusicBrainz Album ID\",\"type\":\"string\"},\"strMusicBrainzArtistID\":{\"description\":\"MusicBrainz Artist ID\",\"type\":\"string\"},\"strMusicBrainzID\":{\"description\":\"MusicBrainz Recording ID\",\"type\":\"string\"},\"strMusicVid\":{\"description\":\"URL to music video\",\"type\":\"string\"},\"strMusicVidCompany\":{\"description\":\"Music video production company\",\"type\":\"string\"},\"strMusicVidDirector\":{\"description\":\"Music video director\",\"type\":\"string\"},\"strMusicVidScreen1\":{\"description\":\"URL to music video screenshot 1\",\"type\":\"string\"},\"strMusicVidScreen2\":{\"description\":\"URL to music video screenshot 2\",\"type\":\"string\"},\"strMusicVidScreen3\":{\"description\":\"URL to music video screenshot 3\",\"type\":\"string\"},\"strStyle\":{\"description\":\"Track style\",\"type\":\"string\"},\"strTheme\":{\"description\":\"Track theme\",\"type\":\"string\"},\"strTrack\":{\"description\":\"Track title\",\"type\":\"string\"},\"strTrackLyrics\":{\"description\":\"Track lyrics\",\"type\":\"string\"},\"strTrackThumb\":{\"description\":\"URL to track thumbnail\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for v2 endpoints (Premium users only)\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/track-top10-mb.php", "segments": [{ "lit": "track-top10-mb.php" }], "select": { "exist": ["s"] }, "transform": { "req": "`reqdata`", "res": "`body.track`" }, "index$": 4 }, { "active": true, "args": { "query": [{ "active": true, "example": "coldplay", "kind": "query", "name": "s", "orig": "s", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /track-top10.php", "json": "{\"operationId\":\"getTop10Tracks\",\"parameters\":[{\"description\":\"Artist name\",\"example\":\"coldplay\",\"in\":\"query\",\"name\":\"s\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"track\":{\"items\":{\"properties\":{\"idAlbum\":{\"description\":\"Album ID\",\"type\":\"integer\"},\"idArtist\":{\"description\":\"Artist ID\",\"type\":\"integer\"},\"idIMVDB\":{\"description\":\"IMVDB ID\",\"type\":\"integer\"},\"idLyric\":{\"description\":\"Lyrics ID\",\"type\":\"integer\"},\"idTrack\":{\"description\":\"Unique track ID\",\"type\":\"integer\"},\"intCD\":{\"description\":\"CD number\",\"type\":\"integer\"},\"intDuration\":{\"description\":\"Track duration in milliseconds\",\"type\":\"integer\"},\"intLoved\":{\"description\":\"Number of loves/likes\",\"type\":\"integer\"},\"intMusicVidComments\":{\"description\":\"Number of music video comments\",\"type\":\"integer\"},\"intMusicVidDislikes\":{\"description\":\"Number of music video dislikes\",\"type\":\"integer\"},\"intMusicVidFavorites\":{\"description\":\"Number of music video favorites\",\"type\":\"integer\"},\"intMusicVidLikes\":{\"description\":\"Number of music video likes\",\"type\":\"integer\"},\"intMusicVidViews\":{\"description\":\"Number of music video views\",\"type\":\"integer\"},\"intScore\":{\"description\":\"Track score\",\"type\":\"integer\"},\"intScoreVotes\":{\"description\":\"Number of score votes\",\"type\":\"integer\"},\"intTotalListeners\":{\"description\":\"Total number of listeners\",\"type\":\"integer\"},\"intTotalPlays\":{\"description\":\"Total number of plays\",\"type\":\"integer\"},\"intTrackNumber\":{\"description\":\"Track number on album\",\"type\":\"integer\"},\"strAlbum\":{\"description\":\"Album title\",\"type\":\"string\"},\"strArtist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"strArtistAlternate\":{\"description\":\"Alternate artist name\",\"type\":\"string\"},\"strDescriptionEN\":{\"description\":\"Track description in English\",\"type\":\"string\"},\"strGenre\":{\"description\":\"Track genre\",\"type\":\"string\"},\"strLocked\":{\"description\":\"Whether the record is locked\",\"type\":\"string\"},\"strMood\":{\"description\":\"Track mood\",\"type\":\"string\"},\"strMusicBrainzAlbumID\":{\"description\":\"MusicBrainz Album ID\",\"type\":\"string\"},\"strMusicBrainzArtistID\":{\"description\":\"MusicBrainz Artist ID\",\"type\":\"string\"},\"strMusicBrainzID\":{\"description\":\"MusicBrainz Recording ID\",\"type\":\"string\"},\"strMusicVid\":{\"description\":\"URL to music video\",\"type\":\"string\"},\"strMusicVidCompany\":{\"description\":\"Music video production company\",\"type\":\"string\"},\"strMusicVidDirector\":{\"description\":\"Music video director\",\"type\":\"string\"},\"strMusicVidScreen1\":{\"description\":\"URL to music video screenshot 1\",\"type\":\"string\"},\"strMusicVidScreen2\":{\"description\":\"URL to music video screenshot 2\",\"type\":\"string\"},\"strMusicVidScreen3\":{\"description\":\"URL to music video screenshot 3\",\"type\":\"string\"},\"strStyle\":{\"description\":\"Track style\",\"type\":\"string\"},\"strTheme\":{\"description\":\"Track theme\",\"type\":\"string\"},\"strTrack\":{\"description\":\"Track title\",\"type\":\"string\"},\"strTrackLyrics\":{\"description\":\"Track lyrics\",\"type\":\"string\"},\"strTrackThumb\":{\"description\":\"URL to track thumbnail\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for v2 endpoints (Premium users only)\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/track-top10.php", "segments": [{ "lit": "track-top10.php" }], "select": { "exist": ["s"] }, "transform": { "req": "`reqdata`", "res": "`body.track`" }, "index$": 5 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "v1_list", "name__orig": "v1_list", "Name": "V1List", "name_": "v1_list", "name-": "v1-list", "NAME": "V1_LIST", "index$": 0 }, { "active": true, "entity": "v1_list", "key$": "BasicV1ListFlow", "kind": "basic", "name": "BasicV1ListFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "v1_list_ref01" } }], "index$": 0 }] }, 'V1List');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let v1_list_ref01_data = Object.values(setup.data.existing.v1_list)[0];
        // LIST
        const v1_list_ref01_ent = client.V1List();
        const v1_list_ref01_match = {};
        const v1_list_ref01_list = (await v1_list_ref01_ent.list(v1_list_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/v1_list/V1ListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FreeMusicApi2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['v1_list01', 'v1_list02', 'v1_list03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FREE_MUSIC_API2_TEST_V1_LIST_ENTID': idmap,
        'FREE_MUSIC_API2_TEST_LIVE': 'FALSE',
        'FREE_MUSIC_API2_TEST_EXPLAIN': 'FALSE',
        'FREE_MUSIC_API2_APIKEY': '',
    });
    idmap = env['FREE_MUSIC_API2_TEST_V1_LIST_ENTID'];
    const live = 'TRUE' === env.FREE_MUSIC_API2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FREE_MUSIC_API2_TEST_V1_LIST_ENTID'];
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
//# sourceMappingURL=V1ListEntity.test.js.map