import { useState, useMemo } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../../asset/icons/SearchIcon';
import CloseIcon from '../../../asset/icons/CloseIcon';
import ActivityListItem from './ActivityListItem';
import { mockActivities } from '../mocks/activities';

const CoverLetterStep2 = ({ selectedActivities, setSelectedActivities, onNext }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActivities = useMemo(() => {
    if (!searchTerm.trim()) return mockActivities;
    return mockActivities.filter((activity) =>
      activity.name.includes(searchTerm.trim())
    );
  }, [searchTerm]);

  const isAllSelected =
    mockActivities.length > 0 &&
    selectedActivities.length === mockActivities.length;

  const handleToggleActivity = (id) => {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((activityId) => activityId !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedActivities([]);
    } else {
      setSelectedActivities(mockActivities.map((activity) => activity.id));
    }
  };

  const handleClearSearch = () => setSearchTerm('');

  return (
    <StepWrapper>
      <GuideArea>
        <GuideText>자소서에 포함할 활동을 골라주세요.</GuideText>
        <SubRow>
          <SubText>복수선택 가능</SubText>
          <SelectAllButton onClick={handleToggleAll}>
            {isAllSelected ? '모두 해제' : '모두 선택'}
          </SelectAllButton>
        </SubRow>
      </GuideArea>

      <SearchBox>
        <SearchInput
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <IconButton onClick={handleClearSearch} aria-label="검색어 지우기">
            <CloseIcon color="#9197AC" size={16} />
          </IconButton>
        )}
        <IconButton aria-label="검색">
          <SearchIcon color="#9197AC" size={20} />
        </IconButton>
      </SearchBox>

      <ActivityList>
        {filteredActivities.map((activity) => (
          <ActivityListItem
            key={activity.id}
            activity={activity}
            selected={selectedActivities.includes(activity.id)}
            onToggle={handleToggleActivity}
          />
        ))}
      </ActivityList>

      <BottomArea>
        <PrimaryButton onClick={onNext}>활동 선택하기</PrimaryButton>
      </BottomArea>
    </StepWrapper>
  );
};

export default CoverLetterStep2;

const StepWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

const GuideArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const GuideText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const SubRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const SelectAllButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSub};
  padding: 0;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ActivityList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const BottomArea = styled.div`
  width: 100%;
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3.5)};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;