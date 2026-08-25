import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';

export default function ProtectedRoute() {
  const status = useAuthStore((s) => s.status);
  const check = useAuthStore((s) => s.check);
  const location = useLocation();

  useEffect(() => {
    if (status === 'checking') check();
  }, [status, check]);

  if (status === 'checking') {
    return <div className="min-h-dvh flex items-center justify-center text-dark-50">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />;
  }

  return <Outlet />;
}
