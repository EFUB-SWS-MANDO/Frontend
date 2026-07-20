import { useState, useEffect } from 'react';
import { MOCK_HISTORY, MOCK_SAVED } from '@/mocks/mockRecords';
// import { api } from '@/apis/axiosInstance'; // TODO: 백엔드 연동 후 주석 해제

// 과거 기록('history') / 저장 목록('saved') 데이터. 백엔드 연동 전 목 데이터 사용.
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
        // TODO: 백엔드 연동 후 실제 api.get() 사용
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
