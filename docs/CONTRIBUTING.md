# Contributing to Nepali Dates

Thank you for your interest in contributing! The most valuable contribution is **updating the calendar data** - no coding required.

---

## For Non-Developers

**Your main job: Update the source data files.**

The calendar data is stored in simple JSON files that anyone can edit. You don't need to know JavaScript or programming.

### How to Update Calendar Data

1. **Fork this repository** on GitHub (click the "Fork" button)

2. **Edit the data file** directly on GitHub:
   - Go to [`data/calendar-data.json`](../data/calendar-data.json)
   - Click the pencil icon to edit
   - Add or modify year data

3. **Data format** - Each year has 12 numbers (days in each month):
   ```json
   "2101": [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]
   ```
   Months are: Baisakh, Jestha, Ashar, Shrawan, Bhadra, Ashwin, Kartik, Mangsir, Poush, Magh, Falgun, Chaitra

4. **Submit a Pull Request** with:
   - Your source (where you got the data)
   - At least 2 verified sources for new year data

### What Data Can You Contribute?

- **New year data** (e.g., BS 2101 and beyond)
- **Corrections** to existing data (with proof from official sources)
- **Reference dates** in [`data/reference-dates.json`](../data/reference-dates.json)

### Trusted Sources

- Nepal Panchanga Nirnayak Samiti (official)
- Nepal Government publications
- Historical records and newspapers

### Quick Validation

Before submitting, check:
- [ ] Each month has 29-32 days
- [ ] Year has exactly 12 months
- [ ] Total days in year is between 354-385

That's it! You've contributed to the Nepali developer community.

---

## For Developers

This section covers code contributions, development setup, and technical guidelines.

### Development Setup

**Prerequisites:** Node.js 16+

```bash
# Clone your fork
git clone https://github.com/your-username/nepali-dates.git
cd nepali-dates

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

### Project Structure

```
nepali-dates/
├── data/               # Calendar data JSON files (edit these!)
├── src/
│   ├── converters/     # BS/AD conversion logic
│   ├── utils/          # Helper functions
│   ├── types/          # TypeScript types
│   └── index.ts        # Main entry point
├── tests/              # Test files
└── docs/               # Documentation
```

### Code Style

- TypeScript strict mode
- Follow existing patterns
- JSDoc comments for public APIs
- Minimum 95% test coverage

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Pull Request Process

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Make changes and add tests
3. Run `npm test` to ensure all tests pass
4. Submit PR with clear description

### Reporting Issues

**Bug reports** - Include: description, steps to reproduce, expected vs actual behavior, version info

**Data errors** - Include: the incorrect date, correct value, 2+ sources as proof

**Feature requests** - Include: use case, proposed API, willingness to implement

---

## Code of Conduct

Be respectful, inclusive, and considerate. We're building this for the community.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make Nepali Dates better!
