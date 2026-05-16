<?php
declare(strict_types=1);

// FreeMusicApi2 SDK exists test

require_once __DIR__ . '/../freemusicapi2_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FreeMusicApi2SDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
