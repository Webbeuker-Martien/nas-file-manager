import { Download, File as FileIcon } from 'lucide-react';

import type { FileItem } from '@/lib/types/item';
import { downloadUrl } from '@/lib/utils/urls';

export default function DownloadFallback({ file }: { file: FileItem }) {
  return (
    <div className="m-auto flex flex-col items-center gap-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
      <FileIcon className="w-20 h-20 opacity-50" />
      <p className="text-lg">{file.name}</p>
      <p className="text-sm text-dark-50">This file type can't be previewed</p>
      <a
        href={downloadUrl(file.relativePath)}
        className="flex items-center gap-2 bg-dark-900 border border-dark-800 px-5 py-2.5 rounded-lg hover:border-dark-700 transition-colors"
      >
        <Download className="w-4 h-4" />
        Download
      </a>
    </div>
  );
}
