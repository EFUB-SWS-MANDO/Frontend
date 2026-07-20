import styled from 'styled-components';
import { useProfile } from '@/features/profile/api/useProfile';
import { useMyPageData } from '@/features/mypage/api/useMyPageData';
import GoalMessageCard from '@/features/mypage/components/GoalMessageCard';
import StatsSummary from '@/features/mypage/components/StatsSummary';
import ActivityRecordList from '@/features/mypage/components/ActivityRecordList';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';

function MyPage() {
  // TODO: 닉네임/아바타는 이미 전역 Header가 useAuthStore로 표시 중.
  // 마이페이지 내부에도 유저 정보가 필요해지면 useProfile(mock) 대신 useAuthStore 연동 검토
  const { profile, isLoading: profileLoading, error: profileError } = useProfile();
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.bg};
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
