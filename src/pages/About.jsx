import { Link } from 'react-router-dom'
import './About.css'

const TEAM_VALUES = [
  { icon: '🌍', title: 'West Africa First', desc: 'Every solution designed with the African context in mind — our data, our infrastructure, our scale.' },
  { icon: '🎯', title: 'Precision & Accuracy', desc: 'Geospatial is only as good as the data. We uphold the highest standards in spatial data quality.' },
  { icon: '🤝', title: 'Partnership-Driven', desc: 'Long-term relationships with clients. We don\'t just sell software — we build geospatial capability.' },
  { icon: '🚀', title: 'Innovation Edge', desc: 'From drones to AI-powered imagery analysis, we bring the frontier of geospatial tech to West Africa.' },
]

const PARTNERS = ['Esri', 'Trimble', 'NV5 Geospatial', 'Wingtra', 'Planet', 'Hexagon']

export default function About() {
  return (
    <div className="about-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-tag">🏢 About Us</span>
          <h1>About Sambus Geospatial</h1>
          <p>
            West Africa's leading geospatial company — official Esri distributor,
            authorized for Trimble, NV5, and Wingtra — serving 7 countries.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="page-section alt-bg">
        <div className="container about-story">
          <div className="story-text">
            <span className="section-tag">Our Story</span>
            <h2 className="section-title">Pioneering Location Intelligence in West Africa</h2>
            <p>
              Sambus Geospatial Limited was founded with a singular mission: to make world-class
              geospatial technology accessible and applicable across West Africa. As the official
              Esri distributor for the region, we have built the technical expertise, local knowledge,
              and regional partnerships to deliver transformative GIS solutions.
            </p>
            <p style={{ marginTop: '16px' }}>
              From national land administration systems to real-time utility network management,
              from agricultural field surveys to urban growth analysis — our solutions are trusted
              by governments, NGOs, and enterprises across Ghana, Nigeria, Gambia, Gabon,
              Liberia, Sierra Leone, and Equatorial Guinea.
            </p>
            <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Work With Us</Link>
              <Link to="/case-studies" className="btn-outline">Our Work</Link>
            </div>
          </div>
          <div className="story-stats">
            {[
              { n: '20+', l: 'Years in Geospatial' },
              { n: '7', l: 'Countries Served' },
              { n: '500+', l: 'Enterprise Clients' },
              { n: '50+', l: 'Expert Team Members' },
            ].map(s => (
              <div key={s.l} className="about-stat">
                <strong>{s.n}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="page-section">
        <div className="container">
          <span className="section-tag">Our Values</span>
          <h2 className="section-title">What Drives Us</h2>
          <div className="values-grid">
            {TEAM_VALUES.map(v => (
              <div key={v.title} className="value-card card">
                <span className="value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="page-section alt-bg partners-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Technology Partners</span>
            <h2 className="section-title">Powered by the Best</h2>
          </div>
          <div className="partners-row">
            {PARTNERS.map(p => (
              <div key={p} className="partner-card card">{p}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
