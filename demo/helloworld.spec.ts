import {test} from '../src';
import {helloworld} from './helloworld';

test('should return "hello, world"', (assert) => {

    assert.equal(helloworld(), 'hello, world');

});
