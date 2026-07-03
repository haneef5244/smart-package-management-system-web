import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLocker, fetchLockers } from '../api/lockers';
import type { Size } from '../api/types';

export const lockersKey = ['lockers'] as const;

export function useLockers() {
  return useQuery({
    queryKey: lockersKey,
    queryFn: fetchLockers,
  });
}

export function useCreateLocker() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (size: Size) => createLocker(size),
    onSuccess: () => qc.invalidateQueries({ queryKey: lockersKey }),
  });
}
