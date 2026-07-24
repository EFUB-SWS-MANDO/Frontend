import { useState, useEffect, useCallback } from 'react';
import { MOCK_COMMENTS } from '@/mocks/mockComments';

export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: 백엔드 연동 후 실제 api.get(ENDPOINTS.posts.comments(postId)) 사용
      await new Promise((resolve) => setTimeout(resolve, 300));
      setComments(MOCK_COMMENTS);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = (newComment) => {
    // TODO: 백엔드 연동 후 API 호출로 대체, 지금은 화면에서만 추가
    setComments((prev) => [...prev, { ...newComment, replies: [] }]);
  };

  const addReply = (parentId, newReply) => {
    // TODO: 백엔드 연동 후 API 호출로 대체, 지금은 화면에서만 추가
    setComments((prev) =>
      prev.map((c) =>
        c.id === parentId ? { ...c, replies: [...(c.replies ?? []), newReply] } : c,
      ),
    );
  };

  // commentId가 최상위 댓글이든 대댓글이든 상관없이 찾아서 갱신
  const updateComment = (commentId, updates) => {
    // TODO: 백엔드 연동 후 API 호출로 대체
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) return { ...c, ...updates };
        if (c.replies?.some((r) => r.id === commentId)) {
          return {
            ...c,
            replies: c.replies.map((r) => (r.id === commentId ? { ...r, ...updates } : r)),
          };
        }
        return c;
      }),
    );
  };

  // 완전 삭제 대신 soft delete: 목록/스레드 구조는 유지하고 "삭제된 댓글입니다"로 표시
  const deleteComment = (commentId) => updateComment(commentId, { isDeleted: true });

  return {
    comments,
    isLoading,
    error,
    refetch: fetchComments,
    addComment,
    addReply,
    updateComment,
    deleteComment,
  };
}