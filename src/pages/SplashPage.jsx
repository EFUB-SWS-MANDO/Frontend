import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import AuthLayout from '@/features/auth/components/AuthLayout';
import SproutLogo from '@/features/auth/components/SproutLogo';

const SPLASH_DURATION_MS = 1500;

// 로딩(스플래시): 잠시 로고를 보여준 뒤 로그인 여부에 따라 분기
function SplashPage() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isLoggedIn ? '/' : '/login', { replace: true });
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [navigate, isLoggedIn]);

  return (
    <AuthLayout>
      <SproutLogo size="lg" />
    </AuthLayout>
  );
}

export default SplashPage;
