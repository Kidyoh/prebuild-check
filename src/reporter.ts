import * as ts from 'typescript';
// Use require to avoid ESM issues with chalk
const chalk = require('chalk');
// Use require to avoid ESM issues with boxen
const boxen = require('boxen');

type MessageType = 'error' | 'warning';

export function formatErrors(diagnostics: ts.Diagnostic[]): string {
    if (diagnostics.length === 0) return '';
    
    return diagnostics.map(diagnostic => {
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(
                diagnostic.file, 
                diagnostic.start!
            );
            return `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
        }
        return message.toString();
    }).join('\n');
}

export function formatErrorMessages(errors: Array<{file: string, line: number, message: string}>): string {
    if (errors.length === 0) return '';
    
    return errors.map(err => {
        return `${err.file} (${err.line}): ${err.message}`;
    }).join('\n');
}

export function displayErrors(diagnostics: ts.Diagnostic[], type: MessageType): void {
    if (diagnostics.length === 0) return;

    // Basic display without fancy formatting in case of test environment
    let headerText: string;
    let formattedErrors = formatErrors(diagnostics);
    
    try {
        // Try to use chalk's color and bold functions
        const color = type === 'error' ? chalk.red : chalk.yellow;
        headerText = color.bold(`${type === 'error' ? 'TYPE ERRORS' : 'TYPE WARNINGS'} (${diagnostics.length})`);
        
        // Try to use boxen
        const boxOptions = { 
            padding: 1, 
            margin: 1, 
            borderColor: type === 'error' ? 'red' : 'yellow',
            borderStyle: 'round'
        };
        console.log(boxen(`${headerText}\n\n${formattedErrors}`, boxOptions));
    } catch (error) {
        // Fallback for tests or if chalk/boxen fails
        headerText = `${type === 'error' ? 'TYPE ERRORS' : 'TYPE WARNINGS'} (${diagnostics.length})`;
        console.log(`\n${headerText}\n\n${formattedErrors}\n`);
    }
}