# FreeMusicApi2 SDK utility: make_context

from projectname_sdk.core.context import FreeMusicApi2Context


def make_context_util(ctxmap, basectx):
    return FreeMusicApi2Context(ctxmap, basectx)
