import type { FileItem } from '@/lib/types/item';
import { viewUrl } from '@/lib/utils/urls';

export default function TextViewer({ file }: { file: FileItem }) {
  return (
    <iframe
      src={viewUrl(file.relativePath)}
      title={file.name}
      className="w-full h-full py-16 px-6 md:px-20 bg-dark-950"
      onClick={(e) => e.stopPropagation()}
    />
  );
}
