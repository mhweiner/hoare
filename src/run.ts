import * as fg from 'fast-glob';
import * as execa from 'execa';
import {fileResults, totalSummary} from './fileResults';

const glob = process.argv[2];
const specFiles = fg.sync([glob]);
const resolves = specFiles.map((file) => execa.command(`ts-node runner.ts ${file}`));

Promise.all(resolves).then((results) => {

    results.forEach((result, i) => (
        fileResults(specFiles[i], JSON.parse(result.stdout))
    ));

    totalSummary();

});
