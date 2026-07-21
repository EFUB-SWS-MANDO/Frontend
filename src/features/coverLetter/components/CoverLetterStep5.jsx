import styled from 'styled-components';
import CopyIcon from '../../../asset/icons/CopyIcon';
import SaveIcon from '../../../asset/icons/SaveIcon';

const CoverLetterStep5 = ({ index, question, draft }) => {
  const handleCopy = () => {
    if (!draft) return;
    navigator.clipboard.writeText(draft.content);
  };

  const handleSave = () => {
    // TODO: 백엔드 연동 시 자소서 저장 API 요청
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
          저장하기
        </ActionButton>
      </ActionRow>
    </StepWrapper>
  );
};

export default CoverLetterStep5;

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
