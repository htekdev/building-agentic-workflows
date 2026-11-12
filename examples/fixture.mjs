/** Simulate one endpoint response; legacy mode is an intentional demo regression. */
export function updateTaskStatus(task, status, mode = 'strict') {
  if (!['legacy', 'strict'].includes(mode)) throw new Error('Unknown fixture mode.');
  if (mode === 'strict' && !['pending', 'in-progress', 'done'].includes(status)) {
    return { status: 400, body: { error: 'Invalid task status.' } };
  }
  return { status: 200, body: { ...task, status } };
}

/** Reproduce the controlled regression and the required acceptance behavior. */
export function collectFixtureEvidence() {
  const task = { id: 'synthetic-task', status: 'pending' };
  return {
    kind: 'synthetic in-memory endpoint fixture, not an HTTP service or production observation',
    request: { task, proposedStatus: 'anything' },
    legacyResponse: updateTaskStatus(task, 'anything', 'legacy'),
    requiredResponse: updateTaskStatus(task, 'anything', 'strict'),
  };
}
