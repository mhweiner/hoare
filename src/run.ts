import {TestResults} from './test';
import ora from 'ora';
import {printFileResults, printSummary} from './output';
import {calculateFinalResults} from './calculateFinalResults';
import {createPool} from './workerPool';
import {shouldExitWithError} from './shouldExitWithError';
import {getSpecFiles} from './getSpecFiles';

const testResultsByFile: TestResultsByFile = {};
let numCompletedTests = 0;

export type TestResultsByFile = {[file: string]: TestResults[]};
export type FinalResults = {
    numFiles: number
    numTests: number
    numSuccessfulTests: number
    filesWithNoTests: string[]
};

const status = ora({
    spinner: 'line',
});

async function start() {

    const specFiles = await getSpecFiles();

    console.log(`Found ${specFiles.length} spec files.\n`);
    status.start('Running tests...');
    createPool(specFiles, addTestResults, () => finish(specFiles));

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

function finish(specFiles: string[]) {

    status.stop();

    const finalResults = calculateFinalResults(specFiles, testResultsByFile);

    printFileResults(testResultsByFile);
    printSummary(finalResults);
    if (shouldExitWithError(finalResults)) {

        console.log('exiting');
        process.exit(1);

    }

}

start().catch(console.log.bind(console));
