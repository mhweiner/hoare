import {test, isolate} from '../src';
import * as mod from './isValidScrabbleWord';

test('isValidScrabbleWord(): valid word', (assert) => {

    // given
    const validWordsDictFile = ['dog', 'cat', 'fish'].join('\n');
    const mockMod: typeof mod = isolate('./isValidScrabbleWord', {
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
    const mockMod: typeof mod = isolate('./isValidScrabbleWord', {
        fs: {readFileSync: () => validWordsDictFile},
    });

    // when
    const result = mockMod.isValidScrabbleWord('nope');

    // then
    assert.equal(result, false, 'should return false');

});
