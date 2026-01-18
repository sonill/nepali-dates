import type { ReferenceDatePair } from '../types';

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
export const REFERENCE_DATES: ReferenceDatePair[] = [
  // Base reference point - BS calendar start (VERIFIED - This is the anchor point)
  {
    bs: { year: 2000, month: 1, day: 1 },
    ad: { year: 1943, month: 4, day: 14 }
  },

  // followind reference dates will help in unit test
  // and also improve the accuracy + speed of conversion algorithms
  {
    bs: { year: 2001, month: 1, day: 1 },
    ad: { year: 1944, month: 4, day: 13 }
  },
  {
    bs: { year: 2010, month: 1, day: 1 },
    ad: { year: 1953, month: 4, day: 13 }
  },
  {
    bs: { year: 2015, month: 1, day: 1 },
    ad: { year: 1958, month: 4, day: 13 }
  },
  {
    bs: { year: 2025, month: 1, day: 1 },
    ad: { year: 1968, month: 4, day: 13 }
  },
  {
    bs: { year: 2035, month: 1, day: 1 },
    ad: { year: 1978, month: 4, day: 14 }
  },
  {
    bs: { year: 2045, month: 1, day: 1 },
    ad: { year: 1988, month: 4, day: 13 }
  },
  {
    bs: { year: 2055, month: 1, day: 1 },
    ad: { year: 1998, month: 4, day: 14 }
  },
  {
    bs: { year: 2065, month: 1, day: 1 },
    ad: { year: 2008, month: 4, day: 13 }
  },
  {
    bs: { year: 2075, month: 1, day: 1 },
    ad: { year: 2018, month: 4, day: 14 }
  },
  {
    bs: { year: 2082, month: 1, day: 1 },
    ad: { year: 2025, month: 4, day: 14 }
  },
  {
    bs: { year: 2083, month: 1, day: 1 },
    ad: { year: 2026, month: 4, day: 14 }
  }
  // Additional reference dates should be added after verifying against
  // official sources or reliable existing implementations
];

/**
 * Base reference date for all calculations
 * BS 2000-01-01 = AD 1943-04-14
 */
export const BASE_BS_DATE = { year: 2000, month: 1, day: 1 };
export const BASE_AD_DATE = { year: 1943, month: 4, day: 14 };
