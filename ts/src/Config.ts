
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://www.theaudiodb.com/api/v1/json/123',

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      v1_list: {
      },

      v1_lookup: {
      },

      v1_search: {
      },

      v2_list: {
      },

      v2_lookup: {
      },

      v2_search: {
      },

    }
  }


  entity = {
    "v1_list": {
      "fields": [
        {
          "name": "id_album",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "id_artist",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "id_imvdb",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "id_lyric",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "id_track",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 4
        },
        {
          "name": "int_cd",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 5
        },
        {
          "name": "int_duration",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 6
        },
        {
          "name": "int_loved",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 7
        },
        {
          "name": "int_music_vid_comment",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 8
        },
        {
          "name": "int_music_vid_dislike",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 9
        },
        {
          "name": "int_music_vid_favorite",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 10
        },
        {
          "name": "int_music_vid_like",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 11
        },
        {
          "name": "int_music_vid_view",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 12
        },
        {
          "name": "int_score",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 13
        },
        {
          "name": "int_score_vote",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 14
        },
        {
          "name": "int_total_listener",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 15
        },
        {
          "name": "int_total_play",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 16
        },
        {
          "name": "int_track_number",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 17
        },
        {
          "name": "loved",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 18
        },
        {
          "name": "str_album",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 19
        },
        {
          "name": "str_artist",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 20
        },
        {
          "name": "str_artist_alternate",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 21
        },
        {
          "name": "str_description_en",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 22
        },
        {
          "name": "str_genre",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 23
        },
        {
          "name": "str_locked",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 24
        },
        {
          "name": "str_mood",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 25
        },
        {
          "name": "str_music_brainz_album_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 26
        },
        {
          "name": "str_music_brainz_artist_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 27
        },
        {
          "name": "str_music_brainz_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 28
        },
        {
          "name": "str_music_vid",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 29
        },
        {
          "name": "str_music_vid_company",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 30
        },
        {
          "name": "str_music_vid_director",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 31
        },
        {
          "name": "str_music_vid_screen1",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 32
        },
        {
          "name": "str_music_vid_screen2",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 33
        },
        {
          "name": "str_music_vid_screen3",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 34
        },
        {
          "name": "str_style",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 35
        },
        {
          "name": "str_theme",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 36
        },
        {
          "name": "str_track",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 37
        },
        {
          "name": "str_track_lyric",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 38
        },
        {
          "name": "str_track_thumb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 39
        },
        {
          "name": "trending",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 40
        }
      ],
      "name": "v1_list",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "us",
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "albums",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "itunes",
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/trending.php",
              "parts": [
                "trending.php"
              ],
              "select": {
                "exist": [
                  "country",
                  "format",
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "example": "track",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/mostloved.php",
              "parts": [
                "mostloved.php"
              ],
              "select": {
                "exist": [
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "query": [
                  {
                    "example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
                    "kind": "query",
                    "name": "i",
                    "orig": "i",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/mvid-mb.php",
              "parts": [
                "mvid-mb.php"
              ],
              "select": {
                "exist": [
                  "i"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 2
            },
            {
              "args": {
                "query": [
                  {
                    "example": 112024,
                    "kind": "query",
                    "name": "i",
                    "orig": "i",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/mvid.php",
              "parts": [
                "mvid.php"
              ],
              "select": {
                "exist": [
                  "i"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 3
            },
            {
              "args": {
                "query": [
                  {
                    "example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
                    "kind": "query",
                    "name": "s",
                    "orig": "s",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/track-top10-mb.php",
              "parts": [
                "track-top10-mb.php"
              ],
              "select": {
                "exist": [
                  "s"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 4
            },
            {
              "args": {
                "query": [
                  {
                    "example": "coldplay",
                    "kind": "query",
                    "name": "s",
                    "orig": "s",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/track-top10.php",
              "parts": [
                "track-top10.php"
              ],
              "select": {
                "exist": [
                  "s"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 5
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v1_lookup": {
      "fields": [
        {
          "name": "id_album",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "id_artist",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "id_imvdb",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "id_label",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "id_lyric",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 4
        },
        {
          "name": "id_track",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 5
        },
        {
          "name": "int_born_year",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 6
        },
        {
          "name": "int_cd",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 7
        },
        {
          "name": "int_charted",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 8
        },
        {
          "name": "int_died_year",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 9
        },
        {
          "name": "int_duration",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 10
        },
        {
          "name": "int_formed_year",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 11
        },
        {
          "name": "int_loved",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 12
        },
        {
          "name": "int_member",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 13
        },
        {
          "name": "int_music_vid_comment",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 14
        },
        {
          "name": "int_music_vid_dislike",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 15
        },
        {
          "name": "int_music_vid_favorite",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 16
        },
        {
          "name": "int_music_vid_like",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 17
        },
        {
          "name": "int_music_vid_view",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 18
        },
        {
          "name": "int_sale",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 19
        },
        {
          "name": "int_score",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 20
        },
        {
          "name": "int_score_vote",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 21
        },
        {
          "name": "int_total_listener",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 22
        },
        {
          "name": "int_total_play",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 23
        },
        {
          "name": "int_track_number",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 24
        },
        {
          "name": "int_year_released",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 25
        },
        {
          "name": "str_album",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 26
        },
        {
          "name": "str_album3_d_case",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 27
        },
        {
          "name": "str_album3_d_face",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 28
        },
        {
          "name": "str_album3_d_flat",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 29
        },
        {
          "name": "str_album3_d_thumb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 30
        },
        {
          "name": "str_album_c_dart",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 31
        },
        {
          "name": "str_album_spine",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 32
        },
        {
          "name": "str_album_stripped",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 33
        },
        {
          "name": "str_album_thumb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 34
        },
        {
          "name": "str_album_thumb_back",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 35
        },
        {
          "name": "str_album_thumb_hq",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 36
        },
        {
          "name": "str_all_music_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 37
        },
        {
          "name": "str_amazon_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 38
        },
        {
          "name": "str_apple_music",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 39
        },
        {
          "name": "str_artist",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 40
        },
        {
          "name": "str_artist_alternate",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 41
        },
        {
          "name": "str_artist_banner",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 42
        },
        {
          "name": "str_artist_clearart",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 43
        },
        {
          "name": "str_artist_cutout",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 44
        },
        {
          "name": "str_artist_fanart",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 45
        },
        {
          "name": "str_artist_fanart2",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 46
        },
        {
          "name": "str_artist_fanart3",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 47
        },
        {
          "name": "str_artist_fanart4",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 48
        },
        {
          "name": "str_artist_logo",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 49
        },
        {
          "name": "str_artist_stripped",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 50
        },
        {
          "name": "str_artist_thumb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 51
        },
        {
          "name": "str_artist_wide_thumb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 52
        },
        {
          "name": "str_bbc_review_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 53
        },
        {
          "name": "str_biography_cn",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 54
        },
        {
          "name": "str_biography_de",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 55
        },
        {
          "name": "str_biography_e",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 56
        },
        {
          "name": "str_biography_en",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 57
        },
        {
          "name": "str_biography_fr",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 58
        },
        {
          "name": "str_biography_hu",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 59
        },
        {
          "name": "str_biography_il",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 60
        },
        {
          "name": "str_biography_it",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 61
        },
        {
          "name": "str_biography_jp",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 62
        },
        {
          "name": "str_biography_nl",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 63
        },
        {
          "name": "str_biography_no",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 64
        },
        {
          "name": "str_biography_pl",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 65
        },
        {
          "name": "str_biography_pt",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 66
        },
        {
          "name": "str_biography_ru",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 67
        },
        {
          "name": "str_biography_se",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 68
        },
        {
          "name": "str_country",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 69
        },
        {
          "name": "str_country_code",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 70
        },
        {
          "name": "str_description_en",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 71
        },
        {
          "name": "str_disbanded",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 72
        },
        {
          "name": "str_discogs_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 73
        },
        {
          "name": "str_facebook",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 74
        },
        {
          "name": "str_gender",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 75
        },
        {
          "name": "str_genius_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 76
        },
        {
          "name": "str_genre",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 77
        },
        {
          "name": "str_instagram",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 78
        },
        {
          "name": "str_itunes_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 79
        },
        {
          "name": "str_label",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 80
        },
        {
          "name": "str_last_fm_chart",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 81
        },
        {
          "name": "str_location",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 82
        },
        {
          "name": "str_locked",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 83
        },
        {
          "name": "str_lyric_wiki_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 84
        },
        {
          "name": "str_mood",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 85
        },
        {
          "name": "str_music_brainz_album_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 86
        },
        {
          "name": "str_music_brainz_artist_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 87
        },
        {
          "name": "str_music_brainz_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 88
        },
        {
          "name": "str_music_moz_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 89
        },
        {
          "name": "str_music_vid",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 90
        },
        {
          "name": "str_music_vid_company",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 91
        },
        {
          "name": "str_music_vid_director",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 92
        },
        {
          "name": "str_music_vid_screen1",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 93
        },
        {
          "name": "str_music_vid_screen2",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 94
        },
        {
          "name": "str_music_vid_screen3",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 95
        },
        {
          "name": "str_rate_your_music_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 96
        },
        {
          "name": "str_release_format",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 97
        },
        {
          "name": "str_review",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 98
        },
        {
          "name": "str_sound_cloud",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 99
        },
        {
          "name": "str_speed",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 100
        },
        {
          "name": "str_spotify",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 101
        },
        {
          "name": "str_style",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 102
        },
        {
          "name": "str_theme",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 103
        },
        {
          "name": "str_track",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 104
        },
        {
          "name": "str_track_lyric",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 105
        },
        {
          "name": "str_track_thumb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 106
        },
        {
          "name": "str_twitter",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 107
        },
        {
          "name": "str_website",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 108
        },
        {
          "name": "str_wikidata_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 109
        },
        {
          "name": "str_wikipedia_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 110
        },
        {
          "name": "str_youtube",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 111
        }
      ],
      "name": "v1_lookup",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 32793500,
                    "kind": "query",
                    "name": "h",
                    "orig": "h",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 2115888,
                    "kind": "query",
                    "name": "m",
                    "orig": "m",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/track.php",
              "parts": [
                "track.php"
              ],
              "select": {
                "exist": [
                  "h",
                  "m"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "example": 112024,
                    "kind": "query",
                    "name": "i",
                    "orig": "i",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 2115888,
                    "kind": "query",
                    "name": "m",
                    "orig": "m",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/album.php",
              "parts": [
                "album.php"
              ],
              "select": {
                "exist": [
                  "i",
                  "m"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "query": [
                  {
                    "example": "1dc4c347-a1db-32aa-b14f-bc9cc507b843",
                    "kind": "query",
                    "name": "i",
                    "orig": "i",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/album-mb.php",
              "parts": [
                "album-mb.php"
              ],
              "select": {
                "exist": [
                  "i"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 2
            },
            {
              "args": {
                "query": [
                  {
                    "example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
                    "kind": "query",
                    "name": "i",
                    "orig": "i",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/artist-mb.php",
              "parts": [
                "artist-mb.php"
              ],
              "select": {
                "exist": [
                  "i"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 3
            },
            {
              "args": {
                "query": [
                  {
                    "example": 112024,
                    "kind": "query",
                    "name": "i",
                    "orig": "i",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/artist-social.php",
              "parts": [
                "artist-social.php"
              ],
              "select": {
                "exist": [
                  "i"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 4
            },
            {
              "args": {
                "query": [
                  {
                    "example": 112024,
                    "kind": "query",
                    "name": "i",
                    "orig": "i",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/artist.php",
              "parts": [
                "artist.php"
              ],
              "select": {
                "exist": [
                  "i"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 5
            },
            {
              "args": {
                "query": [
                  {
                    "example": "50369905-68ca-48d2-912d-b37330ff7dc3",
                    "kind": "query",
                    "name": "i",
                    "orig": "i",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/track-mb.php",
              "parts": [
                "track-mb.php"
              ],
              "select": {
                "exist": [
                  "i"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 6
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v1_search": {
      "fields": [
        {
          "name": "id_album",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "id_artist",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "id_imvdb",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "id_label",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "id_lyric",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 4
        },
        {
          "name": "id_track",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 5
        },
        {
          "name": "int_born_year",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 6
        },
        {
          "name": "int_cd",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 7
        },
        {
          "name": "int_charted",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 8
        },
        {
          "name": "int_died_year",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 9
        },
        {
          "name": "int_duration",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 10
        },
        {
          "name": "int_formed_year",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 11
        },
        {
          "name": "int_loved",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 12
        },
        {
          "name": "int_member",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 13
        },
        {
          "name": "int_music_vid_comment",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 14
        },
        {
          "name": "int_music_vid_dislike",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 15
        },
        {
          "name": "int_music_vid_favorite",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 16
        },
        {
          "name": "int_music_vid_like",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 17
        },
        {
          "name": "int_music_vid_view",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 18
        },
        {
          "name": "int_sale",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 19
        },
        {
          "name": "int_score",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 20
        },
        {
          "name": "int_score_vote",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 21
        },
        {
          "name": "int_total_listener",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 22
        },
        {
          "name": "int_total_play",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 23
        },
        {
          "name": "int_track_number",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 24
        },
        {
          "name": "int_year_released",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 25
        },
        {
          "name": "str_album",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 26
        },
        {
          "name": "str_album3_d_case",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 27
        },
        {
          "name": "str_album3_d_face",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 28
        },
        {
          "name": "str_album3_d_flat",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 29
        },
        {
          "name": "str_album3_d_thumb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 30
        },
        {
          "name": "str_album_c_dart",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 31
        },
        {
          "name": "str_album_spine",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 32
        },
        {
          "name": "str_album_stripped",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 33
        },
        {
          "name": "str_album_thumb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 34
        },
        {
          "name": "str_album_thumb_back",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 35
        },
        {
          "name": "str_album_thumb_hq",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 36
        },
        {
          "name": "str_all_music_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 37
        },
        {
          "name": "str_amazon_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 38
        },
        {
          "name": "str_artist",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 39
        },
        {
          "name": "str_artist_alternate",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 40
        },
        {
          "name": "str_artist_banner",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 41
        },
        {
          "name": "str_artist_clearart",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 42
        },
        {
          "name": "str_artist_cutout",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 43
        },
        {
          "name": "str_artist_fanart",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 44
        },
        {
          "name": "str_artist_fanart2",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 45
        },
        {
          "name": "str_artist_fanart3",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 46
        },
        {
          "name": "str_artist_fanart4",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 47
        },
        {
          "name": "str_artist_logo",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 48
        },
        {
          "name": "str_artist_stripped",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 49
        },
        {
          "name": "str_artist_thumb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 50
        },
        {
          "name": "str_artist_wide_thumb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 51
        },
        {
          "name": "str_bbc_review_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 52
        },
        {
          "name": "str_biography_cn",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 53
        },
        {
          "name": "str_biography_de",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 54
        },
        {
          "name": "str_biography_e",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 55
        },
        {
          "name": "str_biography_en",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 56
        },
        {
          "name": "str_biography_fr",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 57
        },
        {
          "name": "str_biography_hu",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 58
        },
        {
          "name": "str_biography_il",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 59
        },
        {
          "name": "str_biography_it",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 60
        },
        {
          "name": "str_biography_jp",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 61
        },
        {
          "name": "str_biography_nl",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 62
        },
        {
          "name": "str_biography_no",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 63
        },
        {
          "name": "str_biography_pl",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 64
        },
        {
          "name": "str_biography_pt",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 65
        },
        {
          "name": "str_biography_ru",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 66
        },
        {
          "name": "str_biography_se",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 67
        },
        {
          "name": "str_country",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 68
        },
        {
          "name": "str_country_code",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 69
        },
        {
          "name": "str_description_en",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 70
        },
        {
          "name": "str_disbanded",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 71
        },
        {
          "name": "str_discogs_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 72
        },
        {
          "name": "str_facebook",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 73
        },
        {
          "name": "str_gender",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 74
        },
        {
          "name": "str_genius_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 75
        },
        {
          "name": "str_genre",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 76
        },
        {
          "name": "str_itunes_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 77
        },
        {
          "name": "str_label",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 78
        },
        {
          "name": "str_last_fm_chart",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 79
        },
        {
          "name": "str_location",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 80
        },
        {
          "name": "str_locked",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 81
        },
        {
          "name": "str_lyric_wiki_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 82
        },
        {
          "name": "str_mood",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 83
        },
        {
          "name": "str_music_brainz_album_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 84
        },
        {
          "name": "str_music_brainz_artist_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 85
        },
        {
          "name": "str_music_brainz_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 86
        },
        {
          "name": "str_music_moz_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 87
        },
        {
          "name": "str_music_vid",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 88
        },
        {
          "name": "str_music_vid_company",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 89
        },
        {
          "name": "str_music_vid_director",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 90
        },
        {
          "name": "str_music_vid_screen1",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 91
        },
        {
          "name": "str_music_vid_screen2",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 92
        },
        {
          "name": "str_music_vid_screen3",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 93
        },
        {
          "name": "str_rate_your_music_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 94
        },
        {
          "name": "str_release_format",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 95
        },
        {
          "name": "str_review",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 96
        },
        {
          "name": "str_speed",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 97
        },
        {
          "name": "str_style",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 98
        },
        {
          "name": "str_theme",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 99
        },
        {
          "name": "str_track",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 100
        },
        {
          "name": "str_track_lyric",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 101
        },
        {
          "name": "str_track_thumb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 102
        },
        {
          "name": "str_twitter",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 103
        },
        {
          "name": "str_website",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 104
        },
        {
          "name": "str_wikidata_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 105
        },
        {
          "name": "str_wikipedia_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 106
        }
      ],
      "name": "v1_search",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "Homework",
                    "kind": "query",
                    "name": "a",
                    "orig": "a",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "daft_punk",
                    "kind": "query",
                    "name": "s",
                    "orig": "s",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/searchalbum.php",
              "parts": [
                "searchalbum.php"
              ],
              "select": {
                "exist": [
                  "a",
                  "s"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "example": "coldplay",
                    "kind": "query",
                    "name": "s",
                    "orig": "s",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "yellow",
                    "kind": "query",
                    "name": "t",
                    "orig": "t",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/searchtrack.php",
              "parts": [
                "searchtrack.php"
              ],
              "select": {
                "exist": [
                  "s",
                  "t"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "s",
                    "orig": "s",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/discography-mb.php",
              "parts": [
                "discography-mb.php"
              ],
              "select": {
                "exist": [
                  "s"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 2
            },
            {
              "args": {
                "query": [
                  {
                    "example": "coldplay",
                    "kind": "query",
                    "name": "s",
                    "orig": "s",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/discography.php",
              "parts": [
                "discography.php"
              ],
              "select": {
                "exist": [
                  "s"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 3
            },
            {
              "args": {
                "query": [
                  {
                    "example": "coldplay",
                    "kind": "query",
                    "name": "s",
                    "orig": "s",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/search.php",
              "parts": [
                "search.php"
              ],
              "select": {
                "exist": [
                  "s"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 4
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v2_list": {
      "fields": [
        {
          "name": "album",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        }
      ],
      "name": "v2_list",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 111239,
                    "kind": "param",
                    "name": "artist_id",
                    "orig": "artist_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/list/discography/{artistId}",
              "parts": [
                "list",
                "discography",
                "{artist_id}"
              ],
              "rename": {
                "param": {
                  "artistId": "artist_id"
                }
              },
              "select": {
                "exist": [
                  "artist_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "discography"
          ]
        ]
      }
    },
    "v2_lookup": {
      "fields": [
        {
          "name": "album",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "artist",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "track",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "v2_lookup",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 2109615,
                    "kind": "param",
                    "name": "album_id",
                    "orig": "album_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/lookup/album/{albumId}",
              "parts": [
                "lookup",
                "album",
                "{album_id}"
              ],
              "rename": {
                "param": {
                  "albumId": "album_id"
                }
              },
              "select": {
                "exist": [
                  "album_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "params": [
                  {
                    "example": 111239,
                    "kind": "param",
                    "name": "artist_id",
                    "orig": "artist_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/lookup/artist/{artistId}",
              "parts": [
                "lookup",
                "artist",
                "{artist_id}"
              ],
              "rename": {
                "param": {
                  "artistId": "artist_id"
                }
              },
              "select": {
                "exist": [
                  "artist_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "params": [
                  {
                    "example": "1dc4c347-a1db-32aa-b14f-bc9cc507b843",
                    "kind": "param",
                    "name": "music_brainz_id",
                    "orig": "music_brainz_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/lookup/album_mb/{musicBrainzId}",
              "parts": [
                "lookup",
                "album_mb",
                "{music_brainz_id}"
              ],
              "rename": {
                "param": {
                  "musicBrainzId": "music_brainz_id"
                }
              },
              "select": {
                "exist": [
                  "music_brainz_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 2
            },
            {
              "args": {
                "params": [
                  {
                    "example": "cc197bad-dc9c-440d-a5b5-d52ba2e14234",
                    "kind": "param",
                    "name": "music_brainz_id",
                    "orig": "music_brainz_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/lookup/artist_mb/{musicBrainzId}",
              "parts": [
                "lookup",
                "artist_mb",
                "{music_brainz_id}"
              ],
              "rename": {
                "param": {
                  "musicBrainzId": "music_brainz_id"
                }
              },
              "select": {
                "exist": [
                  "music_brainz_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 3
            },
            {
              "args": {
                "params": [
                  {
                    "example": "50369905-68ca-48d2-912d-b37330ff7dc3",
                    "kind": "param",
                    "name": "music_brainz_id",
                    "orig": "music_brainz_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/lookup/track_mb/{musicBrainzId}",
              "parts": [
                "lookup",
                "track_mb",
                "{music_brainz_id}"
              ],
              "rename": {
                "param": {
                  "musicBrainzId": "music_brainz_id"
                }
              },
              "select": {
                "exist": [
                  "music_brainz_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 4
            },
            {
              "args": {
                "params": [
                  {
                    "example": 32724183,
                    "kind": "param",
                    "name": "track_id",
                    "orig": "track_id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/lookup/track/{trackId}",
              "parts": [
                "lookup",
                "track",
                "{track_id}"
              ],
              "rename": {
                "param": {
                  "trackId": "track_id"
                }
              },
              "select": {
                "exist": [
                  "track_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 5
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "album"
          ],
          [
            "album_mb"
          ],
          [
            "artist"
          ],
          [
            "artist_mb"
          ],
          [
            "track"
          ],
          [
            "track_mb"
          ]
        ]
      }
    },
    "v2_search": {
      "fields": [
        {
          "name": "album",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "artist",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "track",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "v2_search",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "parachutes",
                    "kind": "param",
                    "name": "album_name",
                    "orig": "album_name",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/search/album/{albumName}",
              "parts": [
                "search",
                "album",
                "{album_name}"
              ],
              "rename": {
                "param": {
                  "albumName": "album_name"
                }
              },
              "select": {
                "exist": [
                  "album_name"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "params": [
                  {
                    "example": "coldplay",
                    "kind": "param",
                    "name": "artist_name",
                    "orig": "artist_name",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/search/artist/{artistName}",
              "parts": [
                "search",
                "artist",
                "{artist_name}"
              ],
              "rename": {
                "param": {
                  "artistName": "artist_name"
                }
              },
              "select": {
                "exist": [
                  "artist_name"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "params": [
                  {
                    "example": "yellow",
                    "kind": "param",
                    "name": "track_name",
                    "orig": "track_name",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/search/track/{trackName}",
              "parts": [
                "search",
                "track",
                "{track_name}"
              ],
              "rename": {
                "param": {
                  "trackName": "track_name"
                }
              },
              "select": {
                "exist": [
                  "track_name"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 2
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "album"
          ],
          [
            "artist"
          ],
          [
            "track"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

