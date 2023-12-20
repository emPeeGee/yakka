export function isLast<T>(arr: Array<T> | number, index: number) {
  'worklet';

  if (Array.isArray(arr)) {
    return index === arr.length - 1;
  }

  return index === arr - 1;
}
