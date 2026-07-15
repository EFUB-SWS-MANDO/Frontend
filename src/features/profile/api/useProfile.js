import { useState, useEffect, useCallback } from 'react';
import { MOCK_PROFILE } from '@/mocks/mockProfile';

export function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: 백엔드 연동 후 아래 mock 대신 실제 api.get() 사용
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProfile(MOCK_PROFILE);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isLoading, error, refetch: fetchProfile };
}