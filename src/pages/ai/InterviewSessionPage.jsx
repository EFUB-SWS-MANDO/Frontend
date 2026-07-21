import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import PageHeader from '@/components/PageHeader/PageHeader';
import CopyIcon from '@/asset/icons/CopyIcon';
import SaveIcon from '@/asset/icons/SaveIcon';
import { useInterview } from '@/features/ai/api/useInterview';

function InterviewSessionPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const {
    question,
    feedback,
    isSubmitting,
    submitAnswer,
    nextQuestion,
    followUpQuestion,
  } = useInterview();

  const isFeedbackStep = feedback !== null;

  const resetAnswerState = () => {
    setAnswer('');
    setIsSaved(false);
    setIsCopied(false);
  };

  const handleNextQuestion = () => {
    nextQuestion();
    resetAnswerState();
  };

  const handleFollowUpQuestion = () => {
    followUpQuestion();
    resetAnswerState();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(feedback);
    setIsCopied(true);
  };

  return (
    <Container>
      <PageHeader title="모의면접" />

      <QuestionRow>
        <AiAvatar aria-hidden />
        <QuestionBox>
          <BoxLabel>AI 질문</BoxLabel>
          <BoxText>{question}</BoxText>
        </QuestionBox>
      </QuestionRow>

      <AnswerBox
        value={answer}
        placeholder="내가 작성한 답변"
        readOnly={isFeedbackStep}
        onChange={(e) => setAnswer(e.target.value)}
      />

      {isFeedbackStep ? (
        <>
          <FeedbackBox>
            <BoxText>{feedback}</BoxText>
          </FeedbackBox>
          <ActionRow>
            <ActionButton type="button" onClick={handleCopy}>
              <CopyIcon size={20} color={theme.colors.textSub} />
              {isCopied ? '복사됨' : '복사하기'}
            </ActionButton>
            <ActionButton type="button" onClick={() => setIsSaved(true)}>
              <SaveIcon size={20} color={theme.colors.textSub} />
              {isSaved ? '저장됨' : '저장하기'}
            </ActionButton>
          </ActionRow>
          <PrimaryButton
            type="button"
            onClick={() => navigate('/ai/interview/result')}
          >
            총평 보기
          </PrimaryButton>
        </>
      ) : (
        <>
          <ButtonRow>
            <SubButton type="button" onClick={handleFollowUpQuestion}>
              꼬리질문 받기
            </SubButton>
            <SubButton type="button" onClick={handleNextQuestion}>
              추가질문 받기
            </SubButton>
          </ButtonRow>
          <PrimaryButton
            type="button"
            disabled={answer.trim() === '' || isSubmitting}
            onClick={submitAnswer}
          >
            {isSubmitting ? '피드백 생성 중...' : '제출하고 피드백 보기'}
          </PrimaryButton>
        </>
      )}
    </Container>
  );
}

const Container = styled.section`
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`;

const QuestionRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const AiAvatar = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bgSub};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const QuestionBox = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const BoxLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const BoxText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const AnswerBox = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FeedbackBox = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(10)};
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const SubButton = styled.button`
  flex: 1;
  height: 52px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled.button`
  display: block;
  margin: 0 auto;
  height: 52px;
  padding: ${({ theme }) => `0 ${theme.spacing(12)}`};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default InterviewSessionPage;
