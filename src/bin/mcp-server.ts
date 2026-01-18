#!/usr/bin/env node

/**
 * Nepali Dates MCP Server
 *
 * This MCP server provides AI agents with tools to work with Nepali (Bikram Sambat) calendar dates.
 * It exposes conversion, validation, calendar generation, and localization capabilities.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

import {
  bsToAd,
  adToBs,
  getTotalDaysInMonth,
  getNextMonth,
  getPrevMonth,
  getNepaliMonthName,
  getEnglishMonthName,
  isValidBsDate,
  isValidAdDate,
  getCalendarData,
  formatBsDate,
  parseDate,
  NEPALI_MONTH_NAMES_EN,
  NEPALI_MONTH_NAMES_NE,
} from '../index.js';

// Define available tools
const TOOLS: Tool[] = [
  {
    name: 'convert_bs_to_ad',
    description: 'Convert a Nepali (Bikram Sambat/BS) date to English (Anno Domini/AD) date. Supports dates from BS 2000-2100.',
    inputSchema: {
      type: 'object',
      properties: {
        year: {
          type: 'number',
          description: 'BS year (2000-2100)',
          minimum: 2000,
          maximum: 2100,
        },
        month: {
          type: 'number',
          description: 'BS month (1-12, where 1=Baisakh, 2=Jestha, etc.)',
          minimum: 1,
          maximum: 12,
        },
        day: {
          type: 'number',
          description: 'BS day (1-32, depending on month)',
          minimum: 1,
          maximum: 32,
        },
        format: {
          type: 'string',
          description: 'Output format: "object" (default), "iso" (YYYY-MM-DD), or "string"',
          enum: ['object', 'iso', 'string'],
        },
      },
      required: ['year', 'month', 'day'],
    },
  },
  {
    name: 'convert_ad_to_bs',
    description: 'Convert an English (Anno Domini/AD) date to Nepali (Bikram Sambat/BS) date. Supports dates from AD 1943-2043.',
    inputSchema: {
      type: 'object',
      properties: {
        year: {
          type: 'number',
          description: 'AD year (1943-2043)',
          minimum: 1943,
          maximum: 2043,
        },
        month: {
          type: 'number',
          description: 'AD month (1-12, where 1=January, 2=February, etc.)',
          minimum: 1,
          maximum: 12,
        },
        day: {
          type: 'number',
          description: 'AD day (1-31, depending on month)',
          minimum: 1,
          maximum: 31,
        },
        format: {
          type: 'string',
          description: 'Output format: "object" (default), "iso" (YYYY-MM-DD), or "string"',
          enum: ['object', 'iso', 'string'],
        },
      },
      required: ['year', 'month', 'day'],
    },
  },
  {
    name: 'get_month_calendar',
    description: 'Get complete calendar information for a specific Nepali month. Returns the number of days in the month, month name, and a grid structure suitable for rendering a calendar.',
    inputSchema: {
      type: 'object',
      properties: {
        year: {
          type: 'number',
          description: 'BS year (2000-2100)',
          minimum: 2000,
          maximum: 2100,
        },
        month: {
          type: 'number',
          description: 'BS month (1-12)',
          minimum: 1,
          maximum: 12,
        },
        locale: {
          type: 'string',
          description: 'Locale for month name: "en" (English) or "ne" (Nepali)',
          enum: ['en', 'ne'],
          default: 'en',
        },
      },
      required: ['year', 'month'],
    },
  },
  {
    name: 'validate_bs_date',
    description: 'Validate if a Nepali (BS) date is valid. Checks if the year has data available and if the day is within the valid range for that month.',
    inputSchema: {
      type: 'object',
      properties: {
        year: {
          type: 'number',
          description: 'BS year to validate',
        },
        month: {
          type: 'number',
          description: 'BS month (1-12)',
          minimum: 1,
          maximum: 12,
        },
        day: {
          type: 'number',
          description: 'BS day to validate',
          minimum: 1,
        },
      },
      required: ['year', 'month', 'day'],
    },
  },
  {
    name: 'validate_ad_date',
    description: 'Validate if an English (AD) date is valid.',
    inputSchema: {
      type: 'object',
      properties: {
        year: {
          type: 'number',
          description: 'AD year to validate',
        },
        month: {
          type: 'number',
          description: 'AD month (1-12)',
          minimum: 1,
          maximum: 12,
        },
        day: {
          type: 'number',
          description: 'AD day to validate',
          minimum: 1,
        },
      },
      required: ['year', 'month', 'day'],
    },
  },
  {
    name: 'get_nepali_month_name',
    description: 'Get the name of a Nepali month in English or Nepali script.',
    inputSchema: {
      type: 'object',
      properties: {
        month: {
          type: 'number',
          description: 'Month number (1-12, where 1=Baisakh/बैशाख)',
          minimum: 1,
          maximum: 12,
        },
        locale: {
          type: 'string',
          description: 'Locale: "en" for English (Baisakh) or "ne" for Nepali (बैशाख)',
          enum: ['en', 'ne'],
          default: 'en',
        },
      },
      required: ['month'],
    },
  },
  {
    name: 'navigate_month',
    description: 'Navigate to the next or previous month from a given Nepali date. Useful for building calendar navigation.',
    inputSchema: {
      type: 'object',
      properties: {
        year: {
          type: 'number',
          description: 'Current BS year',
          minimum: 2000,
          maximum: 2100,
        },
        month: {
          type: 'number',
          description: 'Current BS month (1-12)',
          minimum: 1,
          maximum: 12,
        },
        direction: {
          type: 'string',
          description: 'Navigation direction: "next" or "prev"',
          enum: ['next', 'prev'],
        },
      },
      required: ['year', 'month', 'direction'],
    },
  },
  {
    name: 'get_year_calendar',
    description: 'Get calendar data for an entire Nepali year. Returns an array of 12 numbers representing days in each month.',
    inputSchema: {
      type: 'object',
      properties: {
        year: {
          type: 'number',
          description: 'BS year (2000-2100)',
          minimum: 2000,
          maximum: 2100,
        },
      },
      required: ['year'],
    },
  },
  {
    name: 'get_current_nepali_date',
    description: 'Get the current date in Nepali (BS) calendar by converting today\'s date.',
    inputSchema: {
      type: 'object',
      properties: {
        format: {
          type: 'string',
          description: 'Output format: "object" (default), "iso", or "string"',
          enum: ['object', 'iso', 'string'],
        },
      },
    },
  },
];

// Create server instance
const server = new Server(
  {
    name: 'nepali-dates-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'convert_bs_to_ad': {
        const { year, month, day, format = 'object' } = args as {
          year: number;
          month: number;
          day: number;
          format?: 'object' | 'iso' | 'string';
        };

        const result = bsToAd(year, month, day, { format });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                input: { year, month, day, calendar: 'BS' },
                output: result,
                calendar: 'AD',
              }, null, 2),
            },
          ],
        };
      }

      case 'convert_ad_to_bs': {
        const { year, month, day, format = 'object' } = args as {
          year: number;
          month: number;
          day: number;
          format?: 'object' | 'iso' | 'string';
        };

        const result = adToBs(year, month, day, { format });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                input: { year, month, day, calendar: 'AD' },
                output: result,
                calendar: 'BS',
              }, null, 2),
            },
          ],
        };
      }

      case 'get_month_calendar': {
        const { year, month, locale = 'en' } = args as {
          year: number;
          month: number;
          locale?: 'en' | 'ne';
        };

        const totalDays = getTotalDaysInMonth(year, month);
        const monthName = getNepaliMonthName(month, locale);

        // Get the AD date for the first day of this BS month to determine starting weekday
        const firstDayAd = bsToAd(year, month, 1, { format: 'object' }) as { year: number; month: number; day: number };
        const firstDayDate = new Date(
          firstDayAd.year,
          firstDayAd.month - 1,
          firstDayAd.day
        );
        const startingWeekday = firstDayDate.getDay(); // 0 = Sunday, 6 = Saturday

        // Create calendar grid (weeks array)
        const weeks: (number | null)[][] = [];
        let currentWeek: (number | null)[] = new Array(7).fill(null);

        // Fill starting nulls
        for (let i = 0; i < startingWeekday; i++) {
          currentWeek[i] = null;
        }

        // Fill days
        for (let day = 1; day <= totalDays; day++) {
          const dayIndex = (startingWeekday + day - 1) % 7;
          currentWeek[dayIndex] = day;

          if (dayIndex === 6 || day === totalDays) {
            weeks.push([...currentWeek]);
            currentWeek = new Array(7).fill(null);
          }
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                year,
                month,
                monthName,
                locale,
                totalDays,
                startingWeekday,
                weeks,
                weekdayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              }, null, 2),
            },
          ],
        };
      }

      case 'validate_bs_date': {
        const { year, month, day } = args as {
          year: number;
          month: number;
          day: number;
        };

        const isValid = isValidBsDate(year, month, day);
        let reason = '';

        if (!isValid) {
          if (month < 1 || month > 12) {
            reason = 'Month must be between 1 and 12';
          } else {
            try {
              const maxDays = getTotalDaysInMonth(year, month);
              if (day < 1 || day > maxDays) {
                reason = `Day must be between 1 and ${maxDays} for this month`;
              }
            } catch (e) {
              reason = 'Year is outside available data range (2000-2100)';
            }
          }
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                valid: isValid,
                date: { year, month, day },
                calendar: 'BS',
                reason: reason || 'Valid date',
              }, null, 2),
            },
          ],
        };
      }

      case 'validate_ad_date': {
        const { year, month, day } = args as {
          year: number;
          month: number;
          day: number;
        };

        const isValid = isValidAdDate(year, month, day);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                valid: isValid,
                date: { year, month, day },
                calendar: 'AD',
              }, null, 2),
            },
          ],
        };
      }

      case 'get_nepali_month_name': {
        const { month, locale = 'en' } = args as {
          month: number;
          locale?: 'en' | 'ne';
        };

        const monthName = getNepaliMonthName(month, locale);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                month,
                monthName,
                locale,
                allMonths: locale === 'en' ? NEPALI_MONTH_NAMES_EN : NEPALI_MONTH_NAMES_NE,
              }, null, 2),
            },
          ],
        };
      }

      case 'navigate_month': {
        const { year, month, direction } = args as {
          year: number;
          month: number;
          direction: 'next' | 'prev';
        };

        const result = direction === 'next'
          ? getNextMonth(year, month)
          : getPrevMonth(year, month);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                from: { year, month },
                to: result,
                direction,
              }, null, 2),
            },
          ],
        };
      }

      case 'get_year_calendar': {
        const { year } = args as { year: number };

        const yearData = getCalendarData(year);
        const totalDays = yearData.reduce((sum, days) => sum + days, 0);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                year,
                months: yearData,
                totalDays,
                monthNames: NEPALI_MONTH_NAMES_EN,
              }, null, 2),
            },
          ],
        };
      }

      case 'get_current_nepali_date': {
        const { format = 'object' } = args as { format?: 'object' | 'iso' | 'string' };

        const now = new Date();
        const result = adToBs(
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate(),
          { format }
        );

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                currentDate: result,
                calendar: 'BS',
                format,
              }, null, 2),
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: false,
                error: `Unknown tool: ${name}`,
              }),
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          }),
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Log to stderr since stdout is used for MCP communication
  console.error('Nepali Dates MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
