import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PageHeader from '@/components/PageHeader/PageHeader';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useResumeDetail } from '@/features/ai/api/useResumeDetail';

function ResumeDetailPage() {
  const { resumeId } = useParams();
  const { resume, isLoading, error } = useResumeDetail(resumeId);

  return (
    <Wrapper>
      <PageHeader title={resume?.title ?? '자소서'} />
      {isLoading ? (
        <Spinner />
      ) : error || !resume?.questions?.length ? (
        <EmptyState message="불러오지 못했어요. 다시 시도해 주세요." />
      ) : (
        <QuestionList>
          {[...resume.questions]
            .sort((a, b) => a.order - b.order)
            .map((question) => (
              <QuestionBlock key={question.questionId}>
                <QuestionTitle>
                  {question.order}. {question.content}
                </QuestionTitle>
                <AnswerBox>{question.answer}</AnswerBox>
                <ExplanationLabel>AI 강조 포인트</ExplanationLabel>
                <ExplanationBox>{question.description}</ExplanationBox>
              </QuestionBlock>
            ))}
        </QuestionList>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: ${({ theme }) => theme.spacing(6)};
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const QuestionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const QuestionTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const AnswerBox = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
  min-height: 90px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  white-space: pre-wrap;
`;

const ExplanationLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary};
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
  white-space: pre-wrap;
`;

export default ResumeDetailPage;
