import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PageHeader from '@/components/PageHeader/PageHeader';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';
import SelectHeader from '@/features/ai/components/SelectHeader';
import SelectSearchField from '@/features/ai/components/SelectSearchField';
import SelectableCard from '@/features/ai/components/SelectableCard';
import { useActivities } from '@/features/ai/api/useActivities';
import { useCoverLetters } from '@/features/ai/api/useCoverLetters';
import { CATEGORIES } from '@/constants/categories';

const MODE_CONFIG = {
  activity: {
    guide: '모의면접에 활용할 활동을 골라주세요.',
    submitLabel: '활동 선택하기',
  },
  category: {
    guide: '모의면접에 활용할 태그를 골라주세요.',
    submitLabel: '선택 완료',
  },
  'cover-letter': {
    guide: '모의면접에 활용할 자기소개서를 골라주세요.',
    submitLabel: '선택 완료',
  },
};

function InterviewSelectPage() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState(() => new Set());

  const { activities, isLoading: activitiesLoading, error: activitiesError } =
    useActivities();
  const { groups, isLoading: lettersLoading, error: lettersError } =
    useCoverLetters();

  const config = MODE_CONFIG[mode] ?? MODE_CONFIG.activity;
  const q = keyword.trim().toLowerCase();

  const candidates =
    mode === 'category'
      ? CATEGORIES.filter((c) => c.toLowerCase().includes(q))
      : mode === 'cover-letter'
        ? groups
            .flatMap((g) => g.items)
            .filter((item) =>
              `${item.title} ${item.description}`.toLowerCase().includes(q),
            )
            .map((item) => item.id)
        : activities
            .filter((a) => `${a.name} ${a.keyword}`.toLowerCase().includes(q))
            .map((a) => a.id);

  const allSelected =
    candidates.length > 0 && candidates.every((k) => selected.has(k));

  const toggle = (key) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(candidates));
  };

  const handleSubmit = () => {
    navigate('/ai/interview/session', {
      state: { mode, selection: [...selected] },
    });
  };

  const isLoading = mode === 'cover-letter' ? lettersLoading : activitiesLoading;
  const error = mode === 'cover-letter' ? lettersError : activitiesError;

  return (
    <Container>
      <PageHeader title="모의면접" />
      <SelectHeader
        guide={config.guide}
        allSelected={allSelected}
        onSelectAll={toggleAll}
      />
      <SelectSearchField value={keyword} onChange={setKeyword} />

      {mode === 'category' ? (
        <ChipRow>
          {candidates.map((tag) => (
            <TagChip
              key={tag}
              type="button"
              $selected={selected.has(tag)}
              onClick={() => toggle(tag)}
            >
              {tag} {selected.has(tag) && <span aria-hidden>×</span>}
            </TagChip>
          ))}
        </ChipRow>
      ) : isLoading ? (
        <Spinner />
      ) : error ? (
        <EmptyState message="불러오지 못했어요. 다시 시도해 주세요." />
      ) : mode === 'cover-letter' ? (
        groups.length === 0 ? (
          <EmptyState message="아직 작성한 자기소개서가 없어요." />
        ) : (
          groups.map((group) => {
            const visible = group.items.filter((item) =>
              `${item.title} ${item.description}`.toLowerCase().includes(q),
            );
            if (visible.length === 0) return null;
            return (
              <Group key={group.date}>
                <GroupDate>{group.date}</GroupDate>
                <CardList>
                  {visible.map((item) => (
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
            );
          })
        )
      ) : activities.length === 0 ? (
        <EmptyState message="아직 기록한 활동이 없어요." />
      ) : (
        <CardList>
          {activities
            .filter((a) => `${a.name} ${a.keyword}`.toLowerCase().includes(q))
            .map((activity) => (
              <SelectableCard
                key={activity.id}
                title={activity.name}
                description={activity.keyword}
                selected={selected.has(activity.id)}
                onToggle={() => toggle(activity.id)}
              />
            ))}
        </CardList>
      )}

      <SubmitButton
        type="button"
        disabled={selected.size === 0}
        onClick={handleSubmit}
      >
        {config.submitLabel}
      </SubmitButton>
    </Container>
  );
}

const Container = styled.section`
  max-width: 838px;
  margin: 0 auto;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Group = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const GroupDate = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const TagChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.bg};
  color: ${({ theme, $selected }) =>
    $selected ? '#fff' : theme.colors.textSub};
`;

const SubmitButton = styled.button`
  display: block;
  margin: ${({ theme }) => `${theme.spacing(8)} auto 0`};
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

export default InterviewSelectPage;
