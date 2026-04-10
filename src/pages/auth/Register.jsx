import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
  card: 'rgba(255,255,255,0.04)',
}

const steps = ['Personal Info', 'Education', 'Experience', 'Verification']

export default function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const userType = location.state?.userType || 'CUSTOMER'

  const [currentStep, setCurrentStep] = useState(0)
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Step 0 — initiate
  const [email, setEmail] = useState('')
  const [initiated, setInitiated] = useState(false)

  // Step 1 — personal info
  const [personal, setPersonal] = useState({
    firstName: '', lastName: '', dob: '', gender: '',
    phone: '', street: '', plotNo: '', city: '', pincode: ''
  })

  // Step 2 — education
  const [educationList, setEducationList] = useState([
    { degree: '', institution: '', fieldOfStudy: '', startYear: '', endYear: '' }
  ])

  // Step 3 — experience
  const [experienceList, setExperienceList] = useState([
    { companyName: '', jobRole: '', startYear: '', endYear: '', currentlyWorking: false }
  ])
  const [skipExperience, setSkipExperience] = useState(false)

  // Step 4 — verification
  const [verification, setVerification] = useState({ aadhaarNumber: '', panCard: '' })

  const API = 'https://sipspot-backend.onrender.com/api/auth'

  // ─── Initiate Registration ───────────────────────────────────────────
const handleInitiate = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  try {
    // ✅ FIX: map frontend role → backend role
    const roleMap = {
      CUSTOMER: "ROLE_CUSTOMER",
      CAFE_OWNER: "ROLE_CAFE_OWNER"
    }

    const res = await axios.post(`${API}/register/initiate`, {
      email,
      userType: roleMap[userType] // ✅ IMPORTANT FIX
    })

    setUserId(res.data.userId)
    setInitiated(true)
    setSuccess('Verification email sent! Please verify your email then continue.')
  } catch (err) {
    setError(err.response?.data?.error || 'Something went wrong!')
  } finally {
    setLoading(false)
  }
}
  // ─── Step 1: Personal Info ───────────────────────────────────────────
  const handlePersonal = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post(`${API}/register/personal-info`, { userId, ...personal })
      setCurrentStep(1)
      setSuccess('')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  // ─── Step 2: Education ───────────────────────────────────────────────
  const handleEducation = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post(`${API}/register/education`, { userId, educationList })
      setCurrentStep(2)
      setSuccess('')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  // ─── Step 3: Experience ──────────────────────────────────────────────
  const handleExperience = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post(`${API}/register/experience`, {
        userId,
        experienceList: skipExperience ? [] : experienceList
      })
      setCurrentStep(3)
      setSuccess('')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  // ─── Step 4: Verification ────────────────────────────────────────────
  const handleVerification = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post(`${API}/register/verification`, { userId, ...verification })
      setSuccess('Registration complete! Check your email for login credentials.')
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  // ─── Education helpers ───────────────────────────────────────────────
  const addEducation = () => setEducationList([...educationList, { degree: '', institution: '', fieldOfStudy: '', startYear: '', endYear: '' }])
  const removeEducation = (i) => setEducationList(educationList.filter((_, idx) => idx !== i))
  const updateEducation = (i, field, value) => {
    const updated = [...educationList]
    updated[i][field] = value
    setEducationList(updated)
  }

  // ─── Experience helpers ──────────────────────────────────────────────
  const addExperience = () => setExperienceList([...experienceList, { companyName: '', jobRole: '', startYear: '', endYear: '', currentlyWorking: false }])
  const removeExperience = (i) => setExperienceList(experienceList.filter((_, idx) => idx !== i))
  const updateExperience = (i, field, value) => {
    const updated = [...experienceList]
    updated[i][field] = value
    setExperienceList(updated)
  }

  // ─── Input style ─────────────────────────────────────────────────────
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

  const gridTwo = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: C.bg, color: C.text,
      fontFamily: 'Inter, sans-serif', padding: '2rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden'
    }}>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.07} 50%{opacity:0.14} }
        .reg-input:focus { border-color: #c85f20 !important; background: rgba(200,95,32,0.06) !important; outline: none; }
        .submit-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 35px rgba(200,95,32,0.5) !important; }
        .add-btn:hover { background: rgba(200,95,32,0.15) !important; }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: '#c85f20', filter: 'blur(120px)', top: '-200px', left: '-200px', animation: 'pulse 7s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: '#d4a843', filter: 'blur(100px)', bottom: '-100px', right: '-100px', animation: 'pulse 9s ease-in-out infinite 2s', pointerEvents: 'none' }} />

      {/* Back */}
      <div onClick={() => navigate('/register')} style={{ position: 'absolute', top: '1.5rem', left: '2rem', color: C.muted, cursor: 'pointer', fontSize: '0.875rem' }}
        onMouseEnter={e => e.currentTarget.style.color = C.primaryLight}
        onMouseLeave={e => e.currentTarget.style.color = C.muted}
      >← Back</div>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '1.8rem' }}>☕</span>
        <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>SipSpot</span>
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          Create your account
        </h1>
        <p style={{ color: C.muted, fontSize: '0.875rem' }}>
          Joining as <span style={{ color: C.primaryLight, fontWeight: '600' }}>
            {userType === 'CUSTOMER' ? 'Customer' : 'Café Owner'}
          </span>
        </p>
      </div>

      {/* Step Progress */}
      {initiated && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '0', width: '100%', maxWidth: '600px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: i < currentStep ? C.primary : i === currentStep ? 'linear-gradient(135deg, #c85f20, #e07d3c)' : 'rgba(255,255,255,0.06)',
                  border: `2px solid ${i <= currentStep ? C.primary : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: '700',
                  color: i <= currentStep ? '#fff' : C.muted,
                  boxShadow: i === currentStep ? '0 0 20px rgba(200,95,32,0.4)' : 'none',
                  transition: 'all 0.3s'
                }}>
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: '0.7rem', marginTop: '0.4rem', color: i <= currentStep ? C.primaryLight : C.muted, fontWeight: i === currentStep ? '600' : '400', whiteSpace: 'nowrap' }}>
                  {step}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ height: '2px', flex: 1, background: i < currentStep ? C.primary : 'rgba(255,255,255,0.08)', marginBottom: '1.2rem', transition: 'all 0.3s' }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Card */}
      <div style={{
        background: C.card, border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: '600px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)', animation: 'fadeUp 0.7s ease'
      }}>

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

        {/* ── INITIATE STEP ─────────────────────────────────────── */}
        {!initiated && (
          <form onSubmit={handleInitiate}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.4rem' }}>Enter your email</h2>
            <p style={{ color: C.muted, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              We'll send a verification link to get you started.
            </p>
            <label style={labelStyle}>Email Address</label>
            <input className="reg-input" type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="yourname@example.com" required style={{ ...inputStyle, marginBottom: '1.5rem' }} />
            <button className="submit-btn" type="submit" disabled={loading} style={{
              width: '100%', padding: '0.9rem', borderRadius: '0.75rem', border: 'none',
              background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff',
              fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(200,95,32,0.35)', transition: 'all 0.3s'
            }}>
              {loading ? 'Sending...' : 'Send Verification Email →'}
            </button>
          </form>
        )}

        {/* ── STEP 1: PERSONAL INFO ─────────────────────────────── */}
        {initiated && currentStep === 0 && (
          <form onSubmit={handlePersonal}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.3rem' }}>Personal Information</h2>
            <p style={{ color: C.muted, fontSize: '0.85rem', marginBottom: '1.5rem' }}>Tell us a bit about yourself.</p>

            <div style={{ ...gridTwo, marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input className="reg-input" required style={inputStyle} placeholder="John"
                  value={personal.firstName} onChange={e => setPersonal({ ...personal, firstName: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input className="reg-input" required style={inputStyle} placeholder="Doe"
                  value={personal.lastName} onChange={e => setPersonal({ ...personal, lastName: e.target.value })} />
              </div>
            </div>

            <div style={{ ...gridTwo, marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Date of Birth</label>
                <input className="reg-input" type="date" required style={inputStyle}
                  value={personal.dob} onChange={e => setPersonal({ ...personal, dob: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Gender</label>
                <select className="reg-input" required style={{ ...inputStyle }}
                  value={personal.gender} onChange={e => setPersonal({ ...personal, gender: e.target.value })}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Phone Number</label>
              <input className="reg-input" required style={inputStyle} placeholder="9876543210"
                value={personal.phone} onChange={e => setPersonal({ ...personal, phone: e.target.value })} />
            </div>

            <div style={{ ...gridTwo, marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Street</label>
                <input className="reg-input" required style={inputStyle} placeholder="12 Main Street"
                  value={personal.street} onChange={e => setPersonal({ ...personal, street: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Plot No</label>
                <input className="reg-input" style={inputStyle} placeholder="A-101"
                  value={personal.plotNo} onChange={e => setPersonal({ ...personal, plotNo: e.target.value })} />
              </div>
            </div>

            <div style={{ ...gridTwo, marginBottom: '1.5rem' }}>
              <div>
                <label style={labelStyle}>City</label>
                <input className="reg-input" required style={inputStyle} placeholder="Chennai"
                  value={personal.city} onChange={e => setPersonal({ ...personal, city: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Pincode</label>
                <input className="reg-input" required style={inputStyle} placeholder="600001"
                  value={personal.pincode} onChange={e => setPersonal({ ...personal, pincode: e.target.value })} />
              </div>
            </div>

            <button className="submit-btn" type="submit" disabled={loading} style={{
              width: '100%', padding: '0.9rem', borderRadius: '0.75rem', border: 'none',
              background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff',
              fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(200,95,32,0.35)', transition: 'all 0.3s'
            }}>
              {loading ? 'Saving...' : 'Continue →'}
            </button>
          </form>
        )}

        {/* ── STEP 2: EDUCATION ─────────────────────────────────── */}
        {initiated && currentStep === 1 && (
          <form onSubmit={handleEducation}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.3rem' }}>Education Details</h2>
            <p style={{ color: C.muted, fontSize: '0.85rem', marginBottom: '1.5rem' }}>Add your educational qualifications.</p>

            {educationList.map((edu, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: C.primaryLight }}>Education {i + 1}</span>
                  {i > 0 && (
                    <button type="button" onClick={() => removeEducation(i)} style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#f87171', borderRadius: '0.5rem', padding: '0.2rem 0.6rem', cursor: 'pointer', fontSize: '0.78rem' }}>Remove</button>
                  )}
                </div>
                <div style={{ ...gridTwo, marginBottom: '0.875rem' }}>
                  <div>
                    <label style={labelStyle}>Degree</label>
                    <input className="reg-input" required style={inputStyle} placeholder="B.Tech"
                      value={edu.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Field of Study</label>
                    <input className="reg-input" required style={inputStyle} placeholder="Computer Science"
                      value={edu.fieldOfStudy} onChange={e => updateEducation(i, 'fieldOfStudy', e.target.value)} />
                  </div>
                </div>
                <div style={{ marginBottom: '0.875rem' }}>
                  <label style={labelStyle}>Institution</label>
                  <input className="reg-input" required style={inputStyle} placeholder="Anna University"
                    value={edu.institution} onChange={e => updateEducation(i, 'institution', e.target.value)} />
                </div>
                <div style={gridTwo}>
                  <div>
                    <label style={labelStyle}>Start Year</label>
                    <input className="reg-input" type="number" required style={inputStyle} placeholder="2019"
                      value={edu.startYear} onChange={e => updateEducation(i, 'startYear', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>End Year</label>
                    <input className="reg-input" type="number" required style={inputStyle} placeholder="2023"
                      value={edu.endYear} onChange={e => updateEducation(i, 'endYear', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className="add-btn" onClick={addEducation} style={{
              width: '100%', padding: '0.7rem', borderRadius: '0.75rem',
              background: 'rgba(200,95,32,0.08)', border: '1px dashed rgba(200,95,32,0.3)',
              color: C.primaryLight, fontSize: '0.875rem', fontWeight: '600',
              cursor: 'pointer', marginBottom: '1.5rem', transition: 'all 0.2s'
            }}>+ Add Another Education</button>

            <button className="submit-btn" type="submit" disabled={loading} style={{
              width: '100%', padding: '0.9rem', borderRadius: '0.75rem', border: 'none',
              background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff',
              fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(200,95,32,0.35)', transition: 'all 0.3s'
            }}>
              {loading ? 'Saving...' : 'Continue →'}
            </button>
          </form>
        )}

        {/* ── STEP 3: EXPERIENCE ────────────────────────────────── */}
        {initiated && currentStep === 2 && (
          <form onSubmit={handleExperience}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.3rem' }}>Work Experience</h2>
            <p style={{ color: C.muted, fontSize: '0.85rem', marginBottom: '1.25rem' }}>Optional — skip if you have no experience.</p>

            {/* Skip toggle */}
            <div onClick={() => setSkipExperience(!skipExperience)} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              background: skipExperience ? 'rgba(200,95,32,0.08)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${skipExperience ? 'rgba(200,95,32,0.3)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '0.75rem', padding: '0.875rem 1rem',
              cursor: 'pointer', marginBottom: '1.25rem', transition: 'all 0.2s'
            }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%',
                background: skipExperience ? C.primary : 'rgba(255,255,255,0.1)',
                border: `2px solid ${skipExperience ? C.primary : 'rgba(255,255,255,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', color: '#fff', flexShrink: 0
              }}>{skipExperience ? '✓' : ''}</div>
              <span style={{ fontSize: '0.875rem', color: skipExperience ? C.text : C.muted }}>
                I have no work experience — skip this step
              </span>
            </div>

            {!skipExperience && (
              <>
                {experienceList.map((exp, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600', color: C.primaryLight }}>Experience {i + 1}</span>
                      {i > 0 && (
                        <button type="button" onClick={() => removeExperience(i)} style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#f87171', borderRadius: '0.5rem', padding: '0.2rem 0.6rem', cursor: 'pointer', fontSize: '0.78rem' }}>Remove</button>
                      )}
                    </div>
                    <div style={{ ...gridTwo, marginBottom: '0.875rem' }}>
                      <div>
                        <label style={labelStyle}>Company Name</label>
                        <input className="reg-input" style={inputStyle} placeholder="Infosys"
                          value={exp.companyName} onChange={e => updateExperience(i, 'companyName', e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Job Role</label>
                        <input className="reg-input" style={inputStyle} placeholder="Software Engineer"
                          value={exp.jobRole} onChange={e => updateExperience(i, 'jobRole', e.target.value)} />
                      </div>
                    </div>
                    <div style={{ ...gridTwo, marginBottom: '0.875rem' }}>
                      <div>
                        <label style={labelStyle}>Start Year</label>
                        <input className="reg-input" type="number" style={inputStyle} placeholder="2022"
                          value={exp.startYear} onChange={e => updateExperience(i, 'startYear', e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>End Year</label>
                        <input className="reg-input" type="number" style={inputStyle} placeholder="2024"
                          value={exp.endYear} onChange={e => updateExperience(i, 'endYear', e.target.value)}
                          disabled={exp.currentlyWorking} />
                      </div>
                    </div>
                    <div onClick={() => updateExperience(i, 'currentlyWorking', !exp.currentlyWorking)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: exp.currentlyWorking ? C.primary : 'transparent', border: `2px solid ${exp.currentlyWorking ? C.primary : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#fff' }}>{exp.currentlyWorking ? '✓' : ''}</div>
                      <span style={{ fontSize: '0.82rem', color: C.muted }}>Currently working here</span>
                    </div>
                  </div>
                ))}

                <button type="button" className="add-btn" onClick={addExperience} style={{
                  width: '100%', padding: '0.7rem', borderRadius: '0.75rem',
                  background: 'rgba(200,95,32,0.08)', border: '1px dashed rgba(200,95,32,0.3)',
                  color: C.primaryLight, fontSize: '0.875rem', fontWeight: '600',
                  cursor: 'pointer', marginBottom: '1.25rem', transition: 'all 0.2s'
                }}>+ Add Another Experience</button>
              </>
            )}

            <button className="submit-btn" type="submit" disabled={loading} style={{
              width: '100%', padding: '0.9rem', borderRadius: '0.75rem', border: 'none',
              background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff',
              fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(200,95,32,0.35)', transition: 'all 0.3s'
            }}>
              {loading ? 'Saving...' : 'Continue →'}
            </button>
          </form>
        )}

        {/* ── STEP 4: VERIFICATION ──────────────────────────────── */}
        {initiated && currentStep === 3 && (
          <form onSubmit={handleVerification}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.3rem' }}>Government Verification</h2>
            <p style={{ color: C.muted, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Your details are encrypted and secure. 🔐
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Aadhaar Number</label>
              <input className="reg-input" required style={inputStyle} placeholder="1234 5678 9012"
                value={verification.aadhaarNumber} onChange={e => setVerification({ ...verification, aadhaarNumber: e.target.value })} />
              <p style={{ color: C.muted, fontSize: '0.75rem', marginTop: '0.4rem' }}>12 digit Aadhaar number</p>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={labelStyle}>PAN Card Number</label>
              <input className="reg-input" required style={{ ...inputStyle, textTransform: 'uppercase' }} placeholder="ABCDE1234F"
                value={verification.panCard} onChange={e => setVerification({ ...verification, panCard: e.target.value.toUpperCase() })} />
              <p style={{ color: C.muted, fontSize: '0.75rem', marginTop: '0.4rem' }}>10 character PAN number</p>
            </div>

            {/* Security note */}
            <div style={{ background: 'rgba(200,95,32,0.06)', border: '1px solid rgba(200,95,32,0.15)', borderRadius: '0.75rem', padding: '0.875rem 1rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1rem' }}>🔒</span>
              <p style={{ color: C.muted, fontSize: '0.8rem', lineHeight: '1.6' }}>
                Your government ID details are fully encrypted and used only for identity verification. We never share your data with third parties.
              </p>
            </div>

            <button className="submit-btn" type="submit" disabled={loading} style={{
              width: '100%', padding: '0.9rem', borderRadius: '0.75rem', border: 'none',
              background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff',
              fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(200,95,32,0.35)', transition: 'all 0.3s'
            }}>
              {loading ? 'Completing registration...' : 'Complete Registration ✓'}
            </button>
          </form>
        )}

      </div>

      {/* Step indicator text */}
      {initiated && (
        <p style={{ marginTop: '1.25rem', color: C.muted, fontSize: '0.8rem' }}>
          Step {currentStep + 1} of {steps.length}
        </p>
      )}
    </div>
  )
}