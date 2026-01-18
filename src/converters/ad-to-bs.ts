import { NEPALI_CALENDAR_DATA, MIN_YEAR, MAX_YEAR } from '../data/calendar-data';
import { BASE_BS_DATE, BASE_AD_DATE } from '../data/reference-dates';
import { isValidAdDate, getDaysInAdMonth } from '../utils/validators';
import type { DateObject, DateArray, ConversionOptions } from '../types';

/**
 * Convert Anno Domini (AD) date to Bikram Sambat (BS) date
 *
 * @param year - AD year
 * @param month - AD month (1-12)
 * @param day - AD day
 * @param options - Conversion options
 * @returns BS date in specified format
 *
 * @example
 * adToBs(2024, 1, 27); // Returns { year: 2080, month: 10, day: 15 }
 * adToBs(2024, 1, 27, { format: 'iso' }); // Returns "2080-10-15"
 * adToBs(2024, 1, 27, { format: 'array' }); // Returns [2080, 10, 15]
 */
export function adToBs(
  year: number,
  month: number,
  day: number,
  options?: ConversionOptions
): DateObject | string | DateArray {
  // Validate input
  if (!isValidAdDate(year, month, day)) {
    throw new Error(`Invalid AD date: ${year}-${month}-${day}`);
  }

  // Calculate total days from base AD date to target AD date
  const totalDaysFromBase = calculateDaysBetweenAdDates(
    BASE_AD_DATE.year,
    BASE_AD_DATE.month,
    BASE_AD_DATE.day,
    year,
    month,
    day
  );

  // Check if date is before base date
  if (totalDaysFromBase < 0) {
    throw new Error(`Date is before the minimum supported date (${BASE_AD_DATE.year}-${BASE_AD_DATE.month}-${BASE_AD_DATE.day})`);
  }

  // Convert to BS date
  const bsDate = addDaysToBsDate(
    BASE_BS_DATE.year,
    BASE_BS_DATE.month,
    BASE_BS_DATE.day,
    totalDaysFromBase
  );

  // Format output
  return formatDate(bsDate, options);
}

/**
 * Calculate days between two AD dates
 */
function calculateDaysBetweenAdDates(
  fromYear: number,
  fromMonth: number,
  fromDay: number,
  toYear: number,
  toMonth: number,
  toDay: number
): number {
  let days = 0;

  // If target date is before base date
  if (toYear < fromYear || (toYear === fromYear && toMonth < fromMonth) ||
      (toYear === fromYear && toMonth === fromMonth && toDay < fromDay)) {
    return -1;
  }

  let y = fromYear;
  let m = fromMonth;
  let d = fromDay;

  while (y < toYear || m < toMonth || d < toDay) {
    const daysInMonth = getDaysInAdMonth(y, m);

    if (d < daysInMonth) {
      d++;
      days++;
    } else {
      d = 1;
      m++;
      if (m > 12) {
        m = 1;
        y++;
      }
    }

    // Prevent infinite loops
    if (y > toYear || (y === toYear && m > toMonth) ||
        (y === toYear && m === toMonth && d > toDay)) {
      break;
    }
  }

  return days;
}

/**
 * Add days to a BS date
 */
function addDaysToBsDate(year: number, month: number, day: number, daysToAdd: number): DateObject {
  let y = year;
  let m = month;
  let d = day;

  // Add days one by one to handle month/year boundaries correctly
  for (let i = 0; i < daysToAdd; i++) {
    d++;
    const daysInCurrentMonth = NEPALI_CALENDAR_DATA[y][m - 1];
    if (d > daysInCurrentMonth) {
      d = 1;
      m++;
      if (m > 12) {
        m = 1;
        y++;
      }

      // Check if we've exceeded available data
      if (y > MAX_YEAR) {
        throw new Error(`Date exceeds maximum supported year (BS ${MAX_YEAR})`);
      }

      if (!(y in NEPALI_CALENDAR_DATA)) {
        throw new Error(`No calendar data available for BS year ${y}`);
      }
    }
  }

  return { year: y, month: m, day: d };
}

/**
 * Format date according to options
 */
function formatDate(
  date: DateObject,
  options?: ConversionOptions
): DateObject | string | DateArray {
  const format = options?.format || 'object';

  switch (format) {
    case 'object':
      return date;

    case 'iso':
      return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;

    case 'string': {
      const pattern = options?.pattern || 'YYYY-MM-DD';
      return pattern
        .replace('YYYY', String(date.year))
        .replace('MM', String(date.month).padStart(2, '0'))
        .replace('DD', String(date.day).padStart(2, '0'));
    }

    case 'array':
      return [date.year, date.month, date.day];

    default:
      return date;
  }
}
