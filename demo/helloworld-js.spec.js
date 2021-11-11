/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

const test = require('../dist/test').test;
const helloworld = require('./helloworld-js');

test('helloworld()', (assert) => {

    assert.equal(helloworld(), 'hello, world', 'returns "hello, world"');

});
