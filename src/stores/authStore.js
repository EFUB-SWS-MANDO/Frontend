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

// localStorage 복원(rehydrate)은 store 생성 도중 동기적으로 끝날 수도 있고, 실패하거나
// (JSON 파싱 에러) storage 자체에 접근 못 해 시도조차 안 될 수도 있음(zustand persist는
// storage가 없으면 onRehydrateStorage를 아예 호출하지 않음) — 그 어떤 경우에도 마운트 직후
// accessToken을 읽는 코드가 복원 전 상태를 보지 않도록 한 틱 뒤에 무조건 완료 처리한다.
queueMicrotask(() => useAuthStore.setState({ hasHydrated: true }));
