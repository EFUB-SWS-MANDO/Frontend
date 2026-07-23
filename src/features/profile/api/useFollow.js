import { useState, useEffect } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';

// memberId: 팔로우 대상(followee)의 id. initialIsFollowing이 바뀌면(다른 프로필로 이동 등) 재동기화.
export function useFollow(memberId, initialIsFollowing) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [memberId, initialIsFollowing]);

  const toggleFollow = async () => {
    if (isToggling || !memberId) return;
    const nextIsFollowing = !isFollowing;
    setIsToggling(true);
    setError(null);
    setIsFollowing(nextIsFollowing);

    try {
      if (import.meta.env.VITE_MOCK_AUTH !== 'true') {
        if (nextIsFollowing) {
          await api.post(ENDPOINTS.follow.toggle(memberId));
        } else {
          await api.delete(ENDPOINTS.follow.toggle(memberId));
        }
      }
    } catch (e) {
      setIsFollowing(!nextIsFollowing);
      setError(e);
    } finally {
      setIsToggling(false);
    }
  };

  return { isFollowing, isToggling, error, toggleFollow };
}
