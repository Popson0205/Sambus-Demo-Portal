import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/sambus-logo.png" alt="Sambus Geospatial" className="footer-logo" />
            <p>
              West Africa's leading geospatial innovator and official Esri distributor.
              Unlocking the power of location intelligence across 7 countries.
            </p>
            <div className="footer-regions">
              {['Ghana', 'Nigeria', 'Gambia', 'Gabon', 'Liberia', 'Sierra Leone', 'Eq. Guinea'].map(r => (
                <span key={r} className="region-chip">{r}</span>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Solutions</h4>
            <Link to="/solutions">Esri ArcGIS</Link>
            <Link to="/solutions">Trimble GNSS</Link>
            <Link to="/solutions">NV5 Geospatial</Link>
            <Link to="/solutions">Wingtra Drones</Link>
            <Link to="/solutions">Local Solutions</Link>
          </div>

          <div className="footer-col">
            <h4>Portal</h4>
            <Link to="/">Home</Link>
            <Link to="/demos">Demo Gallery</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Request Demo</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href="https://sambusgeospatial.com" target="_blank" rel="noreferrer">sambusgeospatial.com</a>
            <a href="mailto:info@sambusgeospatial.com">info@sambusgeospatial.com</a>
            <p className="footer-note">Accra, Ghana | Lagos, Nigeria</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sambus Geospatial Limited. All rights reserved.</p>
          <div className="footer-partners">
            <span>Official Distributor:</span>
            <span className="partner-badge">Esri</span>
            <span className="partner-badge">Trimble</span>
            <span className="partner-badge">NV5</span>
            <span className="partner-badge">Wingtra</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
