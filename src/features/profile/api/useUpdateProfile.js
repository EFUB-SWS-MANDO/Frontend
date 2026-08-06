import { useState } from 'react';
import axios from 'axios';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { MOCK_AUTH } from '@/apis/config';
import { MOCK_PROFILE } from '@/mocks/mockProfile';
import { useAuthStore } from '@/stores/authStore';

// presigned URL 발급(내부 API) 후 S3에 직접 업로드(외부 요청)
async function uploadProfileImage(file) {
  const { uploadUrl, fileKey } = await api.post(ENDPOINTS.files.presignedUrl, {
    fileName: file.name,
    contentType: file.type,
    uploadType: 'PROFILE',
  });
  await axios.put(uploadUrl, file, {
    headers: { 'Content-Type': file.type },
    timeout: 10000,
  });
  return fileKey;
}

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
