declare module 'eslint' {
  export class ESLint {
    constructor(options?: any);
    lintFiles(patterns: string[]): Promise<any[]>;
    loadFormatter(name: string): Promise<{ format: (results: any[]) => Promise<string> }>;
  }
} 