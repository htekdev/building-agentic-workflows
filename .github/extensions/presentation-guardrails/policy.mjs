import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { promisify } from 'node:util';
import { resolve } from 'node:path';

const execute = promisify(execFile);

/** Return a denial reason for clearly destructive commands or credential writes. */
export function inspectTool(input) {
  const command = String(input.toolArgs?.command ?? '');
  if (/\bgit\s+(?:reset\s+--hard|clean\s+-[a-z]*f)|\bgit\s+push\b[^\n]*(?:--force|-f\b)/i.test(command)) {
    return 'Destructive Git commands require a separate human decision.';
  }
  const args = typeof input.toolArgs === 'string'
    ? input.toolArgs
    : JSON.stringify(input.toolArgs ?? {});
  if (/gh[pousr]_[A-Za-z0-9]{36,}|-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/.test(args)) {
    return 'Potential credential detected. Use environment variables instead.';
  }
  return null;
}

/** Check actual changed paths rather than depending on a particular editing tool. */
export function checkTestPairing(paths) {
  const source = paths.filter((path) => /(?:^|\/)(?:src|examples)\/.*\.(?:ts|mjs)$/.test(path));
  const hasTests = paths.some((path) => /(?:^|\/)tests\/.*\.test\.(?:ts|mjs)$/.test(path));
  return source.length > 0 && !hasTests
    ? 'Source changes need accompanying behavior tests before committing.'
    : null;
}

/** Build hooks scoped to this repository. These supplement, not replace, CI. */
export function createHooks(root) {
  return {
    onPreToolUse: async (input) => {
      const reason = inspectTool(input);
      if (reason) return { permissionDecision: 'deny', permissionDecisionReason: reason };
      const command = String(input.toolArgs?.command ?? '');
      if (!/\bgit\b[^\n]*\bcommit\b/.test(command)) return;
      const result = await execute('git', ['diff', '--cached', '--name-only'], { cwd: root });
      const pairing = checkTestPairing(result.stdout.trim().split(/\r?\n/));
      if (pairing) return { permissionDecision: 'deny', permissionDecisionReason: pairing };
    },
    onPostToolUse: async (input) => {
      if (!/apply_patch|edit|create/.test(input.toolName)) return;
      const args = typeof input.toolArgs === 'string' ? input.toolArgs : JSON.stringify(input.toolArgs);
      if (!args?.includes('building-agentic-workflows') && !String(input.workingDirectory).startsWith(root)) return;
      if (!existsSync(resolve(root, 'node_modules', 'eslint', 'bin', 'eslint.js'))) return;
      try {
        await execute('node', ['node_modules/eslint/bin/eslint.js', '.'], { cwd: root, timeout: 30000 });
      } catch (error) {
        return { additionalContext: `[presentation-guardrails] Lint must be corrected:\n${error.stdout || error.stderr || error.message}` };
      }
    },
  };
}
