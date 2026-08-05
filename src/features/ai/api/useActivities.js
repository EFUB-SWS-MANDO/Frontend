import { useMemo } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { usePosts } from '@/features/post/api/usePosts';

// '활동'은 내가 쓴 게시글을 재사용한다 (postId -> id, title -> name, tags -> keyword)
export function useActivities() {
  const myUserId = useAuthStore((state) => state.user?.id);
  const { posts, isLoading, error } = usePosts({ author: myUserId }, myUserId != null);

  const activities = useMemo(
    () => posts.map((post) => ({ id: post.id, name: post.title, keyword: post.tags.join(', ') })),
    [posts],
  );

  return { activities, isLoading, error };
}
