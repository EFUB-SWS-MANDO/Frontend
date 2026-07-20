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
        <LoadingDots aria-hidden>
          <Dot />
          <Dot $delay={0.4} />
          <Dot $delay={0.8} />
        </LoadingDots>
      </LogoArea>
    </AuthLayout>
  );
}

// 시안: 점 3개(12px, 간격 8px)가 1→2→3 순서로 green500으로 바뀜
const cycle = keyframes`
  0%, 27% { background: var(--dot-active); }
  33%, 100% { background: var(--dot-base); }
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
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
