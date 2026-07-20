import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageHeader from '@/components/PageHeader/PageHeader';
import { useInterview } from '@/features/ai/api/useInterview';

// 모의면접 총평: 오늘의 면접 점수 + 총평
function InterviewResultPage() {
  const navigate = useNavigate();
  const { summary } = useInterview();

  return (
    <Container>
      <PageHeader title="모의면접" />
      <ScoreArea>
        <ScoreLabel>오늘 나의 면접 점수는</ScoreLabel>
        <Score>{summary.score}점</Score>
      </ScoreArea>
      <SummaryBox>
        <BoxLabel>총평</BoxLabel>
        <BoxText>{summary.comment}</BoxText>
      </SummaryBox>
      <FinishButton type="button" onClick={() => navigate('/ai')}>
        모의 면접 끝내기
      </FinishButton>
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

const ScoreArea = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const ScoreLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Score = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const SummaryBox = styled.div`
  min-height: 200px;
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.primary};
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
  line-height: 1.7;
`;

const FinishButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(2.5)} ${theme.spacing(12)}`};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default InterviewResultPage;
