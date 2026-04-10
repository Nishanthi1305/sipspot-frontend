import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const C = {
  bg: '#1a0f0a',
  surface: 'rgba(0,0,0,0.3)',
  card: 'rgba(255,255,255,0.04)',
  primary: '#c85f20',
  primaryLight: '#e07d3c',
  gold: '#d4a843',
  text: '#fdf6f0',
  muted: 'rgba(253,246,240,0.5)',
  border: 'rgba(255,255,255,0.07)',
}

const btn = {
  primary: {
    padding: '0.9rem 2.5rem', borderRadius: '0.75rem',
    background: 'linear-gradient(135deg, #c85f20, #e07d3c)',
    color: '#fff', border: 'none', cursor: 'pointer',
    fontSize: '1rem', fontWeight: '700',
    boxShadow: '0 8px 30px rgba(200,95,32,0.4)',
    transition: 'all 0.3s ease'
  },
  secondary: {
    padding: '0.9rem 2.5rem', borderRadius: '0.75rem',
    background: 'rgba(255,255,255,0.05)',
    color: '#fdf6f0', border: '1px solid rgba(255,255,255,0.15)',
    cursor: 'pointer', fontSize: '1rem', fontWeight: '500',
    transition: 'all 0.3s ease', backdropFilter: 'blur(10px)'
  }
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setActiveFeature(p => (p + 1) % 8), 2500)
    return () => clearInterval(interval)
  }, [])

  const features = [
    { icon: '📅', title: 'Smart Table Booking', desc: 'Reserve your perfect spot in seconds. Choose your café, date, and time — all online.', tag: 'Live' },
    { icon: '🍽️', title: 'Pre-Order Meals', desc: 'Browse the full menu and order before arriving. Your food is ready when you walk in.', tag: 'Popular' },
    { icon: '💳', title: 'Secure Payments', desc: 'Pay safely with Razorpay. UPI, cards, and wallets — all supported seamlessly.', tag: 'Secured' },
    { icon: '⚡', title: 'Live Order Tracking', desc: 'Watch your order move from kitchen to table in real time. Zero surprises.', tag: 'Real-time' },
  ]

  const steps = [
    { step: '01', title: 'Pick a Café', desc: 'Browse our partner cafés and find your perfect spot nearby.' },
    { step: '02', title: 'Book a Table', desc: 'Choose your date, time and seats. Get instant confirmation.' },
    { step: '03', title: 'Pre-Order Food', desc: 'Pick your favourites. Order goes straight to the chef.' },
    { step: '04', title: 'Pay & Relax', desc: 'Pay securely online. Walk in to a ready table and meal.' },
  ]

  const menuItems = [
    { icon: '☕', name: 'Signature Espresso', desc: 'Rich, bold, perfectly extracted', price: '₹180' },
    { icon: '🥐', name: 'Butter Croissant', desc: 'Flaky, golden, freshly baked', price: '₹120' },
    { icon: '🍵', name: 'Matcha Latte', desc: 'Ceremonial grade, oat milk', price: '₹220' },
    { icon: '🧁', name: 'Velvet Cupcake', desc: 'Red velvet with cream cheese', price: '₹150' },
    { icon: '🥪', name: 'Club Sandwich', desc: 'Grilled chicken, avocado, swiss', price: '₹280' },
    { icon: '🍫', name: 'Dark Hot Chocolate', desc: '70% dark cacao, steamed milk', price: '₹200' },
  ]

  const testimonials = [
    { name: 'Priya Sharma', role: 'Regular Customer · Chennai', avatar: '👩', text: '"SipSpot completely changed how I do café visits. I walk in and everything is ready. It feels like VIP treatment every single time!"' },
    { name: 'Rahul Menon', role: 'Café Owner · Bangalore', avatar: '👨', text: '"As a café owner, managing tables and orders used to be chaos. SipSpot brought everything under control. My staff loves it too!"' },
    { name: 'Ananya Krishnan', role: 'Coffee Enthusiast · Vellore', avatar: '👩‍💼', text: '"The pre-order feature is genius! My latte is ready the moment I sit down. I cannot imagine going back to the old way of ordering."' },
  ]

  const Badge = ({ children }) => (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      background: 'rgba(200,95,32,0.15)', border: '1px solid rgba(200,95,32,0.3)',
      borderRadius: '2rem', padding: '0.4rem 1.2rem',
      fontSize: '0.82rem', color: C.primaryLight, fontWeight: '500', marginBottom: '1.25rem'
    }}>{children}</div>
  )

  const Divider = () => (
    <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #c85f20, #e07d3c)', borderRadius: '2px', margin: '0.75rem auto 2rem' }} />
  )

  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes pulse { 0%,100%{opacity:0.08} 50%{opacity:0.18} }
        @keyframes slideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .hover-lift:hover { transform: translateY(-6px) !important; box-shadow: 0 20px 40px rgba(200,95,32,0.18) !important; border-color: rgba(200,95,32,0.35) !important; background: rgba(200,95,32,0.08) !important; }
        .nav-link { color: rgba(253,246,240,0.55); text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #e07d3c; }
        .menu-row:hover { background: rgba(200,95,32,0.08) !important; border-color: rgba(200,95,32,0.25) !important; }
        .review-card:hover { border-color: rgba(200,95,32,0.25) !important; transform: translateY(-4px); }
        .cta-btn:hover { transform: translateY(-3px) !important; box-shadow: 0 16px 45px rgba(200,95,32,0.55) !important; }

        /* ── Mobile hamburger menu ── */
        .nav-desktop { display: flex; align-items: center; gap: 2rem; }
        .hamburger { display: none; background: none; border: 1px solid rgba(255,255,255,0.15); border-radius: 0.5rem; padding: 0.4rem 0.6rem; cursor: pointer; color: #fdf6f0; font-size: 1.2rem; }
        .mobile-menu {
          display: none; flex-direction: column; gap: 1rem;
          position: fixed; top: 64px; left: 0; right: 0; z-index: 99;
          background: rgba(26,15,10,0.97); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 1.5rem 2rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a.nav-link { font-size: 1rem; padding: 0.25rem 0; }
        .mobile-menu-btns { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem; }

        /* ── Responsive breakpoints ── */
        @media (max-width: 768px) {
          .nav-desktop { display: none; }
          .hamburger { display: block; }

          /* Hero */
          .hero-buttons { flex-direction: column; align-items: stretch !important; }
          .hero-buttons button { width: 100% !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }

          /* Features / Steps / Reviews */
          .features-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }

          /* Menu items — stack below 500px */
          .menu-grid { grid-template-columns: 1fr !important; }

          /* CTA buttons */
          .cta-buttons { flex-direction: column; align-items: stretch !important; }
          .cta-buttons button { width: 100% !important; }

          /* Footer */
          .footer-bottom { flex-direction: column; align-items: flex-start !important; gap: 0.75rem !important; }
          .footer-bottom-links { flex-wrap: wrap; gap: 1rem !important; }
        }

        @media (max-width: 480px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(26,15,10,0.95)' : 'rgba(26,15,10,0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.4s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.8rem' }}>☕</span>
          <span style={{ fontSize: '1.35rem', fontWeight: '800', letterSpacing: '-0.5px' }}>SipSpot</span>
        </div>

        {/* Desktop nav */}
        <div className="nav-desktop">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how" className="nav-link">How it works</a>
          <a href="#menu" className="nav-link">Menu</a>
          <a href="#reviews" className="nav-link">Reviews</a>
          <button onClick={() => navigate('/login')} style={{ ...btn.secondary, padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>Login</button>
          <button onClick={() => navigate('/register')} style={{ ...btn.primary, padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>Get Started</button>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile nav drawer */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {[['Features', '#features'], ['How it works', '#how'], ['Menu', '#menu'], ['Reviews', '#reviews']].map(([label, href]) => (
          <a key={href} href={href} className="nav-link" onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <div className="mobile-menu-btns">
          <button onClick={() => { navigate('/login'); setMenuOpen(false) }} style={{ ...btn.secondary, padding: '0.6rem 1.5rem', fontSize: '0.9rem', flex: 1 }}>Login</button>
          <button onClick={() => { navigate('/register'); setMenuOpen(false) }} style={{ ...btn.primary, padding: '0.6rem 1.5rem', fontSize: '0.9rem', flex: 1 }}>Get Started</button>
        </div>
      </div>

      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '6rem 1.5rem 4rem', position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(200,95,32,0.18) 0%, transparent 65%)',
        animation: 'fadeIn 0.8s ease'
      }}>
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: '#c85f20', filter: 'blur(100px)', top: '-150px', left: '-200px', animation: 'pulse 7s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: '#d4a843', filter: 'blur(100px)', bottom: '-100px', right: '-100px', animation: 'pulse 9s ease-in-out infinite 2s', pointerEvents: 'none' }} />

        {[['☕','15%','8%','0s','2rem'],['🫖','18%','88%','1s','1.6rem'],['🍵','75%','5%','2s','1.8rem'],['☕','78%','90%','0.5s','2rem'],['✨','45%','3%','1.5s','1.2rem'],['🫖','50%','95%','2.5s','1.4rem']].map(([e,t,l,d,fs],i) => (
          <div key={i} style={{ position: 'absolute', top: t, left: l, fontSize: fs, opacity: 0.07, animation: `float ${3+i*0.5}s ease-in-out infinite`, animationDelay: d, pointerEvents: 'none' }}>{e}</div>
        ))}

        <div style={{ maxWidth: '840px', position: 'relative', animation: 'slideUp 0.9s ease', width: '100%' }}>
          <Badge>✨ &nbsp; The Future of Café Experience</Badge>

          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)', fontWeight: '800', lineHeight: '1.08', marginBottom: '1.5rem' }}>
            <span style={{
              background: 'linear-gradient(135deg, #fdf6f0 0%, #d4a843 45%, #e07d3c 75%, #c85f20 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite'
            }}>Sip Smarter.</span>
            <br />
            <span style={{ color: C.text }}>Live Better.</span>
          </h1>

          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', color: C.muted, lineHeight: '1.85', maxWidth: '580px', margin: '0 auto 2.5rem' }}>
            Book tables, pre-order your favourite brew, and pay online — all before you step inside.
            SipSpot turns every café visit into a seamless luxury experience.
          </p>

          <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <button className="cta-btn" onClick={() => navigate('/register')} style={{ ...btn.primary, fontSize: '1.05rem', padding: '1rem 2.8rem' }}>
              Start for Free →
            </button>
            <button style={{ ...btn.secondary, fontSize: '1.05rem', padding: '1rem 2.8rem' }}>
              ▶ &nbsp; Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', justifyContent: 'center' }}>
            {[['50+','Partner Cafés'],['10K+','Happy Customers'],['4.9★','Average Rating'],['99%','Satisfaction Rate']].map(([v, l], i) => (
              <div key={i} style={{
                background: 'rgba(200,95,32,0.08)', border: '1px solid rgba(200,95,32,0.2)',
                borderRadius: '1rem', padding: '1.25rem 1rem', textAlign: 'center'
              }}>
                <div style={{ fontSize: 'clamp(1.4rem,4vw,1.9rem)', fontWeight: '800', color: C.gold }}>{v}</div>
                <div style={{ color: C.muted, fontSize: '0.78rem', marginTop: '0.2rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: 'rgba(200,95,32,0.08)', borderTop: '1px solid rgba(200,95,32,0.15)', borderBottom: '1px solid rgba(200,95,32,0.15)', padding: '1rem 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 22s linear infinite' }}>
          {['☕ Table Booking','🍽️ Pre-Order Food','💳 Secure Payments','⚡ Real-Time Tracking','🏪 Multi-Café Support','📧 Instant Notifications','🔐 Secure Auth'].map((t, i) => (
            <span key={i} style={{ marginRight: '3rem', fontSize: '0.875rem', fontWeight: '500', color: C.primaryLight }}>{t}</span>
          ))}
          {['☕ Table Booking','🍽️ Pre-Order Food','💳 Secure Payments','⚡ Real-Time Tracking','🏪 Multi-Café Support','📧 Instant Notifications','🔐 Secure Auth'].map((t, i) => (
            <span key={`r${i}`} style={{ marginRight: '3rem', fontSize: '0.875rem', fontWeight: '500', color: C.primaryLight }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Badge>⚡ &nbsp; Core Features</Badge>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: '700', marginBottom: '0.75rem' }}>
              Everything for a <span style={{ color: C.primaryLight }}>perfect visit</span>
            </h2>
            <Divider />
            <p style={{ color: C.muted, maxWidth: '500px', margin: '0 auto' }}>From reservation to the last sip — SipSpot manages it all so you can focus on enjoying.</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {features.map((f, i) => (
              <div key={i} className="hover-lift" onMouseEnter={() => setActiveFeature(i)} style={{
                background: activeFeature === i ? 'rgba(200,95,32,0.08)' : C.card,
                border: `1px solid ${activeFeature === i ? 'rgba(200,95,32,0.35)' : C.border}`,
                borderRadius: '1.25rem', padding: '1.75rem', textAlign: 'center',
                cursor: 'pointer', transition: 'all 0.3s ease',
                transform: activeFeature === i ? 'translateY(-6px)' : 'none',
                boxShadow: activeFeature === i ? '0 20px 40px rgba(200,95,32,0.15)' : 'none'
              }}>
                <div style={{ fontSize: '2.4rem', marginBottom: '0.875rem' }}>{f.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.6rem' }}>{f.title}</h3>
                <p style={{ color: C.muted, fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '1rem' }}>{f.desc}</p>
                <span style={{ display: 'inline-block', background: 'rgba(200,95,32,0.12)', border: '1px solid rgba(200,95,32,0.2)', color: C.primaryLight, borderRadius: '0.5rem', padding: '0.18rem 0.6rem', fontSize: '0.72rem', fontWeight: '600' }}>{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" style={{ padding: '5rem 1.5rem', background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <Badge>🗺️ &nbsp; Simple Process</Badge>
          <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: '700', marginBottom: '0.75rem' }}>
            How <span style={{ color: C.primaryLight }}>SipSpot</span> works
          </h2>
          <Divider />
          <p style={{ color: C.muted, marginBottom: '4rem' }}>Four effortless steps from your couch to your coffee.</p>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(200,95,32,0.2), rgba(200,95,32,0.05))',
                  border: '2px solid rgba(200,95,32,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', fontWeight: '800', color: C.primaryLight,
                  margin: '0 auto 1.25rem'
                }}>{s.step}</div>
                <h3 style={{ fontWeight: '700', marginBottom: '0.5rem', fontSize: '1rem' }}>{s.title}</h3>
                <p style={{ color: C.muted, fontSize: '0.85rem', lineHeight: '1.7' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Menu */}
      <section id="menu" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Badge>☕ &nbsp; Sample Menu</Badge>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: '700', marginBottom: '0.75rem' }}>
              Crafted with <span style={{ color: C.primaryLight }}>passion</span>
            </h2>
            <Divider />
            <p style={{ color: C.muted }}>A glimpse of what awaits you at SipSpot partner cafés.</p>
          </div>
          <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {menuItems.map((m, i) => (
              <div key={i} className="menu-row" style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '1rem', padding: '1.25rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.3s'
              }}>
                <span style={{ fontSize: '2rem', flexShrink: 0 }}>{m.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.2rem' }}>{m.name}</div>
                  <div style={{ color: C.muted, fontSize: '0.82rem' }}>{m.desc}</div>
                </div>
                <div style={{ color: C.gold, fontWeight: '700', fontSize: '1rem', flexShrink: 0 }}>{m.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" style={{ padding: '5rem 1.5rem', background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Badge>💬 &nbsp; Testimonials</Badge>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: '700', marginBottom: '0.75rem' }}>
              Loved by <span style={{ color: C.primaryLight }}>coffee lovers</span>
            </h2>
            <Divider />
          </div>
          <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {testimonials.map((t, i) => (
              <div key={i} className="review-card" style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '1.25rem', padding: '1.75rem', transition: 'all 0.3s'
              }}>
                <div style={{ color: C.gold, marginBottom: '1rem', fontSize: '0.95rem' }}>★★★★★</div>
                <p style={{ color: C.muted, fontSize: '0.92rem', lineHeight: '1.8', marginBottom: '1.5rem', fontStyle: 'italic' }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(200,95,32,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ color: C.muted, fontSize: '0.78rem' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '700px', height: '700px', borderRadius: '50%', background: '#c85f20', filter: 'blur(120px)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'pulse 6s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <Badge>🚀 &nbsp; Get Started Today</Badge>
          <h2 style={{ fontSize: 'clamp(1.8rem,5vw,4rem)', fontWeight: '800', marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #fdf6f0 0%, #d4a843 50%, #e07d3c 100%)',
            backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite'
          }}>Ready to sip smarter?</h2>
          <p style={{ color: C.muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: '450px', margin: '0 auto 2.5rem', lineHeight: '1.8' }}>
            Join thousands of coffee lovers who've already upgraded their café experience with SipSpot.
          </p>
          <div className="cta-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="cta-btn" onClick={() => navigate('/register')} style={{ ...btn.primary, fontSize: '1.05rem', padding: '1rem 2.8rem' }}>Create Free Account →</button>
            <button onClick={() => navigate('/register')} style={{ ...btn.secondary, fontSize: '1.05rem', padding: '1rem 2.8rem' }}>Register Your Café</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '2.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.8rem' }}>☕</span>
                <span style={{ fontWeight: '800', fontSize: '1.3rem' }}>SipSpot</span>
              </div>
              <p style={{ color: C.muted, fontSize: '0.875rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
                The premium café experience platform. Book, order, and pay — all before you arrive.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {['📘', '🐦', '📸', '▶️'].map((icon, i) => (
                  <div key={i} style={{
                    width: '36px', height: '36px', borderRadius: '0.5rem',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(200,95,32,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  >{icon}</div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontWeight: '700', marginBottom: '0.875rem', fontSize: '0.875rem', color: C.text }}>Quick Links</h4>
              {[['🏠 Home', '#'], ['⚡ Features', '#features'], ['🗺️ How it works', '#how'], ['☕ Menu', '#menu'], ['💬 Reviews', '#reviews']].map(([label, href], i) => (
                <a key={i} href={href} style={{
                  display: 'block', color: C.muted, textDecoration: 'none',
                  fontSize: '0.875rem', marginBottom: '0.75rem', transition: 'color 0.2s'
                }}
                  onMouseEnter={e => e.target.style.color = '#e07d3c'}
                  onMouseLeave={e => e.target.style.color = C.muted}
                >{label}</a>
              ))}
            </div>

            {/* Legal */}
            <div>
              <h4 style={{ fontWeight: '700', marginBottom: '1.25rem', fontSize: '0.95rem', color: C.text }}>Legal</h4>
              {[
                ['🔒 Privacy Policy'],
                ['📋 Terms of Service'],
                ['🍪 Cookie Policy'],
                ['♿ Accessibility'],
              ].map(([label], i) => (
                <a key={i} href="#" style={{
                  display: 'block', color: C.muted, textDecoration: 'none',
                  fontSize: '0.875rem', marginBottom: '0.75rem', transition: 'color 0.2s'
                }}
                  onMouseEnter={e => e.target.style.color = '#e07d3c'}
                  onMouseLeave={e => e.target.style.color = C.muted}
                >{label}</a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontWeight: '700', marginBottom: '1.25rem', fontSize: '0.95rem', color: C.text }}>Contact Us</h4>
              {[
                ['📍', 'Address', '42 Brew Street, Anna Nagar,\nChennai - 600040, Tamil Nadu, India'],
                ['📞', 'Phone', '+91 98765 43210'],
                ['📧', 'Email', 'hello@sipspot.in'],
                ['🕐', 'Support', 'Mon – Sat, 9am – 6pm IST'],
              ].map(([icon, label, value], i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem', marginTop: '0.1rem' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: C.primaryLight, fontWeight: '600', marginBottom: '0.15rem' }}>{label}</div>
                    <div style={{ color: C.muted, fontSize: '0.82rem', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '1.75rem' }} />

          <div className="footer-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem' }}>
            <div style={{ color: C.muted, fontSize: '0.82rem' }}>
              © 2025 SipSpot Technologies Pvt. Ltd. All rights reserved.
            </div>
            <div className="footer-bottom-links" style={{ display: 'flex', gap: '2rem' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map(l => (
                <a key={l} href="#" style={{ color: C.muted, textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#e07d3c'}
                  onMouseLeave={e => e.target.style.color = C.muted}
                >{l}</a>
              ))}
            </div>
            <div style={{ color: C.muted, fontSize: '0.82rem' }}>
              Made with ❤️ in India 🇮🇳
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
