import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';
import PostDetailPage from '@/pages/PostDetailPage';
import PostWritePage from '@/pages/PostWritePage';
import MyPage from '@/pages/MyPage';
import ProfilePage from '@/pages/ProfilePage';
import AiHomePage from '@/pages/ai/AiHomePage';
import CoverLetterPage from '@/pages/ai/CoverLetterPage';
import InterviewPage from '@/pages/ai/InterviewPage';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
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
        ],
      },
    ],
  },
]);