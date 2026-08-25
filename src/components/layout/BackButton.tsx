import { ChevronLeft } from 'lucide-react';

type Props = {
  path: string;
  onNavigate: (path: string) => void;
};

export default function BackButton({ path, onNavigate }: Props) {
  if (path === '/') return null;

  const parent = '/' + path.split('/').filter(Boolean).slice(0, -1).join('/');

  return (
    <button
      onClick={() => onNavigate(parent)}
      aria-label="Back"
      className="p-1 -ml-1 rounded-lg hover:bg-dark-800 transition-colors shrink-0"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}
