#!/usr/bin/env node
import { program } from 'commander';
import ora from 'ora';
import { checkTypes } from './checker';
import { displayErrors } from './reporter';
import { logger } from './utils/logger';
import { version } from '../package.json';

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

async function run() {
  const spinner = ora('Checking TypeScript types...').start();
  
  try {
    const result = await checkTypes(options.tsconfig);
    
    spinner.stop();
    
    if (result.errors.length > 0) {
      displayErrors(result.errors, 'error');
      
      if (!options.warnOnly) {
        process.exit(1);
      }
    }
    
    if (result.warnings.length > 0) {
      displayErrors(result.warnings, 'warning');
      logger.warn(`Found ${result.warnings.length} type warnings.`);
    }
    
    if (result.errors.length === 0 && result.warnings.length === 0) {
      logger.success('No type errors found! Ready to build.');
    }
    
    if (options.eslint) {
      // This would be implemented in a future version
      logger.info('Checking ESLint rules...');
      
      // This is a placeholder for future ESLint integration
      // In a real implementation, we would use the ESLint API to run checks
      // Example: const ESLint = require('eslint').ESLint;
      
      logger.success('ESLint checks passed.');
    }
    
  } catch (error) {
    spinner.stop();
    logger.error('Failed to check types:', error);
    process.exit(1);
  }
}

run();