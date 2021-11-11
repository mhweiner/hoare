import {cpus} from 'os';
import {fork} from 'child_process';
import {getSpecFiles} from './getSpecFiles';
import {TestResults} from './test';
import {fileResults, totalSummary} from './fileResults';
import ora from 'ora';

const log = console.log;

const specFiles = getSpecFiles();
const numSpecFiles = specFiles.length;
const numCores = cpus().length; // will be the size of our worker pool

log(`Found ${numSpecFiles} spec files.\n`);

const status = ora({
    text: 'Running tests...',
    spinner: 'line',
}).start();

let numWorkers = 0;
let currentSpecFileIndex = 0;
let numCompletedTests = 0;

const testResultsByFile: {[file: string]: TestResults[]} = {};

function addResults(file: string, results: TestResults) {

    numCompletedTests = numCompletedTests + 1;
    testResultsByFile[file] = (testResultsByFile[file] || []).concat([results]);
    status.text = `${numCompletedTests} tests completed.`;

}

function next() {

    if (currentSpecFileIndex >= numSpecFiles && numWorkers === 0) finish();
    if (currentSpecFileIndex >= numSpecFiles) return;
    if (numWorkers >= numCores) return;

    const file = specFiles[currentSpecFileIndex];
    const worker = fork(file);

    numWorkers = numWorkers + 1;
    currentSpecFileIndex = currentSpecFileIndex + 1;

    worker.on('close', () => {

        numWorkers = numWorkers - 1;
        next();

    });

    worker.on('message', (msg) => addResults(file, msg as TestResults));

    next();

}

next();

function finish() {

    status.stop();
    specFiles.forEach((file) => fileResults(file, testResultsByFile[file]));
    totalSummary();

}
