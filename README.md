# Nepali Dates

[![npm version](https://img.shields.io/npm/v/nepali-dates.svg)](https://www.npmjs.com/package/@sonill/nepali-dates)
[![Tests](https://github.com/sonill/nepali-dates/actions/workflows/test.yml/badge.svg)](https://github.com/sonill/nepali-dates/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

Community-driven, accurate Nepali calendar (Bikram Sambat) data and conversion utilities. A trustable source for Nepali date calculations with zero dependencies.

Use this package instead of maintaining your own source of datas.

## Website

View website  [here](https://sonill.github.io/nepali-dates/)

## Features

- **Accurate Data**: 101 years (BS 2000-2100) of verified Nepali calendar data
- **Zero Dependencies**: Lightweight and reliable
- **Type-Safe**: Full TypeScript support with type definitions
- **Multiple Formats**: Support for object, ISO, string, and array formats
- **Well-Tested**: >95% test coverage with extensive validation
- **Community-Driven**: Open data sources and transparent validation

## Installation

```bash
npm install nepali-dates
```

```bash
yarn add nepali-dates
```

```bash
pnpm add nepali-dates
```

## Quick Start

```typescript
import { bsToAd, adToBs, getTotalDaysInMonth } from 'nepali-dates';

// Convert Nepali date to English date
const englishDate = bsToAd(2080, 10, 15);
console.log(englishDate); // { year: 2024, month: 1, day: 27 }

// Convert English date to Nepali date
const nepaliDate = adToBs(2024, 1, 27);
console.log(nepaliDate); // { year: 2080, month: 10, day: 15 }

// Get days in a Nepali month
const days = getTotalDaysInMonth(2080, 1);
console.log(days); // 31
```

## API Reference

### Date Conversion

#### `bsToAd(year, month, day, options?)`

Convert Bikram Sambat (BS) date to Anno Domini (AD) date.

```typescript
// Default: returns object
bsToAd(2080, 10, 15);
// { year: 2024, month: 1, day: 27 }

// ISO format
bsToAd(2080, 10, 15, { format: 'iso' });
// "2024-01-27"

// Custom string format
bsToAd(2080, 10, 15, { format: 'string', pattern: 'DD/MM/YYYY' });
// "27/01/2024"

// Array format
bsToAd(2080, 10, 15, { format: 'array' });
// [2024, 1, 27]
```

#### `adToBs(year, month, day, options?)`

Convert Anno Domini (AD) date to Bikram Sambat (BS) date.

```typescript
// Default: returns object
adToBs(2024, 1, 27);
// { year: 2080, month: 10, day: 15 }

// ISO format
adToBs(2024, 1, 27, { format: 'iso' });
// "2080-10-15"

// Array format
adToBs(2024, 1, 27, { format: 'array' });
// [2080, 10, 15]
```

### Utility Functions

#### `getTotalDaysInMonth(year, month)`

Get the total number of days in a Nepali month.

```typescript
getTotalDaysInMonth(2080, 1); // 31
getTotalDaysInMonth(2080, 2); // 32
```

#### `getTotalDaysInYear(year)`

Get the total number of days in a Nepali year.

```typescript
getTotalDaysInYear(2080); // 366
getTotalDaysInYear(2081); // 365
```

#### `getNextMonth(year, month)`

Get the next month.

```typescript
getNextMonth(2080, 6); // { year: 2080, month: 7 }
getNextMonth(2080, 12); // { year: 2081, month: 1 }
```

#### `getPrevMonth(year, month)`

Get the previous month.

```typescript
getPrevMonth(2080, 7); // { year: 2080, month: 6 }
getPrevMonth(2080, 1); // { year: 2079, month: 12 }
```

#### `getDaysInRange(fromYear, fromMonth, fromDay, toYear, toMonth, toDay)`

Calculate the number of days between two BS dates.

```typescript
getDaysInRange(2080, 1, 1, 2080, 1, 31); // 30
getDaysInRange(2080, 1, 1, 2081, 1, 1); // 366
```

### Formatting Functions

#### `formatBsDate(year, month, day, options?)`

Format a BS date to string.

```typescript
formatBsDate(2080, 10, 15); // "2080-10-15"
formatBsDate(2080, 10, 15, { pattern: 'DD/MM/YYYY' }); // "15/10/2080"
```

#### `getNepaliMonthName(month, locale?)`

Get Nepali month name.

```typescript
getNepaliMonthName(1); // "Baisakh"
getNepaliMonthName(1, 'ne'); // "बैशाख"
getNepaliMonthName(2); // "Jestha"
```

#### `parseDate(dateString, pattern?)`

Parse a date string to DateObject.

```typescript
parseDate('2080-10-15'); // { year: 2080, month: 10, day: 15 }
parseDate('15/10/2080', 'DD/MM/YYYY'); // { year: 2080, month: 10, day: 15 }
```

### Validation Functions

#### `isValidBsDate(year, month, day)`

Validate a BS date.

```typescript
isValidBsDate(2080, 1, 1); // true
isValidBsDate(2080, 13, 1); // false
isValidBsDate(2080, 1, 32); // false
```

#### `isValidAdDate(year, month, day)`

Validate an AD date.

```typescript
isValidAdDate(2024, 1, 27); // true
isValidAdDate(2024, 2, 30); // false
```

#### `hasDataForYear(year)`

Check if calendar data exists for a year.

```typescript
hasDataForYear(2080); // true
hasDataForYear(1999); // false
```

### Data Access

#### `getCalendarData(year)`

Get calendar data for a specific year.

```typescript
getCalendarData(2080);
// [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]
```

#### `getDataRange()`

Get the available data range.

```typescript
getDataRange();
// { minYear: 2000, maxYear: 2100, totalYears: 101 }
```

## Types

```typescript
type DateFormat = 'object' | 'iso' | 'string' | 'array';
type DatePattern = 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'DD-MM-YYYY' | 'DD/MM/YYYY' | 'MM-DD-YYYY' | 'MM/DD/YYYY';
type Locale = 'en' | 'ne';

interface DateObject {
  year: number;
  month: number;
  day: number;
}

interface ConversionOptions {
  format?: DateFormat;
  pattern?: DatePattern;
}
```

## Data Range

- **BS Years**: 2000 - 2100
- **AD Years**: 1943 - 2043
- **Total Years**: 101 years of data

## Using Calendar Data in Other Languages

The calendar data is available as JSON files in the [data/](data/) directory, making it accessible from any programming language. This is particularly useful if you want to use the Nepali calendar data without the JavaScript conversion utilities.

### Direct JSON Access

You can access the raw calendar data from:

- **Calendar Data**: [data/calendar-data.json](data/calendar-data.json)
- **Reference Dates**: [data/reference-dates.json](data/reference-dates.json)

### Examples in Other Languages

**Python:**

```python
import json
import urllib.request

# Load calendar data from GitHub or your local installation
with open('data/calendar-data.json') as f:
    calendar_data = json.load(f)

# Get days in each month for BS 2080
year_2080 = calendar_data['2080']
print(year_2080)  # [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]
```

**PHP:**

```php
<?php
$calendarData = json_decode(file_get_contents('data/calendar-data.json'), true);
$year2080 = $calendarData['2080'];
print_r($year2080);
?>
```

**Ruby:**

```ruby
require 'json'

calendar_data = JSON.parse(File.read('data/calendar-data.json'))
year_2080 = calendar_data['2080']
puts year_2080
```

**Go:**

```go
package main

import (
    "encoding/json"
    "os"
)

type CalendarData map[string][]int

func main() {
    file, _ := os.Open("data/calendar-data.json")
    defer file.Close()

    var data CalendarData
    json.NewDecoder(file).Decode(&data)

    year2080 := data["2080"]
    println(year2080)
}
```

### Data Format

The JSON files are structured for easy parsing:

- Each year is a string key (e.g., "2080")
- Each value is an array of 12 integers representing days in each month
- Months follow the order: [Baisakh, Jestha, Ashar, Shrawan, Bhadra, Ashwin, Kartik, Mangsir, Poush, Magh, Falgun, Chaitra]
- Base reference: BS 2000-01-01 = AD 1943-04-14

See [data/README.md](data/README.md) for detailed documentation on the data structure and how to contribute updates.

## Data Sources

The calendar data has been compiled and verified from:
- Nepal Panchanga Nirnayak Samiti (official source)
- Historical records and government publications
- Cross-referenced with multiple existing implementations
- Community contributions and verification

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

### Adding New Year Data

When adding new year data, please:
1. Provide at least 2 verified sources
2. Follow the contribution template
3. Include test cases
4. Update reference dates if applicable

## Browser Support

Works in all modern browsers and Node.js 16+.

## Bundle Size

< 10KB minified (zero dependencies)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

Thanks to all contributors and the Nepali developer community for maintaining accurate calendar data.

## Links

- [GitHub Repository](https://github.com/yourusername/nepali-dates)
- [Issue Tracker](https://github.com/yourusername/nepali-dates/issues)
- [NPM Package](https://www.npmjs.com/package/nepali-dates)

---

Made with ❤️ by the Nepali developer community
