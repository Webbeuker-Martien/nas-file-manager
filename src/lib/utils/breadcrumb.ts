export type Crumb = {
  name: string;
  path: string;
};

/** Splits a decoded folder path ("/Movies/2024") into clickable breadcrumb segments. */
export const buildBreadcrumb = (path: string): Crumb[] => {
  const segments = path.split('/').filter(Boolean);

  return segments.map((name, i) => ({
    name,
    path: '/' + segments.slice(0, i + 1).join('/'),
  }));
};
