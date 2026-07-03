import { useMutation, useQueryClient } from '@tanstack/react-query';
import { retrievePackage, storePackage } from '../api/packages';
import type { Size } from '../api/types';
import { lockersKey } from './useLockers';

export function useStorePackage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (size: Size) => storePackage(size),
    // A stored package changes locker availability.
    onSuccess: () => qc.invalidateQueries({ queryKey: lockersKey }),
  });
}

export function useRetrievePackage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { lockerId: number; pickupCode: string }) =>
      retrievePackage(vars.lockerId, vars.pickupCode),
    // A retrieved package frees its locker.
    onSuccess: () => qc.invalidateQueries({ queryKey: lockersKey }),
  });
}
