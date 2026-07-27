import { useState } from 'react';
import styled from 'styled-components';
import CommentContent from './CommentContent';
import ReplyItem from './ReplyItem';
import ReplyComposer from './ReplyComposer';

function CommentItem({ comment, myUserId, onUpdate, onDelete, onReplySubmit }) {
  const isOwner = String(comment.author.id) === String(myUserId);
  const [isEditing, setIsEditing] = useState(false);
  const [draftContent, setDraftContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);

  const handleStartEdit = () => {
    setDraftContent(comment.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!draftContent.trim()) return;
    onUpdate(comment.id, { content: draftContent });
    setIsEditing(false);
  };

  const handleReplySubmit = (content) => {
    onReplySubmit(comment.id, content);
    setIsReplying(false);
  };

  const replyCount = comment.replies?.length ?? 0;

  return (
    <Wrapper>
      <CommentContent
        item={comment}
        isOwner={isOwner}
        avatarSize={32}
        isEditing={isEditing}
        draftContent={draftContent}
        onDraftChange={(e) => setDraftContent(e.target.value)}
        onStartEdit={handleStartEdit}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={() => setIsEditing(false)}
        onTogglePrivate={() => onUpdate(comment.id, { isPrivate: !comment.isPrivate })}
        onDelete={() => onDelete(comment.id)}
      />

      <ReplyLink onClick={() => setIsReplying((prev) => !prev)}>
        답글 달기{replyCount > 0 && ` · 대댓글 ${replyCount}개`}
      </ReplyLink>

      {isReplying && (
        <ReplyComposer onSubmit={handleReplySubmit} onCancel={() => setIsReplying(false)} />
      )}

      {replyCount > 0 && (
        <ReplyList>
          {comment.replies.map((reply) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              myUserId={myUserId}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onReplyClick={() => setIsReplying(true)}
            />
          ))}
        </ReplyList>
      )}
    </Wrapper>
  );
}

export default CommentItem;

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(4)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ReplyLink = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSub};
  text-decoration: underline;
`;

const ReplyList = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  padding-left: ${({ theme }) => theme.spacing(8)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;
