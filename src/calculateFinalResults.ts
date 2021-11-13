import {TestResultsByFile} from './run';
import {isTestPassing} from './isTestPassing';

export function calculateFinalResults(specFiles: string[], testResults: TestResultsByFile) {

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
