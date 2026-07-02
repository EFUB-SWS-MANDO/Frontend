import { useState, useEffect, useCallback } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';

// React Query 없이 데이터 호출을 커스텀 훅으로 통일하는 패턴.
// 컴포넌트에서 직접 useEffect 쓰지 말고 이런 훅으로 묶어 재사용.
export function usePosts(params = {}) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(ENDPOINTS.posts.list, { params });
      setPosts(data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading, error, refetch: fetchPosts };
}
