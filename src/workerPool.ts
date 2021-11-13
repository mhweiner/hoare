import {cpus} from 'os';
import attemptSync from './attemptSync';
import {fork} from 'child_process';
import {TestResults} from './test';

const numCores = cpus().length; // will be the size of our worker pool

let numWorkers = 0;
let currentSpecFileIndex = 0;

type OnMessageFunc = (file: string, testResults: TestResults) => void;

export function createPool(specFiles: string[], onMessage: OnMessageFunc, onFinish: () => void) {

    function next() {

        if (currentSpecFileIndex >= specFiles.length && numWorkers === 0) onFinish();
        if (currentSpecFileIndex >= specFiles.length) return;
        if (numWorkers >= numCores) return;

        const file = specFiles[currentSpecFileIndex];
        const [err, worker] = attemptSync(() => fork(file));

        if (err) {

            throw new Error(`failed to create worker for ${file}`);

        }

        numWorkers++;
        currentSpecFileIndex++;
        worker.on('close', () => {

            numWorkers--;
            next();

        });
        worker.on('message', (msg) => onMessage(file, msg as TestResults));
        next();

    }

    next();

}
