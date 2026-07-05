# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The **React web frontend** for the Smart Package Locker Management System — the
Everest Engineering coding challenge. It provides the delivery-agent and customer
flows on top of a separate [NestJS API](../smart-package-management-system-api).

## Requirements — read first

**[CHALLENGE.md](CHALLENGE.md) is the source of truth for what to build.** Consult it
before implementing or changing any feature, and make sure the work matches the
relevant Level (1–4) and the domain rules (locker sizes, smallest-fit assignment,
one-package-per-locker, unique pickup codes, storage charges).

## Stack

- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`; theme tokens via `@theme` in `index.css`)
- **TanStack Query** for server state
- **React Router** for routing
- **axios** for the API client

## Structure

```
src/
  api/          axios client, typed request functions, shared types
  hooks/        TanStack Query hooks (useLockers, usePackages, ...)
  components/   Button, Card, SizeBadge, LockerCard, Layout
  pages/        DashboardPage, StorePage, RetrievePage, HomePage
  index.css     Tailwind v4 + brand theme (@theme tokens)
```

## Commands

- `npm run dev` — Vite dev server (needs the API running; see README)
- `npm run build` — type-check + production build
- `npm run typecheck` — type-check only

## Conventions

- Server state (lockers) lives in TanStack Query; storing/retrieving a package
  invalidates the lockers query so availability updates immediately.
- Surface API error messages (e.g. "no locker available", "invalid pickup code")
  via `getApiErrorMessage`.
- Theme (amber accent + warm-slate neutrals) is defined once in `index.css` and
  consumed as Tailwind utilities (`bg-brand-500`, `text-ink-600`) — don't hardcode
  colors in components.
- Prettier is configured (`.prettierrc`); match the surrounding code style.
