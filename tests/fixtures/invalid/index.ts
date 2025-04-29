
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
