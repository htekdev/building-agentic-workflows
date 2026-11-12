import { describe, expect, it, vi } from 'vitest';
import { pauseVideos, syncSlideFocus } from '../../src/lib/media';

describe('slide media and focus lifecycle', () => {
  it('pauses every video and tolerates slides with no video', () => {
    const pause = vi.fn();
    const container = { querySelectorAll: vi.fn().mockReturnValue([{ pause }, { pause }]) };
    pauseVideos(container as unknown as ParentNode);
    expect(pause).toHaveBeenCalledTimes(2);
    container.querySelectorAll.mockReturnValue([]);
    pauseVideos(container as unknown as ParentNode);
    expect(pause).toHaveBeenCalledTimes(2);
  });
  it('only exposes current-slide controls to keyboard focus', () => {
    const first = { inert: false } as HTMLElement;
    const second = { inert: true } as HTMLElement;
    syncSlideFocus([first, second], second);
    expect(first.inert).toBe(true);
    expect(second.inert).toBe(false);
    syncSlideFocus([first, second], first);
    expect(first.inert).toBe(false);
    expect(second.inert).toBe(true);
  });
});
