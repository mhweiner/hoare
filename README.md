![text](docs/hoare-triple.png)

# hoare

[![Build Status](https://github.com/mhweiner/hoare/workflows/build/badge.svg)](https://github.com/mhweiner/hoare/actions)
[![Release Status](https://github.com/mhweiner/hoare/workflows/release/badge.svg)](https://github.com/mhweiner/hoare/actions)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A simple and opinionated Javascript/Typescript testing framework designed to help you to write (and execute) simple, readable, and maintainable GUTS (Good Unit Tests). It is inspired by and named after Sir Tony Hoare (aka C. A. R. Hoare), and the [Hoare Triple](), the cornerstone of Hoare's axiomatic method of testing computer programs (what we largely consider unit testing today).

> There are two ways of constructing a software design: one way is to make it so simple that there are obviously no deficiencies and the other is to make it so complicated that there are no obvious deficiencies. — C. A. R. Hoare

- **Out-of-the-box Typescript support**
  - Written in and designed around Typescript. No special configuration needed, and no plugins to install. Works great with [c8]() for code coverage.
  - Handles compilation errors gracefully.


- **Designed For Speed**
  - Multi-process parallel test runner. Each spec file is run in its own process and runtime for speed and isolation benefits.


- **Async/Await/Promise Support**
  - No need for `plan()` or `end()`, or to wrap every test in catch blocks.


- **Simple & Easy to Use**
  - Simplified assertion API. You shouldn't need to learn a new language to read and write tests. Assertions should be simple axiomatic logic and code, not an English-like poem.
  - Any stray `stdout`, errors, or unhandled promise rejections are buffered and grouped under the test file in the output. This helps you know where they came from.
  - Built-in powerful diff visualization tool for strings and objects.


- **Defensive**
  - Uncaught errors and unhandled promise rejections will cause the test to fail.
  - Any files without tests, or tests without assertions, result in a failed test.
  - Strict and deep equality operator by default.


- **Opinionated**
  - No nesting of tests. This has the following benefits:
    - Pressures programmers to break apart their code into smaller pieces.
    - Test code becomes much simpler and easier to read and maintain.
    - Output reporting becomes much simpler and easier to read and understand.
  - No built-in `before()` and `after()`. This leads to messy design patterns and mistakes in test code. Most tests shouldn't require teardowns. Of course, you could still create your own.


- **Robust & Reliable**
  - The JS/TS ecosystem moves fast. This tool is designed with the goals of simplicity, modularity, and readability in order to remain maintainable. Breaking changes are strongly avoided. This package follows `semver`.
  - Very small filesize, simple, and modular code written in Typescript with minimal dependencies.

> Compositionality is THE way to control complexity.
—Brian Beckman

> Inside every large program, there is a small program trying to get out. - C. A. R. Hoare

## Quick Examples

See [demo](demo) or [src](src) directories for more examples.

### Simple functional test

_multiply.ts_
```typescript
export function multiply(num1: number, num2: number) {
    return num1 * num2;
}
```
_exponent.ts_
```typescript
import {multiply} from './multiply';

export function exponent(base: number, exp: number): number {
    if (exp < 0) throw new Error('exponent must be >= 0');
    switch (exp) {
        case 0:
            return 1;
        case 1:
            return base;
        default:
            return multiply(base, exponent(base, exp - 1));
    }
}
```
_exponent.spec.ts_
```typescript
import {isolate, test} from 'hoare';
import * as exponentModule from './exponent'; //used only for typing

test('exponent(): alternate reality where multiplication is actually addition', (assert) => {
    //mock out ./mulitpy import
    //`typeof exponentModule` is used for typing
    const mockExp: typeof exponentModule = isolate('./exponent', {imports: [
        ['./multiply', {multiply: (a: number, b: number) => a + b}]
    ]});

    assert.plan(4);
    assert.deepEqual(mockExp.exponent(1, 0), 1, 'exponent(1, 0) should be 1');
    assert.deepEqual(mockExp.exponent(2, 4), 8, 'exponent(2, 4) should be 8');
    assert.deepEqual(mockExp.exponent(3, 3), 9, 'exponent(3, 3) should be 9');
});
```

## Sample Output

## Installation

1. Install from npm:

    ```shell script
    npm i hoare -DE
    ```
1. Create an `.nycrc` file in the root of your project with the following:
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
1. Add "hoare" command to your `npm test` script:
```
"scripts": {
    "test": "hoare"
    ...
}
```

## Basic Usage

Write your tests with a `.spec.ts` extension. To run your tests and get a coverage report, simply run `npm test`.

_foo.ts_
```typescript
export function foo() { return 'flooble'; }
```
_foo.spec.ts_
```typescript
import {test} from 'hoare';
import {foo} from './foo';

test('foo()', async (assert) => {
    assert.plan(1);
    assert.deepEqual(foo(), 'flooble', 'should return "flooble"');
});
```

## API

### `test(title: string, cb: (assert: Assert) => void, options?: TestOptions): void`

Add a test to be picked up by the test runner. `cb` can be an `async` function or ES6 Promise.

### `skip(title: string, cb: (assert: Assert) => void, options?: TestOptions): void`

An alias for `test` with `markAs = 'skip'`. 

### `only(title: string, cb: (assert: Assert) => void, options?: TestOptions): void`

An alias for `test` with `markAs = 'only'`. 

### `suite(suiteTitle: string): {test, skip, only}`

Creates a grouping for tests. It simply appends whatever is passed as `suiteTitle` to each test in the suite. Returns an object with `test()`, `skip()`, and `only()` functions.

### `isolate(modulePath: string, mocks: Mocks): module`

`Mocks` interface:
```
{
    imports?: [string, any][] //must be relative to module being isolated
    props?: [string, any][] //only works if module uses "self-import" technique
}
```

Returns a module with Dependency Injection for `modulePath`, as specified by the `mocks` argument. As a side effect, the module cache is deleted (before and after) for module specified by `modulePath` and all modules specified in `mocks.imports`. This should not matter during unit testing, but it is something to be aware of. This method (along with the rest of this package) should not be used in production code.

You should pass as a string the same thing you would pass to an `import` statement or `require`. The only caveats are that 1) any relative paths be relative to the module being returned, and 2) it must only be a direct dependency of that module (will not work recursively, including re-exported modules).

This function throws if any of the modules or properties are not resolvable, or if there are any unused (not imported by the subject):
```
Error: The following imports were not found in module ./exponent: 
        path

```

Example usage:

```typescript
import * as fooModule from './foo'; //not emitted since only used for type

const m: typeof fooModule = isolate('./foo', {
    imports: [
        ['./bar', {bar: () => 'fake bar'}]
    ]
});
```

You can use this function recursively for partial mocking of nested dependencies:

```typescript
const m = isolate('./foo', {
    imports: [
        ['.', isolate('./bar', {
            imports: [
                ['bob', () => 'fake bob']
            ]       
        })]
    ]
});
```

#### Partial mocking (`mocks.props`)

Unfortunately, partial mocking with `mocks.props` requires a slight change in the code. In order to be able to properly mock out a module property, it must reference the "live view" module, not just a local function. Let's call this the "self-import" technique:

_helloworld.ts_
```typescript
import * as self from './helloworld';

export function hello() {
    return 'hello';
}

export function world() {
    return 'world';
}

export function greet() {
    return `${self.hello()} ${self.world()}`;
}
```

Then, you can do this:

```typescript
import {isolate} from 'hoare';
import * as helloWorldModule from './helloworld';

const mocked: typeof helloWorldModule = isolate('./helloworld', {
    props: [
        ['hello', () => 'greetings'],
        ['world', () => 'earthling'],
    ],
});
    
console.log(mocked.greet()); //greetings earthling
console.log(helloWorldModule.greet());//hello world
```
"Props" (pun intended) goes to [this chap](https://stackoverflow.com/questions/54318830/why-does-mutating-a-module-update-the-reference-if-calling-that-module-from-anot) on SO.

For further reading, please see [Mocking strategy and a disclaimer](#mocking-strategy-and-a-disclaimer).

### `stub(): SinonStub`

Returns a [sinon](https://sinonjs.org/) stub.

## Interfaces

### `Assert`

#### `plan(n: number): void`

Asserts that there must be a certain number of tests. Any less and the test will time out. Any more and the test will fail immediately.

#### `deepEqual(actual: any, expected: any, msg?: string): void`

The same as `tape`'s `deepEqual` function which asserts deep and strict equality on objects or primitives. Unless your code is non-deterministic, [this should be the only assertion you need](https://medium.com/javascript-scene/rethinking-unit-test-assertions-55f59358253f). We include others here for convenience, but the goal is to keep the number of assertions very small.

#### `errorsEquivalent(err1: any, err2: any, msg?: string)`

Asserts that both errors are similar. Stack traces are ignored. It checks for both non-enumerable properties
(ie, `name` and `message`) and enumerable properties (anything added by extending `Error`).

Both errors **must** be an instance of `Error`, or an error will be thrown. See [validate.spec.ts](examples/validate.spec.ts) example.

### `TestOptions`

#### `timeout?: number`

Test will time out after this threshold.

#### `markAs?: 'only' | 'skip'`

It is recommended you use aliases `only()` and `skip()` instead for readability and consistenecy.

### `Mocks`

#### `imports?: [string, any][]`

Must be relative to module being isolated.

#### `props?: [string, any][]`

Only works if module uses "self-import" technique (see [isolate(): partial mocking](#partial-mocking-mocksprops)).

## Mocking strategy and a disclaimer

Mocking consists of two different activities&mdash;dependency injection and the creation of "stub/mock objects" which are meant to mimic dependencies or provide instrumentation for the System Under Test (SUT). The latter is fairly straightforward, which is not covered here. The former, however, can by tricky, especially for node applications.

In general, _Dependency Injection (DI)_ means being able to swap out one dependency for another during runtime. This is what allows you to "isolate" your SUT from other code (namely, its dependencies). This is what makes unit testing possible for systems that have dependencies, without requiring some kind of special transpilation or reflection.

There are several methods to achieve this. One approach is to simply pass all of these dependencies as arguments to a function or object constructor. This is what is commonly referred to as DI. There are also frameworks that help manage this for you, but many come with a steep learning curve and a huge buy-in. This project offers a much simpler, yet less robust alternative for node projects, `isolate()`.

As it turns out, we can enhance CommonJS to create our own utility to do DI into node modules. This is possible due to fact that `Module.require()` can be "overridden". Other libraries like [rewire](https://www.npmjs.com/package/rewire) and [proxyquire](https://www.npmjs.com/package/proxyquire) take a similar approach. Unfortunately, node modules are singletons&mdash;meaning, once they are created, they are immutable, and they exist globally. This is incompatible with the "atomic tests" principle. We can get around this by deleting the cached module before and after, but only for the modules that we care about. This way, there should be no pollution between tests, obviating the need for mutation or teardown steps.

In the past, libraries like `sinon` utilized module export mutation. However, since ES6 modules are immutable, this no longer works. In any case, mutating global singletons is not the best choice and always had limitations.

Whenever possible, it is highly recommended avoiding the need for teardown steps in unit tests. For one, they are easy to forget. Most importantly, it's not always obvious when you have forgotten one or got it wrong. You may have faulty tests that still pass, or unexpected behavior that is difficult to debug.

`isolate()` further helps out by throwing if it detects anything is wrong before it's too late. It will throw if any of the modules or properties are not resolvable, and if there are any unused (not imported by the subject).

All that said, the NodeJS ecosystem is always rapidly changing, and it is possible this strategy may no longer work at some point in the future.

## Why doesn't this package include module mocking and code coverage?

Simplicity and separation of concerns. It's really easy for one to fixate on the ideal of a single package to solve everything. It's actually the idea I started with. However, one must be willing to let go of these ideals once it is clear that the disadvantages outweigh the benefits.

Currently, there is a major shift in the Javascript world from CJS to ESM in how module resolution and loading works. These two are largely incompatible with each other. Instead, it would make more sense for `hoare` to stay agnostic to these tools, and allow people to use the tools they need, given their situation -- and to rely on that tool's documentation for configuration and changes. Their dependencies also remain their problem, not the maintainers of this package.

Instead, we simply provide great instructions in this documentation on how to get set up and running, depending on your environment. That is **much** simpler than including these tools as dependencies and passing through and maintaining a never-ending maze of options.

## Recommendations for writing Good Unit Tests

> The real value of tests is not that they detect bugs in the code, but that they detect inadequacies in the methods, concentration, and skills of those who design and produce the code. — C. A. R. Hoare

## How to build locally

```bash
npm i
```

## Running tests

```shell script
npm test
```

## How to contribute

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
