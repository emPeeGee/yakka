/**
 * Compares two strings after removing punctuation marks, spaces, and converting to lowercase.
 * @param {string} str1 - The first string to compare.
 * @param {string} str2 - The second string to compare.
 * @returns {boolean} True if the strings are equal after processing; otherwise, false.
 */
export function compareAnswers(str1: string, str2: string) {
  // Remove punctuation marks and spaces outside the strings, and convert to lowercase
  const processedStr1 = str1
    .normalize('NFD') // Removes diacritics
    .replace(/[^\w\s]/g, '')
    .toLowerCase()
    .trim();
  const processedStr2 = str2
    .normalize('NFD') // Removes diacritics
    .replace(/[^\w\s]/g, '')
    .toLowerCase()
    .trim();

  // Replace consecutive spaces inside the strings with a single space
  const finalStr1 = processedStr1.replace(/\s+/g, ' ');
  const finalStr2 = processedStr2.replace(/\s+/g, ' ');

  // Compare the processed strings
  return finalStr1 === finalStr2;
}
