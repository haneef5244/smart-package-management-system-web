import { useState, type FormEvent } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { getApiErrorMessage } from '../api/client';
import type { RetrievalResult } from '../api/types';
import { useRetrievePackage } from '../hooks/usePackages';

export function RetrievePage() {
  const [lockerId, setLockerId] = useState('');
  const [pickupCode, setPickupCode] = useState('');
  const [result, setResult] = useState<RetrievalResult | null>(null);
  const retrieve = useRetrievePackage();

  const canSubmit = lockerId.trim() !== '' && pickupCode.trim().length >= 4;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setResult(null);
    retrieve.mutate(
      { lockerId: Number(lockerId), pickupCode: pickupCode.trim().toUpperCase() },
      { onSuccess: (data) => setResult(data) },
    );
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Retrieve a package</h1>
        <p className="mt-1 text-sm text-ink-500">
          Customer view. Enter your locker number and pickup code to open the
          locker.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink-700">
              Locker number
            </label>
            <input
              inputMode="numeric"
              value={lockerId}
              onChange={(e) =>
                setLockerId(e.target.value.replace(/[^0-9]/g, ''))
              }
              placeholder="e.g. 3"
              className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink-700">
              Pickup code
            </label>
            <input
              value={pickupCode}
              onChange={(e) => setPickupCode(e.target.value.toUpperCase())}
              placeholder="e.g. AGW7L42A"
              className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 font-mono text-sm tracking-widest text-ink-900 placeholder:font-sans placeholder:tracking-normal placeholder:text-ink-400 focus:border-brand-400 focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit}
            loading={retrieve.isPending}
          >
            Open locker
          </Button>

          {retrieve.isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {getApiErrorMessage(retrieve.error, 'Could not retrieve package.')}
            </div>
          )}
        </form>
      </Card>

      {result && (
        <Card className="space-y-4 border-emerald-200 bg-emerald-50/40 p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-sm text-white">
              ✓
            </span>
            <h2 className="text-lg font-bold text-ink-900">{result.message}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Detail label="Locker" value={`#${result.lockerId}`} mono />
            <Detail
              label="Retrieved at"
              value={new Date(result.retrievedAt).toLocaleString()}
            />
            <Detail label="Days stored" value={String(result.storage.days)} />
            <Detail
              label="Storage charge"
              value={`${result.storage.charge}`}
              accent
            />
          </div>

          <p className="text-xs text-ink-500">
            Charge is billed at {result.storage.ratePerDay}/day for the first 5
            days, then 2× and 3× for longer stays.
          </p>
        </Card>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
        {label}
      </p>
      <p
        className={`mt-0.5 text-lg font-bold ${mono ? 'font-mono' : ''} ${
          accent ? 'text-brand-600' : 'text-ink-900'
        }`}
      >
        {value}
      </p>
    </div>
  );
}
