import { useState, useEffect, useCallback } from 'react';
import { MOCK_MYPAGE_STATS } from '../mocks/mockMyPageStats';
import { MOCK_ACTIVITY_RECORDS } from '../mocks/mockActivityRecords';

export function useMyPageData() {
  const [stats, setStats] = useState(null);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: 백엔드 연동 후 아래 mock 대신 실제 api.get() 사용
      // TODO: 컴포넌트 언마운트/재요청 시 이전 요청 취소 처리 (AbortController 등) 필요
      await new Promise((resolve) => setTimeout(resolve, 300));
      setStats(MOCK_MYPAGE_STATS);
      setRecords(MOCK_ACTIVITY_RECORDS);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { stats, records, isLoading, error, refetch: fetchData };
}
