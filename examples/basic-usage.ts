/**
 * Basic usage examples for nepali-dates package
 */

import {
  bsToAd,
  adToBs,
  getTotalDaysInMonth,
  getTotalDaysInYear,
  getNextMonth,
  getPrevMonth,
  getDaysInRange,
  formatBsDate,
  formatAdDate,
  getNepaliMonthName,
  getEnglishMonthName,
  parseDate,
  isValidBsDate,
  isValidAdDate,
  getDataRange,
  getCalendarData
} from '../src/index';

console.log('=== Nepali Dates Package Examples ===\n');

// 1. Basic Date Conversion
console.log('1. Basic Date Conversion');
console.log('------------------------');

const bsDate = { year: 2080, month: 10, day: 15 };
const adDate = bsToAd(bsDate.year, bsDate.month, bsDate.day);
console.log(`BS ${bsDate.year}-${bsDate.month}-${bsDate.day} = AD`, adDate);

const adDateInput = { year: 2024, month: 1, day: 27 };
const bsResult = adToBs(adDateInput.year, adDateInput.month, adDateInput.day);
console.log(`AD ${adDateInput.year}-${adDateInput.month}-${adDateInput.day} = BS`, bsResult);

console.log('\n');

// 2. Different Output Formats
console.log('2. Different Output Formats');
console.log('---------------------------');

console.log('Object format:', bsToAd(2080, 10, 15, { format: 'object' }));
console.log('ISO format:', bsToAd(2080, 10, 15, { format: 'iso' }));
console.log('Array format:', bsToAd(2080, 10, 15, { format: 'array' }));
console.log('Custom string:', bsToAd(2080, 10, 15, { format: 'string', pattern: 'DD/MM/YYYY' }));

console.log('\n');

// 3. Date Formatting
console.log('3. Date Formatting');
console.log('------------------');

console.log('BS Date (default):', formatBsDate(2080, 10, 15));
console.log('BS Date (DD/MM/YYYY):', formatBsDate(2080, 10, 15, { pattern: 'DD/MM/YYYY' }));
console.log('AD Date (default):', formatAdDate(2024, 1, 27));
console.log('AD Date (MM-DD-YYYY):', formatAdDate(2024, 1, 27, { pattern: 'MM-DD-YYYY' }));

console.log('\n');

// 4. Month Information
console.log('4. Month Information');
console.log('--------------------');

console.log('Days in Baisakh 2080:', getTotalDaysInMonth(2080, 1));
console.log('Days in Jestha 2080:', getTotalDaysInMonth(2080, 2));
console.log('Total days in year 2080:', getTotalDaysInYear(2080));

console.log('\nNepali Month Names (English):');
for (let i = 1; i <= 12; i++) {
  console.log(`  ${i}. ${getNepaliMonthName(i)}`);
}

console.log('\nNepali Month Names (Nepali):');
for (let i = 1; i <= 3; i++) {
  console.log(`  ${i}. ${getNepaliMonthName(i, 'ne')}`);
}

console.log('\n');

// 5. Month Navigation
console.log('5. Month Navigation');
console.log('-------------------');

const currentMonth = { year: 2080, month: 6 };
console.log('Current:', currentMonth);
console.log('Next month:', getNextMonth(currentMonth.year, currentMonth.month));
console.log('Previous month:', getPrevMonth(currentMonth.year, currentMonth.month));

const yearEndMonth = { year: 2080, month: 12 };
console.log('\nYear-end transition:');
console.log('Current:', yearEndMonth);
console.log('Next month:', getNextMonth(yearEndMonth.year, yearEndMonth.month));

console.log('\n');

// 6. Date Range Calculations
console.log('6. Date Range Calculations');
console.log('--------------------------');

const from = { year: 2080, month: 1, day: 1 };
const to = { year: 2080, month: 1, day: 31 };
const days = getDaysInRange(from.year, from.month, from.day, to.year, to.month, to.day);
console.log(`Days from ${from.year}-${from.month}-${from.day} to ${to.year}-${to.month}-${to.day}:`, days);

const yearStart = { year: 2080, month: 1, day: 1 };
const yearEnd = { year: 2081, month: 1, day: 1 };
const yearDays = getDaysInRange(
  yearStart.year, yearStart.month, yearStart.day,
  yearEnd.year, yearEnd.month, yearEnd.day
);
console.log(`Days in year 2080:`, yearDays);

console.log('\n');

// 7. Date Parsing
console.log('7. Date Parsing');
console.log('---------------');

const parsed1 = parseDate('2080-10-15');
console.log('Parsed "2080-10-15":', parsed1);

const parsed2 = parseDate('15/10/2080', 'DD/MM/YYYY');
console.log('Parsed "15/10/2080" (DD/MM/YYYY):', parsed2);

console.log('\n');

// 8. Date Validation
console.log('8. Date Validation');
console.log('------------------');

console.log('isValidBsDate(2080, 1, 1):', isValidBsDate(2080, 1, 1));
console.log('isValidBsDate(2080, 13, 1):', isValidBsDate(2080, 13, 1));
console.log('isValidBsDate(2080, 1, 32):', isValidBsDate(2080, 1, 32));

console.log('\nisValidAdDate(2024, 2, 29):', isValidAdDate(2024, 2, 29)); // Leap year
console.log('isValidAdDate(2023, 2, 29):', isValidAdDate(2023, 2, 29)); // Not leap year

console.log('\n');

// 9. Data Information
console.log('9. Data Information');
console.log('-------------------');

const dataRange = getDataRange();
console.log('Available data range:', dataRange);

const year2080Data = getCalendarData(2080);
console.log('\nYear 2080 month lengths:', year2080Data);
console.log('Total days:', year2080Data.reduce((sum, days) => sum + days, 0));

console.log('\n');

// 10. Real-world Example: Age Calculator
console.log('10. Real-world Example: Age Calculator');
console.log('---------------------------------------');

const birthDate = { year: 2055, month: 5, day: 15 };
const today = { year: 2080, month: 10, day: 15 };

const ageInDays = getDaysInRange(
  birthDate.year, birthDate.month, birthDate.day,
  today.year, today.month, today.day
);

const ageInYears = Math.floor(ageInDays / 365.25);
console.log(`Birth date: ${birthDate.year}-${birthDate.month}-${birthDate.day}`);
console.log(`Today: ${today.year}-${today.month}-${today.day}`);
console.log(`Age: ${ageInYears} years (${ageInDays} days)`);

// Convert to English dates for reference
const birthDateAd = bsToAd(birthDate.year, birthDate.month, birthDate.day);
const todayAd = bsToAd(today.year, today.month, today.day);
console.log(`\nIn English calendar:`);
console.log(`Birth date: ${formatAdDate((birthDateAd as any).year, (birthDateAd as any).month, (birthDateAd as any).day)}`);
console.log(`Today: ${formatAdDate((todayAd as any).year, (todayAd as any).month, (todayAd as any).day)}`);

console.log('\n=== End of Examples ===');
