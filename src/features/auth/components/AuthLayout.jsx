import styled from 'styled-components';

// 온보딩(스플래시/로그인/약관/정보설정) 공통 중앙 정렬 레이아웃
function AuthLayout({ children }) {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.bg};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(8)};
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
`;

export default AuthLayout;
