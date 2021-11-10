import {test} from '../src';
import {exponent} from './exponent';

test('exponent()', (assert) => {

    assert.plan(4);
    assert.deepEqual(exponent(1, 0), 1, 'should be 1');
    assert.deepEqual(exponent(5, 0), 1, 'should be 1');
    assert.deepEqual(exponent(2, 4), 16, 'should be 16');
    assert.deepEqual(exponent(3, 3), 27, 'should be 27');

});

