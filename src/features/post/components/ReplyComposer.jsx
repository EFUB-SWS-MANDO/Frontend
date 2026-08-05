import { useState } from 'react';
import styled from 'styled-components';

function ReplyComposer({ onSubmit, onCancel }) {
  const [text, setText] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text, isPrivate);
    setText('');
    setIsPrivate(false);
  };

  return (
    <Wrapper>
      <Input
        placeholder="답글을 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <ToggleButton type="button" $active={isPrivate} onClick={() => setIsPrivate((prev) => !prev)}>
        {isPrivate ? '비공개' : '공개'}
      </ToggleButton>
      <IconButton type="button" onClick={onCancel} aria-label="답글 취소">✕</IconButton>
      <SendButton type="button" onClick={handleSubmit} aria-label="답글 전송">➤</SendButton>
    </Wrapper>
  );
}

export default ReplyComposer;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ToggleButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.bgSub} !important;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
  flex-shrink: 0;
`;

const IconButton = styled.button`
  color: ${({ theme }) => theme.colors.textSub};
  flex-shrink: 0;
`;

const SendButton = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  flex-shrink: 0;
`;
