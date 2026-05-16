package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewV1ListEntityFunc func(client *FreeMusicApi2SDK, entopts map[string]any) FreeMusicApi2Entity

var NewV1LookupEntityFunc func(client *FreeMusicApi2SDK, entopts map[string]any) FreeMusicApi2Entity

var NewV1SearchEntityFunc func(client *FreeMusicApi2SDK, entopts map[string]any) FreeMusicApi2Entity

var NewV2ListEntityFunc func(client *FreeMusicApi2SDK, entopts map[string]any) FreeMusicApi2Entity

var NewV2LookupEntityFunc func(client *FreeMusicApi2SDK, entopts map[string]any) FreeMusicApi2Entity

var NewV2SearchEntityFunc func(client *FreeMusicApi2SDK, entopts map[string]any) FreeMusicApi2Entity

