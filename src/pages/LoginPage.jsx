import styled, { useTheme } from 'styled-components';
import AuthLayout from '@/features/auth/components/AuthLayout';
import LeafIcon from '@/asset/icons/LeafIcon';
import wordmark from '@/asset/sprout-wordmark.svg';
import KakaoLoginButton from '@/features/auth/components/KakaoLoginButton';

function LoginPage() {
  const theme = useTheme();

  return (
    <AuthLayout>
      <Content>
        <TitleArea>
          <LeafIcon size={59} color={theme.colors.primary} />
          <Tagline>기록이 스펙이 되는 AI 커리어 아카이브 서비스</Tagline>
          <Wordmark src={wordmark} alt="SPROUT" />
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
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: ${22 / 18};
`;

const Wordmark = styled.img`
  height: 33px;
`;

export default LoginPage;
