import { beforeEach, describe, expect, it, vi } from 'vitest';
import { checkTestPairing, createHooks, inspectTool } from '../../.github/extensions/presentation-guardrails/policy.mjs';

const { execute, exists } = vi.hoisted(() => ({ execute: vi.fn(), exists: vi.fn() }));
vi.mock('node:util', () => ({ promisify: () => execute }));
vi.mock('node:fs', () => ({ existsSync: exists }));

beforeEach(() => {
  execute.mockReset().mockResolvedValue({ stdout: '', stderr: '' });
  exists.mockReset().mockReturnValue(true);
});

describe('repository guardrails', () => {
  it('rejects destructive git commands but permits normal reads', () => {
    expect(inspectTool({ toolArgs: { command: 'git reset --hard' } })).toMatch(/Destructive/);
    expect(inspectTool({ toolArgs: { command: 'git push origin main --force' } })).toMatch(/Destructive/);
    expect(inspectTool({ toolArgs: { command: 'git status --short' } })).toBeNull();
  });
  it('rejects private keys and allows ordinary patches', () => {
    expect(inspectTool({ toolArgs: '-----BEGIN PRIVATE KEY-----' })).toMatch(/credential/);
    expect(inspectTool({ toolArgs: 'a harmless patch' })).toBeNull();
    expect(inspectTool({})).toBeNull();
  });
  it('requires tests with source changes but not content-only changes', () => {
    expect(checkTestPairing(['src/main.ts'])).toMatch(/behavior tests/);
    expect(checkTestPairing(['src/main.ts', 'tests/unit/media.test.ts'])).toBeNull();
    expect(checkTestPairing(['src/content/slides.md'])).toBeNull();
  });
  it('returns a denial without executing a dangerous command', async () => {
    const hooks = createHooks(process.cwd());
    expect(await hooks.onPreToolUse({ toolArgs: { command: 'git clean -fd' } })).toMatchObject({ permissionDecision: 'deny' });
    expect(await hooks.onPreToolUse({ toolArgs: { command: 'git status' } })).toBeUndefined();
    expect(await hooks.onPostToolUse({ toolName: 'view' })).toBeUndefined();
  });
  it('checks staged Git changes and permits content-only commits', async () => {
    const hooks = createHooks(process.cwd());
    execute.mockResolvedValueOnce({ stdout: 'src/main.ts\n' });
    expect(await hooks.onPreToolUse({ toolArgs: { command: 'git commit -m change' } })).toMatchObject({ permissionDecision: 'deny' });
    execute.mockResolvedValueOnce({ stdout: 'src/main.ts\ntests/unit/main.test.ts\n' });
    expect(await hooks.onPreToolUse({ toolArgs: { command: 'git commit -m change' } })).toBeUndefined();
  });
  it('uses the local linter after relevant edits and reports errors', async () => {
    const hooks = createHooks(process.cwd());
    const edit = { toolName: 'apply_patch', toolArgs: 'building-agentic-workflows/src/main.ts' };
    expect(await hooks.onPostToolUse(edit)).toBeUndefined();
    expect(execute).toHaveBeenCalledWith('node', expect.arrayContaining(['.']), expect.any(Object));
    execute.mockRejectedValueOnce({ stdout: 'lint failure' });
    expect(await hooks.onPostToolUse(edit)).toMatchObject({ additionalContext: expect.stringContaining('lint failure') });
    execute.mockRejectedValueOnce({ stderr: 'stderr failure' });
    expect(await hooks.onPostToolUse(edit)).toMatchObject({ additionalContext: expect.stringContaining('stderr failure') });
    execute.mockRejectedValueOnce(new Error('execution failure'));
    expect(await hooks.onPostToolUse(edit)).toMatchObject({ additionalContext: expect.stringContaining('execution failure') });
  });
  it('does not lint unrelated work or install missing tools', async () => {
    const hooks = createHooks('C:\\Repos\\building-agentic-workflows');
    expect(await hooks.onPostToolUse({ toolName: 'edit', toolArgs: {}, workingDirectory: 'C:\\other' })).toBeUndefined();
    exists.mockReturnValue(false);
    expect(await hooks.onPostToolUse({ toolName: 'edit', workingDirectory: 'C:\\Repos\\building-agentic-workflows' })).toBeUndefined();
    expect(execute).not.toHaveBeenCalled();
  });
});
