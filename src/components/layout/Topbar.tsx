import BackButton from '@/components/layout/BackButton';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { logout } from '@/lib/api/auth';
import { LogOut } from 'lucide-react';

type Props = {
  path: string;
  onNavigate: (path: string) => void;
  onLoggedOut: () => void;
};

export default function Topbar({ path, onNavigate, onLoggedOut }: Props) {
  const handleLogout = async () => {
    await logout();
    onLoggedOut();
  };

  return (
    <header className="bg-dark-900 border-b border-dark-800 px-3 md:px-6 h-topbar flex items-center gap-3 fixed top-0 left-0 right-0 z-40">
      <BackButton path={path} onNavigate={onNavigate} />
      <div className="min-w-0 flex-1">
        <Breadcrumb path={path} onNavigate={onNavigate} />
      </div>
      <button
        onClick={handleLogout}
        aria-label="Log out"
        className="p-1 rounded-lg hover:bg-dark-800 transition-colors shrink-0 text-dark-50"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </header>
  );
}
