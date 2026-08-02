import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_HISTORY, MOCK_SAVED } from '@/mocks/mockRecords';

const STATUS_LABEL = {
  IN_PROGRESS: '진행 중',
  COMPLETED: '완료',
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
};

const groupByDate = (items) => {
  const groups = [];
  items.forEach((item) => {
    const last = groups[groups.length - 1];
    if (last?.date === item.date) last.items.push(item);
    else groups.push({ date: item.date, items: [item] });
  });
  return groups;
};

const fetchInterviewGroups = async () => {
  const MAX_PAGES = 50;
  const flat = [];
  let idAfter;
  let hasNext = true;
  let page = 0;
  while (hasNext && page < MAX_PAGES) {
    page += 1;
    const data = await api.get(ENDPOINTS.interviews.list, {
      params: idAfter !== undefined ? { idAfter } : undefined,
    });
    (data.interviews ?? []).forEach((item) => {
      flat.push({
        id: item.interviewSessionId,
        title: item.title,
        description: STATUS_LABEL[item.status] ?? '',
        date: formatDate(item.updatedAt),
      });
    });
    const nextIdAfter = data.nextIdAfter;
    hasNext =
      (data.hasNext ?? false) && nextIdAfter !== undefined && nextIdAfter !== idAfter;
    idAfter = nextIdAfter;
  }
  if (hasNext) {
    throw new Error('기록이 너무 많아 전체를 불러오지 못했습니다.');
  }
  return groupByDate(flat);
};

export function useRecords(type) {
  const [records, setRecords] = useState({ coverLetter: [], interview: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  const fetchRecords = useCallback(async () => {
    requestIdRef.current += 1;
    const requestId = requestIdRef.current;
    const isStale = () => requestId !== requestIdRef.current;
    setIsLoading(true);
    setError(null);
    try {
      if (USE_MOCK || type === 'saved') {
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (!isStale()) setRecords(type === 'saved' ? MOCK_SAVED : MOCK_HISTORY);
        return;
      }
      const interview = await fetchInterviewGroups();
      if (!isStale()) setRecords({ coverLetter: MOCK_HISTORY.coverLetter, interview });
    } catch (e) {
      if (!isStale()) setError(e);
    } finally {
      if (!isStale()) setIsLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const removeInterview = async (interviewSessionId) => {
    setError(null);
    if (!USE_MOCK) {
      try {
        await api.delete(ENDPOINTS.interviews.remove(interviewSessionId));
      } catch (e) {
        setError(e);
        return;
      }
    }
    setRecords((prev) => ({
      ...prev,
      interview: prev.interview
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => item.id !== interviewSessionId),
        }))
        .filter((group) => group.items.length > 0),
    }));
  };

  return { records, isLoading, error, refetch: fetchRecords, removeInterview };
}
