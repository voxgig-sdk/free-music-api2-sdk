<?php
declare(strict_types=1);

// FreeMusicApi2 SDK utility: result_headers

class FreeMusicApi2ResultHeaders
{
    public static function call(FreeMusicApi2Context $ctx): ?FreeMusicApi2Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
