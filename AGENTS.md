# Base44 Dev Environment

## App overview
GroundWork CRM — a frontend-only Vite + React 19 + TypeScript app (real estate lead pipeline CRM & power dialer). No backend, no database.

## Running
- `docker compose -f docker-compose.base44.yml up -d` starts a `node:22` container that bind-mounts the repo, runs `npm install --legacy-peer-deps`, then `npm run dev` (Vite on port 3000, host 0.0.0.0).
- Health check: `curl http://localhost:3000/` → 200.

## Quirks
- `npm install` fails with peer-dependency conflicts (vite 8 / esbuild / @tailwindcss/vite). Must use `--legacy-peer-deps`.
- `@google/genai` is declared as a dependency and `metadata.json` lists `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`, but no source file imports or uses it. No `GEMINI_API_KEY` is needed to run the app.
- Vite `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` is passed through via compose `environment:` so the preview's external hostname is accepted.

## Verification
- After boot, `curl localhost:3000` returns the index.html with `/@vite/client` injected (confirms live dev server, not a prebuilt bundle).
- Frontend edits hot-reload via Vite HMR.
