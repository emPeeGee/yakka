export function isLast<T>(arr: Array<T> | number, index: number) {
  'worklet';

  if (Array.isArray(arr)) {
    return index === arr.length - 1;
  }

  return index === arr - 1;
}

export function areArraysEqual<T>(arr1: T[], arr2: T[]): boolean {
  // Check if both arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Check if every element in arr1 is included in arr2
  return arr1.every(item => arr2.includes(item));
}
