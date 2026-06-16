# Admin Panel – Sambus Demo Portal

## Accessing the Admin Panel
Navigate to `/admin` in the browser.

**Login:** Username: `Admin@Demo_Portal` · Password: `Admin123`
To change credentials, edit `ADMIN_USER` / `ADMIN_PASS` at the top of `server.js`.

## Running Locally (Development)

```bash
# Terminal 1 — API + static file server
node server.js

# Terminal 2 — Vite dev server with hot reload
bun run dev
```

Or both at once:
```bash
bun run dev:full
```

## Deploying to Render

**Build Command:** `bun install && bun run build`
**Start Command:** `node server.js`

The single `server.js` process serves both the API (`/api/*`) and the
built React app (`/dist`). No `vite preview` involved — no host blocking issues.

## Uploading a Solution

1. Go to `/admin` → Sign In
2. Click **⬆ Upload Solution**
3. Fill in Title, Category, Description, Tags, URL
4. Click **Upload Solution** — appears in gallery immediately

## Data
Solutions stored in `solutions.json` at project root. Auto-seeded on first run.
