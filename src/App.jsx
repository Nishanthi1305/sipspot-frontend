import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import RoleSelect from './pages/auth/RoleSelect'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ResetPassword from './pages/auth/ResetPassword'
import AdminDashboard from './pages/admin/AdminDashboard'
import OwnerDashboard from './pages/owner/OwnerDashboard'
import CustomerHome from './pages/customer/CustomerHome'
import PaymentPage from './pages/payment/PaymentPage'


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RoleSelect />} />
          <Route path="/register/steps" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRole="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }/>
          <Route path="/owner/dashboard" element={
            <ProtectedRoute allowedRole="ROLE_CAFE_OWNER">
              <OwnerDashboard />
            </ProtectedRoute>
          }/>
          <Route path="/customer/home" element={
            <ProtectedRoute allowedRole="ROLE_CUSTOMER">
              <CustomerHome />
            </ProtectedRoute>
          }/>
          <Route path="/payment" element={
  <ProtectedRoute allowedRole="ROLE_CUSTOMER">
    <PaymentPage />
  </ProtectedRoute>
}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App