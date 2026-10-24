# V2List entity test

import json
import os
import time

import pytest

from freemusicapi2_sdk.utility.voxgig_struct import voxgig_struct as vs
from freemusicapi2_sdk import FreeMusicApi2SDK
from freemusicapi2_sdk.core import helpers
from freemusicapi2_sdk.config import shared_config
from freemusicapi2_sdk.feature.base_feature import FreeMusicApi2BaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestV2ListEntity:

    def test_should_create_instance(self):
        testsdk = FreeMusicApi2SDK.test(None, None)
        ent = testsdk.V2List(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = FreeMusicApi2SDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.V2List(None).load({"artist_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _v2_list_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in []:
            _skip, _reason = runner.is_control_skipped("entityOp", "v2_list." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        v2_list_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.v2_list")))
        v2_list_ref01_data = None
        if len(v2_list_ref01_data_raw) > 0:
            v2_list_ref01_data = helpers.to_map(v2_list_ref01_data_raw[0][1])



def _v2_list_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/v2_list/V2ListTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = FreeMusicApi2SDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["v2_list01", "v2_list02", "v2_list03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "FREE_MUSIC_API2_TEST_V2_LIST_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "FREE_MUSIC_API2_TEST_V2_LIST_ENTID": idmap,
        "FREE_MUSIC_API2_TEST_LIVE": "FALSE",
        "FREE_MUSIC_API2_TEST_EXPLAIN": "FALSE",
        "FREE_MUSIC_API2_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("FREE_MUSIC_API2_TEST_V2_LIST_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("FREE_MUSIC_API2_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("FREE_MUSIC_API2_APIKEY"),
            },
            extra or {},
        ])
        client = FreeMusicApi2SDK(helpers.to_map(merged_opts))

    _live = env.get("FREE_MUSIC_API2_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("FREE_MUSIC_API2_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
