// Typed models for the FreeMusicApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// V1List is the typed data model for the v1_list entity.
type V1List struct {
	IdAlbum *int `json:"id_album,omitempty"`
	IdArtist *int `json:"id_artist,omitempty"`
	IdImvdb *int `json:"id_imvdb,omitempty"`
	IdLyric *int `json:"id_lyric,omitempty"`
	IdTrack *int `json:"id_track,omitempty"`
	IntCd *int `json:"int_cd,omitempty"`
	IntDuration *int `json:"int_duration,omitempty"`
	IntLoved *int `json:"int_loved,omitempty"`
	IntMusicVidComment *int `json:"int_music_vid_comment,omitempty"`
	IntMusicVidDislike *int `json:"int_music_vid_dislike,omitempty"`
	IntMusicVidFavorite *int `json:"int_music_vid_favorite,omitempty"`
	IntMusicVidLike *int `json:"int_music_vid_like,omitempty"`
	IntMusicVidView *int `json:"int_music_vid_view,omitempty"`
	IntScore *int `json:"int_score,omitempty"`
	IntScoreVote *int `json:"int_score_vote,omitempty"`
	IntTotalListener *int `json:"int_total_listener,omitempty"`
	IntTotalPlay *int `json:"int_total_play,omitempty"`
	IntTrackNumber *int `json:"int_track_number,omitempty"`
	Loved *[]any `json:"loved,omitempty"`
	StrAlbum *string `json:"str_album,omitempty"`
	StrArtist *string `json:"str_artist,omitempty"`
	StrArtistAlternate *string `json:"str_artist_alternate,omitempty"`
	StrDescriptionEn *string `json:"str_description_en,omitempty"`
	StrGenre *string `json:"str_genre,omitempty"`
	StrLocked *string `json:"str_locked,omitempty"`
	StrMood *string `json:"str_mood,omitempty"`
	StrMusicBrainzAlbumId *string `json:"str_music_brainz_album_id,omitempty"`
	StrMusicBrainzArtistId *string `json:"str_music_brainz_artist_id,omitempty"`
	StrMusicBrainzId *string `json:"str_music_brainz_id,omitempty"`
	StrMusicVid *string `json:"str_music_vid,omitempty"`
	StrMusicVidCompany *string `json:"str_music_vid_company,omitempty"`
	StrMusicVidDirector *string `json:"str_music_vid_director,omitempty"`
	StrMusicVidScreen1 *string `json:"str_music_vid_screen1,omitempty"`
	StrMusicVidScreen2 *string `json:"str_music_vid_screen2,omitempty"`
	StrMusicVidScreen3 *string `json:"str_music_vid_screen3,omitempty"`
	StrStyle *string `json:"str_style,omitempty"`
	StrTheme *string `json:"str_theme,omitempty"`
	StrTrack *string `json:"str_track,omitempty"`
	StrTrackLyric *string `json:"str_track_lyric,omitempty"`
	StrTrackThumb *string `json:"str_track_thumb,omitempty"`
	Trending *[]any `json:"trending,omitempty"`
}

// V1ListListMatch mirrors the v1_list fields as an all-optional match
// filter (Go analog of Partial<V1List>).
type V1ListListMatch struct {
	IdAlbum *int `json:"id_album,omitempty"`
	IdArtist *int `json:"id_artist,omitempty"`
	IdImvdb *int `json:"id_imvdb,omitempty"`
	IdLyric *int `json:"id_lyric,omitempty"`
	IdTrack *int `json:"id_track,omitempty"`
	IntCd *int `json:"int_cd,omitempty"`
	IntDuration *int `json:"int_duration,omitempty"`
	IntLoved *int `json:"int_loved,omitempty"`
	IntMusicVidComment *int `json:"int_music_vid_comment,omitempty"`
	IntMusicVidDislike *int `json:"int_music_vid_dislike,omitempty"`
	IntMusicVidFavorite *int `json:"int_music_vid_favorite,omitempty"`
	IntMusicVidLike *int `json:"int_music_vid_like,omitempty"`
	IntMusicVidView *int `json:"int_music_vid_view,omitempty"`
	IntScore *int `json:"int_score,omitempty"`
	IntScoreVote *int `json:"int_score_vote,omitempty"`
	IntTotalListener *int `json:"int_total_listener,omitempty"`
	IntTotalPlay *int `json:"int_total_play,omitempty"`
	IntTrackNumber *int `json:"int_track_number,omitempty"`
	Loved *[]any `json:"loved,omitempty"`
	StrAlbum *string `json:"str_album,omitempty"`
	StrArtist *string `json:"str_artist,omitempty"`
	StrArtistAlternate *string `json:"str_artist_alternate,omitempty"`
	StrDescriptionEn *string `json:"str_description_en,omitempty"`
	StrGenre *string `json:"str_genre,omitempty"`
	StrLocked *string `json:"str_locked,omitempty"`
	StrMood *string `json:"str_mood,omitempty"`
	StrMusicBrainzAlbumId *string `json:"str_music_brainz_album_id,omitempty"`
	StrMusicBrainzArtistId *string `json:"str_music_brainz_artist_id,omitempty"`
	StrMusicBrainzId *string `json:"str_music_brainz_id,omitempty"`
	StrMusicVid *string `json:"str_music_vid,omitempty"`
	StrMusicVidCompany *string `json:"str_music_vid_company,omitempty"`
	StrMusicVidDirector *string `json:"str_music_vid_director,omitempty"`
	StrMusicVidScreen1 *string `json:"str_music_vid_screen1,omitempty"`
	StrMusicVidScreen2 *string `json:"str_music_vid_screen2,omitempty"`
	StrMusicVidScreen3 *string `json:"str_music_vid_screen3,omitempty"`
	StrStyle *string `json:"str_style,omitempty"`
	StrTheme *string `json:"str_theme,omitempty"`
	StrTrack *string `json:"str_track,omitempty"`
	StrTrackLyric *string `json:"str_track_lyric,omitempty"`
	StrTrackThumb *string `json:"str_track_thumb,omitempty"`
	Trending *[]any `json:"trending,omitempty"`
}

// V1Lookup is the typed data model for the v1_lookup entity.
type V1Lookup struct {
	IdAlbum *int `json:"id_album,omitempty"`
	IdArtist *int `json:"id_artist,omitempty"`
	IdImvdb *int `json:"id_imvdb,omitempty"`
	IdLabel *int `json:"id_label,omitempty"`
	IdLyric *int `json:"id_lyric,omitempty"`
	IdTrack *int `json:"id_track,omitempty"`
	IntBornYear *int `json:"int_born_year,omitempty"`
	IntCd *int `json:"int_cd,omitempty"`
	IntCharted *int `json:"int_charted,omitempty"`
	IntDiedYear *int `json:"int_died_year,omitempty"`
	IntDuration *int `json:"int_duration,omitempty"`
	IntFormedYear *int `json:"int_formed_year,omitempty"`
	IntLoved *int `json:"int_loved,omitempty"`
	IntMember *int `json:"int_member,omitempty"`
	IntMusicVidComment *int `json:"int_music_vid_comment,omitempty"`
	IntMusicVidDislike *int `json:"int_music_vid_dislike,omitempty"`
	IntMusicVidFavorite *int `json:"int_music_vid_favorite,omitempty"`
	IntMusicVidLike *int `json:"int_music_vid_like,omitempty"`
	IntMusicVidView *int `json:"int_music_vid_view,omitempty"`
	IntSale *int `json:"int_sale,omitempty"`
	IntScore *int `json:"int_score,omitempty"`
	IntScoreVote *int `json:"int_score_vote,omitempty"`
	IntTotalListener *int `json:"int_total_listener,omitempty"`
	IntTotalPlay *int `json:"int_total_play,omitempty"`
	IntTrackNumber *int `json:"int_track_number,omitempty"`
	IntYearReleased *int `json:"int_year_released,omitempty"`
	StrAlbum *string `json:"str_album,omitempty"`
	StrAlbum3DCase *string `json:"str_album3_d_case,omitempty"`
	StrAlbum3DFace *string `json:"str_album3_d_face,omitempty"`
	StrAlbum3DFlat *string `json:"str_album3_d_flat,omitempty"`
	StrAlbum3DThumb *string `json:"str_album3_d_thumb,omitempty"`
	StrAlbumCDart *string `json:"str_album_c_dart,omitempty"`
	StrAlbumSpine *string `json:"str_album_spine,omitempty"`
	StrAlbumStripped *string `json:"str_album_stripped,omitempty"`
	StrAlbumThumb *string `json:"str_album_thumb,omitempty"`
	StrAlbumThumbBack *string `json:"str_album_thumb_back,omitempty"`
	StrAlbumThumbHq *string `json:"str_album_thumb_hq,omitempty"`
	StrAllMusicId *string `json:"str_all_music_id,omitempty"`
	StrAmazonId *string `json:"str_amazon_id,omitempty"`
	StrAppleMusic *string `json:"str_apple_music,omitempty"`
	StrArtist *string `json:"str_artist,omitempty"`
	StrArtistAlternate *string `json:"str_artist_alternate,omitempty"`
	StrArtistBanner *string `json:"str_artist_banner,omitempty"`
	StrArtistClearart *string `json:"str_artist_clearart,omitempty"`
	StrArtistCutout *string `json:"str_artist_cutout,omitempty"`
	StrArtistFanart *string `json:"str_artist_fanart,omitempty"`
	StrArtistFanart2 *string `json:"str_artist_fanart2,omitempty"`
	StrArtistFanart3 *string `json:"str_artist_fanart3,omitempty"`
	StrArtistFanart4 *string `json:"str_artist_fanart4,omitempty"`
	StrArtistLogo *string `json:"str_artist_logo,omitempty"`
	StrArtistStripped *string `json:"str_artist_stripped,omitempty"`
	StrArtistThumb *string `json:"str_artist_thumb,omitempty"`
	StrArtistWideThumb *string `json:"str_artist_wide_thumb,omitempty"`
	StrBbcReviewId *string `json:"str_bbc_review_id,omitempty"`
	StrBiographyCn *string `json:"str_biography_cn,omitempty"`
	StrBiographyDe *string `json:"str_biography_de,omitempty"`
	StrBiographyE *string `json:"str_biography_e,omitempty"`
	StrBiographyEn *string `json:"str_biography_en,omitempty"`
	StrBiographyFr *string `json:"str_biography_fr,omitempty"`
	StrBiographyHu *string `json:"str_biography_hu,omitempty"`
	StrBiographyIl *string `json:"str_biography_il,omitempty"`
	StrBiographyIt *string `json:"str_biography_it,omitempty"`
	StrBiographyJp *string `json:"str_biography_jp,omitempty"`
	StrBiographyNl *string `json:"str_biography_nl,omitempty"`
	StrBiographyNo *string `json:"str_biography_no,omitempty"`
	StrBiographyPl *string `json:"str_biography_pl,omitempty"`
	StrBiographyPt *string `json:"str_biography_pt,omitempty"`
	StrBiographyRu *string `json:"str_biography_ru,omitempty"`
	StrBiographySe *string `json:"str_biography_se,omitempty"`
	StrCountry *string `json:"str_country,omitempty"`
	StrCountryCode *string `json:"str_country_code,omitempty"`
	StrDescriptionEn *string `json:"str_description_en,omitempty"`
	StrDisbanded *string `json:"str_disbanded,omitempty"`
	StrDiscogsId *string `json:"str_discogs_id,omitempty"`
	StrFacebook *string `json:"str_facebook,omitempty"`
	StrGender *string `json:"str_gender,omitempty"`
	StrGeniusId *string `json:"str_genius_id,omitempty"`
	StrGenre *string `json:"str_genre,omitempty"`
	StrInstagram *string `json:"str_instagram,omitempty"`
	StrItunesId *string `json:"str_itunes_id,omitempty"`
	StrLabel *string `json:"str_label,omitempty"`
	StrLastFmChart *string `json:"str_last_fm_chart,omitempty"`
	StrLocation *string `json:"str_location,omitempty"`
	StrLocked *string `json:"str_locked,omitempty"`
	StrLyricWikiId *string `json:"str_lyric_wiki_id,omitempty"`
	StrMood *string `json:"str_mood,omitempty"`
	StrMusicBrainzAlbumId *string `json:"str_music_brainz_album_id,omitempty"`
	StrMusicBrainzArtistId *string `json:"str_music_brainz_artist_id,omitempty"`
	StrMusicBrainzId *string `json:"str_music_brainz_id,omitempty"`
	StrMusicMozId *string `json:"str_music_moz_id,omitempty"`
	StrMusicVid *string `json:"str_music_vid,omitempty"`
	StrMusicVidCompany *string `json:"str_music_vid_company,omitempty"`
	StrMusicVidDirector *string `json:"str_music_vid_director,omitempty"`
	StrMusicVidScreen1 *string `json:"str_music_vid_screen1,omitempty"`
	StrMusicVidScreen2 *string `json:"str_music_vid_screen2,omitempty"`
	StrMusicVidScreen3 *string `json:"str_music_vid_screen3,omitempty"`
	StrRateYourMusicId *string `json:"str_rate_your_music_id,omitempty"`
	StrReleaseFormat *string `json:"str_release_format,omitempty"`
	StrReview *string `json:"str_review,omitempty"`
	StrSoundCloud *string `json:"str_sound_cloud,omitempty"`
	StrSpeed *string `json:"str_speed,omitempty"`
	StrSpotify *string `json:"str_spotify,omitempty"`
	StrStyle *string `json:"str_style,omitempty"`
	StrTheme *string `json:"str_theme,omitempty"`
	StrTrack *string `json:"str_track,omitempty"`
	StrTrackLyric *string `json:"str_track_lyric,omitempty"`
	StrTrackThumb *string `json:"str_track_thumb,omitempty"`
	StrTwitter *string `json:"str_twitter,omitempty"`
	StrWebsite *string `json:"str_website,omitempty"`
	StrWikidataId *string `json:"str_wikidata_id,omitempty"`
	StrWikipediaId *string `json:"str_wikipedia_id,omitempty"`
	StrYoutube *string `json:"str_youtube,omitempty"`
}

// V1LookupListMatch mirrors the v1_lookup fields as an all-optional match
// filter (Go analog of Partial<V1Lookup>).
type V1LookupListMatch struct {
	IdAlbum *int `json:"id_album,omitempty"`
	IdArtist *int `json:"id_artist,omitempty"`
	IdImvdb *int `json:"id_imvdb,omitempty"`
	IdLabel *int `json:"id_label,omitempty"`
	IdLyric *int `json:"id_lyric,omitempty"`
	IdTrack *int `json:"id_track,omitempty"`
	IntBornYear *int `json:"int_born_year,omitempty"`
	IntCd *int `json:"int_cd,omitempty"`
	IntCharted *int `json:"int_charted,omitempty"`
	IntDiedYear *int `json:"int_died_year,omitempty"`
	IntDuration *int `json:"int_duration,omitempty"`
	IntFormedYear *int `json:"int_formed_year,omitempty"`
	IntLoved *int `json:"int_loved,omitempty"`
	IntMember *int `json:"int_member,omitempty"`
	IntMusicVidComment *int `json:"int_music_vid_comment,omitempty"`
	IntMusicVidDislike *int `json:"int_music_vid_dislike,omitempty"`
	IntMusicVidFavorite *int `json:"int_music_vid_favorite,omitempty"`
	IntMusicVidLike *int `json:"int_music_vid_like,omitempty"`
	IntMusicVidView *int `json:"int_music_vid_view,omitempty"`
	IntSale *int `json:"int_sale,omitempty"`
	IntScore *int `json:"int_score,omitempty"`
	IntScoreVote *int `json:"int_score_vote,omitempty"`
	IntTotalListener *int `json:"int_total_listener,omitempty"`
	IntTotalPlay *int `json:"int_total_play,omitempty"`
	IntTrackNumber *int `json:"int_track_number,omitempty"`
	IntYearReleased *int `json:"int_year_released,omitempty"`
	StrAlbum *string `json:"str_album,omitempty"`
	StrAlbum3DCase *string `json:"str_album3_d_case,omitempty"`
	StrAlbum3DFace *string `json:"str_album3_d_face,omitempty"`
	StrAlbum3DFlat *string `json:"str_album3_d_flat,omitempty"`
	StrAlbum3DThumb *string `json:"str_album3_d_thumb,omitempty"`
	StrAlbumCDart *string `json:"str_album_c_dart,omitempty"`
	StrAlbumSpine *string `json:"str_album_spine,omitempty"`
	StrAlbumStripped *string `json:"str_album_stripped,omitempty"`
	StrAlbumThumb *string `json:"str_album_thumb,omitempty"`
	StrAlbumThumbBack *string `json:"str_album_thumb_back,omitempty"`
	StrAlbumThumbHq *string `json:"str_album_thumb_hq,omitempty"`
	StrAllMusicId *string `json:"str_all_music_id,omitempty"`
	StrAmazonId *string `json:"str_amazon_id,omitempty"`
	StrAppleMusic *string `json:"str_apple_music,omitempty"`
	StrArtist *string `json:"str_artist,omitempty"`
	StrArtistAlternate *string `json:"str_artist_alternate,omitempty"`
	StrArtistBanner *string `json:"str_artist_banner,omitempty"`
	StrArtistClearart *string `json:"str_artist_clearart,omitempty"`
	StrArtistCutout *string `json:"str_artist_cutout,omitempty"`
	StrArtistFanart *string `json:"str_artist_fanart,omitempty"`
	StrArtistFanart2 *string `json:"str_artist_fanart2,omitempty"`
	StrArtistFanart3 *string `json:"str_artist_fanart3,omitempty"`
	StrArtistFanart4 *string `json:"str_artist_fanart4,omitempty"`
	StrArtistLogo *string `json:"str_artist_logo,omitempty"`
	StrArtistStripped *string `json:"str_artist_stripped,omitempty"`
	StrArtistThumb *string `json:"str_artist_thumb,omitempty"`
	StrArtistWideThumb *string `json:"str_artist_wide_thumb,omitempty"`
	StrBbcReviewId *string `json:"str_bbc_review_id,omitempty"`
	StrBiographyCn *string `json:"str_biography_cn,omitempty"`
	StrBiographyDe *string `json:"str_biography_de,omitempty"`
	StrBiographyE *string `json:"str_biography_e,omitempty"`
	StrBiographyEn *string `json:"str_biography_en,omitempty"`
	StrBiographyFr *string `json:"str_biography_fr,omitempty"`
	StrBiographyHu *string `json:"str_biography_hu,omitempty"`
	StrBiographyIl *string `json:"str_biography_il,omitempty"`
	StrBiographyIt *string `json:"str_biography_it,omitempty"`
	StrBiographyJp *string `json:"str_biography_jp,omitempty"`
	StrBiographyNl *string `json:"str_biography_nl,omitempty"`
	StrBiographyNo *string `json:"str_biography_no,omitempty"`
	StrBiographyPl *string `json:"str_biography_pl,omitempty"`
	StrBiographyPt *string `json:"str_biography_pt,omitempty"`
	StrBiographyRu *string `json:"str_biography_ru,omitempty"`
	StrBiographySe *string `json:"str_biography_se,omitempty"`
	StrCountry *string `json:"str_country,omitempty"`
	StrCountryCode *string `json:"str_country_code,omitempty"`
	StrDescriptionEn *string `json:"str_description_en,omitempty"`
	StrDisbanded *string `json:"str_disbanded,omitempty"`
	StrDiscogsId *string `json:"str_discogs_id,omitempty"`
	StrFacebook *string `json:"str_facebook,omitempty"`
	StrGender *string `json:"str_gender,omitempty"`
	StrGeniusId *string `json:"str_genius_id,omitempty"`
	StrGenre *string `json:"str_genre,omitempty"`
	StrInstagram *string `json:"str_instagram,omitempty"`
	StrItunesId *string `json:"str_itunes_id,omitempty"`
	StrLabel *string `json:"str_label,omitempty"`
	StrLastFmChart *string `json:"str_last_fm_chart,omitempty"`
	StrLocation *string `json:"str_location,omitempty"`
	StrLocked *string `json:"str_locked,omitempty"`
	StrLyricWikiId *string `json:"str_lyric_wiki_id,omitempty"`
	StrMood *string `json:"str_mood,omitempty"`
	StrMusicBrainzAlbumId *string `json:"str_music_brainz_album_id,omitempty"`
	StrMusicBrainzArtistId *string `json:"str_music_brainz_artist_id,omitempty"`
	StrMusicBrainzId *string `json:"str_music_brainz_id,omitempty"`
	StrMusicMozId *string `json:"str_music_moz_id,omitempty"`
	StrMusicVid *string `json:"str_music_vid,omitempty"`
	StrMusicVidCompany *string `json:"str_music_vid_company,omitempty"`
	StrMusicVidDirector *string `json:"str_music_vid_director,omitempty"`
	StrMusicVidScreen1 *string `json:"str_music_vid_screen1,omitempty"`
	StrMusicVidScreen2 *string `json:"str_music_vid_screen2,omitempty"`
	StrMusicVidScreen3 *string `json:"str_music_vid_screen3,omitempty"`
	StrRateYourMusicId *string `json:"str_rate_your_music_id,omitempty"`
	StrReleaseFormat *string `json:"str_release_format,omitempty"`
	StrReview *string `json:"str_review,omitempty"`
	StrSoundCloud *string `json:"str_sound_cloud,omitempty"`
	StrSpeed *string `json:"str_speed,omitempty"`
	StrSpotify *string `json:"str_spotify,omitempty"`
	StrStyle *string `json:"str_style,omitempty"`
	StrTheme *string `json:"str_theme,omitempty"`
	StrTrack *string `json:"str_track,omitempty"`
	StrTrackLyric *string `json:"str_track_lyric,omitempty"`
	StrTrackThumb *string `json:"str_track_thumb,omitempty"`
	StrTwitter *string `json:"str_twitter,omitempty"`
	StrWebsite *string `json:"str_website,omitempty"`
	StrWikidataId *string `json:"str_wikidata_id,omitempty"`
	StrWikipediaId *string `json:"str_wikipedia_id,omitempty"`
	StrYoutube *string `json:"str_youtube,omitempty"`
}

// V1Search is the typed data model for the v1_search entity.
type V1Search struct {
	IdAlbum *int `json:"id_album,omitempty"`
	IdArtist *int `json:"id_artist,omitempty"`
	IdImvdb *int `json:"id_imvdb,omitempty"`
	IdLabel *int `json:"id_label,omitempty"`
	IdLyric *int `json:"id_lyric,omitempty"`
	IdTrack *int `json:"id_track,omitempty"`
	IntBornYear *int `json:"int_born_year,omitempty"`
	IntCd *int `json:"int_cd,omitempty"`
	IntCharted *int `json:"int_charted,omitempty"`
	IntDiedYear *int `json:"int_died_year,omitempty"`
	IntDuration *int `json:"int_duration,omitempty"`
	IntFormedYear *int `json:"int_formed_year,omitempty"`
	IntLoved *int `json:"int_loved,omitempty"`
	IntMember *int `json:"int_member,omitempty"`
	IntMusicVidComment *int `json:"int_music_vid_comment,omitempty"`
	IntMusicVidDislike *int `json:"int_music_vid_dislike,omitempty"`
	IntMusicVidFavorite *int `json:"int_music_vid_favorite,omitempty"`
	IntMusicVidLike *int `json:"int_music_vid_like,omitempty"`
	IntMusicVidView *int `json:"int_music_vid_view,omitempty"`
	IntSale *int `json:"int_sale,omitempty"`
	IntScore *int `json:"int_score,omitempty"`
	IntScoreVote *int `json:"int_score_vote,omitempty"`
	IntTotalListener *int `json:"int_total_listener,omitempty"`
	IntTotalPlay *int `json:"int_total_play,omitempty"`
	IntTrackNumber *int `json:"int_track_number,omitempty"`
	IntYearReleased *int `json:"int_year_released,omitempty"`
	StrAlbum *string `json:"str_album,omitempty"`
	StrAlbum3DCase *string `json:"str_album3_d_case,omitempty"`
	StrAlbum3DFace *string `json:"str_album3_d_face,omitempty"`
	StrAlbum3DFlat *string `json:"str_album3_d_flat,omitempty"`
	StrAlbum3DThumb *string `json:"str_album3_d_thumb,omitempty"`
	StrAlbumCDart *string `json:"str_album_c_dart,omitempty"`
	StrAlbumSpine *string `json:"str_album_spine,omitempty"`
	StrAlbumStripped *string `json:"str_album_stripped,omitempty"`
	StrAlbumThumb *string `json:"str_album_thumb,omitempty"`
	StrAlbumThumbBack *string `json:"str_album_thumb_back,omitempty"`
	StrAlbumThumbHq *string `json:"str_album_thumb_hq,omitempty"`
	StrAllMusicId *string `json:"str_all_music_id,omitempty"`
	StrAmazonId *string `json:"str_amazon_id,omitempty"`
	StrArtist *string `json:"str_artist,omitempty"`
	StrArtistAlternate *string `json:"str_artist_alternate,omitempty"`
	StrArtistBanner *string `json:"str_artist_banner,omitempty"`
	StrArtistClearart *string `json:"str_artist_clearart,omitempty"`
	StrArtistCutout *string `json:"str_artist_cutout,omitempty"`
	StrArtistFanart *string `json:"str_artist_fanart,omitempty"`
	StrArtistFanart2 *string `json:"str_artist_fanart2,omitempty"`
	StrArtistFanart3 *string `json:"str_artist_fanart3,omitempty"`
	StrArtistFanart4 *string `json:"str_artist_fanart4,omitempty"`
	StrArtistLogo *string `json:"str_artist_logo,omitempty"`
	StrArtistStripped *string `json:"str_artist_stripped,omitempty"`
	StrArtistThumb *string `json:"str_artist_thumb,omitempty"`
	StrArtistWideThumb *string `json:"str_artist_wide_thumb,omitempty"`
	StrBbcReviewId *string `json:"str_bbc_review_id,omitempty"`
	StrBiographyCn *string `json:"str_biography_cn,omitempty"`
	StrBiographyDe *string `json:"str_biography_de,omitempty"`
	StrBiographyE *string `json:"str_biography_e,omitempty"`
	StrBiographyEn *string `json:"str_biography_en,omitempty"`
	StrBiographyFr *string `json:"str_biography_fr,omitempty"`
	StrBiographyHu *string `json:"str_biography_hu,omitempty"`
	StrBiographyIl *string `json:"str_biography_il,omitempty"`
	StrBiographyIt *string `json:"str_biography_it,omitempty"`
	StrBiographyJp *string `json:"str_biography_jp,omitempty"`
	StrBiographyNl *string `json:"str_biography_nl,omitempty"`
	StrBiographyNo *string `json:"str_biography_no,omitempty"`
	StrBiographyPl *string `json:"str_biography_pl,omitempty"`
	StrBiographyPt *string `json:"str_biography_pt,omitempty"`
	StrBiographyRu *string `json:"str_biography_ru,omitempty"`
	StrBiographySe *string `json:"str_biography_se,omitempty"`
	StrCountry *string `json:"str_country,omitempty"`
	StrCountryCode *string `json:"str_country_code,omitempty"`
	StrDescriptionEn *string `json:"str_description_en,omitempty"`
	StrDisbanded *string `json:"str_disbanded,omitempty"`
	StrDiscogsId *string `json:"str_discogs_id,omitempty"`
	StrFacebook *string `json:"str_facebook,omitempty"`
	StrGender *string `json:"str_gender,omitempty"`
	StrGeniusId *string `json:"str_genius_id,omitempty"`
	StrGenre *string `json:"str_genre,omitempty"`
	StrItunesId *string `json:"str_itunes_id,omitempty"`
	StrLabel *string `json:"str_label,omitempty"`
	StrLastFmChart *string `json:"str_last_fm_chart,omitempty"`
	StrLocation *string `json:"str_location,omitempty"`
	StrLocked *string `json:"str_locked,omitempty"`
	StrLyricWikiId *string `json:"str_lyric_wiki_id,omitempty"`
	StrMood *string `json:"str_mood,omitempty"`
	StrMusicBrainzAlbumId *string `json:"str_music_brainz_album_id,omitempty"`
	StrMusicBrainzArtistId *string `json:"str_music_brainz_artist_id,omitempty"`
	StrMusicBrainzId *string `json:"str_music_brainz_id,omitempty"`
	StrMusicMozId *string `json:"str_music_moz_id,omitempty"`
	StrMusicVid *string `json:"str_music_vid,omitempty"`
	StrMusicVidCompany *string `json:"str_music_vid_company,omitempty"`
	StrMusicVidDirector *string `json:"str_music_vid_director,omitempty"`
	StrMusicVidScreen1 *string `json:"str_music_vid_screen1,omitempty"`
	StrMusicVidScreen2 *string `json:"str_music_vid_screen2,omitempty"`
	StrMusicVidScreen3 *string `json:"str_music_vid_screen3,omitempty"`
	StrRateYourMusicId *string `json:"str_rate_your_music_id,omitempty"`
	StrReleaseFormat *string `json:"str_release_format,omitempty"`
	StrReview *string `json:"str_review,omitempty"`
	StrSpeed *string `json:"str_speed,omitempty"`
	StrStyle *string `json:"str_style,omitempty"`
	StrTheme *string `json:"str_theme,omitempty"`
	StrTrack *string `json:"str_track,omitempty"`
	StrTrackLyric *string `json:"str_track_lyric,omitempty"`
	StrTrackThumb *string `json:"str_track_thumb,omitempty"`
	StrTwitter *string `json:"str_twitter,omitempty"`
	StrWebsite *string `json:"str_website,omitempty"`
	StrWikidataId *string `json:"str_wikidata_id,omitempty"`
	StrWikipediaId *string `json:"str_wikipedia_id,omitempty"`
}

// V1SearchListMatch mirrors the v1_search fields as an all-optional match
// filter (Go analog of Partial<V1Search>).
type V1SearchListMatch struct {
	IdAlbum *int `json:"id_album,omitempty"`
	IdArtist *int `json:"id_artist,omitempty"`
	IdImvdb *int `json:"id_imvdb,omitempty"`
	IdLabel *int `json:"id_label,omitempty"`
	IdLyric *int `json:"id_lyric,omitempty"`
	IdTrack *int `json:"id_track,omitempty"`
	IntBornYear *int `json:"int_born_year,omitempty"`
	IntCd *int `json:"int_cd,omitempty"`
	IntCharted *int `json:"int_charted,omitempty"`
	IntDiedYear *int `json:"int_died_year,omitempty"`
	IntDuration *int `json:"int_duration,omitempty"`
	IntFormedYear *int `json:"int_formed_year,omitempty"`
	IntLoved *int `json:"int_loved,omitempty"`
	IntMember *int `json:"int_member,omitempty"`
	IntMusicVidComment *int `json:"int_music_vid_comment,omitempty"`
	IntMusicVidDislike *int `json:"int_music_vid_dislike,omitempty"`
	IntMusicVidFavorite *int `json:"int_music_vid_favorite,omitempty"`
	IntMusicVidLike *int `json:"int_music_vid_like,omitempty"`
	IntMusicVidView *int `json:"int_music_vid_view,omitempty"`
	IntSale *int `json:"int_sale,omitempty"`
	IntScore *int `json:"int_score,omitempty"`
	IntScoreVote *int `json:"int_score_vote,omitempty"`
	IntTotalListener *int `json:"int_total_listener,omitempty"`
	IntTotalPlay *int `json:"int_total_play,omitempty"`
	IntTrackNumber *int `json:"int_track_number,omitempty"`
	IntYearReleased *int `json:"int_year_released,omitempty"`
	StrAlbum *string `json:"str_album,omitempty"`
	StrAlbum3DCase *string `json:"str_album3_d_case,omitempty"`
	StrAlbum3DFace *string `json:"str_album3_d_face,omitempty"`
	StrAlbum3DFlat *string `json:"str_album3_d_flat,omitempty"`
	StrAlbum3DThumb *string `json:"str_album3_d_thumb,omitempty"`
	StrAlbumCDart *string `json:"str_album_c_dart,omitempty"`
	StrAlbumSpine *string `json:"str_album_spine,omitempty"`
	StrAlbumStripped *string `json:"str_album_stripped,omitempty"`
	StrAlbumThumb *string `json:"str_album_thumb,omitempty"`
	StrAlbumThumbBack *string `json:"str_album_thumb_back,omitempty"`
	StrAlbumThumbHq *string `json:"str_album_thumb_hq,omitempty"`
	StrAllMusicId *string `json:"str_all_music_id,omitempty"`
	StrAmazonId *string `json:"str_amazon_id,omitempty"`
	StrArtist *string `json:"str_artist,omitempty"`
	StrArtistAlternate *string `json:"str_artist_alternate,omitempty"`
	StrArtistBanner *string `json:"str_artist_banner,omitempty"`
	StrArtistClearart *string `json:"str_artist_clearart,omitempty"`
	StrArtistCutout *string `json:"str_artist_cutout,omitempty"`
	StrArtistFanart *string `json:"str_artist_fanart,omitempty"`
	StrArtistFanart2 *string `json:"str_artist_fanart2,omitempty"`
	StrArtistFanart3 *string `json:"str_artist_fanart3,omitempty"`
	StrArtistFanart4 *string `json:"str_artist_fanart4,omitempty"`
	StrArtistLogo *string `json:"str_artist_logo,omitempty"`
	StrArtistStripped *string `json:"str_artist_stripped,omitempty"`
	StrArtistThumb *string `json:"str_artist_thumb,omitempty"`
	StrArtistWideThumb *string `json:"str_artist_wide_thumb,omitempty"`
	StrBbcReviewId *string `json:"str_bbc_review_id,omitempty"`
	StrBiographyCn *string `json:"str_biography_cn,omitempty"`
	StrBiographyDe *string `json:"str_biography_de,omitempty"`
	StrBiographyE *string `json:"str_biography_e,omitempty"`
	StrBiographyEn *string `json:"str_biography_en,omitempty"`
	StrBiographyFr *string `json:"str_biography_fr,omitempty"`
	StrBiographyHu *string `json:"str_biography_hu,omitempty"`
	StrBiographyIl *string `json:"str_biography_il,omitempty"`
	StrBiographyIt *string `json:"str_biography_it,omitempty"`
	StrBiographyJp *string `json:"str_biography_jp,omitempty"`
	StrBiographyNl *string `json:"str_biography_nl,omitempty"`
	StrBiographyNo *string `json:"str_biography_no,omitempty"`
	StrBiographyPl *string `json:"str_biography_pl,omitempty"`
	StrBiographyPt *string `json:"str_biography_pt,omitempty"`
	StrBiographyRu *string `json:"str_biography_ru,omitempty"`
	StrBiographySe *string `json:"str_biography_se,omitempty"`
	StrCountry *string `json:"str_country,omitempty"`
	StrCountryCode *string `json:"str_country_code,omitempty"`
	StrDescriptionEn *string `json:"str_description_en,omitempty"`
	StrDisbanded *string `json:"str_disbanded,omitempty"`
	StrDiscogsId *string `json:"str_discogs_id,omitempty"`
	StrFacebook *string `json:"str_facebook,omitempty"`
	StrGender *string `json:"str_gender,omitempty"`
	StrGeniusId *string `json:"str_genius_id,omitempty"`
	StrGenre *string `json:"str_genre,omitempty"`
	StrItunesId *string `json:"str_itunes_id,omitempty"`
	StrLabel *string `json:"str_label,omitempty"`
	StrLastFmChart *string `json:"str_last_fm_chart,omitempty"`
	StrLocation *string `json:"str_location,omitempty"`
	StrLocked *string `json:"str_locked,omitempty"`
	StrLyricWikiId *string `json:"str_lyric_wiki_id,omitempty"`
	StrMood *string `json:"str_mood,omitempty"`
	StrMusicBrainzAlbumId *string `json:"str_music_brainz_album_id,omitempty"`
	StrMusicBrainzArtistId *string `json:"str_music_brainz_artist_id,omitempty"`
	StrMusicBrainzId *string `json:"str_music_brainz_id,omitempty"`
	StrMusicMozId *string `json:"str_music_moz_id,omitempty"`
	StrMusicVid *string `json:"str_music_vid,omitempty"`
	StrMusicVidCompany *string `json:"str_music_vid_company,omitempty"`
	StrMusicVidDirector *string `json:"str_music_vid_director,omitempty"`
	StrMusicVidScreen1 *string `json:"str_music_vid_screen1,omitempty"`
	StrMusicVidScreen2 *string `json:"str_music_vid_screen2,omitempty"`
	StrMusicVidScreen3 *string `json:"str_music_vid_screen3,omitempty"`
	StrRateYourMusicId *string `json:"str_rate_your_music_id,omitempty"`
	StrReleaseFormat *string `json:"str_release_format,omitempty"`
	StrReview *string `json:"str_review,omitempty"`
	StrSpeed *string `json:"str_speed,omitempty"`
	StrStyle *string `json:"str_style,omitempty"`
	StrTheme *string `json:"str_theme,omitempty"`
	StrTrack *string `json:"str_track,omitempty"`
	StrTrackLyric *string `json:"str_track_lyric,omitempty"`
	StrTrackThumb *string `json:"str_track_thumb,omitempty"`
	StrTwitter *string `json:"str_twitter,omitempty"`
	StrWebsite *string `json:"str_website,omitempty"`
	StrWikidataId *string `json:"str_wikidata_id,omitempty"`
	StrWikipediaId *string `json:"str_wikipedia_id,omitempty"`
}

// V2List is the typed data model for the v2_list entity.
type V2List struct {
	Album *[]any `json:"album,omitempty"`
}

// V2ListLoadMatch is the typed request payload for V2List.LoadTyped.
type V2ListLoadMatch struct {
	ArtistId int `json:"artist_id"`
}

// V2Lookup is the typed data model for the v2_lookup entity.
type V2Lookup struct {
	Album *[]any `json:"album,omitempty"`
	Artist *[]any `json:"artist,omitempty"`
	Track *[]any `json:"track,omitempty"`
}

// V2LookupLoadMatch is the typed request payload for V2Lookup.LoadTyped.
type V2LookupLoadMatch struct {
	AlbumId int `json:"album_id"`
	ArtistId int `json:"artist_id"`
	MusicBrainzId string `json:"music_brainz_id"`
	TrackId int `json:"track_id"`
}

// V2Search is the typed data model for the v2_search entity.
type V2Search struct {
	Album *[]any `json:"album,omitempty"`
	Artist *[]any `json:"artist,omitempty"`
	Track *[]any `json:"track,omitempty"`
}

// V2SearchLoadMatch is the typed request payload for V2Search.LoadTyped.
type V2SearchLoadMatch struct {
	AlbumName string `json:"album_name"`
	ArtistName string `json:"artist_name"`
	TrackName string `json:"track_name"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
