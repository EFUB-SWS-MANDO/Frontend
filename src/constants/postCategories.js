// 게시글 카테고리 - 백엔드는 영문 enum으로 주고받음(LEADERSHIP, COMMUNICATION 등).
// 아래 매핑은 실제 명세에서 확인된 3개(LEADERSHIP/COMMUNICATION/PLANNING) 외 나머지는
// 프론트에서 합리적으로 추정한 값이라 백엔드 확인 필요.
export const POST_CATEGORIES = [
  { code: 'COLLABORATION', label: '협업' },
  { code: 'PROBLEM_SOLVING', label: '문제해결' },
  { code: 'COMMUNICATION', label: '의사소통' },
  { code: 'LEADERSHIP', label: '리더십' },
  { code: 'CHALLENGE', label: '도전' },
  { code: 'ACHIEVEMENT', label: '성과' },
  { code: 'GROWTH', label: '성장' },
  { code: 'JOB_COMPETENCY', label: '직무역량' },
  { code: 'CREATIVITY', label: '창의성' },
  { code: 'RESPONSIBILITY', label: '책임감' },
  { code: 'CONFLICT_MANAGEMENT', label: '갈등관리' },
  { code: 'PLANNING', label: '기획력' },
];

export function categoryLabelToCode(label) {
  return POST_CATEGORIES.find((c) => c.label === label)?.code ?? label;
}

export function categoryCodeToLabel(code) {
  return POST_CATEGORIES.find((c) => c.code === code)?.label ?? code;
}
