import { describe, expect, it } from 'vitest';
import { createReviewPacket, decideReview, validateProposal } from '../../examples/validator.mjs';

const good = () => ({ allowedStatuses: ['pending', 'in-progress', 'done'], invalidStatusCode: 400 });

describe('deterministic status contract', () => {
  it.each([null, 'arbitrary text', [], { allowedStatuses: 1 }, { allowedStatuses: [1] }])('rejects malformed input %j', (input) => {
    expect(validateProposal(input).valid).toBe(false);
  });
  it('rejects duplicates, unknown statuses, wrong responses, and unexpected fields', () => {
    expect(validateProposal({ ...good(), allowedStatuses: ['pending', 'pending', 'done'] }).valid).toBe(false);
    expect(validateProposal({ ...good(), allowedStatuses: ['pending', 'in-progress', 'anything'] }).valid).toBe(false);
    expect(validateProposal({ ...good(), invalidStatusCode: 200 }).errors).toContain('Invalid status must produce HTTP 400.');
    expect(validateProposal({ ...good(), shell: 'untrusted' }).valid).toBe(false);
    expect(() => createReviewPacket({})).toThrow();
  });
  it('binds review to a detached validated proposal', () => {
    const proposal = good();
    const packet = createReviewPacket(proposal);
    proposal.invalidStatusCode = 200;
    expect(packet.proposal.invalidStatusCode).toBe(400);
    expect(decideReview(packet, { approved: true, digest: packet.digest })).toMatchObject({
      status: 'approved-for-human-delivery', changesApplied: false,
    });
  });
  it('does not apply anything on rejection or approval of different content', () => {
    const packet = createReviewPacket(good());
    expect(decideReview(packet, { approved: false })).toEqual({ status: 'rejected', changesApplied: false });
    expect(() => decideReview(packet, { approved: true, digest: 'another proposal' })).toThrow(/does not match/);
    packet.proposal.invalidStatusCode = 200;
    expect(() => decideReview(packet, { approved: true, digest: packet.digest })).toThrow(/does not match/);
    expect(() => decideReview(packet, {})).toThrow(/explicit/);
    expect(() => decideReview(packet, null)).toThrow(/explicit/);
  });
});
