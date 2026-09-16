# FreeMusicApi2 SDK feature factory

from freemusicapi2_sdk.feature.base_feature import FreeMusicApi2BaseFeature
from freemusicapi2_sdk.feature.ratelimit_feature import FreeMusicApi2RatelimitFeature
from freemusicapi2_sdk.feature.retry_feature import FreeMusicApi2RetryFeature
from freemusicapi2_sdk.feature.test_feature import FreeMusicApi2TestFeature
from freemusicapi2_sdk.feature.timeout_feature import FreeMusicApi2TimeoutFeature


_FEATURES = {
    "base": lambda: FreeMusicApi2BaseFeature(),
    "ratelimit": lambda: FreeMusicApi2RatelimitFeature(),
    "retry": lambda: FreeMusicApi2RetryFeature(),
    "test": lambda: FreeMusicApi2TestFeature(),
    "timeout": lambda: FreeMusicApi2TimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
