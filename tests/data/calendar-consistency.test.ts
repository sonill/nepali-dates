import { describe, it, expect } from 'vitest';
import { bsToAd } from '../../src/converters/bs-to-ad';
import { adToBs } from '../../src/converters/ad-to-bs';
import { NEPALI_CALENDAR_DATA, MIN_YEAR, MAX_YEAR } from '../../src/data/calendar-data';

function toUTCDate(year: number, month: number, day: number): number {
  return Date.UTC(year, month - 1, day);
}

function daysBetweenAd(a: { year: number; month: number; day: number }, b: { year: number; month: number; day: number }): number {
  const diffMs = toUTCDate(b.year, b.month, b.day) - toUTCDate(a.year, a.month, a.day);
  return Math.round(diffMs / 86400000);
}

describe('Calendar Consistency', () => {
  describe('Month boundaries match calendar data', () => {
    for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
      const months = NEPALI_CALENDAR_DATA[year];
      for (let month = 1; month <= 12; month++) {
        // Skip last month of MAX_YEAR since next year may be out of range
        if (year === MAX_YEAR && month === 12) continue;

        it(`BS ${year}-${month}-01 spans ${months[month - 1]} days`, () => {
          const startAd = bsToAd(year, month, 1) as { year: number; month: number; day: number };
          const nextMonthBs = month === 12 ? { year: year + 1, month: 1, day: 1 } : { year, month: month + 1, day: 1 };
          const nextAd = bsToAd(nextMonthBs.year, nextMonthBs.month, nextMonthBs.day) as { year: number; month: number; day: number };

          const diffDays = daysBetweenAd(startAd, nextAd);
          expect(diffDays).toBe(months[month - 1]);

          // Round-trip consistency for month starts
          const roundTripBs = adToBs(startAd.year, startAd.month, startAd.day) as { year: number; month: number; day: number };
          expect(roundTripBs).toEqual({ year, month, day: 1 });
        });
      }
    }
  });

  describe('Year lengths match sum of months', () => {
    for (let year = MIN_YEAR; year < MAX_YEAR; year++) {
      it(`BS year ${year} length equals sum of month lengths`, () => {
        const yearStartAd = bsToAd(year, 1, 1) as { year: number; month: number; day: number };
        const nextYearStartAd = bsToAd(year + 1, 1, 1) as { year: number; month: number; day: number };
        const diffDays = daysBetweenAd(yearStartAd, nextYearStartAd);
        const totalDays = NEPALI_CALENDAR_DATA[year].reduce((sum, d) => sum + d, 0);
        expect(diffDays).toBe(totalDays);
      });
    }
  });
});
