import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchDirPage, PAGE_SIZE } from '@/lib/api/dir';
import type { Item } from '@/lib/types/item';

export const useDirQuery = (path: string) => {
  const query = useInfiniteQuery({
    queryKey: ['dir', path],
    queryFn: ({ pageParam }) => fetchDirPage(path, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.offset + lastPage.limit : undefined),
  });

  const items: Item[] = query.data?.pages.flatMap((page) => page.body) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

  return { ...query, items, total, pageSize: PAGE_SIZE };
};
