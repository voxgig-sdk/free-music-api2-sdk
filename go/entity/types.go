// Typed models for the FreeMusicApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/free-music-api2-sdk/go/core"
)

// V1List is the typed data model for the v1_list entity.
type V1List struct {
}

// V1ListListMatch is the typed request payload for V1List.ListTyped.
type V1ListListMatch struct {
	Country string `json:"country"`
	Format string `json:"format"`
	Type string `json:"type"`
}

// V1Lookup is the typed data model for the v1_lookup entity.
type V1Lookup struct {
}

// V1LookupListMatch is the typed request payload for V1Lookup.ListTyped.
type V1LookupListMatch struct {
	I string `json:"i"`
}

// V1Search is the typed data model for the v1_search entity.
type V1Search struct {
}

// V1SearchListMatch is the typed request payload for V1Search.ListTyped.
type V1SearchListMatch struct {
	S string `json:"s"`
	T *string `json:"t,omitempty"`
	A *string `json:"a,omitempty"`
}

// V2List is the typed data model for the v2_list entity.
type V2List struct {
}

// V2ListListMatch is the typed request payload for V2List.ListTyped.
type V2ListListMatch struct {
	ArtistId int `json:"artist_id"`
}

// V2Lookup is the typed data model for the v2_lookup entity.
type V2Lookup struct {
}

// V2LookupListMatch is the typed request payload for V2Lookup.ListTyped.
type V2LookupListMatch struct {
	AlbumId int `json:"album_id"`
}

// V2Search is the typed data model for the v2_search entity.
type V2Search struct {
}

// V2SearchListMatch is the typed request payload for V2Search.ListTyped.
type V2SearchListMatch struct {
	AlbumName string `json:"album_name"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
