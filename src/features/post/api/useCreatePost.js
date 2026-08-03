import { useState } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_POSTS } from '@/mocks/mockPosts';
import { useAuthStore } from '@/stores/authStore';
import { categoryCodeToLabel } from '@/constants/postCategories';
import { formatDateTime, mapPostDetail } from './postMappers';

// categories는 호출부에서 enum 코드로 변환해서 넘겨준다.
export function useCreatePost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async ({ title, content, categories, isPrivate }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const myUser = useAuthStore.getState().user;
        const mockPost = {
          id: crypto.randomUUID(),
          title,
          content,
          fileUrls: [],
          author: {
            id: myUser?.id,
            name: myUser?.nickname ?? '나',
            profileImage: myUser?.profileImage ?? '',
            isFollowing: false,
          },
          createdAt: formatDateTime(new Date().toISOString()),
          updatedAt: formatDateTime(new Date().toISOString()),
          isUpdated: false,
          commentCount: 0,
          likeCount: 0,
          tags: (categories ?? []).map(categoryCodeToLabel),
          isMine: true,
          isLiked: false,
          isPrivate,
        };
        MOCK_POSTS.unshift(mockPost);
        return mockPost;
      }

      const data = await api.post(ENDPOINTS.posts.create, {
        title,
        content,
        categories: categories?.length ? categories : null,
        // TODO: 첨부 이미지/파일 presigned URL 업로드 연동 후 fileKeys 채우기
        fileKeys: null,
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

  return { createPost, isSubmitting, error };
}
