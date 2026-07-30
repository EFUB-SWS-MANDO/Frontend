import { useState, useEffect, useRef } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_INTERVIEW_QUESTIONS } from '@/mocks/mockInterview';
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
            if (ignore) return;
            if (reconnectedRef.current) {
              setError(new Error('질문 스트림 연결이 끊어졌습니다.'));
              setIsQuestionLoading(false);
              return;
            }
            reconnectedRef.current = true;
            streamRef.current?.close();
            try {
              const detail = await api.get(
                ENDPOINTS.interviews.detail(interviewSessionId),
              );
              if (ignore) return;
              if (detail.sseTicket) {
                connectStream(interviewSessionId, detail.sseTicket);
              } else {
                setError(new Error('질문 스트림 연결이 끊어졌습니다.'));
                setIsQuestionLoading(false);
              }
            } catch (e) {
              if (!ignore) {
                setError(e);
                setIsQuestionLoading(false);
              }
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

  const submitAnswer = async (answer) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setFeedback(MOCK_INTERVIEW_QUESTIONS[questionIndex].feedback);
        return;
      }
      const data = await api.post(ENDPOINTS.interviews.feedback(sessionId), {
        questionId: questionIdRef.current,
        answer,
      });
      setFeedback(data.feedback);
      streamRef.current?.close();
      streamRef.current = null;
    } catch (e) {
      setError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const moveToNextMockQuestion = () => {
    setFeedback(null);
    const next = (questionIndex + 1) % MOCK_INTERVIEW_QUESTIONS.length;
    setQuestionIndex(next);
    setQuestion(MOCK_INTERVIEW_QUESTIONS[next].question);
  };

  const requestNextQuestion = async (type, answer) => {
    if (USE_MOCK) {
      moveToNextMockQuestion();
      return;
    }
    setError(null);
    setIsQuestionLoading(true);
    setFeedback(null);
    try {
      await api.post(ENDPOINTS.interviews.question(sessionId), {
        type,
        questionId: questionIdRef.current,
        answer,
      });
    } catch (e) {
      setError(e);
      setIsQuestionLoading(false);
    }
  };

  const nextQuestion = (answer) => requestNextQuestion('EXTRA', answer);

  const followUpQuestion = (answer) => requestNextQuestion('FOLLOW_UP', answer);

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
  };
}
