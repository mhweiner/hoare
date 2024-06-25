/* eslint-disable max-lines-per-function */

import {isTestPassing} from './isTestPassing';
import {test} from './test';
import {serializeError} from 'serialize-error';

test('isTestPassing()', (assert) => {

    assert.equal(isTestPassing({
        description: 'test',
        assertions: [
            {pass: true, description: 'assertion 1'},
            {pass: true, description: 'assertion 2'},
            {pass: true, description: 'assertion 3'},
        ],
    }), true, 'test passes if all assertions pass');

    assert.equal(isTestPassing({
        description: 'test',
        assertions: [
            {pass: true, description: 'assertion 1'},
            {pass: false, description: 'assertion 2'},
            {pass: true, description: 'assertion 3'},
        ],
    }), false, 'test fails if one or more assumptions fail');

    assert.equal(isTestPassing({
        description: 'test',
        assertions: [],
    }), false, 'test fails if no assertions');

    assert.equal(isTestPassing({
        description: 'test',
        assertions: [
            {pass: true, description: 'assertion 1'},
        ],
        error: serializeError(new Error()),
    }), false, 'test fails if there is an error, even if all assertions pass');

});
