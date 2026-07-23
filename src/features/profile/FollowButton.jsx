import styled from 'styled-components';

function FollowButton({ isFollowing, onClick, disabled }) {
  return (
    <Button $active={isFollowing} onClick={onClick} disabled={disabled}>
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
}

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.bg : theme.colors.primary)};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.bg)};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default FollowButton;