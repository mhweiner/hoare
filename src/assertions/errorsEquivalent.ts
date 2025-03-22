import {serializeError} from 'serialize-error';
import {Assertion} from '../test';
import {equal} from './equal';
import {pass} from './pass';
import {AssertionError} from './AssertionError';
import kleur from 'kleur';

export function errorsEquivalent(
    assertions: Assertion[],
    actualErr: Error,
    expectedErr: Error|RegExp,
    description?: string
): void {

    if (!(actualErr instanceof Error))
        throw new Error('actualErr is not an instance of Error');
    if (!(expectedErr instanceof Error) && !(expectedErr instanceof RegExp))
        throw new Error('expectedErr is not an instance of Error or a RegExp');

    if (expectedErr instanceof RegExp) {

        if (!expectedErr.test(actualErr.message)) {

            const diagnostic = createDiagnosticRegexMismatch(actualErr.message, expectedErr);
            const stack = new AssertionError('Expected error message does not match').stack;

            assertions.push({pass: false, description: description ?? 'errorsEquivalent()', diagnostic, stack});

        } else {

            pass(assertions, description ?? 'errorsEquivalent()');

        }

    } else {

        compareErrorObjects(assertions, actualErr, expectedErr, description);

    }

}

function compareErrorObjects(
    assertions: Assertion[],
    actualErr: Error,
    expectedErr: Error|RegExp,
    description?: string
): void {

    if (!(actualErr instanceof Error))
        throw new Error('actualErr is not an instance of Error');
    if (!(expectedErr instanceof Error) && !(expectedErr instanceof RegExp))
        throw new Error('expectedErr is not an instance of Error or a RegExp');

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

export function createDiagnosticRegexMismatch(
    actualErrMsg: string,
    expectedRegEx: RegExp
): string {

    const actual = `${kleur.grey().bold('Actual Error Message:')}\n\n${actualErrMsg}`;
    const expected = `\n\n${kleur.grey().bold('Expected RegEx:')}\n\n${expectedRegEx}`;

    return `${actual}${expected}\n\n`;

}
