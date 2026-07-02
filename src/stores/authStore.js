import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      user: null, // { id, nickname, profileImage }
      isLoggedIn: false,
      setAuth: ({ accessToken, user }) =>
        set({ accessToken, user, isLoggedIn: true }),
      logout: () => set({ accessToken: null, user: null, isLoggedIn: false }),
    }),
    { name: 'sprout-auth' },
  ),
);
