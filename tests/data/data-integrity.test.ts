import { describe, it, expect } from 'vitest';
import { NEPALI_CALENDAR_DATA, MIN_YEAR, MAX_YEAR } from '../../src/data/calendar-data';
import { REFERENCE_DATES } from '../../src/data/reference-dates';

describe('Data Integrity Tests', () => {
  describe('Calendar Data Structure', () => {
    it('should have data for all years from MIN_YEAR to MAX_YEAR', () => {
      for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
        expect(NEPALI_CALENDAR_DATA).toHaveProperty(String(year));
      }
    });

    it('should have exactly 12 months for each year', () => {
      Object.keys(NEPALI_CALENDAR_DATA).forEach((year) => {
        expect(NEPALI_CALENDAR_DATA[Number(year)]).toHaveLength(12);
      });
    });

    it('should have valid day counts for each month (29-32)', () => {
      Object.entries(NEPALI_CALENDAR_DATA).forEach(([year, months]) => {
        months.forEach((days, monthIndex) => {
          expect(days).toBeGreaterThanOrEqual(29);
          expect(days).toBeLessThanOrEqual(32);
        });
      });
    });

    it('should have total days in year between 354 and 385', () => {
      Object.entries(NEPALI_CALENDAR_DATA).forEach(([year, months]) => {
        const totalDays = months.reduce((sum, days) => sum + days, 0);
        expect(totalDays).toBeGreaterThanOrEqual(354);
        expect(totalDays).toBeLessThanOrEqual(385);
      });
    });
  });

  describe('Year Range Constants', () => {
    it('should have MIN_YEAR as 2000', () => {
      expect(MIN_YEAR).toBe(2000);
    });

    it('should have MAX_YEAR as 2100', () => {
      expect(MAX_YEAR).toBe(2100);
    });

    it('should have 101 years of data', () => {
      const yearCount = Object.keys(NEPALI_CALENDAR_DATA).length;
      expect(yearCount).toBe(101);
    });
  });

  describe('Reference Dates', () => {
    it('should have at least 1 reference date', () => {
      expect(REFERENCE_DATES.length).toBeGreaterThanOrEqual(1);
    });

    it('should have valid BS dates in reference dates', () => {
      REFERENCE_DATES.forEach((ref) => {
        expect(ref.bs.year).toBeGreaterThanOrEqual(MIN_YEAR);
        expect(ref.bs.year).toBeLessThanOrEqual(MAX_YEAR);
        expect(ref.bs.month).toBeGreaterThanOrEqual(1);
        expect(ref.bs.month).toBeLessThanOrEqual(12);
        expect(ref.bs.day).toBeGreaterThanOrEqual(1);
        expect(ref.bs.day).toBeLessThanOrEqual(32);
      });
    });

    it('should have valid AD dates in reference dates', () => {
      REFERENCE_DATES.forEach((ref) => {
        expect(ref.ad.year).toBeGreaterThan(1900);
        expect(ref.ad.year).toBeLessThan(2100);
        expect(ref.ad.month).toBeGreaterThanOrEqual(1);
        expect(ref.ad.month).toBeLessThanOrEqual(12);
        expect(ref.ad.day).toBeGreaterThanOrEqual(1);
        expect(ref.ad.day).toBeLessThanOrEqual(31);
      });
    });

    it('should have base reference date as first entry', () => {
      expect(REFERENCE_DATES[0].bs).toEqual({ year: 2000, month: 1, day: 1 });
      expect(REFERENCE_DATES[0].ad).toEqual({ year: 1943, month: 4, day: 14 });
    });
  });

  describe('Data Consistency', () => {
    it('should have consistent month patterns across years', () => {
      // BS calendar typically has consistent patterns
      // First month (Baisakh) usually has 30-31 days
      Object.entries(NEPALI_CALENDAR_DATA).forEach(([year, months]) => {
        expect(months[0]).toBeGreaterThanOrEqual(30);
        expect(months[0]).toBeLessThanOrEqual(32);
      });
    });

    it('should not have any months with less than 29 days', () => {
      Object.entries(NEPALI_CALENDAR_DATA).forEach(([year, months]) => {
        months.forEach((days) => {
          expect(days).toBeGreaterThanOrEqual(29);
        });
      });
    });

    it('should not have any months with more than 32 days', () => {
      Object.entries(NEPALI_CALENDAR_DATA).forEach(([year, months]) => {
        months.forEach((days) => {
          expect(days).toBeLessThanOrEqual(32);
        });
      });
    });
  });

  describe('Specific Year Data Validation', () => {
    it('should have correct data for year 2080', () => {
      expect(NEPALI_CALENDAR_DATA[2080]).toEqual([
        31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30
      ]);
    });

    it('should have correct data for year 2000', () => {
      expect(NEPALI_CALENDAR_DATA[2000]).toEqual([
        30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31
      ]);
    });

    it('should have correct total days for year 2080', () => {
      const totalDays = NEPALI_CALENDAR_DATA[2080].reduce((sum, days) => sum + days, 0);
      expect(totalDays).toBe(365);
    });

    it('should have correct total days for year 2000', () => {
      const totalDays = NEPALI_CALENDAR_DATA[2000].reduce((sum, days) => sum + days, 0);
      expect(totalDays).toBe(365);
    });
  });
});
