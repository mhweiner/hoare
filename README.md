<picture>
    <source srcset="docs/hoare-logo.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/hoare-logo-dark.svg" media="(prefers-color-scheme: light)">
    <img src="docs/hoare-logo-dark.svg" alt="Logo" style="margin: 0 0 10px" size="250">
</picture>

---

[![build status](https://github.com/mhweiner/hoare/actions/workflows/release.yml/badge.svg)](https://github.com/mhweiner/hoare/actions)
[![semantic-release](https://img.shields.io/badge/semantic--release-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![SemVer](https://img.shields.io/badge/SemVer-2.0.0-blue)]()

An easy-to-use, fast, and defensive Typescript/Javascript test runner designed to help you to write simple, readable, and maintainable tests.

Named after [Sir Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare), the inventor of the [Hoare Triple](https://en.wikipedia.org/wiki/Hoare_logic) which is the cornerstone of unit testing.

**🔒 Out-of-the-box Typescript support**
- Written in Typescript. No special configuration needed, and no plugins to install. 
- Works great with [c8](https://github.com/bcoe/c8) for code coverage.
- Handles compilation errors gracefully.

**🛡 Defensive**
- Uncaught errors and unhandled promise rejections will cause the test to fail.
- Any spec files without tests, or tests without assertions, result in a failed test.
- Strict and deep equality comparison by default.

**🚀 Fast & Reliable**
- Multi-process parallel test runner. Each spec file is run in its own process and runtime for speed and isolation benefits.
- Optimized for speed and simplicity.
- Minimal dependencies.

**😀 Easy to Use**
- [Simple assertion API](#api). You shouldn't need to learn a new language to read and write tests. Assertions should be simple axiomatic logic.
- Built-in [powerful diff visualization tool](#visual-diff-tool).
- Errors or unhandled promise rejections are buffered and grouped under the test file in the output. This helps you know where they came from.

**✨ Modern Features**
  - Async/Await/Promise Support
  - Simple API facilitates functional programming patterns and AI test generation.

# Table of Contents

- [Examples](#examples)
- [Installation & Setup](#installation--setup)
- [Basic Usage](#basic-usage)
- [API](#api)
- [Visual Diff Tool](#visual-diff-tool)
- [Inspiration, Philosophy & Attribution](docs/inspiration.md)
- [FAQ](docs/faq.md)
- [Support, Feedback, and Contributions](#support-feedback-and-contributions)
- [License](#license)

# Examples

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

## Mocking Dependencies

You can use [cjs-mock](https://npmjs.org/cjs-mock) to mock dependencies (only works with CommonJS modules). This is especially useful for mocking file system operations, network requests, or other side effects.

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
import {test} from 'hoare';
import {mock} from 'cjs-mock';
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

### For more examples, see [examples](examples) or [src](src).

# Installation & Setup

## Typescript w/ code coverage using c8

1. Install from npm along with peer dependencies:

    ```console
    npm i typescript ts-node c8 hoare -D
    ```
   
2. Make sure your [tsconfig.json](tsconfig.json) file has the following compiler options set:

    ```json
    {
      "module": "CommonJS",
      "sourceMap": true
    }
    ```

    > Note: If you are using a different module systems such as ESM, you can create a separate `tsconfig.test.json` file and use the `--project` flag with `tsc` or `ts-node`, or use command line flags.

3. Create an `.c8rc.json` file in the root of your project (or use another config option), following the [c8 documentation](https://github.com/bcoe/c8). For an example, see our [.c8rc.json](.c8rc.json) file.

4. Add the following command to your `package.json` `scripts` directive:

    ```json
    {
      "test": "c8 hoare 'src/**/*.spec.@(ts|js)' && c8 report -r text -r html"
    }
    ```

The above command, along with our [.c8rc.json](.c8rc.json) file settings, will do the following:

1. Run `c8` for code coverage.
2. Run any  `.spec.js` or `.spec.ts` file within the `src` folder, recursively.
3. If the test is successful, generate both an HTML and text coverage report.

You can customize the above command to your situation. The string in quotes is a [glob](https://github.com/terkelg/tiny-glob).

## Javascript w/ code coverage using `c8`

1. Install from npm along with `c8`:

    ```console
    npm i c8 hoare -D
    ```
2. Add the following command to your `package.json` `scripts` directive:

    ```json
    {
      "test": "c8 hoare 'src/**/*.spec.js' && c8 report -r text -r html"
    }
    ```
## Javascript w/o code coverage

1. Install from npm:

    ```console
    npm i hoare -D
    ```

2. Add the following command to your `package.json` `scripts` directive:

    ```json
    {
      "test": "hoare 'src/**/*.spec.js'"
    }

## Running hoare via `npx`

```bash
# glob
npx hoare 'src/**/*.spec.ts'

# a specific file
npx hoare 'src/foo.spec.ts'
```

# Basic Usage

1. Write your tests with a `.spec.ts` or `.spec.js` extension (although any extension will work as long as it matches the [glob](https://github.com/terkelg/tiny-glob) provided). 

    > Tip: we recommend you put your source code in a `src` folder and keep your test files alongside the source, and not in a separate folder.

2. Simply run `npm test`, or directly via `npx` as shown above.

Example file structure:

```
dist // built files
src
  foo.ts
  foo.spec.ts
```

# API

## Methods

### `test(title: string, cb: (assert: Assert) => void): void`

Create a test. `cb` can be an `async` function.

## Interfaces

### `Assert`

#### `equal(actual: any, expected: any, msg?: string): void`

Asserts deep and strict equality on objects or primitives. This will give you a [visual diff](#visual-diff-tool) output for any discrepancies.

#### `throws(experiment: () => any, expectedError: Error, msg?: string): void`

Asserts that the function `experiment` throws an error that is equivalent to `expectedError`, ignoring stack traces.

It uses `errorsEquivalent()` under the hood, so it will check for both non-enumerable properties (ie, `name` and `message`) and enumerable properties (anything added by extending `Error`).

Example:

```typescript
import {test} from 'hoare';

function mustBe42(num: number): void {
  if (num !== 42) {
    throw new Error('expected 42');
  }
}

test('mustBe42()', (assert) => {
  assert.equal(mustbe42(42), undefined, 'should not throw if 42');
  assert.throws(() => mustBe42(15), new Error('expected 42'), 'should throw if not 42');
});
```

#### `errorsEquivalent(err1: any, err2: any, msg?: string)`

Asserts that both errors are similar. Stack traces are ignored. It checks for both non-enumerable properties
(ie, `name` and `message`) and enumerable properties (anything added by extending `Error`).

Under the hood it uses `equal()` and you will get a [visual diff](#visual-diff-tool) output for any discrepancies.

Both errors **must** be an instance of `Error`, or an error will be thrown.

> Tip: You may want to use `throws()` instead of this method for convenience, as this will catch the error for you without need to wrap it in a try/catch block.

# Visual Diff Tool

Any assertion using `equals()` under the hood that fails will output a visual diff of the differences between the actual and expected values. 

![string diff](docs/screenshot-string-diff.png)
![string diff](docs/screenshot-object-diff.png)

# Support, Feedback, and Contributions

- Star this repo if you like it!
- Submit an [issue](https://github.com/mhweiner/hoare/issues) with your problem, feature request or bug report
- Issue a PR against `main` and request review. Make sure all tests pass and coverage is good.
- Write about unit testing best practices and use hoare in your examples

Together we can make software more reliable and easier to maintain!

# License

MIT &copy; Marc H. Weiner

[See full license](LICENSE)
