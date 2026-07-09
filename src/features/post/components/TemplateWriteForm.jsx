import styled from 'styled-components';

function TemplateWriteForm({ value, onChange }) {
  const handleFieldChange = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <Wrapper>
      <Field>
        <Label>기본정보</Label>
        <Input
          placeholder="텍스트를 입력하세요"
          value={value.basicInfo}
          onChange={(e) => handleFieldChange('basicInfo', e.target.value)}
        />
      </Field>
      <Field>
        <Label>활동 내용</Label>
        <Input
          placeholder="텍스트를 입력하세요"
          value={value.activity}
          onChange={(e) => handleFieldChange('activity', e.target.value)}
        />
      </Field>
      <Field>
        <Label>성찰 및 성장</Label>
        <Input
          placeholder="텍스트를 입력하세요"
          value={value.reflection}
          onChange={(e) => handleFieldChange('reflection', e.target.value)}
        />
      </Field>
      <Field>
        <Label>증빙자료</Label>
        <UploadRow>업로드하기</UploadRow>
      </Field>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(5)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(1)} 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

const UploadRow = styled.button`
  text-align: left;
  padding: ${({ theme }) => theme.spacing(1)} 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSub};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export default TemplateWriteForm;