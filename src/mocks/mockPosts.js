// 백엔드 연동 전 목 데이터. tags/recruitStatus/isFollowing은 필터·탭 개발용.
export const MOCK_POSTS = [
  {
    id: 1,
    title: '끊임없는 학습',
    content:
      '빠르게 변화하는 환경에서 살아남으려면 끊임없는 학습이 필수입니다. 새로운 기술과 트렌드를 적극적으로 습득하세요.',
    author: { id: 1, name: '박민서', profileImage: '', isFollowing: true },
    createdAt: '2026.06.15 18:20',
    commentCount: 52,
    likeCount: 789012,
    tags: ['스터디'],
    recruitStatus: 'recruiting',
  },
  {
    id: 2,
    title: '새로운 도전',
    content:
      '사이드 프로젝트 팀원을 모집합니다. 실패를 두려워하지 않고 함께 성장할 분을 찾고 있어요.',
    author: { id: 2, name: '김하늘', profileImage: '', isFollowing: false },
    createdAt: '2026.06.16 09:45',
    commentCount: 34,
    likeCount: 987654,
    tags: ['프로젝트'],
    recruitStatus: 'recruiting',
  },
  {
    id: 3,
    title: '팀워크의 힘',
    content:
      '혼자 빠르게보다 함께 멀리 가는 팀. 서로의 강점을 살리고 약점을 채워주는 협업이 성장의 지름길입니다.',
    author: { id: 3, name: '이수진', profileImage: '', isFollowing: true },
    createdAt: '2026.06.18 14:02',
    commentCount: 45,
    likeCount: 456789,
    tags: ['대외활동'],
    recruitStatus: 'closed',
  },
  {
    id: 4,
    title: '끊임없는 학습',
    content:
      '북클럽에서 한 달에 두 권씩 읽고 있습니다. 기록으로 남기니 회고할 때 큰 자산이 되네요.',
    author: { id: 4, name: '박다혜', profileImage: '', isFollowing: false },
    createdAt: '2026.06.19 11:30',
    commentCount: 52,
    likeCount: 768013,
    tags: ['스터디'],
    recruitStatus: 'closed',
  },
  {
    id: 5,
    title: '도전 정신',
    content:
      '실패를 두려워하지 않고 새로운 시도를 계속하는 도전 정신이 성공의 열쇠입니다.',
    author: { id: 2, name: '김하늘', profileImage: '', isFollowing: false },
    createdAt: '2026.06.20 09:45',
    commentCount: 34,
    likeCount: 768013,
    tags: ['공모전'],
    recruitStatus: 'recruiting',
  },
  {
    id: 6,
    title: '인턴 회고',
    content:
      '3개월 인턴을 마치며 배운 것들을 정리했습니다. 작은 기록이 모여 면접에서 큰 무기가 됐어요.',
    author: { id: 5, name: '최우진', profileImage: '', isFollowing: true },
    createdAt: '2026.06.21 20:10',
    commentCount: 24,
    likeCount: 768013,
    tags: ['인턴'],
    recruitStatus: 'closed',
  },
];
