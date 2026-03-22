import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

const C = {
  bg: '#1a0f0a',
  primary: '#c85f20',
  primaryLight: '#e07d3c',
  gold: '#d4a843',
  text: '#fdf6f0',
  muted: 'rgba(253,246,240,0.5)',
  border: 'rgba(255,255,255,0.08)',
  input: 'rgba(255,255,255,0.04)',
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form)
      const data = res.data
      login(data)
      if (data.firstLogin) {
        navigate('/reset-password', { state: { username: data.username } })
        return
      }
      navigate(data.redirectTo)
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid username or password!')
    } finally {
      setLoading(false)
    }
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
        .input-field:focus { border-color: #c85f20 !important; background: rgba(200,95,32,0.06) !important; outline: none; }
        .login-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 35px rgba(200,95,32,0.5) !important; }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: '#c85f20', filter: 'blur(120px)', top: '-150px', left: '-150px', animation: 'pulse 7s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: '#d4a843', filter: 'blur(120px)', bottom: '-100px', right: '-100px', animation: 'pulse 9s ease-in-out infinite 2s', pointerEvents: 'none' }} />

      {/* Back link */}
      <div onClick={() => navigate('/')} style={{ position: 'absolute', top: '1.5rem', left: '2rem', color: C.muted, cursor: 'pointer', fontSize: '0.875rem', transition: 'color 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.color = C.primaryLight}
        onMouseLeave={e => e.currentTarget.style.color = C.muted}
      >← Back to home</div>

      {/* Card */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.5rem', padding: '2.5rem', width: '100%', maxWidth: '420px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)', animation: 'fadeUp 0.7s ease',
        position: 'relative'
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>☕</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.3rem' }}>Welcome back</h1>
          <p style={{ color: C.muted, fontSize: '0.875rem' }}>Sign in to your SipSpot account</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)',
            borderRadius: '0.75rem', padding: '0.75rem 1rem',
            marginBottom: '1.25rem', color: '#f87171', fontSize: '0.875rem'
          }}>{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: C.text }}>
              Username
            </label>
            <input
              className="input-field"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              style={{
                width: '100%', padding: '0.8rem 1rem', borderRadius: '0.75rem',
                border: '1.5px solid rgba(255,255,255,0.08)',
                background: C.input, color: C.text, fontSize: '0.95rem',
                boxSizing: 'border-box', transition: 'all 0.2s'
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: C.text }}>
              Password
            </label>
            <input
              className="input-field"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={{
                width: '100%', padding: '0.8rem 1rem', borderRadius: '0.75rem',
                border: '1.5px solid rgba(255,255,255,0.08)',
                background: C.input, color: C.text, fontSize: '0.95rem',
                boxSizing: 'border-box', transition: 'all 0.2s'
              }}
            />
          </div>

          {/* Submit */}
          <button
            className="login-btn"
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '0.9rem',
              borderRadius: '0.75rem', border: 'none',
              background: loading ? 'rgba(200,95,32,0.5)' : 'linear-gradient(135deg, #c85f20, #e07d3c)',
              color: '#fff', fontSize: '1rem', fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 25px rgba(200,95,32,0.35)',
              transition: 'all 0.3s ease', marginBottom: '1.25rem'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>

          {/* Register link */}
          <p style={{ textAlign: 'center', color: C.muted, fontSize: '0.875rem' }}>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              style={{ color: C.primaryLight, fontWeight: '600', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >Register here</span>
          </p>
        </form>
      </div>
    </div>
  )
}