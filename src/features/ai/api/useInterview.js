import { useState } from 'react';
import {
  MOCK_INTERVIEW_QUESTIONS,
  MOCK_INTERVIEW_SUMMARY,
} from '@/mocks/mockInterview';

export function useInterview() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const current = MOCK_INTERVIEW_QUESTIONS[questionIndex];

  const submitAnswer = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFeedback(current.feedback);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    setQuestionIndex((prev) => (prev + 1) % MOCK_INTERVIEW_QUESTIONS.length);
  };

  const prevQuestion = () => {
    setFeedback(null);
    setQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  return {
    question: current.question,
    feedback,
    isSubmitting,
    submitAnswer,
    nextQuestion,
    prevQuestion,
    hasPrevQuestion: questionIndex > 0,
    summary: MOCK_INTERVIEW_SUMMARY,
  };
}
