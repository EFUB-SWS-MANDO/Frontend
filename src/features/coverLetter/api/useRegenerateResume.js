import { useState } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { buildMockDraftAnswers } from '../mocks/drafts';

// 자소서 재생성. 전체 문항 답변을 덮어쓰며 되돌리기 불가.
export function useRegenerateResume() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const regenerateResume = async (resumeId, questions, variantIndex = 0) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const drafts = buildMockDraftAnswers(questions, variantIndex);
        return questions.map((q) => ({
          questionId: q.id,
          content: q.content,
          maxLength: q.maxLength,
          answer: drafts[q.id]?.content ?? '',
          description: drafts[q.id]?.explanation ?? '',
        }));
      }

      const data = await api.post(ENDPOINTS.resumes.regenerate(resumeId), null, { timeout: 120000 });
      return data.questions.map((q) => ({
        questionId: q.questionId,
        order: q.order,
        content: q.content,
        maxLength: questions.find((orig) => orig.id === q.questionId)?.maxLength,
        answer: q.answer,
        description: q.description,
      }));
    } catch (e) {
      setError(e);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { regenerateResume, isSubmitting, error };
}
