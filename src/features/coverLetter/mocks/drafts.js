// 자소서_4 화면에서 사용할 mock 초안 데이터
// 실제 API 연동 전까지 임시로 사용

const MOCK_DRAFT_VARIANTS = [
  {
    content:
      '저는 대학 시절 교내 해커톤에 참여하며 팀원들과 함께 문제를 정의하고 해결책을 도출하는 과정에서 협업의 가치를 배웠습니다. 이 경험을 바탕으로 입사 후에도 주도적으로 문제를 발견하고 동료들과 함께 성장하는 개발자가 되고 싶습니다.',
    explanation:
      'AI는 팀워크와 문제해결 경험을 중심으로 답변을 구성했어요. 해커톤에서 맡았던 구체적인 역할과 성과를 한 문장 더 추가하면 설득력이 높아져요.',
  },
  {
    content:
      '학회 프로젝트 SPROUT을 진행하며 프론트엔드 개발과 팀 커뮤니케이션을 동시에 경험했습니다. 다양한 의견을 조율하며 완성도 높은 결과물을 만든 경험은 입사 후에도 협업 중심의 문제 해결에 큰 자산이 될 것입니다.',
    explanation:
      'AI는 협업 경험과 커뮤니케이션 역량에 집중해 답변을 작성했어요. 프로젝트에서 발생한 갈등을 어떻게 조율했는지 구체적인 사례를 덧붙이면 더 좋아요.',
  },
];

export const buildMockDraftAnswers = (questions, variantIndex = 0) =>
  questions.reduce((acc, question, index) => {
    acc[question.id] =
      MOCK_DRAFT_VARIANTS[(variantIndex + index) % MOCK_DRAFT_VARIANTS.length];
    return acc;
  }, {});
