import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import RootLayout from '@/layouts/RootLayout';
import SplashPage from '@/pages/SplashPage';
import LoginPage from '@/pages/LoginPage';
import TermsPage from '@/pages/TermsPage';
import ProfileSetupPage from '@/pages/ProfileSetupPage';
import HomePage from '@/pages/HomePage';
import PostDetailPage from '@/pages/PostDetailPage';
import PostWritePage from '@/pages/PostWritePage';
import MyPage from '@/pages/MyPage';
import ProfilePage from '@/pages/ProfilePage';
import AiHomePage from '@/pages/ai/AiHomePage';
import CoverLetterPage from '@/pages/ai/CoverLetterPage';
import InterviewPage from '@/pages/ai/InterviewPage';

// 미로그인 상태로 루트 진입 시 스플래시(온보딩)부터 시작
function HomeGate() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  return isLoggedIn ? <HomePage /> : <Navigate to="/splash" replace />;
}

export const router = createBrowserRouter([
  { path: '/splash', element: <SplashPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup/terms', element: <TermsPage /> },
  { path: '/signup/profile', element: <ProfileSetupPage /> },
  {
    path: '/',
    element: <RootLayout />, // 네비게이션 바 + Outlet
    children: [
      { index: true, element: <HomeGate /> },
      { path: 'posts/:postId', element: <PostDetailPage /> },
      { path: 'write', element: <PostWritePage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'profile/:userId', element: <ProfilePage /> },
      {
        path: 'ai',
        children: [
          { index: true, element: <AiHomePage /> },
          { path: 'cover-letter', element: <CoverLetterPage /> },
          { path: 'interview', element: <InterviewPage /> },
        ],
      },
    ],
  },
]);