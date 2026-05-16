<?php
declare(strict_types=1);

// FreeMusicApi2 SDK utility: result_body

class FreeMusicApi2ResultBody
{
    public static function call(FreeMusicApi2Context $ctx): ?FreeMusicApi2Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
