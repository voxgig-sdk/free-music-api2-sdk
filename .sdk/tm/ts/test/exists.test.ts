
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreeMusicApi2SDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FreeMusicApi2SDK.test()
    equal(null !== testsdk, true)
  })

})
