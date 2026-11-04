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

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const v2_lookupEntityLiveStrict = true


func TestV2LookupEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.V2Lookup(nil)
		if ent == nil {
			t.Fatal("expected non-nil V2LookupEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.V2Lookup(nil).List(map[string]any{"album_id": "x"}, nil)
		if sdkerr, ok := err.(*core.FreeMusicApi2Error); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := v2_lookupBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "v2_lookup." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		v2LookupRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.v2_lookup")))
		var v2LookupRef01Data map[string]any
		if len(v2LookupRef01DataRaw) > 0 {
			v2LookupRef01Data = core.ToMapAny(v2LookupRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = v2LookupRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		v2LookupRef01Ent := client.V2Lookup(nil)
		v2LookupRef01Match := map[string]any{
			"track_id": setup.idmap["track01"],
		}
		if setup.live {
			v2LookupRef01Match["album_id"] = 2109615
			if setup.syntheticOnly || setup.idmap["track01"] == nil {
				delete(v2LookupRef01Match, "track_id")
			}
		}

		v2LookupRef01ListResult, err := v2LookupRef01Ent.List(v2LookupRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, v2LookupRef01ListOk := v2LookupRef01ListResult.([]any)
		if !v2LookupRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", v2LookupRef01ListResult)
		}

	})
}

func v2_lookupBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "v2_lookup", "V2LookupTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read v2_lookup test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse v2_lookup test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"v2_lookup01", "v2_lookup02", "v2_lookup03", "track01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID": idmap,
		"FREE_MUSIC_API2_TEST_LIVE":      "FALSE",
		"FREE_MUSIC_API2_TEST_EXPLAIN":   "FALSE",
		"FREE_MUSIC_API2_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FREE_MUSIC_API2_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["FREE_MUSIC_API2_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewFreeMusicApi2SDK(core.ToMapAny(mergedOpts))
	}

	live := env["FREE_MUSIC_API2_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FREE_MUSIC_API2_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
