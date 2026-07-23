import styled, { useTheme } from 'styled-components';
import SearchIcon from '@/asset/icons/SearchIcon';

function SelectSearchField({ value, onChange }) {
  const theme = useTheme();

  return (
    <Wrapper>
      <Input
        value={value}
        placeholder="검색어를 입력해주세요"
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <ClearButton
          type="button"
          aria-label="검색어 지우기"
          onClick={() => onChange('')}
        >
          ×
        </ClearButton>
      )}
      <SearchIcon size={18} color={theme.colors.textSub} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => `${theme.spacing(2.5)} ${theme.spacing(4)}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Input = styled.input`
  flex: 1;
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
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1;
`;

export default SelectSearchField;
