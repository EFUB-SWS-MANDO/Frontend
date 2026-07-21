import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '@/features/auth/components/AuthLayout';
import SproutLogo from '@/features/auth/components/SproutLogo';
import Spinner from '@/components/Spinner/Spinner';
import { useKakaoSignIn } from '@/features/auth/api/useKakaoSignIn';

function KakaoCallbackPage() {
  const navigate = useNavigate();
  const { error } = useKakaoSignIn();

  return (
    <AuthLayout>
      <Content>
        <SproutLogo size="md" />
        {error ? (
          <>
            <Message>로그인에 실패했어요. 다시 시도해 주세요.</Message>
            <RetryButton type="button" onClick={() => navigate('/login', { replace: true })}>
              로그인 화면으로 돌아가기
            </RetryButton>
          </>
        ) : (
          <>
            <Spinner />
            <Message>로그인 중이에요...</Message>
          </>
        )}
      </Content>
    </AuthLayout>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(6)};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSub};
`;

const RetryButton = styled.button`
  height: 52px;
  padding: ${({ theme }) => `0 ${theme.spacing(8)}`};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default KakaoCallbackPage;
