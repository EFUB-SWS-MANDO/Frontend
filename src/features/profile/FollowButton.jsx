import styled from 'styled-components';

function FollowButton({ isFollowing, onClick }) {
  return (
    <Button $active={isFollowing} onClick={onClick}>
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
}

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.primary} !important;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.bg : theme.colors.primary)} !important;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.bg)};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
`;

export default FollowButton;