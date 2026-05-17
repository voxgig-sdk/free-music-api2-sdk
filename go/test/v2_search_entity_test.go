package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/free-music-api2-sdk/go"
	"github.com/voxgig-sdk/free-music-api2-sdk/go/core"

	vs "github.com/voxgig-sdk/free-music-api2-sdk/go/utility/struct"
)

func TestV2SearchEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.V2Search(nil)
		if ent == nil {
			t.Fatal("expected non-nil V2SearchEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := v2_searchBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "v2_search." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FREEMUSICAPI__TEST_V__SEARCH_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		v2SearchRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.v2_search", setup.data)))
		var v2SearchRef01Data map[string]any
		if len(v2SearchRef01DataRaw) > 0 {
			v2SearchRef01Data = core.ToMapAny(v2SearchRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = v2SearchRef01Data

		// LOAD
		v2SearchRef01Ent := client.V2Search(nil)
		v2SearchRef01MatchDt0 := map[string]any{}
		v2SearchRef01DataDt0Loaded, err := v2SearchRef01Ent.Load(v2SearchRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if v2SearchRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func v2_searchBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "v2_search", "V2SearchTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read v2_search test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse v2_search test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"v2_search01", "v2_search02", "v2_search03", "album01", "album02", "album03", "artist01", "artist02", "artist03", "track01", "track02", "track03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FREEMUSICAPI__TEST_V__SEARCH_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FREEMUSICAPI__TEST_V__SEARCH_ENTID": idmap,
		"FREEMUSICAPI__TEST_LIVE":      "FALSE",
		"FREEMUSICAPI__TEST_EXPLAIN":   "FALSE",
		"FREEMUSICAPI__APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["FREEMUSICAPI__TEST_V__SEARCH_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FREEMUSICAPI__TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["FREEMUSICAPI__APIKEY"],
			},
			extra,
		})
		client = sdk.NewFreeMusicApi2SDK(core.ToMapAny(mergedOpts))
	}

	live := env["FREEMUSICAPI__TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FREEMUSICAPI__TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
