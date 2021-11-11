import {createAssertionPredicates} from './assertions';

export type TestResults = {
    description: string
    assertions: Assertion[]
};

export type Assertion = {
    pass: boolean
    name?: string
    description?: string
};

type AssertionAPI = ReturnType<typeof createAssertionPredicates>;

export async function test(description: string, experiment: (assert: AssertionAPI) => void) {

    if (process.env.NODE_ENV === 'production') throw new Error('not for use in production');

    const assertions: Assertion[] = [];
    const expAsync = async () => experiment(createAssertionPredicates(assertions));

    await expAsync();

    // @ts-ignore
    process.send({description, assertions});

}
