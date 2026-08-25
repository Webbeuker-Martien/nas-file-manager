import { create } from 'zustand';

type SelectionState = {
  selected: Set<string>;
  toggle: (relativePath: string) => void;
  clear: () => void;
};

export const useSelectionStore = create<SelectionState>((set) => ({
  selected: new Set(),

  toggle: (relativePath) =>
    set((state) => {
      const next = new Set(state.selected);
      if (next.has(relativePath)) next.delete(relativePath);
      else next.add(relativePath);
      return { selected: next };
    }),

  clear: () => set({ selected: new Set() }),
}));
