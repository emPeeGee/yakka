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

export function shuffle<T>(array: T[]) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
