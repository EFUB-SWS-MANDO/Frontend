import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Navbar from './Navbar';
import WriteFabMenu from './WriteFabMenu';

const WRITE_FAB_PATHS = [/^\/$/, /^\/profile\//];

function RootLayout() {
  const { pathname } = useLocation();
  const showWriteFab = WRITE_FAB_PATHS.some((pattern) => pattern.test(pathname));

  return (
    <Wrapper>
      <Header />
      <Navbar />
      <Content>
        <Outlet />
      </Content>
      {showWriteFab && <WriteFabMenu />}
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
export default RootLayout;