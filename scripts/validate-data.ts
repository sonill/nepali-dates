#!/usr/bin/env tsx

/**
 * Data validation script
 * Validates the integrity and consistency of calendar data
 */

import { NEPALI_CALENDAR_DATA, MIN_YEAR, MAX_YEAR } from '../src/data/calendar-data';
import { REFERENCE_DATES } from '../src/data/reference-dates';
import { bsToAd } from '../src/converters/bs-to-ad';
import { adToBs } from '../src/converters/ad-to-bs';
import type { DateObject } from '../src/types';

let errorCount = 0;
let warningCount = 0;

function error(message: string): void {
  console.error(`❌ ERROR: ${message}`);
  errorCount++;
}

function warn(message: string): void {
  console.warn(`⚠️  WARNING: ${message}`);
  warningCount++;
}

function success(message: string): void {
  console.log(`✅ ${message}`);
}

function info(message: string): void {
  console.log(`ℹ️  ${message}`);
}

console.log('\n🔍 Validating Nepali Calendar Data...\n');

// 1. Validate data structure
info('Checking data structure...');

const years = Object.keys(NEPALI_CALENDAR_DATA).map(Number);
const expectedYearCount = MAX_YEAR - MIN_YEAR + 1;

if (years.length !== expectedYearCount) {
  error(`Expected ${expectedYearCount} years, found ${years.length}`);
} else {
  success(`Data contains ${years.length} years (${MIN_YEAR}-${MAX_YEAR})`);
}

// 2. Validate each year
info('Validating year data...');

years.forEach((year) => {
  const months = NEPALI_CALENDAR_DATA[year];

  if (months.length !== 12) {
    error(`Year ${year}: Expected 12 months, found ${months.length}`);
  }

  months.forEach((days, index) => {
    const month = index + 1;

    if (days < 29 || days > 32) {
      error(`Year ${year}, Month ${month}: Invalid day count ${days} (must be 29-32)`);
    }
  });

  const totalDays = months.reduce((sum, days) => sum + days, 0);
  if (totalDays < 354 || totalDays > 385) {
    warn(`Year ${year}: Unusual total days ${totalDays} (typically 354-385)`);
  }
});

success('Year data structure validated');

// 3. Validate reference dates
info('Validating reference dates...');

let referenceErrorCount = 0;

REFERENCE_DATES.forEach((ref, index) => {
  try {
    const convertedAd = bsToAd(ref.bs.year, ref.bs.month, ref.bs.day) as DateObject;
    const convertedBs = adToBs(ref.ad.year, ref.ad.month, ref.ad.day) as DateObject;

    if (
      convertedAd.year !== ref.ad.year ||
      convertedAd.month !== ref.ad.month ||
      convertedAd.day !== ref.ad.day
    ) {
      error(
        `Reference date ${index}: BS ${ref.bs.year}-${ref.bs.month}-${ref.bs.day} ` +
        `should convert to AD ${ref.ad.year}-${ref.ad.month}-${ref.ad.day}, ` +
        `got ${convertedAd.year}-${convertedAd.month}-${convertedAd.day}`
      );
      referenceErrorCount++;
    }

    if (
      convertedBs.year !== ref.bs.year ||
      convertedBs.month !== ref.bs.month ||
      convertedBs.day !== ref.bs.day
    ) {
      error(
        `Reference date ${index}: AD ${ref.ad.year}-${ref.ad.month}-${ref.ad.day} ` +
        `should convert to BS ${ref.bs.year}-${ref.bs.month}-${ref.bs.day}, ` +
        `got ${convertedBs.year}-${convertedBs.month}-${convertedBs.day}`
      );
      referenceErrorCount++;
    }
  } catch (err) {
    error(`Reference date ${index} validation failed: ${err}`);
    referenceErrorCount++;
  }
});

if (referenceErrorCount === 0) {
  success(`All ${REFERENCE_DATES.length} reference dates validated successfully`);
} else {
  error(`${referenceErrorCount} reference date validation errors found`);
}

// 4. Round-trip validation
info('Testing round-trip conversions...');

let roundTripErrors = 0;

// Test a sample of dates
const testYears = [2000, 2025, 2050, 2075, 2100];
testYears.forEach((year) => {
  if (year in NEPALI_CALENDAR_DATA) {
    // Test first day of each month
    for (let month = 1; month <= 12; month++) {
      try {
        const ad = bsToAd(year, month, 1) as DateObject;
        const backToBs = adToBs(ad.year, ad.month, ad.day) as DateObject;

        if (backToBs.year !== year || backToBs.month !== month || backToBs.day !== 1) {
          error(
            `Round-trip failed for BS ${year}-${month}-1: ` +
            `got ${backToBs.year}-${backToBs.month}-${backToBs.day}`
          );
          roundTripErrors++;
        }
      } catch (err) {
        error(`Round-trip test failed for BS ${year}-${month}-1: ${err}`);
        roundTripErrors++;
      }
    }
  }
});

if (roundTripErrors === 0) {
  success('Round-trip conversion tests passed');
} else {
  error(`${roundTripErrors} round-trip conversion errors found`);
}

// 5. Data consistency checks
info('Checking data consistency...');

let consistencyWarnings = 0;

years.forEach((year) => {
  const months = NEPALI_CALENDAR_DATA[year];

  // Check for unusual patterns
  const baisakhDays = months[0]; // First month
  if (baisakhDays < 30 || baisakhDays > 31) {
    warn(`Year ${year}: Baisakh has ${baisakhDays} days (typically 30-31)`);
    consistencyWarnings++;
  }

  // Check total days pattern
  const totalDays = months.reduce((sum, days) => sum + days, 0);
  if (totalDays !== 365 && totalDays !== 366) {
    warn(`Year ${year}: Total days is ${totalDays} (typically 365 or 366)`);
    consistencyWarnings++;
  }
});

if (consistencyWarnings === 0) {
  success('Data consistency checks passed');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Validation Summary\n');

if (errorCount === 0 && warningCount === 0) {
  console.log('🎉 All validations passed successfully!\n');
  process.exit(0);
} else {
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`⚠️  Warnings: ${warningCount}\n`);

  if (errorCount > 0) {
    console.error('❌ Validation failed. Please fix errors before proceeding.\n');
    process.exit(1);
  } else {
    console.log('⚠️  Validation completed with warnings. Review before proceeding.\n');
    process.exit(0);
  }
}
