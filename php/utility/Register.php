<?php
declare(strict_types=1);

// FreeMusicApi2 SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

FreeMusicApi2Utility::setRegistrar(function (FreeMusicApi2Utility $u): void {
    $u->clean = [FreeMusicApi2Clean::class, 'call'];
    $u->done = [FreeMusicApi2Done::class, 'call'];
    $u->make_error = [FreeMusicApi2MakeError::class, 'call'];
    $u->feature_add = [FreeMusicApi2FeatureAdd::class, 'call'];
    $u->feature_hook = [FreeMusicApi2FeatureHook::class, 'call'];
    $u->feature_init = [FreeMusicApi2FeatureInit::class, 'call'];
    $u->fetcher = [FreeMusicApi2Fetcher::class, 'call'];
    $u->make_fetch_def = [FreeMusicApi2MakeFetchDef::class, 'call'];
    $u->make_context = [FreeMusicApi2MakeContext::class, 'call'];
    $u->make_options = [FreeMusicApi2MakeOptions::class, 'call'];
    $u->make_request = [FreeMusicApi2MakeRequest::class, 'call'];
    $u->make_response = [FreeMusicApi2MakeResponse::class, 'call'];
    $u->make_result = [FreeMusicApi2MakeResult::class, 'call'];
    $u->make_point = [FreeMusicApi2MakePoint::class, 'call'];
    $u->make_spec = [FreeMusicApi2MakeSpec::class, 'call'];
    $u->make_url = [FreeMusicApi2MakeUrl::class, 'call'];
    $u->param = [FreeMusicApi2Param::class, 'call'];
    $u->prepare_auth = [FreeMusicApi2PrepareAuth::class, 'call'];
    $u->prepare_body = [FreeMusicApi2PrepareBody::class, 'call'];
    $u->prepare_headers = [FreeMusicApi2PrepareHeaders::class, 'call'];
    $u->prepare_method = [FreeMusicApi2PrepareMethod::class, 'call'];
    $u->prepare_params = [FreeMusicApi2PrepareParams::class, 'call'];
    $u->prepare_path = [FreeMusicApi2PreparePath::class, 'call'];
    $u->prepare_query = [FreeMusicApi2PrepareQuery::class, 'call'];
    $u->result_basic = [FreeMusicApi2ResultBasic::class, 'call'];
    $u->result_body = [FreeMusicApi2ResultBody::class, 'call'];
    $u->result_headers = [FreeMusicApi2ResultHeaders::class, 'call'];
    $u->transform_request = [FreeMusicApi2TransformRequest::class, 'call'];
    $u->transform_response = [FreeMusicApi2TransformResponse::class, 'call'];
});
