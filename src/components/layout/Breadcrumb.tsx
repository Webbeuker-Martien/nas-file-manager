import { buildBreadcrumb } from '@/lib/utils/breadcrumb';

type Props = {
  path: string;
  onNavigate: (path: string) => void;
};

export default function Breadcrumb({ path, onNavigate }: Props) {
  const crumbs = buildBreadcrumb(path);

  return (
    <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar text-sm text-dark-50">
      <button onClick={() => onNavigate('/')} className="shrink-0 hover:text-white transition-colors px-1">
        Home
      </button>

      {crumbs.map((crumb, i) => (
        <span key={crumb.path} className="flex items-center gap-1 shrink-0">
          <span className="opacity-40">/</span>
          <button
            onClick={() => onNavigate(crumb.path)}
            className={`px-1 hover:text-white transition-colors ${i === crumbs.length - 1 ? 'text-white font-medium' : ''}`}
          >
            {crumb.name}
          </button>
        </span>
      ))}
    </nav>
  );
}
