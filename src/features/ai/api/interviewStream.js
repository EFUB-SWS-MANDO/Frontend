import { ENDPOINTS } from '@/apis/endpoints';

export const openInterviewStream = (sessionId, ticket, handlers, lastEventId) => {
  const params = new URLSearchParams({ ticket });
  if (lastEventId != null) params.set('lastEventId', lastEventId);
  const url = `${import.meta.env.VITE_API_BASE_URL}${ENDPOINTS.interviews.stream(sessionId)}?${params.toString()}`;
  const source = new EventSource(url);

  const parse = (event) => {
    try {
      return JSON.parse(event.data);
    } catch {
      return null;
    }
  };

  source.addEventListener('question-delta', (event) => {
    const data = parse(event);
    if (data) handlers.onDelta?.(data, event.lastEventId);
  });
  source.addEventListener('question-done', (event) => {
    const data = parse(event);
    if (data) handlers.onDone?.(data, event.lastEventId);
  });
  source.addEventListener('question-error', (event) => {
    const data = parse(event);
    if (data) handlers.onQuestionError?.(data);
  });
  source.addEventListener('session-closed', (event) => {
    handlers.onClosed?.(parse(event));
  });
  source.onerror = () => {
    handlers.onConnectionError?.();
  };

  return source;
};
