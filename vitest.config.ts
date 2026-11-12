import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts', 'examples/**/*.mjs', 'scripts/offline-server.mjs', '.github/extensions/presentation-guardrails/policy.mjs'],
      exclude: ['examples/extension.mjs'],
      reporter: ['text', 'lcov', 'json-summary', 'html'],
      thresholds: { statements: 80, branches: 75, functions: 80, lines: 80 },
    },
  },
});
