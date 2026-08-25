import type { FileItem } from '@/lib/types/item';
import { viewUrl } from '@/lib/utils/urls';

export default function PdfViewer({ file }: { file: FileItem }) {
  return (
    <iframe
      src={viewUrl(file.relativePath)}
      title={file.name}
      className="w-full h-full"
      onClick={(e) => e.stopPropagation()}
    />
  );
}
