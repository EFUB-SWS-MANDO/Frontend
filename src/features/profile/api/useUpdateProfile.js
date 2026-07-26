import { useState } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { uploadProfileImage } from '@/apis/uploadProfileImage';
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
      let profileImage = MOCK_PROFILE.profileImage;

      // VITE_MOCK_AUTH=true면 API 호출 없이 목 데이터만 갱신 (시연/개발용)
      if (import.meta.env.VITE_MOCK_AUTH === 'true') {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (profileImageFile) profileImage = URL.createObjectURL(profileImageFile);
      } else {
        if (profileImageFile) {
          profileImage = await uploadProfileImage(profileImageFile);
        }
        // TODO: 백엔드 연동 후 응답 필드명 확인되면 매핑 보정
        await api.patch(ENDPOINTS.profile.update, { nickname, bio, profileImage });
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
