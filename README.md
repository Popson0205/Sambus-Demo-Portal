# Sambus Geospatial Demo Portal

A React + Vite demo portal for Sambus Geospatial Limited — West Africa's leading geospatial company and official Esri distributor.

## 🚀 Getting Started

```bash
# Install dependencies
bun install   # or npm install

# Start dev server
bun dev       # or npm run dev
```

Open http://localhost:3000

## 📦 Build for Production

```bash
bun run build   # or npm run build
```

Deploy the `dist/` folder to any static host (Render, Netlify, Vercel, etc.).

## 📄 Pages

| Route | Page |
|-------|------|
| `/` | Home (animated canvas hero) |
| `/solutions` | Solutions / Products |
| `/demos` | Demo Gallery (Leaflet map) |
| `/case-studies` | Case Studies |
| `/about` | About Sambus |
| `/contact` | Request Demo form |

## 🔧 Backend Integration

Each solution card in `/solutions` and demo card in `/demos` has a `url` or `demoUrl` field.
Replace `'#'` with the actual backend-provided URL for each local solution.

**In `src/pages/Solutions.jsx`:**
```js
const PRODUCTS = [
  { id: 'local', demoUrl: 'https://your-backend-url.com/land-management', ... },
]
```

**In `src/pages/Demos.jsx`:**
```js
const DEMOS = [
  { id: 1, url: 'https://your-backend-url.com/demo/land-parcels', ... },
]
```

## 🎨 Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--sgl-navy` | `#0D2B5E` | Primary brand navy |
| `--sgl-green` | `#7DC242` | Accent / CTA green |
| `--sgl-navy-dark` | `#071A3E` | Dark backgrounds |

## 🌍 Interactive Map

The demo gallery uses **Leaflet + react-leaflet** with a CartoDB dark tile layer 
showing SGL's 7-country presence across West Africa.

## 🚢 Deployment (Render)

1. Push to GitHub
2. Create new **Static Site** on Render
3. Build Command: `bun run build`
4. Publish Directory: `dist`
5. Set Environment: `NODE_VERSION=20`
