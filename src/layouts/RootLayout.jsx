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
      <FloatingButton onClick={() => navigate('/write')}>+</FloatingButton>
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
  right: 20px;
  bottom: 20px;
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 28px;
  z-index: 15;
`;

export default RootLayout;