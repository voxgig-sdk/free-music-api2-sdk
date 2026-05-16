<?php
declare(strict_types=1);

// FreeMusicApi2 SDK utility: prepare_body

class FreeMusicApi2PrepareBody
{
    public static function call(FreeMusicApi2Context $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
