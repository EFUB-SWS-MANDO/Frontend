import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import styled from 'styled-components';
import { usePostDetail } from '@/features/post/api/usePostDetail';
import { useComments } from '@/features/post/api/useComments';
import PostDetailHeader from '@/features/post/components/PostDetailHeader';
import PostBody from '@/features/post/components/PostBody';
import LikeButton from '@/features/post/components/LikeButton';
import CommentItem from '@/features/post/components/CommentItem';
import CommentInput from '@/features/post/components/CommentInput';
import Spinner from '@/components/Spinner/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useAuthStore } from '@/stores/authStore';

function PostDetailPage() {
  const { postId } = useParams();
  const myUser = useAuthStore((state) => state.user);
  const commentInputRef = useRef(null);

  const { post, isLoading: postLoading, error: postError } = usePostDetail(postId);
  const { comments, isLoading: commentsLoading, error: commentsError, addComment } = useComments(postId);

  if (postLoading || commentsLoading) return <Spinner />;
  if (postError || commentsError || !post) return <EmptyState message="불러오지 못했어요. 다시 시도해 주세요." />;

  const isPostOwner = String(post.author.id) === String(myUser?.id);

  const handleReplyClick = () => {
    commentInputRef.current?.focus();
  };

  const handleCommentSubmit = ({ content, isPrivate }) => {
    addComment({
      id: Date.now(),
      author: { id: myUser?.id, name: myUser?.nickname ?? '나', profileImage: myUser?.profileImage ?? '' },
      createdAt: new Date().toLocaleString(),
      content,
      isPrivate,
    });
  };

  return (
    <Wrapper>
      <PostDetailHeader post={post} isOwner={isPostOwner} />
      <PostBody content={post.content} />
      <LikeButton initialCount={post.likeCount} initialLiked={post.isLiked} />

      <CommentSection>
        <SectionTitle>댓글 {comments.length}개</SectionTitle>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isOwner={String(comment.author.id) === String(myUser?.id)}
            onReplyClick={handleReplyClick}
          />
        ))}
      </CommentSection>

      <CommentInput ref={commentInputRef} onSubmit={handleCommentSubmit} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.pageBg};
  display: flex;
  flex-direction: column;
`;

const CommentSection = styled.section`
  padding: 0 ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export default PostDetailPage;