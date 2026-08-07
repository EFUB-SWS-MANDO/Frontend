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
    {
      name: 'sprout-auth',
      // localStorage 복원도 내부적으로 비동기라, 마운트 직후 accessToken을 읽는
      // 코드가 복원 완료 전에 null을 볼 수 있음 (persist rehydrate race).
      // 이 콜백은 store 생성(create()) 도중 동기적으로 실행될 수 있어 외부 useAuthStore
      // 바인딩이 아직 TDZ임 — queueMicrotask로 한 틱 미뤄서 안전하게 참조.
      // 성공/실패(rehydrate 에러) 양쪽 다 이 콜백이 호출되므로 실패해도 hasHydrated는 true가 됨
      // (그래야 토큰 없이도 로딩이 영원히 멈추지 않고 정상적인 비로그인 상태로 넘어감).
      onRehydrateStorage: () => () => {
        queueMicrotask(() => useAuthStore.setState({ hasHydrated: true }));
      },
    },
  ),
);
