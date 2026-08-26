export type Crumb = {
  name: string;
  path: string;
};

/**
 * Splits an encoded folder path ("/Movies/2024%20Trip") into clickable breadcrumb segments.
 * `path` stays encoded (passed straight back into onNavigate), `name` is decoded for display only.
 */
export const buildBreadcrumb = (path: string): Crumb[] => {
  const segments = path.split('/').filter(Boolean);

  return segments.map((segment, i) => ({
    name: decodeURIComponent(segment),
    path: '/' + segments.slice(0, i + 1).join('/'),
  }));
};
