import { useState, useEffect } from 'react'
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

const API = '/api'

// ── Office locations (from KMZ) ───────────────────────────────────────────────
const SGL_LOCATIONS = [
  {
    name: 'Sambus Geospatial – HQ',
    lat: 5.5630189, lng: -0.1856645,
    type: 'hq', note: 'Headquarters',
    address: 'F702/1 Salem Avenue, 25 1st Kuku Crescent, Accra, Ghana',
    phone: '+233 30 277 7127',
  },
  {
    name: 'Sambus Geospatial Nigeria – Lagos',
    lat: 6.4371742, lng: 3.4287248,
    type: 'office', note: 'Lagos Office',
    address: '1610 Adeola Hopewell St, Victoria Island, Lagos, Nigeria',
    phone: '+234 92922821',
  },
  {
    name: 'Sambus Geospatial – Abuja',
    lat: 9.0650459, lng: 7.4258754,
    type: 'office', note: 'Abuja Office',
    address: '19 Ebitu Ukiwe St, Jabi, Abuja, FCT, Nigeria',
    phone: '+234 92922821',
  },
]

// ── Static category metadata (icon, color, description) ──────────────────────
const CATEGORY_META = {
  security: {
    id: 'security', icon: '🔒', title: 'Security', color: '#DC2626',
    description: 'Situational awareness, patrol monitoring, and operational dashboards for defence and security agencies.',
  },
  government: {
    id: 'government', icon: '🏛️', title: 'Government', color: '#6B46C1',
    description: 'Capital project tracking, refugee management, electoral demarcation and citizen-facing geoportals.',
  },
  utilities: {
    id: 'utilities', icon: '⚡', title: 'Utilities', color: '#7DC242',
    description: 'Network monitoring, project tracking, and asset management for electricity, water, and infrastructure.',
  },
  agriculture: {
    id: 'agriculture', icon: '🌾', title: 'Agriculture', color: '#5A9130',
    description: 'Biosecurity planning, crop monitoring, soil analysis and farm management.',
  },
  land: {
    id: 'land', icon: '🏗️', title: 'Land Administration', color: '#0D2B5E',
    description: 'Cadastral mapping, parcel management, ownership records and land rights systems.',
  },
  urban: {
    id: 'urban', icon: '🏙️', title: 'Urban Planning', color: '#1B3A6B',
    description: 'City growth modelling, land use analysis, transportation networks and infrastructure planning.',
  },
  environment: {
    id: 'environment', icon: '🌳', title: 'Environment', color: '#0F766E',
    description: 'Forest cover monitoring, deforestation tracking, coastal change, and environmental impact assessments.',
  },
}

// ── Category order (display priority) ────────────────────────────────────────
const CATEGORY_ORDER = ['security','government','utilities','agriculture','land','urban','environment']

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
          <p>This demo is currently in development and will be available shortly.</p>
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
          <p><a href={solution.iframeUrl.replace('?embed=true','')} target="_blank" rel="noreferrer" className="open-link">Open in ArcGIS →</a></p>
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
          <a href={solution.iframeUrl.replace('?embed=true','')} target="_blank" rel="noreferrer" className="open-new-tab">
            ↗ Open Full Screen
          </a>
        </div>
      )}
    </div>
  )
}

// ── SOLUTION DETAIL ───────────────────────────────────────────────────────────
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
            {(Array.isArray(solution.tags) ? solution.tags : []).map(t => (
              <span key={t} className="demo-tag">{t}</span>
            ))}
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

// ── CATEGORY DETAIL ───────────────────────────────────────────────────────────
function CategoryDetail({ category, solutions, onSelectSolution, onBack }) {
  return (
    <div className="category-detail">
      <button className="back-btn" onClick={onBack}>← Back to All Categories</button>
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
        {solutions.map(sol => (
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
              {(Array.isArray(sol.tags) ? sol.tags : []).map(t => (
                <span key={t} className="demo-tag">{t}</span>
              ))}
            </div>
            {sol.status === 'live' && (
              <div className="solution-card-action">
                <span className="preview-btn" style={{ color: category.color }}>Preview Dashboard →</span>
              </div>
            )}
            {sol.status === 'coming-soon' && (
              <div className="solution-card-action">
                <span className="coming-soon-label">Available Soon</span>
              </div>
            )}
          </div>
        ))}
        {solutions.length === 0 && (
          <div className="empty-cat">No solutions in this category yet.</div>
        )}
      </div>
    </div>
  )
}

// ── MAIN DEMOS PAGE ───────────────────────────────────────────────────────────
export default function Demos() {
  const [solutions, setSolutions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSolution, setSelectedSolution] = useState(null)

  // Fetch solutions from API on mount
  useEffect(() => {
    fetch(`${API}/solutions`)
      .then(r => r.json())
      .then(data => { setSolutions(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // Build categories with their solutions from API data
  const categories = CATEGORY_ORDER
    .filter(k => CATEGORY_META[k])
    .map(k => ({
      ...CATEGORY_META[k],
      solutions: solutions.filter(s => s.category === k),
    }))

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat)
    setSelectedSolution(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSolutionSelect = (sol) => {
    setSelectedSolution(sol)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="demos-page">
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-tag">🗺️ Interactive Demos</span>
          <h1>Geospatial Demo Gallery</h1>
          <p>Explore live interactive dashboards and geospatial applications — no sign-in required.</p>
        </div>
      </div>

      {/* Solution detail */}
      {selectedSolution && selectedCategory && (
        <div className="container demos-content">
          <SolutionDetail
            solution={selectedSolution}
            category={selectedCategory}
            onBack={() => { setSelectedSolution(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          />
        </div>
      )}

      {/* Category detail */}
      {selectedCategory && !selectedSolution && (
        <div className="container demos-content">
          <CategoryDetail
            category={selectedCategory}
            solutions={selectedCategory.solutions}
            onSelectSolution={handleSolutionSelect}
            onBack={() => { setSelectedCategory(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
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
                <h2>Sambus Geospatial Offices</h2>
                <p>Our operational offices — Accra (HQ), Lagos, and Abuja.</p>
              </div>
              <div className="map-wrapper">
                <MapContainer
                  center={[7.2, 3.5]} zoom={5}
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
                      radius={loc.type === 'hq' ? 14 : 10}
                      pathOptions={{
                        color: loc.type === 'hq' ? '#7DC242' : '#4A8FDB',
                        fillColor: loc.type === 'hq' ? '#7DC242' : '#4A8FDB',
                        fillOpacity: 0.85, weight: 2,
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
                <p className="section-subtitle">Select a category to explore all live dashboards and previews within it.</p>
              </div>

              {loading ? (
                <div className="demos-loading">
                  <div className="loading-spinner" />
                  <span>Loading solutions…</span>
                </div>
              ) : (
                <div className="category-grid">
                  {categories.map(cat => (
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
              )}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
