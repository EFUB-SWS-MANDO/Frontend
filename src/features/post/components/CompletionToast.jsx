import { useEffect } from 'react';
import styled from 'styled-components';

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
        <CheckCircle>✓</CheckCircle>
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
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const CheckCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export default CompletionToast;