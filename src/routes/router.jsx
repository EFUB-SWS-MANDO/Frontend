import { createBrowserRouter } from 'react-router-dom';
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
import InterviewSelectPage from '@/pages/ai/InterviewSelectPage';
import InterviewSessionPage from '@/pages/ai/InterviewSessionPage';
import InterviewResultPage from '@/pages/ai/InterviewResultPage';

export const router = createBrowserRouter([
  { path: '/splash', element: <SplashPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup/terms', element: <TermsPage /> },
  { path: '/signup/profile', element: <ProfileSetupPage /> },
  {
    path: '/',
    element: <RootLayout />, // 네비게이션 바 + Outlet
    children: [
      { index: true, element: <HomePage /> },
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
          { path: 'interview/select/:mode', element: <InterviewSelectPage /> },
          { path: 'interview/session', element: <InterviewSessionPage /> },
          { path: 'interview/result', element: <InterviewResultPage /> },
        ],
      },
    ],
  },
]);
