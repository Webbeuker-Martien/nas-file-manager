import { useEffect, useState, type RefObject } from 'react';

const MIN_TILE_WIDTH = 160;

/** Column count for the grid, recomputed as the container resizes. */
export const useGridColumns = (containerRef: RefObject<HTMLElement | null>): number => {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      setColumns(Math.max(2, Math.floor(width / MIN_TILE_WIDTH)));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => observer.disconnect();
  }, [containerRef]);

  return columns;
};
