# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Type-check + production build
npm run preview   # Preview production build
```

No test runner is configured.

## Architecture

**Stack:** React 18 + TypeScript (strict) + React Router v7 + Tailwind CSS v4 + Vite 6. No component library — all UI is hand-built with Tailwind.

**Entry:** `src/main.tsx` → `App.tsx` wraps everything in `AppProvider` + `RouterProvider`.

**Routing** (`src/app/routes.ts`):
- `/login` — public, unauthenticated
- All other routes (`/`, `/dashboard`, `/time-log`, `/admin`) are wrapped in `ProtectedRoute`, which checks `localStorage.getItem("isAuthenticated") === "true"` and redirects to `/login` if false.
- Auth is frontend-only (no backend yet). Any non-empty email + password logs in.

**State** (`src/app/context/AppContext.tsx`):
- Single `useReducer` store for tasks, releases, and active timer.
- `tasksByColumn` is derived via `useMemo` with search/filter applied.
- Timer ticks every second via `setInterval` in a `useEffect`.
- Access state via the `useAppContext()` hook.

**Design system** (dark theme, no CSS variables — use inline hex values):
- Backgrounds: `#0B0E14` → `#111720` → `#161D2A` → `#1A2230`
- Text: `#DFE6F0` (primary), `#7B8FAB` (muted)
- Borders: `#1C2536`, `#2A3650`
- Accent/interactive: `#34D399` (teal), `#38BDF8` (blue), `#FBBF24` (amber), `#FB7185` (red)
- Use `cn()` from `src/app/components/ui/utils.ts` (clsx + tailwind-merge) for conditional classes.

**Seed data** (`src/app/data/seed.ts`): 3 releases, 19 tasks across 8 Kanban columns, 6 team members.

**Key types** (`src/app/types.ts`): `Task`, `Release`, `TimerState`, `ColumnId` (8 statuses).
