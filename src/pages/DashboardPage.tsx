import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { LockerCard } from '../components/LockerCard';
import { SIZES, type Size } from '../api/types';
import { getApiErrorMessage } from '../api/client';
import { useCreateLocker, useLockers } from '../hooks/useLockers';

function StatTile({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <Card className="px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
        {label}
      </p>
      <p className={`mt-1 text-3xl font-bold ${accent}`}>{value}</p>
    </Card>
  );
}

export function DashboardPage() {
  const { data: lockers, isLoading, isError, error } = useLockers();
  const createLocker = useCreateLocker();
  const [newSize, setNewSize] = useState<Size>('SMALL');

  const total = lockers?.length ?? 0;
  const available = lockers?.filter((l) => l.available).length ?? 0;
  const occupied = total - available;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Locker dashboard</h1>
          <p className="mt-1 text-sm text-ink-500">
            Live view of every locker and its availability.
          </p>
        </div>

        <div className="flex items-end gap-2">
          <label className="flex flex-col gap-1 text-xs font-medium text-ink-500">
            Add locker
            <select
              value={newSize}
              onChange={(e) => setNewSize(e.target.value as Size)}
              className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-semibold text-ink-800 focus:border-brand-400 focus:outline-none"
            >
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <Button
            variant="secondary"
            loading={createLocker.isPending}
            onClick={() => createLocker.mutate(newSize)}
          >
            + Create
          </Button>
        </div>
      </div>

      {createLocker.isError && (
        <p className="text-sm text-red-600">
          {getApiErrorMessage(createLocker.error)}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile label="Total lockers" value={total} accent="text-ink-900" />
        <StatTile label="Available" value={available} accent="text-emerald-600" />
        <StatTile label="Occupied" value={occupied} accent="text-brand-600" />
      </div>

      <section>
        {isLoading && <p className="text-sm text-ink-500">Loading lockers…</p>}

        {isError && (
          <Card className="p-6">
            <p className="text-sm font-medium text-red-600">
              {getApiErrorMessage(error, 'Could not load lockers.')}
            </p>
          </Card>
        )}

        {lockers && lockers.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-sm text-ink-500">
              No lockers yet. Add one above (or run{' '}
              <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">
                npm run seed
              </code>{' '}
              in the API) to get started.
            </p>
          </Card>
        )}

        {lockers && lockers.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {lockers.map((locker) => (
              <LockerCard key={locker.id} locker={locker} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
