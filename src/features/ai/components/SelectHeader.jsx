import styled from 'styled-components';

// 선택 화면 공통 상단: 안내 문구 + 복수선택 안내 + 모두 선택 버튼
function SelectHeader({ guide, onSelectAll, allSelected }) {
  return (
    <Wrapper>
      <div>
        <Guide>{guide}</Guide>
        <SubText>복수선택 가능</SubText>
      </div>
      <SelectAllButton type="button" onClick={onSelectAll}>
        {allSelected ? '모두 해제' : '모두 선택'}
      </SelectAllButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const Guide = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const SubText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;

const SelectAllButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default SelectHeader;
