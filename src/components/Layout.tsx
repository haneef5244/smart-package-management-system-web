import { NavLink, Outlet } from 'react-router-dom';

const tabs = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/store', label: 'Store package' },
  { to: '/retrieve', label: 'Retrieve package' },
];

export function Layout() {
  return (
    <div className="min-h-screen bg-ink-50">
      <header className="sticky top-0 z-10 border-b border-ink-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-lg">
              📦
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-ink-900">Smart Locker</p>
              <p className="text-[11px] text-ink-400">Package management</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-ink-500 hover:bg-ink-100 hover:text-ink-800'
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
