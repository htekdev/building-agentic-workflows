import { describe, expect, it } from 'vitest';
import { collectFixtureEvidence, updateTaskStatus } from '../../examples/fixture.mjs';

describe('controlled endpoint fixture', () => {
  it('reproduces the intentional regression without changing the original task', () => {
    const task = { id: 'task', status: 'pending' };
    expect(updateTaskStatus(task, 'anything', 'legacy')).toMatchObject({ status: 200, body: { status: 'anything' } });
    expect(task.status).toBe('pending');
    expect(collectFixtureEvidence()).toMatchObject({ legacyResponse: { status: 200 }, requiredResponse: { status: 400 } });
  });
  it('rejects invalid status and accepts a valid update under the strict contract', () => {
    expect(updateTaskStatus({ id: 'task' }, null)).toEqual({ status: 400, body: { error: 'Invalid task status.' } });
    expect(updateTaskStatus({ id: 'task' }, 'done')).toEqual({ status: 200, body: { id: 'task', status: 'done' } });
    expect(() => updateTaskStatus({}, 'pending', 'typo')).toThrow('Unknown fixture mode.');
  });
});
