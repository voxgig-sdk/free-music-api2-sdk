<?php
declare(strict_types=1);

// FreeMusicApi2 SDK utility: feature_add

class FreeMusicApi2FeatureAdd
{
    public static function call(FreeMusicApi2Context $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
