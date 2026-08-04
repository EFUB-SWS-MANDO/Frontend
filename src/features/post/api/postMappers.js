import { categoryCodeToLabel } from '@/constants/postCategories';

export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

function mapAuthor(rawAuthor) {
  return {
    id: rawAuthor?.memberId,
    name: rawAuthor?.nickname ?? '알 수 없음',
    profileImage: rawAuthor?.profileImage ?? '',
    isFollowing: rawAuthor?.isFollowing ?? false,
  };
}

// 목록 조회 응답(요약) 매핑
export function mapPostSummary(raw) {
  return {
    id: raw.postId,
    title: raw.title,
    content: raw.summary,
    author: mapAuthor(raw.author),
    createdAt: formatDateTime(raw.createdAt),
    commentCount: raw.commentCount ?? 0,
    likeCount: raw.likeCount ?? 0,
    tags: (raw.categories ?? []).map(categoryCodeToLabel),
    isLiked: raw.isLike ?? false,
    isPrivate: raw.isPrivate ?? false,
  };
}

// 상세 조회/생성/수정 응답 매핑 (동일한 shape)
export function mapPostDetail(raw) {
  return {
    id: raw.postId,
    title: raw.title,
    content: raw.content,
    fileUrls: raw.fileUrls ?? [],
    author: mapAuthor(raw.author),
    tags: (raw.categories ?? []).map(categoryCodeToLabel),
    likeCount: raw.likeCount ?? 0,
    isMine: raw.isMine ?? false,
    isLiked: raw.isLike ?? false,
    createdAt: formatDateTime(raw.createdAt),
    updatedAt: formatDateTime(raw.updatedAt),
    isUpdated: raw.isUpdated ?? false,
    isPrivate: raw.isPrivate ?? false,
  };
}
