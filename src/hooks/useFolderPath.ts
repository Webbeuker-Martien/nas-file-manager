import { useSearchParams } from 'react-router-dom';

/**
 * The current folder path lives in a `path` query param (e.g. /browse?path=/Movies/2024) rather
 * than a router splat segment. URLSearchParams handles percent-encoding/decoding for us reliably,
 * sidestepping ambiguity in how react-router decodes splat routes for paths with spaces or special
 * characters (the API's own relativePath fields, e.g. from folder links, are already encoded the
 * same way a splat would need to be, so this keeps the two consistent).
 */
export const useFolderPath = (): [string, (path: string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const path = searchParams.get('path') || '/';

  const setPath = (next: string) => {
    setSearchParams(next === '/' ? {} : { path: next });
  };

  return [path, setPath];
};
