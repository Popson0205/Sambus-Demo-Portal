import { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './Demos.css'

// Fix Leaflet default icon issue with Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const SGL_LOCATIONS = [
  { name: 'Accra, Ghana', lat: 5.6037, lng: -0.1870, type: 'hq', note: 'Headquarters' },
  { name: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792, type: 'office', note: 'Nigeria Office' },
  { name: 'Banjul, Gambia', lat: 13.4549, lng: -16.5790, type: 'partner', note: 'Partner Office' },
  { name: 'Libreville, Gabon', lat: 0.4162, lng: 9.4673, type: 'partner', note: 'Partner Office' },
  { name: 'Monrovia, Liberia', lat: 6.3156, lng: -10.8074, type: 'partner', note: 'Partner Office' },
  { name: 'Freetown, Sierra Leone', lat: 8.4657, lng: -13.2317, type: 'partner', note: 'Partner Office' },
  { name: 'Malabo, Equatorial Guinea', lat: 3.7523, lng: 8.7742, type: 'partner', note: 'Partner Office' },
]

// ── CATEGORY DATA ─────────────────────────────────────────────────────────────
const CATEGORIES = [
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
        status: 'live',
        iframeUrl: 'https://www.arcgis.com/apps/mapviewer/index.html',
      },
      {
        id: 'land-info',
        title: 'Land Information Management System (LIMS)',
        description: 'Comprehensive LIMS for tracking land transactions, ownership transfers, encumbrances and legal disputes with spatial visualization.',
        tags: ['ArcGIS Enterprise', 'LIMS', 'Spatial DB'],
        status: 'live',
        iframeUrl: 'https://www.esri.com/en-us/about/about-esri/overview',
      },
      {
        id: 'valuation',
        title: 'Property Valuation & Rating',
        description: 'Mass appraisal system integrating property attributes, comparable sales, and spatial market data for fair value assessments.',
        tags: ['ArcGIS Pro', 'Valuation', 'Analytics'],
        status: 'live',
        iframeUrl: 'https://storymaps.arcgis.com/',
      },
      {
        id: 'tenure',
        title: 'Tenure Security Dashboard',
        description: 'Track tenure formalization progress, community boundaries, and certificate issuance across districts with real-time dashboards.',
        tags: ['ArcGIS Dashboards', 'Tenure', 'Reports'],
        status: 'coming-soon',
        iframeUrl: null,
      },
    ],
  },
  {
    id: 'utilities',
    icon: '⚡',
    title: 'Utilities',
    description: 'Network monitoring, outage management, and asset tracking for electricity, water, and gas distribution infrastructure.',
    color: '#7DC242',
    solutions: [
      {
        id: 'utility-network',
        title: 'Utility Network Dashboard',
        description: 'Real-time monitoring of electricity distribution networks with outage tracking, fault isolation and asset management.',
        tags: ['ArcGIS', 'Network Analysis', 'Real-time'],
        status: 'live',
        iframeUrl: 'https://www.arcgis.com/apps/mapviewer/index.html',
      },
      {
        id: 'water-network',
        title: 'Water Network Management',
        description: 'Pipe network mapping, pressure zone analysis, and maintenance scheduling for water utilities across service areas.',
        tags: ['ArcGIS Utility Network', 'Water GIS', 'Field Maps'],
        status: 'live',
        iframeUrl: 'https://www.esri.com/en-us/industries/water/overview',
      },
      {
        id: 'outage',
        title: 'Outage & Fault Response System',
        description: 'Automated outage detection, crew dispatching and customer notification integrated with field mobile teams.',
        tags: ['ArcGIS', 'Operations Dashboard', 'Mobile'],
        status: 'coming-soon',
        iframeUrl: null,
      },
    ],
  },
  {
    id: 'agriculture',
    icon: '🌾',
    title: 'Agriculture',
    description: 'Crop monitoring, yield prediction, soil analysis and farm management using satellite imagery and precision agriculture tools.',
    color: '#5A9130',
    solutions: [
      {
        id: 'crop-monitor',
        title: 'Agricultural Field Monitoring',
        description: 'Crop health analysis using satellite imagery, NDVI indices, and seasonal change detection for farm advisories.',
        tags: ['ENVI', 'Remote Sensing', 'NDVI'],
        status: 'live',
        iframeUrl: 'https://www.esri.com/en-us/industries/agriculture/overview',
      },
      {
        id: 'soil-analysis',
        title: 'Soil & Terrain Analysis',
        description: 'Digital elevation models combined with soil sample data to generate fertility maps and drainage risk assessments.',
        tags: ['ArcGIS Pro', 'DEM', 'Spatial Analysis'],
        status: 'live',
        iframeUrl: 'https://storymaps.arcgis.com/',
      },
      {
        id: 'yield',
        title: 'Yield Prediction Platform',
        description: 'Machine learning–driven crop yield forecasting combining weather data, soil conditions, and historical satellite indices.',
        tags: ['ENVI', 'ML', 'Sentinel-2'],
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
        status: 'live',
        iframeUrl: 'https://www.arcgis.com/apps/mapviewer/index.html',
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
        status: 'live',
        iframeUrl: 'https://www.esri.com/en-us/industries/natural-resources/overview',
      },
      {
        id: 'coastal',
        title: 'Coastal & Wetland Monitoring',
        description: 'Shoreline change analysis, mangrove health mapping, and flood risk modelling for coastal communities.',
        tags: ['ENVI SARscape', 'SAR', 'Coastal GIS'],
        status: 'live',
        iframeUrl: 'https://storymaps.arcgis.com/',
      },
      {
        id: 'eia',
        title: 'Environmental Impact Assessment',
        description: 'Spatial EIA toolset covering habitat sensitivity mapping, noise/air dispersion modelling and mitigation planning.',
        tags: ['ArcGIS Pro', 'EIA', 'Modelling'],
        status: 'coming-soon',
        iframeUrl: null,
      },
    ],
  },
  {
    id: 'government',
    icon: '🏛️',
    title: 'Government',
    description: 'Electoral demarcation, census mapping, public service delivery and citizen-facing geoportals for public sector.',
    color: '#6B46C1',
    solutions: [
      {
        id: 'electoral',
        title: 'Electoral Boundary Mapping',
        description: 'Constituency demarcation, voter density analysis, polling station optimization and results visualization.',
        tags: ['ArcGIS', 'Spatial Statistics', 'Demographics'],
        status: 'live',
        iframeUrl: 'https://www.arcgis.com/apps/mapviewer/index.html',
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
    id: 'security',
    icon: '🔒',
    title: 'Security',
    description: 'Situational awareness, crime mapping, border surveillance, and incident management dashboards for security agencies.',
    color: '#DC2626',
    solutions: [
      {
        id: 'security-dashboard',
        title: 'Security Situational Awareness Dashboard',
        description: 'Real-time incident mapping, threat zone visualization, and command-center dashboards for security operations centers.',
        tags: ['ArcGIS Dashboards', 'Real-time', 'Operations'],
        status: 'live',
        iframeUrl: 'https://www.arcgis.com/apps/dashboards/index.html',
      },
      {
        id: 'crime-map',
        title: 'Crime Analytics & Hotspot Mapping',
        description: 'Spatial crime pattern analysis, predictive hotspot modelling, and patrol route optimization for law enforcement agencies.',
        tags: ['ArcGIS Pro', 'Crime Analysis', 'Spatial Stats'],
        status: 'live',
        iframeUrl: 'https://www.esri.com/en-us/industries/public-safety/overview',
      },
      {
        id: 'border',
        title: 'Border & Perimeter Surveillance',
        description: 'Sensor fusion with GIS for border monitoring — integrating UAV feeds, camera networks, and patrol tracking on a live map.',
        tags: ['ArcGIS', 'UAV', 'Sensor Integration'],
        status: 'coming-soon',
        iframeUrl: null,
      },
      {
        id: 'incident',
        title: 'Incident Management System',
        description: 'Spatial incident logging, resource dispatch tracking, and after-action review tools for emergency response teams.',
        tags: ['ArcGIS Field Maps', 'Mobile', 'Response'],
        status: 'coming-soon',
        iframeUrl: null,
      },
    ],
  },
]

// ── IFRAME PLACEHOLDER ────────────────────────────────────────────────────────
function DemoIframe({ solution }) {
  const [loaded, setLoaded] = useState(false)

  if (solution.status === 'coming-soon') {
    return (
      <div className="iframe-placeholder coming-soon-placeholder">
        <div className="placeholder-inner">
          <div className="placeholder-icon">🔜</div>
          <h3>Coming Soon</h3>
          <p>This demo is currently in development and will be available shortly.</p>
        </div>
      </div>
    )
  }

  if (!solution.iframeUrl || solution.iframeUrl === '#') {
    return (
      <div className="iframe-placeholder">
        <div className="placeholder-inner">
          <div className="placeholder-icon">🚧</div>
          <h3>Demo Loading</h3>
          <p>Embed URL will be configured by the team. Check back soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="iframe-wrapper">
      {!loaded && (
        <div className="iframe-loading">
          <div className="loading-spinner" />
          <span>Loading demo…</span>
        </div>
      )}
      <iframe
        src={solution.iframeUrl}
        title={solution.title}
        className={`demo-iframe ${loaded ? 'loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  )
}

// ── SOLUTION DETAIL VIEW ──────────────────────────────────────────────────────
function SolutionDetail({ solution, category, onBack }) {
  return (
    <div className="solution-detail">
      {/* Breadcrumb */}
      <div className="detail-breadcrumb">
        <button className="breadcrumb-back" onClick={onBack}>
          ← {category.icon} {category.title}
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{solution.title}</span>
      </div>

      {/* Detail Header */}
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

      {/* Iframe Embed */}
      <div className="detail-iframe-section">
        <DemoIframe solution={solution} />
      </div>
    </div>
  )
}

// ── CATEGORY DETAIL: all solutions grid ──────────────────────────────────────
function CategoryDetail({ category, onSelectSolution, onBack }) {
  return (
    <div className="category-detail">
      {/* Back */}
      <button className="back-btn" onClick={onBack}>
        ← Back to All Categories
      </button>

      {/* Category Header */}
      <div className="cat-detail-header" style={{ borderColor: category.color }}>
        <div className="cat-detail-icon" style={{ background: category.color + '18' }}>
          {category.icon}
        </div>
        <div>
          <h2 style={{ color: category.color }}>{category.title}</h2>
          <p>{category.description}</p>
        </div>
      </div>

      {/* Solutions Grid */}
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
                  Preview Demo →
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
            Explore live interactive maps, dashboards, and geospatial applications
            built on leading platforms — ready for your use case.
          </p>
        </div>
      </div>

      {/* ── SOLUTION DETAIL (deepest level) ── */}
      {selectedSolution && selectedCategory && (
        <div className="container demos-content">
          <SolutionDetail
            solution={selectedSolution}
            category={selectedCategory}
            onBack={handleBackToCategory}
          />
        </div>
      )}

      {/* ── CATEGORY DETAIL (solutions grid) ── */}
      {selectedCategory && !selectedSolution && (
        <div className="container demos-content">
          <CategoryDetail
            category={selectedCategory}
            onSelectSolution={handleSolutionSelect}
            onBack={handleBackToAll}
          />
        </div>
      )}

      {/* ── HOME: Map + Category Grid ── */}
      {!selectedCategory && (
        <>
          {/* West Africa Map */}
          <section className="map-section">
            <div className="container">
              <div className="map-header">
                <h2>Sambus Geospatial Coverage</h2>
                <p>Our presence across West Africa — 7 countries, one geospatial vision.</p>
              </div>
              <div className="map-wrapper">
                <MapContainer
                  center={[7.0, -2.0]}
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
                        color: loc.type === 'hq' ? '#7DC242' : loc.type === 'office' ? '#9BC73A' : '#4A8FDB',
                        fillColor: loc.type === 'hq' ? '#7DC242' : loc.type === 'office' ? '#9BC73A' : '#4A8FDB',
                        fillOpacity: 0.85,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div className="map-popup">
                          <strong>{loc.name}</strong>
                          <span>{loc.note}</span>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
                <div className="map-legend">
                  <span><i style={{ background: '#7DC242' }} /> Headquarters</span>
                  <span><i style={{ background: '#9BC73A' }} /> Regional Office</span>
                  <span><i style={{ background: '#4A8FDB' }} /> Partner Office</span>
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
                  Select a category to explore all live demos and previews within it.
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
