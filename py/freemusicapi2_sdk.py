# FreeMusicApi2 SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import FreeMusicApi2Utility
from core.spec import FreeMusicApi2Spec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import FreeMusicApi2BaseFeature
from features import _make_feature


class FreeMusicApi2SDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = FreeMusicApi2Utility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return FreeMusicApi2Utility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = FreeMusicApi2Spec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def v1_list(self):
        """Idiomatic facade: client.v1_list.list() / client.v1_list.load({"id": ...})."""
        from entity.v1_list_entity import V1ListEntity
        cached = getattr(self, "_v1_list", None)
        if cached is None:
            cached = V1ListEntity(self, None)
            self._v1_list = cached
        return cached

    def V1List(self, data=None):
        # Deprecated: use client.v1_list instead.
        from entity.v1_list_entity import V1ListEntity
        return V1ListEntity(self, data)


    @property
    def v1_lookup(self):
        """Idiomatic facade: client.v1_lookup.list() / client.v1_lookup.load({"id": ...})."""
        from entity.v1_lookup_entity import V1LookupEntity
        cached = getattr(self, "_v1_lookup", None)
        if cached is None:
            cached = V1LookupEntity(self, None)
            self._v1_lookup = cached
        return cached

    def V1Lookup(self, data=None):
        # Deprecated: use client.v1_lookup instead.
        from entity.v1_lookup_entity import V1LookupEntity
        return V1LookupEntity(self, data)


    @property
    def v1_search(self):
        """Idiomatic facade: client.v1_search.list() / client.v1_search.load({"id": ...})."""
        from entity.v1_search_entity import V1SearchEntity
        cached = getattr(self, "_v1_search", None)
        if cached is None:
            cached = V1SearchEntity(self, None)
            self._v1_search = cached
        return cached

    def V1Search(self, data=None):
        # Deprecated: use client.v1_search instead.
        from entity.v1_search_entity import V1SearchEntity
        return V1SearchEntity(self, data)


    @property
    def v2_list(self):
        """Idiomatic facade: client.v2_list.list() / client.v2_list.load({"id": ...})."""
        from entity.v2_list_entity import V2ListEntity
        cached = getattr(self, "_v2_list", None)
        if cached is None:
            cached = V2ListEntity(self, None)
            self._v2_list = cached
        return cached

    def V2List(self, data=None):
        # Deprecated: use client.v2_list instead.
        from entity.v2_list_entity import V2ListEntity
        return V2ListEntity(self, data)


    @property
    def v2_lookup(self):
        """Idiomatic facade: client.v2_lookup.list() / client.v2_lookup.load({"id": ...})."""
        from entity.v2_lookup_entity import V2LookupEntity
        cached = getattr(self, "_v2_lookup", None)
        if cached is None:
            cached = V2LookupEntity(self, None)
            self._v2_lookup = cached
        return cached

    def V2Lookup(self, data=None):
        # Deprecated: use client.v2_lookup instead.
        from entity.v2_lookup_entity import V2LookupEntity
        return V2LookupEntity(self, data)


    @property
    def v2_search(self):
        """Idiomatic facade: client.v2_search.list() / client.v2_search.load({"id": ...})."""
        from entity.v2_search_entity import V2SearchEntity
        cached = getattr(self, "_v2_search", None)
        if cached is None:
            cached = V2SearchEntity(self, None)
            self._v2_search = cached
        return cached

    def V2Search(self, data=None):
        # Deprecated: use client.v2_search instead.
        from entity.v2_search_entity import V2SearchEntity
        return V2SearchEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
