package voxgigfreemusicapi2sdk

import (
	"github.com/voxgig-sdk/free-music-api2-sdk/core"
	"github.com/voxgig-sdk/free-music-api2-sdk/entity"
	"github.com/voxgig-sdk/free-music-api2-sdk/feature"
	_ "github.com/voxgig-sdk/free-music-api2-sdk/utility"
)

// Type aliases preserve external API.
type FreeMusicApi2SDK = core.FreeMusicApi2SDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FreeMusicApi2Entity = core.FreeMusicApi2Entity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FreeMusicApi2Error = core.FreeMusicApi2Error

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewV1ListEntityFunc = func(client *core.FreeMusicApi2SDK, entopts map[string]any) core.FreeMusicApi2Entity {
		return entity.NewV1ListEntity(client, entopts)
	}
	core.NewV1LookupEntityFunc = func(client *core.FreeMusicApi2SDK, entopts map[string]any) core.FreeMusicApi2Entity {
		return entity.NewV1LookupEntity(client, entopts)
	}
	core.NewV1SearchEntityFunc = func(client *core.FreeMusicApi2SDK, entopts map[string]any) core.FreeMusicApi2Entity {
		return entity.NewV1SearchEntity(client, entopts)
	}
	core.NewV2ListEntityFunc = func(client *core.FreeMusicApi2SDK, entopts map[string]any) core.FreeMusicApi2Entity {
		return entity.NewV2ListEntity(client, entopts)
	}
	core.NewV2LookupEntityFunc = func(client *core.FreeMusicApi2SDK, entopts map[string]any) core.FreeMusicApi2Entity {
		return entity.NewV2LookupEntity(client, entopts)
	}
	core.NewV2SearchEntityFunc = func(client *core.FreeMusicApi2SDK, entopts map[string]any) core.FreeMusicApi2Entity {
		return entity.NewV2SearchEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFreeMusicApi2SDK = core.NewFreeMusicApi2SDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
