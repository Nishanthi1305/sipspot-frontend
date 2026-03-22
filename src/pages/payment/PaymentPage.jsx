import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const C = {
  bg: '#1a0f0a',
  card: 'rgba(255,255,255,0.04)',
  primary: '#c85f20',
  primaryLight: '#e07d3c',
  gold: '#d4a843',
  text: '#fdf6f0',
  muted: 'rgba(253,246,240,0.5)',
  border: 'rgba(255,255,255,0.08)',
  input: 'rgba(255,255,255,0.04)',
}

export default function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const { amount, type, items } = location.state || {}

  const [step, setStep] = useState('form')
  const [method, setMethod] = useState('card')
  const [cardForm, setCardForm] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [upiId, setUpiId] = useState('')
  const [error, setError] = useState('')
  const [paymentId, setPaymentId] = useState('')
  const [progress, setProgress] = useState(0)

  const taxes = Math.round((amount || 0) * 0.05)
  const total = (amount || 0) + taxes

  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 4)
    if (clean.length >= 2) return clean.slice(0, 2) + '/' + clean.slice(2)
    return clean
  }

  const validateCard = () => {
    const num = cardForm.number.replace(/\s/g, '')
    if (num.length < 16) return 'Invalid card number'
    if (!cardForm.name) return 'Enter cardholder name'
    if (cardForm.expiry.length < 5) return 'Invalid expiry date'
    if (cardForm.cvv.length < 3) return 'Invalid CVV'
    return null
  }

  // ── Handle Pay — pure frontend simulation ───────────────────────
  const handlePay = async () => {
    if (method === 'card') {
      const err = validateCard()
      if (err) { setError(err); return }
    }
    if (method === 'upi' && !upiId.includes('@')) {
      setError('Enter a valid UPI ID (e.g. name@upi)')
      return
    }

    setError('')
    setStep('processing')
    setProgress(0)

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 10
      })
    }, 200)

    // Simulate 2.5 second processing
    await new Promise(resolve => setTimeout(resolve, 2500))
    clearInterval(interval)
    setProgress(100)

    // Generate mock payment ID
    const mockPaymentId = 'PAY_' + Math.random().toString(36).substr(2, 12).toUpperCase()
    setPaymentId(mockPaymentId)
    setStep('success')
  }

  const inputStyle = {
    width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem',
    border: '1.5px solid rgba(255,255,255,0.08)',
    background: C.input, color: C.text, fontSize: '0.95rem',
    boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s'
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
        @keyframes pulse { 0%,100%{opacity:0.07} 50%{opacity:0.14} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes successPop { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }
        .input-f:focus { border-color: #c85f20 !important; outline: none; background: rgba(200,95,32,0.06) !important; }
        .pay-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 15px 40px rgba(200,95,32,0.5) !important; }
        .method-card:hover { border-color: rgba(200,95,32,0.3) !important; background: rgba(200,95,32,0.06) !important; }
        .bank-btn:hover { background: rgba(200,95,32,0.08) !important; border-color: rgba(200,95,32,0.3) !important; }
      `}</style>

      {/* Orbs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: '#c85f20', filter: 'blur(120px)', top: '-150px', left: '-150px', animation: 'pulse 7s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: '#d4a843', filter: 'blur(120px)', bottom: '-100px', right: '-100px', animation: 'pulse 9s ease-in-out infinite 2s', pointerEvents: 'none' }} />

      {/* Back */}
      {step === 'form' && (
        <div onClick={() => navigate(-1)} style={{ position: 'absolute', top: '1.5rem', left: '2rem', color: C.muted, cursor: 'pointer', fontSize: '0.875rem', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = C.primaryLight}
          onMouseLeave={e => e.currentTarget.style.color = C.muted}
        >← Back</div>
      )}

      <div style={{
        width: '100%', maxWidth: step === 'form' ? '920px' : '600px',
        display: 'grid', gridTemplateColumns: step === 'form' ? '1fr 1fr' : '1fr',
        gap: '1.5rem', animation: 'fadeUp 0.7s ease'
      }}>

        {/* ── PAYMENT FORM ─────────────────────────────────────────── */}
        {step === 'form' && (
          <>
            {/* Left: Form */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.5rem', padding: '2rem' }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <span style={{ fontSize: '1.8rem' }}>☕</span>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '1.2rem' }}>SipSpot Pay</div>
                  <div style={{ color: C.muted, fontSize: '0.78rem' }}>Secure Payment Gateway</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} />
                  <span style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: '600' }}>Secure</span>
                </div>
              </div>

              {/* Method tabs */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {[
                  { id: 'card', icon: '💳', label: 'Card' },
                  { id: 'upi', icon: '📱', label: 'UPI' },
                  { id: 'netbanking', icon: '🏦', label: 'Net Banking' },
                ].map(m => (
                  <div key={m.id} className="method-card" onClick={() => { setMethod(m.id); setError('') }} style={{
                    flex: 1, padding: '0.875rem', borderRadius: '0.875rem',
                    textAlign: 'center', cursor: 'pointer',
                    background: method === m.id ? 'rgba(200,95,32,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `2px solid ${method === m.id ? C.primary : 'rgba(255,255,255,0.07)'}`,
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{m.icon}</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: method === m.id ? '700' : '400', color: method === m.id ? C.primaryLight : C.muted }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Error */}
              {error && (
                <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#f87171', fontSize: '0.875rem' }}>
                  ❌ {error}
                </div>
              )}

              {/* Card Form */}
              {method === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: C.muted, fontWeight: '500' }}>Card Number</label>
                    <input className="input-f" style={inputStyle} placeholder="4111 1111 1111 1111"
                      value={cardForm.number} onChange={e => setCardForm({ ...cardForm, number: formatCard(e.target.value) })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: C.muted, fontWeight: '500' }}>Cardholder Name</label>
                    <input className="input-f" style={inputStyle} placeholder="John Doe"
                      value={cardForm.name} onChange={e => setCardForm({ ...cardForm, name: e.target.value })} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: C.muted, fontWeight: '500' }}>Expiry Date</label>
                      <input className="input-f" style={inputStyle} placeholder="MM/YY"
                        value={cardForm.expiry} onChange={e => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: C.muted, fontWeight: '500' }}>CVV</label>
                      <input className="input-f" style={inputStyle} placeholder="•••" type="password" maxLength={3}
                        value={cardForm.cvv} onChange={e => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })} />
                    </div>
                  </div>

                  {/* Test hint */}
                  <div style={{ background: 'rgba(200,95,32,0.06)', border: '1px solid rgba(200,95,32,0.15)', borderRadius: '0.75rem', padding: '0.875rem', display: 'flex', gap: '0.75rem' }}>
                    <span>💡</span>
                    <div style={{ fontSize: '0.78rem', color: C.muted, lineHeight: '1.6' }}>
                      <strong style={{ color: C.primaryLight }}>Test Card:</strong> 4111 1111 1111 1111 · Expiry: 12/26 · CVV: 123
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Form */}
              {method === 'upi' && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: C.muted, fontWeight: '500' }}>UPI ID</label>
                  <input className="input-f" style={inputStyle} placeholder="yourname@upi"
                    value={upiId} onChange={e => setUpiId(e.target.value)} />
                  <div style={{ marginTop: '1rem', background: 'rgba(200,95,32,0.06)', border: '1px solid rgba(200,95,32,0.15)', borderRadius: '0.75rem', padding: '0.875rem', display: 'flex', gap: '0.75rem' }}>
                    <span>💡</span>
                    <div style={{ fontSize: '0.78rem', color: C.muted }}>
                      <strong style={{ color: C.primaryLight }}>Test UPI:</strong> test@upi
                    </div>
                  </div>
                  <div style={{ marginTop: '1.25rem' }}>
                    <div style={{ fontSize: '0.78rem', color: C.muted, marginBottom: '0.75rem' }}>Or pay using</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      {['📱 GPay', '📲 PhonePe', '💰 Paytm', '🏦 BHIM'].map(app => (
                        <div key={app} className="bank-btn" style={{ padding: '0.625rem', borderRadius: '0.625rem', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, textAlign: 'center', cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.2s' }}>{app}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {method === 'netbanking' && (
                <div>
                  <div style={{ fontSize: '0.8rem', color: C.muted, marginBottom: '0.75rem', fontWeight: '500' }}>Select your bank</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {['🏦 SBI', '🏦 HDFC', '🏦 ICICI', '🏦 Axis', '🏦 Kotak', '🏦 PNB'].map(bank => (
                      <div key={bank} className="bank-btn" style={{ padding: '0.875rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, textAlign: 'center', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.2s' }}>{bank}</div>
                    ))}
                  </div>
                  <div style={{ marginTop: '1rem', background: 'rgba(200,95,32,0.06)', border: '1px solid rgba(200,95,32,0.15)', borderRadius: '0.75rem', padding: '0.875rem', display: 'flex', gap: '0.75rem' }}>
                    <span>💡</span>
                    <div style={{ fontSize: '0.78rem', color: C.muted }}>Select any bank for demo — no real transaction occurs.</div>
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button className="pay-btn" onClick={handlePay} style={{
                width: '100%', padding: '1rem', borderRadius: '0.875rem', border: 'none',
                background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff',
                fontSize: '1.05rem', fontWeight: '700', cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(200,95,32,0.35)', transition: 'all 0.3s',
                marginTop: '1.5rem'
              }}>
                🔒 Pay ₹{total.toLocaleString()} Securely
              </button>

              {/* Security badges */}
              <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                {['🔒 SSL Encrypted', '✅ PCI DSS', '🛡️ 3D Secure'].map(badge => (
                  <span key={badge} style={{ fontSize: '0.72rem', color: C.muted }}>{badge}</span>
                ))}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.5rem', padding: '2rem' }}>
                <h3 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '1.5rem', color: C.primaryLight }}>Order Summary</h3>

                {items && items.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    {items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                          <span style={{ fontSize: '1.25rem' }}>{item.emoji}</span>
                          <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>{item.name}</div>
                            <div style={{ fontSize: '0.75rem', color: C.muted }}>x{item.qty}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: C.gold }}>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                    <span style={{ color: C.muted }}>Subtotal</span>
                    <span>₹{amount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                    <span style={{ color: C.muted }}>GST (5%)</span>
                    <span>₹{taxes}</span>
                  </div>
                  <div style={{ height: '1px', background: C.border, margin: '0.875rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '700' }}>Total</span>
                    <span style={{ fontWeight: '800', color: C.gold, fontSize: '1.2rem' }}>₹{total}</span>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(200,95,32,0.08)', border: '1px solid rgba(200,95,32,0.15)', borderRadius: '1rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{type === 'BOOKING' ? '📅' : '🍽️'}</span>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{type === 'BOOKING' ? 'Table Booking' : 'Food Order'}</div>
                  <div style={{ color: C.muted, fontSize: '0.78rem' }}>SipSpot · Secure Checkout</div>
                </div>
              </div>

              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1rem', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', color: C.muted, marginBottom: '0.75rem' }}>Accepted Payment Methods</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['💳 Visa', '💳 Mastercard', '📱 UPI', '🏦 Net Banking', '💰 Wallets'].map(m => (
                    <span key={m} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, borderRadius: '0.5rem', padding: '0.2rem 0.6rem', fontSize: '0.72rem', color: C.muted }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── PROCESSING ───────────────────────────────────────────── */}
        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: C.card, border: `1px solid ${C.border}`, borderRadius: '1.5rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', display: 'inline-block', animation: 'spin 1.5s linear infinite' }}>⏳</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>Processing Payment</h2>
            <p style={{ color: C.muted, marginBottom: '2.5rem' }}>Please wait while we securely process your payment...</p>

            <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #c85f20, #e07d3c)', borderRadius: '3px', transition: 'width 0.3s ease' }} />
            </div>
            <div style={{ color: C.muted, fontSize: '0.8rem', marginTop: '0.75rem' }}>{progress}%</div>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
              {[['🔒 Encrypting', 0], ['✅ Verifying', 30], ['💳 Charging', 60]].map(([s, threshold]) => (
                <div key={s} style={{ fontSize: '0.8rem', color: progress > threshold ? C.primaryLight : C.muted, fontWeight: progress > threshold ? '600' : '400', transition: 'all 0.3s' }}>{s}</div>
              ))}
            </div>
          </div>
        )}

        {/* ── SUCCESS ──────────────────────────────────────────────── */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: C.card, border: '1px solid rgba(74,222,128,0.2)', borderRadius: '1.5rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(74,222,128,0.15)', border: '3px solid rgba(74,222,128,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', animation: 'successPop 0.6s ease' }}>✅</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#4ade80', marginBottom: '0.75rem' }}>Payment Successful!</h2>
            <p style={{ color: C.muted, marginBottom: '2rem', lineHeight: '1.7' }}>
              Your {type === 'BOOKING' ? 'table has been booked' : 'order has been placed'} successfully.<br />
              A confirmation has been sent to your email.
            </p>

            <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '1rem', padding: '1.5rem', maxWidth: '400px', margin: '0 auto 2rem', textAlign: 'left' }}>
              <h4 style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '0.9rem', color: '#4ade80' }}>Payment Receipt</h4>
              {[
                ['Payment ID', paymentId],
                ['Amount Paid', `₹${total}`],
                ['Status', 'SUCCESS'],
                ['Type', type || 'ORDER'],
                ['Date', new Date().toLocaleDateString('en-IN')],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: i < 4 ? '1px solid rgba(74,222,128,0.1)' : 'none', fontSize: '0.82rem' }}>
                  <span style={{ color: C.muted }}>{k}</span>
                  <span style={{ fontWeight: '600', color: i === 2 ? '#4ade80' : C.text }}>{v}</span>
                </div>
              ))}
            </div>

            <button onClick={() => navigate('/customer/home')} style={{
              padding: '0.9rem 2.5rem', borderRadius: '0.875rem',
              background: 'linear-gradient(135deg, #c85f20, #e07d3c)',
              color: '#fff', border: 'none', fontWeight: '700',
              fontSize: '1rem', cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(200,95,32,0.35)'
            }}>
              Back to Dashboard →
            </button>
          </div>
        )}

        {/* ── FAILED ───────────────────────────────────────────────── */}
        {step === 'failed' && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: C.card, border: '1px solid rgba(248,113,113,0.2)', borderRadius: '1.5rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(248,113,113,0.15)', border: '3px solid rgba(248,113,113,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem' }}>❌</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#f87171', marginBottom: '0.75rem' }}>Payment Failed</h2>
            <p style={{ color: C.muted, marginBottom: '2rem' }}>Something went wrong. Please try again.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => setStep('form')} style={{ padding: '0.9rem 2rem', borderRadius: '0.875rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
                Try Again
              </button>
              <button onClick={() => navigate('/customer/home')} style={{ padding: '0.9rem 2rem', borderRadius: '0.875rem', background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.text, fontWeight: '600', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}