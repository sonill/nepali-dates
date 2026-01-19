import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'src/bin/**',
        'bin/**',
        '**/mcp-server.ts',
        '**/*.test.ts',
        '**/*.config.ts',
        'scripts/**',
        'examples/**',
        'src/index.ts'
      ],
      thresholds: {
        lines: 95,
        functions: 95,
        branches: 90,
        statements: 95
      }
    }
  }
});
