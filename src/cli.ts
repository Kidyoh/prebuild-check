#!/usr/bin/env node
import { program } from 'commander';
import ora from 'ora';
import { checkTypes } from './checker';
import { displayErrors } from './reporter';
import { logger } from './utils/logger';
import { version } from '../package.json';
import * as path from 'path';
import * as fs from 'fs';

program
  .name('prebuild-check')
  .description('Check TypeScript types before building')
  .version(version)
  .option('-t, --tsconfig <path>', 'path to tsconfig.json', './tsconfig.json')
  .option('-w, --warn-only', 'only warn about type errors, don\'t fail the build', false)
  .option('-e, --eslint', 'also run ESLint checks', false)
  .option('-s, --strict', 'use stricter type checking', false)
  .parse(process.argv);

const options = program.opts();

async function runEslintCheck() {
  try {
    // Dynamically import ESLint to avoid requiring it when not using this feature
    const { ESLint } = await import('eslint');
    
    // Check if .eslintrc.* exists
    const eslintConfigExists = fs.existsSync('.eslintrc.js') || 
                              fs.existsSync('.eslintrc.json') || 
                              fs.existsSync('.eslintrc.yml') ||
                              fs.existsSync('.eslintrc');
    
    if (!eslintConfigExists) {
      logger.warn('No ESLint configuration found. Skipping ESLint checks.');
      return true;
    }
    
    logger.info('Running ESLint checks...');
    
    const eslint = new ESLint();
    const results = await eslint.lintFiles(['.']);
    
    // Get formatter
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = await formatter.format(results);
    
    // Check if there are any errors
    const errorCount = results.reduce((count: number, result: { errorCount: number }) => count + result.errorCount, 0);
    
    if (errorCount > 0) {
      logger.error('ESLint found errors:');
      console.log(resultText);
      return false;
    } else if (resultText.trim && resultText.trim()) {
      logger.warn('ESLint found warnings:');
      console.log(resultText);
    } else {
      logger.success('ESLint checks passed.');
    }
    
    return true;
  } catch (error) {
    logger.error('Failed to run ESLint checks:', error);
    return false;
  }
}

async function run() {
  const spinner = ora('Checking TypeScript types...').start();
  
  try {
    const result = await checkTypes(options.tsconfig);
    
    spinner.stop();
    
    let hasErrors = false;
    
    if (result.errors.length > 0) {
      displayErrors(result.errors, 'error');
      hasErrors = true;
    }
    
    if (result.warnings.length > 0) {
      displayErrors(result.warnings, 'warning');
      logger.warn(`Found ${result.warnings.length} type warnings.`);
    }
    
    if (result.errors.length === 0 && result.warnings.length === 0) {
      logger.success('No type errors found! Ready to build.');
    }
    
    // Run ESLint checks if requested
    let eslintPassed = true;
    if (options.eslint) {
      eslintPassed = await runEslintCheck();
    }
    
    if (hasErrors && !options.warnOnly) {
      process.exit(1);
    }
    
    if (!eslintPassed && !options.warnOnly) {
      process.exit(1);
    }
    
  } catch (error) {
    spinner.stop();
    logger.error('Failed to check types:', error);
    process.exit(1);
  }
}

run();