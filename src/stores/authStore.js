import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null, // { id, nickname, profileImage }
      isLoggedIn: false,
      setAuth: ({ accessToken, refreshToken, user }) =>
        set((state) => ({
          accessToken: accessToken ?? state.accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
          user: user ?? state.user,
          isLoggedIn: true,
        })),
      setAccessToken: (accessToken) => set({ accessToken }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isLoggedIn: false,
        }),
    }),
    { name: 'sprout-auth' },
  ),
);
