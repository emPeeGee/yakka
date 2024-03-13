export const isZero = (value: number): boolean => {
  'worklet';

  return value === 0;
};

/**
 * Calculates the percentage.
 * @param {number} part - The part value.
 * @param {number} total - The total value.
 * @param {boolean} [format=false] - Whether to format the percentage value.
 * @param {number} [decimalPlaces=2] - The number of decimal places for formatting.
 * @returns {(number|string)} The percentage value (number if not formatted, string if formatted).
 */
export function percentage(part: number, total: number, format = false, decimalPlaces = 0) {
  if (total === 0) {
    throw new Error('Total cannot be zero.');
  }

  const percentage = (part / total) * 100;

  if (format) {
    const formattedPercentage = percentage.toFixed(decimalPlaces) + '%';
    return formattedPercentage;
  } else {
    return percentage;
  }
}
