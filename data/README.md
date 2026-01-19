# Calendar Data

This directory contains the Nepali calendar data in JSON format.

## Files

### calendar-data.json

Nepali calendar data from BS 2000 to BS 2100 (101 years).

**Structure:**

```json
{
  "2080": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]
}
```

- Each key is a BS year
- Each value is an array of 12 numbers (days in each month)
- Month order: Baisakh, Jestha, Ashar, Shrawan, Bhadra, Ashwin, Kartik, Mangsir, Poush, Magh, Falgun, Chaitra

### reference-dates.json

Verified BS-AD date pairs used for validation and testing.

```json
{
  "referenceDates": [
    {
      "bs": { "year": 2001, "month": 1, "day": 1 },
      "ad": { "year": 1944, "month": 4, "day": 13 }
    }
  ]
}
```

## Data Range

- **BS Years:** 2000 - 2100
- **AD Years:** 1943 - 2043
- **Base Reference:** BS 2000-01-01 = AD 1943-04-14

## Validation Rules

- Each year must have exactly 12 months
- Each month must have 29-32 days
- Total days in a year: 354-385

## Data Sources

The calendar data has been compiled and verified from:

- Nepal Panchanga Nirnayak Samiti (official calendar authority)
- Nepal Government publications
- Historical records and verified events
- Cross-referenced with multiple calendar systems

## Contributing Data

See [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for how to add or update calendar data.
