import { useState, useEffect } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_CATEGORIES } from '@/mocks/mockCategories';
import { categoryCodeToLabel } from '@/constants/postCategories';

export function useCategories() {
  const [categories, setCategories] = useState([]);
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
          if (!ignore) setCategories(MOCK_CATEGORIES);
          return;
        }
        const data = await api.get(ENDPOINTS.categories.list);
        const codes = data.categories ?? [];
        if (!ignore) {
          setCategories(codes.map((code) => ({ id: code, name: categoryCodeToLabel(code) })));
        }
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

  return { categories, isLoading, error };
}
