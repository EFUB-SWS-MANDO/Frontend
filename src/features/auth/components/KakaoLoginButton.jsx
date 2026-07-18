import styled from 'styled-components';
import { useKakaoLogin } from '@/features/auth/api/useKakaoLogin';

function KakaoLoginButton() {
  const { loginWithKakao } = useKakaoLogin();

  return (
    <StyledButton type="button" onClick={loginWithKakao}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path
          d="M9 1.5C4.58 1.5 1 4.31 1 7.78c0 2.22 1.47 4.17 3.68 5.28l-.94 3.46c-.08.3.26.54.52.37l4.1-2.72c.21.02.42.03.64.03 4.42 0 8-2.81 8-6.42S13.42 1.5 9 1.5Z"
          fill="currentColor"
        />
      </svg>
      카카오로 시작하기
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3.5)};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.kakao};
  color: ${({ theme }) => theme.colors.kakaoText};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default KakaoLoginButton;
