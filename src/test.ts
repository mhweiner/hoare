type TestResults = {
    title: string
    assertions: Assertion[]
};

type Assertion = {
    pass: boolean
    name?: string
    description?: string
    error?: string
};

const testResults: TestResults[] = [];

function createAssertionPredicates(assertions: Assertion[]) {

    return {
        pass: () => assertions.push({pass: true}),
        fail: () => assertions.push({pass: false}),
    };

}

export async function test(title: string, experiment: (assert: ReturnType<typeof createAssertionPredicates>) => void) {

    if (process.env.NODE_ENV === 'production') throw new Error('not for use in production');

    const assertions: Assertion[] = [];
    const expAsync = async () => experiment(createAssertionPredicates(assertions));

    await expAsync();

    testResults.push({title, assertions});

}

export function getTestResults() {

    return testResults;

}
