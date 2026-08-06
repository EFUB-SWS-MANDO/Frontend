import styled from 'styled-components';
import { useMyPageData } from '@/features/mypage/api/useMyPageData';
import GoalMessageCard from '@/features/mypage/components/GoalMessageCard';
import StatsSummary from '@/features/mypage/components/StatsSummary';
import ActivityRecordList from '@/features/mypage/components/ActivityRecordList';
import WithdrawButton from '@/features/auth/components/WithdrawButton';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';

function MyPage() {
  const { motivation, stats, records, isLoading, error } = useMyPageData();

  if (isLoading) return <Spinner />;
  if (error) return <EmptyState message="불러오지 못했어요. 다시 시도해 주세요." />;

  return (
    <Wrapper>
      <GoalMessageCard message={motivation} />
      <StatsSection>
        <SectionTitle>나의 통계, 기록</SectionTitle>
        <StatsSummary stats={stats} />
        <ActivityRecordList records={records} />
      </StatsSection>
      <WithdrawButton />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.pageBg};
`;

const StatsSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing(10)};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export default MyPage;
