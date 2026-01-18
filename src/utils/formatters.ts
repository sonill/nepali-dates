import type { DateObject, DatePattern, Locale, FormatOptions } from '../types';
import {
  NEPALI_MONTH_NAMES_EN,
  NEPALI_MONTH_NAMES_NE,
  ENGLISH_MONTH_NAMES
} from '../types';

/**
 * Format a BS date to string
 *
 * @param year - BS year
 * @param month - BS month (1-12)
 * @param day - BS day
 * @param options - Format options
 * @returns Formatted date string
 *
 * @example
 * formatBsDate(2080, 10, 15); // Returns "2080-10-15"
 * formatBsDate(2080, 10, 15, { pattern: 'DD/MM/YYYY' }); // Returns "15/10/2080"
 */
export function formatBsDate(
  year: number,
  month: number,
  day: number,
  options?: FormatOptions
): string {
  const pattern = options?.pattern || 'YYYY-MM-DD';

  return formatWithPattern(year, month, day, pattern);
}

/**
 * Format an AD date to string
 *
 * @param year - AD year
 * @param month - AD month (1-12)
 * @param day - AD day
 * @param options - Format options
 * @returns Formatted date string
 *
 * @example
 * formatAdDate(2024, 1, 27); // Returns "2024-01-27"
 * formatAdDate(2024, 1, 27, { pattern: 'DD/MM/YYYY' }); // Returns "27/01/2024"
 */
export function formatAdDate(
  year: number,
  month: number,
  day: number,
  options?: FormatOptions
): string {
  const pattern = options?.pattern || 'YYYY-MM-DD';

  return formatWithPattern(year, month, day, pattern);
}

/**
 * Format date using pattern
 */
function formatWithPattern(
  year: number,
  month: number,
  day: number,
  pattern: DatePattern
): string {
  return pattern
    .replace('YYYY', String(year))
    .replace('MM', String(month).padStart(2, '0'))
    .replace('DD', String(day).padStart(2, '0'));
}

/**
 * Get Nepali month name
 *
 * @param month - Month number (1-12)
 * @param locale - Locale ('en' or 'ne')
 * @returns Month name
 *
 * @example
 * getNepaliMonthName(1); // Returns "Baisakh"
 * getNepaliMonthName(1, 'ne'); // Returns "बैशाख"
 */
export function getNepaliMonthName(month: number, locale: Locale = 'en'): string {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Month must be between 1 and 12.`);
  }

  if (locale === 'ne') {
    return NEPALI_MONTH_NAMES_NE[month];
  }

  return NEPALI_MONTH_NAMES_EN[month];
}

/**
 * Get English month name
 *
 * @param month - Month number (1-12)
 * @returns Month name
 *
 * @example
 * getEnglishMonthName(1); // Returns "January"
 */
export function getEnglishMonthName(month: number): string {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Month must be between 1 and 12.`);
  }

  return ENGLISH_MONTH_NAMES[month];
}

/**
 * Parse a date string to DateObject
 *
 * @param dateString - Date string to parse
 * @param pattern - Expected pattern
 * @returns Parsed date object
 *
 * @example
 * parseDate('2080-10-15', 'YYYY-MM-DD'); // Returns { year: 2080, month: 10, day: 15 }
 * parseDate('15/10/2080', 'DD/MM/YYYY'); // Returns { year: 2080, month: 10, day: 15 }
 */
export function parseDate(dateString: string, pattern: DatePattern = 'YYYY-MM-DD'): DateObject {
  // Determine separator
  const separator = pattern.includes('-') ? '-' : '/';
  const parts = dateString.split(separator);

  if (parts.length !== 3) {
    throw new Error(`Invalid date string: ${dateString}`);
  }

  const patternParts = pattern.split(separator);
  const dateObj: DateObject = { year: 0, month: 0, day: 0 };

  for (let i = 0; i < patternParts.length; i++) {
    const value = parseInt(parts[i], 10);

    if (isNaN(value)) {
      throw new Error(`Invalid date value in: ${dateString}`);
    }

    switch (patternParts[i]) {
      case 'YYYY':
        dateObj.year = value;
        break;
      case 'MM':
        dateObj.month = value;
        break;
      case 'DD':
        dateObj.day = value;
        break;
    }
  }

  if (dateObj.year === 0 || dateObj.month === 0 || dateObj.day === 0) {
    throw new Error(`Failed to parse date: ${dateString}`);
  }

  return dateObj;
}

/**
 * Format a date object to ISO string (YYYY-MM-DD)
 *
 * @param date - Date object
 * @returns ISO formatted date string
 *
 * @example
 * toIsoString({ year: 2080, month: 10, day: 15 }); // Returns "2080-10-15"
 */
export function toIsoString(date: DateObject): string {
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
}

/**
 * Format a date object to array [year, month, day]
 *
 * @param date - Date object
 * @returns Date as array
 *
 * @example
 * toArray({ year: 2080, month: 10, day: 15 }); // Returns [2080, 10, 15]
 */
export function toArray(date: DateObject): [number, number, number] {
  return [date.year, date.month, date.day];
}
