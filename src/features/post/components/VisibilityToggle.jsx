import styled from 'styled-components';

function VisibilityToggle({ value, onChange }) {
  return (
    <Wrapper>
      <Title>공개 여부 선택</Title>
      <ButtonRow>
        <OptionButton $active={value === 'public'} onClick={() => onChange('public')}>
          공개
        </OptionButton>
        <OptionButton $active={value === 'private'} onClick={() => onChange('private')}>
          비공개
        </OptionButton>
      </ButtonRow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  flex-shrink: 0;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const OptionButton = styled.button`
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.gray100)};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.bg)} !important;
  color: ${({ $active, theme }) => ($active ? theme.colors.bg : theme.colors.text)};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export default VisibilityToggle;