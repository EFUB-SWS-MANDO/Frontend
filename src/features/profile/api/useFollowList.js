import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';

export function useFollowList(memberId, mode) {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  const fetchMembers = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    const isStale = () => requestId !== requestIdRef.current;

    if (!memberId) {
      setMembers([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const endpoint =
        mode === 'followers' ? ENDPOINTS.follow.followers(memberId) : ENDPOINTS.follow.followings(memberId);
      const MAX_PAGES = 50;
      const flat = [];
      let idAfter;
      let hasNext = true;
      let page = 0;
      while (hasNext && page < MAX_PAGES) {
        page += 1;
        const data = await api.get(endpoint, {
          params: idAfter !== undefined ? { idAfter } : undefined,
        });
        if (isStale()) return;
        (data.members ?? []).forEach((m) => flat.push(m));
        const nextIdAfter = data.nextIdAfter;
        hasNext = (data.hasNext ?? false) && nextIdAfter !== undefined && nextIdAfter !== idAfter;
        idAfter = nextIdAfter;
      }
      if (!isStale()) setMembers(flat);
    } catch (e) {
      if (!isStale()) setError(e);
    } finally {
      if (!isStale()) setIsLoading(false);
    }
  }, [memberId, mode]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const removeMember = (targetMemberId) => {
    setMembers((prev) => prev.filter((m) => m.memberId !== targetMemberId));
  };

  return { members, isLoading, error, refetch: fetchMembers, removeMember };
}
