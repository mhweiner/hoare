import {deepStrictEqual} from '../deepStrictEqual';
import {Assertion} from '../test';
import {errorsEquivalent} from './errorsEquivalent';

export function createAssertionPredicates(assertions: Assertion[]) {

    return {
        pass: (description?: string) => assertions.push({pass: true, description}),
        fail: (description?: string) => assertions.push({pass: false, description}),
        truthy: (statement: any, description?: string) => assertions.push({pass: !!statement, description}),
        equal: (actual: any, expected: any, description?: string) => (
            assertions.push({pass: deepStrictEqual(actual, expected), description})
        ),
        errorsEquivalent: (actual: any, expected: any, description?: string) => (
            errorsEquivalent(assertions, actual, expected, description)
        ),
    };

}
