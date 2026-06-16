import { useState, useEffect, useCallback } from 'react'
import './Admin.css'

const API = '/api'

const CATEGORY_META = {
  security:    { icon: '🔒', label: 'Security' },
  government:  { icon: '🏛️', label: 'Government' },
  utilities:   { icon: '⚡', label: 'Utilities' },
  agriculture: { icon: '🌾', label: 'Agriculture' },
  land:        { icon: '🏗️', label: 'Land Administration' },
  urban:       { icon: '🏙️', label: 'Urban Planning' },
  environment: { icon: '🌳', label: 'Environment' },
}

const EMPTY_FORM = {
  title: '', category: 'security', description: '',
  tags: '', iframeUrl: '', status: 'live',
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      onLogin(data.token, data.username)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo">
          <img src="/sambus-logo.png" alt="Sambus Geospatial" />
          <span>Demo Portal Admin</span>
        </div>
        <h2>Sign In</h2>
        <p className="login-sub">Manage solutions, dashboards and demo content.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="field-group">
            <label>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              placeholder="Admin@Demo_Portal"
              required
              autoComplete="username"
            />
          </div>
          <div className="field-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          {error && <div className="login-error">⚠ {error}</div>}
          <button type="submit" className="btn-primary login-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── SOLUTION FORM ─────────────────────────────────────────────────────────────
function SolutionForm({ initial, onSave, onCancel, token }) {
  const [form, setForm] = useState(initial || EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const isEdit = Boolean(initial?.id)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const payload = {
      ...form,
      tags: form.tags,
      iframeUrl: form.iframeUrl.trim()
        ? form.iframeUrl.trim().includes('?embed=true')
          ? form.iframeUrl.trim()
          : form.iframeUrl.trim() + '?embed=true'
        : null,
      status: form.iframeUrl.trim() ? 'live' : 'coming-soon',
    }
    try {
      const url = isEdit ? `${API}/solutions/${initial.id}` : `${API}/solutions`
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Save failed')
      onSave(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-overlay">
      <div className="solution-form-card">
        <div className="form-header">
          <h3>{isEdit ? 'Edit Solution' : 'Upload New Solution'}</h3>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Title */}
            <div className="field-group full">
              <label>Solution Title <span className="req">*</span></label>
              <input
                type="text"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                placeholder="e.g. OAGF Capital Project Dashboard"
                required
              />
            </div>

            {/* Category */}
            <div className="field-group">
              <label>Category <span className="req">*</span></label>
              <select value={form.category} onChange={e => set('category', e.target.value)} required>
                {Object.entries(CATEGORY_META).map(([k, v]) => (
                  <option key={k} value={k}>{v.icon} {v.label}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="field-group">
              <label>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="live">● Live</option>
                <option value="coming-soon">○ Coming Soon</option>
              </select>
            </div>

            {/* Description */}
            <div className="field-group full">
              <label>Description</label>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Brief description of what this solution does…"
                rows={3}
              />
            </div>

            {/* Tags */}
            <div className="field-group full">
              <label>Tags <span className="hint">(comma-separated)</span></label>
              <input
                type="text"
                value={form.tags}
                onChange={e => set('tags', e.target.value)}
                placeholder="ArcGIS Dashboards, Real-time, Defence"
              />
            </div>

            {/* URL */}
            <div className="field-group full">
              <label>Dashboard / Solution URL</label>
              <input
                type="url"
                value={form.iframeUrl}
                onChange={e => set('iframeUrl', e.target.value)}
                placeholder="https://sambusgeospatial.maps.arcgis.com/apps/dashboards/…"
              />
              <p className="field-hint">
                Paste the ArcGIS dashboard URL — <code>?embed=true</code> is added automatically.
                Leave blank to mark as Coming Soon.
              </p>
            </div>
          </div>

          {error && <div className="form-error">⚠ {error}</div>}

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving…' : isEdit ? '💾 Save Changes' : '⬆ Upload Solution'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── DELETE CONFIRM ────────────────────────────────────────────────────────────
function DeleteConfirm({ solution, onConfirm, onCancel }) {
  return (
    <div className="form-overlay">
      <div className="confirm-card">
        <div className="confirm-icon">🗑️</div>
        <h3>Delete Solution?</h3>
        <p>
          <strong>{solution.title}</strong> will be permanently removed from the gallery.
        </p>
        <div className="form-actions">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}

// ── MAIN ADMIN DASHBOARD ──────────────────────────────────────────────────────
function AdminDashboard({ token, username, onLogout }) {
  const [solutions, setSolutions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [filterCat, setFilterCat] = useState('all')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchSolutions = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/solutions`)
      const data = await res.json()
      setSolutions(data)
    } catch {
      showToast('Failed to load solutions', 'error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchSolutions() }, [fetchSolutions])

  const handleSave = (saved) => {
    fetchSolutions()
    setShowForm(false)
    setEditTarget(null)
    showToast(editTarget ? 'Solution updated ✓' : 'Solution uploaded ✓')
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API}/solutions/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error()
      setDeleteTarget(null)
      fetchSolutions()
      showToast('Solution deleted')
    } catch {
      showToast('Delete failed', 'error')
    }
  }

  const filtered = filterCat === 'all'
    ? solutions
    : solutions.filter(s => s.category === filterCat)

  const liveCount = solutions.filter(s => s.status === 'live').length
  const catCounts = Object.keys(CATEGORY_META).reduce((acc, k) => {
    acc[k] = solutions.filter(s => s.category === k).length
    return acc
  }, {})

  return (
    <div className="admin-dashboard">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <img src="/sambus-logo.png" alt="Sambus" />
          <div>
            <strong>Demo Portal</strong>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${filterCat === 'all' ? 'active' : ''}`} onClick={() => setFilterCat('all')}>
            <span>📊</span> All Solutions
            <span className="nav-count">{solutions.length}</span>
          </button>
          {Object.entries(CATEGORY_META).map(([k, v]) => (
            <button key={k} className={`nav-item ${filterCat === k ? 'active' : ''}`} onClick={() => setFilterCat(k)}>
              <span>{v.icon}</span> {v.label}
              <span className="nav-count">{catCounts[k] || 0}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="admin-user">👤 {username}</span>
          <button className="logout-btn" onClick={onLogout}>Sign Out</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        {/* Top bar */}
        <div className="admin-topbar">
          <div>
            <h1>
              {filterCat === 'all'
                ? 'All Solutions'
                : `${CATEGORY_META[filterCat]?.icon} ${CATEGORY_META[filterCat]?.label}`}
            </h1>
            <p className="topbar-sub">
              {filtered.length} solution{filtered.length !== 1 ? 's' : ''} ·{' '}
              <span className="live-badge">{liveCount} live</span>
            </p>
          </div>
          <button className="btn-primary upload-btn" onClick={() => { setEditTarget(null); setShowForm(true) }}>
            ⬆ Upload Solution
          </button>
        </div>

        {/* Stats row */}
        <div className="stats-row">
          <div className="stat-card">
            <strong>{solutions.length}</strong>
            <span>Total Solutions</span>
          </div>
          <div className="stat-card green">
            <strong>{liveCount}</strong>
            <span>Live</span>
          </div>
          <div className="stat-card muted">
            <strong>{solutions.length - liveCount}</strong>
            <span>Coming Soon</span>
          </div>
          <div className="stat-card">
            <strong>{Object.keys(CATEGORY_META).length}</strong>
            <span>Categories</span>
          </div>
        </div>

        {/* Solutions table */}
        {loading ? (
          <div className="admin-loading">
            <div className="loading-spinner" />
            <span>Loading solutions…</span>
          </div>
        ) : (
          <div className="solutions-table-wrap">
            <table className="solutions-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(sol => (
                  <tr key={sol.id}>
                    <td className="sol-title-cell">
                      <strong>{sol.title}</strong>
                      {sol.description && <span>{sol.description.slice(0, 80)}…</span>}
                    </td>
                    <td>
                      <span className="cat-pill">
                        {CATEGORY_META[sol.category]?.icon} {CATEGORY_META[sol.category]?.label}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${sol.status}`}>
                        {sol.status === 'live' ? '● Live' : '○ Coming Soon'}
                      </span>
                    </td>
                    <td className="url-cell">
                      {sol.iframeUrl
                        ? <a href={sol.iframeUrl.replace('?embed=true', '')} target="_blank" rel="noreferrer" className="url-link">↗ Open</a>
                        : <span className="no-url">—</span>}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="action-btn edit"
                        onClick={() => { setEditTarget({ ...sol, tags: Array.isArray(sol.tags) ? sol.tags.join(', ') : sol.tags, iframeUrl: (sol.iframeUrl || '').replace('?embed=true', '') }); setShowForm(true) }}
                      >✏️ Edit</button>
                      <button
                        className="action-btn delete"
                        onClick={() => setDeleteTarget(sol)}
                      >🗑️</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="empty-row">No solutions in this category yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* MODALS */}
      {showForm && (
        <SolutionForm
          initial={editTarget}
          token={token}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditTarget(null) }}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          solution={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* TOAST */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>
      )}
    </div>
  )
}

// ── ROOT: manages auth state ──────────────────────────────────────────────────
export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token'))
  const [username, setUsername] = useState(() => sessionStorage.getItem('admin_user'))

  const handleLogin = (tok, user) => {
    sessionStorage.setItem('admin_token', tok)
    sessionStorage.setItem('admin_user', user)
    setToken(tok)
    setUsername(user)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token')
    sessionStorage.removeItem('admin_user')
    setToken(null)
    setUsername(null)
  }

  if (!token) return <LoginPage onLogin={handleLogin} />
  return <AdminDashboard token={token} username={username} onLogout={handleLogout} />
}
