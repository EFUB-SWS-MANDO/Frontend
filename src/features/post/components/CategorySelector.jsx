import { useState } from 'react';
import styled from 'styled-components';
import SendCircleIcon from '@/asset/icons/SendCircleIcon';
import Spinner from '@/components/Spinner/Spinner';
import { useCategories } from '@/features/post/api/useCategories';

function CategorySelector({ selected, onToggle }) {
  const [search, setSearch] = useState('');
  const { categories, isLoading, error } = useCategories();

  const filtered = categories.filter((c) => c.name.includes(search));

  return (
    <Wrapper>
      <Title>카테고리 선택</Title>
      <SearchRow>
        <SearchInput
          placeholder="검색어를 입력해주세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon aria-hidden="true">
          <SendCircleIcon size={36} />
        </SearchIcon>
      </SearchRow>
      {isLoading ? (
        <Spinner />
      ) : error || categories.length === 0 ? (
        <StatusText>카테고리를 불러오지 못했어요. 다시 시도해 주세요.</StatusText>
      ) : (
        <ChipList>
          {filtered.map((category) => {
            const isSelected = selected.includes(category.id);
            return (
              <Chip key={category.id} $selected={isSelected} onClick={() => onToggle(category.id)}>
                {category.name}
              </Chip>
            );
          })}
        </ChipList>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const StatusText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bg};
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Chip = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.bg)} !important;
  color: ${({ $selected, theme }) => ($selected ? theme.colors.bg : theme.colors.text)};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export default CategorySelector;
