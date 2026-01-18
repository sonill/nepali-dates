import { NEPALI_CALENDAR_DATA, MIN_YEAR, MAX_YEAR } from '../data/calendar-data';

/**
 * Check if a year exists in the calendar data
 */
export function hasDataForYear(year: number): boolean {
  return year in NEPALI_CALENDAR_DATA;
}

/**
 * Validate a Nepali (BS) date
 */
export function isValidBsDate(year: number, month: number, day: number): boolean {
  // Check year range
  if (year < MIN_YEAR || year > MAX_YEAR) {
    return false;
  }

  // Check if data exists for the year
  if (!hasDataForYear(year)) {
    return false;
  }

  // Check month range (1-12)
  if (month < 1 || month > 12) {
    return false;
  }

  // Check day range
  const daysInMonth = NEPALI_CALENDAR_DATA[year][month - 1];
  if (day < 1 || day > daysInMonth) {
    return false;
  }

  return true;
}

/**
 * Validate an English (AD) date
 */
export function isValidAdDate(year: number, month: number, day: number): boolean {
  // Basic range checks
  if (year < 1 || year > 9999) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  // Days in each month for AD calendar
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year
  if (month === 2 && isLeapYear(year)) {
    daysInMonth[1] = 29;
  }

  if (day < 1 || day > daysInMonth[month - 1]) {
    return false;
  }

  return true;
}

/**
 * Check if a year is a leap year (Gregorian calendar)
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Get the number of days in a month for AD calendar
 */
export function getDaysInAdMonth(year: number, month: number): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2 && isLeapYear(year)) {
    return 29;
  }

  return daysInMonth[month - 1];
}
