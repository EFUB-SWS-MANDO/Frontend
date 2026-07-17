import { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import SearchIcon from '@/asset/icons/SearchIcon';
import { useSearchSuggestions } from '@/features/post/api/useSearchSuggestions';
import {
  getRecentSearches,
  addRecentSearch,
  removeRecentSearch,
} from '@/features/post/utils/recentSearches';

// 메인 검색: 아이콘 클릭 → 입력창 확장.
// 드롭다운 상태 3가지: 입력 전(최근 검색어) / 입력 중(자동완성) / 검색 확정(목록 필터).
function PostSearch({ keyword, onSearch }) {
  const theme = useTheme();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(keyword);
  const [recent, setRecent] = useState(getRecentSearches);
  const suggestions = useSearchSuggestions(input);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const commitSearch = (value) => {
    const q = value.trim();
    setInput(q);
    onSearch(q);
    if (q) setRecent(addRecentSearch(q));
    setIsOpen(false);
  };

  const openSearch = () => {
    setIsOpen(true);
    setRecent(getRecentSearches());
    // 확장 애니메이션 없이 바로 포커스
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <Wrapper ref={wrapperRef}>
      <InputBox $open={isOpen || !!keyword}>
        <IconButton type="button" aria-label="검색" onClick={openSearch}>
          <SearchIcon size={20} color={theme.colors.textSub} />
        </IconButton>
        <Input
          ref={inputRef}
          value={input}
          placeholder="검색어를 입력해 주세요"
          onFocus={openSearch}
          onChange={(e) => {
            setInput(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitSearch(input);
            if (e.key === 'Escape') setIsOpen(false);
          }}
        />
        {(input || keyword) && (
          <ClearButton
            type="button"
            aria-label="검색어 지우기"
            onClick={() => commitSearch('')}
          >
            ×
          </ClearButton>
        )}
      </InputBox>

      {isOpen && (
        <Dropdown>
          {input.trim() === '' ? (
            recent.length === 0 ? (
              <HintText>최근 검색어가 없어요.</HintText>
            ) : (
              <>
                <DropdownTitle>최근 검색어</DropdownTitle>
                {recent.map((term) => (
                  <RecentRow key={term}>
                    <RecentTerm
                      type="button"
                      onClick={() => commitSearch(term)}
                    >
                      {term}
                    </RecentTerm>
                    <RemoveButton
                      type="button"
                      aria-label={`${term} 삭제`}
                      onClick={() => setRecent(removeRecentSearch(term))}
                    >
                      ×
                    </RemoveButton>
                  </RecentRow>
                ))}
              </>
            )
          ) : suggestions.length === 0 ? (
            <HintText>검색 결과가 없어요.</HintText>
          ) : (
            suggestions.map((s) => (
              <SuggestionRow
                key={s.id}
                type="button"
                onClick={() => commitSearch(s.title)}
              >
                <SuggestionTitle>{s.title}</SuggestionTitle>
                <SuggestionContent>{s.content}</SuggestionContent>
              </SuggestionRow>
            ))
          )}
        </Dropdown>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  border: 1px solid
    ${({ theme, $open }) => ($open ? theme.colors.border : 'transparent')};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: ${({ theme }) => `0 ${theme.spacing(2)}`};
  background: ${({ theme, $open }) => ($open ? theme.colors.bg : 'transparent')};

  input {
    width: ${({ $open }) => ($open ? '240px' : '0')};
    transition: width 0.15s ease;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.full};
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

const ClearButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing(2)});
  right: 0;
  width: 300px;
  max-height: 320px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 25;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const DropdownTitle = styled.p`
  padding: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const HintText = styled.p`
  padding: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSub};
  text-align: center;
`;

const RecentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RecentTerm = styled.button`
  flex: 1;
  text-align: left;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

const RemoveButton = styled.button`
  padding: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1;
`;

const SuggestionRow = styled.button`
  text-align: left;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.bgSub};
  }
`;

const SuggestionTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const SuggestionContent = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default PostSearch;
