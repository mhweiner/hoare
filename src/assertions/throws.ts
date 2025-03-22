import {Assertion} from '../test';
import {toResult} from '../lib/toResult';
import {errorsEquivalent} from './errorsEquivalent';

export function throws(
    assertions: Assertion[],
    experiment: () => any,
    expectedErr: Error|RegExp,
    description?: string
) {

    if (typeof experiment !== 'function')
        throw new Error('experiment must be a function');
    if (!(expectedErr instanceof Error) && !(expectedErr instanceof RegExp))
        throw new Error('expectedErr is not an instance of Error or a RegExp');

    const [actualErr] = toResult(experiment);

    if (!actualErr) throw new Error('experiment did not throw an error');

    errorsEquivalent(assertions, actualErr, expectedErr, description || 'throws()');

}
