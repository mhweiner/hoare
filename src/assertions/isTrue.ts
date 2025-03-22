import {Assertion} from '../test';
import * as util from 'util';
import kleur from 'kleur';
import {AssertionError} from './AssertionError';

export function isTrue(assertions: Assertion[], condition: boolean, description?: string) {

    const descWithDefault = description || 'isTrue()';

    if (condition) {

        assertions.push({pass: true, description: descWithDefault});

    } else {

        const diagnostic = createDiagnostic(condition);
        const stack = new AssertionError('is not true').stack;

        assertions.push({pass: false, description: descWithDefault, diagnostic, stack});

    }

}

function createDiagnostic(actual: any) {

    const actualStr = util.inspect(actual, {colors: true, depth: null});

    const sectionActual = `${kleur.grey().bold('Actual:')}\n\n${actualStr}`;

    return `${sectionActual}\n`;

}

