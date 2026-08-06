import styled from 'styled-components';

const isUploadField = (field) => field.replace(/\s/g, '').includes('증빙');

function TemplateWriteForm({ fields = [], value, onChange, uploadedFiles = [], onUpload }) {
  const handleFieldChange = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  const handleFileChange = (e) => {
    onUpload?.(Array.from(e.target.files));
    e.target.value = '';
  };

  return (
    <Wrapper>
      {fields.map((field) =>
        isUploadField(field) ? (
          <UploadArea key={field}>
            {field}
            {uploadedFiles.length > 0 && (
              <FileList>{uploadedFiles.map((attachment) => attachment.file?.name ?? attachment.name).join(', ')}</FileList>
            )}
            <HiddenInput type="file" multiple onChange={handleFileChange} />
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

const UploadArea = styled.label`
  flex: 1;
  min-height: 96px;
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.bg};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSub};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};

  &:focus-within {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -1px;
  }
`;

const FileList = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text};
  word-break: break-all;
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export default TemplateWriteForm;
