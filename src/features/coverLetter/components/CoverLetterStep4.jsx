import { useState } from 'react';
import styled from 'styled-components';
import DraftQuestionCard from './DraftQuestionCard';

const CoverLetterStep4 = ({ questions, draftAnswers, onSelectQuestion, onRestart, onFinish }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const isAllSelected =
    questions.length > 0 && selectedIds.length === questions.length;

  const handleToggleSelectAll = () => {
    setSelectedIds(isAllSelected ? [] : questions.map((question) => question.id));
  };

  const handleCopy = (id) => {
    const draft = draftAnswers[id];
    if (!draft) return;
    navigator.clipboard.writeText(draft.content);
  };

  const handleSave = () => {
    // TODO: 백엔드 연동 시 자소서 저장 API 요청
  };

  return (
    <StepWrapper>
      <GuideArea>
        <GuideText>초안 작성이 완료되었어요!</GuideText>
        <SubRow>
          <SubText>클릭하면 답변의 상세 설명을 확인할 수 있어요.</SubText>
          <SelectAllButton onClick={handleToggleSelectAll}>
            {isAllSelected ? '모두 해제' : '모두 선택'}
          </SelectAllButton>
        </SubRow>
      </GuideArea>

      <DraftList>
        {questions.map((question, index) => (
          <DraftQuestionCard
            key={question.id}
            index={index}
            question={question}
            draft={draftAnswers[question.id]}
            selected={selectedIds.includes(question.id)}
            onSelect={onSelectQuestion}
            onCopy={handleCopy}
            onSave={handleSave}
          />
        ))}
      </DraftList>

      <BottomArea>
        <SecondaryButton onClick={onRestart}>다시 작성하기</SecondaryButton>
        <PrimaryButton onClick={onFinish}>끝내기</PrimaryButton>
      </BottomArea>
    </StepWrapper>
  );
};

export default CoverLetterStep4;

const StepWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

const GuideArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const GuideText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const SubRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const SelectAllButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSub};
  padding: 0;
`;

const DraftList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
  overflow-y: auto;
`;

const BottomArea = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  width: 100%;
`;

const SecondaryButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3.5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textSub};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PrimaryButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3.5)};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
