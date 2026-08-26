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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"short": "Album ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idArtist",
						"short": "Artist ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idIMVDB",
						"short": "IMVDB ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idLyric",
						"short": "Lyrics ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idTrack",
						"short": "Track ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intCD",
						"short": "CD number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intDuration",
						"short": "Track duration in milliseconds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intLoved",
						"short": "Number of loves/likes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidComments",
						"short": "Number of music video comments",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidDislikes",
						"short": "Number of music video dislikes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidFavorites",
						"short": "Number of music video favorites",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidLikes",
						"short": "Number of music video likes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidViews",
						"short": "Number of music video views",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScore",
						"short": "Track score",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScoreVotes",
						"short": "Number of score votes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalListeners",
						"short": "Total number of listeners",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalPlays",
						"short": "Total number of plays",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTrackNumber",
						"short": "Track number on album",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "loved",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "strAlbum",
						"short": "Album title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtist",
						"short": "Artist name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistAlternate",
						"short": "Alternate artist name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDescriptionEN",
						"short": "Video description in English",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGenre",
						"short": "Track genre",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLocked",
						"short": "Whether the record is locked",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMood",
						"short": "Track mood",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzAlbumID",
						"short": "MusicBrainz Album ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzArtistID",
						"short": "MusicBrainz Artist ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzID",
						"short": "MusicBrainz Recording ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVid",
						"short": "URL to music video",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidCompany",
						"short": "Music video production company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidDirector",
						"short": "Music video director",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen1",
						"short": "URL to music video screenshot 1",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen2",
						"short": "URL to music video screenshot 2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen3",
						"short": "URL to music video screenshot 3",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strStyle",
						"short": "Track style",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTheme",
						"short": "Track theme",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrack",
						"short": "Track title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackLyrics",
						"short": "Track lyrics",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackThumb",
						"short": "URL to track thumbnail",
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
						"short": "Album ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idArtist",
						"short": "Artist ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idIMVDB",
						"short": "IMVDB ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idLabel",
						"short": "Label ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idLyric",
						"short": "Lyrics ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idTrack",
						"short": "Unique track ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intBornYear",
						"short": "Birth year of the artist",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intCD",
						"short": "CD number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intCharted",
						"short": "Chart position",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intDiedYear",
						"short": "Year the artist died (if applicable)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intDuration",
						"short": "Track duration in milliseconds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intFormedYear",
						"short": "Year the artist/band was formed",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intLoved",
						"short": "Number of loves/likes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMembers",
						"short": "Number of band members",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidComments",
						"short": "Number of music video comments",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidDislikes",
						"short": "Number of music video dislikes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidFavorites",
						"short": "Number of music video favorites",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidLikes",
						"short": "Number of music video likes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidViews",
						"short": "Number of music video views",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intSales",
						"short": "Number of sales",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScore",
						"short": "Track score",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScoreVotes",
						"short": "Number of score votes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalListeners",
						"short": "Total number of listeners",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalPlays",
						"short": "Total number of plays",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTrackNumber",
						"short": "Track number on album",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intYearReleased",
						"short": "Year the album was released",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "strAlbum",
						"short": "Album title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DCase",
						"short": "URL to 3D case image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DFace",
						"short": "URL to 3D face image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DFlat",
						"short": "URL to 3D flat image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DThumb",
						"short": "URL to 3D thumbnail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumCDart",
						"short": "URL to CD art",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumSpine",
						"short": "URL to album spine image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumStripped",
						"short": "Album title without special characters",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumb",
						"short": "URL to album thumbnail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumbBack",
						"short": "URL to back of album cover",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumbHQ",
						"short": "URL to high quality album thumbnail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAllMusicID",
						"short": "AllMusic ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAmazonID",
						"short": "Amazon ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAppleMusic",
						"short": "Apple Music artist URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtist",
						"short": "Artist name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistAlternate",
						"short": "Alternate artist name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistBanner",
						"short": "URL to artist banner",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistClearart",
						"short": "URL to artist clearart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistCutout",
						"short": "URL to artist cutout image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart",
						"short": "URL to artist fanart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart2",
						"short": "URL to alternate artist fanart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart3",
						"short": "URL to third artist fanart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart4",
						"short": "URL to fourth artist fanart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistLogo",
						"short": "URL to artist logo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistStripped",
						"short": "Artist name without special characters",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistThumb",
						"short": "URL to artist thumbnail image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistWideThumb",
						"short": "URL to artist wide thumbnail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBBCReviewID",
						"short": "BBC Review ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyCN",
						"short": "Artist biography in Chinese",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyDE",
						"short": "Artist biography in German",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyEN",
						"short": "Artist biography in English",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyES",
						"short": "Artist biography in Spanish",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyFR",
						"short": "Artist biography in French",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyHU",
						"short": "Artist biography in Hungarian",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyIL",
						"short": "Artist biography in Hebrew",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyIT",
						"short": "Artist biography in Italian",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyJP",
						"short": "Artist biography in Japanese",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyNL",
						"short": "Artist biography in Dutch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyNO",
						"short": "Artist biography in Norwegian",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyPL",
						"short": "Artist biography in Polish",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyPT",
						"short": "Artist biography in Portuguese",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyRU",
						"short": "Artist biography in Russian",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographySE",
						"short": "Artist biography in Swedish",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strCountry",
						"short": "Country of origin",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strCountryCode",
						"short": "Country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDescriptionEN",
						"short": "Track description in English",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDisbanded",
						"short": "Disbanded status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDiscogsID",
						"short": "Discogs ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strFacebook",
						"short": "Facebook page URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGender",
						"short": "Artist gender",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGeniusID",
						"short": "Genius ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGenre",
						"short": "Track genre",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strInstagram",
						"short": "Instagram profile URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strItunesID",
						"short": "iTunes ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLabel",
						"short": "Record label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLastFMChart",
						"short": "Last.fm chart URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLocation",
						"short": "Recording location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLocked",
						"short": "Whether the record is locked",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLyricWikiID",
						"short": "LyricWiki ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMood",
						"short": "Track mood",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzAlbumID",
						"short": "MusicBrainz Album ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzArtistID",
						"short": "MusicBrainz Artist ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzID",
						"short": "MusicBrainz Recording ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicMozID",
						"short": "MusicMoz ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVid",
						"short": "URL to music video",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidCompany",
						"short": "Music video production company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidDirector",
						"short": "Music video director",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen1",
						"short": "URL to music video screenshot 1",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen2",
						"short": "URL to music video screenshot 2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen3",
						"short": "URL to music video screenshot 3",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strRateYourMusicID",
						"short": "RateYourMusic ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strReleaseFormat",
						"short": "Release format (CD, Vinyl, etc.)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strReview",
						"short": "Album review",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strSoundCloud",
						"short": "SoundCloud profile URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strSpeed",
						"short": "Album speed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strSpotify",
						"short": "Spotify artist URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strStyle",
						"short": "Track style",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTheme",
						"short": "Track theme",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrack",
						"short": "Track title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackLyrics",
						"short": "Track lyrics",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackThumb",
						"short": "URL to track thumbnail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTwitter",
						"short": "Twitter profile URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWebsite",
						"short": "Official website URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWikidataID",
						"short": "Wikidata ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWikipediaID",
						"short": "Wikipedia ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strYoutube",
						"short": "YouTube channel URL",
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
						"short": "Unique album ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idArtist",
						"short": "Artist ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idIMVDB",
						"short": "IMVDB ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idLabel",
						"short": "Label ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idLyric",
						"short": "Lyrics ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "idTrack",
						"short": "Unique track ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intBornYear",
						"short": "Birth year of the artist",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intCD",
						"short": "CD number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intCharted",
						"short": "Chart position",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intDiedYear",
						"short": "Year the artist died (if applicable)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intDuration",
						"short": "Track duration in milliseconds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intFormedYear",
						"short": "Year the artist/band was formed",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intLoved",
						"short": "Number of loves/likes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMembers",
						"short": "Number of band members",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidComments",
						"short": "Number of music video comments",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidDislikes",
						"short": "Number of music video dislikes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidFavorites",
						"short": "Number of music video favorites",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidLikes",
						"short": "Number of music video likes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intMusicVidViews",
						"short": "Number of music video views",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intSales",
						"short": "Number of sales",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScore",
						"short": "Album score",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intScoreVotes",
						"short": "Number of score votes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalListeners",
						"short": "Total number of listeners",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTotalPlays",
						"short": "Total number of plays",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intTrackNumber",
						"short": "Track number on album",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "intYearReleased",
						"short": "Year the album was released",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "strAlbum",
						"short": "Album title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DCase",
						"short": "URL to 3D case image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DFace",
						"short": "URL to 3D face image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DFlat",
						"short": "URL to 3D flat image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbum3DThumb",
						"short": "URL to 3D thumbnail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumCDart",
						"short": "URL to CD art",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumSpine",
						"short": "URL to album spine image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumStripped",
						"short": "Album title without special characters",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumb",
						"short": "URL to album thumbnail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumbBack",
						"short": "URL to back of album cover",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAlbumThumbHQ",
						"short": "URL to high quality album thumbnail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAllMusicID",
						"short": "AllMusic ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strAmazonID",
						"short": "Amazon ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtist",
						"short": "Artist name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistAlternate",
						"short": "Alternate artist name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistBanner",
						"short": "URL to artist banner",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistClearart",
						"short": "URL to artist clearart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistCutout",
						"short": "URL to artist cutout image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart",
						"short": "URL to artist fanart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart2",
						"short": "URL to alternate artist fanart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart3",
						"short": "URL to third artist fanart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistFanart4",
						"short": "URL to fourth artist fanart",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistLogo",
						"short": "URL to artist logo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistStripped",
						"short": "Artist name without special characters",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistThumb",
						"short": "URL to artist thumbnail image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strArtistWideThumb",
						"short": "URL to artist wide thumbnail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBBCReviewID",
						"short": "BBC Review ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyCN",
						"short": "Artist biography in Chinese",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyDE",
						"short": "Artist biography in German",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyEN",
						"short": "Artist biography in English",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyES",
						"short": "Artist biography in Spanish",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyFR",
						"short": "Artist biography in French",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyHU",
						"short": "Artist biography in Hungarian",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyIL",
						"short": "Artist biography in Hebrew",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyIT",
						"short": "Artist biography in Italian",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyJP",
						"short": "Artist biography in Japanese",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyNL",
						"short": "Artist biography in Dutch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyNO",
						"short": "Artist biography in Norwegian",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyPL",
						"short": "Artist biography in Polish",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyPT",
						"short": "Artist biography in Portuguese",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographyRU",
						"short": "Artist biography in Russian",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strBiographySE",
						"short": "Artist biography in Swedish",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strCountry",
						"short": "Country of origin",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strCountryCode",
						"short": "Country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDescriptionEN",
						"short": "Album description in English",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDisbanded",
						"short": "Disbanded status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strDiscogsID",
						"short": "Discogs ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strFacebook",
						"short": "Facebook page URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGender",
						"short": "Artist gender",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGeniusID",
						"short": "Genius ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strGenre",
						"short": "Album genre",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strItunesID",
						"short": "iTunes ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLabel",
						"short": "Record label",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLastFMChart",
						"short": "Last.fm chart URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLocation",
						"short": "Recording location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLocked",
						"short": "Whether the record is locked",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strLyricWikiID",
						"short": "LyricWiki ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMood",
						"short": "Album mood",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzAlbumID",
						"short": "MusicBrainz Album ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzArtistID",
						"short": "MusicBrainz Artist ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicBrainzID",
						"short": "MusicBrainz Release Group ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicMozID",
						"short": "MusicMoz ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVid",
						"short": "URL to music video",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidCompany",
						"short": "Music video production company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidDirector",
						"short": "Music video director",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen1",
						"short": "URL to music video screenshot 1",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen2",
						"short": "URL to music video screenshot 2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strMusicVidScreen3",
						"short": "URL to music video screenshot 3",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strRateYourMusicID",
						"short": "RateYourMusic ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strReleaseFormat",
						"short": "Release format (CD, Vinyl, etc.)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strReview",
						"short": "Album review",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strSpeed",
						"short": "Album speed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strStyle",
						"short": "Album style",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTheme",
						"short": "Album theme",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrack",
						"short": "Track title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackLyrics",
						"short": "Track lyrics",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTrackThumb",
						"short": "URL to track thumbnail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strTwitter",
						"short": "Twitter profile URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWebsite",
						"short": "Official website URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWikidataID",
						"short": "Wikidata ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "strWikipediaID",
						"short": "Wikipedia ID",
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
