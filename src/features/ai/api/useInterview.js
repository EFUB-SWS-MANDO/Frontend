import { useState, useEffect, useRef } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import {
  MOCK_INTERVIEW_QUESTIONS,
  MOCK_INTERVIEW_SUMMARY,
} from '@/mocks/mockInterview';
import { openInterviewStream } from './interviewStream';

const TYPE_BY_MODE = {
  activity: 'POST',
  category: 'CATEGORY',
  'cover-letter': 'RESUME',
};

const buildSessionTitle = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `모의면접 ${pad(now.getMonth() + 1)}.${pad(now.getDate())}`;
};

export function useInterview({ mode, selection } = {}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(
    USE_MOCK ? MOCK_INTERVIEW_QUESTIONS[0].question : '',
  );
  const [isQuestionLoading, setIsQuestionLoading] = useState(!USE_MOCK);
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const streamRef = useRef(null);
  const questionIdRef = useRef(null);
  const lastEventIdRef = useRef(null);
  const reconnectedRef = useRef(false);

  useEffect(() => {
    if (USE_MOCK) return undefined;
    let ignore = false;

    const connectStream = (interviewSessionId, ticket) => {
      streamRef.current = openInterviewStream(
        interviewSessionId,
        ticket,
        {
          onDelta: (data, eventId) => {
            lastEventIdRef.current = eventId ?? lastEventIdRef.current;
            if (questionIdRef.current !== data.questionId) {
              questionIdRef.current = data.questionId;
              setQuestion('');
            }
            setQuestion((prev) => prev + data.content);
          },
          onDone: (data, eventId) => {
            lastEventIdRef.current = eventId ?? lastEventIdRef.current;
            questionIdRef.current = data.questionId;
            setQuestion(data.question);
            setIsQuestionLoading(false);
          },
          onQuestionError: (data) => {
            setError(new Error(data.message));
            setIsQuestionLoading(false);
          },
          onClosed: () => {
            streamRef.current?.close();
            streamRef.current = null;
          },
          onConnectionError: async () => {
            if (ignore || reconnectedRef.current) return;
            reconnectedRef.current = true;
            streamRef.current?.close();
            try {
              const detail = await api.get(
                ENDPOINTS.interviews.detail(interviewSessionId),
              );
              if (!ignore && detail.sseTicket) {
                connectStream(interviewSessionId, detail.sseTicket);
              }
            } catch (e) {
              if (!ignore) setError(e);
            }
          },
        },
        lastEventIdRef.current,
      );
    };

    (async () => {
      try {
        const data = await api.post(ENDPOINTS.interviews.create, {
          type: TYPE_BY_MODE[mode] ?? 'POST',
          title: buildSessionTitle(),
          targetIds: selection ?? [],
        });
        if (ignore) return;
        setSessionId(data.interviewSessionId);
        questionIdRef.current = data.questionId;
        connectStream(data.interviewSessionId, data.sseTicket);
      } catch (e) {
        if (!ignore) {
          setError(e);
          setIsQuestionLoading(false);
        }
      }
    })();

    return () => {
      ignore = true;
      streamRef.current?.close();
      streamRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitAnswer = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFeedback(MOCK_INTERVIEW_QUESTIONS[questionIndex].feedback);
    } finally {
      setIsSubmitting(false);
    }
  };

  const moveToNextMockQuestion = () => {
    setFeedback(null);
    setQuestionIndex((prev) => {
      const next = (prev + 1) % MOCK_INTERVIEW_QUESTIONS.length;
      setQuestion(MOCK_INTERVIEW_QUESTIONS[next].question);
      return next;
    });
  };

  const nextQuestion = () => {
    moveToNextMockQuestion();
  };

  const followUpQuestion = () => {
    moveToNextMockQuestion();
  };

  return {
    question,
    isQuestionLoading,
    feedback,
    isSubmitting,
    error,
    sessionId,
    submitAnswer,
    nextQuestion,
    followUpQuestion,
    summary: MOCK_INTERVIEW_SUMMARY,
  };
}
