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
const INITIAL_TABLES = [
  { id: 1, number: 'T-01', capacity: 2, status: 'available' },
  { id: 2, number: 'T-02', capacity: 4, status: 'occupied' },
  { id: 3, number: 'T-03', capacity: 4, status: 'reserved' },
  { id: 4, number: 'T-04', capacity: 6, status: 'available' },
  { id: 5, number: 'T-05', capacity: 2, status: 'available' },
  { id: 6, number: 'T-06', capacity: 8, status: 'occupied' },
]

const INITIAL_MENU = [
  { id: 1, name: 'Signature Espresso', price: 180, category: 'Coffee', emoji: '☕', available: true },
  { id: 2, name: 'Butter Croissant', price: 120, category: 'Snacks', emoji: '🥐', available: true },
  { id: 3, name: 'Cappuccino', price: 160, category: 'Coffee', emoji: '☕', available: true },
  { id: 4, name: 'Club Sandwich', price: 280, category: 'Meals', emoji: '🥪', available: false },
  { id: 5, name: 'Chocolate Cake', price: 200, category: 'Desserts', emoji: '🎂', available: true },
  { id: 6, name: 'Cold Brew', price: 220, category: 'Coffee', emoji: '🧋', available: true },
]

const INITIAL_STAFF = [
  { id: 1, username: 'chef_kumar', email: 'kumar@sipspot.com', role: 'CHEF', active: true, joined: '2025-01-15' },
  { id: 2, username: 'chef_priya', email: 'priya@sipspot.com', role: 'CHEF', active: true, joined: '2025-02-10' },
  { id: 3, username: 'waiter_raj', email: 'raj@sipspot.com', role: 'WAITER', active: true, joined: '2025-01-20' },
  { id: 4, username: 'waiter_anbu', email: 'anbu@sipspot.com', role: 'WAITER', active: false, joined: '2025-03-01' },
]

const ORDERS = [
  { id: 1, table: 'T-02', customer: 'priya_1234', items: ['Signature Espresso', 'Butter Croissant'], total: 300, status: 'Preparing', time: '10:30 AM', chef: 'chef_kumar' },
  { id: 2, table: 'T-06', customer: 'rahul_5678', items: ['Cappuccino', 'Club Sandwich', 'Chocolate Cake'], total: 640, status: 'Ready', time: '10:45 AM', chef: 'chef_priya' },
  { id: 3, table: 'T-03', customer: 'karthik_3456', items: ['Cold Brew'], total: 220, status: 'Placed', time: '11:00 AM', chef: null },
  { id: 4, table: 'T-01', customer: 'ananya_9012', items: ['Matcha Latte', 'Croissant'], total: 340, status: 'Served', time: '10:15 AM', chef: 'chef_kumar' },
]

const BOOKINGS = [
  { id: 1, customer: 'priya_1234', table: 'T-03', date: '2025-03-20', time: '11:00 AM', guests: 2, status: 'Confirmed' },
  { id: 2, customer: 'rahul_5678', table: 'T-06', date: '2025-03-20', time: '07:00 PM', guests: 6, status: 'Pending' },
  { id: 3, customer: 'karthik_3456', table: 'T-04', date: '2025-03-21', time: '01:00 PM', guests: 4, status: 'Confirmed' },
]

export default function OwnerDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [tables, setTables] = useState(INITIAL_TABLES)
  const [menu, setMenu] = useState(INITIAL_MENU)
  const [staff, setStaff] = useState(INITIAL_STAFF)
  const [orders, setOrders] = useState(ORDERS)

  // Modals
  const [addTableModal, setAddTableModal] = useState(false)
  const [addMenuModal, setAddMenuModal] = useState(false)
  const [addStaffModal, setAddStaffModal] = useState(false)
  const [editMenuItem, setEditMenuItem] = useState(null)

  // Forms
  const [tableForm, setTableForm] = useState({ number: '', capacity: 2 })
  const [menuForm, setMenuForm] = useState({ name: '', price: '', category: 'Coffee', emoji: '☕', available: true })
  const [staffForm, setStaffForm] = useState({ username: '', email: '', role: 'CHEF' })
  const [staffSuccess, setStaffSuccess] = useState(false)

  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'orders', icon: '🍽️', label: 'Orders' },
    { id: 'bookings', icon: '📅', label: 'Bookings' },
    { id: 'tables', icon: '🪑', label: 'Tables' },
    { id: 'menu', icon: '📋', label: 'Menu' },
    { id: 'staff', icon: '👨‍🍳', label: 'Staff' },
    { id: 'profile', icon: '👤', label: 'Café Profile' },
  ]

  const statusColor = (status) => {
    const map = {
      'Placed': { bg: 'rgba(148,163,184,0.1)', color: '#94a3b8', border: 'rgba(148,163,184,0.2)' },
      'Preparing': { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: 'rgba(251,191,36,0.2)' },
      'Ready': { bg: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: 'rgba(167,139,250,0.2)' },
      'Served': { bg: 'rgba(74,222,128,0.1)', color: '#4ade80', border: 'rgba(74,222,128,0.2)' },
      'Confirmed': { bg: 'rgba(74,222,128,0.1)', color: '#4ade80', border: 'rgba(74,222,128,0.2)' },
      'Pending': { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: 'rgba(251,191,36,0.2)' },
      'available': { bg: 'rgba(74,222,128,0.1)', color: '#4ade80', border: 'rgba(74,222,128,0.2)' },
      'occupied': { bg: 'rgba(248,113,113,0.1)', color: '#f87171', border: 'rgba(248,113,113,0.2)' },
      'reserved': { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: 'rgba(251,191,36,0.2)' },
    }
    return map[status] || map['Placed']
  }

  const updateOrderStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o))
  }

  const addTable = (e) => {
    e.preventDefault()
    setTables(prev => [...prev, { id: Date.now(), number: tableForm.number, capacity: Number(tableForm.capacity), status: 'available' }])
    setTableForm({ number: '', capacity: 2 })
    setAddTableModal(false)
  }

  const addMenuItem = (e) => {
    e.preventDefault()
    if (editMenuItem) {
      setMenu(prev => prev.map(m => m.id === editMenuItem.id ? { ...editMenuItem, ...menuForm, price: Number(menuForm.price) } : m))
      setEditMenuItem(null)
    } else {
      setMenu(prev => [...prev, { id: Date.now(), ...menuForm, price: Number(menuForm.price) }])
    }
    setMenuForm({ name: '', price: '', category: 'Coffee', emoji: '☕', available: true })
    setAddMenuModal(false)
  }

  const deleteMenuItem = (id) => setMenu(prev => prev.filter(m => m.id !== id))
  const toggleMenuAvailability = (id) => setMenu(prev => prev.map(m => m.id === id ? { ...m, available: !m.available } : m))

  const addStaff = (e) => {
    e.preventDefault()
    setStaffSuccess(true)
    setStaff(prev => [...prev, { id: Date.now(), ...staffForm, active: true, joined: new Date().toISOString().split('T')[0] }])
    setTimeout(() => { setStaffSuccess(false); setAddStaffModal(false); setStaffForm({ username: '', email: '', role: 'CHEF' }) }, 2500)
  }

  const toggleStaff = (id) => setStaff(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))

  const inputStyle = {
    width: '100%', padding: '0.8rem 1rem', borderRadius: '0.75rem',
    border: '1.5px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)', color: C.text,
    fontSize: '0.9rem', boxSizing: 'border-box',
    fontFamily: 'Inter, sans-serif', transition: 'all 0.2s'
  }

  const labelStyle = { display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: '500', color: C.muted }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.06} 50%{opacity:0.12} }
        .nav-item:hover { background: rgba(200,95,32,0.1) !important; color: #e07d3c !important; }
        .card-hover:hover { transform: translateY(-4px) !important; border-color: rgba(200,95,32,0.3) !important; }
        .row-hover:hover { background: rgba(200,95,32,0.04) !important; }
        .action-btn:hover { opacity: 0.85 !important; }
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
        top: 0, height: '100vh', zIndex: 50, flexShrink: 0, overflowY: 'auto'
      }}>
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: sidebarCollapsed ? 'center' : 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>☕</span>
            {!sidebarCollapsed && <span style={{ fontWeight: '800', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>SipSpot</span>}
          </div>
          {!sidebarCollapsed && <div onClick={() => setSidebarCollapsed(true)} style={{ cursor: 'pointer', color: C.muted }}>◀</div>}
        </div>
        {sidebarCollapsed && <div onClick={() => setSidebarCollapsed(false)} style={{ padding: '0.75rem', textAlign: 'center', cursor: 'pointer', color: C.muted, borderBottom: `1px solid ${C.border}` }}>▶</div>}

        {!sidebarCollapsed && (
          <div style={{ margin: '1rem 0.75rem 0', background: 'rgba(200,95,32,0.1)', border: '1px solid rgba(200,95,32,0.2)', borderRadius: '0.75rem', padding: '0.625rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🏪</span>
            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: C.primaryLight }}>Brew & Co</span>
          </div>
        )}

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

        <div style={{ padding: '1rem 0.75rem', borderTop: `1px solid ${C.border}` }}>
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(200,95,32,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>🏪</div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.username}</div>
                <div style={{ fontSize: '0.7rem', color: C.primaryLight }}>Café Owner</div>
              </div>
            </div>
          )}
          <div className="nav-item" onClick={() => { logout(); navigate('/') }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', cursor: 'pointer', color: '#f87171', transition: 'all 0.2s', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
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
              {navItems.find(n => n.id === activeSection)?.icon} {navItems.find(n => n.id === activeSection)?.label}
            </h1>
            <p style={{ color: C.muted, fontSize: '0.78rem' }}>Brew & Co · Chennai</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {activeSection === 'tables' && <button onClick={() => setAddTableModal(true)} style={{ padding: '0.6rem 1.25rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>+ Add Table</button>}
            {activeSection === 'menu' && <button onClick={() => { setEditMenuItem(null); setMenuForm({ name: '', price: '', category: 'Coffee', emoji: '☕', available: true }); setAddMenuModal(true) }} style={{ padding: '0.6rem 1.25rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>+ Add Item</button>}
            {activeSection === 'staff' && <button onClick={() => setAddStaffModal(true)} style={{ padding: '0.6rem 1.25rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>+ Add Staff</button>}
          </div>
        </div>

        <div style={{ padding: '2rem' }}>

          {/* ── DASHBOARD ──────────────────────────────────────────── */}
          {activeSection === 'dashboard' && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { icon: '🍽️', label: 'Total Orders', value: orders.length, color: C.gold },
                  { icon: '📅', label: 'Bookings Today', value: BOOKINGS.length, color: '#4ade80' },
                  { icon: '🪑', label: 'Available Tables', value: tables.filter(t => t.status === 'available').length, color: C.primaryLight },
                  { icon: '💰', label: "Today's Revenue", value: `₹${orders.reduce((s, o) => s + o.total, 0)}`, color: C.gold },
                  { icon: '👨‍🍳', label: 'Active Staff', value: staff.filter(s => s.active).length, color: '#a78bfa' },
                  { icon: '📋', label: 'Menu Items', value: menu.filter(m => m.available).length, color: C.primaryLight },
                ].map((s, i) => (
                  <div key={i} className="card-hover" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1rem', padding: '1.25rem', transition: 'all 0.3s' }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{s.icon}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: s.color, marginBottom: '0.2rem' }}>{s.value}</div>
                    <div style={{ fontSize: '0.75rem', color: C.muted }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Live orders + table status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
                {/* Live orders */}
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.5rem' }}>
                  <h3 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '1.25rem', color: C.primaryLight }}>Live Orders</h3>
                  {orders.filter(o => o.status !== 'Served').map((o, i) => {
                    const sc = statusColor(o.status)
                    return (
                      <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.75rem 0', borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '0.625rem', background: 'rgba(200,95,32,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', color: C.primaryLight, flexShrink: 0 }}>{o.table}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.15rem' }}>{o.customer}</div>
                          <div style={{ fontSize: '0.72rem', color: C.muted }}>{o.items.join(', ')}</div>
                        </div>
                        <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: '0.5rem', padding: '0.2rem 0.6rem', fontSize: '0.72rem', fontWeight: '600', whiteSpace: 'nowrap' }}>{o.status}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Table overview */}
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.5rem' }}>
                  <h3 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '1.25rem', color: C.primaryLight }}>Table Status</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.625rem' }}>
                    {tables.map(t => {
                      const sc = statusColor(t.status)
                      return (
                        <div key={t.id} style={{ background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: sc.color }}>{t.number}</div>
                          <div style={{ fontSize: '0.7rem', color: sc.color, opacity: 0.8 }}>{t.capacity}p</div>
                        </div>
                      )
                    })}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    {[['available', '●'], ['occupied', '●'], ['reserved', '●']].map(([s, dot]) => {
                      const sc = statusColor(s)
                      return <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: sc.color }}><span>{dot}</span>{s}</div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ORDERS ─────────────────────────────────────────────── */}
          {activeSection === 'orders' && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              {/* Filter tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {['All', 'Placed', 'Preparing', 'Ready', 'Served'].map(s => (
                  <button key={s} style={{ padding: '0.4rem 1rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', color: C.muted, fontSize: '0.82rem', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.target.style.background = 'rgba(200,95,32,0.15)'; e.target.style.color = C.primaryLight }}
                    onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = C.muted }}
                  >{s}</button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map(o => {
                  const sc = statusColor(o.status)
                  const nextStatus = { 'Placed': 'Preparing', 'Preparing': 'Ready', 'Ready': 'Served' }
                  return (
                    <div key={o.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ width: '44px', height: '44px', borderRadius: '0.75rem', background: 'rgba(200,95,32,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '800', color: C.primaryLight }}>#{o.id}</div>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Table {o.table} · {o.customer}</div>
                            <div style={{ color: C.muted, fontSize: '0.78rem' }}>🕐 {o.time} {o.chef ? `· 👨‍🍳 ${o.chef}` : ''}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.78rem', fontWeight: '600' }}>{o.status}</span>
                          <span style={{ color: C.gold, fontWeight: '800', fontSize: '1rem' }}>₹{o.total}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: o.status !== 'Served' ? '1rem' : 0 }}>
                        {o.items.map((item, i) => (
                          <span key={i} style={{ background: 'rgba(255,255,255,0.05)', color: C.muted, borderRadius: '0.5rem', padding: '0.2rem 0.6rem', fontSize: '0.78rem' }}>🍽️ {item}</span>
                        ))}
                      </div>
                      {nextStatus[o.status] && (
                        <button onClick={() => updateOrderStatus(o.id, nextStatus[o.status])} style={{ padding: '0.5rem 1.25rem', borderRadius: '0.625rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}>
                          Mark as {nextStatus[o.status]} →
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── BOOKINGS ───────────────────────────────────────────── */}
          {activeSection === 'bookings' && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '750px' }}>
                {BOOKINGS.map(b => {
                  const sc = statusColor(b.status)
                  return (
                    <div key={b.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>👤 {b.customer}</div>
                          <div style={{ color: C.muted, fontSize: '0.82rem' }}>📅 {b.date} · 🕐 {b.time}</div>
                        </div>
                        <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.78rem', fontWeight: '600' }}>{b.status}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '1.5rem', color: C.muted, fontSize: '0.82rem' }}>
                        <span>🪑 {b.table}</span>
                        <span>👥 {b.guests} guests</span>
                      </div>
                      {b.status === 'Pending' && (
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                          <button style={{ padding: '0.45rem 1rem', borderRadius: '0.625rem', background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.25)', color: '#4ade80', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}>✓ Confirm</button>
                          <button style={{ padding: '0.45rem 1rem', borderRadius: '0.625rem', background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.25)', color: '#f87171', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}>✗ Decline</button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── TABLES ─────────────────────────────────────────────── */}
          {activeSection === 'tables' && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
                {tables.map(t => {
                  const sc = statusColor(t.status)
                  return (
                    <div key={t.id} className="card-hover" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.5rem', textAlign: 'center', transition: 'all 0.3s' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🪑</div>
                      <div style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{t.number}</div>
                      <div style={{ color: C.muted, fontSize: '0.78rem', marginBottom: '0.875rem' }}>👥 {t.capacity} seats</div>
                      <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: '0.5rem', padding: '0.2rem 0.75rem', fontSize: '0.72rem', fontWeight: '600' }}>{t.status}</span>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        {['available', 'occupied', 'reserved'].map(s => (
                          <button key={s} onClick={() => setTables(prev => prev.map(tb => tb.id === t.id ? { ...tb, status: s } : tb))} style={{ flex: 1, padding: '0.3rem', borderRadius: '0.4rem', border: 'none', background: t.status === s ? statusColor(s).bg : 'rgba(255,255,255,0.04)', color: t.status === s ? statusColor(s).color : C.muted, fontSize: '0.62rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                            {s.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── MENU ───────────────────────────────────────────────── */}
          {activeSection === 'menu' && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                {menu.map(item => (
                  <div key={item.id} style={{ background: C.card, border: `1px solid ${item.available ? C.border : 'rgba(248,113,113,0.15)'}`, borderRadius: '1.25rem', padding: '1.25rem', opacity: item.available ? 1 : 0.6, transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', marginBottom: '1rem' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '0.75rem', background: 'rgba(200,95,32,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>{item.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{item.name}</div>
                        <div style={{ color: C.muted, fontSize: '0.75rem', marginBottom: '0.3rem' }}>{item.category}</div>
                        <div style={{ color: C.gold, fontWeight: '800', fontSize: '1rem' }}>₹{item.price}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => toggleMenuAvailability(item.id)} style={{ flex: 1, padding: '0.45rem', borderRadius: '0.5rem', background: item.available ? 'rgba(248,113,113,0.1)' : 'rgba(74,222,128,0.1)', border: `1px solid ${item.available ? 'rgba(248,113,113,0.2)' : 'rgba(74,222,128,0.2)'}`, color: item.available ? '#f87171' : '#4ade80', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                        {item.available ? 'Disable' : 'Enable'}
                      </button>
                      <button onClick={() => { setEditMenuItem(item); setMenuForm({ name: item.name, price: item.price, category: item.category, emoji: item.emoji, available: item.available }); setAddMenuModal(true) }} style={{ flex: 1, padding: '0.45rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.muted, fontSize: '0.75rem', cursor: 'pointer' }}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => deleteMenuItem(item.id)} style={{ padding: '0.45rem 0.75rem', borderRadius: '0.5rem', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)', color: '#f87171', fontSize: '0.75rem', cursor: 'pointer' }}>
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STAFF ──────────────────────────────────────────────── */}
          {activeSection === 'staff' && (
            <div style={{ animation: 'fadeUp 0.5s ease', maxWidth: '750px' }}>
              {/* Chef section */}
              {['CHEF', 'WAITER'].map(role => (
                <div key={role} style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '1rem', color: C.primaryLight }}>
                    {role === 'CHEF' ? '👨‍🍳' : '🍽️'} {role === 'CHEF' ? 'Chefs' : 'Waiters'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {staff.filter(s => s.role === role).map(s => (
                      <div key={s.id} className="row-hover" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(200,95,32,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                          {role === 'CHEF' ? '👨‍🍳' : '🍽️'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{s.username}</div>
                          <div style={{ color: C.muted, fontSize: '0.78rem' }}>{s.email} · Joined {s.joined}</div>
                        </div>
                        <span style={{ background: s.active ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)', color: s.active ? '#4ade80' : '#f87171', border: `1px solid ${s.active ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`, borderRadius: '0.5rem', padding: '0.2rem 0.6rem', fontSize: '0.72rem', fontWeight: '600' }}>
                          {s.active ? 'Active' : 'Inactive'}
                        </span>
                        <button onClick={() => toggleStaff(s.id)} style={{ padding: '0.4rem 0.875rem', borderRadius: '0.5rem', background: s.active ? 'rgba(248,113,113,0.1)' : 'rgba(74,222,128,0.1)', border: `1px solid ${s.active ? 'rgba(248,113,113,0.2)' : 'rgba(74,222,128,0.2)'}`, color: s.active ? '#f87171' : '#4ade80', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                          {s.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── CAFE PROFILE ───────────────────────────────────────── */}
          {activeSection === 'profile' && (
            <div style={{ animation: 'fadeUp 0.5s ease', maxWidth: '600px' }}>
              <div style={{ background: `linear-gradient(135deg, rgba(200,95,32,0.12), rgba(212,168,67,0.06))`, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏪</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.3rem' }}>Brew & Co</h2>
                <p style={{ color: C.muted, fontSize: '0.875rem', marginBottom: '1rem' }}>Anna Nagar, Chennai</p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '2rem', padding: '0.25rem 0.875rem', fontSize: '0.78rem', fontWeight: '600' }}>● Open</span>
                  <span style={{ background: 'rgba(200,95,32,0.12)', color: C.primaryLight, border: '1px solid rgba(200,95,32,0.2)', borderRadius: '2rem', padding: '0.25rem 0.875rem', fontSize: '0.78rem', fontWeight: '600' }}>★ 4.8 Rating</span>
                </div>
              </div>

              {[
                { title: 'Café Details', items: [['Café Name', 'Brew & Co'], ['Cuisine', 'Coffee & Snacks'], ['Location', 'Anna Nagar, Chennai'], ['Tables', tables.length], ['Opening Hours', '8:00 AM – 10:00 PM']] },
                { title: 'Owner Details', items: [['Username', user?.username], ['Role', 'Café Owner'], ['Staff Count', staff.length]] },
              ].map((section, si) => (
                <div key={si} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1rem', padding: '1.5rem', marginBottom: '1rem' }}>
                  <h3 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '1rem', color: C.primaryLight }}>{section.title}</h3>
                  {section.items.map(([key, val], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: i < section.items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ color: C.muted, fontSize: '0.875rem' }}>{key}</span>
                      <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{val}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── ADD TABLE MODAL ────────────────────────────────────────── */}
      {addTableModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setAddTableModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }} />
          <div style={{ position: 'relative', background: '#1f0f08', border: `1px solid ${C.border}`, borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: '400px' }}>
            <button onClick={() => setAddTableModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, color: C.text, width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>×</button>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🪑</div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Add New Table</h2>
            </div>
            <form onSubmit={addTable}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Table Number</label>
                <input className="input-f" required style={inputStyle} placeholder="e.g. T-07" value={tableForm.number} onChange={e => setTableForm({ ...tableForm, number: e.target.value })} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Seating Capacity</label>
                <select className="input-f" style={{ ...inputStyle, background: '#1a0f0a' }} value={tableForm.capacity} onChange={e => setTableForm({ ...tableForm, capacity: e.target.value })}>
                  {[2, 4, 6, 8, 10].map(n => <option key={n} value={n}>{n} seats</option>)}
                </select>
              </div>
              <button type="submit" style={{ width: '100%', padding: '0.9rem', borderRadius: '0.875rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Add Table →</button>
            </form>
          </div>
        </div>
      )}

      {/* ── ADD MENU MODAL ─────────────────────────────────────────── */}
      {addMenuModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setAddMenuModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }} />
          <div style={{ position: 'relative', background: '#1f0f08', border: `1px solid ${C.border}`, borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: '420px' }}>
            <button onClick={() => setAddMenuModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, color: C.text, width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>×</button>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>{editMenuItem ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
            </div>
            <form onSubmit={addMenuItem}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Item Name</label>
                  <input className="input-f" required style={inputStyle} placeholder="Espresso" value={menuForm.name} onChange={e => setMenuForm({ ...menuForm, name: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Price (₹)</label>
                  <input className="input-f" type="number" required style={inputStyle} placeholder="180" value={menuForm.price} onChange={e => setMenuForm({ ...menuForm, price: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select className="input-f" style={{ ...inputStyle, background: '#1a0f0a' }} value={menuForm.category} onChange={e => setMenuForm({ ...menuForm, category: e.target.value })}>
                    {['Coffee', 'Snacks', 'Meals', 'Desserts', 'Drinks'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Emoji</label>
                  <input className="input-f" style={inputStyle} placeholder="☕" value={menuForm.emoji} onChange={e => setMenuForm({ ...menuForm, emoji: e.target.value })} />
                </div>
              </div>
              <button type="submit" style={{ width: '100%', padding: '0.9rem', borderRadius: '0.875rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>
                {editMenuItem ? 'Save Changes →' : 'Add Item →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── ADD STAFF MODAL ────────────────────────────────────────── */}
      {addStaffModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setAddStaffModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }} />
          <div style={{ position: 'relative', background: '#1f0f08', border: `1px solid ${C.border}`, borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: '420px' }}>
            <button onClick={() => setAddStaffModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, color: C.text, width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>×</button>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👨‍🍳</div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Add Staff Member</h2>
              <p style={{ color: C.muted, fontSize: '0.82rem', marginTop: '0.3rem' }}>Credentials sent via email</p>
            </div>
            {staffSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <div style={{ color: '#4ade80', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Staff Added!</div>
                <p style={{ color: C.muted, fontSize: '0.85rem' }}>Credentials sent to their email.</p>
              </div>
            ) : (
              <form onSubmit={addStaff}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Username</label>
                  <input className="input-f" required style={inputStyle} placeholder="chef_name" value={staffForm.username} onChange={e => setStaffForm({ ...staffForm, username: e.target.value })} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Email</label>
                  <input className="input-f" type="email" required style={inputStyle} placeholder="staff@sipspot.com" value={staffForm.email} onChange={e => setStaffForm({ ...staffForm, email: e.target.value })} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Role</label>
                  <select className="input-f" style={{ ...inputStyle, background: '#1a0f0a' }} value={staffForm.role} onChange={e => setStaffForm({ ...staffForm, role: e.target.value })}>
                    <option value="CHEF">👨‍🍳 Chef</option>
                    <option value="WAITER">🍽️ Waiter</option>
                  </select>
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.9rem', borderRadius: '0.875rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>
                  Create Staff Account →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}