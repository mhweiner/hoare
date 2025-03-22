import {test} from './test';
import {shouldExitWithError} from './shouldExitWithError';

test('returns false if no files without tests, and all tests pass', (assert) => {

    assert.isFalse(shouldExitWithError({
        numFiles: 1,
        numSuccessfulTests: 5,
        numTests: 5,
        filesWithNoTests: [],
    }));

});

test('returns true if any files without tests', (assert) => {

    assert.isTrue(shouldExitWithError({
        numFiles: 1,
        numSuccessfulTests: 5,
        numTests: 5,
        filesWithNoTests: ['./fake/a.spec.js'],
    }), 'passes if all tests pass');

});

test('returns true if any tests failed', (assert) => {

    assert.isTrue(shouldExitWithError({
        numFiles: 1,
        numSuccessfulTests: 5,
        numTests: 6,
        filesWithNoTests: [],
    }));

});
