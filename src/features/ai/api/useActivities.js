import { useState, useEffect } from 'react';
import { MOCK_ACTIVITIES } from '@/mocks/mockActivities';
// import { api } from '@/apis/axiosInstance'; // TODO: 백엔드 연동 후 주석 해제

// 모의면접에 불러올 활동 목록. 백엔드 연동 전 목 데이터 사용.
export function useActivities() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        // TODO: 백엔드 연동 후 실제 api.get() 사용
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (!ignore) setActivities(MOCK_ACTIVITIES);
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

  return { activities, isLoading, error };
}
