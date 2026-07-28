import { useState } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { mapPostDetail } from './postMappers';

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
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return null;
      }
      const data = await api.patch(ENDPOINTS.posts.update(postId), {
        title: title ?? null,
        content: content ?? null,
        categories: categories ?? [],
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
