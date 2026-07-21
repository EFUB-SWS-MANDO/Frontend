import { useEffect } from 'react';
import styled from 'styled-components';
import TickCircleBulkIcon from '@/asset/icons/TickCircleBulkIcon';

function CompletionToast({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <Overlay>
      <Card>
        <TickCircleBulkIcon color="#00BF63" size={50} />
        <Text>글 작성이 완료되었어요!</Text>
      </Card>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.15);
  z-index: 100;
`;

const Card = styled.div`
  width: 407px;
  max-width: calc(100vw - ${({ theme }) => theme.spacing(8)});
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export default CompletionToast;