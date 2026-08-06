import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK, MOCK_AUTH } from '@/apis/config';
import { MOCK_PROFILE } from '@/mocks/mockProfile';
import { useAuthStore } from '@/stores/authStore';

function mapMockProfileToApiShape(mock, isMe) {
  return {
    memberId: mock.id,
    nickname: mock.name,
    profileImage: mock.profileImage,
    bio: mock.intro,
    followerCount: mock.followerCount,
    followeeCount: mock.followingCount,
    sproutLevel: mock.sproutLevel,
    isMe,
    isFollowing: mock.isFollowing ?? false,
    goalMessage: mock.goalMessage,
  };
}

export function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const myUserId = useAuthStore((state) => state.user?.id);
  const requestIdRef = useRef(0);

  const fetchProfile = useCallback(async () => {
    if (userId == null) {
      requestIdRef.current += 1;
      setProfile(null);
      setError(null);
      setIsLoading(false);
      return;
    }
    requestIdRef.current += 1;
    const requestId = requestIdRef.current;
    const isStale = () => requestId !== requestIdRef.current;
    setIsLoading(true);
    setError(null);
    try {
      const isMe = myUserId != null && String(userId) === String(myUserId);
      if (USE_MOCK || MOCK_AUTH) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (!isStale()) setProfile(mapMockProfileToApiShape(MOCK_PROFILE, isMe));
        return;
      }
      const data = await api.get(ENDPOINTS.profile.detail(userId));
      if (!isStale()) setProfile({ ...data, isMe: data.isMe ?? isMe });
    } catch (e) {
      if (!isStale()) setError(e);
    } finally {
      if (!isStale()) setIsLoading(false);
    }
  }, [userId, myUserId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isLoading, error, refetch: fetchProfile };
}