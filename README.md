# Smart Package Locker — Web

React frontend for the Smart Package Locker Management System (Everest coding
challenge). Provides the delivery-agent and customer flows on top of the
[NestJS API](../smart-package-management-system-api).

Built with **React 19 + Vite + Tailwind CSS v4 + TanStack Query + React Router**.

---

## Quick start

The API must be running first (see the api repo — `npm run db:up`, `npm run seed`,
`npm run start:dev`). Then:

```bash
npm install
cp .env.example .env      # only if you don't have a .env yet
npm run dev               # http://localhost:5173
```

`VITE_API_URL` in `.env` points at the API (default `http://localhost:3000/api`).

### Scripts

| Script            | Purpose                          |
| ----------------- | -------------------------------- |
| `npm run dev`     | Vite dev server (HMR)            |
| `npm run build`   | Type-check + production build    |
| `npm run preview` | Preview the production build     |
| `npm run typecheck` | Type-check only                |

---

## Screens

- **Dashboard** (`/`) — live grid of every locker with size + availability,
  summary stats, and a control to provision new lockers.
- **Store package** (`/store`) — delivery-agent view: pick a package size and
  store it; shows the assigned locker and a copyable pickup code.
- **Retrieve package** (`/retrieve`) — customer view: enter locker number +
  pickup code to open the locker; shows the storage duration and charge.

## Structure

```
src/
  api/          axios client, typed request functions, shared types
  hooks/        TanStack Query hooks (useLockers, useStorePackage, ...)
  components/   Button, Card, SizeBadge, LockerCard, Layout
  pages/        DashboardPage, StorePage, RetrievePage
  index.css     Tailwind v4 + brand theme (@theme tokens)
```

### Notes

- Server state (lockers) is managed by TanStack Query; storing/retrieving a
  package invalidates the lockers query so availability updates immediately.
- API errors (e.g. "no locker available", "invalid pickup code") are surfaced
  from the API's response message via `getApiErrorMessage`.
- The theme (amber accent + warm-slate neutrals) is defined once in
  `index.css` and consumed as Tailwind utilities (`bg-brand-500`, `text-ink-600`).
