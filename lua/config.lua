-- FreeMusicApi2 SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "FreeMusicApi2",
      slug = "free-music-api2",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://www.theaudiodb.com/api/v1/json/123",
      auth = {
        prefix = "",
        name = "X-API-KEY",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["v1_list"] = {},
        ["v1_lookup"] = {},
        ["v1_search"] = {},
        ["v2_list"] = {},
        ["v2_lookup"] = {},
        ["v2_search"] = {},
      },
    },
    entity = {
      ["v1_list"] = {
        ["fields"] = {
          {
            ["name"] = "idAlbum",
            ["title"] = "Id Album",
            ["type"] = "`$INTEGER`",
            ["short"] = "Album ID",
          },
          {
            ["name"] = "idArtist",
            ["title"] = "Id Artist",
            ["type"] = "`$INTEGER`",
            ["short"] = "Artist ID",
          },
          {
            ["name"] = "idIMVDB",
            ["title"] = "Id Imvdb",
            ["type"] = "`$INTEGER`",
            ["short"] = "IMVDB ID",
          },
          {
            ["name"] = "idLyric",
            ["title"] = "Id Lyric",
            ["type"] = "`$INTEGER`",
            ["short"] = "Lyrics ID",
          },
          {
            ["name"] = "idTrack",
            ["title"] = "Id Track",
            ["type"] = "`$INTEGER`",
            ["short"] = "Track ID",
          },
          {
            ["name"] = "intCD",
            ["title"] = "Int Cd",
            ["type"] = "`$INTEGER`",
            ["short"] = "CD number",
          },
          {
            ["name"] = "intDuration",
            ["title"] = "Int Duration",
            ["type"] = "`$INTEGER`",
            ["short"] = "Track duration in milliseconds",
          },
          {
            ["name"] = "intLoved",
            ["title"] = "Int Loved",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of loves/likes",
          },
          {
            ["name"] = "intMusicVidComments",
            ["title"] = "Int Music Vid Comments",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video comments",
          },
          {
            ["name"] = "intMusicVidDislikes",
            ["title"] = "Int Music Vid Dislikes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video dislikes",
          },
          {
            ["name"] = "intMusicVidFavorites",
            ["title"] = "Int Music Vid Favorites",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video favorites",
          },
          {
            ["name"] = "intMusicVidLikes",
            ["title"] = "Int Music Vid Likes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video likes",
          },
          {
            ["name"] = "intMusicVidViews",
            ["title"] = "Int Music Vid Views",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video views",
          },
          {
            ["name"] = "intScore",
            ["title"] = "Int Score",
            ["type"] = "`$INTEGER`",
            ["short"] = "Track score",
          },
          {
            ["name"] = "intScoreVotes",
            ["title"] = "Int Score Votes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of score votes",
          },
          {
            ["name"] = "intTotalListeners",
            ["title"] = "Int Total Listeners",
            ["type"] = "`$INTEGER`",
            ["short"] = "Total number of listeners",
          },
          {
            ["name"] = "intTotalPlays",
            ["title"] = "Int Total Plays",
            ["type"] = "`$INTEGER`",
            ["short"] = "Total number of plays",
          },
          {
            ["name"] = "intTrackNumber",
            ["title"] = "Int Track Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "Track number on album",
          },
          {
            ["name"] = "loved",
            ["title"] = "Loved",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "strAlbum",
            ["title"] = "Str Album",
            ["type"] = "`$STRING`",
            ["short"] = "Album title",
          },
          {
            ["name"] = "strArtist",
            ["title"] = "Str Artist",
            ["type"] = "`$STRING`",
            ["short"] = "Artist name",
          },
          {
            ["name"] = "strArtistAlternate",
            ["title"] = "Str Artist Alternate",
            ["type"] = "`$STRING`",
            ["short"] = "Alternate artist name",
          },
          {
            ["name"] = "strDescriptionEN",
            ["title"] = "Str Description En",
            ["type"] = "`$STRING`",
            ["short"] = "Video description in English",
          },
          {
            ["name"] = "strGenre",
            ["title"] = "Str Genre",
            ["type"] = "`$STRING`",
            ["short"] = "Track genre",
          },
          {
            ["name"] = "strLocked",
            ["title"] = "Str Locked",
            ["type"] = "`$STRING`",
            ["short"] = "Whether the record is locked",
          },
          {
            ["name"] = "strMood",
            ["title"] = "Str Mood",
            ["type"] = "`$STRING`",
            ["short"] = "Track mood",
          },
          {
            ["name"] = "strMusicBrainzAlbumID",
            ["title"] = "Str Music Brainz Album Id",
            ["type"] = "`$STRING`",
            ["short"] = "MusicBrainz Album ID",
          },
          {
            ["name"] = "strMusicBrainzArtistID",
            ["title"] = "Str Music Brainz Artist Id",
            ["type"] = "`$STRING`",
            ["short"] = "MusicBrainz Artist ID",
          },
          {
            ["name"] = "strMusicBrainzID",
            ["title"] = "Str Music Brainz Id",
            ["type"] = "`$STRING`",
            ["short"] = "MusicBrainz Recording ID",
          },
          {
            ["name"] = "strMusicVid",
            ["title"] = "Str Music Vid",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video",
          },
          {
            ["name"] = "strMusicVidCompany",
            ["title"] = "Str Music Vid Company",
            ["type"] = "`$STRING`",
            ["short"] = "Music video production company",
          },
          {
            ["name"] = "strMusicVidDirector",
            ["title"] = "Str Music Vid Director",
            ["type"] = "`$STRING`",
            ["short"] = "Music video director",
          },
          {
            ["name"] = "strMusicVidScreen1",
            ["title"] = "Str Music Vid Screen1",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video screenshot 1",
          },
          {
            ["name"] = "strMusicVidScreen2",
            ["title"] = "Str Music Vid Screen2",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video screenshot 2",
          },
          {
            ["name"] = "strMusicVidScreen3",
            ["title"] = "Str Music Vid Screen3",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video screenshot 3",
          },
          {
            ["name"] = "strStyle",
            ["title"] = "Str Style",
            ["type"] = "`$STRING`",
            ["short"] = "Track style",
          },
          {
            ["name"] = "strTheme",
            ["title"] = "Str Theme",
            ["type"] = "`$STRING`",
            ["short"] = "Track theme",
          },
          {
            ["name"] = "strTrack",
            ["title"] = "Str Track",
            ["type"] = "`$STRING`",
            ["short"] = "Track title",
          },
          {
            ["name"] = "strTrackLyrics",
            ["title"] = "Str Track Lyrics",
            ["type"] = "`$STRING`",
            ["short"] = "Track lyrics",
          },
          {
            ["name"] = "strTrackThumb",
            ["title"] = "Str Track Thumb",
            ["type"] = "`$STRING`",
            ["short"] = "URL to track thumbnail",
          },
          {
            ["name"] = "trending",
            ["title"] = "Trending",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "v1_list",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/trending.php",
                ["segments"] = {
                  {
                    ["lit"] = "trending.php",
                  },
                },
                ["parts"] = {
                  "trending.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.trending`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "us",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "albums",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "itunes",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "country",
                    "format",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/mostloved.php",
                ["segments"] = {
                  {
                    ["lit"] = "mostloved.php",
                  },
                },
                ["parts"] = {
                  "mostloved.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.loved`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "track",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/mvid-mb.php",
                ["segments"] = {
                  {
                    ["lit"] = "mvid-mb.php",
                  },
                },
                ["parts"] = {
                  "mvid-mb.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.mvids`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "i",
                      ["orig"] = "i",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "i",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/mvid.php",
                ["segments"] = {
                  {
                    ["lit"] = "mvid.php",
                  },
                },
                ["parts"] = {
                  "mvid.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.mvids`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "i",
                      ["orig"] = "i",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = 112024,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "i",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/track-top10-mb.php",
                ["segments"] = {
                  {
                    ["lit"] = "track-top10-mb.php",
                  },
                },
                ["parts"] = {
                  "track-top10-mb.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.track`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "s",
                      ["orig"] = "s",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "s",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/track-top10.php",
                ["segments"] = {
                  {
                    ["lit"] = "track-top10.php",
                  },
                },
                ["parts"] = {
                  "track-top10.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.track`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "s",
                      ["orig"] = "s",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "coldplay",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "s",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["v1_lookup"] = {
        ["fields"] = {
          {
            ["name"] = "idAlbum",
            ["title"] = "Id Album",
            ["type"] = "`$INTEGER`",
            ["short"] = "Album ID",
          },
          {
            ["name"] = "idArtist",
            ["title"] = "Id Artist",
            ["type"] = "`$INTEGER`",
            ["short"] = "Artist ID",
          },
          {
            ["name"] = "idIMVDB",
            ["title"] = "Id Imvdb",
            ["type"] = "`$INTEGER`",
            ["short"] = "IMVDB ID",
          },
          {
            ["name"] = "idLabel",
            ["title"] = "Id Label",
            ["type"] = "`$INTEGER`",
            ["short"] = "Label ID",
          },
          {
            ["name"] = "idLyric",
            ["title"] = "Id Lyric",
            ["type"] = "`$INTEGER`",
            ["short"] = "Lyrics ID",
          },
          {
            ["name"] = "idTrack",
            ["title"] = "Id Track",
            ["type"] = "`$INTEGER`",
            ["short"] = "Unique track ID",
          },
          {
            ["name"] = "intBornYear",
            ["title"] = "Int Born Year",
            ["type"] = "`$INTEGER`",
            ["short"] = "Birth year of the artist",
          },
          {
            ["name"] = "intCD",
            ["title"] = "Int Cd",
            ["type"] = "`$INTEGER`",
            ["short"] = "CD number",
          },
          {
            ["name"] = "intCharted",
            ["title"] = "Int Charted",
            ["type"] = "`$INTEGER`",
            ["short"] = "Chart position",
          },
          {
            ["name"] = "intDiedYear",
            ["title"] = "Int Died Year",
            ["type"] = "`$INTEGER`",
            ["short"] = "Year the artist died (if applicable)",
          },
          {
            ["name"] = "intDuration",
            ["title"] = "Int Duration",
            ["type"] = "`$INTEGER`",
            ["short"] = "Track duration in milliseconds",
          },
          {
            ["name"] = "intFormedYear",
            ["title"] = "Int Formed Year",
            ["type"] = "`$INTEGER`",
            ["short"] = "Year the artist/band was formed",
          },
          {
            ["name"] = "intLoved",
            ["title"] = "Int Loved",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of loves/likes",
          },
          {
            ["name"] = "intMembers",
            ["title"] = "Int Members",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of band members",
          },
          {
            ["name"] = "intMusicVidComments",
            ["title"] = "Int Music Vid Comments",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video comments",
          },
          {
            ["name"] = "intMusicVidDislikes",
            ["title"] = "Int Music Vid Dislikes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video dislikes",
          },
          {
            ["name"] = "intMusicVidFavorites",
            ["title"] = "Int Music Vid Favorites",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video favorites",
          },
          {
            ["name"] = "intMusicVidLikes",
            ["title"] = "Int Music Vid Likes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video likes",
          },
          {
            ["name"] = "intMusicVidViews",
            ["title"] = "Int Music Vid Views",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video views",
          },
          {
            ["name"] = "intSales",
            ["title"] = "Int Sales",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of sales",
          },
          {
            ["name"] = "intScore",
            ["title"] = "Int Score",
            ["type"] = "`$INTEGER`",
            ["short"] = "Track score",
          },
          {
            ["name"] = "intScoreVotes",
            ["title"] = "Int Score Votes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of score votes",
          },
          {
            ["name"] = "intTotalListeners",
            ["title"] = "Int Total Listeners",
            ["type"] = "`$INTEGER`",
            ["short"] = "Total number of listeners",
          },
          {
            ["name"] = "intTotalPlays",
            ["title"] = "Int Total Plays",
            ["type"] = "`$INTEGER`",
            ["short"] = "Total number of plays",
          },
          {
            ["name"] = "intTrackNumber",
            ["title"] = "Int Track Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "Track number on album",
          },
          {
            ["name"] = "intYearReleased",
            ["title"] = "Int Year Released",
            ["type"] = "`$INTEGER`",
            ["short"] = "Year the album was released",
          },
          {
            ["name"] = "strAlbum",
            ["title"] = "Str Album",
            ["type"] = "`$STRING`",
            ["short"] = "Album title",
          },
          {
            ["name"] = "strAlbum3DCase",
            ["title"] = "Str Album3 D Case",
            ["type"] = "`$STRING`",
            ["short"] = "URL to 3D case image",
          },
          {
            ["name"] = "strAlbum3DFace",
            ["title"] = "Str Album3 D Face",
            ["type"] = "`$STRING`",
            ["short"] = "URL to 3D face image",
          },
          {
            ["name"] = "strAlbum3DFlat",
            ["title"] = "Str Album3 D Flat",
            ["type"] = "`$STRING`",
            ["short"] = "URL to 3D flat image",
          },
          {
            ["name"] = "strAlbum3DThumb",
            ["title"] = "Str Album3 D Thumb",
            ["type"] = "`$STRING`",
            ["short"] = "URL to 3D thumbnail",
          },
          {
            ["name"] = "strAlbumCDart",
            ["title"] = "Str Album C Dart",
            ["type"] = "`$STRING`",
            ["short"] = "URL to CD art",
          },
          {
            ["name"] = "strAlbumSpine",
            ["title"] = "Str Album Spine",
            ["type"] = "`$STRING`",
            ["short"] = "URL to album spine image",
          },
          {
            ["name"] = "strAlbumStripped",
            ["title"] = "Str Album Stripped",
            ["type"] = "`$STRING`",
            ["short"] = "Album title without special characters",
          },
          {
            ["name"] = "strAlbumThumb",
            ["title"] = "Str Album Thumb",
            ["type"] = "`$STRING`",
            ["short"] = "URL to album thumbnail",
          },
          {
            ["name"] = "strAlbumThumbBack",
            ["title"] = "Str Album Thumb Back",
            ["type"] = "`$STRING`",
            ["short"] = "URL to back of album cover",
          },
          {
            ["name"] = "strAlbumThumbHQ",
            ["title"] = "Str Album Thumb Hq",
            ["type"] = "`$STRING`",
            ["short"] = "URL to high quality album thumbnail",
          },
          {
            ["name"] = "strAllMusicID",
            ["title"] = "Str All Music Id",
            ["type"] = "`$STRING`",
            ["short"] = "AllMusic ID",
          },
          {
            ["name"] = "strAmazonID",
            ["title"] = "Str Amazon Id",
            ["type"] = "`$STRING`",
            ["short"] = "Amazon ID",
          },
          {
            ["name"] = "strAppleMusic",
            ["title"] = "Str Apple Music",
            ["type"] = "`$STRING`",
            ["short"] = "Apple Music artist URL",
          },
          {
            ["name"] = "strArtist",
            ["title"] = "Str Artist",
            ["type"] = "`$STRING`",
            ["short"] = "Artist name",
          },
          {
            ["name"] = "strArtistAlternate",
            ["title"] = "Str Artist Alternate",
            ["type"] = "`$STRING`",
            ["short"] = "Alternate artist name",
          },
          {
            ["name"] = "strArtistBanner",
            ["title"] = "Str Artist Banner",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist banner",
          },
          {
            ["name"] = "strArtistClearart",
            ["title"] = "Str Artist Clearart",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist clearart",
          },
          {
            ["name"] = "strArtistCutout",
            ["title"] = "Str Artist Cutout",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist cutout image",
          },
          {
            ["name"] = "strArtistFanart",
            ["title"] = "Str Artist Fanart",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist fanart",
          },
          {
            ["name"] = "strArtistFanart2",
            ["title"] = "Str Artist Fanart2",
            ["type"] = "`$STRING`",
            ["short"] = "URL to alternate artist fanart",
          },
          {
            ["name"] = "strArtistFanart3",
            ["title"] = "Str Artist Fanart3",
            ["type"] = "`$STRING`",
            ["short"] = "URL to third artist fanart",
          },
          {
            ["name"] = "strArtistFanart4",
            ["title"] = "Str Artist Fanart4",
            ["type"] = "`$STRING`",
            ["short"] = "URL to fourth artist fanart",
          },
          {
            ["name"] = "strArtistLogo",
            ["title"] = "Str Artist Logo",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist logo",
          },
          {
            ["name"] = "strArtistStripped",
            ["title"] = "Str Artist Stripped",
            ["type"] = "`$STRING`",
            ["short"] = "Artist name without special characters",
          },
          {
            ["name"] = "strArtistThumb",
            ["title"] = "Str Artist Thumb",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist thumbnail image",
          },
          {
            ["name"] = "strArtistWideThumb",
            ["title"] = "Str Artist Wide Thumb",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist wide thumbnail",
          },
          {
            ["name"] = "strBBCReviewID",
            ["title"] = "Str Bbc Review Id",
            ["type"] = "`$STRING`",
            ["short"] = "BBC Review ID",
          },
          {
            ["name"] = "strBiographyCN",
            ["title"] = "Str Biography Cn",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Chinese",
          },
          {
            ["name"] = "strBiographyDE",
            ["title"] = "Str Biography De",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in German",
          },
          {
            ["name"] = "strBiographyEN",
            ["title"] = "Str Biography En",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in English",
          },
          {
            ["name"] = "strBiographyES",
            ["title"] = "Str Biography Es",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Spanish",
          },
          {
            ["name"] = "strBiographyFR",
            ["title"] = "Str Biography Fr",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in French",
          },
          {
            ["name"] = "strBiographyHU",
            ["title"] = "Str Biography Hu",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Hungarian",
          },
          {
            ["name"] = "strBiographyIL",
            ["title"] = "Str Biography Il",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Hebrew",
          },
          {
            ["name"] = "strBiographyIT",
            ["title"] = "Str Biography It",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Italian",
          },
          {
            ["name"] = "strBiographyJP",
            ["title"] = "Str Biography Jp",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Japanese",
          },
          {
            ["name"] = "strBiographyNL",
            ["title"] = "Str Biography Nl",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Dutch",
          },
          {
            ["name"] = "strBiographyNO",
            ["title"] = "Str Biography No",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Norwegian",
          },
          {
            ["name"] = "strBiographyPL",
            ["title"] = "Str Biography Pl",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Polish",
          },
          {
            ["name"] = "strBiographyPT",
            ["title"] = "Str Biography Pt",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Portuguese",
          },
          {
            ["name"] = "strBiographyRU",
            ["title"] = "Str Biography Ru",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Russian",
          },
          {
            ["name"] = "strBiographySE",
            ["title"] = "Str Biography Se",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Swedish",
          },
          {
            ["name"] = "strCountry",
            ["title"] = "Str Country",
            ["type"] = "`$STRING`",
            ["short"] = "Country of origin",
          },
          {
            ["name"] = "strCountryCode",
            ["title"] = "Str Country Code",
            ["type"] = "`$STRING`",
            ["short"] = "Country code",
          },
          {
            ["name"] = "strDescriptionEN",
            ["title"] = "Str Description En",
            ["type"] = "`$STRING`",
            ["short"] = "Track description in English",
          },
          {
            ["name"] = "strDisbanded",
            ["title"] = "Str Disbanded",
            ["type"] = "`$STRING`",
            ["short"] = "Disbanded status",
          },
          {
            ["name"] = "strDiscogsID",
            ["title"] = "Str Discogs Id",
            ["type"] = "`$STRING`",
            ["short"] = "Discogs ID",
          },
          {
            ["name"] = "strFacebook",
            ["title"] = "Str Facebook",
            ["type"] = "`$STRING`",
            ["short"] = "Facebook page URL",
          },
          {
            ["name"] = "strGender",
            ["title"] = "Str Gender",
            ["type"] = "`$STRING`",
            ["short"] = "Artist gender",
          },
          {
            ["name"] = "strGeniusID",
            ["title"] = "Str Genius Id",
            ["type"] = "`$STRING`",
            ["short"] = "Genius ID",
          },
          {
            ["name"] = "strGenre",
            ["title"] = "Str Genre",
            ["type"] = "`$STRING`",
            ["short"] = "Track genre",
          },
          {
            ["name"] = "strInstagram",
            ["title"] = "Str Instagram",
            ["type"] = "`$STRING`",
            ["short"] = "Instagram profile URL",
          },
          {
            ["name"] = "strItunesID",
            ["title"] = "Str Itunes Id",
            ["type"] = "`$STRING`",
            ["short"] = "iTunes ID",
          },
          {
            ["name"] = "strLabel",
            ["title"] = "Str Label",
            ["type"] = "`$STRING`",
            ["short"] = "Record label",
          },
          {
            ["name"] = "strLastFMChart",
            ["title"] = "Str Last Fm Chart",
            ["type"] = "`$STRING`",
            ["short"] = "Last.fm chart URL",
          },
          {
            ["name"] = "strLocation",
            ["title"] = "Str Location",
            ["type"] = "`$STRING`",
            ["short"] = "Recording location",
          },
          {
            ["name"] = "strLocked",
            ["title"] = "Str Locked",
            ["type"] = "`$STRING`",
            ["short"] = "Whether the record is locked",
          },
          {
            ["name"] = "strLyricWikiID",
            ["title"] = "Str Lyric Wiki Id",
            ["type"] = "`$STRING`",
            ["short"] = "LyricWiki ID",
          },
          {
            ["name"] = "strMood",
            ["title"] = "Str Mood",
            ["type"] = "`$STRING`",
            ["short"] = "Track mood",
          },
          {
            ["name"] = "strMusicBrainzAlbumID",
            ["title"] = "Str Music Brainz Album Id",
            ["type"] = "`$STRING`",
            ["short"] = "MusicBrainz Album ID",
          },
          {
            ["name"] = "strMusicBrainzArtistID",
            ["title"] = "Str Music Brainz Artist Id",
            ["type"] = "`$STRING`",
            ["short"] = "MusicBrainz Artist ID",
          },
          {
            ["name"] = "strMusicBrainzID",
            ["title"] = "Str Music Brainz Id",
            ["type"] = "`$STRING`",
            ["short"] = "MusicBrainz Recording ID",
          },
          {
            ["name"] = "strMusicMozID",
            ["title"] = "Str Music Moz Id",
            ["type"] = "`$STRING`",
            ["short"] = "MusicMoz ID",
          },
          {
            ["name"] = "strMusicVid",
            ["title"] = "Str Music Vid",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video",
          },
          {
            ["name"] = "strMusicVidCompany",
            ["title"] = "Str Music Vid Company",
            ["type"] = "`$STRING`",
            ["short"] = "Music video production company",
          },
          {
            ["name"] = "strMusicVidDirector",
            ["title"] = "Str Music Vid Director",
            ["type"] = "`$STRING`",
            ["short"] = "Music video director",
          },
          {
            ["name"] = "strMusicVidScreen1",
            ["title"] = "Str Music Vid Screen1",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video screenshot 1",
          },
          {
            ["name"] = "strMusicVidScreen2",
            ["title"] = "Str Music Vid Screen2",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video screenshot 2",
          },
          {
            ["name"] = "strMusicVidScreen3",
            ["title"] = "Str Music Vid Screen3",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video screenshot 3",
          },
          {
            ["name"] = "strRateYourMusicID",
            ["title"] = "Str Rate Your Music Id",
            ["type"] = "`$STRING`",
            ["short"] = "RateYourMusic ID",
          },
          {
            ["name"] = "strReleaseFormat",
            ["title"] = "Str Release Format",
            ["type"] = "`$STRING`",
            ["short"] = "Release format (CD, Vinyl, etc.)",
          },
          {
            ["name"] = "strReview",
            ["title"] = "Str Review",
            ["type"] = "`$STRING`",
            ["short"] = "Album review",
          },
          {
            ["name"] = "strSoundCloud",
            ["title"] = "Str Sound Cloud",
            ["type"] = "`$STRING`",
            ["short"] = "SoundCloud profile URL",
          },
          {
            ["name"] = "strSpeed",
            ["title"] = "Str Speed",
            ["type"] = "`$STRING`",
            ["short"] = "Album speed",
          },
          {
            ["name"] = "strSpotify",
            ["title"] = "Str Spotify",
            ["type"] = "`$STRING`",
            ["short"] = "Spotify artist URL",
          },
          {
            ["name"] = "strStyle",
            ["title"] = "Str Style",
            ["type"] = "`$STRING`",
            ["short"] = "Track style",
          },
          {
            ["name"] = "strTheme",
            ["title"] = "Str Theme",
            ["type"] = "`$STRING`",
            ["short"] = "Track theme",
          },
          {
            ["name"] = "strTrack",
            ["title"] = "Str Track",
            ["type"] = "`$STRING`",
            ["short"] = "Track title",
          },
          {
            ["name"] = "strTrackLyrics",
            ["title"] = "Str Track Lyrics",
            ["type"] = "`$STRING`",
            ["short"] = "Track lyrics",
          },
          {
            ["name"] = "strTrackThumb",
            ["title"] = "Str Track Thumb",
            ["type"] = "`$STRING`",
            ["short"] = "URL to track thumbnail",
          },
          {
            ["name"] = "strTwitter",
            ["title"] = "Str Twitter",
            ["type"] = "`$STRING`",
            ["short"] = "Twitter profile URL",
          },
          {
            ["name"] = "strWebsite",
            ["title"] = "Str Website",
            ["type"] = "`$STRING`",
            ["short"] = "Official website URL",
          },
          {
            ["name"] = "strWikidataID",
            ["title"] = "Str Wikidata Id",
            ["type"] = "`$STRING`",
            ["short"] = "Wikidata ID",
          },
          {
            ["name"] = "strWikipediaID",
            ["title"] = "Str Wikipedia Id",
            ["type"] = "`$STRING`",
            ["short"] = "Wikipedia ID",
          },
          {
            ["name"] = "strYoutube",
            ["title"] = "Str Youtube",
            ["type"] = "`$STRING`",
            ["short"] = "YouTube channel URL",
          },
        },
        ["name"] = "v1_lookup",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/track.php",
                ["segments"] = {
                  {
                    ["lit"] = "track.php",
                  },
                },
                ["parts"] = {
                  "track.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.track`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "h",
                      ["orig"] = "h",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 32793500,
                    },
                    {
                      ["name"] = "m",
                      ["orig"] = "m",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 2115888,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "h",
                    "m",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/album.php",
                ["segments"] = {
                  {
                    ["lit"] = "album.php",
                  },
                },
                ["parts"] = {
                  "album.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.album`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "i",
                      ["orig"] = "i",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 112024,
                    },
                    {
                      ["name"] = "m",
                      ["orig"] = "m",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 2115888,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "i",
                    "m",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/album-mb.php",
                ["segments"] = {
                  {
                    ["lit"] = "album-mb.php",
                  },
                },
                ["parts"] = {
                  "album-mb.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.album`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "i",
                      ["orig"] = "i",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "1dc4c347-a1db-32aa-b14f-bc9cc507b843",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "i",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/artist-mb.php",
                ["segments"] = {
                  {
                    ["lit"] = "artist-mb.php",
                  },
                },
                ["parts"] = {
                  "artist-mb.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.artists`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "i",
                      ["orig"] = "i",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "i",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/artist-social.php",
                ["segments"] = {
                  {
                    ["lit"] = "artist-social.php",
                  },
                },
                ["parts"] = {
                  "artist-social.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.artists`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "i",
                      ["orig"] = "i",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = 112024,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "i",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/artist.php",
                ["segments"] = {
                  {
                    ["lit"] = "artist.php",
                  },
                },
                ["parts"] = {
                  "artist.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.artists`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "i",
                      ["orig"] = "i",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = 112024,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "i",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/track-mb.php",
                ["segments"] = {
                  {
                    ["lit"] = "track-mb.php",
                  },
                },
                ["parts"] = {
                  "track-mb.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.track`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "i",
                      ["orig"] = "i",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "50369905-68ca-48d2-912d-b37330ff7dc3",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "i",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["v1_search"] = {
        ["fields"] = {
          {
            ["name"] = "idAlbum",
            ["title"] = "Id Album",
            ["type"] = "`$INTEGER`",
            ["short"] = "Unique album ID",
          },
          {
            ["name"] = "idArtist",
            ["title"] = "Id Artist",
            ["type"] = "`$INTEGER`",
            ["short"] = "Artist ID",
          },
          {
            ["name"] = "idIMVDB",
            ["title"] = "Id Imvdb",
            ["type"] = "`$INTEGER`",
            ["short"] = "IMVDB ID",
          },
          {
            ["name"] = "idLabel",
            ["title"] = "Id Label",
            ["type"] = "`$INTEGER`",
            ["short"] = "Label ID",
          },
          {
            ["name"] = "idLyric",
            ["title"] = "Id Lyric",
            ["type"] = "`$INTEGER`",
            ["short"] = "Lyrics ID",
          },
          {
            ["name"] = "idTrack",
            ["title"] = "Id Track",
            ["type"] = "`$INTEGER`",
            ["short"] = "Unique track ID",
          },
          {
            ["name"] = "intBornYear",
            ["title"] = "Int Born Year",
            ["type"] = "`$INTEGER`",
            ["short"] = "Birth year of the artist",
          },
          {
            ["name"] = "intCD",
            ["title"] = "Int Cd",
            ["type"] = "`$INTEGER`",
            ["short"] = "CD number",
          },
          {
            ["name"] = "intCharted",
            ["title"] = "Int Charted",
            ["type"] = "`$INTEGER`",
            ["short"] = "Chart position",
          },
          {
            ["name"] = "intDiedYear",
            ["title"] = "Int Died Year",
            ["type"] = "`$INTEGER`",
            ["short"] = "Year the artist died (if applicable)",
          },
          {
            ["name"] = "intDuration",
            ["title"] = "Int Duration",
            ["type"] = "`$INTEGER`",
            ["short"] = "Track duration in milliseconds",
          },
          {
            ["name"] = "intFormedYear",
            ["title"] = "Int Formed Year",
            ["type"] = "`$INTEGER`",
            ["short"] = "Year the artist/band was formed",
          },
          {
            ["name"] = "intLoved",
            ["title"] = "Int Loved",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of loves/likes",
          },
          {
            ["name"] = "intMembers",
            ["title"] = "Int Members",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of band members",
          },
          {
            ["name"] = "intMusicVidComments",
            ["title"] = "Int Music Vid Comments",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video comments",
          },
          {
            ["name"] = "intMusicVidDislikes",
            ["title"] = "Int Music Vid Dislikes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video dislikes",
          },
          {
            ["name"] = "intMusicVidFavorites",
            ["title"] = "Int Music Vid Favorites",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video favorites",
          },
          {
            ["name"] = "intMusicVidLikes",
            ["title"] = "Int Music Vid Likes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video likes",
          },
          {
            ["name"] = "intMusicVidViews",
            ["title"] = "Int Music Vid Views",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of music video views",
          },
          {
            ["name"] = "intSales",
            ["title"] = "Int Sales",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of sales",
          },
          {
            ["name"] = "intScore",
            ["title"] = "Int Score",
            ["type"] = "`$INTEGER`",
            ["short"] = "Album score",
          },
          {
            ["name"] = "intScoreVotes",
            ["title"] = "Int Score Votes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of score votes",
          },
          {
            ["name"] = "intTotalListeners",
            ["title"] = "Int Total Listeners",
            ["type"] = "`$INTEGER`",
            ["short"] = "Total number of listeners",
          },
          {
            ["name"] = "intTotalPlays",
            ["title"] = "Int Total Plays",
            ["type"] = "`$INTEGER`",
            ["short"] = "Total number of plays",
          },
          {
            ["name"] = "intTrackNumber",
            ["title"] = "Int Track Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "Track number on album",
          },
          {
            ["name"] = "intYearReleased",
            ["title"] = "Int Year Released",
            ["type"] = "`$INTEGER`",
            ["short"] = "Year the album was released",
          },
          {
            ["name"] = "strAlbum",
            ["title"] = "Str Album",
            ["type"] = "`$STRING`",
            ["short"] = "Album title",
          },
          {
            ["name"] = "strAlbum3DCase",
            ["title"] = "Str Album3 D Case",
            ["type"] = "`$STRING`",
            ["short"] = "URL to 3D case image",
          },
          {
            ["name"] = "strAlbum3DFace",
            ["title"] = "Str Album3 D Face",
            ["type"] = "`$STRING`",
            ["short"] = "URL to 3D face image",
          },
          {
            ["name"] = "strAlbum3DFlat",
            ["title"] = "Str Album3 D Flat",
            ["type"] = "`$STRING`",
            ["short"] = "URL to 3D flat image",
          },
          {
            ["name"] = "strAlbum3DThumb",
            ["title"] = "Str Album3 D Thumb",
            ["type"] = "`$STRING`",
            ["short"] = "URL to 3D thumbnail",
          },
          {
            ["name"] = "strAlbumCDart",
            ["title"] = "Str Album C Dart",
            ["type"] = "`$STRING`",
            ["short"] = "URL to CD art",
          },
          {
            ["name"] = "strAlbumSpine",
            ["title"] = "Str Album Spine",
            ["type"] = "`$STRING`",
            ["short"] = "URL to album spine image",
          },
          {
            ["name"] = "strAlbumStripped",
            ["title"] = "Str Album Stripped",
            ["type"] = "`$STRING`",
            ["short"] = "Album title without special characters",
          },
          {
            ["name"] = "strAlbumThumb",
            ["title"] = "Str Album Thumb",
            ["type"] = "`$STRING`",
            ["short"] = "URL to album thumbnail",
          },
          {
            ["name"] = "strAlbumThumbBack",
            ["title"] = "Str Album Thumb Back",
            ["type"] = "`$STRING`",
            ["short"] = "URL to back of album cover",
          },
          {
            ["name"] = "strAlbumThumbHQ",
            ["title"] = "Str Album Thumb Hq",
            ["type"] = "`$STRING`",
            ["short"] = "URL to high quality album thumbnail",
          },
          {
            ["name"] = "strAllMusicID",
            ["title"] = "Str All Music Id",
            ["type"] = "`$STRING`",
            ["short"] = "AllMusic ID",
          },
          {
            ["name"] = "strAmazonID",
            ["title"] = "Str Amazon Id",
            ["type"] = "`$STRING`",
            ["short"] = "Amazon ID",
          },
          {
            ["name"] = "strArtist",
            ["title"] = "Str Artist",
            ["type"] = "`$STRING`",
            ["short"] = "Artist name",
          },
          {
            ["name"] = "strArtistAlternate",
            ["title"] = "Str Artist Alternate",
            ["type"] = "`$STRING`",
            ["short"] = "Alternate artist name",
          },
          {
            ["name"] = "strArtistBanner",
            ["title"] = "Str Artist Banner",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist banner",
          },
          {
            ["name"] = "strArtistClearart",
            ["title"] = "Str Artist Clearart",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist clearart",
          },
          {
            ["name"] = "strArtistCutout",
            ["title"] = "Str Artist Cutout",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist cutout image",
          },
          {
            ["name"] = "strArtistFanart",
            ["title"] = "Str Artist Fanart",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist fanart",
          },
          {
            ["name"] = "strArtistFanart2",
            ["title"] = "Str Artist Fanart2",
            ["type"] = "`$STRING`",
            ["short"] = "URL to alternate artist fanart",
          },
          {
            ["name"] = "strArtistFanart3",
            ["title"] = "Str Artist Fanart3",
            ["type"] = "`$STRING`",
            ["short"] = "URL to third artist fanart",
          },
          {
            ["name"] = "strArtistFanart4",
            ["title"] = "Str Artist Fanart4",
            ["type"] = "`$STRING`",
            ["short"] = "URL to fourth artist fanart",
          },
          {
            ["name"] = "strArtistLogo",
            ["title"] = "Str Artist Logo",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist logo",
          },
          {
            ["name"] = "strArtistStripped",
            ["title"] = "Str Artist Stripped",
            ["type"] = "`$STRING`",
            ["short"] = "Artist name without special characters",
          },
          {
            ["name"] = "strArtistThumb",
            ["title"] = "Str Artist Thumb",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist thumbnail image",
          },
          {
            ["name"] = "strArtistWideThumb",
            ["title"] = "Str Artist Wide Thumb",
            ["type"] = "`$STRING`",
            ["short"] = "URL to artist wide thumbnail",
          },
          {
            ["name"] = "strBBCReviewID",
            ["title"] = "Str Bbc Review Id",
            ["type"] = "`$STRING`",
            ["short"] = "BBC Review ID",
          },
          {
            ["name"] = "strBiographyCN",
            ["title"] = "Str Biography Cn",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Chinese",
          },
          {
            ["name"] = "strBiographyDE",
            ["title"] = "Str Biography De",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in German",
          },
          {
            ["name"] = "strBiographyEN",
            ["title"] = "Str Biography En",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in English",
          },
          {
            ["name"] = "strBiographyES",
            ["title"] = "Str Biography Es",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Spanish",
          },
          {
            ["name"] = "strBiographyFR",
            ["title"] = "Str Biography Fr",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in French",
          },
          {
            ["name"] = "strBiographyHU",
            ["title"] = "Str Biography Hu",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Hungarian",
          },
          {
            ["name"] = "strBiographyIL",
            ["title"] = "Str Biography Il",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Hebrew",
          },
          {
            ["name"] = "strBiographyIT",
            ["title"] = "Str Biography It",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Italian",
          },
          {
            ["name"] = "strBiographyJP",
            ["title"] = "Str Biography Jp",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Japanese",
          },
          {
            ["name"] = "strBiographyNL",
            ["title"] = "Str Biography Nl",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Dutch",
          },
          {
            ["name"] = "strBiographyNO",
            ["title"] = "Str Biography No",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Norwegian",
          },
          {
            ["name"] = "strBiographyPL",
            ["title"] = "Str Biography Pl",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Polish",
          },
          {
            ["name"] = "strBiographyPT",
            ["title"] = "Str Biography Pt",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Portuguese",
          },
          {
            ["name"] = "strBiographyRU",
            ["title"] = "Str Biography Ru",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Russian",
          },
          {
            ["name"] = "strBiographySE",
            ["title"] = "Str Biography Se",
            ["type"] = "`$STRING`",
            ["short"] = "Artist biography in Swedish",
          },
          {
            ["name"] = "strCountry",
            ["title"] = "Str Country",
            ["type"] = "`$STRING`",
            ["short"] = "Country of origin",
          },
          {
            ["name"] = "strCountryCode",
            ["title"] = "Str Country Code",
            ["type"] = "`$STRING`",
            ["short"] = "Country code",
          },
          {
            ["name"] = "strDescriptionEN",
            ["title"] = "Str Description En",
            ["type"] = "`$STRING`",
            ["short"] = "Album description in English",
          },
          {
            ["name"] = "strDisbanded",
            ["title"] = "Str Disbanded",
            ["type"] = "`$STRING`",
            ["short"] = "Disbanded status",
          },
          {
            ["name"] = "strDiscogsID",
            ["title"] = "Str Discogs Id",
            ["type"] = "`$STRING`",
            ["short"] = "Discogs ID",
          },
          {
            ["name"] = "strFacebook",
            ["title"] = "Str Facebook",
            ["type"] = "`$STRING`",
            ["short"] = "Facebook page URL",
          },
          {
            ["name"] = "strGender",
            ["title"] = "Str Gender",
            ["type"] = "`$STRING`",
            ["short"] = "Artist gender",
          },
          {
            ["name"] = "strGeniusID",
            ["title"] = "Str Genius Id",
            ["type"] = "`$STRING`",
            ["short"] = "Genius ID",
          },
          {
            ["name"] = "strGenre",
            ["title"] = "Str Genre",
            ["type"] = "`$STRING`",
            ["short"] = "Album genre",
          },
          {
            ["name"] = "strItunesID",
            ["title"] = "Str Itunes Id",
            ["type"] = "`$STRING`",
            ["short"] = "iTunes ID",
          },
          {
            ["name"] = "strLabel",
            ["title"] = "Str Label",
            ["type"] = "`$STRING`",
            ["short"] = "Record label",
          },
          {
            ["name"] = "strLastFMChart",
            ["title"] = "Str Last Fm Chart",
            ["type"] = "`$STRING`",
            ["short"] = "Last.fm chart URL",
          },
          {
            ["name"] = "strLocation",
            ["title"] = "Str Location",
            ["type"] = "`$STRING`",
            ["short"] = "Recording location",
          },
          {
            ["name"] = "strLocked",
            ["title"] = "Str Locked",
            ["type"] = "`$STRING`",
            ["short"] = "Whether the record is locked",
          },
          {
            ["name"] = "strLyricWikiID",
            ["title"] = "Str Lyric Wiki Id",
            ["type"] = "`$STRING`",
            ["short"] = "LyricWiki ID",
          },
          {
            ["name"] = "strMood",
            ["title"] = "Str Mood",
            ["type"] = "`$STRING`",
            ["short"] = "Album mood",
          },
          {
            ["name"] = "strMusicBrainzAlbumID",
            ["title"] = "Str Music Brainz Album Id",
            ["type"] = "`$STRING`",
            ["short"] = "MusicBrainz Album ID",
          },
          {
            ["name"] = "strMusicBrainzArtistID",
            ["title"] = "Str Music Brainz Artist Id",
            ["type"] = "`$STRING`",
            ["short"] = "MusicBrainz Artist ID",
          },
          {
            ["name"] = "strMusicBrainzID",
            ["title"] = "Str Music Brainz Id",
            ["type"] = "`$STRING`",
            ["short"] = "MusicBrainz Release Group ID",
          },
          {
            ["name"] = "strMusicMozID",
            ["title"] = "Str Music Moz Id",
            ["type"] = "`$STRING`",
            ["short"] = "MusicMoz ID",
          },
          {
            ["name"] = "strMusicVid",
            ["title"] = "Str Music Vid",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video",
          },
          {
            ["name"] = "strMusicVidCompany",
            ["title"] = "Str Music Vid Company",
            ["type"] = "`$STRING`",
            ["short"] = "Music video production company",
          },
          {
            ["name"] = "strMusicVidDirector",
            ["title"] = "Str Music Vid Director",
            ["type"] = "`$STRING`",
            ["short"] = "Music video director",
          },
          {
            ["name"] = "strMusicVidScreen1",
            ["title"] = "Str Music Vid Screen1",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video screenshot 1",
          },
          {
            ["name"] = "strMusicVidScreen2",
            ["title"] = "Str Music Vid Screen2",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video screenshot 2",
          },
          {
            ["name"] = "strMusicVidScreen3",
            ["title"] = "Str Music Vid Screen3",
            ["type"] = "`$STRING`",
            ["short"] = "URL to music video screenshot 3",
          },
          {
            ["name"] = "strRateYourMusicID",
            ["title"] = "Str Rate Your Music Id",
            ["type"] = "`$STRING`",
            ["short"] = "RateYourMusic ID",
          },
          {
            ["name"] = "strReleaseFormat",
            ["title"] = "Str Release Format",
            ["type"] = "`$STRING`",
            ["short"] = "Release format (CD, Vinyl, etc.)",
          },
          {
            ["name"] = "strReview",
            ["title"] = "Str Review",
            ["type"] = "`$STRING`",
            ["short"] = "Album review",
          },
          {
            ["name"] = "strSpeed",
            ["title"] = "Str Speed",
            ["type"] = "`$STRING`",
            ["short"] = "Album speed",
          },
          {
            ["name"] = "strStyle",
            ["title"] = "Str Style",
            ["type"] = "`$STRING`",
            ["short"] = "Album style",
          },
          {
            ["name"] = "strTheme",
            ["title"] = "Str Theme",
            ["type"] = "`$STRING`",
            ["short"] = "Album theme",
          },
          {
            ["name"] = "strTrack",
            ["title"] = "Str Track",
            ["type"] = "`$STRING`",
            ["short"] = "Track title",
          },
          {
            ["name"] = "strTrackLyrics",
            ["title"] = "Str Track Lyrics",
            ["type"] = "`$STRING`",
            ["short"] = "Track lyrics",
          },
          {
            ["name"] = "strTrackThumb",
            ["title"] = "Str Track Thumb",
            ["type"] = "`$STRING`",
            ["short"] = "URL to track thumbnail",
          },
          {
            ["name"] = "strTwitter",
            ["title"] = "Str Twitter",
            ["type"] = "`$STRING`",
            ["short"] = "Twitter profile URL",
          },
          {
            ["name"] = "strWebsite",
            ["title"] = "Str Website",
            ["type"] = "`$STRING`",
            ["short"] = "Official website URL",
          },
          {
            ["name"] = "strWikidataID",
            ["title"] = "Str Wikidata Id",
            ["type"] = "`$STRING`",
            ["short"] = "Wikidata ID",
          },
          {
            ["name"] = "strWikipediaID",
            ["title"] = "Str Wikipedia Id",
            ["type"] = "`$STRING`",
            ["short"] = "Wikipedia ID",
          },
        },
        ["name"] = "v1_search",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/searchalbum.php",
                ["segments"] = {
                  {
                    ["lit"] = "searchalbum.php",
                  },
                },
                ["parts"] = {
                  "searchalbum.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.album`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "a",
                      ["orig"] = "a",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "Homework",
                    },
                    {
                      ["name"] = "s",
                      ["orig"] = "s",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "daft_punk",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "a",
                    "s",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/searchtrack.php",
                ["segments"] = {
                  {
                    ["lit"] = "searchtrack.php",
                  },
                },
                ["parts"] = {
                  "searchtrack.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.track`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "s",
                      ["orig"] = "s",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "coldplay",
                    },
                    {
                      ["name"] = "t",
                      ["orig"] = "t",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "yellow",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "s",
                    "t",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/discography-mb.php",
                ["segments"] = {
                  {
                    ["lit"] = "discography-mb.php",
                  },
                },
                ["parts"] = {
                  "discography-mb.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.album`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "s",
                      ["orig"] = "s",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "s",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/discography.php",
                ["segments"] = {
                  {
                    ["lit"] = "discography.php",
                  },
                },
                ["parts"] = {
                  "discography.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.album`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "s",
                      ["orig"] = "s",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "coldplay",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "s",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/search.php",
                ["segments"] = {
                  {
                    ["lit"] = "search.php",
                  },
                },
                ["parts"] = {
                  "search.php",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.artists`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "s",
                      ["orig"] = "s",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "coldplay",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "s",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["v2_list"] = {
        ["fields"] = {
          {
            ["name"] = "albums",
            ["title"] = "Albums",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "v2_list",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/list/discography/{artistId}",
                ["segments"] = {
                  {
                    ["lit"] = "list",
                  },
                  {
                    ["lit"] = "discography",
                  },
                  {
                    ["var"] = "artist_id",
                  },
                },
                ["parts"] = {
                  "list",
                  "discography",
                  "{artist_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["artistId"] = "artist_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "artist_id",
                      ["orig"] = "artist_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = 111239,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "artist_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["v2_lookup"] = {
        ["fields"] = {
          {
            ["name"] = "albums",
            ["title"] = "Albums",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "artists",
            ["title"] = "Artists",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "tracks",
            ["title"] = "Tracks",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "v2_lookup",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/lookup/album/{albumId}",
                ["segments"] = {
                  {
                    ["lit"] = "lookup",
                  },
                  {
                    ["lit"] = "album",
                  },
                  {
                    ["var"] = "album_id",
                  },
                },
                ["parts"] = {
                  "lookup",
                  "album",
                  "{album_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["albumId"] = "album_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "album_id",
                      ["orig"] = "album_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = 2109615,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "album_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/lookup/artist/{artistId}",
                ["segments"] = {
                  {
                    ["lit"] = "lookup",
                  },
                  {
                    ["lit"] = "artist",
                  },
                  {
                    ["var"] = "artist_id",
                  },
                },
                ["parts"] = {
                  "lookup",
                  "artist",
                  "{artist_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["artistId"] = "artist_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "artist_id",
                      ["orig"] = "artist_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = 111239,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "artist_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/lookup/album_mb/{musicBrainzId}",
                ["segments"] = {
                  {
                    ["lit"] = "lookup",
                  },
                  {
                    ["lit"] = "album_mb",
                  },
                  {
                    ["var"] = "music_brainz_id",
                  },
                },
                ["parts"] = {
                  "lookup",
                  "album_mb",
                  "{music_brainz_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["musicBrainzId"] = "music_brainz_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "music_brainz_id",
                      ["orig"] = "music_brainz_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "1dc4c347-a1db-32aa-b14f-bc9cc507b843",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "music_brainz_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/lookup/artist_mb/{musicBrainzId}",
                ["segments"] = {
                  {
                    ["lit"] = "lookup",
                  },
                  {
                    ["lit"] = "artist_mb",
                  },
                  {
                    ["var"] = "music_brainz_id",
                  },
                },
                ["parts"] = {
                  "lookup",
                  "artist_mb",
                  "{music_brainz_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["musicBrainzId"] = "music_brainz_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "music_brainz_id",
                      ["orig"] = "music_brainz_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "music_brainz_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/lookup/track_mb/{musicBrainzId}",
                ["segments"] = {
                  {
                    ["lit"] = "lookup",
                  },
                  {
                    ["lit"] = "track_mb",
                  },
                  {
                    ["var"] = "music_brainz_id",
                  },
                },
                ["parts"] = {
                  "lookup",
                  "track_mb",
                  "{music_brainz_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["musicBrainzId"] = "music_brainz_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "music_brainz_id",
                      ["orig"] = "music_brainz_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "50369905-68ca-48d2-912d-b37330ff7dc3",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "music_brainz_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/lookup/track/{trackId}",
                ["segments"] = {
                  {
                    ["lit"] = "lookup",
                  },
                  {
                    ["lit"] = "track",
                  },
                  {
                    ["var"] = "track_id",
                  },
                },
                ["parts"] = {
                  "lookup",
                  "track",
                  "{track_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["trackId"] = "track_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "track_id",
                      ["orig"] = "track_id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = 32724183,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "track_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["v2_search"] = {
        ["fields"] = {
          {
            ["name"] = "albums",
            ["title"] = "Albums",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "artists",
            ["title"] = "Artists",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "tracks",
            ["title"] = "Tracks",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "v2_search",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/search/album/{albumName}",
                ["segments"] = {
                  {
                    ["lit"] = "search",
                  },
                  {
                    ["lit"] = "album",
                  },
                  {
                    ["var"] = "album_name",
                  },
                },
                ["parts"] = {
                  "search",
                  "album",
                  "{album_name}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["albumName"] = "album_name",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "album_name",
                      ["orig"] = "album_name",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "parachutes",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "album_name",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/search/artist/{artistName}",
                ["segments"] = {
                  {
                    ["lit"] = "search",
                  },
                  {
                    ["lit"] = "artist",
                  },
                  {
                    ["var"] = "artist_name",
                  },
                },
                ["parts"] = {
                  "search",
                  "artist",
                  "{artist_name}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["artistName"] = "artist_name",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "artist_name",
                      ["orig"] = "artist_name",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "coldplay",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "artist_name",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/search/track/{trackName}",
                ["segments"] = {
                  {
                    ["lit"] = "search",
                  },
                  {
                    ["lit"] = "track",
                  },
                  {
                    ["var"] = "track_name",
                  },
                },
                ["parts"] = {
                  "search",
                  "track",
                  "{track_name}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["trackName"] = "track_name",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "track_name",
                      ["orig"] = "track_name",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "yellow",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "track_name",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
