import { useState, useEffect, useCallback } from 'react';
import { MOCK_PROFILE } from '@/mocks/mockProfile';
import { useAuthStore } from '@/stores/authStore';

// mock 데이터(id/name/intro/followingCount)를 명세서 응답 필드(memberId/nickname/bio/followeeCount)로 매핑.
// 실제 API는 이미 이 필드명으로 내려오므로, 백엔드 연동 시 이 매핑 함수는 제거하면 됨.
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
    goalMessage: mock.goalMessage,
  };
}

export function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const myUserId = useAuthStore((state) => state.user?.id);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: 백엔드 연동 후 api.get(ENDPOINTS.profile.detail(userId)) 사용, mapMockProfileToApiShape 제거
      await new Promise((resolve) => setTimeout(resolve, 300));
      const isMe = String(userId) === String(myUserId);
      setProfile(mapMockProfileToApiShape(MOCK_PROFILE, isMe));
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