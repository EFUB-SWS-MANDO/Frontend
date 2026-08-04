import styled from 'styled-components';
import { useProfile } from '@/features/profile/api/useProfile';
import { useAuthStore } from '@/stores/authStore';
import { useMyPageData } from '@/features/mypage/api/useMyPageData';
import GoalMessageCard from '@/features/mypage/components/GoalMessageCard';
import StatsSummary from '@/features/mypage/components/StatsSummary';
import ActivityRecordList from '@/features/mypage/components/ActivityRecordList';
import WithdrawButton from '@/features/auth/components/WithdrawButton';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';

function MyPage() {
  const myUserId = useAuthStore((state) => state.user?.id);
  const { profile, isLoading: profileLoading, error: profileError } = useProfile(myUserId);
  const { stats, records, isLoading: dataLoading, error: dataError } = useMyPageData();

  if (profileLoading || dataLoading) return <Spinner />;
  if (profileError || dataError) return <EmptyState message="불러오지 못했어요. 다시 시도해 주세요." />;

  return (
    <Wrapper>
      <GoalMessageCard message={profile.goalMessage} />
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
