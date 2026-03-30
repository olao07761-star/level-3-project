import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <Footer />
        </Router>
      </DeviceProvider>
    </AuthProvider>
  )
}

export default App