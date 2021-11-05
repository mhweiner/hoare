import {getTestResults} from './src';
import(`./${process.argv[2]}`).then(() => console.log(JSON.stringify(getTestResults())));

