import { describe, it, expect } from 'vitest';
import {
  formatBsDate,
  formatAdDate,
  getNepaliMonthName,
  getEnglishMonthName,
  parseDate,
  toIsoString,
  toArray
} from '../../src/utils/formatters';

describe('Formatters', () => {
  describe('formatBsDate', () => {
    it('should format with default pattern', () => {
      expect(formatBsDate(2080, 10, 15)).toBe('2080-10-15');
    });

    it('should format with YYYY/MM/DD pattern', () => {
      expect(formatBsDate(2080, 10, 15, { pattern: 'YYYY/MM/DD' })).toBe('2080/10/15');
    });

    it('should format with DD-MM-YYYY pattern', () => {
      expect(formatBsDate(2080, 10, 15, { pattern: 'DD-MM-YYYY' })).toBe('15-10-2080');
    });

    it('should format with DD/MM/YYYY pattern', () => {
      expect(formatBsDate(2080, 1, 5, { pattern: 'DD/MM/YYYY' })).toBe('05/01/2080');
    });

    it('should pad single digit month and day', () => {
      expect(formatBsDate(2080, 1, 5)).toBe('2080-01-05');
    });
  });

  describe('formatAdDate', () => {
    it('should format with default pattern', () => {
      expect(formatAdDate(2024, 1, 27)).toBe('2024-01-27');
    });

    it('should format with YYYY/MM/DD pattern', () => {
      expect(formatAdDate(2024, 1, 27, { pattern: 'YYYY/MM/DD' })).toBe('2024/01/27');
    });

    it('should format with DD-MM-YYYY pattern', () => {
      expect(formatAdDate(2024, 1, 27, { pattern: 'DD-MM-YYYY' })).toBe('27-01-2024');
    });

    it('should pad single digit month and day', () => {
      expect(formatAdDate(2024, 3, 5)).toBe('2024-03-05');
    });
  });

  describe('getNepaliMonthName', () => {
    it('should return English month name by default', () => {
      expect(getNepaliMonthName(1)).toBe('Baisakh');
      expect(getNepaliMonthName(2)).toBe('Jestha');
      expect(getNepaliMonthName(12)).toBe('Chaitra');
    });

    it('should return English month name with en locale', () => {
      expect(getNepaliMonthName(1, 'en')).toBe('Baisakh');
    });

    it('should return Nepali month name with ne locale', () => {
      expect(getNepaliMonthName(1, 'ne')).toBe('बैशाख');
      expect(getNepaliMonthName(2, 'ne')).toBe('जेठ');
    });

    it('should throw error for invalid month', () => {
      expect(() => getNepaliMonthName(0)).toThrow('Invalid month');
      expect(() => getNepaliMonthName(13)).toThrow('Invalid month');
    });
  });

  describe('getEnglishMonthName', () => {
    it('should return correct month names', () => {
      expect(getEnglishMonthName(1)).toBe('January');
      expect(getEnglishMonthName(2)).toBe('February');
      expect(getEnglishMonthName(12)).toBe('December');
    });

    it('should throw error for invalid month', () => {
      expect(() => getEnglishMonthName(0)).toThrow('Invalid month');
      expect(() => getEnglishMonthName(13)).toThrow('Invalid month');
    });
  });

  describe('parseDate', () => {
    it('should parse date with default pattern YYYY-MM-DD', () => {
      const result = parseDate('2080-10-15');
      expect(result).toEqual({ year: 2080, month: 10, day: 15 });
    });

    it('should parse date with YYYY/MM/DD pattern', () => {
      const result = parseDate('2080/10/15', 'YYYY/MM/DD');
      expect(result).toEqual({ year: 2080, month: 10, day: 15 });
    });

    it('should parse date with DD-MM-YYYY pattern', () => {
      const result = parseDate('15-10-2080', 'DD-MM-YYYY');
      expect(result).toEqual({ year: 2080, month: 10, day: 15 });
    });

    it('should parse date with DD/MM/YYYY pattern', () => {
      const result = parseDate('15/10/2080', 'DD/MM/YYYY');
      expect(result).toEqual({ year: 2080, month: 10, day: 15 });
    });

    it('should parse date with MM-DD-YYYY pattern', () => {
      const result = parseDate('10-15-2080', 'MM-DD-YYYY');
      expect(result).toEqual({ year: 2080, month: 10, day: 15 });
    });

    it('should throw error for invalid date string', () => {
      expect(() => parseDate('invalid')).toThrow('Invalid date string');
    });

    it('should throw error for non-numeric values', () => {
      expect(() => parseDate('abc-def-ghi')).toThrow('Invalid date value');
    });
  });

  describe('toIsoString', () => {
    it('should convert date object to ISO string', () => {
      expect(toIsoString({ year: 2080, month: 10, day: 15 })).toBe('2080-10-15');
    });

    it('should pad single digit month and day', () => {
      expect(toIsoString({ year: 2080, month: 1, day: 5 })).toBe('2080-01-05');
    });
  });

  describe('toArray', () => {
    it('should convert date object to array', () => {
      expect(toArray({ year: 2080, month: 10, day: 15 })).toEqual([2080, 10, 15]);
    });

    it('should maintain numeric values', () => {
      const result = toArray({ year: 2080, month: 1, day: 5 });
      expect(result).toEqual([2080, 1, 5]);
      expect(result[1]).toBe(1);
      expect(result[2]).toBe(5);
    });
  });
});
