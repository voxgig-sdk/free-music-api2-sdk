# FreeMusicApi2 SDK exists test

import pytest
from freemusicapi2_sdk import FreeMusicApi2SDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FreeMusicApi2SDK.test(None, None)
        assert testsdk is not None
