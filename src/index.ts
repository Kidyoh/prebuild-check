#!/usr/bin/env node

// Export public API for programmatic usage
export { checkTypes } from './checker';
export type { TypeCheckResult } from './checker';
export { formatErrors, displayErrors } from './reporter';

// If executed directly from the command line
if (require.main === module) {
  require('./cli');
}