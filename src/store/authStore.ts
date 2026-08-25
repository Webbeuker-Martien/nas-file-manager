import { create } from 'zustand';

import { checkStatus } from '@/lib/api/auth';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

type AuthState = {
  status: AuthStatus;
  check: () => Promise<void>;
  setAuthenticated: () => void;
  setUnauthenticated: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  status: 'checking',

  check: async () => {
    const ok = await checkStatus();
    set({ status: ok ? 'authenticated' : 'unauthenticated' });
  },

  setAuthenticated: () => set({ status: 'authenticated' }),
  setUnauthenticated: () => set({ status: 'unauthenticated' }),
}));
