import styled from 'styled-components';
import LeafIcon from '@/asset/icons/LeafIcon';
import { useLike } from '@/features/post/api/useLike';

function LikeButton({ postId, initialCount, initialLiked }) {
  const { isLiked, count, toggleLike } = useLike(postId, initialLiked ?? false, initialCount ?? 0);

  return (
    <Wrapper>
      <Text>추천해요</Text>
      <Button
        $active={isLiked}
        onClick={toggleLike}
        aria-pressed={isLiked}
        aria-label={isLiked ? '추천 취소' : '추천하기'}
      >
        <LeafIcon color={isLiked ? '#4CAF50' : '#6B7280'} size={16} />
        {count}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)} 0 ${({ theme }) => theme.spacing(6)};
`;

const Text = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSub};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(5)};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.bg} !important;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
`;

export default LikeButton;