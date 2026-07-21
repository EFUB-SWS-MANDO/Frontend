import { NavLink } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import GlobalIcon from '@/asset/icons/GlobalIcon';
import MagicpenIcon from '@/asset/icons/MagicpenIcon';
import UserSquareIcon from '@/asset/icons/UserSquareIcon';
import MedalStarIcon from '@/asset/icons/MedalStarIcon';

const MENUS = [
  { to: '/', label: '글 목록', Icon: GlobalIcon, end: true },
  { to: '/ai', label: 'AI 활용', Icon: MagicpenIcon, end: false },
  { to: '/profile/me', label: '프로필', Icon: UserSquareIcon, end: false },
];

function Navbar() {
  const theme = useTheme();

  return (
    <Nav>
      <MenuList>
        {MENUS.map(({ to, label, Icon, end }) => (
          <Item key={to} to={to} end={end}>
            {({ isActive }) => (
              <>
                <IconWrapper>
                  <Icon
                    size={24}
                    variant={isActive ? 'bulk' : 'linear'}
                    color={isActive ? theme.colors.primary : theme.colors.textSub}
                  />
                </IconWrapper>
                <Label $active={isActive}>{label}</Label>
              </>
            )}
          </Item>
        ))}
      </MenuList>

      <BottomItem to="/mypage">
        {({ isActive }) => (
          <>
            <IconWrapper>
              <MedalStarIcon
                size={24}
                variant={isActive ? 'bulk' : 'linear'}
                color={isActive ? theme.colors.primary : theme.colors.textSub}
              />
            </IconWrapper>
            <Label $active={isActive}>마이페이지</Label>
          </>
        )}
      </BottomItem>
    </Nav>
  );
}

const NAV_WIDTH = '68px'; // pill height(36px) + padding(16px * 2)
const NAV_WIDTH_EXPANDED = '220px';

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  flex-shrink: 0;
`;

const Label = styled.span`
  display: inline-block;
  max-width: 0;
  margin-left: 0;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textSub)};
  transition: max-width 0.25s ease, opacity 0.2s ease, margin-left 0.25s ease;
`;

const itemStyle = `
  display: flex;
  align-items: flex-start;
  height: 36px;
  padding: 6px;
  align-self: stretch;
  flex-shrink: 0;
  border-radius: 9999px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--nav-hover-bg);
  }

  &.active {
    background-color: var(--nav-active-bg);
  }
`;

const Item = styled(NavLink)`
  ${itemStyle}
`;

const BottomItem = styled(NavLink)`
  ${itemStyle}
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: ${({ theme }) => theme.spacing(8)};
`;

const Nav = styled.nav`
  --nav-hover-bg: ${({ theme }) => theme.colors.gray100};
  --nav-active-bg: ${({ theme }) => theme.colors.green50};

  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: ${NAV_WIDTH};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(4)};
  border-radius: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.bg};
  overflow: hidden;
  transition: width 0.25s ease;
  z-index: 10;

  &:hover {
    width: ${NAV_WIDTH_EXPANDED};

    ${Label} {
      max-width: 160px;
      margin-left: ${({ theme }) => theme.spacing(3)};
      opacity: 1;
    }
  }
`;

export default Navbar;
