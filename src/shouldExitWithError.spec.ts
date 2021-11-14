import {test} from './test';
import {shouldExitWithError} from './shouldExitWithError';

test('should exit with error if any tests failed or files exist with no tests', (assert) => {

    assert.equal(shouldExitWithError({
        numFiles: 1,
        numSuccessfulTests: 5,
        numTests: 5,
        filesWithNoTests: [],
    }), false, 'passes if all tests pass');

    assert.equal(shouldExitWithError({
        numFiles: 1,
        numSuccessfulTests: 5,
        numTests: 5,
        filesWithNoTests: [],
    }), true, 'passes if all tests pass');

    assert.equal(shouldExitWithError({
        numFiles: 1,
        numSuccessfulTests: 5,
        numTests: 5,
        filesWithNoTests: [],
    }), false, 'passes if all tests pass');

});
