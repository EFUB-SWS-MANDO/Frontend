import styled from 'styled-components';

const QuestionInputCard = ({ index, question, onChangeContent, onChangeMaxLength, onRemove, canRemove }) => {
  return (
    <CardWrapper>
      <CardHeader>
        <CardIndex>{index + 1}.</CardIndex>
        {canRemove && (
          <RemoveButton onClick={() => onRemove(question.id)} type="button">
            삭제
          </RemoveButton>
        )}
      </CardHeader>

      <ContentInput
        placeholder="지원 동기와 입사 후 포부"
        value={question.content}
        onChange={(e) => onChangeContent(question.id, e.target.value)}
      />

      <MaxLengthRow>
        <MaxLengthInput
          type="number"
          placeholder="500"
          value={question.maxLength}
          onChange={(e) => onChangeMaxLength(question.id, e.target.value)}
        />
        <MaxLengthUnit>자</MaxLengthUnit>
      </MaxLengthRow>
    </CardWrapper>
  );
};

export default QuestionInputCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};

  & + & {
    margin-top: ${({ theme }) => theme.spacing(3)};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardIndex = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
  padding: 0;
`;

const ContentInput = styled.textarea`
  resize: none;
  min-height: 60px;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

const MaxLengthRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const MaxLengthInput = styled.input`
  width: 60px;
  text-align: right;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }

  /* 숫자 input 화살표 제거 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const MaxLengthUnit = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
`;