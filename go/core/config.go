package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "FreeMusicApi2",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://www.theaudiodb.com/api/v1/json/123",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"v1_list": map[string]any{},
				"v1_lookup": map[string]any{},
				"v1_search": map[string]any{},
				"v2_list": map[string]any{},
				"v2_lookup": map[string]any{},
				"v2_search": map[string]any{},
			},
		},
		"entity": map[string]any{
			"v1_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "idAlbum",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idArtist",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idIMVDB",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idLyric",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idTrack",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intCD",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intDuration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intLoved",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidComments",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidDislikes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidFavorites",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidLikes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidViews",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScore",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScoreVotes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalListeners",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalPlays",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTrackNumber",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "loved",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "strAlbum",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtist",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistAlternate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDescriptionEN",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGenre",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLocked",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMood",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzAlbumID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzArtistID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVid",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidCompany",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidDirector",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen1",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen3",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strStyle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTheme",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrack",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackLyrics",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackThumb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "trending",
						"type": "`$ARRAY`",
					},
				},
				"name": "v1_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "us",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "albums",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "itunes",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/trending.php",
								"parts": []any{
									"trending.php",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"format",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.trending`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "track",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/mostloved.php",
								"parts": []any{
									"mostloved.php",
								},
								"select": map[string]any{
									"exist": []any{
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.loved`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
											"kind": "query",
											"name": "i",
											"orig": "i",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/mvid-mb.php",
								"parts": []any{
									"mvid-mb.php",
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.mvids`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 112024,
											"kind": "query",
											"name": "i",
											"orig": "i",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/mvid.php",
								"parts": []any{
									"mvid.php",
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.mvids`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
											"kind": "query",
											"name": "s",
											"orig": "s",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/track-top10-mb.php",
								"parts": []any{
									"track-top10-mb.php",
								},
								"select": map[string]any{
									"exist": []any{
										"s",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.track`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "coldplay",
											"kind": "query",
											"name": "s",
											"orig": "s",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/track-top10.php",
								"parts": []any{
									"track-top10.php",
								},
								"select": map[string]any{
									"exist": []any{
										"s",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.track`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"v1_lookup": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "idAlbum",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idArtist",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idIMVDB",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idLabel",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idLyric",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idTrack",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intBornYear",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intCD",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intCharted",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intDiedYear",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intDuration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intFormedYear",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intLoved",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMembers",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidComments",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidDislikes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidFavorites",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidLikes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidViews",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intSales",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScore",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScoreVotes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalListeners",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalPlays",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTrackNumber",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intYearReleased",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "strAlbum",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DCase",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DFace",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DFlat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DThumb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumCDart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumSpine",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumStripped",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumbBack",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumbHQ",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAllMusicID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAmazonID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAppleMusic",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtist",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistAlternate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistBanner",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistClearart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistCutout",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart3",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart4",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistLogo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistStripped",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistThumb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistWideThumb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBBCReviewID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyCN",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyDE",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyEN",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyES",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyFR",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyHU",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyIL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyIT",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyJP",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyNL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyNO",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyPL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyPT",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyRU",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographySE",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strCountry",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strCountryCode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDescriptionEN",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDisbanded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDiscogsID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strFacebook",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGender",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGeniusID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGenre",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strInstagram",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strItunesID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLabel",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLastFMChart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLocation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLocked",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLyricWikiID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMood",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzAlbumID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzArtistID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicMozID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVid",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidCompany",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidDirector",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen1",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen3",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strRateYourMusicID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strReleaseFormat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strReview",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strSoundCloud",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strSpeed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strSpotify",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strStyle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTheme",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrack",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackLyrics",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackThumb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTwitter",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWebsite",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWikidataID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWikipediaID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strYoutube",
						"type": "`$STRING`",
					},
				},
				"name": "v1_lookup",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 32793500,
											"kind": "query",
											"name": "h",
											"orig": "h",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 2115888,
											"kind": "query",
											"name": "m",
											"orig": "m",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/track.php",
								"parts": []any{
									"track.php",
								},
								"select": map[string]any{
									"exist": []any{
										"h",
										"m",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.track`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 112024,
											"kind": "query",
											"name": "i",
											"orig": "i",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 2115888,
											"kind": "query",
											"name": "m",
											"orig": "m",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/album.php",
								"parts": []any{
									"album.php",
								},
								"select": map[string]any{
									"exist": []any{
										"i",
										"m",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.album`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "1dc4c347-a1db-32aa-b14f-bc9cc507b843",
											"kind": "query",
											"name": "i",
											"orig": "i",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/album-mb.php",
								"parts": []any{
									"album-mb.php",
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.album`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
											"kind": "query",
											"name": "i",
											"orig": "i",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/artist-mb.php",
								"parts": []any{
									"artist-mb.php",
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.artists`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 112024,
											"kind": "query",
											"name": "i",
											"orig": "i",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/artist-social.php",
								"parts": []any{
									"artist-social.php",
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.artists`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 112024,
											"kind": "query",
											"name": "i",
											"orig": "i",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/artist.php",
								"parts": []any{
									"artist.php",
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.artists`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "50369905-68ca-48d2-912d-b37330ff7dc3",
											"kind": "query",
											"name": "i",
											"orig": "i",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/track-mb.php",
								"parts": []any{
									"track-mb.php",
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.track`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"v1_search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "idAlbum",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idArtist",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idIMVDB",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idLabel",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idLyric",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idTrack",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intBornYear",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intCD",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intCharted",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intDiedYear",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intDuration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intFormedYear",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intLoved",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMembers",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidComments",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidDislikes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidFavorites",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidLikes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidViews",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intSales",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScore",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScoreVotes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalListeners",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalPlays",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTrackNumber",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intYearReleased",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "strAlbum",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DCase",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DFace",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DFlat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DThumb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumCDart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumSpine",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumStripped",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumbBack",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumbHQ",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAllMusicID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAmazonID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtist",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistAlternate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistBanner",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistClearart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistCutout",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart3",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart4",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistLogo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistStripped",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistThumb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistWideThumb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBBCReviewID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyCN",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyDE",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyEN",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyES",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyFR",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyHU",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyIL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyIT",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyJP",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyNL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyNO",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyPL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyPT",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyRU",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographySE",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strCountry",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strCountryCode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDescriptionEN",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDisbanded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDiscogsID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strFacebook",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGender",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGeniusID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGenre",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strItunesID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLabel",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLastFMChart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLocation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLocked",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLyricWikiID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMood",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzAlbumID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzArtistID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicMozID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVid",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidCompany",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidDirector",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen1",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen3",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strRateYourMusicID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strReleaseFormat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strReview",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strSpeed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strStyle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTheme",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrack",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackLyrics",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackThumb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTwitter",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWebsite",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWikidataID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWikipediaID",
						"type": "`$STRING`",
					},
				},
				"name": "v1_search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "Homework",
											"kind": "query",
											"name": "a",
											"orig": "a",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "daft_punk",
											"kind": "query",
											"name": "s",
											"orig": "s",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/searchalbum.php",
								"parts": []any{
									"searchalbum.php",
								},
								"select": map[string]any{
									"exist": []any{
										"a",
										"s",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.album`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "coldplay",
											"kind": "query",
											"name": "s",
											"orig": "s",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "yellow",
											"kind": "query",
											"name": "t",
											"orig": "t",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/searchtrack.php",
								"parts": []any{
									"searchtrack.php",
								},
								"select": map[string]any{
									"exist": []any{
										"s",
										"t",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.track`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "s",
											"orig": "s",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/discography-mb.php",
								"parts": []any{
									"discography-mb.php",
								},
								"select": map[string]any{
									"exist": []any{
										"s",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.album`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "coldplay",
											"kind": "query",
											"name": "s",
											"orig": "s",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/discography.php",
								"parts": []any{
									"discography.php",
								},
								"select": map[string]any{
									"exist": []any{
										"s",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.album`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "coldplay",
											"kind": "query",
											"name": "s",
											"orig": "s",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search.php",
								"parts": []any{
									"search.php",
								},
								"select": map[string]any{
									"exist": []any{
										"s",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.artists`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"v2_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "albums",
						"type": "`$ARRAY`",
					},
				},
				"name": "v2_list",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 111239,
											"kind": "param",
											"name": "artist_id",
											"orig": "artist_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/list/discography/{artistId}",
								"parts": []any{
									"list",
									"discography",
									"{artist_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artistId": "artist_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artist_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"discography",
						},
					},
				},
			},
			"v2_lookup": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "albums",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "artists",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tracks",
						"type": "`$ARRAY`",
					},
				},
				"name": "v2_lookup",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 2109615,
											"kind": "param",
											"name": "album_id",
											"orig": "album_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/album/{albumId}",
								"parts": []any{
									"lookup",
									"album",
									"{album_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"albumId": "album_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"album_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 111239,
											"kind": "param",
											"name": "artist_id",
											"orig": "artist_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/artist/{artistId}",
								"parts": []any{
									"lookup",
									"artist",
									"{artist_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artistId": "artist_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artist_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "1dc4c347-a1db-32aa-b14f-bc9cc507b843",
											"kind": "param",
											"name": "music_brainz_id",
											"orig": "music_brainz_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/album_mb/{musicBrainzId}",
								"parts": []any{
									"lookup",
									"album_mb",
									"{music_brainz_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"musicBrainzId": "music_brainz_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"music_brainz_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
											"kind": "param",
											"name": "music_brainz_id",
											"orig": "music_brainz_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/artist_mb/{musicBrainzId}",
								"parts": []any{
									"lookup",
									"artist_mb",
									"{music_brainz_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"musicBrainzId": "music_brainz_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"music_brainz_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "50369905-68ca-48d2-912d-b37330ff7dc3",
											"kind": "param",
											"name": "music_brainz_id",
											"orig": "music_brainz_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/track_mb/{musicBrainzId}",
								"parts": []any{
									"lookup",
									"track_mb",
									"{music_brainz_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"musicBrainzId": "music_brainz_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"music_brainz_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 32724183,
											"kind": "param",
											"name": "track_id",
											"orig": "track_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/track/{trackId}",
								"parts": []any{
									"lookup",
									"track",
									"{track_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"trackId": "track_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"track_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"album",
						},
						[]any{
							"album_mb",
						},
						[]any{
							"artist",
						},
						[]any{
							"artist_mb",
						},
						[]any{
							"track",
						},
						[]any{
							"track_mb",
						},
					},
				},
			},
			"v2_search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "albums",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "artists",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tracks",
						"type": "`$ARRAY`",
					},
				},
				"name": "v2_search",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "parachutes",
											"kind": "param",
											"name": "album_name",
											"orig": "album_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search/album/{albumName}",
								"parts": []any{
									"search",
									"album",
									"{album_name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"albumName": "album_name",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"album_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "coldplay",
											"kind": "param",
											"name": "artist_name",
											"orig": "artist_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search/artist/{artistName}",
								"parts": []any{
									"search",
									"artist",
									"{artist_name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artistName": "artist_name",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artist_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "yellow",
											"kind": "param",
											"name": "track_name",
											"orig": "track_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search/track/{trackName}",
								"parts": []any{
									"search",
									"track",
									"{track_name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"trackName": "track_name",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"track_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"album",
						},
						[]any{
							"artist",
						},
						[]any{
							"track",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
