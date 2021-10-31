import {isolate, test} from '../src';
import {exponent} from './exponent';
// eslint-disable-next-line no-duplicate-imports
import * as exponentModule from './exponent';

test('exponent()', (assert) => {

    assert.plan(4);
    assert.deepEqual(exponent(1, 0), 1, 'should be 1');
    assert.deepEqual(exponent(5, 0), 1, 'should be 1');
    assert.deepEqual(exponent(2, 4), 16, 'should be 16');
    assert.deepEqual(exponent(3, 3), 27, 'should be 27');

});

test('exponent(): alternate reality where multiplication is actually addition', (assert) => {

    const mockExp: typeof exponentModule = isolate('./exponent', {imports: [
        ['./multiply', {multiply: (a: number, b: number) => a + b}],
    ]});

    assert.plan(4);
    assert.deepEqual(mockExp.exponent(1, 0), 1, 'should be 1');
    assert.deepEqual(mockExp.exponent(5, 0), 1, 'should be 1');
    assert.deepEqual(mockExp.exponent(2, 4), 8, 'should be 8');
    assert.deepEqual(mockExp.exponent(3, 3), 9, 'should be 9');

});
