import { useEffect, useRef } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import { useDirQuery } from '@/hooks/useDirQuery';
import { useGridColumns } from '@/hooks/useGridColumns';
import type { FileItem } from '@/lib/types/item';
import { isViewable } from '@/lib/utils/fileKind';

import GridItem from '@/components/grid/GridItem';

const ROW_HEIGHT = 180;
const GAP = 12;

type Props = {
  path: string;
  onNavigate: (path: string) => void;
};

export default function FileGrid({ path, onNavigate }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const columns = useGridColumns(scrollRef);

  const { items, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useDirQuery(path);

  const rowCount = Math.ceil(items.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT + GAP,
    overscan: 4,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const lastVisibleRowIndex = virtualRows[virtualRows.length - 1]?.index;

  // Fetch the next page once the virtualizer's rendered range approaches the tail - this is what
  // keeps a folder with thousands of files from ever fetching (or rendering) more than a few
  // screens' worth at once.
  useEffect(() => {
    if (lastVisibleRowIndex === undefined) return;

    if (lastVisibleRowIndex >= rowCount - 3 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [lastVisibleRowIndex, rowCount, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const viewableItems: FileItem[] = items.filter(
    (item): item is FileItem => item.type === 'file' && isViewable(item.ext)
  );

  if (isLoading) {
    return <p className="text-dark-50 px-1">Loading...</p>;
  }

  if (items.length === 0) {
    return <p className="text-dark-50 px-1">This folder is empty</p>;
  }

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto no-scrollbar">
      <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
        {virtualRows.map((virtualRow) => {
          const rowStart = virtualRow.index * columns;
          const rowItems = items.slice(rowStart, rowStart + columns);

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: ROW_HEIGHT,
                transform: `translateY(${virtualRow.start}px)`,
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: GAP,
              }}
            >
              {rowItems.map((item) => (
                <GridItem
                  key={item.relativePath}
                  item={item}
                  viewableItems={viewableItems}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
