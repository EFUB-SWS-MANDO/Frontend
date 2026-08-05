import styled from 'styled-components';

function ResumeQuestionList({ questions }) {
  return (
    <QuestionList>
      {[...questions]
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
  );
}

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

export default ResumeQuestionList;
