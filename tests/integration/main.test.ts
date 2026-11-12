import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { deck } = vi.hoisted(() => ({
  deck: {
    on: vi.fn(),
    initialize: vi.fn(async () => undefined),
    getCurrentSlide: vi.fn(),
    getPlugin: vi.fn(),
  },
}));
vi.mock('reveal.js', () => ({ default: vi.fn(function () { return deck; }) }));
vi.mock('reveal.js/plugin/notes', () => ({ default: {} }));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});
afterEach(() => vi.unstubAllGlobals());

describe('presentation entry point', () => {
  it('renders the handout and binds printing without starting a slideshow', async () => {
    const main = { innerHTML: '' };
    const addEventListener = vi.fn();
    const print = vi.fn();
    vi.stubGlobal('document', { querySelector: (selector: string) => selector === '#handout' ? main : { addEventListener } });
    vi.stubGlobal('window', { print });
    await import('../../src/main');
    expect(main.innerHTML).toContain('Research sources');
    expect(deck.initialize).not.toHaveBeenCalled();
    addEventListener.mock.calls[0][1]();
    expect(print).toHaveBeenCalledOnce();
  });
  it.each([false, true])('initializes the deck with reduced motion=%s and updates focus on slide events', async (reduced) => {
    const main = { innerHTML: '' };
    const addEventListener = vi.fn();
    const open = vi.fn();
    const first = { inert: false };
    const current = { inert: true };
    deck.getCurrentSlide.mockReturnValue(current);
    deck.getPlugin.mockReturnValue({ open });
    vi.stubGlobal('document', {
      querySelector: (selector: string) => selector === '#handout' ? null : selector === '.slides' ? main : { addEventListener },
      querySelectorAll: (selector: string) => selector === 'video' ? [] : [first, current],
    });
    vi.stubGlobal('window', { matchMedia: () => ({ matches: reduced }) });
    await import('../../src/main');
    expect(main.innerHTML).toContain('id="tool-management"');
    expect(deck.initialize).toHaveBeenCalledOnce();
    for (const [, update] of deck.on.mock.calls) update();
    expect(first.inert).toBe(true);
    expect(current.inert).toBe(false);
    addEventListener.mock.calls[0][1]();
    expect(open).toHaveBeenCalledOnce();
    deck.getPlugin.mockReturnValue(undefined);
    expect(() => addEventListener.mock.calls[0][1]()).not.toThrow();
    deck.getPlugin.mockReturnValue({});
    expect(() => addEventListener.mock.calls[0][1]()).not.toThrow();
  });
});
