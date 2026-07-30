import { useState, useEffect, useCallback } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
import { MOCK_COVER_LETTERS } from '@/mocks/mockCoverLetters';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
};

const groupByDate = (resumes) => {
  const groups = [];
  const groupByDateKey = new Map();
  resumes.forEach((resume) => {
    const date = formatDate(resume.createdAt);
    let group = groupByDateKey.get(date);
    if (!group) {
      group = { date, items: [] };
      groupByDateKey.set(date, group);
      groups.push(group);
    }
    group.items.push({ id: resume.resumeId, title: resume.title, description: '' });
  });
  return groups;
};

export function useCoverLetters() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoverLetters = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setGroups(MOCK_COVER_LETTERS);
        return;
      }

      const MAX_PAGES = 50;
      const flat = [];
      let idAfter;
      let hasNext = true;
      let page = 0;
      while (hasNext && page < MAX_PAGES) {
        page += 1;
        const data = await api.get(ENDPOINTS.resumes.list, {
          params: idAfter !== undefined ? { idAfter } : undefined,
        });
        (data.resumes ?? []).forEach((resume) => flat.push(resume));
        const nextIdAfter = data.nextIdAfter;
        hasNext =
          (data.hasNext ?? false) && nextIdAfter !== undefined && nextIdAfter !== idAfter;
        idAfter = nextIdAfter;
      }
      setGroups(groupByDate(flat));
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoverLetters();
  }, [fetchCoverLetters]);

  return { groups, isLoading, error, refetch: fetchCoverLetters };
}
