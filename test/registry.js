const assert = require('assert')
const factory = require('../').factory
const fakeFs = require('memfs')

/* eslint-env node, mocha */

describe('azure-chaos', () => {
  describe('ExtensionRegistry', () => {
    it('should properly register an extension', (done) => {
      factory.ExtensionRegistry.configure({
        fsLocation: '/temp',
        fsImpl: fakeFs
      })
      const instance = factory.ExtensionRegistry.create()

      instance.register({
        extensionName: 'testExtension',
        extensionUri: 'testUri',
        extensionDesc: 'testDesc'
      }).then(() => {
        return instance.get({extensionName: 'testExtension'})
      })
        .then(match => {
          assert.equal(match.name, 'testExtension')
        })
        .then(done, done)
    })
  })
})
