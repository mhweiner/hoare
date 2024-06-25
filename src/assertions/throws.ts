import {serializeError} from 'serialize-error';
import {Assertion} from '../test';
import {deepStrictEqual} from '../lib/deepStrictEqual';
import {toResult} from '../lib/toResult';

export function throws(assertions: Assertion[], experiment: () => any, expectedErr: Error, description?: string) {

    if (typeof experiment !== 'function')
        throw new Error('experiment must be a function');
    if (!(expectedErr instanceof Error) && typeof expectedErr !== 'undefined')
        throw new Error('expectedErr is not an instance of Error');

    const [actualErr] = toResult(experiment);
    const actualErrSerialized = serializeError(actualErr);
    const expectedErrSerialized = serializeError(expectedErr);

    // ignore stack traces
    delete actualErrSerialized?.stack;
    delete expectedErrSerialized?.stack;

    assertions.push({pass: deepStrictEqual(actualErrSerialized, expectedErrSerialized), description});

}
