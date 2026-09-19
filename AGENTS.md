# Base44 Setup Notes

## Project
GroundWork CRM — a Vite + React + TypeScript single-page app (real estate lead pipeline & power dialer). State is persisted in `localStorage`; there is no backend or database.

## Running
- `docker compose -f docker-compose.base44.yml up -d` starts the Vite dev server on port 3000.
- Node 22 base image; source is bind-mounted at `/app`; `node_modules` lives in a named volume.
- `npm install --legacy-peer-deps` is required — Vite 8's esbuild peer range conflicts with the pinned `esbuild@^0.25.0` in devDependencies.
- `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` is passed through from the environment so Vite accepts the preview's external hostname.

## Notes
- `@google/genai` and `express` are listed in `package.json` but are **not imported** anywhere in `src/`. No `GEMINI_API_KEY` or other external credentials are needed to run the app.
- The README mentions a `GEMINI_API_KEY` in `.env.local`, but the current source code does not use it.
- Vite config already sets `host: 0.0.0.0` and port 3000.
