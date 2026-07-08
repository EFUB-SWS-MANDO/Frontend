import { useState, useEffect, useCallback } from 'react';
import { MOCK_POSTS } from '@/mocks/mockPosts';
// import { api } from '@/apis/axiosInstance'; // TODO: 백엔드 연동 후 주석 해제
// import { ENDPOINTS } from '@/apis/endpoints'; // TODO: 백엔드 연동 후 주석 해제

export function usePosts(params = {}) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: 백엔드 연동 후 아래 mock 대신 실제 api.get() 사용
      await new Promise((resolve) => setTimeout(resolve, 300)); // 로딩 흉내
      setPosts(MOCK_POSTS);
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