import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

/* ── Animated GeoCanvas ── */
function GeoCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Nodes: simulate a geospatial network
    const NODE_COUNT = 70
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 3 + 1.5,
      pulse: Math.random() * Math.PI * 2,
      type: Math.random() > 0.8 ? 'hub' : 'node',
    }))

    // Scanlines (latitude/longitude grid)
    const GRID_LINES = 8
    let scanOffset = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bg.addColorStop(0, '#071A3E')
      bg.addColorStop(0.5, '#0D2B5E')
      bg.addColorStop(1, '#071A3E')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Globe-style grid overlay
      ctx.strokeStyle = 'rgba(125, 194, 66, 0.06)'
      ctx.lineWidth = 1
      for (let i = 0; i <= GRID_LINES; i++) {
        const y = (canvas.height / GRID_LINES) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()

        const x = (canvas.width / GRID_LINES) * i
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Moving scan line
      scanOffset = (scanOffset + 0.5) % canvas.height
      const scanGrad = ctx.createLinearGradient(0, scanOffset - 40, 0, scanOffset + 40)
      scanGrad.addColorStop(0, 'transparent')
      scanGrad.addColorStop(0.5, 'rgba(125, 194, 66, 0.08)')
      scanGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanOffset - 40, canvas.width, 80)

      // Update + draw nodes
      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.03

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1

        // Connection lines
        nodes.forEach(m => {
          const dx = m.x - n.x
          const dy = m.y - n.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160 && dist > 0) {
            const alpha = (1 - dist / 160) * 0.25
            ctx.beginPath()
            ctx.strokeStyle = `rgba(125, 194, 66, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.stroke()
          }
        })

        // Node dot
        const alpha = 0.6 + Math.sin(n.pulse) * 0.3
        if (n.type === 'hub') {
          // Pulsing ring for hub nodes
          const ringR = n.r * 3 + Math.sin(n.pulse) * 4
          ctx.beginPath()
          ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(125, 194, 66, ${alpha * 0.3})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.type === 'hub'
          ? `rgba(125, 194, 66, ${alpha})`
          : `rgba(180, 210, 255, ${alpha * 0.7})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="geo-canvas" />
}

/* ── Stats ── */
const STATS = [
  { value: '7', label: 'Countries Served' },
  { value: '500+', label: 'Enterprise Clients' },
  { value: '20+', label: 'Years Experience' },
  { value: '15+', label: 'GIS Solutions' },
]

/* ── Solutions preview ── */
const SOLUTIONS = [
  {
    icon: '🗺️',
    name: 'Esri ArcGIS',
    desc: 'Enterprise GIS platform for analysis, mapping and spatial intelligence.',
    tag: 'Official Distributor',
  },
  {
    icon: '📡',
    name: 'Trimble GNSS',
    desc: 'High-precision field devices for GIS data collection and surveying.',
    tag: 'Authorized Reseller',
  },
  {
    icon: '🛰️',
    name: 'NV5 Geospatial',
    desc: 'Advanced imagery and remote sensing software for spatial analysis.',
    tag: 'Authorized Distributor',
  },
  {
    icon: '🚁',
    name: 'Wingtra Drones',
    desc: 'VTOL surveying drones for large-scale precision aerial mapping.',
    tag: 'Authorized Partner',
  },
]

export default function Home() {
  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <GeoCanvas />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="dot" />
            West Africa's Leading Geospatial Innovator
          </div>
          <h1 className="hero-title">
            Unlock the Power of<br />
            <span className="text-green">Location Intelligence</span>
          </h1>
          <p className="hero-subtitle">
            Official Esri distributor for West Africa. From enterprise GIS to precision drones —
            we equip organizations with the spatial tools to make smarter decisions.
          </p>
          <div className="hero-actions">
            <Link to="/demos" className="btn-primary">
              Explore Demos
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/solutions" className="btn-secondary">View Solutions</Link>
          </div>

          <div className="hero-stats">
            {STATS.map(s => (
              <div key={s.label} className="stat-item">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll to explore</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ── SOLUTIONS PREVIEW ── */}
      <section className="page-section alt-bg">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">🌍 Our Portfolio</span>
            <h2 className="section-title">World-Class Geospatial Solutions</h2>
            <p className="section-subtitle">
              Authorised to distribute and support the world's leading geospatial platforms across West Africa.
            </p>
          </div>
          <div className="solutions-grid">
            {SOLUTIONS.map(sol => (
              <Link to="/solutions" key={sol.name} className="card sol-card">
                <div className="sol-icon">{sol.icon}</div>
                <span className="sol-tag">{sol.tag}</span>
                <h3>{sol.name}</h3>
                <p>{sol.desc}</p>
                <span className="sol-arrow">
                  View Solutions →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP TEASER ── */}
      <section className="page-section map-teaser">
        <div className="container">
          <div className="map-teaser-inner">
            <div className="map-teaser-text">
              <span className="section-tag">📍 Interactive Demos</span>
              <h2 className="section-title">See Our Solutions in Action</h2>
              <p className="section-subtitle">
                Explore our curated demo gallery — live interactive maps, dashboards,
                and geospatial apps showcasing real-world applications across West Africa.
              </p>
              <Link to="/demos" className="btn-primary" style={{ marginTop: '24px' }}>
                Open Demo Gallery
              </Link>
            </div>
            <div className="map-teaser-img">
              <div className="map-preview-card">
                <div className="map-preview-dots">
                  <span /><span /><span />
                </div>
                <div className="map-preview-body">
                  <div className="map-pulse">
                    <div className="pulse-ring" />
                    <div className="pulse-core" />
                  </div>
                  <p>Live Interactive Map</p>
                  <span>West Africa GIS View</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to transform your organization with geospatial intelligence?</h2>
            <p>Talk to our experts and get a personalized demo tailored to your industry.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">Request a Demo</Link>
              <Link to="/case-studies" className="btn-secondary">Read Case Studies</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
