# FreeMusicApi2 SDK feature factory

from feature.base_feature import FreeMusicApi2BaseFeature
from feature.test_feature import FreeMusicApi2TestFeature


def _make_feature(name):
    features = {
        "base": lambda: FreeMusicApi2BaseFeature(),
        "test": lambda: FreeMusicApi2TestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
