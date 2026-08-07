import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null, // { id, nickname, profileImage }
      isLoggedIn: false,
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
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
    {
      name: 'sprout-auth',
      // localStorage 복원도 내부적으로 비동기라, 마운트 직후 accessToken을 읽는
      // 코드가 복원 완료 전에 null을 볼 수 있음 (persist rehydrate race).
      // 콜백은 store 생성(create()) 도중 동기적으로 실행될 수 있어 외부 useAuthStore
      // 바인딩은 아직 TDZ임 — 콜백 인자로 오는 state(get() 결과)의 액션을 써야 함.
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
