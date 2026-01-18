import { NEPALI_CALENDAR_DATA, MIN_YEAR, MAX_YEAR } from '../data/calendar-data';
import { hasDataForYear } from './validators';
import type { DataRange, MonthNavigation, CalendarData } from '../types';

/**
 * Get the total number of days in a Nepali month
 *
 * @param year - BS year
 * @param month - BS month (1-12)
 * @returns Number of days in the month
 *
 * @example
 * getTotalDaysInMonth(2080, 1); // Returns 31
 */
export function getTotalDaysInMonth(year: number, month: number): number {
  if (!hasDataForYear(year)) {
    throw new Error(`No data available for year ${year}`);
  }

  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Month must be between 1 and 12.`);
  }

  return NEPALI_CALENDAR_DATA[year][month - 1];
}

/**
 * Get the total number of days in a Nepali year
 *
 * @param year - BS year
 * @returns Total number of days in the year
 *
 * @example
 * getTotalDaysInYear(2080); // Returns 365
 */
export function getTotalDaysInYear(year: number): number {
  if (!hasDataForYear(year)) {
    throw new Error(`No data available for year ${year}`);
  }

  return NEPALI_CALENDAR_DATA[year].reduce((sum, days) => sum + days, 0);
}

/**
 * Get the next month
 *
 * @param year - BS year
 * @param month - BS month (1-12)
 * @returns Next month details
 *
 * @example
 * getNextMonth(2080, 12); // Returns { year: 2081, month: 1 }
 * getNextMonth(2080, 6); // Returns { year: 2080, month: 7 }
 */
export function getNextMonth(year: number, month: number): MonthNavigation {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Month must be between 1 and 12.`);
  }

  if (month === 12) {
    const nextYear = year + 1;
    if (!hasDataForYear(nextYear)) {
      throw new Error(`No data available for year ${nextYear}`);
    }
    return { year: nextYear, month: 1 };
  }

  return { year, month: month + 1 };
}

/**
 * Get the previous month
 *
 * @param year - BS year
 * @param month - BS month (1-12)
 * @returns Previous month details
 *
 * @example
 * getPrevMonth(2081, 1); // Returns { year: 2080, month: 12 }
 * getPrevMonth(2080, 7); // Returns { year: 2080, month: 6 }
 */
export function getPrevMonth(year: number, month: number): MonthNavigation {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Month must be between 1 and 12.`);
  }

  if (month === 1) {
    const prevYear = year - 1;
    if (!hasDataForYear(prevYear)) {
      throw new Error(`No data available for year ${prevYear}`);
    }
    return { year: prevYear, month: 12 };
  }

  return { year, month: month - 1 };
}

/**
 * Get calendar data for a specific year
 *
 * @param year - BS year
 * @returns Array of days in each month
 *
 * @example
 * getCalendarData(2080); // Returns [31, 32, 31, 32, ...]
 */
export function getCalendarData(year: number): number[] {
  if (!hasDataForYear(year)) {
    throw new Error(`No data available for year ${year}`);
  }

  return [...NEPALI_CALENDAR_DATA[year]];
}

/**
 * Get the available data range
 *
 * @returns Data range information
 *
 * @example
 * getDataRange(); // Returns { minYear: 2000, maxYear: 2100, totalYears: 101 }
 */
export function getDataRange(): DataRange {
  return {
    minYear: MIN_YEAR,
    maxYear: MAX_YEAR,
    totalYears: MAX_YEAR - MIN_YEAR + 1
  };
}

/**
 * Calculate the number of days between two BS dates
 *
 * @param fromYear - Starting BS year
 * @param fromMonth - Starting BS month
 * @param fromDay - Starting BS day
 * @param toYear - Ending BS year
 * @param toMonth - Ending BS month
 * @param toDay - Ending BS day
 * @returns Number of days between dates (can be negative if toDate is before fromDate)
 *
 * @example
 * getDaysInRange(2080, 1, 1, 2080, 1, 31); // Returns 30
 */
export function getDaysInRange(
  fromYear: number,
  fromMonth: number,
  fromDay: number,
  toYear: number,
  toMonth: number,
  toDay: number
): number {
  // Validate years
  if (!hasDataForYear(fromYear) || !hasDataForYear(toYear)) {
    throw new Error('One or more years are outside the available data range');
  }

  let days = 0;
  let currentYear = fromYear;
  let currentMonth = fromMonth;
  let currentDay = fromDay;

  // Determine direction
  const isForward =
    toYear > fromYear ||
    (toYear === fromYear && toMonth > fromMonth) ||
    (toYear === fromYear && toMonth === fromMonth && toDay >= fromDay);

  if (!isForward) {
    // Calculate backwards
    while (currentYear > toYear || currentMonth > toMonth || currentDay > toDay) {
      currentDay--;
      days--;

      if (currentDay < 1) {
        const prevMonth = getPrevMonth(currentYear, currentMonth);
        currentYear = prevMonth.year;
        currentMonth = prevMonth.month;
        currentDay = getTotalDaysInMonth(currentYear, currentMonth);
      }

      if (currentYear === toYear && currentMonth === toMonth && currentDay === toDay) {
        break;
      }
    }
  } else {
    // Calculate forwards
    while (currentYear < toYear || currentMonth < toMonth || currentDay < toDay) {
      currentDay++;
      days++;

      const daysInMonth = getTotalDaysInMonth(currentYear, currentMonth);
      if (currentDay > daysInMonth) {
        const nextMonth = getNextMonth(currentYear, currentMonth);
        currentYear = nextMonth.year;
        currentMonth = nextMonth.month;
        currentDay = 1;
      }

      if (currentYear === toYear && currentMonth === toMonth && currentDay === toDay) {
        break;
      }
    }
  }

  return days;
}

/**
 * Get all calendar data
 *
 * @returns Complete calendar data object
 *
 * @example
 * getAllCalendarData(); // Returns { 2000: [...], 2001: [...], ... }
 */
export function getAllCalendarData(): CalendarData {
  return { ...NEPALI_CALENDAR_DATA };
}
