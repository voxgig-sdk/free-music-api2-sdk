<?php
declare(strict_types=1);

// FreeMusicApi2 SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FreeMusicApi2Features
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FreeMusicApi2BaseFeature();
            case "test":
                return new FreeMusicApi2TestFeature();
            default:
                return new FreeMusicApi2BaseFeature();
        }
    }
}
