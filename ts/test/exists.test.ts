
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreeMusicApi2SDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FreeMusicApi2SDK.test()
    equal(testsdk instanceof FreeMusicApi2SDK, true,
      'FreeMusicApi2SDK.test() must return a client synchronously')
  })

})
