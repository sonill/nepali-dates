/**
 * Nepali Dates - Community-driven Nepali calendar data and conversion utilities
 *
 * @packageDocumentation
 */

// Export types
export type {
  DateFormat,
  DatePattern,
  Locale,
  DateObject,
  DateArray,
  ConversionOptions,
  FormatOptions,
  CalendarData,
  ReferenceDatePair,
  DataRange,
  MonthNavigation
} from './types';

export {
  NepaliMonth,
  NEPALI_MONTH_NAMES_EN,
  NEPALI_MONTH_NAMES_NE,
  ENGLISH_MONTH_NAMES
} from './types';

// Export converters
export { bsToAd } from './converters/bs-to-ad';
export { adToBs } from './converters/ad-to-bs';

// Export utilities
export {
  getTotalDaysInMonth,
  getTotalDaysInYear,
  getNextMonth,
  getPrevMonth,
  getCalendarData,
  getDataRange,
  getDaysInRange,
  getAllCalendarData
} from './utils/date-helpers';

export {
  formatBsDate,
  formatAdDate,
  getNepaliMonthName,
  getEnglishMonthName,
  parseDate,
  toIsoString,
  toArray
} from './utils/formatters';

export {
  hasDataForYear,
  isValidBsDate,
  isValidAdDate,
  isLeapYear,
  getDaysInAdMonth
} from './utils/validators';

// Export data
export { NEPALI_CALENDAR_DATA, MIN_YEAR, MAX_YEAR } from './data/calendar-data';
export { REFERENCE_DATES, BASE_BS_DATE, BASE_AD_DATE } from './data/reference-dates';
