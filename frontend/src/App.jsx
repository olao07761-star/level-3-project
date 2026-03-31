import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DeviceProvider } from './context/DeviceContext'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import HomePage from './pages/HomePage'
import Evaluation from './pages/EvaluationPage'
import Signin from './pages/Signin'
import Signup from './pages/signup'
import Dashboard from './pages/Dashboard'
import AdminPage from './pages/AdminPage'
import AdminAuth from './pages/AdminAuth'

const ADMIN_SESSION_TIMEOUT_MS = 10 * 60 * 1000

const clearAdminSession = () => {
  localStorage.removeItem('adminAuthenticated')
  localStorage.removeItem('adminEmail')
  localStorage.removeItem('adminAuthExpiry')
}

const AdminProtectedRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
  const adminAuthExpiry = Number(localStorage.getItem('adminAuthExpiry') || 0)
  const isSessionValid = adminAuthExpiry > Date.now()

  if (!isAdminAuthenticated || !isSessionValid) {
    clearAdminSession()
    return <Navigate to="/admin-auth" replace />
  }

  const refreshSessionExpiry = () => {
    localStorage.setItem('adminAuthExpiry', String(Date.now() + ADMIN_SESSION_TIMEOUT_MS))
  }

  React.useEffect(() => {
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']

    const handleActivity = () => {
      refreshSessionExpiry()
    }

    activityEvents.forEach((eventName) => window.addEventListener(eventName, handleActivity))

    const intervalId = window.setInterval(() => {
      const latestExpiry = Number(localStorage.getItem('adminAuthExpiry') || 0)
      if (latestExpiry <= Date.now()) {
        clearAdminSession()
        window.location.replace('/admin-auth')
      }
    }, 1000)

    return () => {
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, handleActivity))
      window.clearInterval(intervalId)
    }
  }, [])

  return children
}

const App = () => {

  // const endpoint = 'http://localhost:5555/'

  // const makeRequest = () => {
  //   axios.get(endpoint)
  //     .then((result) => {
  //       console.log(result)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })

  // }
  return (
    <AuthProvider>
      <DeviceProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/evaluation" element={<Evaluation />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-auth" element={<AdminAuth />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminPage />
                </AdminProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </DeviceProvider>
    </AuthProvider>
  )
}

export default App