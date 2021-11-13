import {test} from '../src';
import {helloworld} from './helloworld';

test('helloworld()', (assert) => {

    if (process.env)
        Promise.reject(new Error('fucking shit'));

    assert.equal(helloworld(), 'hello, world', 'returns "hello, world"');

});
