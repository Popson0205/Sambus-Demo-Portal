import { Link } from 'react-router-dom'
import './CaseStudies.css'

const CASES = [
  {
    id: 1,
    client: 'Eko Electricity Distribution Company',
    country: '🇳🇬 Nigeria',
    industry: 'Utilities',
    icon: '⚡',
    challenge: 'EKEDC needed to audit their aging GIS infrastructure and implement a comprehensive asset and CRM management system across their distribution network.',
    solution: 'Deployed Esri ArcGIS Enterprise with custom network topology for electrical asset management, integrated with a CRM workflow for customer relationship management.',
    outcome: 'Improved outage response times by 40%, full network visibility, and comprehensive documentation of 2M+ assets.',
    tools: ['ArcGIS Enterprise', 'Network Analyst', 'Custom Web Apps'],
    quote: 'The excellent support we received from Sambus Geospatial ensured that we acquired the right GIS solution with analytical capabilities through the auditing of our existing GIS Infrastructure.',
    author: 'Yusuph Amure, Eko Electricity Company of Nigeria',
  },
  {
    id: 2,
    client: 'Etact Systems',
    country: '🇬🇭 Ghana',
    industry: 'Technology',
    icon: '💻',
    challenge: 'Required seamless integration of geospatial capabilities into an existing enterprise software platform with minimal disruption to operations.',
    solution: 'ArcGIS Online deployment with custom API integrations and tailored training program for the development team.',
    outcome: 'Successful solution deployment with full team upskilling and ongoing technical support framework established.',
    tools: ['ArcGIS Online', 'ArcGIS API for JavaScript', 'Developer Training'],
    quote: 'Personally appreciating Sambus Geospatial for a successful solution deployment. Etact acknowledges your responsive and accommodating services.',
    author: 'Ayoola Afonja, Etact Systems',
  },
  {
    id: 3,
    client: 'Lands Commission Ghana',
    country: '🇬🇭 Ghana',
    industry: 'Land Administration',
    icon: '🏛️',
    challenge: 'Digitizing decades of paper-based cadastral records and creating a modern, accessible land information management system.',
    solution: 'Full ArcGIS platform implementation with custom parcel management workflows, public web portal, and integration with national identity systems.',
    outcome: 'Over 1.5 million land parcels digitized, 70% reduction in land dispute processing time, public-facing map portal launched.',
    tools: ['ArcGIS Pro', 'ArcGIS Online', 'Parcel Fabric', 'Web AppBuilder'],
    quote: 'Sambus Geospatial transformed our land administration processes with modern GIS technology that fits our context perfectly.',
    author: 'Director, Spatial Planning Division',
  },
  {
    id: 4,
    client: 'West Africa Forestry Commission',
    country: '🌍 West Africa',
    industry: 'Environment',
    icon: '🌳',
    challenge: 'Monitoring forest cover change across multiple countries required consistent methodology and near-real-time satellite imagery analysis.',
    solution: 'ENVI SARscape and Sentinel-2 imagery pipeline with automated change detection and reporting dashboards.',
    outcome: 'Monthly forest change reports for 5 countries, early deforestation alerts, and data shared with REDD+ programs.',
    tools: ['ENVI', 'SARscape', 'Sentinel-2', 'Google Earth Engine'],
    quote: 'The imagery analysis capability delivered by Sambus gave us the scientific rigor we needed for international climate reporting.',
    author: 'Programme Manager, Forest Monitoring Unit',
  },
]

export default function CaseStudies() {
  return (
    <div className="cases-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-tag">📋 Client Success</span>
          <h1>Case Studies</h1>
          <p>
            Real-world geospatial transformations across West Africa — from utility networks
            to land administration, forest monitoring to smart cities.
          </p>
        </div>
      </div>

      <div className="cases-list container">
        {CASES.map((c, i) => (
          <article key={c.id} className="case-card card">
            <div className="case-meta">
              <span className="case-icon">{c.icon}</span>
              <div>
                <h3>{c.client}</h3>
                <div className="case-chips">
                  <span className="chip">{c.country}</span>
                  <span className="chip">{c.industry}</span>
                </div>
              </div>
            </div>

            <div className="case-body">
              <div className="case-section">
                <h4>Challenge</h4>
                <p>{c.challenge}</p>
              </div>
              <div className="case-section">
                <h4>Solution</h4>
                <p>{c.solution}</p>
              </div>
              <div className="case-section">
                <h4>Outcome</h4>
                <p>{c.outcome}</p>
              </div>
            </div>

            <div className="case-tools">
              {c.tools.map(t => <span key={t} className="tool-chip">{t}</span>)}
            </div>

            <blockquote className="case-quote">
              <p>"{c.quote}"</p>
              <footer>— {c.author}</footer>
            </blockquote>
          </article>
        ))}
      </div>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to write your own success story?</h2>
            <p>Join 500+ organizations across West Africa transforming how they use location data.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">Get Started</Link>
              <Link to="/demos" className="btn-secondary">View Demos</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
