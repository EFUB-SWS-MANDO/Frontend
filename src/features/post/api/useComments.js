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
    setComments((prev) => [...prev, newComment]);
  };

  return { comments, isLoading, error, refetch: fetchComments, addComment };
}