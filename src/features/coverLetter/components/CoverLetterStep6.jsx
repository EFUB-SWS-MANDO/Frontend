import { useState } from 'react';
import styled from 'styled-components';
import CopyIcon from '../../../asset/icons/CopyIcon';
import SaveIcon from '../../../asset/icons/SaveIcon';

const SAVED_FLASH_MS = 1500;

const CoverLetterStep6 = ({ index, question, draft }) => {
  const [showSaved, setShowSaved] = useState(false);

  const handleCopy = () => {
    if (!draft) return;
    navigator.clipboard.writeText(draft.content);
  };

  const handleSave = () => {
    // 생성 시점에 이미 저장되므로 별도 API 호출 없이 저장 완료 표시만 보여줌
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), SAVED_FLASH_MS);
  };

  return (
    <StepWrapper>
      <QuestionTitle>
        {index + 1}. {question.content} ({question.maxLength}자)
      </QuestionTitle>

      <DraftBox>{draft?.content}</DraftBox>

      <ExplanationBox>{draft?.explanation}</ExplanationBox>

      <ActionRow>
        <ActionButton onClick={handleCopy}>
          <CopyIcon color="#9197AC" size={20} />
          복사하기
        </ActionButton>
        <ActionButton onClick={handleSave}>
          <SaveIcon color="#9197AC" size={20} />
          {showSaved ? '저장됨' : '저장하기'}
        </ActionButton>
      </ActionRow>
    </StepWrapper>
  );
};

export default CoverLetterStep6;

const StepWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const QuestionTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const DraftBox = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
  min-height: 90px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;

const ExplanationBox = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
  min-height: 90px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.5;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(6)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;
