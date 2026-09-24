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
			"slug": "free-music-api2",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://www.theaudiodb.com/api/v1/json/123",
			"auth": map[string]any{
				"prefix": "",
				"name": "X-API-KEY",
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
						"title": "Id Album",
						"type": "`$INTEGER`",
						"short": "Album ID",
					},
					map[string]any{
						"name": "idArtist",
						"title": "Id Artist",
						"type": "`$INTEGER`",
						"short": "Artist ID",
					},
					map[string]any{
						"name": "idIMVDB",
						"title": "Id Imvdb",
						"type": "`$INTEGER`",
						"short": "IMVDB ID",
					},
					map[string]any{
						"name": "idLyric",
						"title": "Id Lyric",
						"type": "`$INTEGER`",
						"short": "Lyrics ID",
					},
					map[string]any{
						"name": "idTrack",
						"title": "Id Track",
						"type": "`$INTEGER`",
						"short": "Track ID",
					},
					map[string]any{
						"name": "intCD",
						"title": "Int Cd",
						"type": "`$INTEGER`",
						"short": "CD number",
					},
					map[string]any{
						"name": "intDuration",
						"title": "Int Duration",
						"type": "`$INTEGER`",
						"short": "Track duration in milliseconds",
					},
					map[string]any{
						"name": "intLoved",
						"title": "Int Loved",
						"type": "`$INTEGER`",
						"short": "Number of loves/likes",
					},
					map[string]any{
						"name": "intMusicVidComments",
						"title": "Int Music Vid Comments",
						"type": "`$INTEGER`",
						"short": "Number of music video comments",
					},
					map[string]any{
						"name": "intMusicVidDislikes",
						"title": "Int Music Vid Dislikes",
						"type": "`$INTEGER`",
						"short": "Number of music video dislikes",
					},
					map[string]any{
						"name": "intMusicVidFavorites",
						"title": "Int Music Vid Favorites",
						"type": "`$INTEGER`",
						"short": "Number of music video favorites",
					},
					map[string]any{
						"name": "intMusicVidLikes",
						"title": "Int Music Vid Likes",
						"type": "`$INTEGER`",
						"short": "Number of music video likes",
					},
					map[string]any{
						"name": "intMusicVidViews",
						"title": "Int Music Vid Views",
						"type": "`$INTEGER`",
						"short": "Number of music video views",
					},
					map[string]any{
						"name": "intScore",
						"title": "Int Score",
						"type": "`$INTEGER`",
						"short": "Track score",
					},
					map[string]any{
						"name": "intScoreVotes",
						"title": "Int Score Votes",
						"type": "`$INTEGER`",
						"short": "Number of score votes",
					},
					map[string]any{
						"name": "intTotalListeners",
						"title": "Int Total Listeners",
						"type": "`$INTEGER`",
						"short": "Total number of listeners",
					},
					map[string]any{
						"name": "intTotalPlays",
						"title": "Int Total Plays",
						"type": "`$INTEGER`",
						"short": "Total number of plays",
					},
					map[string]any{
						"name": "intTrackNumber",
						"title": "Int Track Number",
						"type": "`$INTEGER`",
						"short": "Track number on album",
					},
					map[string]any{
						"name": "loved",
						"title": "Loved",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "strAlbum",
						"title": "Str Album",
						"type": "`$STRING`",
						"short": "Album title",
					},
					map[string]any{
						"name": "strArtist",
						"title": "Str Artist",
						"type": "`$STRING`",
						"short": "Artist name",
					},
					map[string]any{
						"name": "strArtistAlternate",
						"title": "Str Artist Alternate",
						"type": "`$STRING`",
						"short": "Alternate artist name",
					},
					map[string]any{
						"name": "strDescriptionEN",
						"title": "Str Description En",
						"type": "`$STRING`",
						"short": "Video description in English",
					},
					map[string]any{
						"name": "strGenre",
						"title": "Str Genre",
						"type": "`$STRING`",
						"short": "Track genre",
					},
					map[string]any{
						"name": "strLocked",
						"title": "Str Locked",
						"type": "`$STRING`",
						"short": "Whether the record is locked",
					},
					map[string]any{
						"name": "strMood",
						"title": "Str Mood",
						"type": "`$STRING`",
						"short": "Track mood",
					},
					map[string]any{
						"name": "strMusicBrainzAlbumID",
						"title": "Str Music Brainz Album Id",
						"type": "`$STRING`",
						"short": "MusicBrainz Album ID",
					},
					map[string]any{
						"name": "strMusicBrainzArtistID",
						"title": "Str Music Brainz Artist Id",
						"type": "`$STRING`",
						"short": "MusicBrainz Artist ID",
					},
					map[string]any{
						"name": "strMusicBrainzID",
						"title": "Str Music Brainz Id",
						"type": "`$STRING`",
						"short": "MusicBrainz Recording ID",
					},
					map[string]any{
						"name": "strMusicVid",
						"title": "Str Music Vid",
						"type": "`$STRING`",
						"short": "URL to music video",
					},
					map[string]any{
						"name": "strMusicVidCompany",
						"title": "Str Music Vid Company",
						"type": "`$STRING`",
						"short": "Music video production company",
					},
					map[string]any{
						"name": "strMusicVidDirector",
						"title": "Str Music Vid Director",
						"type": "`$STRING`",
						"short": "Music video director",
					},
					map[string]any{
						"name": "strMusicVidScreen1",
						"title": "Str Music Vid Screen1",
						"type": "`$STRING`",
						"short": "URL to music video screenshot 1",
					},
					map[string]any{
						"name": "strMusicVidScreen2",
						"title": "Str Music Vid Screen2",
						"type": "`$STRING`",
						"short": "URL to music video screenshot 2",
					},
					map[string]any{
						"name": "strMusicVidScreen3",
						"title": "Str Music Vid Screen3",
						"type": "`$STRING`",
						"short": "URL to music video screenshot 3",
					},
					map[string]any{
						"name": "strStyle",
						"title": "Str Style",
						"type": "`$STRING`",
						"short": "Track style",
					},
					map[string]any{
						"name": "strTheme",
						"title": "Str Theme",
						"type": "`$STRING`",
						"short": "Track theme",
					},
					map[string]any{
						"name": "strTrack",
						"title": "Str Track",
						"type": "`$STRING`",
						"short": "Track title",
					},
					map[string]any{
						"name": "strTrackLyrics",
						"title": "Str Track Lyrics",
						"type": "`$STRING`",
						"short": "Track lyrics",
					},
					map[string]any{
						"name": "strTrackThumb",
						"title": "Str Track Thumb",
						"type": "`$STRING`",
						"short": "URL to track thumbnail",
					},
					map[string]any{
						"name": "trending",
						"title": "Trending",
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
								"kind": "http",
								"method": "GET",
								"orig": "/trending.php",
								"segments": []any{
									map[string]any{
										"lit": "trending.php",
									},
								},
								"parts": []any{
									"trending.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.trending`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "us",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "albums",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "itunes",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"format",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mostloved.php",
								"segments": []any{
									map[string]any{
										"lit": "mostloved.php",
									},
								},
								"parts": []any{
									"mostloved.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.loved`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "track",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mvid-mb.php",
								"segments": []any{
									map[string]any{
										"lit": "mvid-mb.php",
									},
								},
								"parts": []any{
									"mvid-mb.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.mvids`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "i",
											"orig": "i",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mvid.php",
								"segments": []any{
									map[string]any{
										"lit": "mvid.php",
									},
								},
								"parts": []any{
									"mvid.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.mvids`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "i",
											"orig": "i",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 112024,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/track-top10-mb.php",
								"segments": []any{
									map[string]any{
										"lit": "track-top10-mb.php",
									},
								},
								"parts": []any{
									"track-top10-mb.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.track`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "s",
											"orig": "s",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"s",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/track-top10.php",
								"segments": []any{
									map[string]any{
										"lit": "track-top10.php",
									},
								},
								"parts": []any{
									"track-top10.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.track`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "s",
											"orig": "s",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "coldplay",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"s",
									},
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
						"title": "Id Album",
						"type": "`$INTEGER`",
						"short": "Album ID",
					},
					map[string]any{
						"name": "idArtist",
						"title": "Id Artist",
						"type": "`$INTEGER`",
						"short": "Artist ID",
					},
					map[string]any{
						"name": "idIMVDB",
						"title": "Id Imvdb",
						"type": "`$INTEGER`",
						"short": "IMVDB ID",
					},
					map[string]any{
						"name": "idLabel",
						"title": "Id Label",
						"type": "`$INTEGER`",
						"short": "Label ID",
					},
					map[string]any{
						"name": "idLyric",
						"title": "Id Lyric",
						"type": "`$INTEGER`",
						"short": "Lyrics ID",
					},
					map[string]any{
						"name": "idTrack",
						"title": "Id Track",
						"type": "`$INTEGER`",
						"short": "Unique track ID",
					},
					map[string]any{
						"name": "intBornYear",
						"title": "Int Born Year",
						"type": "`$INTEGER`",
						"short": "Birth year of the artist",
					},
					map[string]any{
						"name": "intCD",
						"title": "Int Cd",
						"type": "`$INTEGER`",
						"short": "CD number",
					},
					map[string]any{
						"name": "intCharted",
						"title": "Int Charted",
						"type": "`$INTEGER`",
						"short": "Chart position",
					},
					map[string]any{
						"name": "intDiedYear",
						"title": "Int Died Year",
						"type": "`$INTEGER`",
						"short": "Year the artist died (if applicable)",
					},
					map[string]any{
						"name": "intDuration",
						"title": "Int Duration",
						"type": "`$INTEGER`",
						"short": "Track duration in milliseconds",
					},
					map[string]any{
						"name": "intFormedYear",
						"title": "Int Formed Year",
						"type": "`$INTEGER`",
						"short": "Year the artist/band was formed",
					},
					map[string]any{
						"name": "intLoved",
						"title": "Int Loved",
						"type": "`$INTEGER`",
						"short": "Number of loves/likes",
					},
					map[string]any{
						"name": "intMembers",
						"title": "Int Members",
						"type": "`$INTEGER`",
						"short": "Number of band members",
					},
					map[string]any{
						"name": "intMusicVidComments",
						"title": "Int Music Vid Comments",
						"type": "`$INTEGER`",
						"short": "Number of music video comments",
					},
					map[string]any{
						"name": "intMusicVidDislikes",
						"title": "Int Music Vid Dislikes",
						"type": "`$INTEGER`",
						"short": "Number of music video dislikes",
					},
					map[string]any{
						"name": "intMusicVidFavorites",
						"title": "Int Music Vid Favorites",
						"type": "`$INTEGER`",
						"short": "Number of music video favorites",
					},
					map[string]any{
						"name": "intMusicVidLikes",
						"title": "Int Music Vid Likes",
						"type": "`$INTEGER`",
						"short": "Number of music video likes",
					},
					map[string]any{
						"name": "intMusicVidViews",
						"title": "Int Music Vid Views",
						"type": "`$INTEGER`",
						"short": "Number of music video views",
					},
					map[string]any{
						"name": "intSales",
						"title": "Int Sales",
						"type": "`$INTEGER`",
						"short": "Number of sales",
					},
					map[string]any{
						"name": "intScore",
						"title": "Int Score",
						"type": "`$INTEGER`",
						"short": "Track score",
					},
					map[string]any{
						"name": "intScoreVotes",
						"title": "Int Score Votes",
						"type": "`$INTEGER`",
						"short": "Number of score votes",
					},
					map[string]any{
						"name": "intTotalListeners",
						"title": "Int Total Listeners",
						"type": "`$INTEGER`",
						"short": "Total number of listeners",
					},
					map[string]any{
						"name": "intTotalPlays",
						"title": "Int Total Plays",
						"type": "`$INTEGER`",
						"short": "Total number of plays",
					},
					map[string]any{
						"name": "intTrackNumber",
						"title": "Int Track Number",
						"type": "`$INTEGER`",
						"short": "Track number on album",
					},
					map[string]any{
						"name": "intYearReleased",
						"title": "Int Year Released",
						"type": "`$INTEGER`",
						"short": "Year the album was released",
					},
					map[string]any{
						"name": "strAlbum",
						"title": "Str Album",
						"type": "`$STRING`",
						"short": "Album title",
					},
					map[string]any{
						"name": "strAlbum3DCase",
						"title": "Str Album3 D Case",
						"type": "`$STRING`",
						"short": "URL to 3D case image",
					},
					map[string]any{
						"name": "strAlbum3DFace",
						"title": "Str Album3 D Face",
						"type": "`$STRING`",
						"short": "URL to 3D face image",
					},
					map[string]any{
						"name": "strAlbum3DFlat",
						"title": "Str Album3 D Flat",
						"type": "`$STRING`",
						"short": "URL to 3D flat image",
					},
					map[string]any{
						"name": "strAlbum3DThumb",
						"title": "Str Album3 D Thumb",
						"type": "`$STRING`",
						"short": "URL to 3D thumbnail",
					},
					map[string]any{
						"name": "strAlbumCDart",
						"title": "Str Album C Dart",
						"type": "`$STRING`",
						"short": "URL to CD art",
					},
					map[string]any{
						"name": "strAlbumSpine",
						"title": "Str Album Spine",
						"type": "`$STRING`",
						"short": "URL to album spine image",
					},
					map[string]any{
						"name": "strAlbumStripped",
						"title": "Str Album Stripped",
						"type": "`$STRING`",
						"short": "Album title without special characters",
					},
					map[string]any{
						"name": "strAlbumThumb",
						"title": "Str Album Thumb",
						"type": "`$STRING`",
						"short": "URL to album thumbnail",
					},
					map[string]any{
						"name": "strAlbumThumbBack",
						"title": "Str Album Thumb Back",
						"type": "`$STRING`",
						"short": "URL to back of album cover",
					},
					map[string]any{
						"name": "strAlbumThumbHQ",
						"title": "Str Album Thumb Hq",
						"type": "`$STRING`",
						"short": "URL to high quality album thumbnail",
					},
					map[string]any{
						"name": "strAllMusicID",
						"title": "Str All Music Id",
						"type": "`$STRING`",
						"short": "AllMusic ID",
					},
					map[string]any{
						"name": "strAmazonID",
						"title": "Str Amazon Id",
						"type": "`$STRING`",
						"short": "Amazon ID",
					},
					map[string]any{
						"name": "strAppleMusic",
						"title": "Str Apple Music",
						"type": "`$STRING`",
						"short": "Apple Music artist URL",
					},
					map[string]any{
						"name": "strArtist",
						"title": "Str Artist",
						"type": "`$STRING`",
						"short": "Artist name",
					},
					map[string]any{
						"name": "strArtistAlternate",
						"title": "Str Artist Alternate",
						"type": "`$STRING`",
						"short": "Alternate artist name",
					},
					map[string]any{
						"name": "strArtistBanner",
						"title": "Str Artist Banner",
						"type": "`$STRING`",
						"short": "URL to artist banner",
					},
					map[string]any{
						"name": "strArtistClearart",
						"title": "Str Artist Clearart",
						"type": "`$STRING`",
						"short": "URL to artist clearart",
					},
					map[string]any{
						"name": "strArtistCutout",
						"title": "Str Artist Cutout",
						"type": "`$STRING`",
						"short": "URL to artist cutout image",
					},
					map[string]any{
						"name": "strArtistFanart",
						"title": "Str Artist Fanart",
						"type": "`$STRING`",
						"short": "URL to artist fanart",
					},
					map[string]any{
						"name": "strArtistFanart2",
						"title": "Str Artist Fanart2",
						"type": "`$STRING`",
						"short": "URL to alternate artist fanart",
					},
					map[string]any{
						"name": "strArtistFanart3",
						"title": "Str Artist Fanart3",
						"type": "`$STRING`",
						"short": "URL to third artist fanart",
					},
					map[string]any{
						"name": "strArtistFanart4",
						"title": "Str Artist Fanart4",
						"type": "`$STRING`",
						"short": "URL to fourth artist fanart",
					},
					map[string]any{
						"name": "strArtistLogo",
						"title": "Str Artist Logo",
						"type": "`$STRING`",
						"short": "URL to artist logo",
					},
					map[string]any{
						"name": "strArtistStripped",
						"title": "Str Artist Stripped",
						"type": "`$STRING`",
						"short": "Artist name without special characters",
					},
					map[string]any{
						"name": "strArtistThumb",
						"title": "Str Artist Thumb",
						"type": "`$STRING`",
						"short": "URL to artist thumbnail image",
					},
					map[string]any{
						"name": "strArtistWideThumb",
						"title": "Str Artist Wide Thumb",
						"type": "`$STRING`",
						"short": "URL to artist wide thumbnail",
					},
					map[string]any{
						"name": "strBBCReviewID",
						"title": "Str Bbc Review Id",
						"type": "`$STRING`",
						"short": "BBC Review ID",
					},
					map[string]any{
						"name": "strBiographyCN",
						"title": "Str Biography Cn",
						"type": "`$STRING`",
						"short": "Artist biography in Chinese",
					},
					map[string]any{
						"name": "strBiographyDE",
						"title": "Str Biography De",
						"type": "`$STRING`",
						"short": "Artist biography in German",
					},
					map[string]any{
						"name": "strBiographyEN",
						"title": "Str Biography En",
						"type": "`$STRING`",
						"short": "Artist biography in English",
					},
					map[string]any{
						"name": "strBiographyES",
						"title": "Str Biography Es",
						"type": "`$STRING`",
						"short": "Artist biography in Spanish",
					},
					map[string]any{
						"name": "strBiographyFR",
						"title": "Str Biography Fr",
						"type": "`$STRING`",
						"short": "Artist biography in French",
					},
					map[string]any{
						"name": "strBiographyHU",
						"title": "Str Biography Hu",
						"type": "`$STRING`",
						"short": "Artist biography in Hungarian",
					},
					map[string]any{
						"name": "strBiographyIL",
						"title": "Str Biography Il",
						"type": "`$STRING`",
						"short": "Artist biography in Hebrew",
					},
					map[string]any{
						"name": "strBiographyIT",
						"title": "Str Biography It",
						"type": "`$STRING`",
						"short": "Artist biography in Italian",
					},
					map[string]any{
						"name": "strBiographyJP",
						"title": "Str Biography Jp",
						"type": "`$STRING`",
						"short": "Artist biography in Japanese",
					},
					map[string]any{
						"name": "strBiographyNL",
						"title": "Str Biography Nl",
						"type": "`$STRING`",
						"short": "Artist biography in Dutch",
					},
					map[string]any{
						"name": "strBiographyNO",
						"title": "Str Biography No",
						"type": "`$STRING`",
						"short": "Artist biography in Norwegian",
					},
					map[string]any{
						"name": "strBiographyPL",
						"title": "Str Biography Pl",
						"type": "`$STRING`",
						"short": "Artist biography in Polish",
					},
					map[string]any{
						"name": "strBiographyPT",
						"title": "Str Biography Pt",
						"type": "`$STRING`",
						"short": "Artist biography in Portuguese",
					},
					map[string]any{
						"name": "strBiographyRU",
						"title": "Str Biography Ru",
						"type": "`$STRING`",
						"short": "Artist biography in Russian",
					},
					map[string]any{
						"name": "strBiographySE",
						"title": "Str Biography Se",
						"type": "`$STRING`",
						"short": "Artist biography in Swedish",
					},
					map[string]any{
						"name": "strCountry",
						"title": "Str Country",
						"type": "`$STRING`",
						"short": "Country of origin",
					},
					map[string]any{
						"name": "strCountryCode",
						"title": "Str Country Code",
						"type": "`$STRING`",
						"short": "Country code",
					},
					map[string]any{
						"name": "strDescriptionEN",
						"title": "Str Description En",
						"type": "`$STRING`",
						"short": "Track description in English",
					},
					map[string]any{
						"name": "strDisbanded",
						"title": "Str Disbanded",
						"type": "`$STRING`",
						"short": "Disbanded status",
					},
					map[string]any{
						"name": "strDiscogsID",
						"title": "Str Discogs Id",
						"type": "`$STRING`",
						"short": "Discogs ID",
					},
					map[string]any{
						"name": "strFacebook",
						"title": "Str Facebook",
						"type": "`$STRING`",
						"short": "Facebook page URL",
					},
					map[string]any{
						"name": "strGender",
						"title": "Str Gender",
						"type": "`$STRING`",
						"short": "Artist gender",
					},
					map[string]any{
						"name": "strGeniusID",
						"title": "Str Genius Id",
						"type": "`$STRING`",
						"short": "Genius ID",
					},
					map[string]any{
						"name": "strGenre",
						"title": "Str Genre",
						"type": "`$STRING`",
						"short": "Track genre",
					},
					map[string]any{
						"name": "strInstagram",
						"title": "Str Instagram",
						"type": "`$STRING`",
						"short": "Instagram profile URL",
					},
					map[string]any{
						"name": "strItunesID",
						"title": "Str Itunes Id",
						"type": "`$STRING`",
						"short": "iTunes ID",
					},
					map[string]any{
						"name": "strLabel",
						"title": "Str Label",
						"type": "`$STRING`",
						"short": "Record label",
					},
					map[string]any{
						"name": "strLastFMChart",
						"title": "Str Last Fm Chart",
						"type": "`$STRING`",
						"short": "Last.fm chart URL",
					},
					map[string]any{
						"name": "strLocation",
						"title": "Str Location",
						"type": "`$STRING`",
						"short": "Recording location",
					},
					map[string]any{
						"name": "strLocked",
						"title": "Str Locked",
						"type": "`$STRING`",
						"short": "Whether the record is locked",
					},
					map[string]any{
						"name": "strLyricWikiID",
						"title": "Str Lyric Wiki Id",
						"type": "`$STRING`",
						"short": "LyricWiki ID",
					},
					map[string]any{
						"name": "strMood",
						"title": "Str Mood",
						"type": "`$STRING`",
						"short": "Track mood",
					},
					map[string]any{
						"name": "strMusicBrainzAlbumID",
						"title": "Str Music Brainz Album Id",
						"type": "`$STRING`",
						"short": "MusicBrainz Album ID",
					},
					map[string]any{
						"name": "strMusicBrainzArtistID",
						"title": "Str Music Brainz Artist Id",
						"type": "`$STRING`",
						"short": "MusicBrainz Artist ID",
					},
					map[string]any{
						"name": "strMusicBrainzID",
						"title": "Str Music Brainz Id",
						"type": "`$STRING`",
						"short": "MusicBrainz Recording ID",
					},
					map[string]any{
						"name": "strMusicMozID",
						"title": "Str Music Moz Id",
						"type": "`$STRING`",
						"short": "MusicMoz ID",
					},
					map[string]any{
						"name": "strMusicVid",
						"title": "Str Music Vid",
						"type": "`$STRING`",
						"short": "URL to music video",
					},
					map[string]any{
						"name": "strMusicVidCompany",
						"title": "Str Music Vid Company",
						"type": "`$STRING`",
						"short": "Music video production company",
					},
					map[string]any{
						"name": "strMusicVidDirector",
						"title": "Str Music Vid Director",
						"type": "`$STRING`",
						"short": "Music video director",
					},
					map[string]any{
						"name": "strMusicVidScreen1",
						"title": "Str Music Vid Screen1",
						"type": "`$STRING`",
						"short": "URL to music video screenshot 1",
					},
					map[string]any{
						"name": "strMusicVidScreen2",
						"title": "Str Music Vid Screen2",
						"type": "`$STRING`",
						"short": "URL to music video screenshot 2",
					},
					map[string]any{
						"name": "strMusicVidScreen3",
						"title": "Str Music Vid Screen3",
						"type": "`$STRING`",
						"short": "URL to music video screenshot 3",
					},
					map[string]any{
						"name": "strRateYourMusicID",
						"title": "Str Rate Your Music Id",
						"type": "`$STRING`",
						"short": "RateYourMusic ID",
					},
					map[string]any{
						"name": "strReleaseFormat",
						"title": "Str Release Format",
						"type": "`$STRING`",
						"short": "Release format (CD, Vinyl, etc.)",
					},
					map[string]any{
						"name": "strReview",
						"title": "Str Review",
						"type": "`$STRING`",
						"short": "Album review",
					},
					map[string]any{
						"name": "strSoundCloud",
						"title": "Str Sound Cloud",
						"type": "`$STRING`",
						"short": "SoundCloud profile URL",
					},
					map[string]any{
						"name": "strSpeed",
						"title": "Str Speed",
						"type": "`$STRING`",
						"short": "Album speed",
					},
					map[string]any{
						"name": "strSpotify",
						"title": "Str Spotify",
						"type": "`$STRING`",
						"short": "Spotify artist URL",
					},
					map[string]any{
						"name": "strStyle",
						"title": "Str Style",
						"type": "`$STRING`",
						"short": "Track style",
					},
					map[string]any{
						"name": "strTheme",
						"title": "Str Theme",
						"type": "`$STRING`",
						"short": "Track theme",
					},
					map[string]any{
						"name": "strTrack",
						"title": "Str Track",
						"type": "`$STRING`",
						"short": "Track title",
					},
					map[string]any{
						"name": "strTrackLyrics",
						"title": "Str Track Lyrics",
						"type": "`$STRING`",
						"short": "Track lyrics",
					},
					map[string]any{
						"name": "strTrackThumb",
						"title": "Str Track Thumb",
						"type": "`$STRING`",
						"short": "URL to track thumbnail",
					},
					map[string]any{
						"name": "strTwitter",
						"title": "Str Twitter",
						"type": "`$STRING`",
						"short": "Twitter profile URL",
					},
					map[string]any{
						"name": "strWebsite",
						"title": "Str Website",
						"type": "`$STRING`",
						"short": "Official website URL",
					},
					map[string]any{
						"name": "strWikidataID",
						"title": "Str Wikidata Id",
						"type": "`$STRING`",
						"short": "Wikidata ID",
					},
					map[string]any{
						"name": "strWikipediaID",
						"title": "Str Wikipedia Id",
						"type": "`$STRING`",
						"short": "Wikipedia ID",
					},
					map[string]any{
						"name": "strYoutube",
						"title": "Str Youtube",
						"type": "`$STRING`",
						"short": "YouTube channel URL",
					},
				},
				"name": "v1_lookup",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/track.php",
								"segments": []any{
									map[string]any{
										"lit": "track.php",
									},
								},
								"parts": []any{
									"track.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.track`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "h",
											"orig": "h",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 32793500,
										},
										map[string]any{
											"name": "m",
											"orig": "m",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2115888,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"h",
										"m",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/album.php",
								"segments": []any{
									map[string]any{
										"lit": "album.php",
									},
								},
								"parts": []any{
									"album.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.album`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "i",
											"orig": "i",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 112024,
										},
										map[string]any{
											"name": "m",
											"orig": "m",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2115888,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"i",
										"m",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/album-mb.php",
								"segments": []any{
									map[string]any{
										"lit": "album-mb.php",
									},
								},
								"parts": []any{
									"album-mb.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.album`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "i",
											"orig": "i",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "1dc4c347-a1db-32aa-b14f-bc9cc507b843",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/artist-mb.php",
								"segments": []any{
									map[string]any{
										"lit": "artist-mb.php",
									},
								},
								"parts": []any{
									"artist-mb.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.artists`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "i",
											"orig": "i",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/artist-social.php",
								"segments": []any{
									map[string]any{
										"lit": "artist-social.php",
									},
								},
								"parts": []any{
									"artist-social.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.artists`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "i",
											"orig": "i",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 112024,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/artist.php",
								"segments": []any{
									map[string]any{
										"lit": "artist.php",
									},
								},
								"parts": []any{
									"artist.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.artists`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "i",
											"orig": "i",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 112024,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/track-mb.php",
								"segments": []any{
									map[string]any{
										"lit": "track-mb.php",
									},
								},
								"parts": []any{
									"track-mb.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.track`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "i",
											"orig": "i",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "50369905-68ca-48d2-912d-b37330ff7dc3",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"i",
									},
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
						"title": "Id Album",
						"type": "`$INTEGER`",
						"short": "Unique album ID",
					},
					map[string]any{
						"name": "idArtist",
						"title": "Id Artist",
						"type": "`$INTEGER`",
						"short": "Artist ID",
					},
					map[string]any{
						"name": "idIMVDB",
						"title": "Id Imvdb",
						"type": "`$INTEGER`",
						"short": "IMVDB ID",
					},
					map[string]any{
						"name": "idLabel",
						"title": "Id Label",
						"type": "`$INTEGER`",
						"short": "Label ID",
					},
					map[string]any{
						"name": "idLyric",
						"title": "Id Lyric",
						"type": "`$INTEGER`",
						"short": "Lyrics ID",
					},
					map[string]any{
						"name": "idTrack",
						"title": "Id Track",
						"type": "`$INTEGER`",
						"short": "Unique track ID",
					},
					map[string]any{
						"name": "intBornYear",
						"title": "Int Born Year",
						"type": "`$INTEGER`",
						"short": "Birth year of the artist",
					},
					map[string]any{
						"name": "intCD",
						"title": "Int Cd",
						"type": "`$INTEGER`",
						"short": "CD number",
					},
					map[string]any{
						"name": "intCharted",
						"title": "Int Charted",
						"type": "`$INTEGER`",
						"short": "Chart position",
					},
					map[string]any{
						"name": "intDiedYear",
						"title": "Int Died Year",
						"type": "`$INTEGER`",
						"short": "Year the artist died (if applicable)",
					},
					map[string]any{
						"name": "intDuration",
						"title": "Int Duration",
						"type": "`$INTEGER`",
						"short": "Track duration in milliseconds",
					},
					map[string]any{
						"name": "intFormedYear",
						"title": "Int Formed Year",
						"type": "`$INTEGER`",
						"short": "Year the artist/band was formed",
					},
					map[string]any{
						"name": "intLoved",
						"title": "Int Loved",
						"type": "`$INTEGER`",
						"short": "Number of loves/likes",
					},
					map[string]any{
						"name": "intMembers",
						"title": "Int Members",
						"type": "`$INTEGER`",
						"short": "Number of band members",
					},
					map[string]any{
						"name": "intMusicVidComments",
						"title": "Int Music Vid Comments",
						"type": "`$INTEGER`",
						"short": "Number of music video comments",
					},
					map[string]any{
						"name": "intMusicVidDislikes",
						"title": "Int Music Vid Dislikes",
						"type": "`$INTEGER`",
						"short": "Number of music video dislikes",
					},
					map[string]any{
						"name": "intMusicVidFavorites",
						"title": "Int Music Vid Favorites",
						"type": "`$INTEGER`",
						"short": "Number of music video favorites",
					},
					map[string]any{
						"name": "intMusicVidLikes",
						"title": "Int Music Vid Likes",
						"type": "`$INTEGER`",
						"short": "Number of music video likes",
					},
					map[string]any{
						"name": "intMusicVidViews",
						"title": "Int Music Vid Views",
						"type": "`$INTEGER`",
						"short": "Number of music video views",
					},
					map[string]any{
						"name": "intSales",
						"title": "Int Sales",
						"type": "`$INTEGER`",
						"short": "Number of sales",
					},
					map[string]any{
						"name": "intScore",
						"title": "Int Score",
						"type": "`$INTEGER`",
						"short": "Album score",
					},
					map[string]any{
						"name": "intScoreVotes",
						"title": "Int Score Votes",
						"type": "`$INTEGER`",
						"short": "Number of score votes",
					},
					map[string]any{
						"name": "intTotalListeners",
						"title": "Int Total Listeners",
						"type": "`$INTEGER`",
						"short": "Total number of listeners",
					},
					map[string]any{
						"name": "intTotalPlays",
						"title": "Int Total Plays",
						"type": "`$INTEGER`",
						"short": "Total number of plays",
					},
					map[string]any{
						"name": "intTrackNumber",
						"title": "Int Track Number",
						"type": "`$INTEGER`",
						"short": "Track number on album",
					},
					map[string]any{
						"name": "intYearReleased",
						"title": "Int Year Released",
						"type": "`$INTEGER`",
						"short": "Year the album was released",
					},
					map[string]any{
						"name": "strAlbum",
						"title": "Str Album",
						"type": "`$STRING`",
						"short": "Album title",
					},
					map[string]any{
						"name": "strAlbum3DCase",
						"title": "Str Album3 D Case",
						"type": "`$STRING`",
						"short": "URL to 3D case image",
					},
					map[string]any{
						"name": "strAlbum3DFace",
						"title": "Str Album3 D Face",
						"type": "`$STRING`",
						"short": "URL to 3D face image",
					},
					map[string]any{
						"name": "strAlbum3DFlat",
						"title": "Str Album3 D Flat",
						"type": "`$STRING`",
						"short": "URL to 3D flat image",
					},
					map[string]any{
						"name": "strAlbum3DThumb",
						"title": "Str Album3 D Thumb",
						"type": "`$STRING`",
						"short": "URL to 3D thumbnail",
					},
					map[string]any{
						"name": "strAlbumCDart",
						"title": "Str Album C Dart",
						"type": "`$STRING`",
						"short": "URL to CD art",
					},
					map[string]any{
						"name": "strAlbumSpine",
						"title": "Str Album Spine",
						"type": "`$STRING`",
						"short": "URL to album spine image",
					},
					map[string]any{
						"name": "strAlbumStripped",
						"title": "Str Album Stripped",
						"type": "`$STRING`",
						"short": "Album title without special characters",
					},
					map[string]any{
						"name": "strAlbumThumb",
						"title": "Str Album Thumb",
						"type": "`$STRING`",
						"short": "URL to album thumbnail",
					},
					map[string]any{
						"name": "strAlbumThumbBack",
						"title": "Str Album Thumb Back",
						"type": "`$STRING`",
						"short": "URL to back of album cover",
					},
					map[string]any{
						"name": "strAlbumThumbHQ",
						"title": "Str Album Thumb Hq",
						"type": "`$STRING`",
						"short": "URL to high quality album thumbnail",
					},
					map[string]any{
						"name": "strAllMusicID",
						"title": "Str All Music Id",
						"type": "`$STRING`",
						"short": "AllMusic ID",
					},
					map[string]any{
						"name": "strAmazonID",
						"title": "Str Amazon Id",
						"type": "`$STRING`",
						"short": "Amazon ID",
					},
					map[string]any{
						"name": "strArtist",
						"title": "Str Artist",
						"type": "`$STRING`",
						"short": "Artist name",
					},
					map[string]any{
						"name": "strArtistAlternate",
						"title": "Str Artist Alternate",
						"type": "`$STRING`",
						"short": "Alternate artist name",
					},
					map[string]any{
						"name": "strArtistBanner",
						"title": "Str Artist Banner",
						"type": "`$STRING`",
						"short": "URL to artist banner",
					},
					map[string]any{
						"name": "strArtistClearart",
						"title": "Str Artist Clearart",
						"type": "`$STRING`",
						"short": "URL to artist clearart",
					},
					map[string]any{
						"name": "strArtistCutout",
						"title": "Str Artist Cutout",
						"type": "`$STRING`",
						"short": "URL to artist cutout image",
					},
					map[string]any{
						"name": "strArtistFanart",
						"title": "Str Artist Fanart",
						"type": "`$STRING`",
						"short": "URL to artist fanart",
					},
					map[string]any{
						"name": "strArtistFanart2",
						"title": "Str Artist Fanart2",
						"type": "`$STRING`",
						"short": "URL to alternate artist fanart",
					},
					map[string]any{
						"name": "strArtistFanart3",
						"title": "Str Artist Fanart3",
						"type": "`$STRING`",
						"short": "URL to third artist fanart",
					},
					map[string]any{
						"name": "strArtistFanart4",
						"title": "Str Artist Fanart4",
						"type": "`$STRING`",
						"short": "URL to fourth artist fanart",
					},
					map[string]any{
						"name": "strArtistLogo",
						"title": "Str Artist Logo",
						"type": "`$STRING`",
						"short": "URL to artist logo",
					},
					map[string]any{
						"name": "strArtistStripped",
						"title": "Str Artist Stripped",
						"type": "`$STRING`",
						"short": "Artist name without special characters",
					},
					map[string]any{
						"name": "strArtistThumb",
						"title": "Str Artist Thumb",
						"type": "`$STRING`",
						"short": "URL to artist thumbnail image",
					},
					map[string]any{
						"name": "strArtistWideThumb",
						"title": "Str Artist Wide Thumb",
						"type": "`$STRING`",
						"short": "URL to artist wide thumbnail",
					},
					map[string]any{
						"name": "strBBCReviewID",
						"title": "Str Bbc Review Id",
						"type": "`$STRING`",
						"short": "BBC Review ID",
					},
					map[string]any{
						"name": "strBiographyCN",
						"title": "Str Biography Cn",
						"type": "`$STRING`",
						"short": "Artist biography in Chinese",
					},
					map[string]any{
						"name": "strBiographyDE",
						"title": "Str Biography De",
						"type": "`$STRING`",
						"short": "Artist biography in German",
					},
					map[string]any{
						"name": "strBiographyEN",
						"title": "Str Biography En",
						"type": "`$STRING`",
						"short": "Artist biography in English",
					},
					map[string]any{
						"name": "strBiographyES",
						"title": "Str Biography Es",
						"type": "`$STRING`",
						"short": "Artist biography in Spanish",
					},
					map[string]any{
						"name": "strBiographyFR",
						"title": "Str Biography Fr",
						"type": "`$STRING`",
						"short": "Artist biography in French",
					},
					map[string]any{
						"name": "strBiographyHU",
						"title": "Str Biography Hu",
						"type": "`$STRING`",
						"short": "Artist biography in Hungarian",
					},
					map[string]any{
						"name": "strBiographyIL",
						"title": "Str Biography Il",
						"type": "`$STRING`",
						"short": "Artist biography in Hebrew",
					},
					map[string]any{
						"name": "strBiographyIT",
						"title": "Str Biography It",
						"type": "`$STRING`",
						"short": "Artist biography in Italian",
					},
					map[string]any{
						"name": "strBiographyJP",
						"title": "Str Biography Jp",
						"type": "`$STRING`",
						"short": "Artist biography in Japanese",
					},
					map[string]any{
						"name": "strBiographyNL",
						"title": "Str Biography Nl",
						"type": "`$STRING`",
						"short": "Artist biography in Dutch",
					},
					map[string]any{
						"name": "strBiographyNO",
						"title": "Str Biography No",
						"type": "`$STRING`",
						"short": "Artist biography in Norwegian",
					},
					map[string]any{
						"name": "strBiographyPL",
						"title": "Str Biography Pl",
						"type": "`$STRING`",
						"short": "Artist biography in Polish",
					},
					map[string]any{
						"name": "strBiographyPT",
						"title": "Str Biography Pt",
						"type": "`$STRING`",
						"short": "Artist biography in Portuguese",
					},
					map[string]any{
						"name": "strBiographyRU",
						"title": "Str Biography Ru",
						"type": "`$STRING`",
						"short": "Artist biography in Russian",
					},
					map[string]any{
						"name": "strBiographySE",
						"title": "Str Biography Se",
						"type": "`$STRING`",
						"short": "Artist biography in Swedish",
					},
					map[string]any{
						"name": "strCountry",
						"title": "Str Country",
						"type": "`$STRING`",
						"short": "Country of origin",
					},
					map[string]any{
						"name": "strCountryCode",
						"title": "Str Country Code",
						"type": "`$STRING`",
						"short": "Country code",
					},
					map[string]any{
						"name": "strDescriptionEN",
						"title": "Str Description En",
						"type": "`$STRING`",
						"short": "Album description in English",
					},
					map[string]any{
						"name": "strDisbanded",
						"title": "Str Disbanded",
						"type": "`$STRING`",
						"short": "Disbanded status",
					},
					map[string]any{
						"name": "strDiscogsID",
						"title": "Str Discogs Id",
						"type": "`$STRING`",
						"short": "Discogs ID",
					},
					map[string]any{
						"name": "strFacebook",
						"title": "Str Facebook",
						"type": "`$STRING`",
						"short": "Facebook page URL",
					},
					map[string]any{
						"name": "strGender",
						"title": "Str Gender",
						"type": "`$STRING`",
						"short": "Artist gender",
					},
					map[string]any{
						"name": "strGeniusID",
						"title": "Str Genius Id",
						"type": "`$STRING`",
						"short": "Genius ID",
					},
					map[string]any{
						"name": "strGenre",
						"title": "Str Genre",
						"type": "`$STRING`",
						"short": "Album genre",
					},
					map[string]any{
						"name": "strItunesID",
						"title": "Str Itunes Id",
						"type": "`$STRING`",
						"short": "iTunes ID",
					},
					map[string]any{
						"name": "strLabel",
						"title": "Str Label",
						"type": "`$STRING`",
						"short": "Record label",
					},
					map[string]any{
						"name": "strLastFMChart",
						"title": "Str Last Fm Chart",
						"type": "`$STRING`",
						"short": "Last.fm chart URL",
					},
					map[string]any{
						"name": "strLocation",
						"title": "Str Location",
						"type": "`$STRING`",
						"short": "Recording location",
					},
					map[string]any{
						"name": "strLocked",
						"title": "Str Locked",
						"type": "`$STRING`",
						"short": "Whether the record is locked",
					},
					map[string]any{
						"name": "strLyricWikiID",
						"title": "Str Lyric Wiki Id",
						"type": "`$STRING`",
						"short": "LyricWiki ID",
					},
					map[string]any{
						"name": "strMood",
						"title": "Str Mood",
						"type": "`$STRING`",
						"short": "Album mood",
					},
					map[string]any{
						"name": "strMusicBrainzAlbumID",
						"title": "Str Music Brainz Album Id",
						"type": "`$STRING`",
						"short": "MusicBrainz Album ID",
					},
					map[string]any{
						"name": "strMusicBrainzArtistID",
						"title": "Str Music Brainz Artist Id",
						"type": "`$STRING`",
						"short": "MusicBrainz Artist ID",
					},
					map[string]any{
						"name": "strMusicBrainzID",
						"title": "Str Music Brainz Id",
						"type": "`$STRING`",
						"short": "MusicBrainz Release Group ID",
					},
					map[string]any{
						"name": "strMusicMozID",
						"title": "Str Music Moz Id",
						"type": "`$STRING`",
						"short": "MusicMoz ID",
					},
					map[string]any{
						"name": "strMusicVid",
						"title": "Str Music Vid",
						"type": "`$STRING`",
						"short": "URL to music video",
					},
					map[string]any{
						"name": "strMusicVidCompany",
						"title": "Str Music Vid Company",
						"type": "`$STRING`",
						"short": "Music video production company",
					},
					map[string]any{
						"name": "strMusicVidDirector",
						"title": "Str Music Vid Director",
						"type": "`$STRING`",
						"short": "Music video director",
					},
					map[string]any{
						"name": "strMusicVidScreen1",
						"title": "Str Music Vid Screen1",
						"type": "`$STRING`",
						"short": "URL to music video screenshot 1",
					},
					map[string]any{
						"name": "strMusicVidScreen2",
						"title": "Str Music Vid Screen2",
						"type": "`$STRING`",
						"short": "URL to music video screenshot 2",
					},
					map[string]any{
						"name": "strMusicVidScreen3",
						"title": "Str Music Vid Screen3",
						"type": "`$STRING`",
						"short": "URL to music video screenshot 3",
					},
					map[string]any{
						"name": "strRateYourMusicID",
						"title": "Str Rate Your Music Id",
						"type": "`$STRING`",
						"short": "RateYourMusic ID",
					},
					map[string]any{
						"name": "strReleaseFormat",
						"title": "Str Release Format",
						"type": "`$STRING`",
						"short": "Release format (CD, Vinyl, etc.)",
					},
					map[string]any{
						"name": "strReview",
						"title": "Str Review",
						"type": "`$STRING`",
						"short": "Album review",
					},
					map[string]any{
						"name": "strSpeed",
						"title": "Str Speed",
						"type": "`$STRING`",
						"short": "Album speed",
					},
					map[string]any{
						"name": "strStyle",
						"title": "Str Style",
						"type": "`$STRING`",
						"short": "Album style",
					},
					map[string]any{
						"name": "strTheme",
						"title": "Str Theme",
						"type": "`$STRING`",
						"short": "Album theme",
					},
					map[string]any{
						"name": "strTrack",
						"title": "Str Track",
						"type": "`$STRING`",
						"short": "Track title",
					},
					map[string]any{
						"name": "strTrackLyrics",
						"title": "Str Track Lyrics",
						"type": "`$STRING`",
						"short": "Track lyrics",
					},
					map[string]any{
						"name": "strTrackThumb",
						"title": "Str Track Thumb",
						"type": "`$STRING`",
						"short": "URL to track thumbnail",
					},
					map[string]any{
						"name": "strTwitter",
						"title": "Str Twitter",
						"type": "`$STRING`",
						"short": "Twitter profile URL",
					},
					map[string]any{
						"name": "strWebsite",
						"title": "Str Website",
						"type": "`$STRING`",
						"short": "Official website URL",
					},
					map[string]any{
						"name": "strWikidataID",
						"title": "Str Wikidata Id",
						"type": "`$STRING`",
						"short": "Wikidata ID",
					},
					map[string]any{
						"name": "strWikipediaID",
						"title": "Str Wikipedia Id",
						"type": "`$STRING`",
						"short": "Wikipedia ID",
					},
				},
				"name": "v1_search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/searchalbum.php",
								"segments": []any{
									map[string]any{
										"lit": "searchalbum.php",
									},
								},
								"parts": []any{
									"searchalbum.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.album`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "a",
											"orig": "a",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Homework",
										},
										map[string]any{
											"name": "s",
											"orig": "s",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "daft_punk",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"a",
										"s",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/searchtrack.php",
								"segments": []any{
									map[string]any{
										"lit": "searchtrack.php",
									},
								},
								"parts": []any{
									"searchtrack.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.track`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "s",
											"orig": "s",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "coldplay",
										},
										map[string]any{
											"name": "t",
											"orig": "t",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "yellow",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"s",
										"t",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/discography-mb.php",
								"segments": []any{
									map[string]any{
										"lit": "discography-mb.php",
									},
								},
								"parts": []any{
									"discography-mb.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.album`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "s",
											"orig": "s",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"s",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/discography.php",
								"segments": []any{
									map[string]any{
										"lit": "discography.php",
									},
								},
								"parts": []any{
									"discography.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.album`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "s",
											"orig": "s",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "coldplay",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"s",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search.php",
								"segments": []any{
									map[string]any{
										"lit": "search.php",
									},
								},
								"parts": []any{
									"search.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.artists`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "s",
											"orig": "s",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "coldplay",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"s",
									},
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
						"title": "Albums",
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
								"kind": "http",
								"method": "GET",
								"orig": "/list/discography/{artistId}",
								"segments": []any{
									map[string]any{
										"lit": "list",
									},
									map[string]any{
										"lit": "discography",
									},
									map[string]any{
										"var": "artist_id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artist_id",
											"orig": "artist_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 111239,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artist_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"v2_lookup": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "albums",
						"title": "Albums",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "artists",
						"title": "Artists",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tracks",
						"title": "Tracks",
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
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/album/{albumId}",
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "album",
									},
									map[string]any{
										"var": "album_id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "album_id",
											"orig": "album_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 2109615,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"album_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/artist/{artistId}",
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "artist",
									},
									map[string]any{
										"var": "artist_id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artist_id",
											"orig": "artist_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 111239,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artist_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/album_mb/{musicBrainzId}",
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "album_mb",
									},
									map[string]any{
										"var": "music_brainz_id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "music_brainz_id",
											"orig": "music_brainz_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "1dc4c347-a1db-32aa-b14f-bc9cc507b843",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"music_brainz_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/artist_mb/{musicBrainzId}",
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "artist_mb",
									},
									map[string]any{
										"var": "music_brainz_id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "music_brainz_id",
											"orig": "music_brainz_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"music_brainz_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/track_mb/{musicBrainzId}",
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "track_mb",
									},
									map[string]any{
										"var": "music_brainz_id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "music_brainz_id",
											"orig": "music_brainz_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "50369905-68ca-48d2-912d-b37330ff7dc3",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"music_brainz_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/track/{trackId}",
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "track",
									},
									map[string]any{
										"var": "track_id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "track_id",
											"orig": "track_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 32724183,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"track_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"v2_search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "albums",
						"title": "Albums",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "artists",
						"title": "Artists",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tracks",
						"title": "Tracks",
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
								"kind": "http",
								"method": "GET",
								"orig": "/search/album/{albumName}",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "album",
									},
									map[string]any{
										"var": "album_name",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "album_name",
											"orig": "album_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "parachutes",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"album_name",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search/artist/{artistName}",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "artist",
									},
									map[string]any{
										"var": "artist_name",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artist_name",
											"orig": "artist_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "coldplay",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artist_name",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search/track/{trackName}",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "track",
									},
									map[string]any{
										"var": "track_name",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "track_name",
											"orig": "track_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "yellow",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"track_name",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
