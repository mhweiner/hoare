import {Assertion} from '../test';
import {errorsEquivalent} from './errorsEquivalent';
import {equal} from './equal';
import {throws} from './throws';
import {isTrue} from './isTrue';
import {isFalse} from './isFalse';
import {fail} from './fail';
import {pass} from './pass';

export function createAssertionPredicates(assertions: Assertion[]) {

    return {
        pass: (description?: string) => (
            pass(assertions, description)
        ),
        fail: (description?: string) => (
            fail(assertions, description)
        ),
        isTrue: (condition: boolean, description?: string) => (
            isTrue(assertions, condition, description)
        ),
        isFalse: (condition: boolean, description?: string) => (
            isFalse(assertions, condition, description)
        ),
        equal: (actual: any, expected: any, description?: string) => (
            equal(assertions, actual, expected, description)
        ),
        errorsEquivalent: (actual: any, expected: any, description?: string) => (
            errorsEquivalent(assertions, actual, expected, description)
        ),
        throws: (experiment: () => any, expectedErr: Error|RegExp, description?: string) => (
            throws(assertions, experiment, expectedErr, description)
        ),
    };

}
