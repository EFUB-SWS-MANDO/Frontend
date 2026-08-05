import { useState } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { uploadProfileImage } from '@/apis/uploadProfileImage';
import { MOCK_AUTH } from '@/apis/config';
import { MOCK_PROFILE } from '@/mocks/mockProfile';
import { useAuthStore } from '@/stores/authStore';

// 프로필 수정(닉네임/프로필 이미지/소개글) 제출.
export function useUpdateProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const setAuth = useAuthStore((s) => s.setAuth);

  const updateProfile = async ({ nickname, bio, profileImageFile }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const previousImage = useAuthStore.getState().user?.profileImage ?? null;
      let profileImage = previousImage;

      // 목 모드면 API 호출 없이 목 데이터만 갱신 (시연/개발용)
      if (MOCK_AUTH) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (profileImageFile) {
          profileImage = URL.createObjectURL(profileImageFile);
          if (previousImage?.startsWith('blob:')) URL.revokeObjectURL(previousImage);
        }
      } else {
        const payload = { nickname, bio };
        if (profileImageFile) {
          payload.profileImage = await uploadProfileImage(profileImageFile);
        }
        const data = await api.patch(ENDPOINTS.profile.update, payload);
        profileImage = data?.profileImage ?? profileImage;
      }

      MOCK_PROFILE.name = nickname;
      MOCK_PROFILE.intro = bio;
      MOCK_PROFILE.profileImage = profileImage;

      const authUser = useAuthStore.getState().user;
      if (authUser) {
        setAuth({
          accessToken: useAuthStore.getState().accessToken,
          user: { ...authUser, nickname, profileImage },
        });
      }

      return true;
    } catch (e) {
      setError(e);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { updateProfile, isSubmitting, error };
}
