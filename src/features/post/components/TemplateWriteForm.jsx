import styled from 'styled-components';

const isUploadField = (field) => field.replace(/\s/g, '').includes('증빙');

function TemplateWriteForm({ fields = [], value, onChange }) {
  const handleFieldChange = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <Wrapper>
      {fields.map((field) =>
        isUploadField(field) ? (
          <UploadArea key={field} type="button">
            {field}
          </UploadArea>
        ) : (
          <FieldArea
            key={field}
            placeholder={field}
            value={value[field] ?? ''}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          />
        )
      )}
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
