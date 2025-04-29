import * as ts from 'typescript';
import { logger } from './utils/logger';

export interface TypeCheckResult {
  errors: ts.Diagnostic[];
  warnings: ts.Diagnostic[];
}

export async function checkTypes(tsconfigPath: string = './tsconfig.json'): Promise<TypeCheckResult> {
    const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    if (configFile.error) {
        logger.error('Error reading tsconfig.json:', configFile.error.messageText);
        return { errors: [configFile.error], warnings: [] };
    }

    const parsedCommandLine = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        './'
    );
    
    if (parsedCommandLine.errors.length > 0) {
        logger.error('Error parsing tsconfig.json:', parsedCommandLine.errors);
        return { errors: parsedCommandLine.errors, warnings: [] };
    }

    const program = ts.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options);
    const diagnostics = ts.getPreEmitDiagnostics(program);

    // Properly categorize diagnostics
    // DiagnosticCategory: 0 = Warning, 1 = Error, 2 = Suggestion, 3 = Message
    const errors = diagnostics.filter(d => d.category === ts.DiagnosticCategory.Error);
    const warnings = diagnostics.filter(d => 
        d.category === ts.DiagnosticCategory.Warning || 
        d.category === ts.DiagnosticCategory.Suggestion
    );

    if (errors.length > 0) {
        logger.error('Type errors found:', errors.length);
    }

    if (warnings.length > 0) {
        logger.warn('Type warnings found:', warnings.length);
    }

    if (errors.length === 0 && warnings.length === 0) {
        logger.success('No type errors or warnings found.');
    }

    return { errors, warnings };
}