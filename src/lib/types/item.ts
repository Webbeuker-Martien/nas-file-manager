export type FileItem = {
  type: 'file';
  name: string;
  ext: string;
  mime: string;
  size: number;
  mtimeMs: number;
  relativePath: string;
  absolutePath: string;
  assetPaths: string[];
  downloadPath: string;
  thumbPath: string;
};

export type FolderItem = {
  type: 'folder';
  name: string;
  relativePath: string;
  absolutePath: string;
  children: number;
};

export type Item = FileItem | FolderItem;

export type DirPage = {
  success: boolean;
  count: number;
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  body: Item[];
};
