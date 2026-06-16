import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = 'sgl_demo_portal_secret_2026'
const DATA_FILE  = join(__dirname, 'solutions.json')
const DIST_DIR   = join(__dirname, 'dist')

const ADMIN_USER = 'Admin@Demo_Portal'
const ADMIN_PASS = 'Admin123'

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

// ── Auth ───────────────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })
  try { req.user = jwt.verify(auth.slice(7), JWT_SECRET); next() }
  catch { res.status(401).json({ error: 'Invalid token' }) }
}

// ── Data ───────────────────────────────────────────────────────────────────
function loadData() {
  if (!existsSync(DATA_FILE)) return { solutions: [] }
  return JSON.parse(readFileSync(DATA_FILE, 'utf8'))
}
function saveData(data) { writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)) }

// ── Seed ───────────────────────────────────────────────────────────────────
if (!existsSync(DATA_FILE)) {
  saveData({ solutions: [
    { id:'security-sitrep',       category:'security',    title:'Unified Armed Forces Operational Situation Report Dashboard',  description:'Command-centre situational awareness dashboard for unified armed forces.',                              tags:['ArcGIS Dashboards','Defence','Situational Awareness'], status:'live',        iframeUrl:'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/b23b7135620749d09706d74a81278561?embed=true', createdAt:new Date().toISOString() },
    { id:'navy-patrol',           category:'security',    title:'Nigeria Navy Patrol Monitoring Dashboard',                     description:'Live GIS-powered monitoring of naval patrol routes and maritime zone coverage.',                       tags:['ArcGIS Dashboards','Maritime','Patrol Tracking'],      status:'live',        iframeUrl:'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/d5ccd3311c1544fd9a285e32dbb151d6?embed=true', createdAt:new Date().toISOString() },
    { id:'border-surveillance',   category:'security',    title:'Border & Perimeter Surveillance',                              description:'Sensor fusion with GIS for border monitoring.',                                                        tags:['ArcGIS','UAV','Sensor Integration'],                   status:'coming-soon', iframeUrl:null, createdAt:new Date().toISOString() },
    { id:'incident-mgmt',         category:'security',    title:'Incident Management System',                                   description:'Spatial incident logging and resource dispatch tracking.',                                              tags:['ArcGIS Field Maps','Mobile','Response'],               status:'coming-soon', iframeUrl:null, createdAt:new Date().toISOString() },
    { id:'oagf-capital',          category:'government',  title:'OAGF Capital Project Dashboard',                               description:'Spatial monitoring of capital project disbursements across Nigeria.',                                    tags:['ArcGIS Dashboards','Capital Projects','OAGF'],         status:'live',        iframeUrl:'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/53c4359327a44af58faa470f08479064?embed=true', createdAt:new Date().toISOString() },
    { id:'ncfr-refugees',         category:'government',  title:'National Commission for Refugees Dashboard',                   description:'Tracking refugee and IDP populations, camp locations, and resettlement progress.',                      tags:['ArcGIS Dashboards','Refugees','NCFR','Humanitarian'],  status:'live',        iframeUrl:'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/dff47c5a577e4ddd9ab890495e6bb899?embed=true', createdAt:new Date().toISOString() },
    { id:'electoral',             category:'government',  title:'Electoral Boundary Mapping',                                   description:'Constituency demarcation, voter density analysis and results visualization.',                          tags:['ArcGIS','Spatial Statistics','Demographics'],          status:'coming-soon', iframeUrl:null, createdAt:new Date().toISOString() },
    { id:'eng-project-monitoring',category:'utilities',   title:'Engineering Project Monitoring & Evaluation Dashboard',        description:'End-to-end spatial tracking of engineering projects.',                                                  tags:['ArcGIS Dashboards','M&E','Engineering'],               status:'live',        iframeUrl:'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/c5825a45053e42c3b440d8bdc9555730?embed=true', createdAt:new Date().toISOString() },
    { id:'ndphc-asset',           category:'utilities',   title:'Niger Delta Power Holding Company Asset Dashboard',            description:'Asset registry for NDPHC — tracking generation assets and transmission infrastructure.',               tags:['ArcGIS Dashboards','Power','NDPHC','Asset Management'],status:'live',        iframeUrl:'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/81784b5ccdd446bd81eba51764bdcfa3?embed=true', createdAt:new Date().toISOString() },
    { id:'ndphc-maintenance',     category:'utilities',   title:'Routine Maintenance Dashboard – NDPHC',                        description:'Maintenance tracking for NDPHC assets — scheduling and fault history.',                                 tags:['ArcGIS Dashboards','Maintenance','NDPHC'],             status:'live',        iframeUrl:'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/e7cb66ab717a4018b3b6f04cd8071cc7?embed=true', createdAt:new Date().toISOString() },
    { id:'water-network',         category:'utilities',   title:'Water Network Management',                                     description:'Pipe network mapping and maintenance scheduling for water utilities.',                                  tags:['ArcGIS Utility Network','Water GIS'],                  status:'coming-soon', iframeUrl:null, createdAt:new Date().toISOString() },
    { id:'biosecurity',           category:'agriculture', title:'Biosecurity Planning & Monitoring Dashboard',                  description:'National biosecurity risk mapping — disease outbreak zones and intervention coverage.',                  tags:['ArcGIS Dashboards','Biosecurity','Agriculture'],       status:'live',        iframeUrl:'https://sambusgeospatial.maps.arcgis.com/apps/dashboards/7aad26ade91c495ab891eea346628e1d?embed=true', createdAt:new Date().toISOString() },
    { id:'crop-monitor',          category:'agriculture', title:'Agricultural Field Monitoring',                                description:'Crop health analysis using satellite imagery and NDVI indices.',                                        tags:['ENVI','Remote Sensing','NDVI'],                        status:'coming-soon', iframeUrl:null, createdAt:new Date().toISOString() },
    { id:'land-parcel',           category:'land',        title:'Land Parcel Management System',                               description:'Interactive cadastral mapping with parcel search and ownership history.',                               tags:['ArcGIS','Web GIS','Cadastre'],                         status:'coming-soon', iframeUrl:null, createdAt:new Date().toISOString() },
    { id:'lims',                  category:'land',        title:'Land Information Management System (LIMS)',                    description:'Tracking land transactions, ownership transfers and legal disputes.',                                    tags:['ArcGIS Enterprise','LIMS'],                            status:'coming-soon', iframeUrl:null, createdAt:new Date().toISOString() },
    { id:'urban-growth',          category:'urban',       title:'Urban Growth Analysis',                                        description:'Multi-temporal land use change detection and urban sprawl modelling.',                                  tags:['ArcGIS Pro','Change Detection'],                       status:'coming-soon', iframeUrl:null, createdAt:new Date().toISOString() },
    { id:'forest',                category:'environment', title:'Forest Cover Change Monitor',                                  description:'Deforestation tracking using Sentinel-2 and Landsat imagery.',                                          tags:['ENVI','LiDAR','Sentinel-2'],                           status:'coming-soon', iframeUrl:null, createdAt:new Date().toISOString() },
    { id:'coastal',               category:'environment', title:'Coastal & Wetland Monitoring',                                 description:'Shoreline change analysis and mangrove health mapping.',                                               tags:['ENVI SARscape','SAR','Coastal GIS'],                   status:'coming-soon', iframeUrl:null, createdAt:new Date().toISOString() },
  ]})
  console.log('✅ solutions.json seeded')
}

// ── API routes ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ ok: true }))

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  if (username === ADMIN_USER && password === ADMIN_PASS)
    return res.json({ token: jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' }), username })
  res.status(401).json({ error: 'Invalid credentials' })
})

app.get('/api/me', requireAuth, (req, res) => res.json({ username: req.user.username }))

app.get('/api/solutions', (req, res) => res.json(loadData().solutions))

app.post('/api/solutions', requireAuth, (req, res) => {
  const data = loadData()
  const { title, category, description, tags, iframeUrl, status } = req.body
  if (!title || !category) return res.status(400).json({ error: 'title and category required' })
  const sol = { id:`${category}-${Date.now()}`, category, title, description:description||'',
    tags: Array.isArray(tags) ? tags : (tags||'').split(',').map(t=>t.trim()).filter(Boolean),
    iframeUrl:iframeUrl||null, status:status||(iframeUrl?'live':'coming-soon'), createdAt:new Date().toISOString() }
  data.solutions.push(sol)
  saveData(data)
  res.status(201).json(sol)
})

app.put('/api/solutions/:id', requireAuth, (req, res) => {
  const data = loadData()
  const idx = data.solutions.findIndex(s => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  const { title, category, description, tags, iframeUrl, status } = req.body
  data.solutions[idx] = { ...data.solutions[idx], title:title??data.solutions[idx].title,
    category:category??data.solutions[idx].category, description:description??data.solutions[idx].description,
    tags:Array.isArray(tags)?tags:(tags||'').split(',').map(t=>t.trim()).filter(Boolean),
    iframeUrl:iframeUrl!==undefined?iframeUrl:data.solutions[idx].iframeUrl,
    status:status??data.solutions[idx].status, updatedAt:new Date().toISOString() }
  saveData(data)
  res.json(data.solutions[idx])
})

app.delete('/api/solutions/:id', requireAuth, (req, res) => {
  const data = loadData()
  const idx = data.solutions.findIndex(s => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  data.solutions.splice(idx, 1)
  saveData(data)
  res.json({ ok: true })
})

// ── Serve built React app ──────────────────────────────────────────────────
if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR))
  app.use((req, res) => res.sendFile(join(DIST_DIR, 'index.html')))
  console.log('✅ Serving React app from /dist')
} else {
  console.log('⚠️  No /dist folder — run: bun run build')
}

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Running on port ${PORT}`))
