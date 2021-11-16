<img src="docs/hoare-triple.png" title="Hoare Triple" alt="Hoare Triple" width="200">

# hoare

[![Build Status](https://github.com/mhweiner/hoare/workflows/build/badge.svg)](https://github.com/mhweiner/hoare/actions)
[![Release Status](https://github.com/mhweiner/hoare/workflows/release/badge.svg)](https://github.com/mhweiner/hoare/actions)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A simple and opinionated Javascript/Typescript testing framework designed to help you to write and execute simple, readable, and maintainable tests. 

**Out-of-the-box Typescript support 🔒**
- Written in and designed around Typescript. No special configuration needed, and no plugins to install. Works great with [c8]() for code coverage.
- Handles compilation errors gracefully.

**Designed For Speed 🚀**
- Multi-process parallel test runner. Each spec file is run in its own process and runtime for speed and isolation benefits.

**Easy to Use 😃**
- [Simplified assertion API](). You shouldn't need to learn a new language to read and write tests. Assertions should be simple axiomatic logic and code, not an English-like poem.
- Any stray `stdout`, errors, or unhandled promise rejections are buffered and grouped under the test file in the output. This helps you know where they came from.
- Built-in powerful diff visualization tool for strings and objects.
- Clear documentation.

**Defensive 🛡**
- Uncaught errors and unhandled promise rejections will cause the test to fail.
- Any files without tests, or tests without assertions, result in a failed test.
- Strict and deep equality operator by default.

**Opinionated 🎓**
- No nesting of tests. This has the following benefits:
  - Pressures programmers to break apart their code into smaller pieces.
  - Test code becomes much simpler and easier to read and maintain.
  - Output reporting becomes much simpler and easier to read and understand.
- No built-in `before()` and `after()`. This leads to messy design patterns and mistakes in test code. Most tests shouldn't require teardowns. Of course, you could still create your own.

**Robust & Reliable 💪**
- Small, simple, and modular codebase written in Typescript with minimal dependencies.
- Breaking changes are discouraged. This package follows `semver`.

**Modern Langauge Features ✨**
  - Async/Await/Promise Support

| Table of Contents |
|-------------------|
| [Examples](#examples) |
| [Diff Visual Tool]() |
| [Installation]() |
| [Basic Usage]() |
| [API]() |
| [Interfaces]() |
| [Inspiration & Attribution]() |
| [Local Development]() |
| [Running Tests]() |
| [How to Contribute]() |
| [License]() |

# Examples

See [demo](demo) or [src](src) directories for more examples.

## Hello World

_helloworld.ts_
```typescript
export function helloworld() {
  return 'hello, world';
}
```
_helloworld.spec.ts_
```typescript
import {test} from 'hoare';
import {helloworld} from './helloworld';

test('should return "hello, world"', (assert) => {
  assert.equal(helloworld(), 'hello, world');
});
```
## Valid Word

_isValidWord.ts_
```typescript
import {readFile} from 'fs/promises';

export async function isValidWord(word: string) {
  const validWords = await getValidWords();
  return validWords.indexOf(word) !== -1;
}

async function getValidWords() {
  const contents = await readFile('./dict.txt', 'utf-8');
  return contents.split('\n');
}
```
_isValidWord.spec.ts_
```typescript
import {test, mock} from 'hoare';
import * as mod from './isValidWord'; // just used for typing

const dict = ['dog', 'cat', 'fish'].join('\n');
const mockMod: typeof mod = mock('./isValidWord', {
    'fs/promises': {readFile: () => Promise.resolve(dict)},
});

test('valid word returns true', async (assert) => {
  const result = await mockMod.isValidWord('dog');
  assert.equal(result, true);
});

test('invalid word returns false', async (assert) => {
  const result = await mockMod.isValidWord('nope');
  assert.equal(result, false);
});
```

# Diff Visual Tool

WIP

# Installation

1. Install from npm along with peer dependencies:

    ```shell script
    npm i typescript ts-node c8 hoare -DE
    ```
2. Create an `.c8rc.json` file in the root of your project with the following:
    ```
    {
        "extends": "@istanbuljs/nyc-config-typescript",
        "all": true,
        "exclude": [
            "**/*.spec.ts",
            "**/*.d.ts",
            "**/*.spec.js",
            "coverage",
            ".eslintrc.js",
            ".eslintrc",
            "tests",
            "test",
            "test_utils"
        ]
    }
    ```
3. Add "hoare" command to your `npm test` script:
```
"scripts": {
    "test": "hoare"
    ...
}
```

# Basic Usage

1. Write your tests with a `.spec.ts` or `.spec.js` extension (although any extension will work, as long as it matches your glob in your `npm test` script). We highly recommend you put your spec files alongside your code, and not in a separate folder.
2. Simply run `npm test`.

# API

## `test(title: string, cb: (assert: Assert) => void): void`

Add a test to be picked up by the test runner. `cb` can be an `async` function or ES6 Promise.

## `mock(modulePath: string, mocks: object): module`

Returns a module with Dependency Injection for `modulePath`, as specified by the `mocks` argument. As a side effect, the module cache is deleted (before and after) for module specified by `modulePath` and all modules specified in `mocks`. This should not matter during unit testing, but it is something to be aware of. This should not be used in production code.

You should pass as a string the same thing you would pass to an `import` statement or `require`. The only caveats are that 1) any relative paths be relative to the module being returned, and 2) it must only be a direct dependency of that module (will not work recursively, including re-exported modules).

This function throws if any of the modules or properties are not resolvable, or if there are any unused (not imported by the subject):
```
Error: The following imports were not found in module ./exponent: 
        path
```

Example usage:

```typescript
import * as fooModule from './foo'; //not emitted since only used for type

const m: typeof fooModule = mock('./foo', {
    './bar': {bar: () => 'fake bar'},
});
```

You can use this function recursively for partial mocking of nested dependencies (although you should probably think twice about this):

```typescript
const m = mock('./foo', {
    '.': mock('.bar', {
        'bob': () => 'fake bob'
    }),
});
```

## `stub(): SinonStub`

Returns a [sinon](https://sinonjs.org/) stub.

# Interfaces

## `Assert`

### `equal(actual: any, expected: any, msg?: string): void`

The same as `tape`'s `deepEqual` function which asserts deep and strict equality on objects or primitives. Unless your code is non-deterministic, [this should be the only assertion you need](https://medium.com/javascript-scene/rethinking-unit-test-assertions-55f59358253f). We include others here for convenience, but the goal is to keep the number of assertions very small.

### `errorsEquivalent(err1: any, err2: any, msg?: string)`

Asserts that both errors are similar. Stack traces are ignored. It checks for both non-enumerable properties
(ie, `name` and `message`) and enumerable properties (anything added by extending `Error`).

Both errors **must** be an instance of `Error`, or an error will be thrown. See [validate.spec.ts](examples/validate.spec.ts) example.

# Inspiration & Attribution

`hoare` is named after Sir Tony Hoare (aka C. A. R. Hoare), and the [Hoare Triple](), the cornerstone of Hoare's axiomatic method of testing computer programs (what we largely consider unit testing today).

After years of working on mission and safety-critical software in healthcare, education and e-commerce industries, I have come to appreciate the importance of clean, readable, and maintainable unit tests and the profound effect they can have on the development of the code itself.

Good unit tests force programmers to break apart their code into smaller, more easily testable parts. Unfortunately, testing frameworks have become ever-complex to address deficiencies in design, when they should be doing the opposite. I have found that even properly encapsulated unit tests tend be over-complex and difficult to reason about.

A unit test should act as a **_specification_** for the behavior of the code that we're testing. The Hoare Triple, written as `{P} S {Q}`, provides a way for us to specify this expected behavior. Each part is a logical statement that must be true for the test to pass: `pre-condition`, `execution`, and `post-condition`. The Hoare Triple is an easy way to reason about how a piece of code should behave, and a good unit test should clearly communicate this to the reader. I often use `given`, `when`, `then` in my unit tests.

Difficult-to-read unit tests also increase the likelihood of lack of maintenance, abandonment, or errors in the test itself. Bad tests are actually worse than not having a test at all&mdash;they could give false confidence or just add friction.

I have been a fan and longtime user of [tape](), and this package takes much inspiration from it. Inspiration has also been taken from [AVA]() and [node-tap]().

I also must give huge credit to this article written by blah:


> Inside every large program, there is a small program trying to get out. — C. A. R. Hoare

> There are two ways of constructing a software design: one way is to make it so simple that there are obviously no deficiencies and the other is to make it so complicated that there are no obvious deficiencies. — C. A. R. Hoare

> The real value of tests is not that they detect bugs in the code, but that they detect inadequacies in the methods, concentration, and skills of those who design and produce the code. — C. A. R. Hoare

# Local Development

```bash
npm i
```

# Running tests

```shell script
npm test
```

# How to Contribute

Issue a PR against `master` and request review. Make sure all tests pass and coverage is good.

## Releases

This package follows [Semver](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to determine how to version the codebase. This repo uses Github Actions to publish a release to npm.


| Branch | Channel |
| ----------------------- | ----------- |
| `candidate-<name>` | Publish an `rc` prerelease the `rc-{name}` channel. |
| `master` | Publish a release to the `default distribution` channel. |


| Conventional Commit Type | Description |
| ----------------------- | ----------- |
| `BREAKING-CHANGE` | Bump the API's `major` version number. |
| `feat` | Bump the API's `minor` version number. |
| `fix` | Bump the API's `patch` version number. |
| `build` | Bump the API's `patch` version number. |
| `ci` | Bump the API's `patch` version number. |
| `refactor` | Bump the API's `patch` version number. |
| `style` | Bump the API's `patch` version number. |
| `perf` | Bump the API's `patch` version number. |
| `docs` | No version number change. |
| `test` | No version number change. |



# License

MIT &copy; Marc H. Weiner

[See full license](LICENSE)
