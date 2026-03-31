import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo-removebg-preview.png'
import './Signin.css'

const ADMIN_SESSION_TIMEOUT_MS = 10 * 60 * 1000

const clearAdminSession = () => {
    localStorage.removeItem('adminAuthenticated')
    localStorage.removeItem('adminEmail')
    localStorage.removeItem('adminAuthExpiry')
}

const AdminAuth = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || ''
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || ''

    useEffect(() => {
        const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
        const adminAuthExpiry = Number(localStorage.getItem('adminAuthExpiry') || 0)
        const isSessionValid = adminAuthExpiry > Date.now()

        if (isAdminAuthenticated && isSessionValid) {
            navigate('/admin', { replace: true })
            return
        }

        clearAdminSession()
    }, [navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (!adminEmail || !adminPassword) {
                setError('Admin credentials are not configured. Add VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD to your .env file.')
                return
            }

            const emailMatches = formData.email.trim().toLowerCase() === adminEmail.trim().toLowerCase()
            const passwordMatches = formData.password === adminPassword

            if (!emailMatches || !passwordMatches) {
                setError('Invalid admin email or password.')
                return
            }

            localStorage.setItem('adminAuthenticated', 'true')
            localStorage.setItem('adminEmail', adminEmail)
            localStorage.setItem('adminAuthExpiry', String(Date.now() + ADMIN_SESSION_TIMEOUT_MS))
            navigate('/admin', { replace: true })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="signin-container">
            <div className="signin-left">
                <div className="signin-form-wrapper">
                    <h1 className="signin-title">Admin Login</h1>
                    <p className="signin-subtitle">Only authorized admin credentials can access the admin dashboard.</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit} className="signin-form">
                        <div className="form-group">
                            <label htmlFor="email">Admin Email</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="admin@email.com"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Admin Password</label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                />
                                <span
                                    className="toggle-password"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    role="button"
                                    tabIndex="0"
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="btn-signin" disabled={loading}>
                            {loading ? 'Authenticating...' : 'Login as Admin'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="signin-right">
                <div className="signin-hero">
                    <div className="signin-logo">
                        <img src={logo} alt="6ix Gadgets" className="signin-logo-img" />
                    </div>
                    <h2 className="signin-hero-title">Restricted<br />Admin Access</h2>
                    <p className="signin-hero-description">
                        This area is protected. Only your configured admin email and password can continue.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdminAuth