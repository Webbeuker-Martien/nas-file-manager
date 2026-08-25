import client from '@/lib/api/client';
import type { DirPage } from '@/lib/types/item';

const PAGE_SIZE = 200;

export { PAGE_SIZE };

export const fetchDirPage = async (path: string, offset: number): Promise<DirPage> => {
  const { data } = await client.get<DirPage>(`/dir${path}`, {
    params: { deepest: false, offset, limit: PAGE_SIZE },
  });

  return data;
};

export type ActionResult = { path: string; success: boolean; message?: string };

export const deleteItems = async (paths: string[]): Promise<ActionResult[]> => {
  const { data } = await client.post<{ results: ActionResult[] }>('/dir/actions/delete', { paths });
  return data.results;
};

export const moveItems = async (paths: string[], destination: string): Promise<ActionResult[]> => {
  const { data } = await client.post<{ results: ActionResult[] }>('/dir/actions/move', { paths, destination });
  return data.results;
};

export const renameItem = async (path: string, newName: string): Promise<{ success: boolean; message?: string }> => {
  const { data } = await client.post('/dir/actions/rename', { path, newName });
  return data;
};
