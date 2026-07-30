import { useState, useEffect, useCallback } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';

// 자소서 상세 조회. 문항별 answer(AI 답변)와 description(AI가 강조한 점) 포함.
// TODO: 상세를 보여줄 화면이 생기면 연결
const mapResumeDetail = (raw) => ({
  resumeId: raw.resumeId,
  title: raw.title,
  createdAt: raw.createdAt,
  questions: raw.questions.map((q) => ({
    questionId: q.questionId,
    order: q.order,
    content: q.content,
    answer: q.answer,
    description: q.description,
  })),
});

export function useResumeDetail(resumeId) {
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (resumeId == null) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setResume(null);
        return;
      }
      const data = await api.get(ENDPOINTS.resumes.detail(resumeId));
      setResume(mapResumeDetail(data));
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { resume, isLoading, error, refetch: fetchDetail };
}
