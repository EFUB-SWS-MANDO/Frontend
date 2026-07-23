import styled from 'styled-components';
import SendIcon from '@/asset/icons/SendIcon';
import CloseCircleIcon from '@/asset/icons/CloseCircleIcon';

function SelectSearchField({ value, onChange }) {
  return (
    <Wrapper>
      <Input
        value={value}
        placeholder="검색어를 입력해주세요"
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <IconButton
          type="button"
          aria-label="검색어 지우기"
          onClick={() => onChange('')}
        >
          <CloseCircleIcon size={24} />
        </IconButton>
      )}
      <IconButton type="button" aria-label="검색">
        <SendIcon size={36} />
      </IconButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bg};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Input = styled.input`
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

export default SelectSearchField;
