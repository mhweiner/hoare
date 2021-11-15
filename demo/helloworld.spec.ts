import {test} from '../src';
import {helloworld} from './helloworld';

test('returns "hello, world"', (assert) => {

    assert.equal(helloworld(), 'hello, world');

});
