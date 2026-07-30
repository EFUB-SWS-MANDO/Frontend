import { useState } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { buildMockDraftAnswers } from '../mocks/drafts';

// 자소서 생성. questions: [{ id, content, maxLength }]
export function useCreateResume() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const createResume = async ({ title, postIds, questions }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const drafts = buildMockDraftAnswers(questions, 0);
        return {
          resumeId: Date.now(),
          title,
          createdAt: new Date().toISOString(),
          questions: questions.map((q, index) => ({
            questionId: q.id,
            order: index + 1,
            content: q.content,
            maxLength: q.maxLength,
            answer: drafts[q.id]?.content ?? '',
            description: drafts[q.id]?.explanation ?? '',
          })),
        };
      }

      const data = await api.post(ENDPOINTS.resumes.create, {
        title,
        postIds,
        questions: questions.map((q, index) => ({ order: index + 1, content: q.content })),
      });

      return {
        resumeId: data.resumeId,
        title: data.title,
        createdAt: data.createdAt,
        questions: data.questions.map((q) => ({
          questionId: q.questionId,
          order: q.order,
          content: q.content,
          // API는 maxLength를 내려주지 않아 요청 시 순서(order)로 매칭해 보존
          maxLength: questions[q.order - 1]?.maxLength,
          answer: q.answer,
          description: q.description,
        })),
      };
    } catch (e) {
      setError(e);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createResume, isSubmitting, error };
}
