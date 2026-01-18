# MCP Server - AI Agent Integration

The Nepali Dates package includes a built-in MCP (Model Context Protocol) server that allows AI agents like Claude Code, Claude Desktop, and other MCP-compatible tools to work with Nepali calendar dates.

## Quick Setup

### Installation

```bash
npm install -g @sonill/nepali-dates
```

Or use with npx (no installation needed):

```bash
npx @sonill/nepali-dates nepali-dates-mcp
```

### Configuration for Claude Code

Add to your `~/.claude/config.json` file:

**Using npx (recommended):**
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

**Using global installation:**
```json
{
  "mcpServers": {
    "nepali-dates": {
      "command": "nepali-dates-mcp"
    }
  }
}
```

### Configuration for Claude Desktop

**macOS:**
`~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows:**
`%APPDATA%\Claude\claude_desktop_config.json`

**Linux:**
`~/.config/Claude/claude_desktop_config.json`

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

## Available Tools

The MCP server provides 9 tools that AI agents can use:

### 1. convert_bs_to_ad

Convert Nepali (Bikram Sambat) date to English (Anno Domini) date.

**Parameters:**
- `year` (number): BS year (2000-2100)
- `month` (number): BS month (1-12)
- `day` (number): BS day
- `format` (optional): "object", "iso", or "string"

**Example:**
```
User: "Convert BS 2081/01/15 to English date"
Agent uses: convert_bs_to_ad with year=2081, month=1, day=15
Result: April 27, 2024
```

### 2. convert_ad_to_bs

Convert English (Anno Domini) date to Nepali (Bikram Sambat) date.

**Parameters:**
- `year` (number): AD year (1943-2043)
- `month` (number): AD month (1-12)
- `day` (number): AD day
- `format` (optional): "object", "iso", or "string"

**Example:**
```
User: "What is January 15, 2024 in Nepali calendar?"
Agent uses: convert_ad_to_bs with year=2024, month=1, day=15
Result: Magh 2, 2080
```

### 3. get_month_calendar

Generate a complete calendar for a Nepali month with grid layout.

**Parameters:**
- `year` (number): BS year (2000-2100)
- `month` (number): BS month (1-12)
- `locale` (optional): "en" or "ne"

**Returns:**
- Month name
- Total days
- Starting weekday
- Calendar grid (weeks array)

**Example:**
```
User: "Show me the calendar for Baisakh 2081"
Agent uses: get_month_calendar with year=2081, month=1
Result: Calendar grid with 31 days starting on Tuesday
```

### 4. validate_bs_date

Validate if a Nepali date is valid.

**Parameters:**
- `year` (number): BS year
- `month` (number): BS month (1-12)
- `day` (number): BS day

**Example:**
```
User: "Is BS 2081/13/01 a valid date?"
Agent uses: validate_bs_date
Result: Invalid - month must be between 1 and 12
```

### 5. validate_ad_date

Validate if an English date is valid.

**Parameters:**
- `year` (number): AD year
- `month` (number): AD month (1-12)
- `day` (number): AD day

### 6. get_nepali_month_name

Get the name of a Nepali month in English or Nepali script.

**Parameters:**
- `month` (number): Month number (1-12)
- `locale` (optional): "en" or "ne"

**Example:**
```
User: "What is the 5th month in Nepali calendar?"
Agent uses: get_nepali_month_name with month=5
Result: Bhadra (or भाद्र in Nepali)
```

### 7. navigate_month

Navigate to the next or previous month.

**Parameters:**
- `year` (number): Current BS year
- `month` (number): Current BS month (1-12)
- `direction` (string): "next" or "prev"

**Example:**
```
User: "What month comes after Chaitra 2080?"
Agent uses: navigate_month with direction="next"
Result: Baisakh 2081
```

### 8. get_year_calendar

Get calendar data for an entire Nepali year.

**Parameters:**
- `year` (number): BS year (2000-2100)

**Returns:**
- Array of days in each month
- Total days in the year
- Month names

### 9. get_current_nepali_date

Get today's date in Nepali calendar.

**Parameters:**
- `format` (optional): "object", "iso", or "string"

**Example:**
```
User: "What's today's date in Nepali calendar?"
Agent uses: get_current_nepali_date
Result: Current BS date
```

## Example Conversations

### Date Conversion

**User:** "When is my birthday (January 15) in Nepali calendar?"

**Agent:** Uses `convert_ad_to_bs` to convert and responds with the Nepali date.

### Calendar Planning

**User:** "I need to plan events for Baisakh 2081. Show me the calendar."

**Agent:** Uses `get_month_calendar` to generate the full month calendar with proper grid layout.

### Date Validation

**User:** "Is Falgun 31, 2081 a valid date?"

**Agent:** Uses `validate_bs_date` and reports whether the date exists.

### Month Information

**User:** "What are all the Nepali month names in Devanagari?"

**Agent:** Uses `get_nepali_month_name` for each month with locale="ne".

## Troubleshooting

### Server Not Starting

1. Check Node.js version: `node --version` (need 18+)
2. Test manually: `npx @sonill/nepali-dates nepali-dates-mcp`
3. Check config file path is correct

### Tools Not Appearing

1. Restart your AI client completely
2. Verify JSON syntax in config file
3. Check the command path

### Testing the Server

You can test the MCP server using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector npx @sonill/nepali-dates nepali-dates-mcp
```

This opens a web interface where you can test all 9 tools interactively.

## Data Coverage

- **BS Years:** 2000 - 2100 (101 years)
- **AD Years:** 1943 - 2043 (101 years)
- **Accuracy:** Based on verified official Nepali calendar data

## Performance

- **Latency:** < 5ms per request
- **Memory:** ~20-30MB
- **No Network:** All computation is local

## Support

- [GitHub Issues](https://github.com/sonill/nepali-dates/issues)
- [Main Documentation](https://sonill.github.io/nepali-dates)
- [MCP Protocol](https://modelcontextprotocol.io)

---

**Made with ❤️ for the AI agent ecosystem**
