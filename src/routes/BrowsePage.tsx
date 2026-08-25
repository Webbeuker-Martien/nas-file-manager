import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFolderPath } from '@/hooks/useFolderPath';
import { useFileActions } from '@/hooks/useFileActions';
import { useAuthStore } from '@/store/authStore';
import { useSelectionStore } from '@/store/selectionStore';

import Topbar from '@/components/layout/Topbar';
import FileGrid from '@/components/grid/FileGrid';
import Viewer from '@/components/viewer/Viewer';
import SelectionToolbar from '@/components/toolbar/SelectionToolbar';
import RenameDialog from '@/components/dialogs/RenameDialog';
import MoveDialog from '@/components/dialogs/MoveDialog';

/** Last path segment of a decoded relativePath, for display in the rename dialog. */
const nameFromPath = (relativePath: string): string => {
  const decoded = decodeURIComponent(relativePath);
  return decoded.split('/').filter(Boolean).pop() ?? decoded;
};

export default function BrowsePage() {
  const [path, setPath] = useFolderPath();
  const setUnauthenticated = useAuthStore((s) => s.setUnauthenticated);
  const navigate = useNavigate();

  const selected = useSelectionStore((s) => s.selected);
  const clearSelection = useSelectionStore((s) => s.clear);
  const { remove, move, rename } = useFileActions();

  const [dialog, setDialog] = useState<'rename' | 'move' | null>(null);

  const handleLoggedOut = () => {
    setUnauthenticated();
    navigate('/login', { replace: true });
  };

  // A selection only makes sense within the folder it was made in - clear it on navigation so a
  // stale "N selected" toolbar can't linger into an unrelated folder.
  const handleNavigate = (nextPath: string) => {
    clearSelection();
    setPath(nextPath);
  };

  const selectedPaths = Array.from(selected);

  const handleDelete = () => {
    const confirmed = confirm(
      selectedPaths.length === 1
        ? `Delete "${nameFromPath(selectedPaths[0])}"? This can't be undone.`
        : `Delete ${selectedPaths.length} items? This can't be undone.`
    );
    if (confirmed) remove(selectedPaths);
  };

  return (
    <div className="min-h-dvh flex flex-col">
      {selected.size > 0 ? (
        <SelectionToolbar onRename={() => setDialog('rename')} onMove={() => setDialog('move')} onDelete={handleDelete} />
      ) : (
        <Topbar path={path} onNavigate={handleNavigate} onLoggedOut={handleLoggedOut} />
      )}

      <main className="flex-1 p-3 md:p-6 min-h-0">
        <div className="h-[calc(100dvh-var(--spacing-topbar))] pt-topbar pb-3">
          <FileGrid path={path} onNavigate={handleNavigate} />
        </div>
      </main>

      <Viewer />

      {dialog === 'rename' && selectedPaths.length === 1 && (
        <RenameDialog
          currentName={nameFromPath(selectedPaths[0])}
          onCancel={() => setDialog(null)}
          onConfirm={(newName) => {
            rename(selectedPaths[0], newName);
            setDialog(null);
          }}
        />
      )}

      {dialog === 'move' && (
        <MoveDialog
          onCancel={() => setDialog(null)}
          onConfirm={(destination) => {
            move(selectedPaths, destination);
            setDialog(null);
          }}
        />
      )}
    </div>
  );
}
