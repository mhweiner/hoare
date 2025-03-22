# Getting Started

Using `hoare` is simple, we promise. Here's a quick guide to get you started.

## Installation & Setup

### 1. Install from npm along with peer dependencies

```console
npm i -D hoare typescript ts-node c8 
```

- If you're not using Typescript, you can skip the `typescript` and `ts-node` packages.
- If you're not using `c8`, you can skip that package as well.
   
### 2. (TypeScript Only) Make sure your [tsconfig.json](../tsconfig.json) file has the following compiler options set:

```json
{
    "module": "CommonJS",
    "sourceMap": true
}
```

> Note: If you are using a different module systems such as ESM, you can create a separate `tsconfig.test.json` file and use the `--project` flag with `tsc` or `ts-node`, or use command line flags.

### 3. (c8 only) Create an `.c8rc.json` file in the root of your project (or use another config option), following the [c8 documentation](https://github.com/bcoe/c8). 

For an example, see our [.c8rc.json](../.c8rc.json) file.

### 4. Set up your test command in your `package.json` file as appropriate for your project.

Example for Typescript with `c8`:

```json
{
    "test": "c8 hoare 'src/**/*.spec.@(ts|js)' && c8 report -r text -r html"
}
```

The above command, along with our [.c8rc.json](.c8rc.json) file settings, will do the following:

1. Run `c8` for code coverage.
2. Run any  `.spec.js` or `.spec.ts` file within the `src` folder, recursively.
3. If the test is successful, generate both an HTML and text coverage report.

Simplest example without `c8`:

```json
{
    "test": "hoare 'src/**/*.spec.@(ts|js)'"
}
```

You can customize the `hoare` command to your situation. The string in quotes is a [glob](https://github.com/terkelg/tiny-glob).

## Running hoare via `npx`

```bash
# Run all tests in the src folder with names ending in .spec.ts or .spec.js (glob)
npx hoare 'src/**/*.spec.ts'

# a specific file
npx hoare 'src/foo.spec.ts'
```