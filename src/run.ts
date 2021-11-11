import {cpus} from 'os';
import {fork} from 'child_process';
import {TestResults} from './test';
import {fileResults, totalSummary} from './fileResults';
import ora from 'ora';
import fg from 'fast-glob';

const log = console.log;
const numCores = cpus().length; // will be the size of our worker pool
const testResultsByFile: {[file: string]: TestResults[]} = {};
const specFiles = fg.sync([process.argv[2]]);

let numWorkers = 0;
let currentSpecFileIndex = 0;
let numCompletedTests = 0;

log(`Found ${specFiles.length} spec files.\n`);

const status = ora({
    spinner: 'line',
    text: 'Running tests...',
}).start();

function finish() {

    status.stop();
    specFiles.forEach((file) => fileResults(file, testResultsByFile[file]));
    totalSummary();

}

function addResults(file: string, results: TestResults) {

    numCompletedTests = numCompletedTests + 1;
    testResultsByFile[file] = (testResultsByFile[file] || []).concat([results]);
    status.text = `${numCompletedTests} tests completed.`;

}

function next() {

    if (currentSpecFileIndex >= specFiles.length && numWorkers === 0) finish();
    if (currentSpecFileIndex >= specFiles.length) return;
    if (numWorkers >= numCores) return;

    const file = specFiles[currentSpecFileIndex];
    const worker = fork(file);

    numWorkers++;
    currentSpecFileIndex++;

    worker.on('close', () => {

        numWorkers--;
        next();

    });

    worker.on('message', (msg) => addResults(file, msg as TestResults));

    next();

}

next();
