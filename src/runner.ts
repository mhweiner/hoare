import {getTestResults} from './test';
import(`./${process.argv[2]}`).then(() => console.log(JSON.stringify(getTestResults())));
