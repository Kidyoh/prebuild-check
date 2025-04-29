import * as colors from './colors';

export const logger = {
    success: (message: string, ...args: any[]) => {
        colors.success(`✓ SUCCESS: ${message}`);
        if (args.length > 0) console.log(...args);
    },
    
    error: (message: string, ...args: any[]) => {
        colors.error(`✗ ERROR: ${message}`);
        if (args.length > 0) console.error(...args);
    },
    
    warn: (message: string, ...args: any[]) => {
        colors.warning(`⚠ WARNING: ${message}`);
        if (args.length > 0) console.warn(...args);
    },
    
    info: (message: string, ...args: any[]) => {
        colors.info(`ℹ INFO: ${message}`);
        if (args.length > 0) console.log(...args);
    }
};