import {serializeError} from 'serialize-error';
import {Assertion} from '../test';
import {equal} from './equal';

export function errorsEquivalent(assertions: Assertion[], actualErr: any, expectedErr: any, description?: string) {

    if (!(actualErr instanceof Error) && typeof actualErr !== 'undefined')
        throw new Error('actualErr is not an instance of Error');
    if (!(expectedErr instanceof Error) && typeof expectedErr !== 'undefined')
        throw new Error('expectedErr is not an instance of Error');

    const actualErrSerialized = serializeError(actualErr);
    const expectedErrSerialized = serializeError(expectedErr);

    // ignore stack traces
    delete actualErrSerialized?.stack;
    delete expectedErrSerialized?.stack;

    equal(
        assertions,
        actualErrSerialized,
        expectedErrSerialized,
        description || 'errorsEquivalent()',
    );

}
