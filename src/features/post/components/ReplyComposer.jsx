import { useState } from 'react';
import styled from 'styled-components';

function ReplyComposer({ onSubmit, onCancel }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  return (
    <Wrapper>
      <Input
        placeholder="답글을 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
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

const IconButton = styled.button`
  color: ${({ theme }) => theme.colors.textSub};
  flex-shrink: 0;
`;

const SendButton = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  flex-shrink: 0;
`;
