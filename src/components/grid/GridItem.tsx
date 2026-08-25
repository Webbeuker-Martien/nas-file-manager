import { Check } from 'lucide-react';

import type { FileItem, FolderItem, Item } from '@/lib/types/item';
import { isViewable } from '@/lib/utils/fileKind';
import { downloadUrl } from '@/lib/utils/urls';
import { formatBytes } from '@/lib/utils/formatBytes';
import { useViewerStore } from '@/store/viewerStore';
import { useSelectionStore } from '@/store/selectionStore';

import Thumbnail, { FolderIcon } from '@/components/grid/Thumbnail';

type Props = {
  item: Item;
  viewableItems: FileItem[];
  onNavigate: (path: string) => void;
};

export default function GridItem({ item, viewableItems, onNavigate }: Props) {
  const openViewer = useViewerStore((s) => s.open);
  const selected = useSelectionStore((s) => s.selected);
  const toggle = useSelectionStore((s) => s.toggle);

  const isSelected = selected.has(item.relativePath);
  const hasSelection = selected.size > 0;

  const handleClick = () => {
    if (hasSelection) {
      toggle(item.relativePath);
      return;
    }

    if (item.type === 'folder') {
      onNavigate(decodeURIComponent(item.relativePath));
    } else if (isViewable(item.ext)) {
      const index = viewableItems.indexOf(item);
      openViewer(viewableItems, index);
    } else {
      window.open(downloadUrl(item.relativePath), '_blank');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative flex flex-col gap-1.5 text-left rounded-lg overflow-hidden bg-dark-900 border transition-colors h-full ${isSelected ? 'border-dark-500' : 'border-dark-800 hover:border-dark-700'}`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggle(item.relativePath);
        }}
        aria-label={isSelected ? 'Deselect' : 'Select'}
        className={`absolute top-1.5 left-1.5 z-10 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'bg-dark-500 border-dark-500' : 'bg-black/40 border-white/40'}`}
      >
        {isSelected && <Check className="w-3.5 h-3.5" />}
      </button>

      <div className="flex-1 w-full bg-dark-950 flex items-center justify-center overflow-hidden">
        {item.type === 'folder' ? <FolderIcon /> : <Thumbnail file={item} />}
      </div>

      <div className="px-2 pb-2 min-w-0">
        <p className="text-sm truncate">{item.name}</p>
        <p className="text-xs text-dark-50">{describeMeta(item)}</p>
      </div>
    </button>
  );
}

const describeMeta = (item: FileItem | FolderItem): string => {
  if (item.type === 'folder') {
    return item.children === 0 ? 'Empty' : `${item.children} items`;
  }

  return formatBytes(item.size);
};
