import { NEPALI_CALENDAR_DATA } from '../data/calendar-data';
import { BASE_BS_DATE, BASE_AD_DATE } from '../data/reference-dates';
import { isValidBsDate, getDaysInAdMonth } from '../utils/validators';
import type { DateObject, DateArray, ConversionOptions } from '../types';

/**
 * Convert Bikram Sambat (BS) date to Anno Domini (AD) date
 *
 * @param year - BS year
 * @param month - BS month (1-12)
 * @param day - BS day
 * @param options - Conversion options
 * @returns AD date in specified format
 *
 * @example
 * bsToAd(2080, 10, 15); // Returns { year: 2024, month: 1, day: 27 }
 * bsToAd(2080, 10, 15, { format: 'iso' }); // Returns "2024-01-27"
 * bsToAd(2080, 10, 15, { format: 'array' }); // Returns [2024, 1, 27]
 */
export function bsToAd(
  year: number,
  month: number,
  day: number,
  options?: ConversionOptions
): DateObject | string | DateArray {
  // Validate input
  if (!isValidBsDate(year, month, day)) {
    throw new Error(`Invalid BS date: ${year}-${month}-${day}`);
  }

  // Calculate total days from base date
  let totalDays = 0;

  // Add days from base year to target year
  for (let y = BASE_BS_DATE.year; y < year; y++) {
    if (y in NEPALI_CALENDAR_DATA) {
      totalDays += NEPALI_CALENDAR_DATA[y].reduce((sum, days) => sum + days, 0);
    }
  }

  // Add days from months in target year
  for (let m = 0; m < month - 1; m++) {
    totalDays += NEPALI_CALENDAR_DATA[year][m];
  }

  // Add remaining days
  totalDays += day - 1; // Subtract 1 because we start from base date

  // Convert to AD date
  const adDate = addDaysToAdDate(
    BASE_AD_DATE.year,
    BASE_AD_DATE.month,
    BASE_AD_DATE.day,
    totalDays
  );

  // Format output
  return formatDate(adDate, options);
}

/**
 * Add days to an AD date
 */
function addDaysToAdDate(year: number, month: number, day: number, daysToAdd: number): DateObject {
  let y = year;
  let m = month;
  let d = day;

  // Add days one by one to handle month/year boundaries correctly
  for (let i = 0; i < daysToAdd; i++) {
    d++;
    const daysInCurrentMonth = getDaysInAdMonth(y, m);
    if (d > daysInCurrentMonth) {
      d = 1;
      m++;
      if (m > 12) {
        m = 1;
        y++;
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
