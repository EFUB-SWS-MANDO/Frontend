import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Navbar from './Navbar';

function RootLayout() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header />
      <Navbar />
      <Content>
        <Outlet />
      </Content>
      <FloatingButton onClick={() => navigate('/write')}>글쓰기 +</FloatingButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
  position: relative;
`;
const Content = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
  padding-top: calc(60px + ${({ theme }) => theme.spacing(4)}); /* 헤더 높이 + 여백 */
  padding-left: 90px; /* 사이드바(70px) + 여백 */
`;
const FloatingButton = styled.button`
  position: fixed;
  /* 시안 Development 노트: 항상 화면 하단 52px, 오른쪽 40px 위치 */
  right: 40px;
  bottom: 52px;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(5)}`};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.text};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 15;
`;

export default RootLayout;