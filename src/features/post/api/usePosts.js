import { useState, useEffect, useCallback } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_POSTS } from '@/mocks/mockPosts';
import { categoryLabelToCode } from '@/constants/postCategories';
import { mapPostSummary } from './postMappers';

// mock 데이터를 파라미터로 필터링 (백엔드 연동 전 개발용)
function filterMockPosts(posts, { followingOnly, categories, author, keyword }) {
  return posts.filter((post) => {
    if (followingOnly && !post.author.isFollowing) return false;
    if (author != null && String(post.author.id) !== String(author)) return false;
    if (categories?.length && !categories.some((t) => post.tags.includes(t))) return false;
    if (keyword) {
      const q = keyword.trim().toLowerCase();
      const target = `${post.title} ${post.content}`.toLowerCase();
      if (q && !target.includes(q)) return false;
    }
    return true;
  });
}

export function usePosts(params = {}, enabled = true) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState(null);

  const paramsKey = JSON.stringify(params);

  const fetchPosts = useCallback(async () => {
    if (!enabled) {
      setPosts([]);
      setError(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { followingOnly, categories, author, keyword, sortBy, sortDirection } =
        JSON.parse(paramsKey);

      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setPosts(filterMockPosts(MOCK_POSTS, { followingOnly, categories, author, keyword }));
        return;
      }

      const MAX_PAGES = 50;
      const flat = [];
      let nextCursor;
      let hasNext = true;
      let page = 0;
      while (hasNext && page < MAX_PAGES) {
        page += 1;
        const data = await api.get(ENDPOINTS.posts.list, {
          params: {
            sortBy,
            sortDirection,
            category: categories?.length ? categories.map(categoryLabelToCode) : undefined,
            author,
            followingOnly,
            keyword,
            nextCursor,
          },
        });
        (data.posts ?? []).forEach((raw) => flat.push(mapPostSummary(raw)));
        const next = data.nextCursor;
        hasNext = (data.hasNext ?? false) && next !== undefined && next !== nextCursor;
        nextCursor = next;
      }
      setPosts(flat);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [paramsKey, enabled]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading, error, refetch: fetchPosts };
}
