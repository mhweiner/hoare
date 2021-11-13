import {test} from '../src';
import {helloworld} from './helloworld';

test('helloworld()', (assert) => {

    blah;

    if (process.env) throw new Error('oh shit');

    assert.equal({
        foo: 'baz',
        crap: 'dig',
    }, {
        foo: 'bar',
    }, 'returns "hello, world"');

});
