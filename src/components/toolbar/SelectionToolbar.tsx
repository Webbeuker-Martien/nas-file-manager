import { FolderInput, Pencil, Trash2, X } from 'lucide-react';

import { useSelectionStore } from '@/store/selectionStore';

type Props = {
  onRename: () => void;
  onMove: () => void;
  onDelete: () => void;
};

export default function SelectionToolbar({ onRename, onMove, onDelete }: Props) {
  const selected = useSelectionStore((s) => s.selected);
  const clear = useSelectionStore((s) => s.clear);

  const count = selected.size;

  return (
    <header className="bg-dark-900 border-b border-dark-800 px-3 md:px-6 h-topbar flex items-center gap-3 fixed top-0 left-0 right-0 z-40">
      <button onClick={clear} aria-label="Cancel selection" className="p-1 -ml-1 rounded-lg hover:bg-dark-800 transition-colors">
        <X className="w-5 h-5" />
      </button>

      <p className="flex-1 font-medium">{count} selected</p>

      {count === 1 && (
        <button onClick={onRename} aria-label="Rename" className="p-2 rounded-lg hover:bg-dark-800 transition-colors">
          <Pencil className="w-5 h-5" />
        </button>
      )}

      <button onClick={onMove} aria-label="Move" className="p-2 rounded-lg hover:bg-dark-800 transition-colors">
        <FolderInput className="w-5 h-5" />
      </button>

      <button onClick={onDelete} aria-label="Delete" className="p-2 rounded-lg hover:bg-dark-800 transition-colors text-red-400">
        <Trash2 className="w-5 h-5" />
      </button>
    </header>
  );
}
