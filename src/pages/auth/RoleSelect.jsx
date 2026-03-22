import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const C = {
  bg: '#1a0f0a',
  card: 'rgba(255,255,255,0.04)',
  cardHover: 'rgba(200,95,32,0.08)',
  primary: '#c85f20',
  primaryLight: '#e07d3c',
  gold: '#d4a843',
  text: '#fdf6f0',
  muted: 'rgba(253,246,240,0.5)',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(200,95,32,0.4)',
}

export default function RoleSelect() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  const roles = [
    {
      id: 'CUSTOMER',
      icon: '☕',
      title: 'I am a Customer',
      subtitle: 'I want to book tables and order food',
      perks: [
        '📅 Book tables at any café',
        '🍽️ Pre-order food online',
        '💳 Pay securely before arriving',
        '⚡ Track your order live',
      ]
    },
    {
      id: 'CAFE_OWNER',
      icon: '🏪',
      title: 'I am a Café Owner',
      subtitle: 'I want to manage my café on SipSpot',
      perks: [
        '🧑‍🍳 Manage your café staff',
        '📋 Add and edit your menu',
        '🪑 Manage tables and bookings',
        '📊 View all orders and payments',
      ]
    }
  ]

  const handleContinue = () => {
    if (!selected) return
    navigate('/register/steps', { state: { userType: selected } })
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: C.bg,
      color: C.text,
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.08} 50%{opacity:0.15} }
        .role-card { transition: all 0.3s ease !important; }
        .role-card:hover { transform: translateY(-6px) !important; }
        .continue-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 35px rgba(200,95,32,0.5) !important; }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: '#c85f20', filter: 'blur(120px)', top: '-150px', left: '-150px', animation: 'pulse 7s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: '#d4a843', filter: 'blur(120px)', bottom: '-100px', right: '-100px', animation: 'pulse 9s ease-in-out infinite 2s', pointerEvents: 'none' }} />

      {/* Back to home */}
      <div
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: '1.5rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: C.muted, cursor: 'pointer', fontSize: '0.875rem', transition: 'color 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.color = C.primaryLight}
        onMouseLeave={e => e.currentTarget.style.color = C.muted}
      >
        ← Back to home
      </div>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem', animation: 'fadeUp 0.6s ease' }}>
        <span style={{ fontSize: '2rem' }}>☕</span>
        <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>SipSpot</span>
      </div>

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', animation: 'fadeUp 0.7s ease' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '800', marginBottom: '0.75rem', lineHeight: '1.2' }}>
          Who are you joining as?
        </h1>
        <p style={{ color: C.muted, fontSize: '1rem', maxWidth: '400px', lineHeight: '1.7' }}>
          Choose your role to get started. You can always explore the other side later.
        </p>
      </div>

      {/* Role Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '680px',
        marginBottom: '2.5rem',
        animation: 'fadeUp 0.8s ease'
      }}>
        {roles.map((role) => {
          const isSelected = selected === role.id
          const isHovered = hoveredCard === role.id
          return (
            <div
              key={role.id}
              className="role-card"
              onClick={() => setSelected(role.id)}
              onMouseEnter={() => setHoveredCard(role.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: isSelected ? 'rgba(200,95,32,0.12)' : isHovered ? C.cardHover : C.card,
                border: `2px solid ${isSelected ? C.primary : isHovered ? C.borderHover : C.border}`,
                borderRadius: '1.5rem',
                padding: '2rem',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: isSelected ? '0 0 0 1px rgba(200,95,32,0.3), 0 20px 40px rgba(200,95,32,0.15)' : 'none',
              }}
            >
              {/* Selected checkmark */}
              {isSelected && (
                <div style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: C.primary, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700'
                }}>✓</div>
              )}

              {/* Icon */}
              <div style={{
                width: '64px', height: '64px', borderRadius: '1rem',
                background: isSelected ? 'rgba(200,95,32,0.2)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${isSelected ? 'rgba(200,95,32,0.4)' : 'rgba(255,255,255,0.1)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', marginBottom: '1.25rem',
                transition: 'all 0.3s'
              }}>{role.icon}</div>

              {/* Title */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.4rem', color: C.text }}>{role.title}</h3>
              <p style={{ color: C.muted, fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{role.subtitle}</p>

              {/* Perks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {role.perks.map((perk, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    fontSize: '0.85rem', color: isSelected ? C.text : C.muted,
                    transition: 'color 0.3s'
                  }}>{perk}</div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Continue Button */}
      <div style={{ animation: 'fadeUp 0.9s ease', width: '100%', maxWidth: '680px' }}>
        <button
          className="continue-btn"
          onClick={handleContinue}
          disabled={!selected}
          style={{
            width: '100%', padding: '1rem',
            borderRadius: '0.875rem', border: 'none',
            background: selected ? 'linear-gradient(135deg, #c85f20, #e07d3c)' : 'rgba(255,255,255,0.06)',
            color: selected ? '#fff' : C.muted,
            fontSize: '1.05rem', fontWeight: '700',
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected ? '0 8px 30px rgba(200,95,32,0.35)' : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          {selected
            ? `Continue as ${selected === 'CUSTOMER' ? 'Customer' : 'Café Owner'} →`
            : 'Select a role to continue'
          }
        </button>

        {/* Login link */}
        <p style={{ textAlign: 'center', marginTop: '1.25rem', color: C.muted, fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: C.primaryLight, fontWeight: '600', cursor: 'pointer' }}
            onMouseEnter={e => e.target.style.textDecoration = 'underline'}
            onMouseLeave={e => e.target.style.textDecoration = 'none'}
          >Sign in here</span>
        </p>
      </div>
    </div>
  )
}