import { useState } from 'react';
import {
  MOCK_INTERVIEW_QUESTIONS,
  MOCK_INTERVIEW_SUMMARY,
} from '@/mocks/mockInterview';
// import { api } from '@/apis/axiosInstance'; // TODO: 백엔드/AI 연동 후 주석 해제

// 모의면접 진행: 질문 받아오기 / 답변 제출(피드백) / 추가질문. AI 연동 전 목 데이터 사용.
export function useInterview() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const current = MOCK_INTERVIEW_QUESTIONS[questionIndex];

  // 답변 제출 → 피드백 반환
  const submitAnswer = async () => {
    setIsSubmitting(true);
    try {
      // TODO: AI 연동 후 실제 api.post() 사용
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFeedback(current.feedback);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 추가질문: 다음 질문으로 이동 (목: 순환)
  const nextQuestion = () => {
    setFeedback(null);
    setQuestionIndex((prev) => (prev + 1) % MOCK_INTERVIEW_QUESTIONS.length);
  };

  return {
    question: current.question,
    feedback,
    isSubmitting,
    submitAnswer,
    nextQuestion,
    summary: MOCK_INTERVIEW_SUMMARY,
  };
}
