import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-removebg-preview.png'
import './Signin.css'
import { login as loginAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

const Signin = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await loginAPI({
                email: formData.email,
                password: formData.password,
            })

            // Use auth context to set authentication state
            login(response.token, response.data)

            // Redirect to dashboard immediately
            navigate('/dashboard')
        } catch (err) {
            const errorMessage = err.message || 'Login failed. Please try again.'

            // Provide helpful error messages
            if (errorMessage.includes('Invalid email or password')) {
                setError('Invalid email or password. Please check your credentials and try again.')
            } else {
                setError(errorMessage)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="signin-container">
            {/* Left Section - Form */}
            <div className="signin-left">
                <div className="signin-form-wrapper">
                    <h1 className="signin-title">Welcome Back</h1>
                    <p className="signin-subtitle">Enter your credentials to access your account.</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit} className="signin-form">
                        <div className="form-group">
                            <label htmlFor="email">Email or Phone</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@email.com"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
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
                                    onClick={togglePasswordVisibility}
                                    role="button"
                                    tabIndex="0"
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="remember-checkbox">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                <span>Remember me</span>
                            </label>
                            <a href="#forgot" className="forgot-password">Forgot Password?</a>
                        </div>

                        <button type="submit" className="btn-signin" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="signin-divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="signin-social">
                        <button type="button" className="btn-social btn-google">Google</button>
                        <button type="button" className="btn-social btn-apple">Apple</button>
                    </div>

                    <p className="signin-signup">
                        Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
                    </p>
                </div>
            </div>

            {/* Right Section - Hero */}
            <div className="signin-right">
                <div className="signin-hero">
                    <div className="signin-logo">
                        <img src={logo} alt="6ix Gadgets" className="signin-logo-img" />
                    </div>
                    <h2 className="signin-hero-title">Welcome Back to the<br />#1 Gadget Swap Hub<br />in Ibadan</h2>
                    <p className="signin-hero-description">
                        The easiest way to upgrade, swap, and buy premium Gadgets at the best market prices.
                    </p>
                </div>
            </div>
        </div>  
    )
}

export default Signin
