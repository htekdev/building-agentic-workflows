/** Pause every video when leaving a slide; do not start playback automatically. */
export function pauseVideos(container: ParentNode): void {
  container.querySelectorAll('video').forEach((video) => video.pause());
}

/** Keep hidden-slide controls out of the keyboard tab order. */
export function syncSlideFocus(slides: Iterable<HTMLElement>, current: HTMLElement): void {
  for (const slide of slides) slide.inert = slide !== current;
}
