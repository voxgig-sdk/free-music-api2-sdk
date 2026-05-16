<?php
declare(strict_types=1);

// FreeMusicApi2 SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FreeMusicApi2MakeContext
{
    public static function call(array $ctxmap, ?FreeMusicApi2Context $basectx): FreeMusicApi2Context
    {
        return new FreeMusicApi2Context($ctxmap, $basectx);
    }
}
