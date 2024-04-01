import {test} from '../src'; // from 'hoare'
import {greet} from './greet';

test('returns expected object', (assert) => {

    assert.equal(greet('Bob'), {
        greet: 'hello',
        noun: 'Bob',
    });

});
