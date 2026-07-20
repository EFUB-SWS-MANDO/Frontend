import { useState, useEffect } from 'react';
import { MOCK_HISTORY, MOCK_SAVED } from '@/mocks/mockRecords';

export function useRecords(type) {
  const [records, setRecords] = useState({ coverLetter: [], interview: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (!ignore) setRecords(type === 'saved' ? MOCK_SAVED : MOCK_HISTORY);
      } catch (e) {
        if (!ignore) setError(e);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [type]);

  return { records, isLoading, error };
}
