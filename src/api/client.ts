import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Pull a human-readable message out of an Axios error. The NestJS API returns
 * `{ message: string | string[] }`; validation errors come back as arrays.
 */
export function getApiErrorMessage(err: unknown, fallback = 'Something went wrong'): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { message?: string | string[] } | undefined;
    const message = data?.message;
    if (Array.isArray(message)) return message.join(', ');
    if (typeof message === 'string') return message;
    if (err.code === 'ERR_NETWORK') {
      return 'Cannot reach the API. Is it running on ' + api.defaults.baseURL + '?';
    }
  }
  return fallback;
}
