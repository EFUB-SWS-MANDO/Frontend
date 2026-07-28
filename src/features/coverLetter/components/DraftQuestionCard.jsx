import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CopyIcon from '../../../asset/icons/CopyIcon';
import SaveIcon from '../../../asset/icons/SaveIcon';

const SAVED_FLASH_MS = 1500;

const DraftQuestionCard = ({
  index,
  question,
  draft,
  selected,
  onSelect,
  onCopy,
}) => {
  const [showSaved, setShowSaved] = useState(false);
  const savedTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(savedTimerRef.current), []);

  const handleSelect = () => onSelect(question.id);
  const handleCopy = () => onCopy(question.id);
  const handleSave = () => {
    // 생성 시점에 이미 저장되므로 별도 API 호출 없이 저장 완료 표시만 보여줌
    clearTimeout(savedTimerRef.current);
    setShowSaved(true);
    savedTimerRef.current = setTimeout(() => setShowSaved(false), SAVED_FLASH_MS);
  };

  return (
    <QuestionGroup>
      <CardHeader>
        <CardTitle as="button" type="button" onClick={handleSelect}>
          {index + 1}. {question.content} ({question.maxLength}자)
        </CardTitle>

        <IconRow>
          <IconButton type="button" onClick={handleCopy} aria-label="복사하기">
            <CopyIcon color="#494D5A" size={18} />
          </IconButton>
          <IconButton
            type="button"
            onClick={handleSave}
            aria-label={showSaved ? '저장됨' : '저장하기'}
          >
            {showSaved && <SavedLabel>저장됨</SavedLabel>}
            <SaveIcon color={showSaved ? '#00BF63' : '#494D5A'} size={18} />
          </IconButton>
        </IconRow>
      </CardHeader>

      <DraftBox as="button" type="button" onClick={handleSelect} $selected={selected}>
        {draft?.content}
      </DraftBox>
    </QuestionGroup>
  );
};

export default DraftQuestionCard;

const QuestionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
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
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
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
  gap: ${({ theme }) => theme.spacing(1)};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const SavedLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.primary};
`;

const DraftBox = styled.div`
  width: 100%;
  display: block;
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid
    ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md};
  min-height: 90px;
  background: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  text-align: left;
  cursor: pointer;
`;
