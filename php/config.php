<?php
declare(strict_types=1);

// FreeMusicApi2 SDK configuration

class FreeMusicApi2Config
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "FreeMusicApi2",
                "slug" => "free-music-api2",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://www.theaudiodb.com/api/v1/json/123",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "v1_list" => [],
                    "v1_lookup" => [],
                    "v1_search" => [],
                    "v2_list" => [],
                    "v2_lookup" => [],
                    "v2_search" => [],
                ],
            ],
            "entity" => [
        'v1_list' => [
          'fields' => [
            [
              'name' => 'idAlbum',
              'short' => 'Album ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idArtist',
              'short' => 'Artist ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idIMVDB',
              'short' => 'IMVDB ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idLyric',
              'short' => 'Lyrics ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idTrack',
              'short' => 'Track ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intCD',
              'short' => 'CD number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intDuration',
              'short' => 'Track duration in milliseconds',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intLoved',
              'short' => 'Number of loves/likes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidComments',
              'short' => 'Number of music video comments',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidDislikes',
              'short' => 'Number of music video dislikes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidFavorites',
              'short' => 'Number of music video favorites',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidLikes',
              'short' => 'Number of music video likes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidViews',
              'short' => 'Number of music video views',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScore',
              'short' => 'Track score',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScoreVotes',
              'short' => 'Number of score votes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalListeners',
              'short' => 'Total number of listeners',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalPlays',
              'short' => 'Total number of plays',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTrackNumber',
              'short' => 'Track number on album',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'loved',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'strAlbum',
              'short' => 'Album title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtist',
              'short' => 'Artist name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistAlternate',
              'short' => 'Alternate artist name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDescriptionEN',
              'short' => 'Video description in English',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGenre',
              'short' => 'Track genre',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLocked',
              'short' => 'Whether the record is locked',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMood',
              'short' => 'Track mood',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzAlbumID',
              'short' => 'MusicBrainz Album ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzArtistID',
              'short' => 'MusicBrainz Artist ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzID',
              'short' => 'MusicBrainz Recording ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVid',
              'short' => 'URL to music video',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidCompany',
              'short' => 'Music video production company',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidDirector',
              'short' => 'Music video director',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen1',
              'short' => 'URL to music video screenshot 1',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen2',
              'short' => 'URL to music video screenshot 2',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen3',
              'short' => 'URL to music video screenshot 3',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strStyle',
              'short' => 'Track style',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTheme',
              'short' => 'Track theme',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrack',
              'short' => 'Track title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackLyrics',
              'short' => 'Track lyrics',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackThumb',
              'short' => 'URL to track thumbnail',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'trending',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'v1_list',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'us',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'albums',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'itunes',
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/trending.php',
                  'parts' => [
                    'trending.php',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'format',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.trending`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'track',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/mostloved.php',
                  'parts' => [
                    'mostloved.php',
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.loved`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'cc197bad-dc9c-440d-a5b5-d52ba2e14234',
                        'kind' => 'query',
                        'name' => 'i',
                        'orig' => 'i',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/mvid-mb.php',
                  'parts' => [
                    'mvid-mb.php',
                  ],
                  'select' => [
                    'exist' => [
                      'i',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.mvids`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 112024,
                        'kind' => 'query',
                        'name' => 'i',
                        'orig' => 'i',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/mvid.php',
                  'parts' => [
                    'mvid.php',
                  ],
                  'select' => [
                    'exist' => [
                      'i',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.mvids`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'cc197bad-dc9c-440d-a5b5-d52ba2e14234',
                        'kind' => 'query',
                        'name' => 's',
                        'orig' => 's',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/track-top10-mb.php',
                  'parts' => [
                    'track-top10-mb.php',
                  ],
                  'select' => [
                    'exist' => [
                      's',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.track`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'coldplay',
                        'kind' => 'query',
                        'name' => 's',
                        'orig' => 's',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/track-top10.php',
                  'parts' => [
                    'track-top10.php',
                  ],
                  'select' => [
                    'exist' => [
                      's',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.track`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'v1_lookup' => [
          'fields' => [
            [
              'name' => 'idAlbum',
              'short' => 'Album ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idArtist',
              'short' => 'Artist ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idIMVDB',
              'short' => 'IMVDB ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idLabel',
              'short' => 'Label ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idLyric',
              'short' => 'Lyrics ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idTrack',
              'short' => 'Unique track ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intBornYear',
              'short' => 'Birth year of the artist',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intCD',
              'short' => 'CD number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intCharted',
              'short' => 'Chart position',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intDiedYear',
              'short' => 'Year the artist died (if applicable)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intDuration',
              'short' => 'Track duration in milliseconds',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intFormedYear',
              'short' => 'Year the artist/band was formed',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intLoved',
              'short' => 'Number of loves/likes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMembers',
              'short' => 'Number of band members',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidComments',
              'short' => 'Number of music video comments',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidDislikes',
              'short' => 'Number of music video dislikes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidFavorites',
              'short' => 'Number of music video favorites',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidLikes',
              'short' => 'Number of music video likes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidViews',
              'short' => 'Number of music video views',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intSales',
              'short' => 'Number of sales',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScore',
              'short' => 'Track score',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScoreVotes',
              'short' => 'Number of score votes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalListeners',
              'short' => 'Total number of listeners',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalPlays',
              'short' => 'Total number of plays',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTrackNumber',
              'short' => 'Track number on album',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intYearReleased',
              'short' => 'Year the album was released',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'strAlbum',
              'short' => 'Album title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DCase',
              'short' => 'URL to 3D case image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DFace',
              'short' => 'URL to 3D face image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DFlat',
              'short' => 'URL to 3D flat image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DThumb',
              'short' => 'URL to 3D thumbnail',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumCDart',
              'short' => 'URL to CD art',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumSpine',
              'short' => 'URL to album spine image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumStripped',
              'short' => 'Album title without special characters',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumb',
              'short' => 'URL to album thumbnail',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumbBack',
              'short' => 'URL to back of album cover',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumbHQ',
              'short' => 'URL to high quality album thumbnail',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAllMusicID',
              'short' => 'AllMusic ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAmazonID',
              'short' => 'Amazon ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAppleMusic',
              'short' => 'Apple Music artist URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtist',
              'short' => 'Artist name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistAlternate',
              'short' => 'Alternate artist name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistBanner',
              'short' => 'URL to artist banner',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistClearart',
              'short' => 'URL to artist clearart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistCutout',
              'short' => 'URL to artist cutout image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart',
              'short' => 'URL to artist fanart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart2',
              'short' => 'URL to alternate artist fanart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart3',
              'short' => 'URL to third artist fanart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart4',
              'short' => 'URL to fourth artist fanart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistLogo',
              'short' => 'URL to artist logo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistStripped',
              'short' => 'Artist name without special characters',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistThumb',
              'short' => 'URL to artist thumbnail image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistWideThumb',
              'short' => 'URL to artist wide thumbnail',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBBCReviewID',
              'short' => 'BBC Review ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyCN',
              'short' => 'Artist biography in Chinese',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyDE',
              'short' => 'Artist biography in German',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyEN',
              'short' => 'Artist biography in English',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyES',
              'short' => 'Artist biography in Spanish',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyFR',
              'short' => 'Artist biography in French',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyHU',
              'short' => 'Artist biography in Hungarian',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyIL',
              'short' => 'Artist biography in Hebrew',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyIT',
              'short' => 'Artist biography in Italian',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyJP',
              'short' => 'Artist biography in Japanese',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyNL',
              'short' => 'Artist biography in Dutch',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyNO',
              'short' => 'Artist biography in Norwegian',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyPL',
              'short' => 'Artist biography in Polish',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyPT',
              'short' => 'Artist biography in Portuguese',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyRU',
              'short' => 'Artist biography in Russian',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographySE',
              'short' => 'Artist biography in Swedish',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strCountry',
              'short' => 'Country of origin',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strCountryCode',
              'short' => 'Country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDescriptionEN',
              'short' => 'Track description in English',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDisbanded',
              'short' => 'Disbanded status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDiscogsID',
              'short' => 'Discogs ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strFacebook',
              'short' => 'Facebook page URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGender',
              'short' => 'Artist gender',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGeniusID',
              'short' => 'Genius ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGenre',
              'short' => 'Track genre',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strInstagram',
              'short' => 'Instagram profile URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strItunesID',
              'short' => 'iTunes ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLabel',
              'short' => 'Record label',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLastFMChart',
              'short' => 'Last.fm chart URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLocation',
              'short' => 'Recording location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLocked',
              'short' => 'Whether the record is locked',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLyricWikiID',
              'short' => 'LyricWiki ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMood',
              'short' => 'Track mood',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzAlbumID',
              'short' => 'MusicBrainz Album ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzArtistID',
              'short' => 'MusicBrainz Artist ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzID',
              'short' => 'MusicBrainz Recording ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicMozID',
              'short' => 'MusicMoz ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVid',
              'short' => 'URL to music video',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidCompany',
              'short' => 'Music video production company',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidDirector',
              'short' => 'Music video director',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen1',
              'short' => 'URL to music video screenshot 1',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen2',
              'short' => 'URL to music video screenshot 2',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen3',
              'short' => 'URL to music video screenshot 3',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strRateYourMusicID',
              'short' => 'RateYourMusic ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strReleaseFormat',
              'short' => 'Release format (CD, Vinyl, etc.)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strReview',
              'short' => 'Album review',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strSoundCloud',
              'short' => 'SoundCloud profile URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strSpeed',
              'short' => 'Album speed',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strSpotify',
              'short' => 'Spotify artist URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strStyle',
              'short' => 'Track style',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTheme',
              'short' => 'Track theme',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrack',
              'short' => 'Track title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackLyrics',
              'short' => 'Track lyrics',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackThumb',
              'short' => 'URL to track thumbnail',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTwitter',
              'short' => 'Twitter profile URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWebsite',
              'short' => 'Official website URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWikidataID',
              'short' => 'Wikidata ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWikipediaID',
              'short' => 'Wikipedia ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strYoutube',
              'short' => 'YouTube channel URL',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'v1_lookup',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 32793500,
                        'kind' => 'query',
                        'name' => 'h',
                        'orig' => 'h',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 2115888,
                        'kind' => 'query',
                        'name' => 'm',
                        'orig' => 'm',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/track.php',
                  'parts' => [
                    'track.php',
                  ],
                  'select' => [
                    'exist' => [
                      'h',
                      'm',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.track`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 112024,
                        'kind' => 'query',
                        'name' => 'i',
                        'orig' => 'i',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 2115888,
                        'kind' => 'query',
                        'name' => 'm',
                        'orig' => 'm',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/album.php',
                  'parts' => [
                    'album.php',
                  ],
                  'select' => [
                    'exist' => [
                      'i',
                      'm',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.album`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '1dc4c347-a1db-32aa-b14f-bc9cc507b843',
                        'kind' => 'query',
                        'name' => 'i',
                        'orig' => 'i',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/album-mb.php',
                  'parts' => [
                    'album-mb.php',
                  ],
                  'select' => [
                    'exist' => [
                      'i',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.album`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'cc197bad-dc9c-440d-a5b5-d52ba2e14234',
                        'kind' => 'query',
                        'name' => 'i',
                        'orig' => 'i',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/artist-mb.php',
                  'parts' => [
                    'artist-mb.php',
                  ],
                  'select' => [
                    'exist' => [
                      'i',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.artists`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 112024,
                        'kind' => 'query',
                        'name' => 'i',
                        'orig' => 'i',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/artist-social.php',
                  'parts' => [
                    'artist-social.php',
                  ],
                  'select' => [
                    'exist' => [
                      'i',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.artists`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 112024,
                        'kind' => 'query',
                        'name' => 'i',
                        'orig' => 'i',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/artist.php',
                  'parts' => [
                    'artist.php',
                  ],
                  'select' => [
                    'exist' => [
                      'i',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.artists`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '50369905-68ca-48d2-912d-b37330ff7dc3',
                        'kind' => 'query',
                        'name' => 'i',
                        'orig' => 'i',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/track-mb.php',
                  'parts' => [
                    'track-mb.php',
                  ],
                  'select' => [
                    'exist' => [
                      'i',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.track`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'v1_search' => [
          'fields' => [
            [
              'name' => 'idAlbum',
              'short' => 'Unique album ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idArtist',
              'short' => 'Artist ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idIMVDB',
              'short' => 'IMVDB ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idLabel',
              'short' => 'Label ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idLyric',
              'short' => 'Lyrics ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idTrack',
              'short' => 'Unique track ID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intBornYear',
              'short' => 'Birth year of the artist',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intCD',
              'short' => 'CD number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intCharted',
              'short' => 'Chart position',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intDiedYear',
              'short' => 'Year the artist died (if applicable)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intDuration',
              'short' => 'Track duration in milliseconds',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intFormedYear',
              'short' => 'Year the artist/band was formed',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intLoved',
              'short' => 'Number of loves/likes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMembers',
              'short' => 'Number of band members',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidComments',
              'short' => 'Number of music video comments',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidDislikes',
              'short' => 'Number of music video dislikes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidFavorites',
              'short' => 'Number of music video favorites',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidLikes',
              'short' => 'Number of music video likes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidViews',
              'short' => 'Number of music video views',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intSales',
              'short' => 'Number of sales',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScore',
              'short' => 'Album score',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScoreVotes',
              'short' => 'Number of score votes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalListeners',
              'short' => 'Total number of listeners',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalPlays',
              'short' => 'Total number of plays',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTrackNumber',
              'short' => 'Track number on album',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intYearReleased',
              'short' => 'Year the album was released',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'strAlbum',
              'short' => 'Album title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DCase',
              'short' => 'URL to 3D case image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DFace',
              'short' => 'URL to 3D face image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DFlat',
              'short' => 'URL to 3D flat image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DThumb',
              'short' => 'URL to 3D thumbnail',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumCDart',
              'short' => 'URL to CD art',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumSpine',
              'short' => 'URL to album spine image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumStripped',
              'short' => 'Album title without special characters',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumb',
              'short' => 'URL to album thumbnail',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumbBack',
              'short' => 'URL to back of album cover',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumbHQ',
              'short' => 'URL to high quality album thumbnail',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAllMusicID',
              'short' => 'AllMusic ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAmazonID',
              'short' => 'Amazon ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtist',
              'short' => 'Artist name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistAlternate',
              'short' => 'Alternate artist name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistBanner',
              'short' => 'URL to artist banner',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistClearart',
              'short' => 'URL to artist clearart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistCutout',
              'short' => 'URL to artist cutout image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart',
              'short' => 'URL to artist fanart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart2',
              'short' => 'URL to alternate artist fanart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart3',
              'short' => 'URL to third artist fanart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart4',
              'short' => 'URL to fourth artist fanart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistLogo',
              'short' => 'URL to artist logo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistStripped',
              'short' => 'Artist name without special characters',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistThumb',
              'short' => 'URL to artist thumbnail image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistWideThumb',
              'short' => 'URL to artist wide thumbnail',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBBCReviewID',
              'short' => 'BBC Review ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyCN',
              'short' => 'Artist biography in Chinese',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyDE',
              'short' => 'Artist biography in German',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyEN',
              'short' => 'Artist biography in English',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyES',
              'short' => 'Artist biography in Spanish',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyFR',
              'short' => 'Artist biography in French',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyHU',
              'short' => 'Artist biography in Hungarian',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyIL',
              'short' => 'Artist biography in Hebrew',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyIT',
              'short' => 'Artist biography in Italian',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyJP',
              'short' => 'Artist biography in Japanese',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyNL',
              'short' => 'Artist biography in Dutch',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyNO',
              'short' => 'Artist biography in Norwegian',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyPL',
              'short' => 'Artist biography in Polish',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyPT',
              'short' => 'Artist biography in Portuguese',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyRU',
              'short' => 'Artist biography in Russian',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographySE',
              'short' => 'Artist biography in Swedish',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strCountry',
              'short' => 'Country of origin',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strCountryCode',
              'short' => 'Country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDescriptionEN',
              'short' => 'Album description in English',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDisbanded',
              'short' => 'Disbanded status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDiscogsID',
              'short' => 'Discogs ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strFacebook',
              'short' => 'Facebook page URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGender',
              'short' => 'Artist gender',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGeniusID',
              'short' => 'Genius ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGenre',
              'short' => 'Album genre',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strItunesID',
              'short' => 'iTunes ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLabel',
              'short' => 'Record label',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLastFMChart',
              'short' => 'Last.fm chart URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLocation',
              'short' => 'Recording location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLocked',
              'short' => 'Whether the record is locked',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLyricWikiID',
              'short' => 'LyricWiki ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMood',
              'short' => 'Album mood',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzAlbumID',
              'short' => 'MusicBrainz Album ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzArtistID',
              'short' => 'MusicBrainz Artist ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzID',
              'short' => 'MusicBrainz Release Group ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicMozID',
              'short' => 'MusicMoz ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVid',
              'short' => 'URL to music video',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidCompany',
              'short' => 'Music video production company',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidDirector',
              'short' => 'Music video director',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen1',
              'short' => 'URL to music video screenshot 1',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen2',
              'short' => 'URL to music video screenshot 2',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen3',
              'short' => 'URL to music video screenshot 3',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strRateYourMusicID',
              'short' => 'RateYourMusic ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strReleaseFormat',
              'short' => 'Release format (CD, Vinyl, etc.)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strReview',
              'short' => 'Album review',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strSpeed',
              'short' => 'Album speed',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strStyle',
              'short' => 'Album style',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTheme',
              'short' => 'Album theme',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrack',
              'short' => 'Track title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackLyrics',
              'short' => 'Track lyrics',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackThumb',
              'short' => 'URL to track thumbnail',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTwitter',
              'short' => 'Twitter profile URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWebsite',
              'short' => 'Official website URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWikidataID',
              'short' => 'Wikidata ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWikipediaID',
              'short' => 'Wikipedia ID',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'v1_search',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'Homework',
                        'kind' => 'query',
                        'name' => 'a',
                        'orig' => 'a',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'daft_punk',
                        'kind' => 'query',
                        'name' => 's',
                        'orig' => 's',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/searchalbum.php',
                  'parts' => [
                    'searchalbum.php',
                  ],
                  'select' => [
                    'exist' => [
                      'a',
                      's',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.album`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'coldplay',
                        'kind' => 'query',
                        'name' => 's',
                        'orig' => 's',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'yellow',
                        'kind' => 'query',
                        'name' => 't',
                        'orig' => 't',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/searchtrack.php',
                  'parts' => [
                    'searchtrack.php',
                  ],
                  'select' => [
                    'exist' => [
                      's',
                      't',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.track`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 's',
                        'orig' => 's',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/discography-mb.php',
                  'parts' => [
                    'discography-mb.php',
                  ],
                  'select' => [
                    'exist' => [
                      's',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.album`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'coldplay',
                        'kind' => 'query',
                        'name' => 's',
                        'orig' => 's',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/discography.php',
                  'parts' => [
                    'discography.php',
                  ],
                  'select' => [
                    'exist' => [
                      's',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.album`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'coldplay',
                        'kind' => 'query',
                        'name' => 's',
                        'orig' => 's',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search.php',
                  'parts' => [
                    'search.php',
                  ],
                  'select' => [
                    'exist' => [
                      's',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.artists`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'v2_list' => [
          'fields' => [
            [
              'name' => 'albums',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'v2_list',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 111239,
                        'kind' => 'param',
                        'name' => 'artist_id',
                        'orig' => 'artist_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/list/discography/{artistId}',
                  'parts' => [
                    'list',
                    'discography',
                    '{artist_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'artistId' => 'artist_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'artist_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'discography',
              ],
            ],
          ],
        ],
        'v2_lookup' => [
          'fields' => [
            [
              'name' => 'albums',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'artists',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'tracks',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'v2_lookup',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 2109615,
                        'kind' => 'param',
                        'name' => 'album_id',
                        'orig' => 'album_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lookup/album/{albumId}',
                  'parts' => [
                    'lookup',
                    'album',
                    '{album_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'albumId' => 'album_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'album_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 111239,
                        'kind' => 'param',
                        'name' => 'artist_id',
                        'orig' => 'artist_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lookup/artist/{artistId}',
                  'parts' => [
                    'lookup',
                    'artist',
                    '{artist_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'artistId' => 'artist_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'artist_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '1dc4c347-a1db-32aa-b14f-bc9cc507b843',
                        'kind' => 'param',
                        'name' => 'music_brainz_id',
                        'orig' => 'music_brainz_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lookup/album_mb/{musicBrainzId}',
                  'parts' => [
                    'lookup',
                    'album_mb',
                    '{music_brainz_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'musicBrainzId' => 'music_brainz_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'music_brainz_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'cc197bad-dc9c-440d-a5b5-d52ba2e14234',
                        'kind' => 'param',
                        'name' => 'music_brainz_id',
                        'orig' => 'music_brainz_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lookup/artist_mb/{musicBrainzId}',
                  'parts' => [
                    'lookup',
                    'artist_mb',
                    '{music_brainz_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'musicBrainzId' => 'music_brainz_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'music_brainz_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '50369905-68ca-48d2-912d-b37330ff7dc3',
                        'kind' => 'param',
                        'name' => 'music_brainz_id',
                        'orig' => 'music_brainz_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lookup/track_mb/{musicBrainzId}',
                  'parts' => [
                    'lookup',
                    'track_mb',
                    '{music_brainz_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'musicBrainzId' => 'music_brainz_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'music_brainz_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 32724183,
                        'kind' => 'param',
                        'name' => 'track_id',
                        'orig' => 'track_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/lookup/track/{trackId}',
                  'parts' => [
                    'lookup',
                    'track',
                    '{track_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'trackId' => 'track_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'track_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'album',
              ],
              [
                'album_mb',
              ],
              [
                'artist',
              ],
              [
                'artist_mb',
              ],
              [
                'track',
              ],
              [
                'track_mb',
              ],
            ],
          ],
        ],
        'v2_search' => [
          'fields' => [
            [
              'name' => 'albums',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'artists',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'tracks',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'v2_search',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'parachutes',
                        'kind' => 'param',
                        'name' => 'album_name',
                        'orig' => 'album_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search/album/{albumName}',
                  'parts' => [
                    'search',
                    'album',
                    '{album_name}',
                  ],
                  'rename' => [
                    'param' => [
                      'albumName' => 'album_name',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'album_name',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'coldplay',
                        'kind' => 'param',
                        'name' => 'artist_name',
                        'orig' => 'artist_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search/artist/{artistName}',
                  'parts' => [
                    'search',
                    'artist',
                    '{artist_name}',
                  ],
                  'rename' => [
                    'param' => [
                      'artistName' => 'artist_name',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'artist_name',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'yellow',
                        'kind' => 'param',
                        'name' => 'track_name',
                        'orig' => 'track_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search/track/{trackName}',
                  'parts' => [
                    'search',
                    'track',
                    '{track_name}',
                  ],
                  'rename' => [
                    'param' => [
                      'trackName' => 'track_name',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'track_name',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'album',
              ],
              [
                'artist',
              ],
              [
                'track',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return FreeMusicApi2Features::make_feature($name);
    }
}
