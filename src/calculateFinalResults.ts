import {TestResultsByFile} from './run';
import {isTestPassing} from './isTestPassing';

export function calculateFinalResults(specFiles: string[], testResults: TestResultsByFile) {

    const numFiles = Object.keys(testResults).length;
    const filesWithNoTests = specFiles.reduce((files, filename) => (
        testResults[filename] ? files : files.concat([filename])
    ), [] as string[]);
    const numTests = Object.values(testResults).reduce((acc, results) => acc + results.length, 0);
    const numSuccessfulTests = Object.values(testResults).reduce((acc, results) => (
        acc + results.reduce((acc, test) => (
            acc + (isTestPassing(test) ? 1 : 0)
        ), 0)
    ), 0);

    return {numFiles, numTests, numSuccessfulTests, filesWithNoTests};

}
