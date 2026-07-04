# frozen_string_literal: true

# Typed models for the FreeMusicApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# V1List entity data model.
#
# @!attribute [rw] id_album
#   @return [Integer, nil]
#
# @!attribute [rw] id_artist
#   @return [Integer, nil]
#
# @!attribute [rw] id_imvdb
#   @return [Integer, nil]
#
# @!attribute [rw] id_lyric
#   @return [Integer, nil]
#
# @!attribute [rw] id_track
#   @return [Integer, nil]
#
# @!attribute [rw] int_cd
#   @return [Integer, nil]
#
# @!attribute [rw] int_duration
#   @return [Integer, nil]
#
# @!attribute [rw] int_loved
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_comment
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_dislike
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_favorite
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_like
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_view
#   @return [Integer, nil]
#
# @!attribute [rw] int_score
#   @return [Integer, nil]
#
# @!attribute [rw] int_score_vote
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_listener
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_play
#   @return [Integer, nil]
#
# @!attribute [rw] int_track_number
#   @return [Integer, nil]
#
# @!attribute [rw] loved
#   @return [Array, nil]
#
# @!attribute [rw] str_album
#   @return [String, nil]
#
# @!attribute [rw] str_artist
#   @return [String, nil]
#
# @!attribute [rw] str_artist_alternate
#   @return [String, nil]
#
# @!attribute [rw] str_description_en
#   @return [String, nil]
#
# @!attribute [rw] str_genre
#   @return [String, nil]
#
# @!attribute [rw] str_locked
#   @return [String, nil]
#
# @!attribute [rw] str_mood
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_album_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_artist_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_company
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_director
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen1
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen2
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen3
#   @return [String, nil]
#
# @!attribute [rw] str_style
#   @return [String, nil]
#
# @!attribute [rw] str_theme
#   @return [String, nil]
#
# @!attribute [rw] str_track
#   @return [String, nil]
#
# @!attribute [rw] str_track_lyric
#   @return [String, nil]
#
# @!attribute [rw] str_track_thumb
#   @return [String, nil]
#
# @!attribute [rw] trending
#   @return [Array, nil]
V1List = Struct.new(
  :id_album,
  :id_artist,
  :id_imvdb,
  :id_lyric,
  :id_track,
  :int_cd,
  :int_duration,
  :int_loved,
  :int_music_vid_comment,
  :int_music_vid_dislike,
  :int_music_vid_favorite,
  :int_music_vid_like,
  :int_music_vid_view,
  :int_score,
  :int_score_vote,
  :int_total_listener,
  :int_total_play,
  :int_track_number,
  :loved,
  :str_album,
  :str_artist,
  :str_artist_alternate,
  :str_description_en,
  :str_genre,
  :str_locked,
  :str_mood,
  :str_music_brainz_album_id,
  :str_music_brainz_artist_id,
  :str_music_brainz_id,
  :str_music_vid,
  :str_music_vid_company,
  :str_music_vid_director,
  :str_music_vid_screen1,
  :str_music_vid_screen2,
  :str_music_vid_screen3,
  :str_style,
  :str_theme,
  :str_track,
  :str_track_lyric,
  :str_track_thumb,
  :trending,
  keyword_init: true
)

# Match filter for V1List#list (any subset of V1List fields).
#
# @!attribute [rw] id_album
#   @return [Integer, nil]
#
# @!attribute [rw] id_artist
#   @return [Integer, nil]
#
# @!attribute [rw] id_imvdb
#   @return [Integer, nil]
#
# @!attribute [rw] id_lyric
#   @return [Integer, nil]
#
# @!attribute [rw] id_track
#   @return [Integer, nil]
#
# @!attribute [rw] int_cd
#   @return [Integer, nil]
#
# @!attribute [rw] int_duration
#   @return [Integer, nil]
#
# @!attribute [rw] int_loved
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_comment
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_dislike
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_favorite
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_like
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_view
#   @return [Integer, nil]
#
# @!attribute [rw] int_score
#   @return [Integer, nil]
#
# @!attribute [rw] int_score_vote
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_listener
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_play
#   @return [Integer, nil]
#
# @!attribute [rw] int_track_number
#   @return [Integer, nil]
#
# @!attribute [rw] loved
#   @return [Array, nil]
#
# @!attribute [rw] str_album
#   @return [String, nil]
#
# @!attribute [rw] str_artist
#   @return [String, nil]
#
# @!attribute [rw] str_artist_alternate
#   @return [String, nil]
#
# @!attribute [rw] str_description_en
#   @return [String, nil]
#
# @!attribute [rw] str_genre
#   @return [String, nil]
#
# @!attribute [rw] str_locked
#   @return [String, nil]
#
# @!attribute [rw] str_mood
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_album_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_artist_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_company
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_director
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen1
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen2
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen3
#   @return [String, nil]
#
# @!attribute [rw] str_style
#   @return [String, nil]
#
# @!attribute [rw] str_theme
#   @return [String, nil]
#
# @!attribute [rw] str_track
#   @return [String, nil]
#
# @!attribute [rw] str_track_lyric
#   @return [String, nil]
#
# @!attribute [rw] str_track_thumb
#   @return [String, nil]
#
# @!attribute [rw] trending
#   @return [Array, nil]
V1ListListMatch = Struct.new(
  :id_album,
  :id_artist,
  :id_imvdb,
  :id_lyric,
  :id_track,
  :int_cd,
  :int_duration,
  :int_loved,
  :int_music_vid_comment,
  :int_music_vid_dislike,
  :int_music_vid_favorite,
  :int_music_vid_like,
  :int_music_vid_view,
  :int_score,
  :int_score_vote,
  :int_total_listener,
  :int_total_play,
  :int_track_number,
  :loved,
  :str_album,
  :str_artist,
  :str_artist_alternate,
  :str_description_en,
  :str_genre,
  :str_locked,
  :str_mood,
  :str_music_brainz_album_id,
  :str_music_brainz_artist_id,
  :str_music_brainz_id,
  :str_music_vid,
  :str_music_vid_company,
  :str_music_vid_director,
  :str_music_vid_screen1,
  :str_music_vid_screen2,
  :str_music_vid_screen3,
  :str_style,
  :str_theme,
  :str_track,
  :str_track_lyric,
  :str_track_thumb,
  :trending,
  keyword_init: true
)

# V1Lookup entity data model.
#
# @!attribute [rw] id_album
#   @return [Integer, nil]
#
# @!attribute [rw] id_artist
#   @return [Integer, nil]
#
# @!attribute [rw] id_imvdb
#   @return [Integer, nil]
#
# @!attribute [rw] id_label
#   @return [Integer, nil]
#
# @!attribute [rw] id_lyric
#   @return [Integer, nil]
#
# @!attribute [rw] id_track
#   @return [Integer, nil]
#
# @!attribute [rw] int_born_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_cd
#   @return [Integer, nil]
#
# @!attribute [rw] int_charted
#   @return [Integer, nil]
#
# @!attribute [rw] int_died_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_duration
#   @return [Integer, nil]
#
# @!attribute [rw] int_formed_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_loved
#   @return [Integer, nil]
#
# @!attribute [rw] int_member
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_comment
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_dislike
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_favorite
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_like
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_view
#   @return [Integer, nil]
#
# @!attribute [rw] int_sale
#   @return [Integer, nil]
#
# @!attribute [rw] int_score
#   @return [Integer, nil]
#
# @!attribute [rw] int_score_vote
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_listener
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_play
#   @return [Integer, nil]
#
# @!attribute [rw] int_track_number
#   @return [Integer, nil]
#
# @!attribute [rw] int_year_released
#   @return [Integer, nil]
#
# @!attribute [rw] str_album
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_case
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_face
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_flat
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_album_c_dart
#   @return [String, nil]
#
# @!attribute [rw] str_album_spine
#   @return [String, nil]
#
# @!attribute [rw] str_album_stripped
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb_back
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb_hq
#   @return [String, nil]
#
# @!attribute [rw] str_all_music_id
#   @return [String, nil]
#
# @!attribute [rw] str_amazon_id
#   @return [String, nil]
#
# @!attribute [rw] str_apple_music
#   @return [String, nil]
#
# @!attribute [rw] str_artist
#   @return [String, nil]
#
# @!attribute [rw] str_artist_alternate
#   @return [String, nil]
#
# @!attribute [rw] str_artist_banner
#   @return [String, nil]
#
# @!attribute [rw] str_artist_clearart
#   @return [String, nil]
#
# @!attribute [rw] str_artist_cutout
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart2
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart3
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart4
#   @return [String, nil]
#
# @!attribute [rw] str_artist_logo
#   @return [String, nil]
#
# @!attribute [rw] str_artist_stripped
#   @return [String, nil]
#
# @!attribute [rw] str_artist_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_artist_wide_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_bbc_review_id
#   @return [String, nil]
#
# @!attribute [rw] str_biography_cn
#   @return [String, nil]
#
# @!attribute [rw] str_biography_de
#   @return [String, nil]
#
# @!attribute [rw] str_biography_e
#   @return [String, nil]
#
# @!attribute [rw] str_biography_en
#   @return [String, nil]
#
# @!attribute [rw] str_biography_fr
#   @return [String, nil]
#
# @!attribute [rw] str_biography_hu
#   @return [String, nil]
#
# @!attribute [rw] str_biography_il
#   @return [String, nil]
#
# @!attribute [rw] str_biography_it
#   @return [String, nil]
#
# @!attribute [rw] str_biography_jp
#   @return [String, nil]
#
# @!attribute [rw] str_biography_nl
#   @return [String, nil]
#
# @!attribute [rw] str_biography_no
#   @return [String, nil]
#
# @!attribute [rw] str_biography_pl
#   @return [String, nil]
#
# @!attribute [rw] str_biography_pt
#   @return [String, nil]
#
# @!attribute [rw] str_biography_ru
#   @return [String, nil]
#
# @!attribute [rw] str_biography_se
#   @return [String, nil]
#
# @!attribute [rw] str_country
#   @return [String, nil]
#
# @!attribute [rw] str_country_code
#   @return [String, nil]
#
# @!attribute [rw] str_description_en
#   @return [String, nil]
#
# @!attribute [rw] str_disbanded
#   @return [String, nil]
#
# @!attribute [rw] str_discogs_id
#   @return [String, nil]
#
# @!attribute [rw] str_facebook
#   @return [String, nil]
#
# @!attribute [rw] str_gender
#   @return [String, nil]
#
# @!attribute [rw] str_genius_id
#   @return [String, nil]
#
# @!attribute [rw] str_genre
#   @return [String, nil]
#
# @!attribute [rw] str_instagram
#   @return [String, nil]
#
# @!attribute [rw] str_itunes_id
#   @return [String, nil]
#
# @!attribute [rw] str_label
#   @return [String, nil]
#
# @!attribute [rw] str_last_fm_chart
#   @return [String, nil]
#
# @!attribute [rw] str_location
#   @return [String, nil]
#
# @!attribute [rw] str_locked
#   @return [String, nil]
#
# @!attribute [rw] str_lyric_wiki_id
#   @return [String, nil]
#
# @!attribute [rw] str_mood
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_album_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_artist_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_moz_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_company
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_director
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen1
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen2
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen3
#   @return [String, nil]
#
# @!attribute [rw] str_rate_your_music_id
#   @return [String, nil]
#
# @!attribute [rw] str_release_format
#   @return [String, nil]
#
# @!attribute [rw] str_review
#   @return [String, nil]
#
# @!attribute [rw] str_sound_cloud
#   @return [String, nil]
#
# @!attribute [rw] str_speed
#   @return [String, nil]
#
# @!attribute [rw] str_spotify
#   @return [String, nil]
#
# @!attribute [rw] str_style
#   @return [String, nil]
#
# @!attribute [rw] str_theme
#   @return [String, nil]
#
# @!attribute [rw] str_track
#   @return [String, nil]
#
# @!attribute [rw] str_track_lyric
#   @return [String, nil]
#
# @!attribute [rw] str_track_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_twitter
#   @return [String, nil]
#
# @!attribute [rw] str_website
#   @return [String, nil]
#
# @!attribute [rw] str_wikidata_id
#   @return [String, nil]
#
# @!attribute [rw] str_wikipedia_id
#   @return [String, nil]
#
# @!attribute [rw] str_youtube
#   @return [String, nil]
V1Lookup = Struct.new(
  :id_album,
  :id_artist,
  :id_imvdb,
  :id_label,
  :id_lyric,
  :id_track,
  :int_born_year,
  :int_cd,
  :int_charted,
  :int_died_year,
  :int_duration,
  :int_formed_year,
  :int_loved,
  :int_member,
  :int_music_vid_comment,
  :int_music_vid_dislike,
  :int_music_vid_favorite,
  :int_music_vid_like,
  :int_music_vid_view,
  :int_sale,
  :int_score,
  :int_score_vote,
  :int_total_listener,
  :int_total_play,
  :int_track_number,
  :int_year_released,
  :str_album,
  :str_album3_d_case,
  :str_album3_d_face,
  :str_album3_d_flat,
  :str_album3_d_thumb,
  :str_album_c_dart,
  :str_album_spine,
  :str_album_stripped,
  :str_album_thumb,
  :str_album_thumb_back,
  :str_album_thumb_hq,
  :str_all_music_id,
  :str_amazon_id,
  :str_apple_music,
  :str_artist,
  :str_artist_alternate,
  :str_artist_banner,
  :str_artist_clearart,
  :str_artist_cutout,
  :str_artist_fanart,
  :str_artist_fanart2,
  :str_artist_fanart3,
  :str_artist_fanart4,
  :str_artist_logo,
  :str_artist_stripped,
  :str_artist_thumb,
  :str_artist_wide_thumb,
  :str_bbc_review_id,
  :str_biography_cn,
  :str_biography_de,
  :str_biography_e,
  :str_biography_en,
  :str_biography_fr,
  :str_biography_hu,
  :str_biography_il,
  :str_biography_it,
  :str_biography_jp,
  :str_biography_nl,
  :str_biography_no,
  :str_biography_pl,
  :str_biography_pt,
  :str_biography_ru,
  :str_biography_se,
  :str_country,
  :str_country_code,
  :str_description_en,
  :str_disbanded,
  :str_discogs_id,
  :str_facebook,
  :str_gender,
  :str_genius_id,
  :str_genre,
  :str_instagram,
  :str_itunes_id,
  :str_label,
  :str_last_fm_chart,
  :str_location,
  :str_locked,
  :str_lyric_wiki_id,
  :str_mood,
  :str_music_brainz_album_id,
  :str_music_brainz_artist_id,
  :str_music_brainz_id,
  :str_music_moz_id,
  :str_music_vid,
  :str_music_vid_company,
  :str_music_vid_director,
  :str_music_vid_screen1,
  :str_music_vid_screen2,
  :str_music_vid_screen3,
  :str_rate_your_music_id,
  :str_release_format,
  :str_review,
  :str_sound_cloud,
  :str_speed,
  :str_spotify,
  :str_style,
  :str_theme,
  :str_track,
  :str_track_lyric,
  :str_track_thumb,
  :str_twitter,
  :str_website,
  :str_wikidata_id,
  :str_wikipedia_id,
  :str_youtube,
  keyword_init: true
)

# Match filter for V1Lookup#list (any subset of V1Lookup fields).
#
# @!attribute [rw] id_album
#   @return [Integer, nil]
#
# @!attribute [rw] id_artist
#   @return [Integer, nil]
#
# @!attribute [rw] id_imvdb
#   @return [Integer, nil]
#
# @!attribute [rw] id_label
#   @return [Integer, nil]
#
# @!attribute [rw] id_lyric
#   @return [Integer, nil]
#
# @!attribute [rw] id_track
#   @return [Integer, nil]
#
# @!attribute [rw] int_born_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_cd
#   @return [Integer, nil]
#
# @!attribute [rw] int_charted
#   @return [Integer, nil]
#
# @!attribute [rw] int_died_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_duration
#   @return [Integer, nil]
#
# @!attribute [rw] int_formed_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_loved
#   @return [Integer, nil]
#
# @!attribute [rw] int_member
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_comment
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_dislike
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_favorite
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_like
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_view
#   @return [Integer, nil]
#
# @!attribute [rw] int_sale
#   @return [Integer, nil]
#
# @!attribute [rw] int_score
#   @return [Integer, nil]
#
# @!attribute [rw] int_score_vote
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_listener
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_play
#   @return [Integer, nil]
#
# @!attribute [rw] int_track_number
#   @return [Integer, nil]
#
# @!attribute [rw] int_year_released
#   @return [Integer, nil]
#
# @!attribute [rw] str_album
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_case
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_face
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_flat
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_album_c_dart
#   @return [String, nil]
#
# @!attribute [rw] str_album_spine
#   @return [String, nil]
#
# @!attribute [rw] str_album_stripped
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb_back
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb_hq
#   @return [String, nil]
#
# @!attribute [rw] str_all_music_id
#   @return [String, nil]
#
# @!attribute [rw] str_amazon_id
#   @return [String, nil]
#
# @!attribute [rw] str_apple_music
#   @return [String, nil]
#
# @!attribute [rw] str_artist
#   @return [String, nil]
#
# @!attribute [rw] str_artist_alternate
#   @return [String, nil]
#
# @!attribute [rw] str_artist_banner
#   @return [String, nil]
#
# @!attribute [rw] str_artist_clearart
#   @return [String, nil]
#
# @!attribute [rw] str_artist_cutout
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart2
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart3
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart4
#   @return [String, nil]
#
# @!attribute [rw] str_artist_logo
#   @return [String, nil]
#
# @!attribute [rw] str_artist_stripped
#   @return [String, nil]
#
# @!attribute [rw] str_artist_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_artist_wide_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_bbc_review_id
#   @return [String, nil]
#
# @!attribute [rw] str_biography_cn
#   @return [String, nil]
#
# @!attribute [rw] str_biography_de
#   @return [String, nil]
#
# @!attribute [rw] str_biography_e
#   @return [String, nil]
#
# @!attribute [rw] str_biography_en
#   @return [String, nil]
#
# @!attribute [rw] str_biography_fr
#   @return [String, nil]
#
# @!attribute [rw] str_biography_hu
#   @return [String, nil]
#
# @!attribute [rw] str_biography_il
#   @return [String, nil]
#
# @!attribute [rw] str_biography_it
#   @return [String, nil]
#
# @!attribute [rw] str_biography_jp
#   @return [String, nil]
#
# @!attribute [rw] str_biography_nl
#   @return [String, nil]
#
# @!attribute [rw] str_biography_no
#   @return [String, nil]
#
# @!attribute [rw] str_biography_pl
#   @return [String, nil]
#
# @!attribute [rw] str_biography_pt
#   @return [String, nil]
#
# @!attribute [rw] str_biography_ru
#   @return [String, nil]
#
# @!attribute [rw] str_biography_se
#   @return [String, nil]
#
# @!attribute [rw] str_country
#   @return [String, nil]
#
# @!attribute [rw] str_country_code
#   @return [String, nil]
#
# @!attribute [rw] str_description_en
#   @return [String, nil]
#
# @!attribute [rw] str_disbanded
#   @return [String, nil]
#
# @!attribute [rw] str_discogs_id
#   @return [String, nil]
#
# @!attribute [rw] str_facebook
#   @return [String, nil]
#
# @!attribute [rw] str_gender
#   @return [String, nil]
#
# @!attribute [rw] str_genius_id
#   @return [String, nil]
#
# @!attribute [rw] str_genre
#   @return [String, nil]
#
# @!attribute [rw] str_instagram
#   @return [String, nil]
#
# @!attribute [rw] str_itunes_id
#   @return [String, nil]
#
# @!attribute [rw] str_label
#   @return [String, nil]
#
# @!attribute [rw] str_last_fm_chart
#   @return [String, nil]
#
# @!attribute [rw] str_location
#   @return [String, nil]
#
# @!attribute [rw] str_locked
#   @return [String, nil]
#
# @!attribute [rw] str_lyric_wiki_id
#   @return [String, nil]
#
# @!attribute [rw] str_mood
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_album_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_artist_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_moz_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_company
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_director
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen1
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen2
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen3
#   @return [String, nil]
#
# @!attribute [rw] str_rate_your_music_id
#   @return [String, nil]
#
# @!attribute [rw] str_release_format
#   @return [String, nil]
#
# @!attribute [rw] str_review
#   @return [String, nil]
#
# @!attribute [rw] str_sound_cloud
#   @return [String, nil]
#
# @!attribute [rw] str_speed
#   @return [String, nil]
#
# @!attribute [rw] str_spotify
#   @return [String, nil]
#
# @!attribute [rw] str_style
#   @return [String, nil]
#
# @!attribute [rw] str_theme
#   @return [String, nil]
#
# @!attribute [rw] str_track
#   @return [String, nil]
#
# @!attribute [rw] str_track_lyric
#   @return [String, nil]
#
# @!attribute [rw] str_track_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_twitter
#   @return [String, nil]
#
# @!attribute [rw] str_website
#   @return [String, nil]
#
# @!attribute [rw] str_wikidata_id
#   @return [String, nil]
#
# @!attribute [rw] str_wikipedia_id
#   @return [String, nil]
#
# @!attribute [rw] str_youtube
#   @return [String, nil]
V1LookupListMatch = Struct.new(
  :id_album,
  :id_artist,
  :id_imvdb,
  :id_label,
  :id_lyric,
  :id_track,
  :int_born_year,
  :int_cd,
  :int_charted,
  :int_died_year,
  :int_duration,
  :int_formed_year,
  :int_loved,
  :int_member,
  :int_music_vid_comment,
  :int_music_vid_dislike,
  :int_music_vid_favorite,
  :int_music_vid_like,
  :int_music_vid_view,
  :int_sale,
  :int_score,
  :int_score_vote,
  :int_total_listener,
  :int_total_play,
  :int_track_number,
  :int_year_released,
  :str_album,
  :str_album3_d_case,
  :str_album3_d_face,
  :str_album3_d_flat,
  :str_album3_d_thumb,
  :str_album_c_dart,
  :str_album_spine,
  :str_album_stripped,
  :str_album_thumb,
  :str_album_thumb_back,
  :str_album_thumb_hq,
  :str_all_music_id,
  :str_amazon_id,
  :str_apple_music,
  :str_artist,
  :str_artist_alternate,
  :str_artist_banner,
  :str_artist_clearart,
  :str_artist_cutout,
  :str_artist_fanart,
  :str_artist_fanart2,
  :str_artist_fanart3,
  :str_artist_fanart4,
  :str_artist_logo,
  :str_artist_stripped,
  :str_artist_thumb,
  :str_artist_wide_thumb,
  :str_bbc_review_id,
  :str_biography_cn,
  :str_biography_de,
  :str_biography_e,
  :str_biography_en,
  :str_biography_fr,
  :str_biography_hu,
  :str_biography_il,
  :str_biography_it,
  :str_biography_jp,
  :str_biography_nl,
  :str_biography_no,
  :str_biography_pl,
  :str_biography_pt,
  :str_biography_ru,
  :str_biography_se,
  :str_country,
  :str_country_code,
  :str_description_en,
  :str_disbanded,
  :str_discogs_id,
  :str_facebook,
  :str_gender,
  :str_genius_id,
  :str_genre,
  :str_instagram,
  :str_itunes_id,
  :str_label,
  :str_last_fm_chart,
  :str_location,
  :str_locked,
  :str_lyric_wiki_id,
  :str_mood,
  :str_music_brainz_album_id,
  :str_music_brainz_artist_id,
  :str_music_brainz_id,
  :str_music_moz_id,
  :str_music_vid,
  :str_music_vid_company,
  :str_music_vid_director,
  :str_music_vid_screen1,
  :str_music_vid_screen2,
  :str_music_vid_screen3,
  :str_rate_your_music_id,
  :str_release_format,
  :str_review,
  :str_sound_cloud,
  :str_speed,
  :str_spotify,
  :str_style,
  :str_theme,
  :str_track,
  :str_track_lyric,
  :str_track_thumb,
  :str_twitter,
  :str_website,
  :str_wikidata_id,
  :str_wikipedia_id,
  :str_youtube,
  keyword_init: true
)

# V1Search entity data model.
#
# @!attribute [rw] id_album
#   @return [Integer, nil]
#
# @!attribute [rw] id_artist
#   @return [Integer, nil]
#
# @!attribute [rw] id_imvdb
#   @return [Integer, nil]
#
# @!attribute [rw] id_label
#   @return [Integer, nil]
#
# @!attribute [rw] id_lyric
#   @return [Integer, nil]
#
# @!attribute [rw] id_track
#   @return [Integer, nil]
#
# @!attribute [rw] int_born_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_cd
#   @return [Integer, nil]
#
# @!attribute [rw] int_charted
#   @return [Integer, nil]
#
# @!attribute [rw] int_died_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_duration
#   @return [Integer, nil]
#
# @!attribute [rw] int_formed_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_loved
#   @return [Integer, nil]
#
# @!attribute [rw] int_member
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_comment
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_dislike
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_favorite
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_like
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_view
#   @return [Integer, nil]
#
# @!attribute [rw] int_sale
#   @return [Integer, nil]
#
# @!attribute [rw] int_score
#   @return [Integer, nil]
#
# @!attribute [rw] int_score_vote
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_listener
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_play
#   @return [Integer, nil]
#
# @!attribute [rw] int_track_number
#   @return [Integer, nil]
#
# @!attribute [rw] int_year_released
#   @return [Integer, nil]
#
# @!attribute [rw] str_album
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_case
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_face
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_flat
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_album_c_dart
#   @return [String, nil]
#
# @!attribute [rw] str_album_spine
#   @return [String, nil]
#
# @!attribute [rw] str_album_stripped
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb_back
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb_hq
#   @return [String, nil]
#
# @!attribute [rw] str_all_music_id
#   @return [String, nil]
#
# @!attribute [rw] str_amazon_id
#   @return [String, nil]
#
# @!attribute [rw] str_artist
#   @return [String, nil]
#
# @!attribute [rw] str_artist_alternate
#   @return [String, nil]
#
# @!attribute [rw] str_artist_banner
#   @return [String, nil]
#
# @!attribute [rw] str_artist_clearart
#   @return [String, nil]
#
# @!attribute [rw] str_artist_cutout
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart2
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart3
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart4
#   @return [String, nil]
#
# @!attribute [rw] str_artist_logo
#   @return [String, nil]
#
# @!attribute [rw] str_artist_stripped
#   @return [String, nil]
#
# @!attribute [rw] str_artist_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_artist_wide_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_bbc_review_id
#   @return [String, nil]
#
# @!attribute [rw] str_biography_cn
#   @return [String, nil]
#
# @!attribute [rw] str_biography_de
#   @return [String, nil]
#
# @!attribute [rw] str_biography_e
#   @return [String, nil]
#
# @!attribute [rw] str_biography_en
#   @return [String, nil]
#
# @!attribute [rw] str_biography_fr
#   @return [String, nil]
#
# @!attribute [rw] str_biography_hu
#   @return [String, nil]
#
# @!attribute [rw] str_biography_il
#   @return [String, nil]
#
# @!attribute [rw] str_biography_it
#   @return [String, nil]
#
# @!attribute [rw] str_biography_jp
#   @return [String, nil]
#
# @!attribute [rw] str_biography_nl
#   @return [String, nil]
#
# @!attribute [rw] str_biography_no
#   @return [String, nil]
#
# @!attribute [rw] str_biography_pl
#   @return [String, nil]
#
# @!attribute [rw] str_biography_pt
#   @return [String, nil]
#
# @!attribute [rw] str_biography_ru
#   @return [String, nil]
#
# @!attribute [rw] str_biography_se
#   @return [String, nil]
#
# @!attribute [rw] str_country
#   @return [String, nil]
#
# @!attribute [rw] str_country_code
#   @return [String, nil]
#
# @!attribute [rw] str_description_en
#   @return [String, nil]
#
# @!attribute [rw] str_disbanded
#   @return [String, nil]
#
# @!attribute [rw] str_discogs_id
#   @return [String, nil]
#
# @!attribute [rw] str_facebook
#   @return [String, nil]
#
# @!attribute [rw] str_gender
#   @return [String, nil]
#
# @!attribute [rw] str_genius_id
#   @return [String, nil]
#
# @!attribute [rw] str_genre
#   @return [String, nil]
#
# @!attribute [rw] str_itunes_id
#   @return [String, nil]
#
# @!attribute [rw] str_label
#   @return [String, nil]
#
# @!attribute [rw] str_last_fm_chart
#   @return [String, nil]
#
# @!attribute [rw] str_location
#   @return [String, nil]
#
# @!attribute [rw] str_locked
#   @return [String, nil]
#
# @!attribute [rw] str_lyric_wiki_id
#   @return [String, nil]
#
# @!attribute [rw] str_mood
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_album_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_artist_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_moz_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_company
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_director
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen1
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen2
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen3
#   @return [String, nil]
#
# @!attribute [rw] str_rate_your_music_id
#   @return [String, nil]
#
# @!attribute [rw] str_release_format
#   @return [String, nil]
#
# @!attribute [rw] str_review
#   @return [String, nil]
#
# @!attribute [rw] str_speed
#   @return [String, nil]
#
# @!attribute [rw] str_style
#   @return [String, nil]
#
# @!attribute [rw] str_theme
#   @return [String, nil]
#
# @!attribute [rw] str_track
#   @return [String, nil]
#
# @!attribute [rw] str_track_lyric
#   @return [String, nil]
#
# @!attribute [rw] str_track_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_twitter
#   @return [String, nil]
#
# @!attribute [rw] str_website
#   @return [String, nil]
#
# @!attribute [rw] str_wikidata_id
#   @return [String, nil]
#
# @!attribute [rw] str_wikipedia_id
#   @return [String, nil]
V1Search = Struct.new(
  :id_album,
  :id_artist,
  :id_imvdb,
  :id_label,
  :id_lyric,
  :id_track,
  :int_born_year,
  :int_cd,
  :int_charted,
  :int_died_year,
  :int_duration,
  :int_formed_year,
  :int_loved,
  :int_member,
  :int_music_vid_comment,
  :int_music_vid_dislike,
  :int_music_vid_favorite,
  :int_music_vid_like,
  :int_music_vid_view,
  :int_sale,
  :int_score,
  :int_score_vote,
  :int_total_listener,
  :int_total_play,
  :int_track_number,
  :int_year_released,
  :str_album,
  :str_album3_d_case,
  :str_album3_d_face,
  :str_album3_d_flat,
  :str_album3_d_thumb,
  :str_album_c_dart,
  :str_album_spine,
  :str_album_stripped,
  :str_album_thumb,
  :str_album_thumb_back,
  :str_album_thumb_hq,
  :str_all_music_id,
  :str_amazon_id,
  :str_artist,
  :str_artist_alternate,
  :str_artist_banner,
  :str_artist_clearart,
  :str_artist_cutout,
  :str_artist_fanart,
  :str_artist_fanart2,
  :str_artist_fanart3,
  :str_artist_fanart4,
  :str_artist_logo,
  :str_artist_stripped,
  :str_artist_thumb,
  :str_artist_wide_thumb,
  :str_bbc_review_id,
  :str_biography_cn,
  :str_biography_de,
  :str_biography_e,
  :str_biography_en,
  :str_biography_fr,
  :str_biography_hu,
  :str_biography_il,
  :str_biography_it,
  :str_biography_jp,
  :str_biography_nl,
  :str_biography_no,
  :str_biography_pl,
  :str_biography_pt,
  :str_biography_ru,
  :str_biography_se,
  :str_country,
  :str_country_code,
  :str_description_en,
  :str_disbanded,
  :str_discogs_id,
  :str_facebook,
  :str_gender,
  :str_genius_id,
  :str_genre,
  :str_itunes_id,
  :str_label,
  :str_last_fm_chart,
  :str_location,
  :str_locked,
  :str_lyric_wiki_id,
  :str_mood,
  :str_music_brainz_album_id,
  :str_music_brainz_artist_id,
  :str_music_brainz_id,
  :str_music_moz_id,
  :str_music_vid,
  :str_music_vid_company,
  :str_music_vid_director,
  :str_music_vid_screen1,
  :str_music_vid_screen2,
  :str_music_vid_screen3,
  :str_rate_your_music_id,
  :str_release_format,
  :str_review,
  :str_speed,
  :str_style,
  :str_theme,
  :str_track,
  :str_track_lyric,
  :str_track_thumb,
  :str_twitter,
  :str_website,
  :str_wikidata_id,
  :str_wikipedia_id,
  keyword_init: true
)

# Match filter for V1Search#list (any subset of V1Search fields).
#
# @!attribute [rw] id_album
#   @return [Integer, nil]
#
# @!attribute [rw] id_artist
#   @return [Integer, nil]
#
# @!attribute [rw] id_imvdb
#   @return [Integer, nil]
#
# @!attribute [rw] id_label
#   @return [Integer, nil]
#
# @!attribute [rw] id_lyric
#   @return [Integer, nil]
#
# @!attribute [rw] id_track
#   @return [Integer, nil]
#
# @!attribute [rw] int_born_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_cd
#   @return [Integer, nil]
#
# @!attribute [rw] int_charted
#   @return [Integer, nil]
#
# @!attribute [rw] int_died_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_duration
#   @return [Integer, nil]
#
# @!attribute [rw] int_formed_year
#   @return [Integer, nil]
#
# @!attribute [rw] int_loved
#   @return [Integer, nil]
#
# @!attribute [rw] int_member
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_comment
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_dislike
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_favorite
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_like
#   @return [Integer, nil]
#
# @!attribute [rw] int_music_vid_view
#   @return [Integer, nil]
#
# @!attribute [rw] int_sale
#   @return [Integer, nil]
#
# @!attribute [rw] int_score
#   @return [Integer, nil]
#
# @!attribute [rw] int_score_vote
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_listener
#   @return [Integer, nil]
#
# @!attribute [rw] int_total_play
#   @return [Integer, nil]
#
# @!attribute [rw] int_track_number
#   @return [Integer, nil]
#
# @!attribute [rw] int_year_released
#   @return [Integer, nil]
#
# @!attribute [rw] str_album
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_case
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_face
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_flat
#   @return [String, nil]
#
# @!attribute [rw] str_album3_d_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_album_c_dart
#   @return [String, nil]
#
# @!attribute [rw] str_album_spine
#   @return [String, nil]
#
# @!attribute [rw] str_album_stripped
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb_back
#   @return [String, nil]
#
# @!attribute [rw] str_album_thumb_hq
#   @return [String, nil]
#
# @!attribute [rw] str_all_music_id
#   @return [String, nil]
#
# @!attribute [rw] str_amazon_id
#   @return [String, nil]
#
# @!attribute [rw] str_artist
#   @return [String, nil]
#
# @!attribute [rw] str_artist_alternate
#   @return [String, nil]
#
# @!attribute [rw] str_artist_banner
#   @return [String, nil]
#
# @!attribute [rw] str_artist_clearart
#   @return [String, nil]
#
# @!attribute [rw] str_artist_cutout
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart2
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart3
#   @return [String, nil]
#
# @!attribute [rw] str_artist_fanart4
#   @return [String, nil]
#
# @!attribute [rw] str_artist_logo
#   @return [String, nil]
#
# @!attribute [rw] str_artist_stripped
#   @return [String, nil]
#
# @!attribute [rw] str_artist_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_artist_wide_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_bbc_review_id
#   @return [String, nil]
#
# @!attribute [rw] str_biography_cn
#   @return [String, nil]
#
# @!attribute [rw] str_biography_de
#   @return [String, nil]
#
# @!attribute [rw] str_biography_e
#   @return [String, nil]
#
# @!attribute [rw] str_biography_en
#   @return [String, nil]
#
# @!attribute [rw] str_biography_fr
#   @return [String, nil]
#
# @!attribute [rw] str_biography_hu
#   @return [String, nil]
#
# @!attribute [rw] str_biography_il
#   @return [String, nil]
#
# @!attribute [rw] str_biography_it
#   @return [String, nil]
#
# @!attribute [rw] str_biography_jp
#   @return [String, nil]
#
# @!attribute [rw] str_biography_nl
#   @return [String, nil]
#
# @!attribute [rw] str_biography_no
#   @return [String, nil]
#
# @!attribute [rw] str_biography_pl
#   @return [String, nil]
#
# @!attribute [rw] str_biography_pt
#   @return [String, nil]
#
# @!attribute [rw] str_biography_ru
#   @return [String, nil]
#
# @!attribute [rw] str_biography_se
#   @return [String, nil]
#
# @!attribute [rw] str_country
#   @return [String, nil]
#
# @!attribute [rw] str_country_code
#   @return [String, nil]
#
# @!attribute [rw] str_description_en
#   @return [String, nil]
#
# @!attribute [rw] str_disbanded
#   @return [String, nil]
#
# @!attribute [rw] str_discogs_id
#   @return [String, nil]
#
# @!attribute [rw] str_facebook
#   @return [String, nil]
#
# @!attribute [rw] str_gender
#   @return [String, nil]
#
# @!attribute [rw] str_genius_id
#   @return [String, nil]
#
# @!attribute [rw] str_genre
#   @return [String, nil]
#
# @!attribute [rw] str_itunes_id
#   @return [String, nil]
#
# @!attribute [rw] str_label
#   @return [String, nil]
#
# @!attribute [rw] str_last_fm_chart
#   @return [String, nil]
#
# @!attribute [rw] str_location
#   @return [String, nil]
#
# @!attribute [rw] str_locked
#   @return [String, nil]
#
# @!attribute [rw] str_lyric_wiki_id
#   @return [String, nil]
#
# @!attribute [rw] str_mood
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_album_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_artist_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_brainz_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_moz_id
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_company
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_director
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen1
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen2
#   @return [String, nil]
#
# @!attribute [rw] str_music_vid_screen3
#   @return [String, nil]
#
# @!attribute [rw] str_rate_your_music_id
#   @return [String, nil]
#
# @!attribute [rw] str_release_format
#   @return [String, nil]
#
# @!attribute [rw] str_review
#   @return [String, nil]
#
# @!attribute [rw] str_speed
#   @return [String, nil]
#
# @!attribute [rw] str_style
#   @return [String, nil]
#
# @!attribute [rw] str_theme
#   @return [String, nil]
#
# @!attribute [rw] str_track
#   @return [String, nil]
#
# @!attribute [rw] str_track_lyric
#   @return [String, nil]
#
# @!attribute [rw] str_track_thumb
#   @return [String, nil]
#
# @!attribute [rw] str_twitter
#   @return [String, nil]
#
# @!attribute [rw] str_website
#   @return [String, nil]
#
# @!attribute [rw] str_wikidata_id
#   @return [String, nil]
#
# @!attribute [rw] str_wikipedia_id
#   @return [String, nil]
V1SearchListMatch = Struct.new(
  :id_album,
  :id_artist,
  :id_imvdb,
  :id_label,
  :id_lyric,
  :id_track,
  :int_born_year,
  :int_cd,
  :int_charted,
  :int_died_year,
  :int_duration,
  :int_formed_year,
  :int_loved,
  :int_member,
  :int_music_vid_comment,
  :int_music_vid_dislike,
  :int_music_vid_favorite,
  :int_music_vid_like,
  :int_music_vid_view,
  :int_sale,
  :int_score,
  :int_score_vote,
  :int_total_listener,
  :int_total_play,
  :int_track_number,
  :int_year_released,
  :str_album,
  :str_album3_d_case,
  :str_album3_d_face,
  :str_album3_d_flat,
  :str_album3_d_thumb,
  :str_album_c_dart,
  :str_album_spine,
  :str_album_stripped,
  :str_album_thumb,
  :str_album_thumb_back,
  :str_album_thumb_hq,
  :str_all_music_id,
  :str_amazon_id,
  :str_artist,
  :str_artist_alternate,
  :str_artist_banner,
  :str_artist_clearart,
  :str_artist_cutout,
  :str_artist_fanart,
  :str_artist_fanart2,
  :str_artist_fanart3,
  :str_artist_fanart4,
  :str_artist_logo,
  :str_artist_stripped,
  :str_artist_thumb,
  :str_artist_wide_thumb,
  :str_bbc_review_id,
  :str_biography_cn,
  :str_biography_de,
  :str_biography_e,
  :str_biography_en,
  :str_biography_fr,
  :str_biography_hu,
  :str_biography_il,
  :str_biography_it,
  :str_biography_jp,
  :str_biography_nl,
  :str_biography_no,
  :str_biography_pl,
  :str_biography_pt,
  :str_biography_ru,
  :str_biography_se,
  :str_country,
  :str_country_code,
  :str_description_en,
  :str_disbanded,
  :str_discogs_id,
  :str_facebook,
  :str_gender,
  :str_genius_id,
  :str_genre,
  :str_itunes_id,
  :str_label,
  :str_last_fm_chart,
  :str_location,
  :str_locked,
  :str_lyric_wiki_id,
  :str_mood,
  :str_music_brainz_album_id,
  :str_music_brainz_artist_id,
  :str_music_brainz_id,
  :str_music_moz_id,
  :str_music_vid,
  :str_music_vid_company,
  :str_music_vid_director,
  :str_music_vid_screen1,
  :str_music_vid_screen2,
  :str_music_vid_screen3,
  :str_rate_your_music_id,
  :str_release_format,
  :str_review,
  :str_speed,
  :str_style,
  :str_theme,
  :str_track,
  :str_track_lyric,
  :str_track_thumb,
  :str_twitter,
  :str_website,
  :str_wikidata_id,
  :str_wikipedia_id,
  keyword_init: true
)

# V2List entity data model.
#
# @!attribute [rw] album
#   @return [Array, nil]
V2List = Struct.new(
  :album,
  keyword_init: true
)

# Request payload for V2List#load.
#
# @!attribute [rw] artist_id
#   @return [Integer]
V2ListLoadMatch = Struct.new(
  :artist_id,
  keyword_init: true
)

# V2Lookup entity data model.
#
# @!attribute [rw] album
#   @return [Array, nil]
#
# @!attribute [rw] artist
#   @return [Array, nil]
#
# @!attribute [rw] track
#   @return [Array, nil]
V2Lookup = Struct.new(
  :album,
  :artist,
  :track,
  keyword_init: true
)

# Request payload for V2Lookup#load.
#
# @!attribute [rw] album_id
#   @return [Integer]
#
# @!attribute [rw] artist_id
#   @return [Integer]
#
# @!attribute [rw] music_brainz_id
#   @return [String]
#
# @!attribute [rw] track_id
#   @return [Integer]
V2LookupLoadMatch = Struct.new(
  :album_id,
  :artist_id,
  :music_brainz_id,
  :track_id,
  keyword_init: true
)

# V2Search entity data model.
#
# @!attribute [rw] album
#   @return [Array, nil]
#
# @!attribute [rw] artist
#   @return [Array, nil]
#
# @!attribute [rw] track
#   @return [Array, nil]
V2Search = Struct.new(
  :album,
  :artist,
  :track,
  keyword_init: true
)

# Request payload for V2Search#load.
#
# @!attribute [rw] album_name
#   @return [String]
#
# @!attribute [rw] artist_name
#   @return [String]
#
# @!attribute [rw] track_name
#   @return [String]
V2SearchLoadMatch = Struct.new(
  :album_name,
  :artist_name,
  :track_name,
  keyword_init: true
)

