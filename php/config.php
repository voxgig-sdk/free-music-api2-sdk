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
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idArtist',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idIMVDB',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idLyric',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idTrack',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intCD',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intDuration',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intLoved',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidComments',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidDislikes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidFavorites',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidLikes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidViews',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScore',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScoreVotes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalListeners',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalPlays',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTrackNumber',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'loved',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'strAlbum',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtist',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistAlternate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDescriptionEN',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGenre',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLocked',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMood',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzAlbumID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzArtistID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVid',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidCompany',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidDirector',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen1',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen2',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen3',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strStyle',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTheme',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrack',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackLyrics',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackThumb',
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
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idArtist',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idIMVDB',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idLabel',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idLyric',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idTrack',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intBornYear',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intCD',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intCharted',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intDiedYear',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intDuration',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intFormedYear',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intLoved',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMembers',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidComments',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidDislikes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidFavorites',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidLikes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidViews',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intSales',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScore',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScoreVotes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalListeners',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalPlays',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTrackNumber',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intYearReleased',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'strAlbum',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DCase',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DFace',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DFlat',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DThumb',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumCDart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumSpine',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumStripped',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumb',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumbBack',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumbHQ',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAllMusicID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAmazonID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAppleMusic',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtist',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistAlternate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistBanner',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistClearart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistCutout',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart2',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart3',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart4',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistLogo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistStripped',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistThumb',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistWideThumb',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBBCReviewID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyCN',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyDE',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyEN',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyES',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyFR',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyHU',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyIL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyIT',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyJP',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyNL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyNO',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyPL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyPT',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyRU',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographySE',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strCountry',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strCountryCode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDescriptionEN',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDisbanded',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDiscogsID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strFacebook',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGender',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGeniusID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGenre',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strInstagram',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strItunesID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLabel',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLastFMChart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLocation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLocked',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLyricWikiID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMood',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzAlbumID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzArtistID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicMozID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVid',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidCompany',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidDirector',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen1',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen2',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen3',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strRateYourMusicID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strReleaseFormat',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strReview',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strSoundCloud',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strSpeed',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strSpotify',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strStyle',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTheme',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrack',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackLyrics',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackThumb',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTwitter',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWebsite',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWikidataID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWikipediaID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strYoutube',
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
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idArtist',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idIMVDB',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idLabel',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idLyric',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'idTrack',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intBornYear',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intCD',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intCharted',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intDiedYear',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intDuration',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intFormedYear',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intLoved',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMembers',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidComments',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidDislikes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidFavorites',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidLikes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intMusicVidViews',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intSales',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScore',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intScoreVotes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalListeners',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTotalPlays',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intTrackNumber',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'intYearReleased',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'strAlbum',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DCase',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DFace',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DFlat',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbum3DThumb',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumCDart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumSpine',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumStripped',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumb',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumbBack',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAlbumThumbHQ',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAllMusicID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strAmazonID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtist',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistAlternate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistBanner',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistClearart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistCutout',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart2',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart3',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistFanart4',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistLogo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistStripped',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistThumb',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strArtistWideThumb',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBBCReviewID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyCN',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyDE',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyEN',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyES',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyFR',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyHU',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyIL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyIT',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyJP',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyNL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyNO',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyPL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyPT',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographyRU',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strBiographySE',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strCountry',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strCountryCode',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDescriptionEN',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDisbanded',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strDiscogsID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strFacebook',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGender',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGeniusID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strGenre',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strItunesID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLabel',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLastFMChart',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLocation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLocked',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strLyricWikiID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMood',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzAlbumID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzArtistID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicBrainzID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicMozID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVid',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidCompany',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidDirector',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen1',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen2',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strMusicVidScreen3',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strRateYourMusicID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strReleaseFormat',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strReview',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strSpeed',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strStyle',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTheme',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrack',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackLyrics',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTrackThumb',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strTwitter',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWebsite',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWikidataID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'strWikipediaID',
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
