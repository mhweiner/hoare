/* eslint-disable max-lines-per-function */

import {isTestPassing} from './isTestPassing';
import {test, TestResults} from './test';
import {serializeError} from 'serialize-error';

test('all assertions must pass for test to pass', (assert) => {

    const testResults: TestResults = {
        description: 'test',
        assertions: [{pass: true}, {pass: false}, {pass: true}],
    };

    assert.equal(isTestPassing(testResults), false, 'test fails if one assumption fails');

    testResults.assertions = [{pass: true}, {pass: true}, {pass: true}];

    assert.equal(isTestPassing(testResults), true, 'test passes if all assumptions pass');

});

test('must have at least one assertion', (assert) => {

    assert.equal(isTestPassing({
        description: 'test',
        assertions: [],
    }), false);

});

test('test with error makes test fail, even with passing assertions', (assert) => {

    assert.equal(isTestPassing({
        description: 'test',
        assertions: [{pass: true}],
        error: serializeError(new Error()),
    }), false);

});
