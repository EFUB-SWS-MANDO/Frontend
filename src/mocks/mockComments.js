export const MOCK_COMMENTS = [
  {
    id: 1,
    author: { id: 2, name: '람세스18세', profileImage: '' },
    createdAt: '2026.01.12 23:50',
    content: '우왕 너무 유익해요~~!우왕 너무 유익해요~~!',
    isPrivate: false,
    isDeleted: false,
    replies: [
      {
        id: 11,
        author: { id: 3, name: '람세스2세', profileImage: '' },
        createdAt: '2026.01.12 23:50',
        content: '대댓글입니다 대댓글이에요~',
        isPrivate: false,
        isDeleted: false,
      },
    ],
  },
  {
    id: 2,
    author: { id: 0, name: '람지우2세', profileImage: '' },
    createdAt: '2026.01.12 23:55',
    content: '저도 완전 동감이에요! 도움 많이 됐어요.',
    isPrivate: false,
    isDeleted: false,
    replies: [],
  },
];
