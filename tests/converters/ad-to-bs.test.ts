import { describe, it, expect } from 'vitest';
import { adToBs } from '../../src/converters/ad-to-bs';
import { REFERENCE_DATES } from '../../src/data/reference-dates';

describe('adToBs', () => {
  describe('basic conversion', () => {
    it('should convert AD 1943-04-14 to BS 2000-01-01 (base reference)', () => {
      const result = adToBs(1943, 4, 14);
      expect(result).toEqual({ year: 2000, month: 1, day: 1 });
    });
  });

  describe('reference dates validation', () => {
    REFERENCE_DATES.forEach(({ bs, ad }) => {
      it(`should convert AD ${ad.year}-${ad.month}-${ad.day} to BS ${bs.year}-${bs.month}-${bs.day}`, () => {
        const result = adToBs(ad.year, ad.month, ad.day);
        expect(result).toEqual(bs);
      });
    });
  });

  describe('format options', () => {
    it('should return date in ISO format', () => {
      const result = adToBs(1943, 4, 14, { format: 'iso' });
      expect(result).toBe('2000-01-01');
    });

    it('should return date in string format with default pattern', () => {
      const result = adToBs(1943, 4, 14, { format: 'string' });
      expect(result).toBe('2000-01-01');
    });

    it('should return date in string format with custom pattern YYYY/MM/DD', () => {
      const result = adToBs(1943, 4, 14, { format: 'string', pattern: 'YYYY/MM/DD' });
      expect(result).toBe('2000/01/01');
    });

    it('should return date in string format with custom pattern DD-MM-YYYY', () => {
      const result = adToBs(1943, 4, 14, { format: 'string', pattern: 'DD-MM-YYYY' });
      expect(result).toBe('01-01-2000');
    });

    it('should return date as array', () => {
      const result = adToBs(1943, 4, 14, { format: 'array' });
      expect(result).toEqual([2000, 1, 1]);
    });

    it('should return date as object when format is object', () => {
      const result = adToBs(1943, 4, 14, { format: 'object' });
      expect(result).toEqual({ year: 2000, month: 1, day: 1 });
    });
  });

  describe('edge cases', () => {
    it('should convert dates after base date', () => {
      const result = adToBs(1943, 5, 1);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should handle year transitions', () => {
      const result = adToBs(2000, 1, 1);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid month', () => {
      expect(() => adToBs(2024, 13, 1)).toThrow('Invalid AD date');
    });

    it('should throw error for invalid day', () => {
      expect(() => adToBs(2024, 1, 32)).toThrow('Invalid AD date');
    });

    it('should throw error for date before minimum supported date', () => {
      expect(() => adToBs(1943, 4, 13)).toThrow('before the minimum supported date');
    });

    it('should throw error for invalid February day in non-leap year', () => {
      expect(() => adToBs(2023, 2, 29)).toThrow('Invalid AD date');
    });

    it('should accept valid February day in leap year', () => {
      const result = adToBs(2024, 2, 29);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });
});
