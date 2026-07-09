import { useState } from 'react';
import styled from 'styled-components';
import LeafIcon from '@/asset/icons/LeafIcon';

function LikeButton({ initialCount, initialLiked }) {
  const [isLiked, setIsLiked] = useState(initialLiked ?? false);
  const [count, setCount] = useState(initialCount ?? 0);

  const handleClick = () => {
    // TODO: 백엔드 연동 후 API 호출로 대체
    setIsLiked((prev) => !prev);
    setCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <Wrapper>
      <Text>추천해요</Text>
      <Button $active={isLiked} onClick={handleClick}>
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