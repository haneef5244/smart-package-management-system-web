export type Size = 'SMALL' | 'MEDIUM' | 'LARGE';

export const SIZES: Size[] = ['SMALL', 'MEDIUM', 'LARGE'];

export type LockerStatus = 'AVAILABLE' | 'OCCUPIED';

export interface Locker {
  id: number;
  size: Size;
  status: LockerStatus;
  available: boolean;
}

export interface StoreResult {
  packageId: string;
  lockerId: number;
  pickupCode: string;
  size: Size;
  storedAt: string;
}

export interface StorageCharge {
  days: number;
  charge: number;
  ratePerDay: number;
}

export interface RetrievalResult {
  message: string;
  opened: boolean;
  lockerId: number;
  packageId: string;
  retrievedAt: string;
  storage: StorageCharge;
}
