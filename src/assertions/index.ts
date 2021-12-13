import {Assertion} from '../test';
import {errorsEquivalent} from './errorsEquivalent';
import {equal} from './equal';

export function createAssertionPredicates(assertions: Assertion[]) {

    return {
        equal: (actual: any, expected: any, description?: string) => (
            equal(assertions, actual, expected, description)
        ),
        errorsEquivalent: (actual: any, expected: any, description?: string) => (
            errorsEquivalent(assertions, actual, expected, description)
        ),
    };

}
