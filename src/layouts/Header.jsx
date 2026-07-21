import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '@/stores/authStore';
import { useLogout } from '@/features/auth/api/useLogout';

function Header() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { logout, isLoggingOut } = useLogout();

  return (
    <Wrapper>
      <Logo to="/">SPROUT</Logo>
      <UserInfo>
        {user?.profileImage ? (
          <Avatar src={user.profileImage} alt={`${user?.nickname} 프로필`} />
        ) : (
          <AvatarPlaceholder />
        )}
        <Nickname>{user?.nickname ?? '게스트'}</Nickname>
        {isLoggedIn && (
          <LogoutButton type="button" disabled={isLoggingOut} onClick={logout}>
            로그아웃
          </LogoutButton>
        )}
      </UserInfo>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing(6)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  z-index: 20;
`;

const Logo = styled(NavLink)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radius.full};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const AvatarPlaceholder = styled.div`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Nickname = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const LogoutButton = styled.button`
  margin-left: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.bgSub};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export default Header;