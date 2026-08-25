import { useEffect, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import { useViewerStore } from '@/store/viewerStore';
import { kindOf } from '@/lib/utils/fileKind';

import ImageViewer from '@/components/viewer/ImageViewer';
import VideoPlayer from '@/components/viewer/VideoPlayer';
import AudioPlayer from '@/components/viewer/AudioPlayer';
import PdfViewer from '@/components/viewer/PdfViewer';
import TextViewer from '@/components/viewer/TextViewer';
import DownloadFallback from '@/components/viewer/DownloadFallback';
import { useViewerNavigation } from '@/components/viewer/useViewerNavigation';

const CONTROLS_HIDE_DELAY_MS = 3000;

export default function Viewer() {
  const items = useViewerStore((s) => s.items);
  const index = useViewerStore((s) => s.index);
  const next = useViewerStore((s) => s.next);
  const prev = useViewerStore((s) => s.prev);
  const close = useViewerStore((s) => s.close);

  const isOpen = index !== null;
  const file = isOpen ? items[index] : null;

  const [controlsHidden, setControlsHidden] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { onTouchStart, onTouchEnd } = useViewerNavigation(isOpen);

  const showControls = () => {
    setControlsHidden(false);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsHidden(true), CONTROLS_HIDE_DELAY_MS);
  };

  useEffect(() => {
    if (!isOpen) return;

    document.documentElement.style.overflow = 'hidden';
    showControls();

    return () => {
      document.documentElement.style.overflow = '';
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index]);

  if (!isOpen || !file) return null;

  const kind = kindOf(file.ext);

  return (
    <div
      className="fixed inset-0 z-50 bg-dark-950"
      onClick={close}
      onMouseMove={showControls}
      onTouchStart={onTouchStart}
      onTouchEnd={(e) => {
        onTouchEnd(e);
        showControls();
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        aria-label="Close"
        className={`absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 rounded-full bg-black/40 transition-opacity duration-200 ${controlsHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <X className="w-6 h-6" />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 transition-opacity duration-200 ${controlsHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 transition-opacity duration-200 ${controlsHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </>
      )}

      <div className="w-full h-full">
        {kind === 'image' && <ImageViewer file={file} />}
        {kind === 'video' && <VideoPlayer key={file.relativePath} file={file} controlsHidden={controlsHidden} />}
        {kind === 'audio' && <AudioPlayer file={file} />}
        {kind === 'pdf' && <PdfViewer file={file} />}
        {kind === 'text' && <TextViewer file={file} />}
        {kind === null && <DownloadFallback file={file} />}
      </div>
    </div>
  );
}
