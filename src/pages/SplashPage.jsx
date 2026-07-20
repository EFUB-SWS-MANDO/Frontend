import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
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
      <LogoArea>
        <SproutLogo size="lg" />
        <LoadingDot aria-hidden />
      </LogoArea>
    </AuthLayout>
  );
}

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const LoadingDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primary};
  animation: ${pulse} 1s ease-in-out infinite;
`;

export default SplashPage;
