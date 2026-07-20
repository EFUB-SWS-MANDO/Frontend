import { useMemo } from 'react';
import { MOCK_POSTS } from '@/mocks/mockPosts';
// import { api } from '@/apis/axiosInstance'; // TODO: 백엔드 연동 후 주석 해제

const MAX_SUGGESTIONS = 5;

// 검색어 입력 중 자동완성 목록. 백엔드 연동 전에는 목 데이터 제목/내용에서 매칭.
export function useSearchSuggestions(keyword) {
  return useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return [];

    return MOCK_POSTS.filter((post) =>
      `${post.title} ${post.content}`.toLowerCase().includes(q),
    )
      .slice(0, MAX_SUGGESTIONS)
      .map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
      }));
  }, [keyword]);
}
