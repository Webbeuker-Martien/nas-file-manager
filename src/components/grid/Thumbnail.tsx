import { useState } from 'react';

import { File as FileIcon, Folder } from 'lucide-react';

import type { FileItem } from '@/lib/types/item';
import { isThumbnailable } from '@/lib/utils/fileKind';
import { thumbUrl } from '@/lib/utils/urls';

type Props = {
  file: FileItem;
};

/** Three-tier fallback: generated thumbnail -> per-extension icon -> generic file icon. */
export default function Thumbnail({ file }: Props) {
  const [stage, setStage] = useState<'thumb' | 'ext-icon' | 'generic'>(
    isThumbnailable(file.ext) ? 'thumb' : 'ext-icon'
  );

  if (stage === 'thumb') {
    return (
      <img
        src={thumbUrl(file.relativePath, 'md')}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover"
        onError={() => setStage('ext-icon')}
      />
    );
  }

  if (stage === 'ext-icon') {
    return (
      <img
        src={`/images/icons/extensions/${file.ext.replace('.', '')}.svg`}
        alt=""
        className="w-10 h-10 opacity-75"
        onError={() => setStage('generic')}
      />
    );
  }

  return <FileIcon className="w-10 h-10 opacity-50" />;
}

export function FolderIcon() {
  return <Folder className="w-10 h-10 opacity-75" />;
}
