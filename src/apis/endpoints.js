// API 경로를 한 곳에서 관리 (오타/중복 방지)
export const ENDPOINTS = {
  auth: {
    kakaoLogin: '/auth/kakao',
    me: '/auth/me',
  },
  posts: {
    list: '/posts',
    detail: (id) => `/posts/${id}`,
    like: (id) => `/posts/${id}/like`,
    comments: (id) => `/posts/${id}/comments`,
  },
  profile: {
    detail: (userId) => `/users/${userId}`,
    follow: (userId) => `/users/${userId}/follow`,
  },
  ai: {
    coverLetter: '/ai/cover-letter',
    interview: '/ai/interview',
  },
};
