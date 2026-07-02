import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';

function RootLayout() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Content>
        <Outlet />
      </Content>
      <FloatingButton onClick={() => navigate('/write')}>+</FloatingButton>
      <Navbar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
  padding-bottom: 60px; /* 네비게이션 바 높이 */
  position: relative;
`;
const Content = styled.main`
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;
const FloatingButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 28px;
`;

export default RootLayout;
