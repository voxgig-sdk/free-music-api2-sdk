# Typed models for the FreeMusicApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class V1List:
    id_album: Optional[int] = None
    id_artist: Optional[int] = None
    id_imvdb: Optional[int] = None
    id_lyric: Optional[int] = None
    id_track: Optional[int] = None
    int_cd: Optional[int] = None
    int_duration: Optional[int] = None
    int_loved: Optional[int] = None
    int_music_vid_comment: Optional[int] = None
    int_music_vid_dislike: Optional[int] = None
    int_music_vid_favorite: Optional[int] = None
    int_music_vid_like: Optional[int] = None
    int_music_vid_view: Optional[int] = None
    int_score: Optional[int] = None
    int_score_vote: Optional[int] = None
    int_total_listener: Optional[int] = None
    int_total_play: Optional[int] = None
    int_track_number: Optional[int] = None
    loved: Optional[list] = None
    str_album: Optional[str] = None
    str_artist: Optional[str] = None
    str_artist_alternate: Optional[str] = None
    str_description_en: Optional[str] = None
    str_genre: Optional[str] = None
    str_locked: Optional[str] = None
    str_mood: Optional[str] = None
    str_music_brainz_album_id: Optional[str] = None
    str_music_brainz_artist_id: Optional[str] = None
    str_music_brainz_id: Optional[str] = None
    str_music_vid: Optional[str] = None
    str_music_vid_company: Optional[str] = None
    str_music_vid_director: Optional[str] = None
    str_music_vid_screen1: Optional[str] = None
    str_music_vid_screen2: Optional[str] = None
    str_music_vid_screen3: Optional[str] = None
    str_style: Optional[str] = None
    str_theme: Optional[str] = None
    str_track: Optional[str] = None
    str_track_lyric: Optional[str] = None
    str_track_thumb: Optional[str] = None
    trending: Optional[list] = None


@dataclass
class V1ListListMatch:
    id_album: Optional[int] = None
    id_artist: Optional[int] = None
    id_imvdb: Optional[int] = None
    id_lyric: Optional[int] = None
    id_track: Optional[int] = None
    int_cd: Optional[int] = None
    int_duration: Optional[int] = None
    int_loved: Optional[int] = None
    int_music_vid_comment: Optional[int] = None
    int_music_vid_dislike: Optional[int] = None
    int_music_vid_favorite: Optional[int] = None
    int_music_vid_like: Optional[int] = None
    int_music_vid_view: Optional[int] = None
    int_score: Optional[int] = None
    int_score_vote: Optional[int] = None
    int_total_listener: Optional[int] = None
    int_total_play: Optional[int] = None
    int_track_number: Optional[int] = None
    loved: Optional[list] = None
    str_album: Optional[str] = None
    str_artist: Optional[str] = None
    str_artist_alternate: Optional[str] = None
    str_description_en: Optional[str] = None
    str_genre: Optional[str] = None
    str_locked: Optional[str] = None
    str_mood: Optional[str] = None
    str_music_brainz_album_id: Optional[str] = None
    str_music_brainz_artist_id: Optional[str] = None
    str_music_brainz_id: Optional[str] = None
    str_music_vid: Optional[str] = None
    str_music_vid_company: Optional[str] = None
    str_music_vid_director: Optional[str] = None
    str_music_vid_screen1: Optional[str] = None
    str_music_vid_screen2: Optional[str] = None
    str_music_vid_screen3: Optional[str] = None
    str_style: Optional[str] = None
    str_theme: Optional[str] = None
    str_track: Optional[str] = None
    str_track_lyric: Optional[str] = None
    str_track_thumb: Optional[str] = None
    trending: Optional[list] = None


@dataclass
class V1Lookup:
    id_album: Optional[int] = None
    id_artist: Optional[int] = None
    id_imvdb: Optional[int] = None
    id_label: Optional[int] = None
    id_lyric: Optional[int] = None
    id_track: Optional[int] = None
    int_born_year: Optional[int] = None
    int_cd: Optional[int] = None
    int_charted: Optional[int] = None
    int_died_year: Optional[int] = None
    int_duration: Optional[int] = None
    int_formed_year: Optional[int] = None
    int_loved: Optional[int] = None
    int_member: Optional[int] = None
    int_music_vid_comment: Optional[int] = None
    int_music_vid_dislike: Optional[int] = None
    int_music_vid_favorite: Optional[int] = None
    int_music_vid_like: Optional[int] = None
    int_music_vid_view: Optional[int] = None
    int_sale: Optional[int] = None
    int_score: Optional[int] = None
    int_score_vote: Optional[int] = None
    int_total_listener: Optional[int] = None
    int_total_play: Optional[int] = None
    int_track_number: Optional[int] = None
    int_year_released: Optional[int] = None
    str_album: Optional[str] = None
    str_album3_d_case: Optional[str] = None
    str_album3_d_face: Optional[str] = None
    str_album3_d_flat: Optional[str] = None
    str_album3_d_thumb: Optional[str] = None
    str_album_c_dart: Optional[str] = None
    str_album_spine: Optional[str] = None
    str_album_stripped: Optional[str] = None
    str_album_thumb: Optional[str] = None
    str_album_thumb_back: Optional[str] = None
    str_album_thumb_hq: Optional[str] = None
    str_all_music_id: Optional[str] = None
    str_amazon_id: Optional[str] = None
    str_apple_music: Optional[str] = None
    str_artist: Optional[str] = None
    str_artist_alternate: Optional[str] = None
    str_artist_banner: Optional[str] = None
    str_artist_clearart: Optional[str] = None
    str_artist_cutout: Optional[str] = None
    str_artist_fanart: Optional[str] = None
    str_artist_fanart2: Optional[str] = None
    str_artist_fanart3: Optional[str] = None
    str_artist_fanart4: Optional[str] = None
    str_artist_logo: Optional[str] = None
    str_artist_stripped: Optional[str] = None
    str_artist_thumb: Optional[str] = None
    str_artist_wide_thumb: Optional[str] = None
    str_bbc_review_id: Optional[str] = None
    str_biography_cn: Optional[str] = None
    str_biography_de: Optional[str] = None
    str_biography_e: Optional[str] = None
    str_biography_en: Optional[str] = None
    str_biography_fr: Optional[str] = None
    str_biography_hu: Optional[str] = None
    str_biography_il: Optional[str] = None
    str_biography_it: Optional[str] = None
    str_biography_jp: Optional[str] = None
    str_biography_nl: Optional[str] = None
    str_biography_no: Optional[str] = None
    str_biography_pl: Optional[str] = None
    str_biography_pt: Optional[str] = None
    str_biography_ru: Optional[str] = None
    str_biography_se: Optional[str] = None
    str_country: Optional[str] = None
    str_country_code: Optional[str] = None
    str_description_en: Optional[str] = None
    str_disbanded: Optional[str] = None
    str_discogs_id: Optional[str] = None
    str_facebook: Optional[str] = None
    str_gender: Optional[str] = None
    str_genius_id: Optional[str] = None
    str_genre: Optional[str] = None
    str_instagram: Optional[str] = None
    str_itunes_id: Optional[str] = None
    str_label: Optional[str] = None
    str_last_fm_chart: Optional[str] = None
    str_location: Optional[str] = None
    str_locked: Optional[str] = None
    str_lyric_wiki_id: Optional[str] = None
    str_mood: Optional[str] = None
    str_music_brainz_album_id: Optional[str] = None
    str_music_brainz_artist_id: Optional[str] = None
    str_music_brainz_id: Optional[str] = None
    str_music_moz_id: Optional[str] = None
    str_music_vid: Optional[str] = None
    str_music_vid_company: Optional[str] = None
    str_music_vid_director: Optional[str] = None
    str_music_vid_screen1: Optional[str] = None
    str_music_vid_screen2: Optional[str] = None
    str_music_vid_screen3: Optional[str] = None
    str_rate_your_music_id: Optional[str] = None
    str_release_format: Optional[str] = None
    str_review: Optional[str] = None
    str_sound_cloud: Optional[str] = None
    str_speed: Optional[str] = None
    str_spotify: Optional[str] = None
    str_style: Optional[str] = None
    str_theme: Optional[str] = None
    str_track: Optional[str] = None
    str_track_lyric: Optional[str] = None
    str_track_thumb: Optional[str] = None
    str_twitter: Optional[str] = None
    str_website: Optional[str] = None
    str_wikidata_id: Optional[str] = None
    str_wikipedia_id: Optional[str] = None
    str_youtube: Optional[str] = None


@dataclass
class V1LookupListMatch:
    id_album: Optional[int] = None
    id_artist: Optional[int] = None
    id_imvdb: Optional[int] = None
    id_label: Optional[int] = None
    id_lyric: Optional[int] = None
    id_track: Optional[int] = None
    int_born_year: Optional[int] = None
    int_cd: Optional[int] = None
    int_charted: Optional[int] = None
    int_died_year: Optional[int] = None
    int_duration: Optional[int] = None
    int_formed_year: Optional[int] = None
    int_loved: Optional[int] = None
    int_member: Optional[int] = None
    int_music_vid_comment: Optional[int] = None
    int_music_vid_dislike: Optional[int] = None
    int_music_vid_favorite: Optional[int] = None
    int_music_vid_like: Optional[int] = None
    int_music_vid_view: Optional[int] = None
    int_sale: Optional[int] = None
    int_score: Optional[int] = None
    int_score_vote: Optional[int] = None
    int_total_listener: Optional[int] = None
    int_total_play: Optional[int] = None
    int_track_number: Optional[int] = None
    int_year_released: Optional[int] = None
    str_album: Optional[str] = None
    str_album3_d_case: Optional[str] = None
    str_album3_d_face: Optional[str] = None
    str_album3_d_flat: Optional[str] = None
    str_album3_d_thumb: Optional[str] = None
    str_album_c_dart: Optional[str] = None
    str_album_spine: Optional[str] = None
    str_album_stripped: Optional[str] = None
    str_album_thumb: Optional[str] = None
    str_album_thumb_back: Optional[str] = None
    str_album_thumb_hq: Optional[str] = None
    str_all_music_id: Optional[str] = None
    str_amazon_id: Optional[str] = None
    str_apple_music: Optional[str] = None
    str_artist: Optional[str] = None
    str_artist_alternate: Optional[str] = None
    str_artist_banner: Optional[str] = None
    str_artist_clearart: Optional[str] = None
    str_artist_cutout: Optional[str] = None
    str_artist_fanart: Optional[str] = None
    str_artist_fanart2: Optional[str] = None
    str_artist_fanart3: Optional[str] = None
    str_artist_fanart4: Optional[str] = None
    str_artist_logo: Optional[str] = None
    str_artist_stripped: Optional[str] = None
    str_artist_thumb: Optional[str] = None
    str_artist_wide_thumb: Optional[str] = None
    str_bbc_review_id: Optional[str] = None
    str_biography_cn: Optional[str] = None
    str_biography_de: Optional[str] = None
    str_biography_e: Optional[str] = None
    str_biography_en: Optional[str] = None
    str_biography_fr: Optional[str] = None
    str_biography_hu: Optional[str] = None
    str_biography_il: Optional[str] = None
    str_biography_it: Optional[str] = None
    str_biography_jp: Optional[str] = None
    str_biography_nl: Optional[str] = None
    str_biography_no: Optional[str] = None
    str_biography_pl: Optional[str] = None
    str_biography_pt: Optional[str] = None
    str_biography_ru: Optional[str] = None
    str_biography_se: Optional[str] = None
    str_country: Optional[str] = None
    str_country_code: Optional[str] = None
    str_description_en: Optional[str] = None
    str_disbanded: Optional[str] = None
    str_discogs_id: Optional[str] = None
    str_facebook: Optional[str] = None
    str_gender: Optional[str] = None
    str_genius_id: Optional[str] = None
    str_genre: Optional[str] = None
    str_instagram: Optional[str] = None
    str_itunes_id: Optional[str] = None
    str_label: Optional[str] = None
    str_last_fm_chart: Optional[str] = None
    str_location: Optional[str] = None
    str_locked: Optional[str] = None
    str_lyric_wiki_id: Optional[str] = None
    str_mood: Optional[str] = None
    str_music_brainz_album_id: Optional[str] = None
    str_music_brainz_artist_id: Optional[str] = None
    str_music_brainz_id: Optional[str] = None
    str_music_moz_id: Optional[str] = None
    str_music_vid: Optional[str] = None
    str_music_vid_company: Optional[str] = None
    str_music_vid_director: Optional[str] = None
    str_music_vid_screen1: Optional[str] = None
    str_music_vid_screen2: Optional[str] = None
    str_music_vid_screen3: Optional[str] = None
    str_rate_your_music_id: Optional[str] = None
    str_release_format: Optional[str] = None
    str_review: Optional[str] = None
    str_sound_cloud: Optional[str] = None
    str_speed: Optional[str] = None
    str_spotify: Optional[str] = None
    str_style: Optional[str] = None
    str_theme: Optional[str] = None
    str_track: Optional[str] = None
    str_track_lyric: Optional[str] = None
    str_track_thumb: Optional[str] = None
    str_twitter: Optional[str] = None
    str_website: Optional[str] = None
    str_wikidata_id: Optional[str] = None
    str_wikipedia_id: Optional[str] = None
    str_youtube: Optional[str] = None


@dataclass
class V1Search:
    id_album: Optional[int] = None
    id_artist: Optional[int] = None
    id_imvdb: Optional[int] = None
    id_label: Optional[int] = None
    id_lyric: Optional[int] = None
    id_track: Optional[int] = None
    int_born_year: Optional[int] = None
    int_cd: Optional[int] = None
    int_charted: Optional[int] = None
    int_died_year: Optional[int] = None
    int_duration: Optional[int] = None
    int_formed_year: Optional[int] = None
    int_loved: Optional[int] = None
    int_member: Optional[int] = None
    int_music_vid_comment: Optional[int] = None
    int_music_vid_dislike: Optional[int] = None
    int_music_vid_favorite: Optional[int] = None
    int_music_vid_like: Optional[int] = None
    int_music_vid_view: Optional[int] = None
    int_sale: Optional[int] = None
    int_score: Optional[int] = None
    int_score_vote: Optional[int] = None
    int_total_listener: Optional[int] = None
    int_total_play: Optional[int] = None
    int_track_number: Optional[int] = None
    int_year_released: Optional[int] = None
    str_album: Optional[str] = None
    str_album3_d_case: Optional[str] = None
    str_album3_d_face: Optional[str] = None
    str_album3_d_flat: Optional[str] = None
    str_album3_d_thumb: Optional[str] = None
    str_album_c_dart: Optional[str] = None
    str_album_spine: Optional[str] = None
    str_album_stripped: Optional[str] = None
    str_album_thumb: Optional[str] = None
    str_album_thumb_back: Optional[str] = None
    str_album_thumb_hq: Optional[str] = None
    str_all_music_id: Optional[str] = None
    str_amazon_id: Optional[str] = None
    str_artist: Optional[str] = None
    str_artist_alternate: Optional[str] = None
    str_artist_banner: Optional[str] = None
    str_artist_clearart: Optional[str] = None
    str_artist_cutout: Optional[str] = None
    str_artist_fanart: Optional[str] = None
    str_artist_fanart2: Optional[str] = None
    str_artist_fanart3: Optional[str] = None
    str_artist_fanart4: Optional[str] = None
    str_artist_logo: Optional[str] = None
    str_artist_stripped: Optional[str] = None
    str_artist_thumb: Optional[str] = None
    str_artist_wide_thumb: Optional[str] = None
    str_bbc_review_id: Optional[str] = None
    str_biography_cn: Optional[str] = None
    str_biography_de: Optional[str] = None
    str_biography_e: Optional[str] = None
    str_biography_en: Optional[str] = None
    str_biography_fr: Optional[str] = None
    str_biography_hu: Optional[str] = None
    str_biography_il: Optional[str] = None
    str_biography_it: Optional[str] = None
    str_biography_jp: Optional[str] = None
    str_biography_nl: Optional[str] = None
    str_biography_no: Optional[str] = None
    str_biography_pl: Optional[str] = None
    str_biography_pt: Optional[str] = None
    str_biography_ru: Optional[str] = None
    str_biography_se: Optional[str] = None
    str_country: Optional[str] = None
    str_country_code: Optional[str] = None
    str_description_en: Optional[str] = None
    str_disbanded: Optional[str] = None
    str_discogs_id: Optional[str] = None
    str_facebook: Optional[str] = None
    str_gender: Optional[str] = None
    str_genius_id: Optional[str] = None
    str_genre: Optional[str] = None
    str_itunes_id: Optional[str] = None
    str_label: Optional[str] = None
    str_last_fm_chart: Optional[str] = None
    str_location: Optional[str] = None
    str_locked: Optional[str] = None
    str_lyric_wiki_id: Optional[str] = None
    str_mood: Optional[str] = None
    str_music_brainz_album_id: Optional[str] = None
    str_music_brainz_artist_id: Optional[str] = None
    str_music_brainz_id: Optional[str] = None
    str_music_moz_id: Optional[str] = None
    str_music_vid: Optional[str] = None
    str_music_vid_company: Optional[str] = None
    str_music_vid_director: Optional[str] = None
    str_music_vid_screen1: Optional[str] = None
    str_music_vid_screen2: Optional[str] = None
    str_music_vid_screen3: Optional[str] = None
    str_rate_your_music_id: Optional[str] = None
    str_release_format: Optional[str] = None
    str_review: Optional[str] = None
    str_speed: Optional[str] = None
    str_style: Optional[str] = None
    str_theme: Optional[str] = None
    str_track: Optional[str] = None
    str_track_lyric: Optional[str] = None
    str_track_thumb: Optional[str] = None
    str_twitter: Optional[str] = None
    str_website: Optional[str] = None
    str_wikidata_id: Optional[str] = None
    str_wikipedia_id: Optional[str] = None


@dataclass
class V1SearchListMatch:
    id_album: Optional[int] = None
    id_artist: Optional[int] = None
    id_imvdb: Optional[int] = None
    id_label: Optional[int] = None
    id_lyric: Optional[int] = None
    id_track: Optional[int] = None
    int_born_year: Optional[int] = None
    int_cd: Optional[int] = None
    int_charted: Optional[int] = None
    int_died_year: Optional[int] = None
    int_duration: Optional[int] = None
    int_formed_year: Optional[int] = None
    int_loved: Optional[int] = None
    int_member: Optional[int] = None
    int_music_vid_comment: Optional[int] = None
    int_music_vid_dislike: Optional[int] = None
    int_music_vid_favorite: Optional[int] = None
    int_music_vid_like: Optional[int] = None
    int_music_vid_view: Optional[int] = None
    int_sale: Optional[int] = None
    int_score: Optional[int] = None
    int_score_vote: Optional[int] = None
    int_total_listener: Optional[int] = None
    int_total_play: Optional[int] = None
    int_track_number: Optional[int] = None
    int_year_released: Optional[int] = None
    str_album: Optional[str] = None
    str_album3_d_case: Optional[str] = None
    str_album3_d_face: Optional[str] = None
    str_album3_d_flat: Optional[str] = None
    str_album3_d_thumb: Optional[str] = None
    str_album_c_dart: Optional[str] = None
    str_album_spine: Optional[str] = None
    str_album_stripped: Optional[str] = None
    str_album_thumb: Optional[str] = None
    str_album_thumb_back: Optional[str] = None
    str_album_thumb_hq: Optional[str] = None
    str_all_music_id: Optional[str] = None
    str_amazon_id: Optional[str] = None
    str_artist: Optional[str] = None
    str_artist_alternate: Optional[str] = None
    str_artist_banner: Optional[str] = None
    str_artist_clearart: Optional[str] = None
    str_artist_cutout: Optional[str] = None
    str_artist_fanart: Optional[str] = None
    str_artist_fanart2: Optional[str] = None
    str_artist_fanart3: Optional[str] = None
    str_artist_fanart4: Optional[str] = None
    str_artist_logo: Optional[str] = None
    str_artist_stripped: Optional[str] = None
    str_artist_thumb: Optional[str] = None
    str_artist_wide_thumb: Optional[str] = None
    str_bbc_review_id: Optional[str] = None
    str_biography_cn: Optional[str] = None
    str_biography_de: Optional[str] = None
    str_biography_e: Optional[str] = None
    str_biography_en: Optional[str] = None
    str_biography_fr: Optional[str] = None
    str_biography_hu: Optional[str] = None
    str_biography_il: Optional[str] = None
    str_biography_it: Optional[str] = None
    str_biography_jp: Optional[str] = None
    str_biography_nl: Optional[str] = None
    str_biography_no: Optional[str] = None
    str_biography_pl: Optional[str] = None
    str_biography_pt: Optional[str] = None
    str_biography_ru: Optional[str] = None
    str_biography_se: Optional[str] = None
    str_country: Optional[str] = None
    str_country_code: Optional[str] = None
    str_description_en: Optional[str] = None
    str_disbanded: Optional[str] = None
    str_discogs_id: Optional[str] = None
    str_facebook: Optional[str] = None
    str_gender: Optional[str] = None
    str_genius_id: Optional[str] = None
    str_genre: Optional[str] = None
    str_itunes_id: Optional[str] = None
    str_label: Optional[str] = None
    str_last_fm_chart: Optional[str] = None
    str_location: Optional[str] = None
    str_locked: Optional[str] = None
    str_lyric_wiki_id: Optional[str] = None
    str_mood: Optional[str] = None
    str_music_brainz_album_id: Optional[str] = None
    str_music_brainz_artist_id: Optional[str] = None
    str_music_brainz_id: Optional[str] = None
    str_music_moz_id: Optional[str] = None
    str_music_vid: Optional[str] = None
    str_music_vid_company: Optional[str] = None
    str_music_vid_director: Optional[str] = None
    str_music_vid_screen1: Optional[str] = None
    str_music_vid_screen2: Optional[str] = None
    str_music_vid_screen3: Optional[str] = None
    str_rate_your_music_id: Optional[str] = None
    str_release_format: Optional[str] = None
    str_review: Optional[str] = None
    str_speed: Optional[str] = None
    str_style: Optional[str] = None
    str_theme: Optional[str] = None
    str_track: Optional[str] = None
    str_track_lyric: Optional[str] = None
    str_track_thumb: Optional[str] = None
    str_twitter: Optional[str] = None
    str_website: Optional[str] = None
    str_wikidata_id: Optional[str] = None
    str_wikipedia_id: Optional[str] = None


@dataclass
class V2List:
    album: Optional[list] = None


@dataclass
class V2ListLoadMatch:
    artist_id: int


@dataclass
class V2Lookup:
    album: Optional[list] = None
    artist: Optional[list] = None
    track: Optional[list] = None


@dataclass
class V2LookupLoadMatch:
    album_id: int
    artist_id: int
    music_brainz_id: str
    track_id: int


@dataclass
class V2Search:
    album: Optional[list] = None
    artist: Optional[list] = None
    track: Optional[list] = None


@dataclass
class V2SearchLoadMatch:
    album_name: str
    artist_name: str
    track_name: str

