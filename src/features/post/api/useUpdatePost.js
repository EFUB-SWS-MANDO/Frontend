import { useState } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_POST_DETAIL } from '@/mocks/mockPostDetail';
import { MOCK_POSTS } from '@/mocks/mockPosts';
import { mapPostDetail } from './postMappers';
import { categoryCodeToLabel } from '@/constants/postCategories';

// 게시글 수정. categories는 NOT-NULL 스펙이라 항상 배열(enum 코드)로 전달해야 함.
// fileKeys 프론트 규칙: 변경 없음=null, 전체삭제=[], 복합수정=최종 파일 리스트(String[])
// TODO: 수정 화면이 생기면 연결
export function useUpdatePost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const updatePost = async (postId, { title, content, categories, fileKeys, isPrivate }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (!Array.isArray(categories)) {
        throw new Error('categories는 항상 배열로 전달해야 합니다 (NOT-NULL 스펙)');
      }
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const updates = { title, content, tags: categories.map(categoryCodeToLabel), isPrivate };
        const listPost = MOCK_POSTS.find((p) => String(p.id) === String(postId));
        if (listPost) Object.assign(listPost, updates);
        if (String(MOCK_POST_DETAIL.id) === String(postId)) {
          Object.assign(MOCK_POST_DETAIL, updates);
        }
        return { ...(listPost ?? MOCK_POST_DETAIL), ...updates, id: postId };
      }
      const data = await api.patch(ENDPOINTS.posts.update(postId), {
        title: title ?? null,
        content: content ?? null,
        categories,
        fileKeys: fileKeys ?? null,
        isPrivate,
      });
      return mapPostDetail(data);
    } catch (e) {
      setError(e);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { updatePost, isSubmitting, error };
}
