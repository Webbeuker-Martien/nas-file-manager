export type ThumbSize = 'sm' | 'md' | 'lg';

/**
 * All of these are built as relative, same-origin paths from an item's relativePath (already
 * percent-encoded by the API) rather than the absolute BASE_URL-prefixed fields the API also
 * returns (assetPaths/downloadPath/thumbPath - kept for the old frontend's cross-origin setup).
 * Relative URLs are required here so requests go through the Vite dev proxy / prod reverse proxy
 * and stay same-origin, which is what lets the session cookie ride along automatically.
 */
export const thumbUrl = (relativePath: string, size: ThumbSize = 'md'): string =>
  `/thumb${relativePath}?size=${size}`;

export const viewUrl = (relativePath: string): string => `/view${relativePath}`;

export const downloadUrl = (relativePath: string): string => `/download${relativePath}`;
