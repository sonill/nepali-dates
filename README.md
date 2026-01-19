# Nepali Dates

[![npm version](https://img.shields.io/npm/v/@sonill/nepali-dates.svg)](https://www.npmjs.com/package/@sonill/nepali-dates)
[![Tests](https://github.com/sonill/nepali-dates/actions/workflows/test.yml/badge.svg)](https://github.com/sonill/nepali-dates/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

![nepali dates](https://repository-images.githubusercontent.com/1136702942/c66c6f7c-262c-44cd-888b-336448d2ede2)

Community-driven, accurate Nepali calendar (Bikram Sambat) data and conversion utilities. A trustable source for Nepali date calculations with zero dependencies.

The ultimate Nepali date conversion library for developers. Convert between Bikram Sambat (BS) and Gregorian dates with 100% accurate, community-maintained calendar data. Perfect for Nepali calendar apps, date converters, and plugins. No dependencies, fully typed, and production-ready.

### Why Use This Package?

Stop maintaining your own Nepali calendar data. This package eliminates the burden of:
- Manually updating calendar data year after year
- Debugging date conversion edge cases
- Verifying data accuracy across multiple sources

**Using JavaScript?** Use the full library with type safety and conversion utilities.
**Using another language?** Access the calendar data directly via `calendar-data.json` in the [data/](data/) directory. Examples available for Python, PHP, Ruby, Go, and more.

The community maintains the data—you focus on building great features.

## Website

View website  [here](https://sonill.github.io/nepali-dates/)

## Features

- **Accurate Data**: 101 years (BS 2000-2100) of verified Nepali calendar data
- **Zero Dependencies**: Lightweight and reliable
- **Type-Safe**: Full TypeScript support with type definitions
- **Multiple Formats**: Support for object, ISO, string, and array formats
- **Well-Tested**: >95% test coverage with extensive validation
- **Community-Driven**: Open data sources and transparent validation
- **AI Agent Ready**: MCP server available for Claude Code and other AI tools

## Installation

```bash
npm install @sonill/nepali-dates
```

## Quick Start

```typescript
import { bsToAd, adToBs, getTotalDaysInMonth } from '@sonill/nepali-dates';

// Nepali to English
bsToAd(2080, 10, 15);  // { year: 2024, month: 1, day: 27 }

// English to Nepali
adToBs(2024, 1, 27);   // { year: 2080, month: 10, day: 15 }

// Days in month
getTotalDaysInMonth(2080, 1);  // 31
```

For complete API documentation, see [docs/API.md](docs/API.md).

## MCP Server for AI Agents

This package includes a built-in MCP server for Claude Code, Claude Desktop, and other AI tools.

Add to `~/.claude/config.json`:

```json
{
  "mcpServers": {
    "nepali-dates": {
      "command": "npx",
      "args": ["-y", "@sonill/nepali-dates", "nepali-dates-mcp"]
    }
  }
}
```

For detailed setup and available tools, see [docs/MCP.md](docs/MCP.md).

## Using Data in Other Languages

The calendar data is available as JSON in the [data/](data/) directory for use with any programming language.

**Python:**

```python
import json

with open('data/calendar-data.json') as f:
    calendar_data = json.load(f)

year_2080 = calendar_data['2080']  # [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]
```

**PHP:**

```php
$calendarData = json_decode(file_get_contents('data/calendar-data.json'), true);
$year2080 = $calendarData['2080'];
```

**Ruby:**

```ruby
require 'json'
calendar_data = JSON.parse(File.read('data/calendar-data.json'))
year_2080 = calendar_data['2080']
```

**Go:**

```go
type CalendarData map[string][]int

file, _ := os.Open("data/calendar-data.json")
var data CalendarData
json.NewDecoder(file).Decode(&data)
year2080 := data["2080"]
```

See [data/README.md](data/README.md) for data format details.

## Documentation

- [API Reference](docs/API.md) - Complete function documentation
- [MCP Server](docs/MCP.md) - AI agent integration
- [Contributing](docs/CONTRIBUTING.md) - How to contribute
- [Data Format](data/README.md) - Calendar data structure

## Contributing

The most valuable contribution is **updating the calendar data** - no coding required. See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details.

## Links

- [Website](https://sonill.github.io/nepali-dates/)
- [GitHub](https://github.com/sonill/nepali-dates)
- [npm](https://www.npmjs.com/package/@sonill/nepali-dates)
- [Issues](https://github.com/sonill/nepali-dates/issues)

## License

MIT License - see [LICENSE](LICENSE) file.
