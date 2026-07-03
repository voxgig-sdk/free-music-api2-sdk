
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { FreeMusicApi2SDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('V1LookupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREEMUSICAPI2_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREEMUSICAPI2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeMusicApi2SDK.test()
    const ent = testsdk.V1Lookup()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_MUSIC_API__TEST_LIVE
    for (const op of ['list']) {
      if (maybeSkipControl(t, 'entityOp', 'v1_lookup.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set FREE_MUSIC_API__TEST_V__LOOKUP_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let v1_lookup_ref01_data = Object.values(setup.data.existing.v1_lookup)[0] as any

    // LIST
    const v1_lookup_ref01_ent = client.V1Lookup()
    const v1_lookup_ref01_match: any = {}

    const v1_lookup_ref01_list = await v1_lookup_ref01_ent.list(v1_lookup_ref01_match)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/v1_lookup/V1LookupTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FreeMusicApi2SDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['v1_lookup01','v1_lookup02','v1_lookup03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['FREE_MUSIC_API__TEST_V__LOOKUP_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'FREE_MUSIC_API__TEST_V__LOOKUP_ENTID': idmap,
    'FREE_MUSIC_API__TEST_LIVE': 'FALSE',
    'FREE_MUSIC_API__TEST_EXPLAIN': 'FALSE',
    'FREE_MUSIC_API__APIKEY': 'NONE',
  })

  idmap = env['FREE_MUSIC_API__TEST_V__LOOKUP_ENTID']

  const live = 'TRUE' === env.FREE_MUSIC_API__TEST_LIVE

  if (live) {
    client = new FreeMusicApi2SDK(merge([
      {
        apikey: env.FREE_MUSIC_API__APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FREE_MUSIC_API__TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
