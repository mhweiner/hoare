import {test} from '../src'; // from 'hoare'
import {mock} from 'cjs-mock';
import * as mod from './isValidWord'; // just used for type

const dict = ['dog', 'cat', 'fish'].join('\n');
const mockMod: typeof mod = mock('./isValidWord', {
    fs: {promises: {readFile: () => Promise.resolve(dict)}},
});

test('valid word returns true', async (assert) => {

    const result = await mockMod.isValidWord('dog');

    assert.equal(result, true);

});

test('invalid word returns false', async (assert) => {

    const result = await mockMod.isValidWord('nope');

    assert.equal(result, false);

});
