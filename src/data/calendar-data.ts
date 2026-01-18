import type { CalendarData } from '../types';
import calendarDataJson from '../../data/calendar-data.json';

/**
 * Nepali Calendar Data (Bikram Sambat)
 *
 * Each year maps to an array of 12 numbers representing the days in each month.
 * Months: [Baisakh, Jestha, Ashar, Shrawan, Bhadra, Ashwin, Kartik, Mangsir, Poush, Magh, Falgun, Chaitra]
 *
 * Data Sources:
 * - Nepal Panchanga Nirnayak Samiti
 * - Verified against historical records
 *
 * Data Range: BS 2000 - 2100 (AD 1943 - 2043)
 */
export const NEPALI_CALENDAR_DATA: CalendarData = Object.fromEntries(
  Object.entries(calendarDataJson)
    .filter(([key]) => !key.startsWith('$') && key !== 'description')
    .map(([key, value]) => [Number(key), value])
) as CalendarData;

/**
 * Get the minimum year in the calendar data
 */
export const MIN_YEAR = Math.min(...Object.keys(NEPALI_CALENDAR_DATA).map(Number));

/**
 * Get the maximum year in the calendar data
 */
export const MAX_YEAR = Math.max(...Object.keys(NEPALI_CALENDAR_DATA).map(Number));
