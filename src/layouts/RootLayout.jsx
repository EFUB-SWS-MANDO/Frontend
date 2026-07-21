import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Navbar from './Navbar';
import WriteFabMenu from './WriteFabMenu';

function RootLayout() {
  return (
    <Wrapper>
      <Header />
      <Navbar />
      <Content>
        <Outlet />
      </Content>
      <WriteFabMenu />
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
  padding-top: calc(60px + ${({ theme }) => theme.spacing(4)});
`;
export default RootLayout;
