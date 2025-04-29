// Import chalk using require to avoid ESM issues
const chalk = require('chalk');

export function success(message: string): void {
  try {
    console.log(chalk.green(message));
  } catch (e) {
    console.log(message);
  }
}

export function error(message: string): void {
  try {
    console.error(chalk.red(message));
  } catch (e) {
    console.error(message);
  }
}

export function warning(message: string): void {
  try {
    console.warn(chalk.yellow(message));
  } catch (e) {
    console.warn(message);
  }
}

export function info(message: string): void {
  try {
    console.info(chalk.blue(message));
  } catch (e) {
    console.info(message);
  }
}