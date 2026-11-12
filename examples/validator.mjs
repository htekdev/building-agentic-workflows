import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const requiredStatuses = ['pending', 'in-progress', 'done'];

/** Validate a synthetic API proposal without executing commands or writing files. */
export function validateProposal(proposal) {
  const errors = [];
  if (!proposal || typeof proposal !== 'object' || Array.isArray(proposal)) {
    return { valid: false, errors: ['Proposal must be an object.'] };
  }
  const statuses = proposal.allowedStatuses;
  if (!Array.isArray(statuses) || statuses.some((status) => typeof status !== 'string')) {
    errors.push('allowedStatuses must be an array of strings.');
  } else if (statuses.length !== requiredStatuses.length ||
    new Set(statuses).size !== statuses.length ||
    requiredStatuses.some((status) => !statuses.includes(status))) {
    errors.push('Statuses must be exactly pending, in-progress, and done, without duplicates.');
  }
  if (proposal.invalidStatusCode !== 400) errors.push('Invalid status must produce HTTP 400.');
  if (Object.keys(proposal).some((key) => !['allowedStatuses', 'invalidStatusCode'].includes(key))) {
    errors.push('Unexpected proposal fields are not permitted.');
  }
  return { valid: errors.length === 0, errors };
}

function digest(proposal) {
  return createHash('sha256').update(JSON.stringify({
    allowedStatuses: [...proposal.allowedStatuses].sort(),
    invalidStatusCode: proposal.invalidStatusCode,
  })).digest('hex');
}

/** Bind a human-review packet to a validated, detached copy of one proposal. */
export function createReviewPacket(proposal) {
  const validation = validateProposal(proposal);
  if (!validation.valid) throw new Error(validation.errors.join(' '));
  const snapshot = structuredClone(proposal);
  return { proposal: snapshot, digest: digest(snapshot), validation };
}

/** Record an explicit decision; this example never applies repository changes. */
export function decideReview(packet, decision) {
  if (!decision || typeof decision.approved !== 'boolean') throw new Error('An explicit approval decision is required.');
  if (decision.approved === false) return { status: 'rejected', changesApplied: false };
  if (!validateProposal(packet.proposal).valid || digest(packet.proposal) !== packet.digest || decision.digest !== packet.digest) {
    throw new Error('Approval does not match the validated proposal.');
  }
  return { status: 'approved-for-human-delivery', digest: packet.digest, changesApplied: false };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const invalid = { allowedStatuses: ['pending', 'anything'], invalidStatusCode: 200 };
  const corrected = { allowedStatuses: ['pending', 'in-progress', 'done'], invalidStatusCode: 400 };
  console.log(JSON.stringify({
    demonstration: 'Synthetic deterministic validator, no model calls and no repository writes',
    rejected: validateProposal(invalid),
    corrected: createReviewPacket(corrected),
  }, null, 2));
}
