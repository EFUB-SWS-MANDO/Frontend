import { useState, useEffect } from 'react';
import { MOCK_COVER_LETTERS } from '@/mocks/mockCoverLetters';

export function useCoverLetters() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (!ignore) setGroups(MOCK_COVER_LETTERS);
      } catch (e) {
        if (!ignore) setError(e);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  return { groups, isLoading, error };
}
