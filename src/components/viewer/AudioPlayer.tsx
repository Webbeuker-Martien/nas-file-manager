import { Music } from 'lucide-react';

import type { FileItem } from '@/lib/types/item';
import { viewUrl } from '@/lib/utils/urls';

export default function AudioPlayer({ file }: { file: FileItem }) {
  return (
    <div className="m-auto flex flex-col items-center gap-6 px-6" onClick={(e) => e.stopPropagation()}>
      <Music className="w-20 h-20 opacity-50" />
      <p className="text-lg text-center">{file.name}</p>
      <audio key={file.relativePath} controls autoPlay className="w-full max-w-md">
        <source src={viewUrl(file.relativePath)} type={file.mime} />
      </audio>
    </div>
  );
}
