import {Assertion} from '../test';
import {deepStrictEqual} from '../deepStrictEqual';
import {diff as diffObj} from 'deep-object-diff';
import {diffChars as diffStr} from 'diff';
import * as util from 'util';
import kleur from 'kleur';
import {AssertionError} from './AssertionError';

export function equal(assertions: Assertion[], actual: any, expected: any, description?: string) {

    if (deepStrictEqual(actual, expected)) {

        assertions.push({pass: true, description});

    } else {

        const diagnostic = createDiagnostic(actual, expected);
        const stack = new AssertionError('not deeply and strictly equivalent').stack;

        assertions.push({pass: false, description, diagnostic, stack});

    }

}

function getDiff(actual: any, expected: any) {

    return (typeof actual === 'string' && typeof expected === 'string' && stringVisualDiff(actual, expected))
        || (typeof actual === 'object' && typeof expected === 'object' && util.inspect(diffObj(actual, expected), {
            colors: true,
            depth: null,
        }))
        || '';

}

function createDiagnostic(actual: any, expected: any) {

    const diff = getDiff(actual, expected);
    const actualStr = util.inspect(actual, {colors: true, depth: null});
    const expectedStr = util.inspect(expected, {colors: true, depth: null});

    const sectionActual = `${kleur.grey().bold('Actual:')}\n\n${actualStr}`;
    const sectionExpected = `\n\n${kleur.grey().bold('Expected:')}\n\n${expectedStr}`;
    const sectionDiff = diff && `\n\n${kleur.grey().bold('Diff:')}\n\n${diff}`;

    return `${sectionActual}${sectionExpected}${sectionDiff}\n`;

}

function stringVisualDiff(actual: string, expected: string) {

    return diffStr(actual, expected).reduce((str, part) => str + (
        part.added ? kleur.bgGreen().black(part.value) : part.removed
            ? kleur.bgRed().white(part.value) : kleur.white(part.value)
    ), '');

}
