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

            Sambus Geospatial  is a Geographic Information System (GIS) and mapping company. 
We are the sole distributor of ESRI, ENVI, Trimble and WINGTRA Drones with exclusive representation 
in Ghana, Nigeria, Gambia, Gabon, Sierra Leone, Equatorial Guinea, and Liberia. We develop applications 
that can integrate technologies and provide a range of geospatial solutions and provide sales, 
innovation, consultancy, and training in the use of mapping and spatial analytics software for desktop, 
software as a service (SaaS), and enterprise applications. 
These products deliver location intelligence and meet digital transformation needs for organizations. and individuals.

            Sambus Geospatial has gained substantial experience in the development and implementation of socio-economic 
and environmental related projects and methodologies using GIS. Many sectors in Ghana and the West African sub-region have 
benefited immensely from our expertise and technologies through ESRI GIS software installation, project support and capacity building, 
with the most complete GIS platform – ArcGIS for Mapping, data management, planning and analysis, workforce optimization, 
and operational awareness and a robust organizational structure.
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
              Sambus Geospatial, formerly the GIS/GPS Division of Sambus Company Limited (SCL hereafter) is an applications 
  development firm that integrates technologies and provides a range of geospatial solutions. 
  Our history started over 33 years ago when the late Mr Samuel Aboah founded SCL. Mr. Aboah, 
  who was friends with the legendary founder of ESRI Jack Dangermond, witnessed first-hand the 
  contributions computer-based mapping and analysis made to geographic planning and environmental 
  science in the USA and decided to introduce the technology in Ghana. Sambus is a shortened form of Samuel’s 
  (i.e. Sam) business (i.e. bus), and the company has come a long way since its inception as Sam’s vision, 
  and legacy lives on. The founding of SGL was an uphill climb, and as is often the case for visionaries who take the untrodden path, 
  Mr. Aboah did not have it easy in starting-up. Before SGL, he started off selling personal computers to  Makola women after he resigned 
  from his job at Mobil. It was his philosophy never to stock and sell but rather sell first and deliver to the client; 
  a philosophy still pervasive in several aspects of our current operations. Such an innovative approach to selling computers 
  at the time was not straightforward, but he persevered. Expanding business to include geospatial solutions was even harder, 
  but he never gave up.
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
