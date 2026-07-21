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

  const followUpQuestion = () => {
    setFeedback(null);
    setQuestionIndex((prev) => (prev + 1) % MOCK_INTERVIEW_QUESTIONS.length);
  };

  return {
    question: current.question,
    feedback,
    isSubmitting,
    submitAnswer,
    nextQuestion,
    followUpQuestion,
    summary: MOCK_INTERVIEW_SUMMARY,
  };
}
