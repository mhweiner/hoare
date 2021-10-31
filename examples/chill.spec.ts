import {suite} from '../src';
import {chill} from './chill';
import attempt from '../src/helpers/attempt';

const s = suite('chill()');

s.test('msec = 10', async (assert) => {

    // given
    const msec = 10;

    // when
    const result = await chill(msec);

    // then
    assert.plan(1);
    assert.deepEqual(result, 'ready', 'wait resolved with ready after 10ms');

}, {timeout: 20});

s.test('msec = 1000', async (assert) => {

    // given
    const msec = 1000;

    // when
    const result = await chill(msec);

    // then
    assert.plan(1);
    assert.deepEqual(result, 'ready', 'wait resolved with ready after 1000ms');

}, {timeout: 1010});

s.test('msec = -4', async (assert) => {

    // given
    const msec = -4;

    // when
    const [err] = await attempt(chill(msec));

    // then
    assert.plan(1);
    assert.deepEqual(err, new Error('msec must be positive'), 'wait rejects with error');

});
