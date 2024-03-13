/**
 * Formats the given number of seconds into MM:SS format.
 * @param {number} seconds - The number of seconds to format.
 * @returns {string} The formatted time in MM:SS format.
 */
export function formatSecondsToMinutesSeconds(seconds: number): string {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;

  // Add leading zero if necessary
  const formattedMinutes: string = String(minutes).padStart(2, '0');
  const formattedSeconds: string = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
