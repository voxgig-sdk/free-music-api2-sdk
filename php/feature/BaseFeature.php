<?php
declare(strict_types=1);

// FreeMusicApi2 SDK base feature

class FreeMusicApi2BaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FreeMusicApi2Context $ctx, array $options): void {}
    public function PostConstruct(FreeMusicApi2Context $ctx): void {}
    public function PostConstructEntity(FreeMusicApi2Context $ctx): void {}
    public function SetData(FreeMusicApi2Context $ctx): void {}
    public function GetData(FreeMusicApi2Context $ctx): void {}
    public function GetMatch(FreeMusicApi2Context $ctx): void {}
    public function SetMatch(FreeMusicApi2Context $ctx): void {}
    public function PrePoint(FreeMusicApi2Context $ctx): void {}
    public function PreSpec(FreeMusicApi2Context $ctx): void {}
    public function PreRequest(FreeMusicApi2Context $ctx): void {}
    public function PreResponse(FreeMusicApi2Context $ctx): void {}
    public function PreResult(FreeMusicApi2Context $ctx): void {}
    public function PreDone(FreeMusicApi2Context $ctx): void {}
    public function PreUnexpected(FreeMusicApi2Context $ctx): void {}
}
