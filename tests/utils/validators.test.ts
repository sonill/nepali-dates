import { describe, it, expect } from 'vitest';
import {
  hasDataForYear,
  isValidBsDate,
  isValidAdDate,
  isLeapYear,
  getDaysInAdMonth
} from '../../src/utils/validators';

describe('Validators', () => {
  describe('hasDataForYear', () => {
    it('should return true for years within range', () => {
      expect(hasDataForYear(2000)).toBe(true);
      expect(hasDataForYear(2080)).toBe(true);
      expect(hasDataForYear(2100)).toBe(true);
    });

    it('should return false for years outside range', () => {
      expect(hasDataForYear(1999)).toBe(false);
      expect(hasDataForYear(2101)).toBe(false);
    });
  });

  describe('isValidBsDate', () => {
    it('should return true for valid dates', () => {
      expect(isValidBsDate(2080, 1, 1)).toBe(true);
      expect(isValidBsDate(2080, 12, 30)).toBe(true);
      expect(isValidBsDate(2000, 1, 1)).toBe(true);
    });

    it('should return false for invalid year', () => {
      expect(isValidBsDate(1999, 1, 1)).toBe(false);
      expect(isValidBsDate(2101, 1, 1)).toBe(false);
    });

    it('should return false for invalid month', () => {
      expect(isValidBsDate(2080, 0, 1)).toBe(false);
      expect(isValidBsDate(2080, 13, 1)).toBe(false);
    });

    it('should return false for invalid day', () => {
      expect(isValidBsDate(2080, 1, 0)).toBe(false);
      expect(isValidBsDate(2080, 1, 32)).toBe(false);
    });

    it('should validate day against actual month length', () => {
      expect(isValidBsDate(2080, 1, 31)).toBe(true);
      expect(isValidBsDate(2080, 1, 32)).toBe(false);
      expect(isValidBsDate(2080, 12, 30)).toBe(true);
      expect(isValidBsDate(2080, 12, 31)).toBe(false);
    });
  });

  describe('isValidAdDate', () => {
    it('should return true for valid dates', () => {
      expect(isValidAdDate(2024, 1, 1)).toBe(true);
      expect(isValidAdDate(2024, 12, 31)).toBe(true);
      expect(isValidAdDate(1943, 4, 14)).toBe(true);
    });

    it('should return false for invalid year', () => {
      expect(isValidAdDate(0, 1, 1)).toBe(false);
      expect(isValidAdDate(10000, 1, 1)).toBe(false);
    });

    it('should return false for invalid month', () => {
      expect(isValidAdDate(2024, 0, 1)).toBe(false);
      expect(isValidAdDate(2024, 13, 1)).toBe(false);
    });

    it('should return false for invalid day', () => {
      expect(isValidAdDate(2024, 1, 0)).toBe(false);
      expect(isValidAdDate(2024, 1, 32)).toBe(false);
    });

    it('should validate days in each month correctly', () => {
      expect(isValidAdDate(2024, 1, 31)).toBe(true); // January
      expect(isValidAdDate(2024, 4, 31)).toBe(false); // April has 30 days
      expect(isValidAdDate(2024, 4, 30)).toBe(true);
    });

    it('should handle leap year February correctly', () => {
      expect(isValidAdDate(2024, 2, 29)).toBe(true); // 2024 is leap year
      expect(isValidAdDate(2023, 2, 29)).toBe(false); // 2023 is not leap year
      expect(isValidAdDate(2023, 2, 28)).toBe(true);
    });
  });

  describe('isLeapYear', () => {
    it('should return true for leap years', () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2020)).toBe(true);
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(1600)).toBe(true);
    });

    it('should return false for non-leap years', () => {
      expect(isLeapYear(2023)).toBe(false);
      expect(isLeapYear(2021)).toBe(false);
      expect(isLeapYear(1900)).toBe(false); // Divisible by 100 but not 400
      expect(isLeapYear(2100)).toBe(false);
    });

    it('should handle century years correctly', () => {
      expect(isLeapYear(2000)).toBe(true); // Divisible by 400
      expect(isLeapYear(1900)).toBe(false); // Divisible by 100 but not 400
      expect(isLeapYear(2400)).toBe(true); // Divisible by 400
    });
  });

  describe('getDaysInAdMonth', () => {
    it('should return correct days for each month', () => {
      expect(getDaysInAdMonth(2024, 1)).toBe(31); // January
      expect(getDaysInAdMonth(2024, 3)).toBe(31); // March
      expect(getDaysInAdMonth(2024, 4)).toBe(30); // April
      expect(getDaysInAdMonth(2024, 5)).toBe(31); // May
      expect(getDaysInAdMonth(2024, 6)).toBe(30); // June
      expect(getDaysInAdMonth(2024, 7)).toBe(31); // July
      expect(getDaysInAdMonth(2024, 8)).toBe(31); // August
      expect(getDaysInAdMonth(2024, 9)).toBe(30); // September
      expect(getDaysInAdMonth(2024, 10)).toBe(31); // October
      expect(getDaysInAdMonth(2024, 11)).toBe(30); // November
      expect(getDaysInAdMonth(2024, 12)).toBe(31); // December
    });

    it('should return 29 for February in leap year', () => {
      expect(getDaysInAdMonth(2024, 2)).toBe(29);
      expect(getDaysInAdMonth(2020, 2)).toBe(29);
    });

    it('should return 28 for February in non-leap year', () => {
      expect(getDaysInAdMonth(2023, 2)).toBe(28);
      expect(getDaysInAdMonth(2021, 2)).toBe(28);
    });
  });
});
