import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
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

// West Africa offices/presence
const SGL_LOCATIONS = [
  { name: 'Accra, Ghana', lat: 5.6037, lng: -0.1870, type: 'hq', note: 'Headquarters' },
  { name: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792, type: 'office', note: 'Nigeria Office' },
  { name: 'Banjul, Gambia', lat: 13.4549, lng: -16.5790, type: 'partner', note: 'Partner Office' },
  { name: 'Libreville, Gabon', lat: 0.4162, lng: 9.4673, type: 'partner', note: 'Partner Office' },
  { name: 'Monrovia, Liberia', lat: 6.3156, lng: -10.8074, type: 'partner', note: 'Partner Office' },
  { name: 'Freetown, Sierra Leone', lat: 8.4657, lng: -13.2317, type: 'partner', note: 'Partner Office' },
  { name: 'Malabo, Equatorial Guinea', lat: 3.7523, lng: 8.7742, type: 'partner', note: 'Partner Office' },
]

const DEMOS = [
  {
    id: 1,
    title: 'Land Parcel Management System',
    category: 'Land Administration',
    icon: '🏗️',
    description: 'Interactive cadastral mapping with parcel search, ownership history, and zoning overlays.',
    tags: ['ArcGIS', 'Web GIS', 'Cadastre'],
    url: '#', // Backend injects real URL
    status: 'live',
  },
  {
    id: 2,
    title: 'Utility Network Dashboard',
    category: 'Utilities',
    icon: '⚡',
    description: 'Real-time monitoring of electricity distribution networks with outage tracking and asset management.',
    tags: ['ArcGIS', 'Network Analysis', 'Real-time'],
    url: '#',
    status: 'live',
  },
  {
    id: 3,
    title: 'Agricultural Field Monitoring',
    category: 'Agriculture',
    icon: '🌾',
    description: 'Crop health analysis using satellite imagery, NDVI indices, and seasonal change detection.',
    tags: ['ENVI', 'Remote Sensing', 'NDVI'],
    url: '#',
    status: 'live',
  },
  {
    id: 4,
    title: 'Urban Growth Analysis',
    category: 'Urban Planning',
    icon: '🏙️',
    description: 'Multi-temporal land use change detection and urban sprawl modelling for city planners.',
    tags: ['ArcGIS Pro', 'Change Detection', 'Spatial Analysis'],
    url: '#',
    status: 'coming-soon',
  },
  {
    id: 5,
    title: 'Forest Cover Change Monitor',
    category: 'Environment',
    icon: '🌳',
    description: 'Deforestation tracking using Sentinel-2 and Landsat imagery with alert systems.',
    tags: ['ENVI', 'LiDAR', 'Sentinel-2'],
    url: '#',
    status: 'live',
  },
  {
    id: 6,
    title: 'Electoral Boundary Mapping',
    category: 'Government',
    icon: '🗳️',
    description: 'Electoral constituency demarcation, voter density analysis, and results visualization.',
    tags: ['ArcGIS', 'Spatial Statistics', 'Demographics'],
    url: '#',
    status: 'coming-soon',
  },
]

const CATEGORIES = ['All', ...new Set(DEMOS.map(d => d.category))]

export default function Demos() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? DEMOS
    : DEMOS.filter(d => d.category === activeCategory)

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

      {/* Interactive West Africa Map */}
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
              style={{ height: '480px', width: '100%', borderRadius: '16px' }}
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

      {/* Demo Grid */}
      <section className="page-section alt-bg">
        <div className="container">
          <div className="demos-header">
            <h2 className="section-title">Live Solution Demos</h2>
            <div className="cat-filters">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="demos-grid">
            {filtered.map(demo => (
              <div key={demo.id} className="demo-card card">
                <div className="demo-icon">{demo.icon}</div>
                <div className="demo-cat">{demo.category}</div>
                <h3>{demo.title}</h3>
                <p>{demo.description}</p>
                <div className="demo-tags">
                  {demo.tags.map(t => <span key={t} className="demo-tag">{t}</span>)}
                </div>
                <div className="demo-footer">
                  <span className={`demo-status ${demo.status}`}>
                    {demo.status === 'live' ? '● Live' : '○ Coming Soon'}
                  </span>
                  <a
                    href={demo.url}
                    className={`btn-primary demo-launch ${demo.status !== 'live' ? 'disabled' : ''}`}
                    onClick={e => demo.status !== 'live' && e.preventDefault()}
                  >
                    {demo.status === 'live' ? 'Launch Demo' : 'Coming Soon'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
