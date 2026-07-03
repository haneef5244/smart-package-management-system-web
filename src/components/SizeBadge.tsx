import type { Size } from '../api/types';

const styles: Record<Size, string> = {
  SMALL: 'bg-sky-100 text-sky-700 ring-sky-200',
  MEDIUM: 'bg-violet-100 text-violet-700 ring-violet-200',
  LARGE: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
};

export function SizeBadge({ size }: { size: Size }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ${styles[size]}`}
    >
      {size}
    </span>
  );
}
