import { useState, useEffect, useRef } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';

// memberId: 팔로우 대상(followee)의 id. initialIsFollowing이 바뀌면(다른 프로필로 이동 등) 재동기화.
export function useFollow(memberId, initialIsFollowing) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState(null);
  // memberId가 바뀌면 이전에 날아간 요청의 응답이 뒤늦게 와도 최신 상태를 덮어쓰지 않도록 무시
  const requestIdRef = useRef(0);

  useEffect(() => {
    requestIdRef.current += 1;
    setIsFollowing(initialIsFollowing);
    setError(null);
  }, [memberId, initialIsFollowing]);

  const toggleFollow = async () => {
    if (isToggling || !memberId) return;
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
    } catch (e) {
      if (requestIdRef.current === requestId) {
        setIsFollowing(!nextIsFollowing);
        setError(e);
      }
    } finally {
      if (requestIdRef.current === requestId) {
        setIsToggling(false);
      }
    }
  };

  return { isFollowing, isToggling, error, toggleFollow };
}
