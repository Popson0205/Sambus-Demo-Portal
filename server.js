import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3001
const JWT_SECRET = 'sgl_demo_portal_secret_2026'
const DATA_FILE = join(__dirname, 'solutions.json')

// ── Credentials (change here to update login) ──────────────────────────────
const ADMIN_USER = 'Admin@Demo_Portal'
const ADMIN_PASS = 'Admin123'

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json())

// ── Auth middleware ────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })
  try {
    req.user = jwt.verify(auth.slice(7), JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// ── Data helpers ───────────────────────────────────────────────────────────
function loadData() {
  if (!existsSync(DATA_FILE)) return { solutions: [] }
  return JSON.parse(readFileSync(DATA_FILE, 'utf8'))
}
function saveData(data) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

// ── Seed existing solutions on first run ───────────────────────────────────
if (!existsSync(DATA_FILE)) {
  const seed = {
    solutions: [
      // SECURITY
      { id: 'security-sitrep',       category: 'security',    title: 'Unified Armed Forces Operational Situation Report Dashboard', description: 'Command-centre situational awareness dashboard for unified armed forces — tracking operational status, incidents, and field unit positions in real time.', tags: ['ArcGIS Dashboards','Defence','Situational Awareness','Real-time'], status: 'live', iframeUrl: 'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/b23b7135620749d09706d74a81278561?embed=true', createdAt: new Date().toISOString() },
      { id: 'navy-patrol',           category: 'security',    title: 'Nigeria Navy Patrol Monitoring Dashboard', description: 'Live GIS-powered monitoring of naval patrol routes, vessel positions, and maritime zone coverage across Nigerian waters.', tags: ['ArcGIS Dashboards','Maritime','Patrol Tracking','Navy'], status: 'live', iframeUrl: 'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/d5ccd3311c1544fd9a285e32dbb151d6?embed=true', createdAt: new Date().toISOString() },
      { id: 'border-surveillance',   category: 'security',    title: 'Border & Perimeter Surveillance', description: 'Sensor fusion with GIS for border monitoring — integrating UAV feeds, camera networks, and patrol tracking on a live map.', tags: ['ArcGIS','UAV','Sensor Integration'], status: 'coming-soon', iframeUrl: null, createdAt: new Date().toISOString() },
      { id: 'incident-mgmt',         category: 'security',    title: 'Incident Management System', description: 'Spatial incident logging, resource dispatch tracking, and after-action review tools for emergency response teams.', tags: ['ArcGIS Field Maps','Mobile','Response'], status: 'coming-soon', iframeUrl: null, createdAt: new Date().toISOString() },
      // GOVERNMENT
      { id: 'oagf-capital',          category: 'government',  title: 'OAGF Capital Project Dashboard', description: 'Office of the Accountant-General of the Federation — spatial monitoring of capital project disbursements, progress, and performance across Nigeria.', tags: ['ArcGIS Dashboards','Capital Projects','OAGF','Federal Government'], status: 'live', iframeUrl: 'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/53c4359327a44af58faa470f08479064?embed=true', createdAt: new Date().toISOString() },
      { id: 'ncfr-refugees',         category: 'government',  title: 'National Commission for Refugees Dashboard', description: 'Geospatial dashboard for tracking refugee and IDP populations, camp locations, service delivery, and resettlement progress across Nigeria.', tags: ['ArcGIS Dashboards','Refugees','NCFR','Humanitarian'], status: 'live', iframeUrl: 'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/dff47c5a577e4ddd9ab890495e6bb899?embed=true', createdAt: new Date().toISOString() },
      { id: 'electoral',             category: 'government',  title: 'Electoral Boundary Mapping', description: 'Constituency demarcation, voter density analysis, polling station optimization and results visualization.', tags: ['ArcGIS','Spatial Statistics','Demographics'], status: 'coming-soon', iframeUrl: null, createdAt: new Date().toISOString() },
      // UTILITIES
      { id: 'eng-project-monitoring',category: 'utilities',   title: 'Engineering Project Monitoring & Evaluation Dashboard', description: 'End-to-end spatial tracking of engineering projects — monitoring milestones, contractor performance, and field progress across project sites.', tags: ['ArcGIS Dashboards','M&E','Engineering','Projects'], status: 'live', iframeUrl: 'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/c5825a45053e42c3b440d8bdc9555730?embed=true', createdAt: new Date().toISOString() },
      { id: 'ndphc-asset',           category: 'utilities',   title: 'Niger Delta Power Holding Company Asset Dashboard', description: 'Comprehensive asset registry and spatial dashboard for NDPHC — tracking generation assets, substations, and transmission infrastructure.', tags: ['ArcGIS Dashboards','Power','NDPHC','Asset Management'], status: 'live', iframeUrl: 'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/81784b5ccdd446bd81eba51764bdcfa3?embed=true', createdAt: new Date().toISOString() },
      { id: 'ndphc-maintenance',     category: 'utilities',   title: 'Routine Maintenance Dashboard – NDPHC', description: 'Planned and corrective maintenance tracking for NDPHC assets — scheduling, completion rates, and fault history mapped spatially.', tags: ['ArcGIS Dashboards','Maintenance','NDPHC','Power Grid'], status: 'live', iframeUrl: 'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/e7cb66ab717a4018b3b6f04cd8071cc7?embed=true', createdAt: new Date().toISOString() },
      { id: 'water-network',         category: 'utilities',   title: 'Water Network Management', description: 'Pipe network mapping, pressure zone analysis, and maintenance scheduling for water utilities across service areas.', tags: ['ArcGIS Utility Network','Water GIS','Field Maps'], status: 'coming-soon', iframeUrl: null, createdAt: new Date().toISOString() },
      // AGRICULTURE
      { id: 'biosecurity',           category: 'agriculture', title: 'Biosecurity Planning & Monitoring Dashboard', description: 'National biosecurity risk mapping — tracking disease outbreak zones, livestock movement corridors, and intervention coverage across regions.', tags: ['ArcGIS Dashboards','Biosecurity','Agriculture','Risk Mapping'], status: 'live', iframeUrl: 'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/7aad26ade91c495ab891eea346628e1d?embed=true', createdAt: new Date().toISOString() },
      { id: 'crop-monitor',          category: 'agriculture', title: 'Agricultural Field Monitoring', description: 'Crop health analysis using satellite imagery, NDVI indices, and seasonal change detection for farm advisories.', tags: ['ENVI','Remote Sensing','NDVI'], status: 'coming-soon', iframeUrl: null, createdAt: new Date().toISOString() },
      // LAND
      { id: 'land-parcel',           category: 'land',        title: 'Land Parcel Management System', description: 'Interactive cadastral mapping with parcel search, ownership history, and zoning overlays.', tags: ['ArcGIS','Web GIS','Cadastre'], status: 'coming-soon', iframeUrl: null, createdAt: new Date().toISOString() },
      { id: 'lims',                  category: 'land',        title: 'Land Information Management System (LIMS)', description: 'Comprehensive LIMS for tracking land transactions, ownership transfers, encumbrances and legal disputes.', tags: ['ArcGIS Enterprise','LIMS','Spatial DB'], status: 'coming-soon', iframeUrl: null, createdAt: new Date().toISOString() },
      // URBAN
      { id: 'urban-growth',          category: 'urban',       title: 'Urban Growth Analysis', description: 'Multi-temporal land use change detection and urban sprawl modelling for city and regional planners.', tags: ['ArcGIS Pro','Change Detection','Spatial Analysis'], status: 'coming-soon', iframeUrl: null, createdAt: new Date().toISOString() },
      // ENVIRONMENT
      { id: 'forest',                category: 'environment', title: 'Forest Cover Change Monitor', description: 'Deforestation tracking using Sentinel-2 and Landsat imagery with automated alert systems.', tags: ['ENVI','LiDAR','Sentinel-2'], status: 'coming-soon', iframeUrl: null, createdAt: new Date().toISOString() },
      { id: 'coastal',               category: 'environment', title: 'Coastal & Wetland Monitoring', description: 'Shoreline change analysis, mangrove health mapping, and flood risk modelling for coastal communities.', tags: ['ENVI SARscape','SAR','Coastal GIS'], status: 'coming-soon', iframeUrl: null, createdAt: new Date().toISOString() },
    ]
  }
  saveData(seed)
  console.log('✅ solutions.json seeded with existing data')
}

// ── ROUTES ─────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }))

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' })
    return res.json({ token, username })
  }
  res.status(401).json({ error: 'Invalid credentials' })
})

// Verify token
app.get('/api/me', requireAuth, (req, res) => res.json({ username: req.user.username }))

// Get all solutions (public)
app.get('/api/solutions', (req, res) => {
  const { solutions } = loadData()
  res.json(solutions)
})

// Create solution (protected)
app.post('/api/solutions', requireAuth, (req, res) => {
  const data = loadData()
  const { title, category, description, tags, iframeUrl, status } = req.body
  if (!title || !category) return res.status(400).json({ error: 'title and category required' })

  const newSolution = {
    id: `${category}-${Date.now()}`,
    category,
    title,
    description: description || '',
    tags: Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
    iframeUrl: iframeUrl || null,
    status: status || (iframeUrl ? 'live' : 'coming-soon'),
    createdAt: new Date().toISOString(),
  }
  data.solutions.push(newSolution)
  saveData(data)
  res.status(201).json(newSolution)
})

// Update solution (protected)
app.put('/api/solutions/:id', requireAuth, (req, res) => {
  const data = loadData()
  const idx = data.solutions.findIndex(s => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })

  const { title, category, description, tags, iframeUrl, status } = req.body
  data.solutions[idx] = {
    ...data.solutions[idx],
    title:      title      ?? data.solutions[idx].title,
    category:   category   ?? data.solutions[idx].category,
    description:description ?? data.solutions[idx].description,
    tags:       Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
    iframeUrl:  iframeUrl  !== undefined ? iframeUrl : data.solutions[idx].iframeUrl,
    status:     status     ?? data.solutions[idx].status,
    updatedAt:  new Date().toISOString(),
  }
  saveData(data)
  res.json(data.solutions[idx])
})

// Delete solution (protected)
app.delete('/api/solutions/:id', requireAuth, (req, res) => {
  const data = loadData()
  const idx = data.solutions.findIndex(s => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  data.solutions.splice(idx, 1)
  saveData(data)
  res.json({ ok: true })
})

app.listen(PORT, '0.0.0.0', () => console.log(`API running on port ${PORT}`))
