import fg from 'fast-glob';
import execa from 'execa';

const specFiles = fg.sync(['demo/**/*.spec.ts']);

console.log(`found files: ${specFiles}`);

const resolves = specFiles.map((file) => execa.command(`ts-node runner.ts ${file}`));

Promise.all(resolves).then((results) => results.map((result, i) => (
    console.log({
        file: specFiles[i],
        stdout: result.stdout,
    })
)));
