import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const C = {
  bg: '#1a0f0a',
  sidebar: '#140c07',
  card: 'rgba(255,255,255,0.04)',
  primary: '#c85f20',
  primaryLight: '#e07d3c',
  gold: '#d4a843',
  text: '#fdf6f0',
  muted: 'rgba(253,246,240,0.5)',
  border: 'rgba(255,255,255,0.07)',
  success: '#4ade80',
  danger: '#f87171',
  warning: '#fbbf24',
}

// ── Dummy Data ──────────────────────────────────────────────────────────
const CUSTOMERS = [
  { id: 1, username: 'priya_1234', email: 'priya@gmail.com', city: 'Chennai', joined: '2025-01-10', active: true, orders: 12, bookings: 5 },
  { id: 2, username: 'rahul_5678', email: 'rahul@gmail.com', city: 'Bangalore', joined: '2025-02-14', active: true, orders: 8, bookings: 3 },
  { id: 3, username: 'ananya_9012', email: 'ananya@gmail.com', city: 'Vellore', joined: '2025-03-01', active: false, orders: 3, bookings: 1 },
  { id: 4, username: 'karthik_3456', email: 'karthik@gmail.com', city: 'Coimbatore', joined: '2025-03-10', active: true, orders: 20, bookings: 8 },
]

const OWNERS = [
  { id: 1, username: 'brew_owner', email: 'brew@gmail.com', cafe: 'Brew & Co', city: 'Chennai', joined: '2025-01-05', active: true, revenue: 45000 },
  { id: 2, username: 'roast_owner', email: 'roast@gmail.com', cafe: 'The Roast Room', city: 'Chennai', joined: '2025-02-20', active: true, revenue: 32000 },
  { id: 3, username: 'mocha_owner', email: 'mocha@gmail.com', cafe: 'Mocha Mansion', city: 'Adyar', joined: '2025-03-05', active: false, revenue: 18000 },
]

const STATS = [
  { icon: '👥', label: 'Total Customers', value: 1240, change: '+12%', up: true },
  { icon: '🏪', label: 'Café Owners', value: 48, change: '+5%', up: true },
  { icon: '📅', label: 'Total Bookings', value: 3820, change: '+18%', up: true },
  { icon: '💰', label: 'Total Revenue', value: '₹2.4L', change: '+8%', up: true },
  { icon: '🍽️', label: 'Total Orders', value: 6540, change: '+22%', up: true },
  { icon: '⭐', label: 'Avg Rating', value: '4.7', change: '+0.2', up: true },
]

const RECENT_ACTIVITY = [
  { icon: '👤', text: 'New customer registered', name: 'priya_1234', time: '2 mins ago', type: 'customer' },
  { icon: '🏪', text: 'New café owner joined', name: 'brew_owner', time: '15 mins ago', type: 'owner' },
  { icon: '📅', text: 'Table booked at Brew & Co', name: 'rahul_5678', time: '32 mins ago', type: 'booking' },
  { icon: '💳', text: 'Payment received', name: '₹450', time: '1 hr ago', type: 'payment' },
  { icon: '⚠️', text: 'Account deactivated', name: 'ananya_9012', time: '2 hrs ago', type: 'alert' },
]

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [customers, setCustomers] = useState(CUSTOMERS)
  const [owners, setOwners] = useState(OWNERS)
  const [searchCustomer, setSearchCustomer] = useState('')
  const [searchOwner, setSearchOwner] = useState('')
  const [confirmModal, setConfirmModal] = useState(null)
  const [createOwnerModal, setCreateOwnerModal] = useState(false)
  const [ownerForm, setOwnerForm] = useState({ username: '', email: '', cafe: '', city: '' })
  const [ownerSuccess, setOwnerSuccess] = useState(false)

  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'customers', icon: '👥', label: 'Customers' },
    { id: 'owners', icon: '🏪', label: 'Café Owners' },
    { id: 'reports', icon: '📊', label: 'Reports' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ]

  const toggleCustomer = (id) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c))
    setConfirmModal(null)
  }

  const toggleOwner = (id) => {
    setOwners(prev => prev.map(o => o.id === id ? { ...o, active: !o.active } : o))
    setConfirmModal(null)
  }

  const handleCreateOwner = (e) => {
    e.preventDefault()
    setOwnerSuccess(true)
    setTimeout(() => { setCreateOwnerModal(false); setOwnerSuccess(false); setOwnerForm({ username: '', email: '', cafe: '', city: '' }) }, 2500)
  }

  const handleLogout = () => { logout(); navigate('/') }

  const filteredCustomers = customers.filter(c =>
    c.username.toLowerCase().includes(searchCustomer.toLowerCase()) ||
    c.email.toLowerCase().includes(searchCustomer.toLowerCase())
  )

  const filteredOwners = owners.filter(o =>
    o.username.toLowerCase().includes(searchOwner.toLowerCase()) ||
    o.cafe.toLowerCase().includes(searchOwner.toLowerCase())
  )

  const statusBadge = (active) => ({
    bg: active ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
    color: active ? '#4ade80' : '#f87171',
    border: active ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)',
    text: active ? 'Active' : 'Inactive'
  })

  const inputStyle = {
    width: '100%', padding: '0.8rem 1rem', borderRadius: '0.75rem',
    border: '1.5px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)', color: C.text,
    fontSize: '0.9rem', boxSizing: 'border-box',
    fontFamily: 'Inter, sans-serif', transition: 'all 0.2s'
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.06} 50%{opacity:0.12} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        .nav-item:hover { background: rgba(200,95,32,0.1) !important; color: #e07d3c !important; }
        .stat-card:hover { transform: translateY(-4px) !important; border-color: rgba(200,95,32,0.3) !important; }
        .row-hover:hover { background: rgba(200,95,32,0.04) !important; }
        .action-btn:hover { opacity: 0.85 !important; transform: scale(1.05) !important; }
        .input-f:focus { border-color: #c85f20 !important; outline: none; background: rgba(200,95,32,0.06) !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(200,95,32,0.3); border-radius: 2px; }
      `}</style>

      {/* ── SIDEBAR ────────────────────────────────────────────────── */}
      <div style={{
        width: sidebarCollapsed ? '70px' : '240px',
        backgroundColor: C.sidebar, borderRight: `1px solid ${C.border}`,
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.3s ease', position: 'sticky',
        top: 0, height: '100vh', zIndex: 50, flexShrink: 0, overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: sidebarCollapsed ? 'center' : 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>☕</span>
            {!sidebarCollapsed && <span style={{ fontWeight: '800', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>SipSpot</span>}
          </div>
          {!sidebarCollapsed && <div onClick={() => setSidebarCollapsed(true)} style={{ cursor: 'pointer', color: C.muted, fontSize: '1rem' }}>◀</div>}
        </div>
        {sidebarCollapsed && <div onClick={() => setSidebarCollapsed(false)} style={{ padding: '0.75rem', textAlign: 'center', cursor: 'pointer', color: C.muted, borderBottom: `1px solid ${C.border}` }}>▶</div>}

        {/* Admin badge */}
        {!sidebarCollapsed && (
          <div style={{ margin: '1rem 0.75rem 0', background: 'rgba(200,95,32,0.1)', border: '1px solid rgba(200,95,32,0.2)', borderRadius: '0.75rem', padding: '0.625rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1rem' }}>🛡️</span>
            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: C.primaryLight }}>Admin Panel</span>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map(item => (
            <div key={item.id} className="nav-item" onClick={() => setActiveSection(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: '0.875rem',
              padding: '0.75rem 1rem', borderRadius: '0.75rem', cursor: 'pointer',
              background: activeSection === item.id ? 'rgba(200,95,32,0.12)' : 'transparent',
              color: activeSection === item.id ? C.primaryLight : C.muted,
              border: `1px solid ${activeSection === item.id ? 'rgba(200,95,32,0.2)' : 'transparent'}`,
              transition: 'all 0.2s', justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              fontWeight: activeSection === item.id ? '600' : '400',
            }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
              {!sidebarCollapsed && <span style={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{item.label}</span>}
            </div>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: '1rem 0.75rem', borderTop: `1px solid ${C.border}` }}>
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(200,95,32,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>🛡️</div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '130px' }}>{user?.username}</div>
                <div style={{ fontSize: '0.7rem', color: C.primaryLight }}>Administrator</div>
              </div>
            </div>
          )}
          <div className="nav-item" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', cursor: 'pointer', color: '#f87171', transition: 'all 0.2s', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>🚪</span>
            {!sidebarCollapsed && <span style={{ fontSize: '0.875rem' }}>Logout</span>}
          </div>
        </div>
      </div>

      {/* ── MAIN ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto' }}>

        {/* Topbar */}
        <div style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(26,15,10,0.9)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${C.border}`, padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.1rem' }}>
              {activeSection === 'dashboard' && '🏠 Dashboard Overview'}
              {activeSection === 'customers' && '👥 Customer Management'}
              {activeSection === 'owners' && '🏪 Café Owner Management'}
              {activeSection === 'reports' && '📊 Reports & Analytics'}
              {activeSection === 'settings' && '⚙️ Settings'}
            </h1>
            <p style={{ color: C.muted, fontSize: '0.78rem' }}>
              {activeSection === 'dashboard' && 'Welcome back, Admin'}
              {activeSection === 'customers' && `${filteredCustomers.length} customers found`}
              {activeSection === 'owners' && `${filteredOwners.length} café owners found`}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {activeSection === 'owners' && (
              <button onClick={() => setCreateOwnerModal(true)} style={{ padding: '0.6rem 1.25rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>
                + Add Café Owner
              </button>
            )}
            <div style={{ fontSize: '0.82rem', color: C.muted }}>
              <span style={{ color: C.primaryLight, fontWeight: '600' }}>🛡️ {user?.username}</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '2rem' }}>

          {/* ── DASHBOARD OVERVIEW ─────────────────────────────────── */}
          {activeSection === 'dashboard' && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {STATS.map((s, i) => (
                  <div key={i} className="stat-card" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1rem', padding: '1.5rem', transition: 'all 0.3s', cursor: 'default' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.75rem' }}>{s.icon}</span>
                      <span style={{ background: s.up ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)', color: s.up ? '#4ade80' : '#f87171', fontSize: '0.72rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '0.5rem' }}>{s.change}</span>
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '800', color: C.gold, marginBottom: '0.25rem' }}>{s.value}</div>
                    <div style={{ fontSize: '0.78rem', color: C.muted }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Bottom row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                {/* Recent Activity */}
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.5rem' }}>
                  <h3 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '1.25rem', color: C.primaryLight }}>Recent Activity</h3>
                  {RECENT_ACTIVITY.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', padding: '0.75rem 0', borderBottom: i < RECENT_ACTIVITY.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(200,95,32,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{a.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.82rem', color: C.text, marginBottom: '0.15rem' }}>{a.text}</div>
                        <div style={{ fontSize: '0.75rem', color: C.primaryLight, fontWeight: '600' }}>{a.name}</div>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: C.muted, whiteSpace: 'nowrap' }}>{a.time}</div>
                    </div>
                  ))}
                </div>

                {/* Quick stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Active vs inactive */}
                  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.5rem' }}>
                    <h3 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '1.25rem', color: C.primaryLight }}>Account Status</h3>
                    {[
                      { label: 'Active Customers', value: customers.filter(c => c.active).length, total: customers.length, color: '#4ade80' },
                      { label: 'Active Owners', value: owners.filter(o => o.active).length, total: owners.length, color: C.primaryLight },
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: i === 0 ? '1rem' : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <span style={{ fontSize: '0.82rem', color: C.muted }}>{item.label}</span>
                          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: item.color }}>{item.value}/{item.total}</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(item.value / item.total) * 100}%`, background: item.color, borderRadius: '3px', transition: 'width 1s ease' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Top cafes */}
                  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.5rem', flex: 1 }}>
                    <h3 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '1.25rem', color: C.primaryLight }}>Top Performing Cafés</h3>
                    {owners.map((o, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: i < owners.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                        <span style={{ fontSize: '1.2rem' }}>☕</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: '600' }}>{o.cafe}</div>
                          <div style={{ fontSize: '0.72rem', color: C.muted }}>{o.city}</div>
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: C.gold }}>₹{o.revenue.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── CUSTOMERS ──────────────────────────────────────────── */}
          {activeSection === 'customers' && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              {/* Search */}
              <div style={{ position: 'relative', maxWidth: '400px', marginBottom: '1.5rem' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
                <input className="input-f" value={searchCustomer} onChange={e => setSearchCustomer(e.target.value)}
                  placeholder="Search customers..."
                  style={{ ...inputStyle, paddingLeft: '2.75rem' }} />
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Total', value: customers.length, color: C.gold },
                  { label: 'Active', value: customers.filter(c => c.active).length, color: '#4ade80' },
                  { label: 'Inactive', value: customers.filter(c => !c.active).length, color: '#f87171' },
                  { label: 'Total Orders', value: customers.reduce((s, c) => s + c.orders, 0), color: C.primaryLight },
                ].map((s, i) => (
                  <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '0.875rem', padding: '1rem 1.25rem' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: '800', color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: '0.75rem', color: C.muted }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', overflow: 'hidden' }}>
                {/* Table header */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr 1fr 1.5fr', padding: '1rem 1.5rem', borderBottom: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.02)' }}>
                  {['Username', 'Email', 'City', 'Orders', 'Bookings', 'Status', 'Action'].map(h => (
                    <div key={h} style={{ fontSize: '0.75rem', fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
                  ))}
                </div>
                {/* Rows */}
                {filteredCustomers.map((c, i) => {
                  const sb = statusBadge(c.active)
                  return (
                    <div key={c.id} className="row-hover" style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr 1fr 1.5fr', padding: '1rem 1.5rem', borderBottom: i < filteredCustomers.length - 1 ? `1px solid ${C.border}` : 'none', alignItems: 'center', transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(200,95,32,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>👤</div>
                        <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{c.username}</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: C.muted }}>{c.email}</div>
                      <div style={{ fontSize: '0.82rem', color: C.muted }}>📍 {c.city}</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600', color: C.gold }}>{c.orders}</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{c.bookings}</div>
                      <span style={{ display: 'inline-block', background: sb.bg, color: sb.color, border: `1px solid ${sb.border}`, borderRadius: '0.5rem', padding: '0.2rem 0.6rem', fontSize: '0.72rem', fontWeight: '600' }}>{sb.text}</span>
                      <button className="action-btn" onClick={() => setConfirmModal({ type: 'customer', id: c.id, active: c.active, name: c.username })} style={{
                        padding: '0.4rem 0.875rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
                        background: c.active ? 'rgba(248,113,113,0.1)' : 'rgba(74,222,128,0.1)',
                        color: c.active ? '#f87171' : '#4ade80',
                        fontSize: '0.75rem', fontWeight: '600', transition: 'all 0.2s'
                      }}>
                        {c.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── OWNERS ─────────────────────────────────────────────── */}
          {activeSection === 'owners' && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              {/* Search */}
              <div style={{ position: 'relative', maxWidth: '400px', marginBottom: '1.5rem' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
                <input className="input-f" value={searchOwner} onChange={e => setSearchOwner(e.target.value)}
                  placeholder="Search café owners..."
                  style={{ ...inputStyle, paddingLeft: '2.75rem' }} />
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Total Owners', value: owners.length, color: C.gold },
                  { label: 'Active', value: owners.filter(o => o.active).length, color: '#4ade80' },
                  { label: 'Inactive', value: owners.filter(o => !o.active).length, color: '#f87171' },
                  { label: 'Total Revenue', value: `₹${owners.reduce((s, o) => s + o.revenue, 0).toLocaleString()}`, color: C.primaryLight },
                ].map((s, i) => (
                  <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '0.875rem', padding: '1rem 1.25rem' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: '800', color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: '0.75rem', color: C.muted }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1.5fr 1.5fr 1.5fr', padding: '1rem 1.5rem', borderBottom: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.02)' }}>
                  {['Username', 'Email', 'Café', 'City', 'Revenue', 'Action'].map(h => (
                    <div key={h} style={{ fontSize: '0.75rem', fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
                  ))}
                </div>
                {filteredOwners.map((o, i) => {
                  const sb = statusBadge(o.active)
                  return (
                    <div key={o.id} className="row-hover" style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1.5fr 1.5fr 1.5fr', padding: '1rem 1.5rem', borderBottom: i < filteredOwners.length - 1 ? `1px solid ${C.border}` : 'none', alignItems: 'center', transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(200,95,32,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>🏪</div>
                        <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{o.username}</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: C.muted }}>{o.email}</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: '600' }}>☕ {o.cafe}</div>
                      <div style={{ fontSize: '0.82rem', color: C.muted }}>📍 {o.city}</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700', color: C.gold }}>₹{o.revenue.toLocaleString()}</div>
                      <button className="action-btn" onClick={() => setConfirmModal({ type: 'owner', id: o.id, active: o.active, name: o.username })} style={{
                        padding: '0.4rem 0.875rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
                        background: o.active ? 'rgba(248,113,113,0.1)' : 'rgba(74,222,128,0.1)',
                        color: o.active ? '#f87171' : '#4ade80',
                        fontSize: '0.75rem', fontWeight: '600', transition: 'all 0.2s'
                      }}>
                        {o.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── REPORTS ────────────────────────────────────────────── */}
          {activeSection === 'reports' && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {[
                  { title: 'Revenue This Month', value: '₹2,40,000', change: '+8%', icon: '💰', color: C.gold },
                  { title: 'New Registrations', value: '124', change: '+12%', icon: '👥', color: '#4ade80' },
                  { title: 'Orders Completed', value: '6,540', change: '+22%', icon: '🍽️', color: C.primaryLight },
                  { title: 'Active Cafés', value: '45', change: '+5%', icon: '🏪', color: '#a78bfa' },
                ].map((r, i) => (
                  <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '2rem' }}>{r.icon}</span>
                      <span style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '0.5rem' }}>{r.change}</span>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: r.color, marginBottom: '0.4rem' }}>{r.value}</div>
                    <div style={{ fontSize: '0.82rem', color: C.muted }}>{r.title}</div>
                  </div>
                ))}
              </div>

              {/* Monthly breakdown */}
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.75rem', marginTop: '1.5rem' }}>
                <h3 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '1.5rem', color: C.primaryLight }}>Monthly Revenue Breakdown</h3>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, i) => {
                  const values = [65, 80, 95, 72, 100]
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.875rem' }}>
                      <div style={{ width: '40px', fontSize: '0.78rem', color: C.muted }}>{month}</div>
                      <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${values[i]}%`, background: `linear-gradient(90deg, #c85f20, #e07d3c)`, borderRadius: '4px' }} />
                      </div>
                      <div style={{ width: '60px', fontSize: '0.78rem', color: C.gold, fontWeight: '600', textAlign: 'right' }}>₹{values[i] * 2400}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── SETTINGS ───────────────────────────────────────────── */}
          {activeSection === 'settings' && (
            <div style={{ animation: 'fadeUp 0.5s ease', maxWidth: '600px' }}>
              {[
                { title: 'Admin Profile', items: [['Username', user?.username], ['Role', 'Administrator'], ['Email', 'admin@sipspot.com']] },
                { title: 'Platform Settings', items: [['Registration', 'Open'], ['Email Verification', 'Required'], ['Auto-approve Owners', 'Disabled']] },
              ].map((section, si) => (
                <div key={si} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '1.25rem', color: C.primaryLight }}>{section.title}</h3>
                  {section.items.map(([key, val], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: i < section.items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ color: C.muted, fontSize: '0.875rem' }}>{key}</span>
                      <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{val}</span>
                    </div>
                  ))}
                </div>
              ))}
              <button onClick={handleLogout} style={{ width: '100%', padding: '0.875rem', borderRadius: '0.875rem', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer' }}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── CONFIRM MODAL ──────────────────────────────────────────── */}
      {confirmModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setConfirmModal(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }} />
          <div style={{ position: 'relative', background: '#1f0f08', border: `1px solid ${C.border}`, borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: '380px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{confirmModal.active ? '⚠️' : '✅'}</div>
            <h3 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              {confirmModal.active ? 'Deactivate Account?' : 'Activate Account?'}
            </h3>
            <p style={{ color: C.muted, fontSize: '0.875rem', marginBottom: '1.75rem' }}>
              Are you sure you want to {confirmModal.active ? 'deactivate' : 'activate'} <strong style={{ color: C.text }}>{confirmModal.name}</strong>?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setConfirmModal(null)} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.text, cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
              <button onClick={() => confirmModal.type === 'customer' ? toggleCustomer(confirmModal.id) : toggleOwner(confirmModal.id)} style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', background: confirmModal.active ? 'rgba(248,113,113,0.2)' : 'rgba(74,222,128,0.2)', border: `1px solid ${confirmModal.active ? 'rgba(248,113,113,0.3)' : 'rgba(74,222,128,0.3)'}`, color: confirmModal.active ? '#f87171' : '#4ade80', cursor: 'pointer', fontWeight: '700' }}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE OWNER MODAL ─────────────────────────────────────── */}
      {createOwnerModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setCreateOwnerModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }} />
          <div style={{ position: 'relative', background: '#1f0f08', border: `1px solid ${C.border}`, borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: '440px' }}>
            <button onClick={() => setCreateOwnerModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, color: C.text, width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}>×</button>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏪</div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.3rem' }}>Add Café Owner</h2>
              <p style={{ color: C.muted, fontSize: '0.82rem' }}>Credentials will be sent via email</p>
            </div>

            {ownerSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <div style={{ color: '#4ade80', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Owner Created!</div>
                <p style={{ color: C.muted, fontSize: '0.85rem' }}>Credentials sent to their email.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateOwner}>
                {[
                  { label: 'Username', key: 'username', placeholder: 'cafe_owner' },
                  { label: 'Email', key: 'email', placeholder: 'owner@cafe.com', type: 'email' },
                  { label: 'Café Name', key: 'cafe', placeholder: 'My Coffee Shop' },
                  { label: 'City', key: 'city', placeholder: 'Chennai' },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: '500', color: C.muted }}>{f.label}</label>
                    <input className="input-f" type={f.type || 'text'} required placeholder={f.placeholder}
                      value={ownerForm[f.key]} onChange={e => setOwnerForm({ ...ownerForm, [f.key]: e.target.value })}
                      style={inputStyle} />
                  </div>
                ))}
                <button type="submit" style={{ width: '100%', padding: '0.9rem', borderRadius: '0.875rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 25px rgba(200,95,32,0.35)', marginTop: '0.5rem' }}>
                  Create Owner Account →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}