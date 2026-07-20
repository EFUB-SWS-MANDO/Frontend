import { useState } from 'react';
import styled from 'styled-components';
import PageHeader from '@/components/PageHeader/PageHeader';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';
import SelectableCard from '@/features/ai/components/SelectableCard';
import { useRecords } from '@/features/ai/api/useRecords';

const TABS = [
  { key: 'coverLetter', label: '자기소개서' },
  { key: 'interview', label: '모의 면접' },
];

// 과거 기록 / 저장 목록 공용 뷰: 탭 + 날짜별 그룹 리스트
function RecordListView({ title, type }) {
  const [activeTab, setActiveTab] = useState('coverLetter');
  const [selected, setSelected] = useState(() => new Set());
  const { records, isLoading, error } = useRecords(type);

  const groups = records[activeTab] ?? [];

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Container>
      <PageHeader title={title} />
      <TabList role="tablist">
        {TABS.map((tab) => (
          <Tab
            key={tab.key}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.key}
            $active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <EmptyState message="불러오지 못했어요. 다시 시도해 주세요." />
      ) : groups.length === 0 ? (
        <EmptyState message="아직 기록이 없어요." />
      ) : (
        groups.map((group) => (
          <Group key={group.date}>
            <GroupDate>{group.date}</GroupDate>
            <CardList>
              {group.items.map((item) => (
                <SelectableCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  selected={selected.has(item.id)}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </CardList>
          </Group>
        ))
      )}
    </Container>
  );
}

const Container = styled.section`
  max-width: 560px;
  margin: 0 auto;
`;

const TabList = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(2.5)};
  margin-bottom: -1px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeight.bold : theme.fontWeight.regular};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSub};
  border-bottom: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
`;

const Group = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const GroupDate = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export default RecordListView;
