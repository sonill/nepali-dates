/**
 * Date format types for conversion output
 */
export type DateFormat = 'object' | 'iso' | 'string' | 'array';

/**
 * Date pattern types for string formatting
 */
export type DatePattern = 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'DD-MM-YYYY' | 'DD/MM/YYYY' | 'MM-DD-YYYY' | 'MM/DD/YYYY';

/**
 * Locale types for month/day names
 */
export type Locale = 'en' | 'ne';

/**
 * Date object representation
 */
export interface DateObject {
  year: number;
  month: number;
  day: number;
}

/**
 * Date array representation [year, month, day]
 */
export type DateArray = [number, number, number];

/**
 * Options for date conversion
 */
export interface ConversionOptions {
  format?: DateFormat;
  pattern?: DatePattern;
}

/**
 * Options for date formatting
 */
export interface FormatOptions {
  pattern?: DatePattern;
  locale?: Locale;
}

/**
 * Calendar data structure: year -> array of days in each month
 */
export type CalendarData = Record<number, number[]>;

/**
 * Reference date pair for validation
 */
export interface ReferenceDatePair {
  bs: DateObject;
  ad: DateObject;
}

/**
 * Data range information
 */
export interface DataRange {
  minYear: number;
  maxYear: number;
  totalYears: number;
}

/**
 * Month navigation result
 */
export interface MonthNavigation {
  year: number;
  month: number;
}

/**
 * Nepali month names
 */
export enum NepaliMonth {
  Baisakh = 1,
  Jestha = 2,
  Ashar = 3,
  Shrawan = 4,
  Bhadra = 5,
  Ashwin = 6,
  Kartik = 7,
  Mangsir = 8,
  Poush = 9,
  Magh = 10,
  Falgun = 11,
  Chaitra = 12
}

/**
 * Nepali month names in English
 */
export const NEPALI_MONTH_NAMES_EN: Record<number, string> = {
  1: 'Baisakh',
  2: 'Jestha',
  3: 'Ashar',
  4: 'Shrawan',
  5: 'Bhadra',
  6: 'Ashwin',
  7: 'Kartik',
  8: 'Mangsir',
  9: 'Poush',
  10: 'Magh',
  11: 'Falgun',
  12: 'Chaitra'
};

/**
 * Nepali month names in Nepali
 */
export const NEPALI_MONTH_NAMES_NE: Record<number, string> = {
  1: 'बैशाख',
  2: 'जेठ',
  3: 'असार',
  4: 'श्रावण',
  5: 'भाद्र',
  6: 'आश्विन',
  7: 'कार्तिक',
  8: 'मंसिर',
  9: 'पौष',
  10: 'माघ',
  11: 'फाल्गुन',
  12: 'चैत्र'
};

/**
 * English month names
 */
export const ENGLISH_MONTH_NAMES: Record<number, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};
