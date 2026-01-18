# Calendar Data Files

This directory contains the core calendar data in JSON format, making it easy to edit and maintain.

## Files

### calendar-data.json

Contains the Nepali calendar data (Bikram Sambat) from BS 2000 to BS 2100 (AD 1943-2043).

**Structure:**
- Each year is a key (e.g., "2000", "2001")
- Each value is an array of 12 numbers representing days in each month
- Months order: [Baisakh, Jestha, Ashar, Shrawan, Bhadra, Ashwin, Kartik, Mangsir, Poush, Magh, Falgun, Chaitra]

**Example:**
```json
{
  "2000": [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  "2001": [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]
}
```

**Validation rules:**
- Each year must have exactly 12 months
- Each month must have between 29 and 32 days
- Total days in a year should be between 354 and 385

### reference-dates.json

Contains verified BS-AD date pairs used for validation and testing.

**Structure:**
- `referenceDates`: Array of date pairs with BS and AD equivalents

**Example:**
```json
{
  "referenceDates": [
    {
      "bs": { "year": 2001, "month": 1, "day": 1 },
      "ad": { "year": 1944, "month": 4, "day": 13 }
    },
    {
      "bs": { "year": 2010, "month": 1, "day": 1 },
      "ad": { "year": 1953, "month": 4, "day": 13 }
    }
  ]
}
```

**Note:** The base reference point (BS 2000-01-01 = AD 1943-04-14) is defined as a constant in the code and should not be included in this file.

## How to Edit

1. Open the JSON file in any text editor
2. Make your changes following the structure above
3. Save the file
4. Run tests to verify your changes:
   ```bash
   npm test
   ```

## Data Sources

The calendar data comes from:
- Nepal Panchanga Nirnayak Samiti (official calendar authority)
- Historical records and verified events
- Cross-referenced with multiple calendar systems

## Contributing

When adding or modifying data:
1. Always verify against official sources
2. Add reference date pairs for significant dates
3. Run the validation script: `npm run validate-data`
4. Run all tests to ensure consistency: `npm test`
5. Document your sources in commit messages

## Notes

- The `$schema` and `description` fields in the JSON files are metadata and are ignored by the application
- Month numbers are 1-indexed (1 = Baisakh, 12 = Chaitra)
- Day numbers are 1-indexed (1 = first day of month)
