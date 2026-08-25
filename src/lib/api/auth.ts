import client from '@/lib/api/client';

export const login = async (password: string): Promise<void> => {
  await client.post('/auth/login', { password });
};

export const logout = async (): Promise<void> => {
  await client.post('/auth/logout');
};

export const checkStatus = async (): Promise<boolean> => {
  try {
    await client.get('/auth/status');
    return true;
  } catch {
    return false;
  }
};
