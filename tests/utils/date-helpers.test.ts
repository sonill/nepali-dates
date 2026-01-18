import { describe, it, expect } from 'vitest';
import {
  getTotalDaysInMonth,
  getTotalDaysInYear,
  getNextMonth,
  getPrevMonth,
  getCalendarData,
  getDataRange,
  getDaysInRange,
  getAllCalendarData
} from '../../src/utils/date-helpers';

describe('Date Helpers', () => {
  describe('getTotalDaysInMonth', () => {
    it('should return correct days for Baisakh 2080', () => {
      expect(getTotalDaysInMonth(2080, 1)).toBe(31);
    });

    it('should return correct days for Jestha 2080', () => {
      expect(getTotalDaysInMonth(2080, 2)).toBe(32);
    });

    it('should return correct days for Chaitra 2080', () => {
      expect(getTotalDaysInMonth(2080, 12)).toBe(30);
    });

    it('should throw error for invalid year', () => {
      expect(() => getTotalDaysInMonth(1999, 1)).toThrow('No data available');
    });

    it('should throw error for invalid month', () => {
      expect(() => getTotalDaysInMonth(2080, 13)).toThrow('Invalid month');
    });

    it('should throw error for month 0', () => {
      expect(() => getTotalDaysInMonth(2080, 0)).toThrow('Invalid month');
    });
  });

  describe('getTotalDaysInYear', () => {
    it('should return total days in year 2080', () => {
      const total = getTotalDaysInYear(2080);
      expect(total).toBe(365);
    });

    it('should return total days in year 2000', () => {
      const total = getTotalDaysInYear(2000);
      expect(total).toBe(365);
    });

    it('should throw error for invalid year', () => {
      expect(() => getTotalDaysInYear(1999)).toThrow('No data available');
    });
  });

  describe('getNextMonth', () => {
    it('should return next month in same year', () => {
      const result = getNextMonth(2080, 6);
      expect(result).toEqual({ year: 2080, month: 7 });
    });

    it('should return first month of next year when current is last month', () => {
      const result = getNextMonth(2080, 12);
      expect(result).toEqual({ year: 2081, month: 1 });
    });

    it('should throw error for invalid month', () => {
      expect(() => getNextMonth(2080, 13)).toThrow('Invalid month');
    });

    it('should throw error if next year data not available', () => {
      expect(() => getNextMonth(2100, 12)).toThrow('No data available');
    });
  });

  describe('getPrevMonth', () => {
    it('should return previous month in same year', () => {
      const result = getPrevMonth(2080, 7);
      expect(result).toEqual({ year: 2080, month: 6 });
    });

    it('should return last month of previous year when current is first month', () => {
      const result = getPrevMonth(2080, 1);
      expect(result).toEqual({ year: 2079, month: 12 });
    });

    it('should throw error for invalid month', () => {
      expect(() => getPrevMonth(2080, 0)).toThrow('Invalid month');
    });

    it('should throw error if previous year data not available', () => {
      expect(() => getPrevMonth(2000, 1)).toThrow('No data available');
    });
  });

  describe('getCalendarData', () => {
    it('should return array of 12 months for valid year', () => {
      const data = getCalendarData(2080);
      expect(data).toHaveLength(12);
      expect(Array.isArray(data)).toBe(true);
    });

    it('should return correct data for year 2080', () => {
      const data = getCalendarData(2080);
      expect(data).toEqual([31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]);
    });

    it('should return a copy of data (not reference)', () => {
      const data1 = getCalendarData(2080);
      const data2 = getCalendarData(2080);
      expect(data1).not.toBe(data2);
      expect(data1).toEqual(data2);
    });

    it('should throw error for invalid year', () => {
      expect(() => getCalendarData(1999)).toThrow('No data available');
    });
  });

  describe('getDataRange', () => {
    it('should return correct data range', () => {
      const range = getDataRange();
      expect(range.minYear).toBe(2000);
      expect(range.maxYear).toBe(2100);
      expect(range.totalYears).toBe(101);
    });

    it('should return object with correct properties', () => {
      const range = getDataRange();
      expect(range).toHaveProperty('minYear');
      expect(range).toHaveProperty('maxYear');
      expect(range).toHaveProperty('totalYears');
    });
  });

  describe('getDaysInRange', () => {
    it('should return 0 for same date', () => {
      const days = getDaysInRange(2080, 1, 1, 2080, 1, 1);
      expect(days).toBe(0);
    });

    it('should return correct days for same month', () => {
      const days = getDaysInRange(2080, 1, 1, 2080, 1, 10);
      expect(days).toBe(9);
    });

    it('should return correct days across months', () => {
      const days = getDaysInRange(2080, 1, 1, 2080, 2, 1);
      expect(days).toBe(31);
    });

    it('should return correct days across years', () => {
      const days = getDaysInRange(2080, 1, 1, 2081, 1, 1);
      expect(days).toBe(365);
    });

    it('should return negative days for backward range', () => {
      const days = getDaysInRange(2080, 1, 10, 2080, 1, 1);
      expect(days).toBe(-9);
    });

    it('should throw error for invalid year', () => {
      expect(() => getDaysInRange(1999, 1, 1, 2080, 1, 1)).toThrow('outside the available data range');
    });
  });

  describe('getAllCalendarData', () => {
    it('should return complete calendar data object', () => {
      const data = getAllCalendarData();
      expect(typeof data).toBe('object');
      expect(Object.keys(data).length).toBeGreaterThan(0);
    });

    it('should return a copy of data (not reference)', () => {
      const data1 = getAllCalendarData();
      const data2 = getAllCalendarData();
      expect(data1).not.toBe(data2);
      expect(data1).toEqual(data2);
    });

    it('should contain year 2080', () => {
      const data = getAllCalendarData();
      expect(data).toHaveProperty('2080');
    });
  });
});
