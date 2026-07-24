import styled from 'styled-components';

function FollowButton({ isFollowing, onClick }) {
  return (
    <Button $active={isFollowing} onClick={onClick}>
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
}

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgSub};
  }
`;

export default FollowButton;