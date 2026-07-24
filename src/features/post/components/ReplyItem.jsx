import { useState } from 'react';
import styled from 'styled-components';
import CommentContent from './CommentContent';

function ReplyItem({ reply, myUserId, onUpdate, onDelete, onReplyClick }) {
  const isOwner = String(reply.author.id) === String(myUserId);
  const [isEditing, setIsEditing] = useState(false);
  const [draftContent, setDraftContent] = useState(reply.content);

  const handleStartEdit = () => {
    setDraftContent(reply.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!draftContent.trim()) return;
    onUpdate(reply.id, { content: draftContent });
    setIsEditing(false);
  };

  return (
    <Wrapper>
      <CommentContent
        item={reply}
        isOwner={isOwner}
        avatarSize={28}
        isEditing={isEditing}
        draftContent={draftContent}
        onDraftChange={(e) => setDraftContent(e.target.value)}
        onStartEdit={handleStartEdit}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={() => setIsEditing(false)}
        onTogglePrivate={() => onUpdate(reply.id, { isPrivate: !reply.isPrivate })}
        onDelete={() => onDelete(reply.id)}
      />
      <ReplyLink onClick={onReplyClick}>답글 달기</ReplyLink>
    </Wrapper>
  );
}

export default ReplyItem;

const Wrapper = styled.div``;

const ReplyLink = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
  text-decoration: underline;
`;
