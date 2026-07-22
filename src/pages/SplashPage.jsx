import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuthStore } from '@/stores/authStore';
import AuthLayout from '@/features/auth/components/AuthLayout';
import SproutLogo from '@/features/auth/components/SproutLogo';

const SPLASH_DURATION_MS = 1500;

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
        <LoadingDots aria-hidden>
          <Dot />
          <Dot $delay={0.4} />
          <Dot $delay={0.8} />
        </LoadingDots>
      </LogoArea>
    </AuthLayout>
  );
}

const cycle = keyframes`
  0%, 27% { background: var(--dot-active); }
  33%, 100% { background: var(--dot-base); }
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(8)};
`;

const LoadingDots = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Dot = styled.span`
  --dot-base: ${({ theme }) => theme.colors.green100};
  --dot-active: ${({ theme }) => theme.colors.green500};
  width: 12px;
  height: 12px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: var(--dot-base);
  animation: ${cycle} 1.2s infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
`;

export default SplashPage;
