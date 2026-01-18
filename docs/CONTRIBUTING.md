# Contributing to Nepali Dates

Thank you for your interest in contributing to Nepali Dates! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Contributing Calendar Data](#contributing-calendar-data)
- [Contributing Code](#contributing-code)
- [Reporting Issues](#reporting-issues)
- [Development Setup](#development-setup)

## Code of Conduct

Be respectful, inclusive, and considerate. We're building this for the community.

## How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature`)
7. Open a Pull Request

## Contributing Calendar Data

Calendar data is the most critical part of this package. When contributing new year data:

### Requirements

1. **Two Independent Sources**: Provide at least 2 verified sources for the data
2. **Source Documentation**: Document your sources in `DATA_SOURCES.md`
3. **Verification**: Cross-reference with existing reliable implementations
4. **Test Cases**: Add reference dates for the new year

### Data Format

Add data to `src/data/calendar-data.ts`:

```typescript
export const NEPALI_CALENDAR_DATA: CalendarData = {
  // ... existing data
  2101: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // Your new data
};
```

### Verification Checklist

- [ ] Data is from 2+ verified sources
- [ ] Each month has 29-32 days
- [ ] Total year days is between 354-385
- [ ] Added to `DATA_SOURCES.md` with source links
- [ ] Added reference dates to `src/data/reference-dates.ts`
- [ ] All tests pass (`npm test`)

### Sources to Use

**Recommended Sources:**
- Nepal Panchanga Nirnayak Samiti (official)
- Nepal Government publications
- Verified existing libraries with proven track records
- Historical records and newspapers

**Avoid:**
- Unverified online calendars
- Single-source data
- Data without clear provenance

## Contributing Code

### Code Style

- Use TypeScript strict mode
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Write tests for new features

### Testing Requirements

- Unit tests for all new functions
- Integration tests for conversions
- Minimum 95% code coverage
- All existing tests must pass

### Pull Request Process

1. Update documentation for API changes
2. Add tests for new functionality
3. Ensure all tests pass locally
4. Update README if needed
5. Link related issues in PR description

## Reporting Issues

### Bug Reports

Include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Version information
- Sample code

### Feature Requests

Include:
- Clear description of the feature
- Use cases and benefits
- Proposed API (if applicable)
- Willingness to implement

### Data Errors

For incorrect calendar data:
- Specify the date (BS and/or AD)
- Provide correct value
- Include 2+ sources for correction
- Explain the impact

## Development Setup

### Prerequisites

- Node.js 16 or higher
- npm, yarn, or pnpm

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/your-username/nepali-dates.git
cd nepali-dates

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the package
npm run build

# Lint TypeScript
npm run lint
```

### Project Structure

```
nepali-dates/
├── src/
│   ├── data/           # Calendar data and reference dates
│   ├── converters/     # BS/AD conversion logic
│   ├── utils/          # Helper functions
│   ├── types/          # TypeScript types
│   └── index.ts        # Main entry point
├── tests/              # Test files
├── docs/               # Documentation
└── scripts/            # Utility scripts
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Validation Script

Validate calendar data integrity:

```bash
npm run validate-data
```

## Community Guidelines

### Communication

- Be clear and concise
- Provide context and examples
- Be patient and respectful
- Help others learn

### Quality Standards

- Write clear, maintainable code
- Document complex logic
- Test edge cases
- Consider performance

### Review Process

- All PRs require review
- Address review feedback
- Keep PRs focused and small
- Update based on suggestions

## Recognition

Contributors will be acknowledged in:
- README.md acknowledgments section
- Release notes for significant contributions
- GitHub contributors page

## Questions?

- Open an issue for questions
- Check existing issues and PRs first
- Provide context when asking

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make Nepali Dates better!
