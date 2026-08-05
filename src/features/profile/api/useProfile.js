import { useState, useEffect, useCallback } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';
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

  const fetchProfile = useCallback(async () => {
    if (userId == null) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const isMe = myUserId != null && String(userId) === String(myUserId);
        setProfile(mapMockProfileToApiShape(MOCK_PROFILE, isMe));
      } else {
        const data = await api.get(ENDPOINTS.profile.detail(userId));
        setProfile(data);
      }
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [userId, myUserId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isLoading, error, refetch: fetchProfile };
}