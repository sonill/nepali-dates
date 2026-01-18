import type { ReferenceDatePair } from '../types';
import referenceDatesJson from '../../data/reference-dates.json';

/**
 * Base reference date for all calculations
 * BS 2000-01-01 = AD 1943-04-14
 *
 * This is the anchor point for all date conversions.
 */
export const BASE_BS_DATE = { year: 2000, month: 1, day: 1 };
export const BASE_AD_DATE = { year: 1943, month: 4, day: 14 };

/**
 * Reference date pairs for validation and testing
 *
 * These are verified BS-AD date pairs used to validate conversion accuracy.
 * Each pair represents a known accurate conversion point.
 *
 * Sources:
 * - Official Nepal government publications
 * - Historical records and verified events
 * - Cross-referenced with multiple calendar systems
 */
export const REFERENCE_DATES: ReferenceDatePair[] = referenceDatesJson.referenceDates.map(
  ({ bs, ad }) => ({ bs, ad })
);
