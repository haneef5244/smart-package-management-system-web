import { Link } from 'react-router-dom';
import { Card } from '../components/Card';

interface Role {
  to: string;
  emoji: string;
  title: string;
  description: string;
  cta: string;
}

const roles: Role[] = [
  {
    to: '/store',
    emoji: '🚚',
    title: 'Delivery Agent',
    description: 'Store a package in an available locker and generate a pickup code.',
    cta: 'Store a package',
  },
  {
    to: '/retrieve',
    emoji: '📦',
    title: 'Customer',
    description: 'Enter your locker number and pickup code to retrieve your package.',
    cta: 'Retrieve a package',
  },
  {
    to: '/dashboard',
    emoji: '🛠️',
    title: 'Admin',
    description: 'Manage lockers and monitor availability across the station.',
    cta: 'Manage lockers',
  },
];

export function HomePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
          Smart Package Locker
        </h1>
        <p className="mt-3 text-base text-ink-500">
          Choose how you'd like to continue.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {roles.map((role) => (
          <Link
            key={role.to}
            to={role.to}
            className="group rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
          >
            <Card className="flex h-full flex-col p-6 transition-shadow group-hover:shadow-md">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                {role.emoji}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-ink-900">
                {role.title}
              </h2>
              <p className="mt-1.5 flex-1 text-sm text-ink-500">
                {role.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                {role.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
