import {Assertion} from '../test';
import {toResult} from '../lib/toResult';
import {errorsEquivalent} from './errorsEquivalent';

export function throws(assertions: Assertion[], experiment: () => any, expectedErr: Error, description?: string) {

    if (typeof experiment !== 'function')
        throw new Error('experiment must be a function');
    if (!(expectedErr instanceof Error) && typeof expectedErr !== 'undefined')
        throw new Error('expectedErr is not an instance of Error');

    const [actualErr] = toResult(experiment);

    errorsEquivalent(assertions, actualErr, expectedErr, description || 'throws()');

}
