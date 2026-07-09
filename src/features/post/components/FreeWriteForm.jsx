import styled from 'styled-components';

function FreeWriteForm({ value, onChange }) {
  return (
    <TextArea
      placeholder="텍스트를 작성해주세요"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const TextArea = styled.textarea`
  width: 100%;
  min-height: 340px;
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

export default FreeWriteForm;