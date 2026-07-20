import styled from 'styled-components';
import AuthLayout from '@/features/auth/components/AuthLayout';
import SproutLogo from '@/features/auth/components/SproutLogo';
import KakaoLoginButton from '@/features/auth/components/KakaoLoginButton';

function LoginPage() {
  return (
    <AuthLayout>
      <Content>
        <TitleArea>
          <Tagline>기록이 스펙이 되는 AI 커리어 아카이브 서비스</Tagline>
          <SproutLogo size="lg" />
        </TitleArea>
        <KakaoLoginButton />
      </Content>
    </AuthLayout>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 94px;
  width: 384px;
  max-width: 100%;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default LoginPage;
