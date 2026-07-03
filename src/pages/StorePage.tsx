import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SizeBadge } from '../components/SizeBadge';
import { getApiErrorMessage } from '../api/client';
import { SIZES, type Size, type StoreResult } from '../api/types';
import { useStorePackage } from '../hooks/usePackages';

const sizeHint: Record<Size, string> = {
  SMALL: 'Envelopes, small boxes',
  MEDIUM: 'Shoeboxes, mid parcels',
  LARGE: 'Large parcels',
};

export function StorePage() {
  const [size, setSize] = useState<Size>('SMALL');
  const [result, setResult] = useState<StoreResult | null>(null);
  const [copied, setCopied] = useState(false);
  const store = useStorePackage();

  const submit = () => {
    setResult(null);
    store.mutate(size, { onSuccess: (data) => setResult(data) });
  };

  const copyCode = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.pickupCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Store a package</h1>
        <p className="mt-1 text-sm text-ink-500">
          Delivery agent view. Pick the package size — the system assigns the
          smallest available locker that fits.
        </p>
      </div>

      <Card className="space-y-5 p-6">
        <div>
          <p className="mb-2 text-sm font-semibold text-ink-700">Package size</p>
          <div className="grid grid-cols-3 gap-3">
            {SIZES.map((s) => {
              const active = s === size;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-colors ${
                    active
                      ? 'border-brand-400 bg-brand-50 ring-1 ring-brand-300'
                      : 'border-ink-200 bg-white hover:border-ink-300'
                  }`}
                >
                  <SizeBadge size={s} />
                  <span className="text-xs text-ink-500">{sizeHint[s]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Button className="w-full" loading={store.isPending} onClick={submit}>
          Store package
        </Button>

        {store.isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {getApiErrorMessage(store.error)}
          </div>
        )}
      </Card>

      {result && (
        <Card className="space-y-4 border-emerald-200 bg-emerald-50/40 p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-sm text-white">
              ✓
            </span>
            <h2 className="text-lg font-bold text-ink-900">Package stored</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                Locker
              </p>
              <p className="mt-0.5 font-mono text-2xl font-bold text-ink-900">
                #{result.lockerId}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                Size
              </p>
              <div className="mt-1.5">
                <SizeBadge size={result.size} />
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
              Pickup code
            </p>
            <div className="mt-1 flex items-center gap-2">
              <code className="rounded-lg border border-ink-200 bg-white px-3 py-2 font-mono text-lg font-bold tracking-widest text-ink-900">
                {result.pickupCode}
              </code>
              <Button variant="secondary" onClick={copyCode}>
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <p className="mt-2 text-xs text-ink-500">
              Share the locker number and pickup code with the customer (normally
              sent by SMS/email).
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
