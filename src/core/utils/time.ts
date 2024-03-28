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

/* For a given date, get the ISO week number
 *
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
export function getWeekNumber(d: Date): [number, number] {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7);
  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo];
}

export function formatMsToMinutes(ms: number): string {
  const totalMinutes = Math.floor(ms / (1000 * 60));

  return `${totalMinutes} m`;
}

export function getMonthNameFromNumber(
  monthNumber: number,
  options: Intl.DateTimeFormatOptions | undefined,
): string {
  const date = new Date();
  date.setMonth(monthNumber - 1); // Month in JavaScript Date object is 0-indexed

  return date.toLocaleString('en-US', options || { month: 'short' });
}
