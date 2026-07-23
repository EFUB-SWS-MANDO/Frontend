export const ENDPOINTS = {
  auth: {
    signIn: '/api/auth/sign-in',
    signOut: '/api/auth/sign-out',
    refresh: '/api/auth/refresh',
  },
  member: {
    withdraw: '/api/members',
  },
  profile: {
    create: '/api/me/profiles',
    update: '/api/me/profiles',
    detail: (memberId) => `/api/members/${memberId}/profiles`,
  },
  posts: {
    list: '/api/posts',
    create: '/api/posts',
    detail: (postId) => `/api/posts/${postId}`,
    update: (postId) => `/api/posts/${postId}`,
    remove: (postId) => `/api/posts/${postId}`,
    likes: (postId) => `/api/posts/${postId}/likes`,
    comments: (postId) => `/api/posts/${postId}/comments`,
  },
  comments: {
    update: (commentId) => `/api/comments/${commentId}`,
    remove: (commentId) => `/api/comments/${commentId}`,
  },
  follow: {
    // 팔로우 생성(POST)/취소(DELETE) 공용. 팔로우_취소.md 문서상 DELETE 경로가
    // 본문(/api/members/{memberId}/follow)과 URI 섹션(/api/follows)이 서로 달라
    // 아직 확정되지 않음 — 백엔드 확인 후 다르면 이 경로만 수정하면 됨.
    toggle: (memberId) => `/api/members/${memberId}/follow`,
  },
  resumes: {
    list: '/api/resumes',
    create: '/api/resumes',
    detail: (resumeId) => `/api/resumes/${resumeId}`,
    remove: (resumeId) => `/api/resumes/${resumeId}`,
  },
  interviews: {
    list: '/api/interviews',
    create: '/api/interviews',
    detail: (sessionId) => `/api/interviews/${sessionId}`,
    remove: (sessionId) => `/api/interviews/${sessionId}`,
    question: (sessionId) => `/api/interviews/${sessionId}/question`,
    stream: (sessionId) => `/api/interviews/${sessionId}/stream`,
    feedback: (sessionId) => `/api/interviews/${sessionId}/feedback`,
  },
  templates: {
    list: '/api/templates',
  },
  categories: {
    list: '/api/categories',
  },
};
