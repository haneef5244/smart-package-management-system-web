import { api } from './client';
import type { RetrievalResult, Size, StoreResult } from './types';

export async function storePackage(size: Size): Promise<StoreResult> {
  const { data } = await api.post<StoreResult>('/packages/store', { size });
  return data;
}

export async function retrievePackage(
  lockerId: number,
  pickupCode: string,
): Promise<RetrievalResult> {
  const { data } = await api.post<RetrievalResult>('/packages/retrieve', {
    lockerId,
    pickupCode,
  });
  return data;
}
