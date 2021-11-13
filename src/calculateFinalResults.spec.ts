/* eslint-disable max-lines-per-function */

import {calculateFinalResults} from './calculateFinalResults';
import {test} from './test';
import {TestResultsByFile} from './run';
import {serializeError} from 'serialize-error';

test('4 files, 2/5 tests pass, 1 file without tests, 1 test with error', (assert) => {

    // given
    const specFiles = ['./fake/a.ts', './fake/b.ts', './fake/c.ts', './fake/d.ts'];
    const testResults: TestResultsByFile = {
        './fake/a.ts': [
            {
                description: 'this test should have 1 assertion and pass',
                assertions: [{pass: true}],
            },
            {
                description: 'this test should have 2 assertions and passes, one fails',
                assertions: [{pass: true}, {pass: false}],
            },
        ],
        './fake/b.ts': [
            {
                description: 'this test should have 1 assertion and pass',
                assertions: [{pass: true}],
            },
            {
                description: 'this test should fail because it has an error',
                assertions: [],
                error: serializeError(new Error()),
            },
        ],
        './fake/c.ts': [
            {
                description: 'this test should have 1 assertion and fail',
                assertions: [{description: 'fail', pass: false}],
            },
        ],
    };

    // when
    const results = calculateFinalResults(specFiles, testResults);

    // then
    assert.equal(results, {
        numFiles: 3,
        numTests: 5,
        numSuccessfulTests: 2,
        filesWithNoTests: ['./fake/d.ts'],
    });

});
