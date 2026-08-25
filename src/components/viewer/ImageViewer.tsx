import type { FileItem } from '@/lib/types/item';
import { viewUrl } from '@/lib/utils/urls';

export default function ImageViewer({ file }: { file: FileItem }) {
  return (
    <img
      src={viewUrl(file.relativePath)}
      alt={file.name}
      className="max-w-full max-h-full m-auto object-contain"
      onClick={(e) => e.stopPropagation()}
    />
  );
}
