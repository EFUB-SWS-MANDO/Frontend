import { useState, useEffect } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_POST_DETAIL } from '@/mocks/mockPostDetail';
import { MOCK_POSTS } from '@/mocks/mockPosts';

export function useLike(postId, initialLiked, initialCount) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLiked(initialLiked);
    setCount(initialCount);
    setError(null);
  }, [postId, initialLiked, initialCount]);

  const syncMock = (nextIsLiked, nextCount) => {
    MOCK_POST_DETAIL.isLiked = nextIsLiked;
    MOCK_POST_DETAIL.likeCount = nextCount;
    const listPost = MOCK_POSTS.find((p) => p.id === postId);
    if (listPost) {
      listPost.isLiked = nextIsLiked;
      listPost.likeCount = nextCount;
    }
  };

  const toggleLike = async () => {
    const previousIsLiked = isLiked;
    const previousCount = count;
    const nextIsLiked = !isLiked;
    const nextCount = nextIsLiked ? count + 1 : count - 1;
    setIsLiked(nextIsLiked);
    setCount(nextCount);
    setError(null);

    if (USE_MOCK) {
      syncMock(nextIsLiked, nextCount);
      return;
    }

    try {
      const data = nextIsLiked
        ? await api.post(ENDPOINTS.posts.likes(postId))
        : await api.delete(ENDPOINTS.posts.likes(postId));
      const serverCount = data?.likeCount ?? nextCount;
      setCount(serverCount);
      syncMock(nextIsLiked, serverCount);
    } catch (e) {
      setIsLiked(previousIsLiked);
      setCount(previousCount);
      setError(e);
    }
  };

  return { isLiked, count, toggleLike, error };
}
