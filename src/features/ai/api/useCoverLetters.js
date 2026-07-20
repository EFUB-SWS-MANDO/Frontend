import { useState, useEffect } from 'react';
import { MOCK_COVER_LETTERS } from '@/mocks/mockCoverLetters';
// import { api } from '@/apis/axiosInstance'; // TODO: 백엔드 연동 후 주석 해제

// 모의면접에 불러올 자소서/활동 목록(날짜별 그룹). 백엔드 연동 전 목 데이터 사용.
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
        // TODO: 백엔드 연동 후 실제 api.get() 사용
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
