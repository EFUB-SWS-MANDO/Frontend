import { useState, useEffect } from 'react';
import { MOCK_POST_DETAIL } from '@/mocks/mockPostDetail';

export function useLike(postId, initialLiked, initialCount) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setIsLiked(initialLiked);
    setCount(initialCount);
  }, [postId, initialLiked, initialCount]);

  const toggleLike = () => {
    // TODO: 백엔드 연동 후 api.post(ENDPOINTS.posts.likes(postId)) 호출로 대체
    const nextIsLiked = !isLiked;
    const nextCount = nextIsLiked ? count + 1 : count - 1;
    setIsLiked(nextIsLiked);
    setCount(nextCount);
    MOCK_POST_DETAIL.isLiked = nextIsLiked;
    MOCK_POST_DETAIL.likeCount = nextCount;
  };

  return { isLiked, count, toggleLike };
}
