import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  setAuth: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
  token: localStorage.getItem('access_token'),
  
  setAuth: (user, token) => {
    localStorage.setItem('auth_user', JSON.stringify(user));
    localStorage.setItem('access_token', token);
    set({ user, token });
  },
  
  logout: () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('access_token');
    set({ user: null, token: null });
  },
}));
