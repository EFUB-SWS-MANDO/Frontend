import { useState, useEffect, useCallback } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
};

export function useMyPageData() {
  const [motivation, setMotivation] = useState('');
  const [stats, setStats] = useState(null);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: 컴포넌트 언마운트/재요청 시 이전 요청 취소 처리 (AbortController 등) 필요
      const data = await api.get(ENDPOINTS.dashboard.get);
      setMotivation(data.motivation);
      setStats(data.statistics);
      setRecords(
        data.recentActivities.map((record) => ({
          ...record,
          updatedAt: formatDate(record.updatedAt),
        })),
      );
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { motivation, stats, records, isLoading, error, refetch: fetchData };
}
