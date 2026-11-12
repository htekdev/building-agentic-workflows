import { describe, expect, it, vi } from 'vitest';
import { investigate } from '../../examples/investigation.mjs';

function context() {
  return {
    args: { issue: 'Invalid status accepted.' },
    agent: vi.fn(async () => ({ finding: 'Invalid status should fail.', evidence: ['The supplied contract requires HTTP 400.'] })),
    parallel: async (thunks: (() => Promise<unknown>)[]) => Promise.all(thunks.map((thunk) => thunk())),
    phase: vi.fn(),
    step: vi.fn(async (_key: string, produce: () => Promise<unknown>) => produce()),
    log: vi.fn(),
    pause: vi.fn(async () => undefined),
  };
}

describe('workflow orchestration without paid model calls', () => {
  it('collects independent findings, validates, then pauses before returning a proposal', async () => {
    const ctx = context();
    const result = await investigate(ctx);
    expect(ctx.agent).toHaveBeenCalledTimes(2);
    expect(ctx.agent.mock.calls[0]).not.toEqual(ctx.agent.mock.calls[1]);
    expect(ctx.agent).toHaveBeenCalledWith(expect.stringContaining('legacyResponse'), expect.objectContaining({ agent: 'task-status-api' }));
    expect(ctx.pause).toHaveBeenCalledWith('human-review');
    expect(result).toMatchObject({ status: 'ready-for-human-review', changesApplied: false });
    expect(ctx.step.mock.invocationCallOrder[0]).toBeLessThan(ctx.pause.mock.invocationCallOrder[0]);
  });
  it('reports incomplete work and does not pause as if it were complete', async () => {
    const ctx = context();
    ctx.agent.mockResolvedValueOnce(null as never);
    const result = await investigate(ctx);
    expect(result).toMatchObject({ status: 'incomplete', missingInvestigators: 1 });
    expect(ctx.step).toHaveBeenCalledTimes(1);
    expect(ctx.step).toHaveBeenCalledWith('fixture-evidence-v1', expect.any(Function));
    expect(ctx.pause).not.toHaveBeenCalled();
  });
  it('rejects semantically empty agent output', async () => {
    const ctx = context();
    ctx.agent.mockResolvedValue({ finding: '', evidence: [] });
    expect(await investigate(ctx)).toMatchObject({ status: 'incomplete', missingInvestigators: 2 });
  });
  it('propagates cancellation and rejects malformed inputs', async () => {
    const ctx = context();
    ctx.agent.mockRejectedValue(new Error('cancelled'));
    await expect(investigate(ctx)).rejects.toThrow('cancelled');
    await expect(investigate({ ...ctx, args: {} })).rejects.toThrow('synthetic issue');
    await expect(investigate({ ...ctx, args: null })).rejects.toThrow('synthetic issue');
    await expect(investigate({ ...ctx, args: { issue: 'x'.repeat(4001) } })).rejects.toThrow('synthetic issue');
  });
});
