import styled from 'styled-components';
import AuthLayout from '@/features/auth/components/AuthLayout';
import SproutLogo from '@/features/auth/components/SproutLogo';
import KakaoLoginButton from '@/features/auth/components/KakaoLoginButton';

function LoginPage() {
  return (
    <AuthLayout>
      <TitleArea>
        <Tagline>기록이 스펙이 되는 AI 커리어 아카이브 서비스</Tagline>
        <SproutLogo size="lg" />
      </TitleArea>
      <KakaoLoginButton />
    </AuthLayout>
  );
}

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export default LoginPage;
