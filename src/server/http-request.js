import { createFetch } from 'ofetch';
import { useUserStore } from '@/store/user';

// httpRequestGitstars

export const httpRequestGitstars = createFetch();

// httpRequestGithub

export const httpRequestGithub = createFetch({
  baseURL: 'https://api.github.com',
  onRequest({ options }) {
    const userStore = useUserStore();
    if (userStore.token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${userStore.token}`,
      };
    }
  },
  onResponseError({ response }) {
    // access_token 失效
    if (response.status === 401) {
      localStorage.clear();
      location.reload();
    }
  },
});
