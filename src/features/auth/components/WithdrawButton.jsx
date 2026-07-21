import { useState } from 'react';
import styled from 'styled-components';
import { useWithdraw } from '@/features/auth/api/useWithdraw';

function WithdrawButton() {
  const [isConfirming, setIsConfirming] = useState(false);
  const { withdraw, isWithdrawing, error } = useWithdraw();

  if (!isConfirming) {
    return (
      <Wrapper>
        <TextButton type="button" onClick={() => setIsConfirming(true)}>
          회원 탈퇴
        </TextButton>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ConfirmText>
        탈퇴하면 모든 기록이 삭제되며 되돌릴 수 없어요. 정말 탈퇴할까요?
      </ConfirmText>
      <ButtonRow>
        <TextButton type="button" onClick={() => setIsConfirming(false)}>
          취소
        </TextButton>
        <DangerButton
          type="button"
          disabled={isWithdrawing}
          onClick={withdraw}
        >
          {isWithdrawing ? '처리 중...' : '탈퇴하기'}
        </DangerButton>
      </ButtonRow>
      {error && <ErrorText>탈퇴에 실패했어요. 다시 시도해 주세요.</ErrorText>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(10)};
  padding-bottom: ${({ theme }) => theme.spacing(6)};
`;

const TextButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ConfirmText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const DangerButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.error};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:disabled {
    opacity: 0.5;
  }
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`;

export default WithdrawButton;
