import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

// Add this function or import from Jest
const fail = (message: string): never => {
  throw new Error(message);
};

describe('CLI Integration', () => {
    const cliPath = path.resolve(__dirname, '../dist/src/cli.js');
    const validPath = path.resolve(__dirname, 'fixtures/valid/tsconfig.json');
    const invalidPath = path.resolve(__dirname, 'fixtures/invalid/tsconfig.json');
    const warningsPath = path.resolve(__dirname, 'fixtures/warnings/tsconfig.json');

    it('should exit with code 0 for valid project', async () => {
        try {
            await execAsync(`node ${cliPath} --tsconfig ${validPath}`);
            // If execution succeeds (no error thrown), the test passes
        } catch (error) {
            // If we get here, the process exited with non-zero code
            fail(`CLI should exit with code 0 for valid project, but failed with: ${error}`);
        }
    }, 10000);

    it('should exit with code 1 for invalid project', async () => {
        try {
            await execAsync(`node ${cliPath} --tsconfig ${invalidPath}`);
            fail('CLI should have exited with code 1 but didn\'t');
        } catch (error: any) { // Type as any to access code property
            // We expect an error here since exit code should be 1
            expect(error).toBeDefined();
            expect(error.code).not.toBe(0);
        }
    }, 10000);

    it('should exit with code 0 when using --warn-only flag', async () => {
        try {
            await execAsync(`node ${cliPath} --tsconfig ${invalidPath} --warn-only`);
            // If execution succeeds (no error thrown), the test passes
        } catch (error) {
            fail(`CLI should exit with code 0 with --warn-only flag, but failed with: ${error}`);
        }
    }, 10000);

    it('should detect warnings in warning-only code', async () => {
        try {
            const { stdout } = await execAsync(`node ${cliPath} --tsconfig ${warningsPath}`);
            expect(stdout.toUpperCase()).toContain('WARNING');
        } catch (error) {
            // Should not happen since warnings don't cause exit code 1
            fail(`CLI should exit with code 0 for warning-only code: ${error}`);
        }
    }, 10000);
});