import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PageHeader from '@/components/PageHeader/PageHeader';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useResumeDetail } from '@/features/ai/api/useResumeDetail';
import ResumeQuestionList from '@/features/ai/components/ResumeQuestionList';

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
        <ResumeQuestionList questions={resume.questions} />
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

export default ResumeDetailPage;
