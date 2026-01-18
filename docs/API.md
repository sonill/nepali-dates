# API Documentation

Complete API reference for the Nepali Dates package.

## Table of Contents

- [Date Conversion](#date-conversion)
- [Utility Functions](#utility-functions)
- [Formatting Functions](#formatting-functions)
- [Validation Functions](#validation-functions)
- [Data Access](#data-access)
- [Types](#types)
- [Constants](#constants)

## Date Conversion

### `bsToAd(year, month, day, options?)`

Convert Bikram Sambat (BS) date to Anno Domini (AD) date.

**Parameters:**
- `year` (number): BS year (2000-2100)
- `month` (number): BS month (1-12)
- `day` (number): BS day (1-32, depending on month)
- `options?` (ConversionOptions): Optional formatting options

**Returns:** `DateObject | string | DateArray` - Depends on format option

**Examples:**

```typescript
// Object format (default)
bsToAd(2080, 10, 15)
// Returns: { year: 2024, month: 1, day: 27 }

// ISO string format
bsToAd(2080, 10, 15, { format: 'iso' })
// Returns: "2024-01-27"

// Custom string format
bsToAd(2080, 10, 15, { format: 'string', pattern: 'DD/MM/YYYY' })
// Returns: "27/01/2024"

// Array format
bsToAd(2080, 10, 15, { format: 'array' })
// Returns: [2024, 1, 27]
```

**Throws:**
- Error if BS date is invalid

---

### `adToBs(year, month, day, options?)`

Convert Anno Domini (AD) date to Bikram Sambat (BS) date.

**Parameters:**
- `year` (number): AD year
- `month` (number): AD month (1-12)
- `day` (number): AD day (1-31)
- `options?` (ConversionOptions): Optional formatting options

**Returns:** `DateObject | string | DateArray` - Depends on format option

**Examples:**

```typescript
// Object format (default)
adToBs(2024, 1, 27)
// Returns: { year: 2080, month: 10, day: 15 }

// ISO string format
adToBs(2024, 1, 27, { format: 'iso' })
// Returns: "2080-10-15"

// Array format
adToBs(2024, 1, 27, { format: 'array' })
// Returns: [2080, 10, 15]
```

**Throws:**
- Error if AD date is invalid
- Error if date is before minimum supported date

---

## Utility Functions

### `getTotalDaysInMonth(year, month)`

Get the total number of days in a Nepali month.

**Parameters:**
- `year` (number): BS year
- `month` (number): BS month (1-12)

**Returns:** `number` - Days in the month (29-32)

**Example:**

```typescript
getTotalDaysInMonth(2080, 1) // Returns: 31
getTotalDaysInMonth(2080, 2) // Returns: 32
```

**Throws:**
- Error if year data not available
- Error if month is invalid

---

### `getTotalDaysInYear(year)`

Get the total number of days in a Nepali year.

**Parameters:**
- `year` (number): BS year

**Returns:** `number` - Total days in the year (354-385)

**Example:**

```typescript
getTotalDaysInYear(2080) // Returns: 366
getTotalDaysInYear(2081) // Returns: 365
```

**Throws:**
- Error if year data not available

---

### `getNextMonth(year, month)`

Get the next month.

**Parameters:**
- `year` (number): BS year
- `month` (number): BS month (1-12)

**Returns:** `MonthNavigation` - Object with year and month

**Examples:**

```typescript
getNextMonth(2080, 6)
// Returns: { year: 2080, month: 7 }

getNextMonth(2080, 12)
// Returns: { year: 2081, month: 1 }
```

**Throws:**
- Error if month is invalid
- Error if next year data not available

---

### `getPrevMonth(year, month)`

Get the previous month.

**Parameters:**
- `year` (number): BS year
- `month` (number): BS month (1-12)

**Returns:** `MonthNavigation` - Object with year and month

**Examples:**

```typescript
getPrevMonth(2080, 7)
// Returns: { year: 2080, month: 6 }

getPrevMonth(2080, 1)
// Returns: { year: 2079, month: 12 }
```

**Throws:**
- Error if month is invalid
- Error if previous year data not available

---

### `getDaysInRange(fromYear, fromMonth, fromDay, toYear, toMonth, toDay)`

Calculate the number of days between two BS dates.

**Parameters:**
- `fromYear` (number): Starting BS year
- `fromMonth` (number): Starting BS month
- `fromDay` (number): Starting BS day
- `toYear` (number): Ending BS year
- `toMonth` (number): Ending BS month
- `toDay` (number): Ending BS day

**Returns:** `number` - Days between dates (negative if toDate < fromDate)

**Examples:**

```typescript
getDaysInRange(2080, 1, 1, 2080, 1, 31)
// Returns: 30

getDaysInRange(2080, 1, 1, 2081, 1, 1)
// Returns: 366

getDaysInRange(2080, 1, 31, 2080, 1, 1)
// Returns: -30
```

**Throws:**
- Error if years are outside available data range

---

## Formatting Functions

### `formatBsDate(year, month, day, options?)`

Format a BS date to string.

**Parameters:**
- `year` (number): BS year
- `month` (number): BS month
- `day` (number): BS day
- `options?` (FormatOptions): Formatting options

**Returns:** `string` - Formatted date string

**Examples:**

```typescript
formatBsDate(2080, 10, 15)
// Returns: "2080-10-15"

formatBsDate(2080, 10, 15, { pattern: 'DD/MM/YYYY' })
// Returns: "15/10/2080"

formatBsDate(2080, 1, 5, { pattern: 'YYYY-MM-DD' })
// Returns: "2080-01-05"
```

---

### `formatAdDate(year, month, day, options?)`

Format an AD date to string.

**Parameters:**
- `year` (number): AD year
- `month` (number): AD month
- `day` (number): AD day
- `options?` (FormatOptions): Formatting options

**Returns:** `string` - Formatted date string

**Example:**

```typescript
formatAdDate(2024, 1, 27)
// Returns: "2024-01-27"

formatAdDate(2024, 1, 27, { pattern: 'DD-MM-YYYY' })
// Returns: "27-01-2024"
```

---

### `getNepaliMonthName(month, locale?)`

Get Nepali month name.

**Parameters:**
- `month` (number): Month number (1-12)
- `locale?` (Locale): 'en' or 'ne' (default: 'en')

**Returns:** `string` - Month name

**Examples:**

```typescript
getNepaliMonthName(1) // Returns: "Baisakh"
getNepaliMonthName(1, 'ne') // Returns: "बैशाख"
getNepaliMonthName(12) // Returns: "Chaitra"
```

**Throws:**
- Error if month is invalid

---

### `getEnglishMonthName(month)`

Get English month name.

**Parameters:**
- `month` (number): Month number (1-12)

**Returns:** `string` - Month name

**Example:**

```typescript
getEnglishMonthName(1) // Returns: "January"
getEnglishMonthName(12) // Returns: "December"
```

**Throws:**
- Error if month is invalid

---

### `parseDate(dateString, pattern?)`

Parse a date string to DateObject.

**Parameters:**
- `dateString` (string): Date string to parse
- `pattern?` (DatePattern): Expected pattern (default: 'YYYY-MM-DD')

**Returns:** `DateObject` - Parsed date

**Examples:**

```typescript
parseDate('2080-10-15')
// Returns: { year: 2080, month: 10, day: 15 }

parseDate('15/10/2080', 'DD/MM/YYYY')
// Returns: { year: 2080, month: 10, day: 15 }

parseDate('10-15-2080', 'MM-DD-YYYY')
// Returns: { year: 2080, month: 10, day: 15 }
```

**Throws:**
- Error if date string is invalid
- Error if values are non-numeric

---

### `toIsoString(date)`

Convert date object to ISO string.

**Parameters:**
- `date` (DateObject): Date object

**Returns:** `string` - ISO formatted string (YYYY-MM-DD)

**Example:**

```typescript
toIsoString({ year: 2080, month: 10, day: 15 })
// Returns: "2080-10-15"
```

---

### `toArray(date)`

Convert date object to array.

**Parameters:**
- `date` (DateObject): Date object

**Returns:** `[number, number, number]` - [year, month, day]

**Example:**

```typescript
toArray({ year: 2080, month: 10, day: 15 })
// Returns: [2080, 10, 15]
```

---

## Validation Functions

### `isValidBsDate(year, month, day)`

Validate a BS date.

**Parameters:**
- `year` (number): BS year
- `month` (number): BS month
- `day` (number): BS day

**Returns:** `boolean` - true if valid

**Example:**

```typescript
isValidBsDate(2080, 1, 1) // Returns: true
isValidBsDate(2080, 13, 1) // Returns: false
isValidBsDate(2080, 1, 32) // Returns: false
```

---

### `isValidAdDate(year, month, day)`

Validate an AD date.

**Parameters:**
- `year` (number): AD year
- `month` (number): AD month
- `day` (number): AD day

**Returns:** `boolean` - true if valid

**Example:**

```typescript
isValidAdDate(2024, 1, 27) // Returns: true
isValidAdDate(2024, 2, 30) // Returns: false
isValidAdDate(2024, 2, 29) // Returns: true (leap year)
```

---

### `hasDataForYear(year)`

Check if calendar data exists for a year.

**Parameters:**
- `year` (number): BS year

**Returns:** `boolean` - true if data exists

**Example:**

```typescript
hasDataForYear(2080) // Returns: true
hasDataForYear(1999) // Returns: false
```

---

### `isLeapYear(year)`

Check if a year is a leap year (Gregorian calendar).

**Parameters:**
- `year` (number): AD year

**Returns:** `boolean` - true if leap year

**Example:**

```typescript
isLeapYear(2024) // Returns: true
isLeapYear(2023) // Returns: false
```

---

### `getDaysInAdMonth(year, month)`

Get days in an AD month.

**Parameters:**
- `year` (number): AD year
- `month` (number): AD month

**Returns:** `number` - Days in month

**Example:**

```typescript
getDaysInAdMonth(2024, 2) // Returns: 29 (leap year)
getDaysInAdMonth(2023, 2) // Returns: 28
```

---

## Data Access

### `getCalendarData(year)`

Get calendar data for a specific year.

**Parameters:**
- `year` (number): BS year

**Returns:** `number[]` - Array of 12 month lengths

**Example:**

```typescript
getCalendarData(2080)
// Returns: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]
```

**Throws:**
- Error if year data not available

---

### `getDataRange()`

Get the available data range.

**Parameters:** None

**Returns:** `DataRange` - Object with min/max years and total

**Example:**

```typescript
getDataRange()
// Returns: { minYear: 2000, maxYear: 2100, totalYears: 101 }
```

---

### `getAllCalendarData()`

Get all calendar data.

**Parameters:** None

**Returns:** `CalendarData` - Complete calendar data object

**Example:**

```typescript
const allData = getAllCalendarData()
// Returns: { 2000: [...], 2001: [...], ... }
```

---

## Types

### `DateFormat`

```typescript
type DateFormat = 'object' | 'iso' | 'string' | 'array';
```

### `DatePattern`

```typescript
type DatePattern =
  | 'YYYY-MM-DD'
  | 'YYYY/MM/DD'
  | 'DD-MM-YYYY'
  | 'DD/MM/YYYY'
  | 'MM-DD-YYYY'
  | 'MM/DD/YYYY';
```

### `Locale`

```typescript
type Locale = 'en' | 'ne';
```

### `DateObject`

```typescript
interface DateObject {
  year: number;
  month: number;
  day: number;
}
```

### `DateArray`

```typescript
type DateArray = [number, number, number];
```

### `ConversionOptions`

```typescript
interface ConversionOptions {
  format?: DateFormat;
  pattern?: DatePattern;
}
```

### `FormatOptions`

```typescript
interface FormatOptions {
  pattern?: DatePattern;
  locale?: Locale;
}
```

### `MonthNavigation`

```typescript
interface MonthNavigation {
  year: number;
  month: number;
}
```

### `DataRange`

```typescript
interface DataRange {
  minYear: number;
  maxYear: number;
  totalYears: number;
}
```

---

## Constants

### `MIN_YEAR`

Minimum supported BS year: `2000`

### `MAX_YEAR`

Maximum supported BS year: `2100`

### `NEPALI_MONTH_NAMES_EN`

English names for Nepali months:

```typescript
{
  1: 'Baisakh',
  2: 'Jestha',
  3: 'Ashar',
  4: 'Shrawan',
  5: 'Bhadra',
  6: 'Ashwin',
  7: 'Kartik',
  8: 'Mangsir',
  9: 'Poush',
  10: 'Magh',
  11: 'Falgun',
  12: 'Chaitra'
}
```

### `NEPALI_MONTH_NAMES_NE`

Nepali names for Nepali months (Unicode).

### `ENGLISH_MONTH_NAMES`

Standard English month names (January-December).

---

For more examples and use cases, see the [README](../README.md).
