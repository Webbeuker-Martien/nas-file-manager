import { useQueryClient } from '@tanstack/react-query';

import { deleteItems, moveItems, renameItem, type ActionResult } from '@/lib/api/dir';
import { useSelectionStore } from '@/store/selectionStore';

const describeFailures = (results: ActionResult[]): string | null => {
  const failures = results.filter((r) => !r.success);
  if (failures.length === 0) return null;

  return failures.map((f) => `${f.path}: ${f.message ?? 'failed'}`).join('\n');
};

export const useFileActions = () => {
  const queryClient = useQueryClient();
  const clearSelection = useSelectionStore((s) => s.clear);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['dir'] });

  const remove = async (paths: string[]) => {
    const results = await deleteItems(paths);
    invalidate();
    clearSelection();

    const failureMessage = describeFailures(results);
    if (failureMessage) alert(`Some items couldn't be deleted:\n\n${failureMessage}`);
  };

  const move = async (paths: string[], destination: string) => {
    const results = await moveItems(paths, destination);
    invalidate();
    clearSelection();

    const failureMessage = describeFailures(results);
    if (failureMessage) alert(`Some items couldn't be moved:\n\n${failureMessage}`);
  };

  const rename = async (path: string, newName: string) => {
    const result = await renameItem(path, newName);
    invalidate();
    clearSelection();

    if (!result.success) alert(result.message ?? "Couldn't rename item");
  };

  return { remove, move, rename };
};
