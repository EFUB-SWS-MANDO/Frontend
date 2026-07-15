import { useState, useEffect, useCallback } from 'react';
import { MOCK_POST_DETAIL } from '@/mocks/mockPostDetail';

export function usePostDetail(postId) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: 백엔드 연동 후 실제 api.get(ENDPOINTS.posts.detail(postId)) 사용
      await new Promise((resolve) => setTimeout(resolve, 300));
      setPost(MOCK_POST_DETAIL);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, isLoading, error, refetch: fetchPost };
}