import { useState } from 'react';
import styled from 'styled-components';
import { MOCK_CATEGORIES } from '@/mocks/mockCategories';

function CategorySelector({ selected, onToggle }) {
  const [search, setSearch] = useState('');

  const filtered = MOCK_CATEGORIES.filter((c) => c.name.includes(search));

  return (
    <Wrapper>
      <Title>카테고리 선택</Title>
      <SearchRow>
        <SearchInput
          placeholder="검색어를 입력해주세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchButton aria-label="검색">➤</SearchButton>
      </SearchRow>
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

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

const SearchButton = styled.button`
  color: ${({ theme }) => theme.colors.textSub};
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