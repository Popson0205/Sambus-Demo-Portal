# Admin Panel – Sambus Demo Portal

## Accessing the Admin Panel

Navigate to `/admin` in the browser (e.g. `http://localhost:3000/admin`)

**Login credentials:**
- Username: `Admin@Demo_Portal`
- Password: `Admin123`

> To change credentials, edit `server.js` — find `ADMIN_USER` and `ADMIN_PASS` near the top.

## Running the Portal

Two processes must run simultaneously:

```bash
# Terminal 1 — API server (port 3001)
node server.js

# Terminal 2 — Vite dev server (port 3000)
bun run dev
```

Or use the convenience script:
```bash
bash start.sh
```

## Uploading a Solution

1. Go to `/admin` and sign in
2. Click **⬆ Upload Solution**
3. Fill in:
   - **Title** — display name shown in the gallery
   - **Category** — which section it appears under
   - **Description** — shown on the solution card
   - **Tags** — comma-separated (e.g. `ArcGIS Dashboards, Real-time`)
   - **URL** — ArcGIS dashboard URL (`?embed=true` is added automatically)
4. Click **Upload Solution**

The solution appears live in the gallery immediately — no code changes needed.

## Data Storage

All solutions are stored in `solutions.json` at the project root.
This file is created automatically on first run with the existing seeded solutions.
Back it up before deploying to a new environment.
