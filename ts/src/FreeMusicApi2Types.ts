// Typed models for the FreeMusicApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface V1List {
  id_album?: number
  id_artist?: number
  id_imvdb?: number
  id_lyric?: number
  id_track?: number
  int_cd?: number
  int_duration?: number
  int_loved?: number
  int_music_vid_comment?: number
  int_music_vid_dislike?: number
  int_music_vid_favorite?: number
  int_music_vid_like?: number
  int_music_vid_view?: number
  int_score?: number
  int_score_vote?: number
  int_total_listener?: number
  int_total_play?: number
  int_track_number?: number
  loved?: any[]
  str_album?: string
  str_artist?: string
  str_artist_alternate?: string
  str_description_en?: string
  str_genre?: string
  str_locked?: string
  str_mood?: string
  str_music_brainz_album_id?: string
  str_music_brainz_artist_id?: string
  str_music_brainz_id?: string
  str_music_vid?: string
  str_music_vid_company?: string
  str_music_vid_director?: string
  str_music_vid_screen1?: string
  str_music_vid_screen2?: string
  str_music_vid_screen3?: string
  str_style?: string
  str_theme?: string
  str_track?: string
  str_track_lyric?: string
  str_track_thumb?: string
  trending?: any[]
}

export type V1ListListMatch = Partial<V1List>

export interface V1Lookup {
  id_album?: number
  id_artist?: number
  id_imvdb?: number
  id_label?: number
  id_lyric?: number
  id_track?: number
  int_born_year?: number
  int_cd?: number
  int_charted?: number
  int_died_year?: number
  int_duration?: number
  int_formed_year?: number
  int_loved?: number
  int_member?: number
  int_music_vid_comment?: number
  int_music_vid_dislike?: number
  int_music_vid_favorite?: number
  int_music_vid_like?: number
  int_music_vid_view?: number
  int_sale?: number
  int_score?: number
  int_score_vote?: number
  int_total_listener?: number
  int_total_play?: number
  int_track_number?: number
  int_year_released?: number
  str_album?: string
  str_album3_d_case?: string
  str_album3_d_face?: string
  str_album3_d_flat?: string
  str_album3_d_thumb?: string
  str_album_c_dart?: string
  str_album_spine?: string
  str_album_stripped?: string
  str_album_thumb?: string
  str_album_thumb_back?: string
  str_album_thumb_hq?: string
  str_all_music_id?: string
  str_amazon_id?: string
  str_apple_music?: string
  str_artist?: string
  str_artist_alternate?: string
  str_artist_banner?: string
  str_artist_clearart?: string
  str_artist_cutout?: string
  str_artist_fanart?: string
  str_artist_fanart2?: string
  str_artist_fanart3?: string
  str_artist_fanart4?: string
  str_artist_logo?: string
  str_artist_stripped?: string
  str_artist_thumb?: string
  str_artist_wide_thumb?: string
  str_bbc_review_id?: string
  str_biography_cn?: string
  str_biography_de?: string
  str_biography_e?: string
  str_biography_en?: string
  str_biography_fr?: string
  str_biography_hu?: string
  str_biography_il?: string
  str_biography_it?: string
  str_biography_jp?: string
  str_biography_nl?: string
  str_biography_no?: string
  str_biography_pl?: string
  str_biography_pt?: string
  str_biography_ru?: string
  str_biography_se?: string
  str_country?: string
  str_country_code?: string
  str_description_en?: string
  str_disbanded?: string
  str_discogs_id?: string
  str_facebook?: string
  str_gender?: string
  str_genius_id?: string
  str_genre?: string
  str_instagram?: string
  str_itunes_id?: string
  str_label?: string
  str_last_fm_chart?: string
  str_location?: string
  str_locked?: string
  str_lyric_wiki_id?: string
  str_mood?: string
  str_music_brainz_album_id?: string
  str_music_brainz_artist_id?: string
  str_music_brainz_id?: string
  str_music_moz_id?: string
  str_music_vid?: string
  str_music_vid_company?: string
  str_music_vid_director?: string
  str_music_vid_screen1?: string
  str_music_vid_screen2?: string
  str_music_vid_screen3?: string
  str_rate_your_music_id?: string
  str_release_format?: string
  str_review?: string
  str_sound_cloud?: string
  str_speed?: string
  str_spotify?: string
  str_style?: string
  str_theme?: string
  str_track?: string
  str_track_lyric?: string
  str_track_thumb?: string
  str_twitter?: string
  str_website?: string
  str_wikidata_id?: string
  str_wikipedia_id?: string
  str_youtube?: string
}

export type V1LookupListMatch = Partial<V1Lookup>

export interface V1Search {
  id_album?: number
  id_artist?: number
  id_imvdb?: number
  id_label?: number
  id_lyric?: number
  id_track?: number
  int_born_year?: number
  int_cd?: number
  int_charted?: number
  int_died_year?: number
  int_duration?: number
  int_formed_year?: number
  int_loved?: number
  int_member?: number
  int_music_vid_comment?: number
  int_music_vid_dislike?: number
  int_music_vid_favorite?: number
  int_music_vid_like?: number
  int_music_vid_view?: number
  int_sale?: number
  int_score?: number
  int_score_vote?: number
  int_total_listener?: number
  int_total_play?: number
  int_track_number?: number
  int_year_released?: number
  str_album?: string
  str_album3_d_case?: string
  str_album3_d_face?: string
  str_album3_d_flat?: string
  str_album3_d_thumb?: string
  str_album_c_dart?: string
  str_album_spine?: string
  str_album_stripped?: string
  str_album_thumb?: string
  str_album_thumb_back?: string
  str_album_thumb_hq?: string
  str_all_music_id?: string
  str_amazon_id?: string
  str_artist?: string
  str_artist_alternate?: string
  str_artist_banner?: string
  str_artist_clearart?: string
  str_artist_cutout?: string
  str_artist_fanart?: string
  str_artist_fanart2?: string
  str_artist_fanart3?: string
  str_artist_fanart4?: string
  str_artist_logo?: string
  str_artist_stripped?: string
  str_artist_thumb?: string
  str_artist_wide_thumb?: string
  str_bbc_review_id?: string
  str_biography_cn?: string
  str_biography_de?: string
  str_biography_e?: string
  str_biography_en?: string
  str_biography_fr?: string
  str_biography_hu?: string
  str_biography_il?: string
  str_biography_it?: string
  str_biography_jp?: string
  str_biography_nl?: string
  str_biography_no?: string
  str_biography_pl?: string
  str_biography_pt?: string
  str_biography_ru?: string
  str_biography_se?: string
  str_country?: string
  str_country_code?: string
  str_description_en?: string
  str_disbanded?: string
  str_discogs_id?: string
  str_facebook?: string
  str_gender?: string
  str_genius_id?: string
  str_genre?: string
  str_itunes_id?: string
  str_label?: string
  str_last_fm_chart?: string
  str_location?: string
  str_locked?: string
  str_lyric_wiki_id?: string
  str_mood?: string
  str_music_brainz_album_id?: string
  str_music_brainz_artist_id?: string
  str_music_brainz_id?: string
  str_music_moz_id?: string
  str_music_vid?: string
  str_music_vid_company?: string
  str_music_vid_director?: string
  str_music_vid_screen1?: string
  str_music_vid_screen2?: string
  str_music_vid_screen3?: string
  str_rate_your_music_id?: string
  str_release_format?: string
  str_review?: string
  str_speed?: string
  str_style?: string
  str_theme?: string
  str_track?: string
  str_track_lyric?: string
  str_track_thumb?: string
  str_twitter?: string
  str_website?: string
  str_wikidata_id?: string
  str_wikipedia_id?: string
}

export type V1SearchListMatch = Partial<V1Search>

export interface V2List {
  album?: any[]
}

export interface V2ListLoadMatch {
  artist_id: number
}

export interface V2Lookup {
  album?: any[]
  artist?: any[]
  track?: any[]
}

export interface V2LookupLoadMatch {
  album_id: number
  artist_id: number
  music_brainz_id: string
  track_id: number
}

export interface V2Search {
  album?: any[]
  artist?: any[]
  track?: any[]
}

export interface V2SearchLoadMatch {
  album_name: string
  artist_name: string
  track_name: string
}

