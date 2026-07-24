import { useState } from 'react';
import { MOCK_POSTS } from '@/mocks/mockPosts';

export function useCreatePost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async (post) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // TODO: 백엔드 연동 후 api.post(ENDPOINTS.posts.create, post) 사용, 아래 mock 추가 로직 제거
      await new Promise((resolve) => setTimeout(resolve, 300));
      MOCK_POSTS.unshift(post);
      return true;
    } catch (e) {
      setError(e);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createPost, isSubmitting, error };
}
