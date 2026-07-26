import axios from 'axios';
import { api } from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export async function uploadProfileImage(file) {
  const { uploadUrl, fileKey } = await api.post(ENDPOINTS.files.presignedUrl, {
    fileName: file.name,
    contentType: file.type,
    uploadType: 'PROFILE',
  });
  await axios.put(uploadUrl, file, {
    headers: { 'Content-Type': file.type },
    timeout: 10000,
  });
  // TODO: 프로필 생성/수정 요청 필드명이 profileImage인지 fileKey인지 백엔드 확인 필요
  return fileKey;
}
