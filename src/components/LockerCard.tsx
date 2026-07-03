import type { Locker } from '../api/types';
import { SizeBadge } from './SizeBadge';

export function LockerCard({ locker }: { locker: Locker }) {
  const available = locker.available;
  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border p-4 transition-colors ${
        available
          ? 'border-ink-200 bg-white'
          : 'border-ink-200 bg-ink-100/60'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm font-semibold text-ink-500">
          #{locker.id}
        </span>
        <SizeBadge size={locker.size} />
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            available ? 'bg-emerald-500' : 'bg-ink-400'
          }`}
        />
        <span
          className={`text-sm font-medium ${
            available ? 'text-emerald-700' : 'text-ink-500'
          }`}
        >
          {available ? 'Available' : 'Occupied'}
        </span>
      </div>
    </div>
  );
}
