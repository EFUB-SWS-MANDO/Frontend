import axios from 'axios';
import { api } from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export async function uploadPostFile(file) {
  const { uploadUrl, fileKey } = await api.post(ENDPOINTS.files.presignedUrl, {
    fileName: file.name,
    contentType: file.type,
    uploadType: 'POST',
  });
  await axios.put(uploadUrl, file, {
    headers: { 'Content-Type': file.type },
    timeout: 30000,
  });
  return fileKey;
}
