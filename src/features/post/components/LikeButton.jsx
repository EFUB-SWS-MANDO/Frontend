import styled from 'styled-components';
import LeafIcon from '@/asset/icons/LeafIcon';
import { useLike } from '@/features/post/api/useLike';

function LikeButton({ postId, initialCount, initialLiked }) {
  const { isLiked, count, toggleLike } = useLike(postId, initialLiked ?? false, initialCount ?? 0);

  return (
    <Wrapper>
      <Text>추천해요</Text>
      <Button type="button" onClick={toggleLike} aria-pressed={isLiked}>
        <LeafIcon color={isLiked ? '#4CAF50' : '#6B7280'} size={20} />
        <Count $active={isLiked}>{count}</Count>
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
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const Count = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $active, theme }) => ($active ? '#4CAF50' : theme.colors.text)};
`;

export default LikeButton;