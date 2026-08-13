<?php
declare(strict_types=1);

// V2Lookup entity test

require_once __DIR__ . '/../freemusicapi2_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class V2LookupEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = FreeMusicApi2SDK::test(null, null);
        $ent = $testsdk->V2Lookup(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = v2_lookup_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "v2_lookup." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $v2_lookup_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.v2_lookup")));
        $v2_lookup_ref01_data = null;
        if (count($v2_lookup_ref01_data_raw) > 0) {
            $v2_lookup_ref01_data = Helpers::to_map($v2_lookup_ref01_data_raw[0][1]);
        }

        // LOAD
        $v2_lookup_ref01_ent = $client->V2Lookup(null);
        $v2_lookup_ref01_match_dt0 = [];
        $v2_lookup_ref01_data_dt0_loaded = $v2_lookup_ref01_ent->load($v2_lookup_ref01_match_dt0, null);
        $this->assertNotNull($v2_lookup_ref01_data_dt0_loaded);

    }
}

function v2_lookup_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/v2_lookup/V2LookupTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = FreeMusicApi2SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["v2_lookup01", "v2_lookup02", "v2_lookup03", "album01", "album02", "album03", "album_mb01", "album_mb02", "album_mb03", "artist01", "artist02", "artist03", "artist_mb01", "artist_mb02", "artist_mb03", "track01", "track02", "track03", "track_mb01", "track_mb02", "track_mb03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID" => $idmap,
        "FREE_MUSIC_API2_TEST_LIVE" => "FALSE",
        "FREE_MUSIC_API2_TEST_EXPLAIN" => "FALSE",
        "FREE_MUSIC_API2_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["FREE_MUSIC_API2_TEST_V2_LOOKUP_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["FREE_MUSIC_API2_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["FREE_MUSIC_API2_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new FreeMusicApi2SDK(Helpers::to_map($merged_opts));
    }

    $live = $env["FREE_MUSIC_API2_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["FREE_MUSIC_API2_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
