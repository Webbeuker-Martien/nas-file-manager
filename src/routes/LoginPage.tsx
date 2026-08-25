import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { login } from '@/lib/api/auth';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string } | null)?.from ?? '/browse';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(password);
      setAuthenticated();
      navigate(from, { replace: true });
    } catch {
      setError('Incorrect password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-3">
        <h1 className="text-xl font-semibold mb-2">Sign in</h1>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="text-lg w-full bg-dark-900 border border-dark-800 rounded-lg px-4 py-3 outline-none focus:border-dark-700"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting || password === ''}
          className="bg-dark-900 border border-dark-800 px-10 py-3 rounded-lg hover:border-dark-700 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
