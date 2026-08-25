import { useRef, useState } from 'react';

import { Maximize, Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react';

import type { FileItem } from '@/lib/types/item';
import { viewUrl } from '@/lib/utils/urls';

type Props = {
  file: FileItem;
  controlsHidden: boolean;
};

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function VideoPlayer({ file, controlsHidden }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState<[number, number][]>([]);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrent(video.currentTime);

    const ranges: [number, number][] = [];
    for (let i = 0; i < video.buffered.length; i++) {
      ranges.push([video.buffered.start(i), video.buffered.end(i)]);
    }
    setBuffered(ranges);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Number(e.target.value);
    setCurrent(Number(e.target.value));
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const next = Number(e.target.value);
    video.volume = next;
    video.muted = next === 0;
    setVolume(next);
    setMuted(next === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else video.requestFullscreen();
  };

  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
      <video
        ref={videoRef}
        key={file.relativePath}
        className="max-w-full max-h-full m-auto"
        autoPlay
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          const video = videoRef.current;
          if (video) {
            video.currentTime = 0;
            video.play();
          }
        }}
      >
        <source src={viewUrl(file.relativePath)} type={file.mime} />
      </video>

      <div
        className={`absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-200 ${controlsHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="relative h-1.5 rounded-full bg-white/20 overflow-hidden">
          {duration > 0 &&
            buffered.map(([start, end], i) => (
              <div
                key={i}
                className="absolute inset-y-0 bg-white/40"
                style={{ left: `${(start / duration) * 100}%`, width: `${((end - start) / duration) * 100}%` }}
              />
            ))}
          {duration > 0 && (
            <div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${(current / duration) * 100}%` }} />
          )}
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          <span className="text-xs tabular-nums text-dark-50">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          <div className="flex items-center gap-1.5 ml-2">
            <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
              <VolumeIcon className="w-5 h-5" />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={handleVolume}
              className="w-16 accent-white cursor-pointer"
            />
          </div>

          <button onClick={toggleFullscreen} aria-label="Fullscreen" className="ml-auto">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
