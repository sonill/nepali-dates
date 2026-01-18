# Quick Start Guide

Get up and running with Nepali Dates in minutes!

## Installation

```bash
npm install nepali-dates
```

## Basic Usage

### 1. Convert Nepali to English Date

```typescript
import { bsToAd } from 'nepali-dates';

const englishDate = bsToAd(2080, 10, 15);
console.log(englishDate);
// Output: { year: 2024, month: 1, day: 27 }
```

### 2. Convert English to Nepali Date

```typescript
import { adToBs } from 'nepali-dates';

const nepaliDate = adToBs(2024, 1, 27);
console.log(nepaliDate);
// Output: { year: 2080, month: 10, day: 15 }
```

### 3. Get Month Information

```typescript
import { getTotalDaysInMonth, getNepaliMonthName } from 'nepali-dates';

const days = getTotalDaysInMonth(2080, 1);
console.log(days); // 31

const monthName = getNepaliMonthName(1);
console.log(monthName); // "Baisakh"
```

### 4. Format Dates

```typescript
import { bsToAd } from 'nepali-dates';

// Get ISO format
const iso = bsToAd(2080, 10, 15, { format: 'iso' });
console.log(iso); // "2024-01-27"

// Get custom format
const custom = bsToAd(2080, 10, 15, {
  format: 'string',
  pattern: 'DD/MM/YYYY'
});
console.log(custom); // "27/01/2024"
```

### 5. Validate Dates

```typescript
import { isValidBsDate, isValidAdDate } from 'nepali-dates';

console.log(isValidBsDate(2080, 1, 1)); // true
console.log(isValidBsDate(2080, 13, 1)); // false

console.log(isValidAdDate(2024, 2, 29)); // true (leap year)
console.log(isValidAdDate(2023, 2, 29)); // false
```

## Common Use Cases

### Birthday Calculator

```typescript
import { bsToAd, getDaysInRange } from 'nepali-dates';

const birthDate = { year: 2060, month: 1, day: 1 };
const today = { year: 2080, month: 1, day: 1 };

const ageInDays = getDaysInRange(
  birthDate.year, birthDate.month, birthDate.day,
  today.year, today.month, today.day
);

const ageInYears = Math.floor(ageInDays / 365.25);
console.log(`Age: ${ageInYears} years`);
```

### Month Navigator

```typescript
import { getNextMonth, getPrevMonth } from 'nepali-dates';

const current = { year: 2080, month: 12 };

const next = getNextMonth(current.year, current.month);
console.log(next); // { year: 2081, month: 1 }

const prev = getPrevMonth(current.year, current.month);
console.log(prev); // { year: 2080, month: 11 }
```

### Date Parser

```typescript
import { parseDate } from 'nepali-dates';

const date1 = parseDate('2080-10-15');
console.log(date1); // { year: 2080, month: 10, day: 15 }

const date2 = parseDate('15/10/2080', 'DD/MM/YYYY');
console.log(date2); // { year: 2080, month: 10, day: 15 }
```

## TypeScript Support

Full TypeScript support with type definitions:

```typescript
import type { DateObject, ConversionOptions } from 'nepali-dates';

const date: DateObject = { year: 2080, month: 10, day: 15 };
const options: ConversionOptions = { format: 'iso' };
```

## Next Steps

- Read the full [API Documentation](docs/API.md)
- Check out [Examples](examples/basic-usage.ts)
- Learn about [Contributing](docs/CONTRIBUTING.md)
- View [Data Sources](docs/DATA_SOURCES.md)

## Need Help?

- [GitHub Issues](https://github.com/sonill/nepali-dates/issues)
- [README](README.md)
- [API Reference](docs/API.md)
