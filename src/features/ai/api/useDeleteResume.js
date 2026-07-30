import { useState } from 'react';
import { api } from '@/apis/axiosInstance';
import { ENDPOINTS } from '@/apis/endpoints';
import { USE_MOCK } from '@/apis/config';

// 자소서 삭제.
// TODO: 삭제 버튼을 붙일 화면이 생기면 연결
export function useDeleteResume() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteResume = async (resumeId) => {
    setIsDeleting(true);
    setError(null);
    try {
      if (!USE_MOCK) {
        await api.delete(ENDPOINTS.resumes.remove(resumeId));
      }
      return true;
    } catch (e) {
      setError(e);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteResume, isDeleting, error };
}
