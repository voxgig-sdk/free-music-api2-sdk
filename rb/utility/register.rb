# FreeMusicApi2 SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FreeMusicApi2Utility.registrar = ->(u) {
  u.clean = FreeMusicApi2Utilities::Clean
  u.done = FreeMusicApi2Utilities::Done
  u.make_error = FreeMusicApi2Utilities::MakeError
  u.feature_add = FreeMusicApi2Utilities::FeatureAdd
  u.feature_hook = FreeMusicApi2Utilities::FeatureHook
  u.feature_init = FreeMusicApi2Utilities::FeatureInit
  u.fetcher = FreeMusicApi2Utilities::Fetcher
  u.make_fetch_def = FreeMusicApi2Utilities::MakeFetchDef
  u.make_context = FreeMusicApi2Utilities::MakeContext
  u.make_options = FreeMusicApi2Utilities::MakeOptions
  u.make_request = FreeMusicApi2Utilities::MakeRequest
  u.make_response = FreeMusicApi2Utilities::MakeResponse
  u.make_result = FreeMusicApi2Utilities::MakeResult
  u.make_point = FreeMusicApi2Utilities::MakePoint
  u.make_spec = FreeMusicApi2Utilities::MakeSpec
  u.make_url = FreeMusicApi2Utilities::MakeUrl
  u.param = FreeMusicApi2Utilities::Param
  u.prepare_auth = FreeMusicApi2Utilities::PrepareAuth
  u.prepare_body = FreeMusicApi2Utilities::PrepareBody
  u.prepare_headers = FreeMusicApi2Utilities::PrepareHeaders
  u.prepare_method = FreeMusicApi2Utilities::PrepareMethod
  u.prepare_params = FreeMusicApi2Utilities::PrepareParams
  u.prepare_path = FreeMusicApi2Utilities::PreparePath
  u.prepare_query = FreeMusicApi2Utilities::PrepareQuery
  u.graphql_body = FreeMusicApi2Utilities::GraphqlBody
  u.graphql_errors = FreeMusicApi2Utilities::GraphqlErrors
  u.result_basic = FreeMusicApi2Utilities::ResultBasic
  u.result_body = FreeMusicApi2Utilities::ResultBody
  u.result_headers = FreeMusicApi2Utilities::ResultHeaders
  u.transform_request = FreeMusicApi2Utilities::TransformRequest
  u.transform_response = FreeMusicApi2Utilities::TransformResponse
}
