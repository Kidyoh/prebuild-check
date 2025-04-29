const fs = require('fs');
const path = require('path');

// Paths to our fixture directories
const fixturesDir = path.join(__dirname, 'fixtures');
const validDir = path.join(fixturesDir, 'valid');
const invalidDir = path.join(fixturesDir, 'invalid');
const warningsDir = path.join(fixturesDir, 'warnings');
const nonexistentDir = path.join(fixturesDir, 'nonexistent');

// Make sure directories exist
[validDir, invalidDir, warningsDir, nonexistentDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create the valid TypeScript file
const validTsContent = `
// Valid TypeScript code without errors
export function add(a: number, b: number): number {
  return a + b;
}

export function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
`;

fs.writeFileSync(path.join(validDir, 'index.ts'), validTsContent);

// Create valid tsconfig.json
const validTsconfigContent = `{
  "compilerOptions": {
    "target": "ES2018",
    "module": "CommonJS",
    "strict": true,
    "outDir": "./dist",
    "esModuleInterop": true
  },
  "include": ["*.ts"]
}`;

fs.writeFileSync(path.join(validDir, 'tsconfig.json'), validTsconfigContent);

// Create the invalid TypeScript file
const invalidTsContent = `
// Code with intentional TypeScript errors
export function add(a: number, b: number): string {
  return a + b; // Error: Type 'number' is not assignable to type 'string'
}

export const person: { name: string; age: number } = {
  name: "John",
  age: "30" // Error: Type 'string' is not assignable to type 'number'
};

// Error: Parameter 'value' implicitly has 'any' type
export function processValue(value) {
  return value.toString();
}
`;

fs.writeFileSync(path.join(invalidDir, 'index.ts'), invalidTsContent);
fs.writeFileSync(path.join(invalidDir, 'tsconfig.json'), validTsconfigContent);

// Create the warnings TypeScript file
const warningsTsContent = `
// Code with TypeScript warnings but no errors
export function findElement(arr: any[], id: number): any {
  return arr.find(item => item.id === id); // Warning: 'any' type used
}

// Warning: Function lacks return type annotation
export function calculateTotal(items: {price: number}[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Warning: Unreachable code
export function processData(data: string[]): string[] {
  return data;
  console.log('Processing complete'); // Unreachable code
}
`;

// Create a tsconfig that produces warnings but not errors
const warningsTsconfigContent = `{
  "compilerOptions": {
    "target": "ES2018",
    "module": "CommonJS",
    "strict": false,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "allowUnreachableCode": false,
    "outDir": "./dist",
    "esModuleInterop": true
  },
  "include": ["*.ts"]
}`;

fs.writeFileSync(path.join(warningsDir, 'index.ts'), warningsTsContent);
fs.writeFileSync(path.join(warningsDir, 'tsconfig.json'), warningsTsconfigContent);

console.log('Test fixtures created successfully!');

// Log which files exist
console.log('\nChecking fixture files:');
[
  path.join(validDir, 'index.ts'),
  path.join(validDir, 'tsconfig.json'),
  path.join(invalidDir, 'index.ts'),
  path.join(invalidDir, 'tsconfig.json'),
  path.join(warningsDir, 'index.ts'),
  path.join(warningsDir, 'tsconfig.json')
].forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✓' : '✗'} ${file} ${exists ? 'exists' : 'does not exist'}`);
});