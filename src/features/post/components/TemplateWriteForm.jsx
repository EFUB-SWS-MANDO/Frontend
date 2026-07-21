import styled from 'styled-components';

const FIELDS = [
  { key: 'basicInfo', placeholder: '기본 정보' },
  { key: 'activity', placeholder: '활동 내용' },
  { key: 'reflection', placeholder: '성찰 및 성장' },
];

function TemplateWriteForm({ value, onChange }) {
  const handleFieldChange = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <Wrapper>
      {FIELDS.map((field) => (
        <FieldArea
          key={field.key}
          placeholder={field.placeholder}
          value={value[field.key]}
          onChange={(e) => handleFieldChange(field.key, e.target.value)}
        />
      ))}
      <UploadArea type="button">증빙자료</UploadArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bg};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const FieldArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: ${({ theme }) => theme.spacing(4)};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

const UploadArea = styled.button`
  flex: 1;
  min-height: 96px;
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.bg};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSub};
`;

export default TemplateWriteForm;
