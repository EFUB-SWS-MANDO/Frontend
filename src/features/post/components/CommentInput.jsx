import { useState, forwardRef } from 'react';
import styled from 'styled-components';

const CommentInput = forwardRef(function CommentInput({ onSubmit }, ref) {
  const [text, setText] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleClear = () => {
    setText('');
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit({ content: text, isPrivate });
    setText('');
  };

  return (
    <Wrapper>
      <Input
        ref={ref}
        placeholder="댓글을 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ToggleButton $active={isPrivate} onClick={() => setIsPrivate((prev) => !prev)}>
        {isPrivate ? '비공개' : '공개'}
      </ToggleButton>
      <IconButton onClick={handleClear} aria-label="입력 취소">✕</IconButton>
      <SendButton onClick={handleSubmit} aria-label="댓글 전송">➤</SendButton>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const ToggleButton = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
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

export default CommentInput;