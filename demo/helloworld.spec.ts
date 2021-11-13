import {test} from '../src';
import {helloworld} from './helloworld';

test('helloworld()', (assert) => {

    assert.equal(helloworld(), 'hello, world', 'returns "hello, world"');

});
