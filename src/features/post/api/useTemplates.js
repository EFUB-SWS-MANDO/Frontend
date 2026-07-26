import { useState, useEffect } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_TEMPLATE } from '@/mocks/mockTemplates';

export function useTemplates(type = 'BASIC') {
  const [values, setValues] = useState([]);
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
          if (!ignore) setValues(MOCK_TEMPLATE.values);
          return;
        }
        const data = await api.get(ENDPOINTS.templates.list, {
          params: { type },
        });
        if (!ignore) setValues(data.values ?? []);
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

  return { values, isLoading, error };
}
