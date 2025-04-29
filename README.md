# prebuild-check

[![npm version](https://img.shields.io/npm/v/prebuild-check.svg)](https://www.npmjs.com/package/prebuild-check)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/Kidyoh/prebuild-check/actions/workflows/test.yml/badge.svg)](https://github.com/Kidyoh/prebuild-check/actions/workflows/test.yml)

`prebuild-check` is a lightweight CLI tool that ensures there are no TypeScript type errors before running your project's build process. It leverages the TypeScript compiler API to perform type checking quickly and efficiently, providing clear and colorful output in the terminal.

## Features

- **Type Checking**: Automatically checks for TypeScript type errors using the TypeScript compiler API or `tsc --noEmit`.
- **ESLint Integration**: Can also run ESLint checks to ensure code quality (with the `--eslint` flag).
- **Clean Output**: Displays summarized error messages in a colorful format using libraries like chalk and boxen.
- **Exit Codes**: Exits with a non-zero code if type errors are found, preventing the build from proceeding.
- **Easy to Use**: Can be run via `npx prebuild-check` or installed globally/locally.

## Installation

You can install `prebuild-check` globally or locally in your project:

```bash
# Install globally
pnpm add -g prebuild-check

# Or install locally
pnpm add -D prebuild-check
```

## Usage

To check for TypeScript type errors in your project, simply run:

```bash
npx prebuild-check
```

This command will automatically use your project's `tsconfig.json` to perform the type checking.

## CLI Options

- `--strict`: Enable strict type checking.
- `--warn-only`: Show warnings instead of errors.
- `--tsconfig <path>`: Specify a custom path to your `tsconfig.json`.
- `--eslint`: Also run ESLint checks.

## Examples

```bash
# Basic type checking
npx prebuild-check

# Enable strict mode
npx prebuild-check --strict

# Use a custom tsconfig path
npx prebuild-check --tsconfig ./configs/tsconfig.prod.json

# Run with ESLint checks
npx prebuild-check --eslint

# Only show warnings without failing the build
npx prebuild-check --warn-only
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.