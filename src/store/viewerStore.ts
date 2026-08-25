import { create } from 'zustand';

import type { FileItem } from '@/lib/types/item';

type ViewerState = {
  items: FileItem[];
  index: number | null;
  open: (items: FileItem[], index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
};

export const useViewerStore = create<ViewerState>((set, get) => ({
  items: [],
  index: null,

  open: (items, index) => set({ items, index }),

  close: () => set({ index: null }),

  next: () => {
    const { items, index } = get();
    if (index === null || items.length === 0) return;
    set({ index: (index + 1) % items.length });
  },

  prev: () => {
    const { items, index } = get();
    if (index === null || items.length === 0) return;
    set({ index: (index - 1 + items.length) % items.length });
  },
}));
