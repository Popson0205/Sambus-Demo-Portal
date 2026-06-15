import { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './Demos.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const SGL_LOCATIONS = [
  {
    name: 'Sambus Geospatial – HQ',
    lat: 5.5630189,
    lng: -0.1856645,
    type: 'hq',
    note: 'Headquarters',
    address: 'F702/1 Salem Avenue, 25 1st Kuku Crescent, Accra, Ghana',
    phone: '+233 30 277 7127',
  },
  {
    name: 'Sambus Geospatial Nigeria – Lagos',
    lat: 6.4371742,
    lng: 3.4287248,
    type: 'office',
    note: 'Lagos Office',
    address: '1610 Adeola Hopewell St, Victoria Island, Lagos, Nigeria',
    phone: '+234 92922821',
  },
  {
    name: 'Sambus Geospatial – Abuja',
    lat: 9.0650459,
    lng: 7.4258754,
    type: 'office',
    note: 'Abuja Office',
    address: '19 Ebitu Ukiwe St, Jabi, Abuja, FCT, Nigeria',
    phone: '+234 92922821',
  },
]

// ── Helper: append ?embed=true to ArcGIS dashboard URLs ──────────────────────
const embed = (url) => url ? `${url}?embed=true` : null

// ── CATEGORIES & SOLUTIONS ────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'security',
    icon: '🔒',
    title: 'Security',
    description: 'Situational awareness, patrol monitoring, and operational dashboards for defence and security agencies.',
    color: '#DC2626',
    solutions: [
      {
        id: 'security-sitrep',
        title: 'Unified Armed Forces Operational Situation Report Dashboard',
        description: 'Command-centre situational awareness dashboard for unified armed forces — tracking operational status, incidents, and field unit positions in real time.',
        tags: ['ArcGIS Dashboards', 'Defence', 'Situational Awareness', 'Real-time'],
        status: 'live',
        iframeUrl: embed('https://sambusgeospatial.maps.arcgis.com/apps/dashboards/b23b7135620749d09706d74a81278561'),
      },
      {
        id: 'navy-patrol',
        title: 'Nigeria Navy Patrol Monitoring Dashboard',
        description: 'Live GIS-powered monitoring of naval patrol routes, vessel positions, and maritime zone coverage across Nigerian waters.',
        tags: ['ArcGIS Dashboards', 'Maritime', 'Patrol Tracking', 'Navy'],
        status: 'live',
        iframeUrl: embed('https://sambusgeospatial.maps.arcgis.com/apps/dashboards/d5ccd3311c1544fd9a285e32dbb151d6'),
      },
      {
        id: 'border-surveillance',
        title: 'Border & Perimeter Surveillance',
        description: 'Sensor fusion with GIS for border monitoring — integrating UAV feeds, camera networks, and patrol tracking on a live map.',
        tags: ['ArcGIS', 'UAV', 'Sensor Integration'],
        status: 'coming-soon',
        iframeUrl: null,
      },
      {
        id: 'incident-mgmt',
        title: 'Incident Management System',
        description: 'Spatial incident logging, resource dispatch tracking, and after-action review tools for emergency response teams.',
        tags: ['ArcGIS Field Maps', 'Mobile', 'Response'],
        status: 'coming-soon',
        iframeUrl: null,
      },
    ],
  },
  {
    id: 'government',
    icon: '🏛️',
    title: 'Government',
    description: 'Capital project tracking, refugee management, electoral demarcation and citizen-facing geoportals for public sector.',
    color: '#6B46C1',
    solutions: [
      {
        id: 'oagf-capital',
        title: 'OAGF Capital Project Dashboard',
        description: 'Office of the Accountant-General of the Federation — spatial monitoring of capital project disbursements, progress, and performance across Nigeria.',
        tags: ['ArcGIS Dashboards', 'Capital Projects', 'OAGF', 'Federal Government'],
        status: 'live',
        iframeUrl: embed('https://sambusgeospatial.maps.arcgis.com/apps/dashboards/53c4359327a44af58faa470f08479064'),
      },
      {
        id: 'ncfr-refugees',
        title: 'National Commission for Refugees Dashboard',
        description: 'Geospatial dashboard for tracking refugee and IDP populations, camp locations, service delivery, and resettlement progress across Nigeria.',
        tags: ['ArcGIS Dashboards', 'Refugees', 'NCFR', 'Humanitarian'],
        status: 'live',
        iframeUrl: embed('https://sambusgeospatial.maps.arcgis.com/apps/dashboards/dff47c5a577e4ddd9ab890495e6bb899'),
      },
      {
        id: 'electoral',
        title: 'Electoral Boundary Mapping',
        description: 'Constituency demarcation, voter density analysis, polling station optimization and results visualization.',
        tags: ['ArcGIS', 'Spatial Statistics', 'Demographics'],
        status: 'coming-soon',
        iframeUrl: null,
      },
      {
        id: 'geoportal',
        title: 'National Geoportal',
        description: 'Open-data geoportal for sharing national datasets, metadata catalogs, and web GIS services with the public.',
        tags: ['ArcGIS Hub', 'Open Data', 'SDI'],
        status: 'coming-soon',
        iframeUrl: null,
      },
    ],
  },
  {
    id: 'utilities',
    icon: '⚡',
    title: 'Utilities',
    description: 'Network monitoring, project tracking, and asset management for electricity, water, and infrastructure.',
    color: '#7DC242',
    solutions: [
      {
        id: 'eng-project-monitoring',
        title: 'Engineering Project Monitoring & Evaluation Dashboard',
        description: 'End-to-end spatial tracking of engineering projects — monitoring milestones, contractor performance, and field progress across project sites.',
        tags: ['ArcGIS Dashboards', 'M&E', 'Engineering', 'Projects'],
        status: 'live',
        iframeUrl: embed('https://sambusgeospatial.maps.arcgis.com/apps/dashboards/c5825a45053e42c3b440d8bdc9555730'),
      },
      {
        id: 'ndphc-asset',
        title: 'Niger Delta Power Holding Company Asset Dashboard',
        description: 'Comprehensive asset registry and spatial dashboard for NDPHC — tracking generation assets, substations, and transmission infrastructure.',
        tags: ['ArcGIS Dashboards', 'Power', 'NDPHC', 'Asset Management'],
        status: 'live',
        iframeUrl: embed('https://sambusgeospatial.maps.arcgis.com/apps/dashboards/81784b5ccdd446bd81eba51764bdcfa3'),
      },
      {
        id: 'ndphc-maintenance',
        title: 'Routine Maintenance Dashboard – NDPHC',
        description: 'Planned and corrective maintenance tracking for NDPHC assets — scheduling, completion rates, and fault history mapped spatially.',
        tags: ['ArcGIS Dashboards', 'Maintenance', 'NDPHC', 'Power Grid'],
        status: 'live',
        iframeUrl: embed('https://sambusgeospatial.maps.arcgis.com/apps/dashboards/e7cb66ab717a4018b3b6f04cd8071cc7'),
      },
      {
        id: 'water-network',
        title: 'Water Network Management',
        description: 'Pipe network mapping, pressure zone analysis, and maintenance scheduling for water utilities across service areas.',
        tags: ['ArcGIS Utility Network', 'Water GIS', 'Field Maps'],
        status: 'coming-soon',
        iframeUrl: null,
      },
    ],
  },
  {
    id: 'agriculture',
    icon: '🌾',
    title: 'Agriculture',
    description: 'Biosecurity planning, crop monitoring, soil analysis and farm management using satellite imagery and GIS tools.',
    color: '#5A9130',
    solutions: [
      {
        id: 'biosecurity',
        title: 'Biosecurity Planning & Monitoring Dashboard',
        description: 'National biosecurity risk mapping — tracking disease outbreak zones, livestock movement corridors, and intervention coverage across regions.',
        tags: ['ArcGIS Dashboards', 'Biosecurity', 'Agriculture', 'Risk Mapping'],
        status: 'live',
        iframeUrl: embed('https://sambusgeospatial.maps.arcgis.com/apps/dashboards/7aad26ade91c495ab891eea346628e1d'),
      },
      {
        id: 'crop-monitor',
        title: 'Agricultural Field Monitoring',
        description: 'Crop health analysis using satellite imagery, NDVI indices, and seasonal change detection for farm advisories.',
        tags: ['ENVI', 'Remote Sensing', 'NDVI'],
        status: 'coming-soon',
        iframeUrl: null,
      },
      {
        id: 'soil-analysis',
        title: 'Soil & Terrain Analysis',
        description: 'Digital elevation models combined with soil sample data to generate fertility maps and drainage risk assessments.',
        tags: ['ArcGIS Pro', 'DEM', 'Spatial Analysis'],
        status: 'coming-soon',
        iframeUrl: null,
      },
    ],
  },
  {
    id: 'land',
    icon: '🏗️',
    title: 'Land Administration',
    description: 'Cadastral mapping, parcel management, ownership records and land rights systems for government and private sector.',
    color: '#0D2B5E',
    solutions: [
      {
        id: 'land-parcel',
        title: 'Land Parcel Management System',
        description: 'Interactive cadastral mapping with parcel search, ownership history, and zoning overlays. Full integration with national land registries.',
        tags: ['ArcGIS', 'Web GIS', 'Cadastre'],
        status: 'coming-soon',
        iframeUrl: null,
      },
      {
        id: 'lims',
        title: 'Land Information Management System (LIMS)',
        description: 'Comprehensive LIMS for tracking land transactions, ownership transfers, encumbrances and legal disputes with spatial visualization.',
        tags: ['ArcGIS Enterprise', 'LIMS', 'Spatial DB'],
        status: 'coming-soon',
        iframeUrl: null,
      },
      {
        id: 'valuation',
        title: 'Property Valuation & Rating',
        description: 'Mass appraisal system integrating property attributes, comparable sales, and spatial market data for fair value assessments.',
        tags: ['ArcGIS Pro', 'Valuation', 'Analytics'],
        status: 'coming-soon',
        iframeUrl: null,
      },
    ],
  },
  {
    id: 'urban',
    icon: '🏙️',
    title: 'Urban Planning',
    description: 'City growth modelling, land use analysis, transportation networks and infrastructure planning for smarter cities.',
    color: '#1B3A6B',
    solutions: [
      {
        id: 'urban-growth',
        title: 'Urban Growth Analysis',
        description: 'Multi-temporal land use change detection and urban sprawl modelling for city and regional planners.',
        tags: ['ArcGIS Pro', 'Change Detection', 'Spatial Analysis'],
        status: 'coming-soon',
        iframeUrl: null,
      },
      {
        id: 'zoning',
        title: 'Zoning & Permit Management',
        description: 'Spatial permit workflow system linking building permits to zoning rules, cadastral parcels, and compliance tracking.',
        tags: ['ArcGIS', 'Urban GIS', 'Workflow'],
        status: 'coming-soon',
        iframeUrl: null,
      },
    ],
  },
  {
    id: 'environment',
    icon: '🌳',
    title: 'Environment',
    description: 'Forest cover monitoring, deforestation tracking, coastal change, and environmental impact assessments.',
    color: '#0F766E',
    solutions: [
      {
        id: 'forest',
        title: 'Forest Cover Change Monitor',
        description: 'Deforestation tracking using Sentinel-2 and Landsat imagery with automated alert systems for protected areas.',
        tags: ['ENVI', 'LiDAR', 'Sentinel-2'],
        status: 'coming-soon',
        iframeUrl: null,
      },
      {
        id: 'coastal',
        title: 'Coastal & Wetland Monitoring',
        description: 'Shoreline change analysis, mangrove health mapping, and flood risk modelling for coastal communities.',
        tags: ['ENVI SARscape', 'SAR', 'Coastal GIS'],
        status: 'coming-soon',
        iframeUrl: null,
      },
    ],
  },
]

// ── IFRAME EMBED ──────────────────────────────────────────────────────────────
function DemoIframe({ solution }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (solution.status === 'coming-soon') {
    return (
      <div className="iframe-placeholder coming-soon-placeholder">
        <div className="placeholder-inner">
          <div className="placeholder-icon">🔜</div>
          <h3>Coming Soon</h3>
          <p>This demo is currently in development and will be available shortly. Check back soon.</p>
        </div>
      </div>
    )
  }

  if (!solution.iframeUrl) {
    return (
      <div className="iframe-placeholder">
        <div className="placeholder-inner">
          <div className="placeholder-icon">🚧</div>
          <h3>URL Pending</h3>
          <p>The embed URL for this demo will be configured shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="iframe-wrapper">
      {!loaded && !error && (
        <div className="iframe-loading">
          <div className="loading-spinner" />
          <span>Loading dashboard…</span>
        </div>
      )}
      {error && (
        <div className="iframe-error">
          <div className="placeholder-icon">⚠️</div>
          <h3>Could not load dashboard</h3>
          <p>
            <a href={solution.iframeUrl.replace('?embed=true', '')} target="_blank" rel="noreferrer" className="open-link">
              Open in ArcGIS →
            </a>
          </p>
        </div>
      )}
      <iframe
        src={solution.iframeUrl}
        title={solution.title}
        className={`demo-iframe ${loaded ? 'loaded' : ''} ${error ? 'hidden' : ''}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        allow="fullscreen; geolocation"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      />
      {loaded && (
        <div className="iframe-toolbar">
          <a
            href={solution.iframeUrl.replace('?embed=true', '')}
            target="_blank"
            rel="noreferrer"
            className="open-new-tab"
          >
            ↗ Open Full Screen
          </a>
        </div>
      )}
    </div>
  )
}

// ── SOLUTION DETAIL VIEW ──────────────────────────────────────────────────────
function SolutionDetail({ solution, category, onBack }) {
  return (
    <div className="solution-detail">
      <div className="detail-breadcrumb">
        <button className="breadcrumb-back" onClick={onBack}>
          ← {category.icon} {category.title}
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{solution.title}</span>
      </div>

      <div className="detail-header">
        <div className="detail-header-left">
          <h2>{solution.title}</h2>
          <p>{solution.description}</p>
          <div className="demo-tags">
            {solution.tags.map(t => <span key={t} className="demo-tag">{t}</span>)}
          </div>
        </div>
        <div className="detail-header-right">
          <span className={`demo-status ${solution.status}`}>
            {solution.status === 'live' ? '● Live Demo' : '○ Coming Soon'}
          </span>
        </div>
      </div>

      <div className="detail-iframe-section">
        <DemoIframe solution={solution} />
      </div>
    </div>
  )
}

// ── CATEGORY DETAIL: solutions grid ──────────────────────────────────────────
function CategoryDetail({ category, onSelectSolution, onBack }) {
  return (
    <div className="category-detail">
      <button className="back-btn" onClick={onBack}>
        ← Back to All Categories
      </button>

      <div className="cat-detail-header" style={{ borderColor: category.color }}>
        <div className="cat-detail-icon" style={{ background: category.color + '18' }}>
          {category.icon}
        </div>
        <div>
          <h2 style={{ color: category.color }}>{category.title}</h2>
          <p>{category.description}</p>
        </div>
      </div>

      <div className="solutions-detail-grid">
        {category.solutions.map(sol => (
          <div
            key={sol.id}
            className={`solution-card card ${sol.status !== 'live' ? 'disabled-card' : ''}`}
            onClick={() => sol.status === 'live' && onSelectSolution(sol)}
          >
            <div className="solution-card-top">
              <span className={`demo-status ${sol.status}`}>
                {sol.status === 'live' ? '● Live' : '○ Coming Soon'}
              </span>
            </div>
            <h3>{sol.title}</h3>
            <p>{sol.description}</p>
            <div className="demo-tags">
              {sol.tags.map(t => <span key={t} className="demo-tag">{t}</span>)}
            </div>
            {sol.status === 'live' && (
              <div className="solution-card-action">
                <span className="preview-btn" style={{ color: category.color }}>
                  Preview Dashboard →
                </span>
              </div>
            )}
            {sol.status === 'coming-soon' && (
              <div className="solution-card-action">
                <span className="coming-soon-label">Available Soon</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── MAIN DEMOS PAGE ───────────────────────────────────────────────────────────
export default function Demos() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSolution, setSelectedSolution] = useState(null)

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat)
    setSelectedSolution(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSolutionSelect = (sol) => {
    setSelectedSolution(sol)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToCategory = () => {
    setSelectedSolution(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToAll = () => {
    setSelectedCategory(null)
    setSelectedSolution(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="demos-page">
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-tag">🗺️ Interactive Demos</span>
          <h1>Geospatial Demo Gallery</h1>
          <p>
            Explore live interactive dashboards and geospatial applications built on
            leading platforms — no sign-in required.
          </p>
        </div>
      </div>

      {/* Solution detail (deepest level) */}
      {selectedSolution && selectedCategory && (
        <div className="container demos-content">
          <SolutionDetail
            solution={selectedSolution}
            category={selectedCategory}
            onBack={handleBackToCategory}
          />
        </div>
      )}

      {/* Category detail (solutions grid) */}
      {selectedCategory && !selectedSolution && (
        <div className="container demos-content">
          <CategoryDetail
            category={selectedCategory}
            onSelectSolution={handleSolutionSelect}
            onBack={handleBackToAll}
          />
        </div>
      )}

      {/* Home: map + category grid */}
      {!selectedCategory && (
        <>
          {/* West Africa Map */}
          <section className="map-section">
            <div className="container">
              <div className="map-header">
                <h2>Sambus Geospatial Coverage</h2>
                <p>Our operational offices — Accra (HQ), Lagos, and Abuja.</p>
              </div>
              <div className="map-wrapper">
                <MapContainer
                  center={[7.2, 3.5]}
                  zoom={5}
                  style={{ height: '440px', width: '100%', borderRadius: '16px' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                  />
                  {SGL_LOCATIONS.map(loc => (
                    <CircleMarker
                      key={loc.name}
                      center={[loc.lat, loc.lng]}
                      radius={loc.type === 'hq' ? 14 : loc.type === 'office' ? 10 : 7}
                      pathOptions={{
                        color:       loc.type === 'hq' ? '#7DC242' : loc.type === 'office' ? '#9BC73A' : '#4A8FDB',
                        fillColor:   loc.type === 'hq' ? '#7DC242' : loc.type === 'office' ? '#9BC73A' : '#4A8FDB',
                        fillOpacity: 0.85,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div className="map-popup">
                          <strong>{loc.name}</strong>
                          <span className="popup-note">{loc.note}</span>
                          <span className="popup-address">{loc.address}</span>
                          {loc.phone && <span className="popup-phone">{loc.phone}</span>}
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
                <div className="map-legend">
                  <span><i style={{ background: '#7DC242' }} /> Headquarters – Accra</span>
                  <span><i style={{ background: '#4A8FDB' }} /> Operational Office</span>
                </div>
              </div>
            </div>
          </section>

          {/* Category Grid */}
          <section className="page-section alt-bg">
            <div className="container">
              <div className="demos-header">
                <h2 className="section-title">Solution Categories</h2>
                <p className="section-subtitle">
                  Select a category to explore all live dashboards and previews within it.
                </p>
              </div>

              <div className="category-grid">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    className="category-card card"
                    onClick={() => handleCategoryClick(cat)}
                    style={{ '--cat-color': cat.color }}
                  >
                    <div className="cat-card-icon" style={{ background: cat.color + '18', color: cat.color }}>
                      {cat.icon}
                    </div>
                    <div className="cat-card-body">
                      <h3>{cat.title}</h3>
                      <p>{cat.description}</p>
                    </div>
                    <div className="cat-card-footer">
                      <div className="cat-card-stats">
                        <span className="cat-stat live">{cat.solutions.filter(s => s.status === 'live').length} Live</span>
                        <span className="cat-stat coming">{cat.solutions.filter(s => s.status === 'coming-soon').length} Coming Soon</span>
                      </div>
                      <span className="cat-explore" style={{ color: cat.color }}>Explore →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
