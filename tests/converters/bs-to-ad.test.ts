import { describe, it, expect } from 'vitest';
import { bsToAd } from '../../src/converters/bs-to-ad';
import { REFERENCE_DATES } from '../../src/data/reference-dates';

describe('bsToAd', () => {
  describe('basic conversion', () => {
    it('should convert BS 2000-01-01 to AD 1943-04-14 (base reference)', () => {
      const result = bsToAd(2000, 1, 1);
      expect(result).toEqual({ year: 1943, month: 4, day: 14 });
    });
  });

  describe('reference dates validation', () => {
    REFERENCE_DATES.forEach(({ bs, ad }) => {
      it(`should convert BS ${bs.year}-${bs.month}-${bs.day} to AD ${ad.year}-${ad.month}-${ad.day}`, () => {
        const result = bsToAd(bs.year, bs.month, bs.day);
        expect(result).toEqual(ad);
      });
    });
  });

  describe('format options', () => {
    it('should return date in ISO format', () => {
      const result = bsToAd(2000, 1, 1, { format: 'iso' });
      expect(result).toBe('1943-04-14');
    });

    it('should return date in string format with default pattern', () => {
      const result = bsToAd(2000, 1, 1, { format: 'string' });
      expect(result).toBe('1943-04-14');
    });

    it('should return date in string format with custom pattern YYYY/MM/DD', () => {
      const result = bsToAd(2000, 1, 1, { format: 'string', pattern: 'YYYY/MM/DD' });
      expect(result).toBe('1943/04/14');
    });

    it('should return date in string format with custom pattern DD-MM-YYYY', () => {
      const result = bsToAd(2000, 1, 1, { format: 'string', pattern: 'DD-MM-YYYY' });
      expect(result).toBe('14-04-1943');
    });

    it('should return date as array', () => {
      const result = bsToAd(2000, 1, 1, { format: 'array' });
      expect(result).toEqual([1943, 4, 14]);
    });

    it('should return date as object when format is object', () => {
      const result = bsToAd(2000, 1, 1, { format: 'object' });
      expect(result).toEqual({ year: 1943, month: 4, day: 14 });
    });
  });

  describe('edge cases', () => {
    it('should convert first day of a month', () => {
      const result = bsToAd(2000, 2, 1);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should convert mid-month date', () => {
      const result = bsToAd(2000, 6, 15);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should convert last day of year 2000', () => {
      const result = bsToAd(2000, 12, 31);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid year', () => {
      expect(() => bsToAd(1999, 1, 1)).toThrow('Invalid BS date');
    });

    it('should throw error for invalid month', () => {
      expect(() => bsToAd(2080, 13, 1)).toThrow('Invalid BS date');
    });

    it('should throw error for invalid day', () => {
      expect(() => bsToAd(2080, 1, 0)).toThrow('Invalid BS date');
    });

    it('should throw error for day exceeding month length', () => {
      expect(() => bsToAd(2080, 1, 33)).toThrow('Invalid BS date');
    });
  });

  describe('year transitions', () => {
    it('should handle dates across multiple years', () => {
      const year2000 = bsToAd(2000, 1, 1);
      const year2001 = bsToAd(2001, 1, 1);
      const year2010 = bsToAd(2010, 1, 1);

      expect(year2000).toBeDefined();
      expect(year2001).toBeDefined();
      expect(year2010).toBeDefined();

      // Year 2001 should be after year 2000
      if (typeof year2000 === 'object' && typeof year2001 === 'object' && 'year' in year2000 && 'year' in year2001) {
        expect(year2001.year).toBeGreaterThanOrEqual(year2000.year);
      }
    });
  });
});
