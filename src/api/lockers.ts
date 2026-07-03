import { api } from './client';
import type { Locker, Size } from './types';

export async function fetchLockers(): Promise<Locker[]> {
  const { data } = await api.get<Locker[]>('/lockers');
  return data;
}

export async function createLocker(size: Size): Promise<Locker> {
  const { data } = await api.post<Locker>('/lockers', { size });
  return data;
}
