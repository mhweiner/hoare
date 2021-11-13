import {test, mock} from '../src';
import * as mod from './isValidScrabbleWord'; // just used for type

test('isValidScrabbleWord(): valid word', (assert) => {

    // given
    const validWordsDictFile = ['dog', 'cat', 'fish'].join('\n');
    const mockMod: typeof mod = mock('./isValidScrabbleWord', {
        fs: {readFileSync: () => validWordsDictFile},
    });

    // when
    const result = mockMod.isValidScrabbleWord('dog');

    // then
    assert.equal(result, true, 'should return true');

});

test('isValidScrabbleWord(): invalid word', (assert) => {

    // given
    const validWordsDictFile = ['dog', 'cat', 'fish'].join('\n');
    const mockMod: typeof mod = mock('./isValidScrabbleWord', {
        fs: {readFileSync: () => validWordsDictFile},
    });

    // when
    const result = mockMod.isValidScrabbleWord('nope');

    // then
    assert.equal(result, false, 'should return false');

});
