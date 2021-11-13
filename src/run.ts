import {TestResults} from './test';
import ora from 'ora';
import fg from 'fast-glob';
import {printFileResults, printSummary} from './output';
import {calculateFinalResults, shouldExitWithError} from './calculateFinalResults';
import {createPool} from './workerPool';

const log = console.log;
const specFiles = fg.sync([process.argv[2]]);

export type TestResultsByFile = {[file: string]: TestResults[]};
export type FinalResults = {
    numFiles: number
    numTests: number
    numSuccessfulTests: number
    filesWithNoTests: string[]
};

const testResultsByFile: TestResultsByFile = {};

let numCompletedTests = 0;

log(`Found ${specFiles.length} spec files.\n`);

const status = ora({
    spinner: 'line',
    text: 'Running tests...',
}).start();

createPool(specFiles, addTestResults, finish);

/**
 * Calculate results, update status, output results, and exit appropriately.
 */
function finish() {

    // update status
    status.stop();

    // tabulate results
    const finalResults = calculateFinalResults(specFiles, testResultsByFile);

    // print results by file
    printFileResults(testResultsByFile);

    // output totals summary
    printSummary(finalResults);

    // exit appropriately
    if (shouldExitWithError(finalResults)) process.exit(1);

}

/**
 * Add TestResults and update status.
 * @param file
 * @param results
 */
function addTestResults(file: string, results: TestResults) {

    numCompletedTests = numCompletedTests + 1;
    testResultsByFile[file] = (testResultsByFile[file] || []).concat([results]);

    // update status
    status.text = `${numCompletedTests} tests completed.`;

}
