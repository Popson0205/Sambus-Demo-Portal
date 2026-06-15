import { Link } from 'react-router-dom'
import './Solutions.css'

const PRODUCTS = [
  {
    id: 'esri',
    icon: '🗺️',
    name: 'Esri ArcGIS',
    badge: 'Official Distributor',
    badgeColor: 'blue',
    tagline: 'The world\'s leading GIS platform',
    description: 'Gain greater insights using Esri ArcGIS tools to visualize and analyze your data. The first step towards making better, smarter decisions in your organization — just about every problem has a location factor.',
    features: [
      'ArcGIS Pro – Desktop GIS for advanced analysis',
      'ArcGIS Online – Cloud-based mapping & apps',
      'ArcGIS Enterprise – On-premise spatial platform',
      'ArcGIS Field Maps – Mobile data collection',
      'ArcGIS Insights – Interactive analytics',
      'ArcGIS StoryMaps – Narrative mapping',
    ],
    industries: ['Utilities', 'Government', 'Oil & Gas', 'Agriculture', 'Urban Planning'],
    demoUrl: '#', // Backend will inject real URL
  },
  {
    id: 'trimble',
    icon: '📡',
    name: 'Trimble GNSS',
    badge: 'Authorized Reseller',
    badgeColor: 'green',
    tagline: 'High-precision field data collection',
    description: 'Trimble has a range of high performing, rugged field devices with a fully integrated GNSS handheld receiver built for GIS users who demand maximum productivity and positioning accuracy.',
    features: [
      'Trimble R1 GNSS – Sub-meter accuracy',
      'Trimble R2 GNSS – Centimeter-level positioning',
      'Trimble Catalyst – Software-defined GNSS',
      'Trimble TerraFlex – Field data collection software',
      'Trimble Penmap – Engineering surveys',
      'GPS Pathfinder Office – Post-processing',
    ],
    industries: ['Forestry', 'Mining', 'Infrastructure', 'Land Administration', 'Environmental'],
    demoUrl: '#',
  },
  {
    id: 'nv5',
    icon: '🛰️',
    name: 'NV5 Geospatial (ENVI)',
    badge: 'Authorized Distributor',
    badgeColor: 'purple',
    tagline: 'Remote sensing & imagery analysis',
    description: 'Process and Analyze all types of Imagery and Data with ENVI — image analysis software used by GIS professionals, remote sensing scientists, and image analysts to extract meaningful information from imagery.',
    features: [
      'ENVI – Image analysis & remote sensing',
      'ENVI SARscape – SAR data processing',
      'ENVI LiDAR – Point cloud analysis',
      'IDL – Scientific data analysis language',
      'ENVI Modeler – Automated workflow builder',
      'Planet Imagery – High-resolution satellite data',
    ],
    industries: ['Defense & Intelligence', 'Agriculture', 'Natural Resources', 'Coastal Monitoring', 'Disaster Response'],
    demoUrl: '#',
  },
  {
    id: 'wingtra',
    icon: '🚁',
    name: 'Wingtra Drones',
    badge: 'Authorized Partner',
    badgeColor: 'orange',
    tagline: 'VTOL precision surveying at scale',
    description: 'WingtraOne\'s unique set of features empowers you to minimize your time flying and get more work done. The #1 VTOL Surveying Platform for large-scale surveys with unmatched accuracy.',
    features: [
      'WingtraOne GEN II – Survey-grade VTOL drone',
      'WingtraPilot – Mission planning software',
      'PPK GPS – Post-processed kinematic accuracy',
      '42MP RGB camera – High-res imagery',
      'LiDAR option – Dense point cloud capture',
      'WingtraHub – Data management platform',
    ],
    industries: ['Surveying', 'Mining', 'Construction', 'Agriculture', 'Corridor Mapping'],
    demoUrl: '#',
  },
  {
    id: 'local',
    icon: '🇬🇭',
    name: 'Local GIS Solutions',
    badge: 'Sambus Built',
    badgeColor: 'teal',
    tagline: 'Custom-built for West African challenges',
    description: 'Sambus-developed and locally tailored geospatial solutions designed specifically for West African data environments, regulatory contexts, and organizational workflows.',
    features: [
      'Land Information Management Systems',
      'Utility Network Management',
      'Electoral GIS Platforms',
      'Transport & Logistics Optimization',
      'Environmental Monitoring Dashboards',
      'Custom Web GIS Applications',
    ],
    industries: ['Land Administration', 'Utilities', 'Elections', 'Transport', 'Environment'],
    demoUrl: '#', // This is where backend URLs go
  },
]

const BADGE_COLORS = {
  blue: { bg: 'rgba(13, 43, 94, 0.08)', color: 'var(--sgl-navy)' },
  green: { bg: 'rgba(125, 194, 66, 0.12)', color: 'var(--sgl-green-dark)' },
  purple: { bg: 'rgba(107, 70, 193, 0.08)', color: '#6B46C1' },
  orange: { bg: 'rgba(234, 88, 12, 0.08)', color: '#EA580C' },
  teal: { bg: 'rgba(15, 118, 110, 0.08)', color: '#0F766E' },
}

export default function Solutions() {
  return (
    <div className="solutions-page">
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-tag">🌍 Our Portfolio</span>
          <h1>Geospatial Solutions for West Africa</h1>
          <p>
            From enterprise GIS platforms to precision drones, Sambus Geospatial delivers
            the complete technology stack your organization needs to harness the power of location.
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="container solutions-list">
        {PRODUCTS.map((p, i) => {
          const bc = BADGE_COLORS[p.badgeColor]
          return (
            <div key={p.id} className={`product-card card ${i % 2 === 1 ? 'reverse' : ''}`}>
              <div className="product-info">
                <div className="product-header">
                  <span className="product-icon">{p.icon}</span>
                  <span
                    className="product-badge"
                    style={{ background: bc.bg, color: bc.color }}
                  >
                    {p.badge}
                  </span>
                </div>
                <h2>{p.name}</h2>
                <p className="product-tagline">{p.tagline}</p>
                <p className="product-desc">{p.description}</p>
                <div className="product-industries">
                  {p.industries.map(ind => (
                    <span key={ind} className="ind-chip">{ind}</span>
                  ))}
                </div>
                <div className="product-actions">
                  <a href={p.demoUrl} className="btn-primary">
                    Launch Demo
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                  <Link to="/contact" className="btn-outline">Request Info</Link>
                </div>
              </div>
              <div className="product-features">
                <h4>Key Capabilities</h4>
                <ul>
                  {p.features.map(f => (
                    <li key={f}>
                      <span className="check-icon">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Not sure which solution fits your needs?</h2>
            <p>Our geospatial experts will assess your requirements and recommend the right technology stack.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">Talk to an Expert</Link>
              <Link to="/demos" className="btn-secondary">Browse Demos</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
