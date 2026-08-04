import { useState, useEffect, useRef } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';

export function useFollow(memberId, initialIsFollowing) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    requestIdRef.current += 1;
    setIsFollowing(initialIsFollowing);
    setError(null);
  }, [memberId, initialIsFollowing]);

  const toggleFollow = async () => {
    if (isToggling || !memberId) return false;
    const requestId = ++requestIdRef.current;
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
      return true;
    } catch (e) {
      if (requestIdRef.current === requestId) {
        setIsFollowing(!nextIsFollowing);
        setError(e);
      }
      return false;
    } finally {
      if (requestIdRef.current === requestId) {
        setIsToggling(false);
      }
    }
  };

  return { isFollowing, isToggling, error, toggleFollow };
}
