import {createAssertionPredicates} from './assertions';
import attempt from './attempt';
import {serializeError, ErrorObject} from 'serialize-error';

export type TestResults = {
    description: string
    assertions: Assertion[]
    error?: ErrorObject
};

export type Assertion = {
    pass: boolean
    name?: string
    description?: string
    diagnostic?: string
    stack?: string
};

type AssertionAPI = ReturnType<typeof createAssertionPredicates>;

export async function test(description: string, experiment: (assert: AssertionAPI) => void) {

    const assertions: Assertion[] = [];
    const expAsync = async () => experiment(createAssertionPredicates(assertions));
    const [err] = await attempt(expAsync());

    if (err) {

        sendTestResults({
            description,
            assertions: [],
            error: serializeError(err),
        });

    } else {

        sendTestResults({description, assertions});

    }

}

function sendTestResults(results: TestResults) {

    // @ts-ignore
    process.send(results);

}
