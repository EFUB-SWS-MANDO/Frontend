import { useState, useEffect, useCallback } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_POST_DETAIL } from '@/mocks/mockPostDetail';
import { MOCK_POSTS } from '@/mocks/mockPosts';
import { mapPostDetail } from './postMappers';

export function usePostDetail(postId) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const foundPost = MOCK_POSTS.find((p) => p.id === postId);
        setPost(foundPost ?? MOCK_POST_DETAIL);
        return;
      }
      const data = await api.get(ENDPOINTS.posts.detail(postId));
      setPost(mapPostDetail(data));
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
