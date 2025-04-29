// Sample file with TypeScript errors

// Error: Type 'number' is not assignable to type 'string'
const greeting: string = 123;

// Error: Parameter 'b' implicitly has an 'any' type
function multiply(a: number, b) {
  return a * b;
}

// Error: Function lacks return type annotation
function divide(a: number, b: number) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

// Error: Object literal may only specify known properties
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John",
  age: 30,
  email: "john@example.com" // Property 'email' does not exist on type 'User'
};

// Warning: Unreachable code
function processData(): void {
  return;
  console.log("This code is unreachable");
}

export { greeting, multiply, divide, user, processData }; 