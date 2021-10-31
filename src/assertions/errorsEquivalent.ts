import tape from 'tape';
import {serializeError} from 'serialize-error';

export function errorsEquivalent(t: tape.Test, actualErr: any, expectedErr: any, msg?: string) {

    if (!(actualErr instanceof Error) && typeof actualErr !== 'undefined')
        throw new Error('actualErr is not an instance of Error');
    if (!(expectedErr instanceof Error) && typeof expectedErr !== 'undefined')
        throw new Error('expectedErr is not an instance of Error');

    const actualErrSerialized = serializeError(actualErr);
    const expectedErrSerialized = serializeError(expectedErr);

    // ignore stack traces

    delete actualErrSerialized?.stack;
    delete expectedErrSerialized?.stack;

    t.deepEqual(actualErrSerialized, expectedErrSerialized, msg);

}
