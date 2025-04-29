# prebuild-check

`prebuild-check` is a lightweight CLI tool that ensures there are no TypeScript type errors before running your project's build process. It leverages the TypeScript compiler API to perform type checking quickly and efficiently, providing clear and colorful output in the terminal.

## Features

- **Type Checking**: Automatically checks for TypeScript type errors using the TypeScript compiler API or `tsc --noEmit`.
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
- `--eslint`: Also run ESLint checks (basic support).

## Example

```bash
npx prebuild-check --strict
```

This command will run the type checker with strict mode enabled.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.