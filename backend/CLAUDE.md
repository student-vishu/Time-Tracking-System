# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ShopVault is an e-commerce backend API built with Express 5 and PostgreSQL. Backend-only project (no frontend yet).

## Commands

All commands run from the `backend/` directory:

```bash
cd backend
npm install          # install dependencies
npm run local        # start dev server with local env (nodemon, NODE_ENV=local)
npm run dev          # start dev server with development env (nodemon, NODE_ENV=development)
npm run prod         # start production server (node, NODE_ENV=production)
```

No test framework or linter is configured yet.

## Architecture

### Environment Configuration

Environment is selected via `NODE_ENV` (local/development/production). The entry point `backend/index.js` loads env files from `backend/src/config/.env_${NODE_ENV}`. Config values are centralized in `backend/src/config/config.js` which reads from `process.env`.

Required env vars: `SERVER_PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.

### Backend Structure (`backend/src/`)

- **`config/`** - Environment config (`config.js` exports server/db/tables settings, `.env_*` files per environment)
- **`db/connection.js`** - PostgreSQL connection using `pg` Client (single client, not a pool)
- **`db/queryHelper.js`** - Query abstraction layer with `insertData(table, data, returning)` helper. Uses parameterized queries (`$1, $2...`) for safety.
- **`route/indexRoute.js`** - Root router, mounts sub-routers under `/api/v1`
- **`route/useRoute.js`** - User routes mounted at `/api/v1/user`
- **`controller/`** - Request handlers (e.g., `user.controller.js`)
- **`utils/validation.js`** - Joi validation schemas (`createUserSchema`, `loginSchema`)

### Request Flow

`Express app` -> `/api/v1` (indexRoute) -> `/user` (useRoute) -> controller -> queryHelper -> pg Client

### Key Conventions

- Table names are defined in `config.tables` (e.g., `config.tables.user = "users"`)
- Validation uses Joi schemas with `abortEarly: false` for full error reporting
- Controllers return JSON with `{ message, ... }` shape
- npm scripts use Windows `set` syntax for NODE_ENV (not cross-platform)
- Dependencies include `bcrypt` and `jsonwebtoken` (available but not fully wired up yet)
