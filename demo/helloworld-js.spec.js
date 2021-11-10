import {test} from '../src';
import {helloworld} from './helloworld-js';

test('helloworld()', (assert) => {

    assert.equal(helloworld(), 'hello, world', 'returns "hello, world"');

});
