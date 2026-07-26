import { useState } from 'react';
import styled from 'styled-components';
import { MOCK_CATEGORIES } from '@/mocks/mockCategories';

function CategorySelector({ selected, onToggle }) {
  const [search, setSearch] = useState('');

  const selectedCategories = MOCK_CATEGORIES.filter((c) => selected.includes(c.id));
  const trimmedSearch = search.trim();
  const suggestions = trimmedSearch
    ? MOCK_CATEGORIES.filter((c) => !selected.includes(c.id) && c.name.includes(trimmedSearch))
    : [];

  const handleSelectSuggestion = (id) => {
    onToggle(id);
    setSearch('');
  };

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

      {suggestions.length > 0 && (
        <SuggestionList>
          {suggestions.map((category) => (
            <SuggestionItem
              key={category.id}
              type="button"
              onClick={() => handleSelectSuggestion(category.id)}
            >
              {category.name}
            </SuggestionItem>
          ))}
        </SuggestionList>
      )}

      {selectedCategories.length > 0 && (
        <ChipList>
          {selectedCategories.map((category) => (
            <Chip key={category.id} type="button" onClick={() => onToggle(category.id)}>
              {category.name} <span aria-hidden>×</span>
            </Chip>
          ))}
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

const SuggestionList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
`;

const SuggestionItem = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.full};
  border: none;
  background-color: ${({ theme }) => theme.colors.primary} !important;
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default CategorySelector;
