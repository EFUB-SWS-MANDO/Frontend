import styled from 'styled-components';
import CopyIcon from '../../../asset/icons/CopyIcon';
import SaveIcon from '../../../asset/icons/SaveIcon';

const DraftQuestionCard = ({
  index,
  question,
  draft,
  selected,
  onSelect,
  onCopy,
  onSave,
}) => {
  const handleCopy = (e) => {
    e.stopPropagation();
    onCopy(question.id);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave(question.id);
  };

  return (
    <QuestionGroup onClick={() => onSelect(question.id)}>
      <CardHeader>
        <CardTitle>
          {index + 1}. {question.content} ({question.maxLength}자)
        </CardTitle>

        <IconRow>
          <IconButton onClick={handleCopy} aria-label="복사하기">
            <CopyIcon color="#494D5A" size={18} />
          </IconButton>
          <IconButton onClick={handleSave} aria-label="저장하기">
            <SaveIcon color="#494D5A" size={18} />
          </IconButton>
        </IconRow>
      </CardHeader>

      <DraftBox $selected={selected}>{draft?.content}</DraftBox>
    </QuestionGroup>
  );
};

export default DraftQuestionCard;

const QuestionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const CardTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-shrink: 0;
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

const DraftBox = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid
    ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  min-height: 90px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;
