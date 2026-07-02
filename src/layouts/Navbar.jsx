import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const MENUS = [
  { to: '/', label: '홈' },
  { to: '/ai', label: 'AI' },
  { to: '/profile/me', label: '프로필' },
  { to: '/mypage', label: '마이' },
];

function Navbar() {
  return (
    <Nav>
      {MENUS.map((m) => (
        <Item key={m.to} to={m.to} end={m.to === '/'}>
          {m.label}
        </Item>
      ))}
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
`;
const Item = styled(NavLink)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.sm};
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

export default Navbar;
