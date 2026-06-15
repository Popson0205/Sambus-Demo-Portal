import { useState } from 'react'
import './Contact.css'

const INTERESTS = [
  'Esri ArcGIS', 'Trimble GNSS Devices', 'NV5 / ENVI', 'Wingtra Drones',
  'Local GIS Solutions', 'Training & Capacity Building', 'Custom Development', 'General Inquiry'
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', org: '', email: '', phone: '', country: '', interest: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-tag">📬 Get in Touch</span>
          <h1>Request a Demo</h1>
          <p>
            Fill in your details and our geospatial experts will reach out within 24 hours
            to schedule a personalized demonstration.
          </p>
        </div>
      </div>

      <section className="page-section alt-bg">
        <div className="container contact-layout">
          {/* Form */}
          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="success-state">
                <span className="success-icon">✅</span>
                <h2>Request Received!</h2>
                <p>
                  Thank you, <strong>{form.name}</strong>. Our team will be in touch within 24 hours
                  to schedule your demo.
                </p>
                <button className="btn-primary" onClick={() => setSubmitted(false)}>Submit Another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Demo Request Form</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label>Organization *</label>
                    <input name="org" value={form.org} onChange={handleChange} required placeholder="Company / Agency" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@org.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+233 XX XXX XXXX" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Country *</label>
                  <select name="country" value={form.country} onChange={handleChange} required>
                    <option value="">Select your country</option>
                    {['Ghana', 'Nigeria', 'Gambia', 'Gabon', 'Liberia', 'Sierra Leone', 'Equatorial Guinea', 'Other'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Area of Interest *</label>
                  <select name="interest" value={form.interest} onChange={handleChange} required>
                    <option value="">Select a solution area</option>
                    {INTERESTS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Tell us about your needs</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe your use case, current challenges, or what you're hoping to achieve..."
                  />
                </div>
                <button type="submit" className="btn-primary submit-btn">
                  Submit Demo Request
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-card card">
              <h3>Contact Information</h3>
              <div className="info-items">
                <div className="info-item">
                  <span className="info-icon">🌐</span>
                  <div>
                    <strong>Website</strong>
                    <a href="https://sambusgeospatial.com" target="_blank" rel="noreferrer">sambusgeospatial.com</a>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📧</span>
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:info@sambusgeospatial.com">info@sambusgeospatial.com</a>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <strong>Headquarters</strong>
                    <span>Accra, Ghana</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🏢</span>
                  <div>
                    <strong>Regional Office</strong>
                    <span>Lagos, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card card why-card">
              <h3>Why Request a Demo?</h3>
              <ul>
                {[
                  'Personalized to your industry and use case',
                  'Live walk-through by certified GIS experts',
                  'No cost, no commitment required',
                  'Q&A session included',
                  'Custom ROI analysis available',
                ].map(item => (
                  <li key={item}>
                    <span>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
