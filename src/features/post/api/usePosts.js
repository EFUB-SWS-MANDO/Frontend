import { useState, useEffect, useCallback } from 'react';
import { MOCK_POSTS } from '@/mocks/mockPosts';
// import { api } from '@/apis/axiosInstance'; // TODO: 백엔드 연동 후 주석 해제
// import { ENDPOINTS } from '@/apis/endpoints'; // TODO: 백엔드 연동 후 주석 해제

// 백엔드 연동 전, 목 데이터를 파라미터로 필터링해서 반환한다.
// params: { tab: 'all'|'following', tags: string[], recruitStatus: 'all'|'recruiting'|'closed', keyword: string }
function filterPosts(posts, { tab, tags, recruitStatus, keyword }) {
  return posts.filter((post) => {
    if (tab === 'following' && !post.author.isFollowing) return false;
    if (tags?.length && !tags.some((t) => post.tags.includes(t))) return false;
    if (recruitStatus && recruitStatus !== 'all' && post.recruitStatus !== recruitStatus)
      return false;
    if (keyword) {
      const q = keyword.trim().toLowerCase();
      const target = `${post.title} ${post.content}`.toLowerCase();
      if (q && !target.includes(q)) return false;
    }
    return true;
  });
}

export function usePosts(params = {}) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsKey = JSON.stringify(params);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: 백엔드 연동 후 아래 mock 대신 실제 api.get() 사용
      await new Promise((resolve) => setTimeout(resolve, 300)); // 로딩 흉내
      setPosts(filterPosts(MOCK_POSTS, JSON.parse(paramsKey)));
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [paramsKey]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading, error, refetch: fetchPosts };
}
