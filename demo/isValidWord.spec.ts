import {test, mock} from '../src';
import * as mod from './isValidWord'; // just used for type

test('valid word returns true', async (assert) => {

    // given
    const dict = ['dog', 'cat', 'fish'].join('\n');
    const mockMod: typeof mod = mock('./isValidWord', {
        'fs/promises': {readFile: () => Promise.resolve(dict)},
    });

    // when
    const result = await mockMod.isValidWord('dog');

    // then
    assert.equal(result, true);

});

test('invalid word returns false', async (assert) => {

    // given
    const dict = ['dog', 'cat', 'fish'].join('\n');
    const mockMod: typeof mod = mock('./isValidWord', {
        'fs/promises': {readFile: () => Promise.resolve(dict)},
    });

    // when
    const result = await mockMod.isValidWord('nope');

    // then
    assert.equal(result, false);

});
