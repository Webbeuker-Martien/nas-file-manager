import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchDirPage } from '@/lib/api/dir';
import type { FolderItem } from '@/lib/types/item';
import { Folder, FolderOpen } from 'lucide-react';

import Breadcrumb from '@/components/layout/Breadcrumb';

// Folders always sort before files in a directory listing (see services/listing.js), so the
// picker only needs the first page - any folder with up to a page's worth of subfolders shows
// them all regardless of how many files sit alongside them.
type Props = {
  onCancel: () => void;
  onConfirm: (destination: string) => void;
};

export default function MoveDialog({ onCancel, onConfirm }: Props) {
  const [path, setPath] = useState('/');

  const { data, isLoading } = useQuery({
    queryKey: ['dir-picker', path],
    queryFn: () => fetchDirPage(path, 0),
  });

  const folders = (data?.body.filter((item): item is FolderItem => item.type === 'folder') ?? []);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4" onClick={onCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-[70vh] bg-dark-900 border border-dark-800 rounded-lg p-4 flex flex-col gap-3"
      >
        <h2 className="text-lg font-semibold">Move to...</h2>

        <div className="shrink-0">
          <Breadcrumb path={path} onNavigate={setPath} />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar border-t border-dark-800 pt-2">
          {isLoading && <p className="text-dark-50 px-1">Loading...</p>}

          {!isLoading && folders.length === 0 && <p className="text-dark-50 px-1">No subfolders here</p>}

          {folders.map((folder) => (
            <button
              key={folder.relativePath}
              onClick={() => setPath(folder.relativePath)}
              className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-dark-800 transition-colors text-left"
            >
              <Folder className="w-4 h-4 opacity-75 shrink-0" />
              <span className="truncate">{folder.name}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-1 shrink-0">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg hover:bg-dark-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(path)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-500 hover:bg-dark-600 transition-colors"
          >
            <FolderOpen className="w-4 h-4" />
            Move here
          </button>
        </div>
      </div>
    </div>
  );
}
