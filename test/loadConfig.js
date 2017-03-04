var LoadConfig = require('../dist/loadConfig').default;
var assert = require('assert');
var path = require('path');

describe('loadConfig', () => {
  it('load config json', () => {
    var loadConfig = new LoadConfig(path.resolve(__dirname, './config'));
    var foo = loadConfig.config('test.foo');
    assert.equal(foo, 'bar');
  })
})

