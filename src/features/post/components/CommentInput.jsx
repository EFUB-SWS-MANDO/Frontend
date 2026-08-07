import { useState, forwardRef } from 'react';
import styled from 'styled-components';
import CloseCircleIcon from '@/asset/icons/CloseCircleIcon';
import SendIcon from '@/asset/icons/SendIcon';

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
      <IconButton type="button" onClick={handleClear} aria-label="입력 취소">
        <CloseCircleIcon size={24} />
      </IconButton>
      <IconButton type="button" onClick={handleSubmit} aria-label="댓글 전송">
        <SendIcon size={36} />
      </IconButton>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2.5)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)};
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bgSub};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    line-height: 20px;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
`;

export default CommentInput;