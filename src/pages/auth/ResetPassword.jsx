import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const C = {
  bg: '#1a0f0a',
  primary: '#c85f20',
  primaryLight: '#e07d3c',
  text: '#fdf6f0',
  muted: 'rgba(253,246,240,0.5)',
  border: 'rgba(255,255,255,0.08)',
  input: 'rgba(255,255,255,0.04)',
}

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({
    username: location.state?.username || '',
    temporaryPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match!')
      return
    }
    if (form.newPassword.length < 8) {
      setError('Password must be at least 8 characters!')
      return
    }
    setLoading(true)
    try {
      await axios.post('https://sipspot-backend.onrender.com/api/auth/reset-password', form)
      setSuccess('Password reset successful! Redirecting to login...')
      setTimeout(() => navigate('/login'), 2500)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '0.8rem 1rem', borderRadius: '0.75rem',
    border: '1.5px solid rgba(255,255,255,0.08)',
    background: C.input, color: C.text, fontSize: '0.9rem',
    boxSizing: 'border-box', transition: 'all 0.2s',
    fontFamily: 'Inter, sans-serif'
  }

  const labelStyle = {
    display: 'block', marginBottom: '0.4rem',
    fontSize: '0.82rem', fontWeight: '500', color: C.muted
  }

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: C.bg, color: C.text,
      fontFamily: 'Inter, sans-serif', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', position: 'relative', overflow: 'hidden'
    }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.08} 50%{opacity:0.15} }
        .reset-input:focus { border-color: #c85f20 !important; background: rgba(200,95,32,0.06) !important; outline: none; }
        .reset-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 35px rgba(200,95,32,0.5) !important; }
      `}</style>

      {/* Orbs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: '#c85f20', filter: 'blur(120px)', top: '-150px', left: '-150px', animation: 'pulse 7s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: '#d4a843', filter: 'blur(120px)', bottom: '-100px', right: '-100px', animation: 'pulse 9s ease-in-out infinite 2s', pointerEvents: 'none' }} />

      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.5rem', padding: '2.5rem', width: '100%', maxWidth: '440px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)', animation: 'fadeUp 0.7s ease'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔐</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.3rem' }}>Reset Password</h1>
          <p style={{ color: C.muted, fontSize: '0.875rem' }}>
            Use the temporary password sent to your email
          </p>
        </div>

        {/* Info box */}
        <div style={{
          background: 'rgba(200,95,32,0.06)', border: '1px solid rgba(200,95,32,0.15)',
          borderRadius: '0.75rem', padding: '0.875rem 1rem', marginBottom: '1.5rem',
          display: 'flex', gap: '0.75rem', alignItems: 'flex-start'
        }}>
          <span>💡</span>
          <p style={{ color: C.muted, fontSize: '0.8rem', lineHeight: '1.6' }}>
            Check your email for the temporary password we sent you. Use it below to set your new password.
          </p>
        </div>

        {/* Error / Success */}
        {error && (
          <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#f87171', fontSize: '0.875rem' }}>
            ❌ {error}
          </div>
        )}
        {success && (
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#4ade80', fontSize: '0.875rem' }}>
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: '1.1rem' }}>
            <label style={labelStyle}>Username</label>
            <input className="reset-input" name="username" required style={inputStyle}
              placeholder="Your username" value={form.username} onChange={handleChange} />
          </div>

          {/* Temp password */}
          <div style={{ marginBottom: '1.1rem' }}>
            <label style={labelStyle}>Temporary Password</label>
            <input className="reset-input" name="temporaryPassword" type={showPasswords ? 'text' : 'password'}
              required style={inputStyle} placeholder="From your email"
              value={form.temporaryPassword} onChange={handleChange} />
          </div>

          {/* New password */}
          <div style={{ marginBottom: '1.1rem' }}>
            <label style={labelStyle}>New Password</label>
            <input className="reset-input" name="newPassword" type={showPasswords ? 'text' : 'password'}
              required style={inputStyle} placeholder="Min 8 characters"
              value={form.newPassword} onChange={handleChange} />
          </div>

          {/* Confirm password */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Confirm New Password</label>
            <input className="reset-input" name="confirmPassword" type={showPasswords ? 'text' : 'password'}
              required style={inputStyle} placeholder="Repeat new password"
              value={form.confirmPassword} onChange={handleChange} />
          </div>

          {/* Show passwords toggle */}
          <div onClick={() => setShowPasswords(!showPasswords)} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            cursor: 'pointer', marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '16px', height: '16px', borderRadius: '4px',
              background: showPasswords ? C.primary : 'transparent',
              border: `2px solid ${showPasswords ? C.primary : 'rgba(255,255,255,0.2)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.65rem', color: '#fff'
            }}>{showPasswords ? '✓' : ''}</div>
            <span style={{ fontSize: '0.82rem', color: C.muted }}>Show passwords</span>
          </div>

          <button className="reset-btn" type="submit" disabled={loading} style={{
            width: '100%', padding: '0.9rem', borderRadius: '0.75rem', border: 'none',
            background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff',
            fontSize: '1rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 25px rgba(200,95,32,0.35)', transition: 'all 0.3s',
            marginBottom: '1.25rem'
          }}>
            {loading ? 'Resetting...' : 'Reset Password →'}
          </button>

          <p style={{ textAlign: 'center', color: C.muted, fontSize: '0.875rem' }}>
            Remember your password?{' '}
            <span onClick={() => navigate('/login')} style={{ color: C.primaryLight, fontWeight: '600', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >Sign in</span>
          </p>
        </form>
      </div>
    </div>
  )
}
