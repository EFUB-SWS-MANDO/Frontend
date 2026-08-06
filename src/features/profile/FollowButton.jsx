import styled from 'styled-components';

function FollowButton({ isFollowing, onClick, disabled }) {
  return (
    <Button $active={isFollowing} onClick={onClick} disabled={disabled}>
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
}

const Button = styled.button`
  height: 34px;
  padding: 0 ${({ theme }) => theme.spacing(3.5)};
  border-radius: ${({ theme }) => theme.radius.full};
  border: ${({ $active, theme }) => ($active ? 'none' : `1px solid ${theme.colors.border}`)};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.bg)};
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.text)};
  box-shadow: 0 1px 1.5px rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.04);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background-color: ${({ $active, theme }) => ($active ? theme.colors.primaryDark : theme.colors.bgSub)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default FollowButton;