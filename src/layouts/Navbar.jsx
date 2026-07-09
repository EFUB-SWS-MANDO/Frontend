import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import GlobalIcon from '@/asset/icons/GlobalIcon';
import MagicpenIcon from '@/asset/icons/MagicpenIcon';
import UserSquareIcon from '@/asset/icons/UserSquareIcon';
import MedalStarIcon from '@/asset/icons/MedalStarIcon';

const MENUS = [
  { to: '/', label: '홈', Icon: GlobalIcon, end: true },
  { to: '/ai', label: 'AI', Icon: MagicpenIcon, end: false },
  { to: '/profile/me', label: '프로필', Icon: UserSquareIcon, end: false },
];

function Navbar() {
  const location = useLocation();
  const theme = useTheme();

  const isMyPageActive = location.pathname.startsWith('/mypage');

  return (
    <Nav>
      <MenuList>
        {MENUS.map((m) => {
          const isActive = m.end ? location.pathname === m.to : location.pathname.startsWith(m.to);
          return (
            <Item key={m.to} to={m.to} end={m.end}>
              <m.Icon
                size={24}
                variant={isActive ? 'bulk' : 'linear'}
                color={isActive ? theme.colors.primary : theme.colors.textSub}
              />
            </Item>
          );
        })}
      </MenuList>

      <BottomItem to="/mypage">
        <MedalStarIcon
          size={24}
          variant={isMyPageActive ? 'bulk' : 'linear'}
          color={isMyPageActive ? theme.colors.primary : theme.colors.textSub}
        />
      </BottomItem>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(8)} 0;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  z-index: 10;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
`;

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomItem = styled(NavLink)`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Navbar;