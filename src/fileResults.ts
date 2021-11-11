import {Assertion, TestResults} from './test';
import chalk from 'chalk';

const log = console.log;

let passedTests = 0;
let failedTests = 0;

const successSymbol = chalk.greenBright('✔');
const failureSymbol = chalk.redBright('✖');

export function fileResults(filename: string, tests: TestResults[]) {

    log(`${chalk.underline.yellow(filename)}\n`);
    tests.forEach(((test) => {

        const pass = isTestPassed(test.assertions);

        // eslint-disable-next-line no-plusplus
        pass ? passedTests++ : failedTests++;

        log(`${test.description} ${pass ? successSymbol : failureSymbol}`);
        test.assertions.forEach((assertion) => {

            log(chalk.gray(`  ${assertion.description || ''} ${assertion.pass ? successSymbol : failureSymbol}`));

        });
        log('');

    }));

}

export function totalSummary() {

    const totalTests = passedTests + failedTests;
    const successRate = passedTests / totalTests;
    const style = successRate === 1 ? chalk.greenBright : chalk.redBright;

    log(style(`${passedTests}/${totalTests} tests passed`));

}

function isTestPassed(assertions: Assertion[]): boolean {

    for (let i = 0; i < assertions.length; i++) {

        if (!assertions[i].pass) return false;

    }

    return true;

}
