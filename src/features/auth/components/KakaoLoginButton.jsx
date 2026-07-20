import styled from 'styled-components';
import { useKakaoLogin } from '@/features/auth/api/useKakaoLogin';

function KakaoLoginButton() {
  const { loginWithKakao } = useKakaoLogin();

  return (
    <StyledButton type="button" onClick={loginWithKakao}>
      카카오로 시작하기
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 52px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.kakao};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export default KakaoLoginButton;
