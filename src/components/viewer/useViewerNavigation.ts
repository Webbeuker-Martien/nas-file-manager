import { useEffect, useRef } from 'react';

import { useViewerStore } from '@/store/viewerStore';

const SWIPE_THRESHOLD_PX = 50;

/** Wires keyboard arrows/Escape and touch-swipe to the viewer store's next/prev/close. */
export const useViewerNavigation = (isOpen: boolean) => {
  const next = useViewerStore((s) => s.next);
  const prev = useViewerStore((s) => s.prev);
  const close = useViewerStore((s) => s.close);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, next, prev, close]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;

    if (delta > 0) prev();
    else next();
  };

  return { onTouchStart, onTouchEnd };
};
