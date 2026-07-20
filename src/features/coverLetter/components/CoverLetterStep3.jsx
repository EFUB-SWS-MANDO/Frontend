import styled from 'styled-components';
import MagicpenIcon from '../../../asset/icons/MagicpenIcon';
import QuestionInputCard from './QuestionInputCard';

const MAX_QUESTIONS = 5;

const CoverLetterStep3 = ({ questions, setQuestions, onNext }) => {
  const handleAddQuestion = () => {
    if (questions.length >= MAX_QUESTIONS) return;
    setQuestions((prev) => [
      ...prev,
      { id: Date.now(), content: '', maxLength: '' },
    ]);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleChangeContent = (id, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, content: value } : q))
    );
  };

  const handleChangeMaxLength = (id, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, maxLength: value } : q))
    );
  };

  const handleGenerateDraft = () => {
    // TODO: 백엔드 연동 시 AI 초안 생성 API 요청
    onNext();
  };

  return (
    <StepWrapper>
      <GuideArea>
        <GuideText>자소서 문항과 글자 수를 입력해주세요.</GuideText>
        <SubText>구체적으로 입력할수록 정확도가 높아져요! (최대 5개)</SubText>
      </GuideArea>

      <QuestionList>
        {questions.map((question, index) => (
          <QuestionInputCard
            key={question.id}
            index={index}
            question={question}
            onChangeContent={handleChangeContent}
            onChangeMaxLength={handleChangeMaxLength}
            onRemove={handleRemoveQuestion}
            canRemove={questions.length > 1}
          />
        ))}
      </QuestionList>

      {questions.length < MAX_QUESTIONS && (
        <AddButton type="button" onClick={handleAddQuestion}>
          문항 추가하기
        </AddButton>
      )}

      <BottomArea>
        <PrimaryButton onClick={handleGenerateDraft}>
          자소서 초안 생성하기
          <MagicpenIcon color="#FFFFFF" size={18} />
        </PrimaryButton>
      </BottomArea>
    </StepWrapper>
  );
};

export default CoverLetterStep3;

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

const SubText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const QuestionList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const AddButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3.5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSub};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BottomArea = styled.div`
  width: 100%;
`;

const PrimaryButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(3.5)};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;