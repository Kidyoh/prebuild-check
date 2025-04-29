import * as ts from 'typescript';
import { formatErrors, displayErrors } from '../src/reporter';

describe('Error Reporter', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should format error messages correctly', () => {
        const mockDiagnostic: ts.Diagnostic = {
            category: ts.DiagnosticCategory.Error,
            code: 2322,
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: 'Type error message'
        };

        const formatted = formatErrors([mockDiagnostic]);
        expect(formatted).toContain('Type error message');
    });

    it('should handle complex error messages', () => {
        const complexMessage = {
            messageText: 'Type error message',
            category: ts.DiagnosticCategory.Error,
            code: 2322,
            next: [{
                messageText: 'Nested error message',
                category: ts.DiagnosticCategory.Error,
                code: 2322,
            }]
        };
        
        const mockDiagnostic: ts.Diagnostic = {
            category: ts.DiagnosticCategory.Error,
            code: 2322,
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: complexMessage
        };

        const formatted = formatErrors([mockDiagnostic]);
        expect(formatted).toContain('Type error message');
        expect(formatted).toContain('Nested error message');
    });

    it('should display errors with boxen', () => {
        const mockDiagnostic: ts.Diagnostic = {
            category: ts.DiagnosticCategory.Error,
            code: 2322,
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: 'Type error message'
        };

        displayErrors([mockDiagnostic], 'error');
        expect(console.log).toHaveBeenCalled();
    });
});