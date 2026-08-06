// 게시글 카테고리 - 백엔드는 영문 enum으로 주고받음(LEADERSHIP, COMMUNICATION 등).
// 카테고리 조회 명세(GET /api/categories) 기준 15종.
export const POST_CATEGORIES = [
  { code: 'COLLABORATION', label: '협업' },
  { code: 'PROBLEM_SOLVING', label: '문제해결' },
  { code: 'COMMUNICATION', label: '의사소통' },
  { code: 'LEADERSHIP', label: '리더십' },
  { code: 'CHALLENGE', label: '도전' },
  { code: 'ACHIEVEMENT', label: '성과' },
  { code: 'GROWTH', label: '성장' },
  { code: 'PROFESSIONAL_SKILLS', label: '직무역량' },
  { code: 'CREATIVITY', label: '창의성' },
  { code: 'RESPONSIBILITY', label: '책임감' },
  { code: 'CONFLICT_MANAGEMENT', label: '갈등관리' },
  { code: 'PLANNING', label: '기획력' },
  { code: 'EXTERNAL_ACTIVITY', label: '대외활동' },
  { code: 'CONTEST', label: '공모전' },
  { code: 'ETC', label: '기타' },
];

// 서버 표기가 바뀌었거나 문서에만 남은 구 코드 흡수용
const LEGACY_CODE_LABELS = {
  JOB_COMPETENCY: '직무역량',
  COOPERATE: '협업',
};

// 스네이크/카멜/파스칼 등 표기 차이를 흡수하기 위해 구분자 제거 + 대문자 기준으로 비교한다.
const normalizeCode = (code) => String(code).replace(/[_\s-]/g, '').toUpperCase();

const LABEL_BY_NORMALIZED_CODE = new Map([
  ...POST_CATEGORIES.map(({ code, label }) => [normalizeCode(code), label]),
  ...Object.entries(LEGACY_CODE_LABELS).map(([code, label]) => [normalizeCode(code), label]),
]);

export function categoryLabelToCode(label) {
  return POST_CATEGORIES.find((c) => c.label === label)?.code ?? label;
}

export function categoryCodeToLabel(code) {
  return LABEL_BY_NORMALIZED_CODE.get(normalizeCode(code)) ?? code;
}
