import {Assertion, TestResults} from './test';

let passedTests = 0;
let failedTests = 0;

export function fileResults(filename: string, tests: TestResults[]) {

    console.log(`<${filename}>\n`);
    tests.forEach(((test) => {

        const pass = isTestPassed(test.assertions);

        // eslint-disable-next-line no-plusplus
        pass ? passedTests++ : failedTests++;

        console.log(`${test.description} [${pass ? 'PASS' : 'FAIL'}]`);
        test.assertions.forEach((assertion) => {

            console.log(`  ${assertion.description || ''} ${assertion.pass ? '[PASS]' : '[FAIL]'}`);

        });
        console.log('');

    }));

}

export function totalSummary() {

    console.log(`${passedTests}/${passedTests + failedTests} tests passed`);

}

function isTestPassed(assertions: Assertion[]): boolean {

    for (let i = 0; i < assertions.length; i++) {

        if (!assertions[i].pass) return false;

    }

    return true;

}
