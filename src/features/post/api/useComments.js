import { useState, useEffect, useCallback } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_COMMENTS } from '@/mocks/mockComments';

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const mapComment = (raw) => ({
  id: raw.commentId,
  author: {
    id: raw.author?.memberId,
    name: raw.author?.nickname ?? '알 수 없음',
    profileImage: raw.author?.profileImage ?? '',
  },
  parentId: raw.parentId ?? null,
  content: raw.content,
  isPrivate: raw.isPrivate ?? false,
  isDeleted: raw.deleted ?? false,
  isEdited: raw.edited ?? false,
  createdAt: formatDateTime(raw.createdAt),
});

const buildCommentTree = (flatComments) => {
  const parents = flatComments.filter((c) => c.parentId === null).map((c) => ({ ...c, replies: [] }));
  const parentById = new Map(parents.map((p) => [p.id, p]));
  flatComments
    .filter((c) => c.parentId !== null)
    .forEach((reply) => {
      parentById.get(reply.parentId)?.replies.push(reply);
    });
  return parents;
};

export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setComments(MOCK_COMMENTS);
        return;
      }
      const flat = [];
      let idAfter;
      let hasNext = true;
      while (hasNext) {
        const data = await api.get(ENDPOINTS.posts.comments(postId), {
          params: idAfter !== undefined ? { idAfter } : undefined,
        });
        (data.comments ?? []).forEach((item) => {
          const raw = item.commentId !== undefined ? item : Object.values(item)[0];
          if (raw?.commentId !== undefined) flat.push(mapComment(raw));
        });
        hasNext = data.hasNext ?? false;
        idAfter = data.nextIdAfter;
      }
      setComments(buildCommentTree(flat));
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = async (newComment) => {
    if (USE_MOCK) {
      setComments((prev) => [...prev, { ...newComment, replies: [] }]);
      return;
    }
    try {
      const data = await api.post(ENDPOINTS.posts.comments(postId), {
        content: newComment.content,
        parentId: null,
        isPrivate: newComment.isPrivate ?? false,
      });
      setComments((prev) => [...prev, { ...mapComment(data), replies: [] }]);
    } catch (e) {
      setError(e);
    }
  };

  const appendReply = (parentId, reply) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === parentId ? { ...c, replies: [...(c.replies ?? []), reply] } : c,
      ),
    );
  };

  const addReply = async (parentId, newReply) => {
    if (USE_MOCK) {
      appendReply(parentId, newReply);
      return;
    }
    try {
      const data = await api.post(ENDPOINTS.posts.comments(postId), {
        content: newReply.content,
        parentId,
        isPrivate: newReply.isPrivate ?? false,
      });
      appendReply(parentId, mapComment(data));
    } catch (e) {
      setError(e);
    }
  };

  const updateComment = (commentId, updates) => {
    // TODO: 백엔드 연동 후 API 호출로 대체
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) return { ...c, ...updates };
        if (c.replies?.some((r) => r.id === commentId)) {
          return {
            ...c,
            replies: c.replies.map((r) => (r.id === commentId ? { ...r, ...updates } : r)),
          };
        }
        return c;
      }),
    );
  };

  const deleteComment = (commentId) => updateComment(commentId, { isDeleted: true });

  return {
    comments,
    isLoading,
    error,
    refetch: fetchComments,
    addComment,
    addReply,
    updateComment,
    deleteComment,
  };
}