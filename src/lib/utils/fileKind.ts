export type FileKind = 'image' | 'video' | 'audio' | 'pdf' | 'text' | null;

const IMAGE_EXTS = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'avif']);
const VIDEO_EXTS = new Set(['mp4', 'webm', 'mkv', 'mov', 'ogv', 'm4v', '3gp']);
const AUDIO_EXTS = new Set(['mp3', 'wav', 'flac', 'ogg', 'm4a', 'aac']);
const TEXT_EXTS = new Set(['txt', 'json', 'md', 'log', 'csv']);

/** Which of the built-in viewers (if any) can render this extension - null falls through to download. */
export const kindOf = (ext: string): FileKind => {
  const lower = ext.replace('.', '').toLowerCase();

  if (IMAGE_EXTS.has(lower)) return 'image';
  if (VIDEO_EXTS.has(lower)) return 'video';
  if (AUDIO_EXTS.has(lower)) return 'audio';
  if (lower === 'pdf') return 'pdf';
  if (TEXT_EXTS.has(lower)) return 'text';

  return null;
};

/** Kinds the full-screen viewer's prev/next navigation cycles through (skips plain downloads). */
export const isViewable = (ext: string): boolean => kindOf(ext) !== null;

/** Whether the backend can generate a /thumb preview for this extension (images + videos only). */
export const isThumbnailable = (ext: string): boolean => {
  const kind = kindOf(ext);
  return kind === 'image' || kind === 'video';
};
