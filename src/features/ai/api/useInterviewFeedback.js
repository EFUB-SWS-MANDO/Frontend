import { useState, useEffect } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_INTERVIEW_SUMMARY } from '@/mocks/mockInterview';

export function useInterviewFeedback(sessionId) {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (USE_MOCK) {
          await new Promise((resolve) => setTimeout(resolve, 300));
          if (!ignore) setResult(MOCK_INTERVIEW_SUMMARY);
          return;
        }
        const data = await api.get(ENDPOINTS.interviews.feedback(sessionId));
        if (!ignore) setResult(data);
      } catch (e) {
        if (!ignore) setError(e);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [sessionId]);

  return { result, isLoading, error };
}
