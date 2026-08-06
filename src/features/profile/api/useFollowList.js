import { useState, useEffect, useCallback } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';

export function useFollowList(memberId, mode) {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMembers = useCallback(async () => {
    if (!memberId) return;
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
        (data.members ?? []).forEach((m) => flat.push(m));
        const nextIdAfter = data.nextIdAfter;
        hasNext = (data.hasNext ?? false) && nextIdAfter !== undefined && nextIdAfter !== idAfter;
        idAfter = nextIdAfter;
      }
      setMembers(flat);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [memberId, mode]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return { members, isLoading, error, refetch: fetchMembers };
}
