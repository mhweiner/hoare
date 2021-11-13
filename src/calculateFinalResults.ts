import {TestResults} from './test';
import {TestResultsByFile, FinalResults} from './run';

export function calculateFinalResults(specFiles: string[], testResults: TestResultsByFile): FinalResults {

    const filesWithTests = Object.entries(testResults);
    const numFiles = filesWithTests.length;
    const filesWithNoTests = specFiles.reduce((files, filename) => (
        testResults[filename] ? files : files.concat([filename])
    ), [] as string[]);
    const numTests = filesWithTests.reduce((acc, file) => acc + file[1].length, 0);
    const numSuccessfulTests = filesWithTests.reduce((acc, file) => (
        acc + file[1].reduce((acc, test) => (
            acc + (isTestPassing(test) ? 1 : 0)
        ), 0)
    ), 0);

    return {numFiles, numTests, numSuccessfulTests, filesWithNoTests};

}

/**
 * All assertions must pass, with no errors, and at least one assertion.
 * @param test
 */
export function isTestPassing(test: TestResults) {

    if (!test.assertions.length) return false;
    if (test.error) return false;

    return test.assertions.reduce((pass, assertion) => pass && assertion.pass, true);

}

export function shouldExitWithError(finalResults: FinalResults) {

    return finalResults.filesWithNoTests.length || finalResults.numSuccessfulTests / finalResults.numTests !== 1;

}
