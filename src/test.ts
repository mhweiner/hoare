import tape from 'tape';
import {errorsEquivalent} from './assertions/errorsEquivalent';

interface Assert {
    plan(n: number): void
    deepEqual(actual: any, expected: any, msg?: string): void
    errorsEquivalent(actualErr: any, expectedErr: any, msg?: string): void
}

interface TestOptions {
    timeout?: number
    markAs?: 'only' | 'skip'
}

export async function test(title: string, cb: (assert: Assert) => any, options?: TestOptions) {

    if (process.env.NODE_ENV === 'production') throw new Error('not for use in production');

    const cbAsync = async (assert: Assert) => cb(assert); // make async if not already
    const tapeFn = options?.markAs === 'only' ? tape.only : tape;

    tapeFn(title, {
        timeout: options?.timeout || 50,
        skip: options?.markAs === 'skip',
    }, (t) => {

        const assert: Assert = {
            plan: t.plan,
            deepEqual: t.deepEqual,
            errorsEquivalent: (actualErr, expectedErr, msg) => errorsEquivalent(t, actualErr, expectedErr, msg),
        };

        cbAsync(assert)
            .catch((e) => {

                console.error(e);
                t.fail(e);

            })
            .finally(() => t.end());

    });

}

export function skip(title: string, cb: (assert: Assert) => any, options?: TestOptions) {

    test(title, cb, {...options, markAs: 'skip'});

}

export function only(title: string, cb: (assert: Assert) => any, options?: TestOptions) {

    test(title, cb, {...options, markAs: 'only'});

}
