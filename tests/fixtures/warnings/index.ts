
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
