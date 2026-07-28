import { useState } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_POSTS } from '@/mocks/mockPosts';

export function useDeletePost() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deletePost = async (postId) => {
    setIsDeleting(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const index = MOCK_POSTS.findIndex((p) => p.id === postId);
        if (index !== -1) MOCK_POSTS.splice(index, 1);
        return true;
      }
      await api.delete(ENDPOINTS.posts.remove(postId));
      return true;
    } catch (e) {
      setError(e);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deletePost, isDeleting, error };
}
