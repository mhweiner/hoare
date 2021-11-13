import kleur from 'kleur';
import {TestResultsByFile, FinalResults} from './run';
import {isTestPassing} from './calculateFinalResults';
import {Assertion} from './test';
import {deserializeError, ErrorObject} from 'serialize-error';

const log = console.log;
const successSymbol = kleur.green('✔');
const failureSymbol = kleur.red('✖');
const hr = kleur.gray('\n────────────────────────────────\n');

const noTestErrorTpl = (files: string[]) => kleur.red().bold(`
There are ${files.length} spec files without any tests. This could indicate 
a compilation error (ie. Typescript), or an early runtime error. All files
must have at least one test. The following files did not have any tests:

${files.join(', ')}
`);

export function printFileResults(resultsByFile: TestResultsByFile) {

    const files = Object.entries(resultsByFile);

    files.forEach((file) => {

        const [filename, tests] = file;
        const header = `${kleur.underline().yellow(filename)}\n`;

        log(header);
        tests.forEach(((test) => {

            log(`${test.description} ${isTestPassing(test) ? successSymbol : failureSymbol}`);
            test.assertions.forEach((assertion) => {

                log(kleur.gray(`  ${assertion.description || ''} ${assertion.pass ? successSymbol : failureSymbol}`));
                !assertion.pass && printFailedAssertionDiag(assertion);

            });
            test.error && printError(test.error);
            log('');

        }));

    });

}

function printError(serializedError: ErrorObject) {

    log(hr);
    log(deserializeError(serializedError));
    log(hr);

}

function printFailedAssertionDiag(assertion: Assertion) {

    log(hr);
    assertion.diagnostic && log(assertion.diagnostic);
    assertion.stack && log(kleur.grey(filterStackTrace(assertion.stack)));
    log(hr);

}

export function printSummary(finalResults: FinalResults) {

    const successRate = finalResults.numSuccessfulTests / finalResults.numTests;
    const style = successRate === 1 ? kleur.bold().green : kleur.bold().red;
    const numFilesWithNoTests = finalResults.filesWithNoTests.length;

    log(style(`${finalResults.numSuccessfulTests}/${finalResults.numTests} tests passed`));

    numFilesWithNoTests && log(noTestErrorTpl(finalResults.filesWithNoTests));

}

function filterStackTrace(stack: string) {

    const ignoreRegex = [
        /at Generator.next \(<anonymous>\)/,
        /at new Promise \(<anonymous>\)/,
        /assertions\/index.[ts|js]{2}/,
        /\/hoare\/[src|dist]{3,4}\/test.[ts|js]{2}/,
    ].reduce((combined, exp) => (
        new RegExp(`${combined.source}|${exp.source}`)
    ), new RegExp('a^'));

    return stack.split('\n').reduce((acc, line) => (
        !ignoreRegex.test(line) ? acc.concat([line]) : acc
    ), [] as string[]).join('\n');

}
