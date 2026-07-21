import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { ENDPOINTS } from '@/apis/endpoints';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${ENDPOINTS.auth.refresh}`,
        null,
        { withCredentials: true },
      )
      .then((res) => {
        const accessToken = res.data?.data?.accessToken;
        if (!accessToken) throw new Error('no accessToken in refresh response');
        useAuthStore.getState().setAccessToken(accessToken);
        return accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (res) => res.data?.data,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      try {
        const token = await refreshAccessToken();
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      } catch {
        useAuthStore.getState().logout();
      }
    }

    const message = error.response?.data?.message ?? error.message;
    return Promise.reject(new Error(message));
  },
);
