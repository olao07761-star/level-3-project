import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-removebg-preview.png'
import './Signup.css'
import { signup as signupAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        agreeTerms: false,
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

        // Client-side validation
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long')
            setLoading(false)
            return
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address')
            setLoading(false)
            return
        }

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError('Please enter your first and last name')
            setLoading(false)
            return
        }

        try {
            const response = await signupAPI({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            })

            // Use auth context to set authentication state
            login(response.token, response.data)

            // Redirect to dashboard
            navigate('/dashboard')
        } catch (err) {
            const errorMessage = err.message || 'Signup failed. Please try again.'

            // If email already exists, suggest signing in
            if (errorMessage.includes('already exists')) {
                setError(`${errorMessage}. Try signing in instead or use a different email.`)
            } else {
                setError(errorMessage)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="signup-container">
            {/* Left Section - Form */}
            <div className="signup-left">
                <div className="signup-form-wrapper">
                    <h1 className="signup-title">Create Account</h1>
                    <p className="signup-subtitle">Join the community of tech enthusiasts.</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="John"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
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
                            <label className="agree-terms">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleChange}
                                    required
                                />
                                <span>I agree to the <a href="#terms" className="terms-link">Terms & Conditions</a></span>
                            </label>
                        </div>

                        <button type="submit" className="btn-signup" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="signup-divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="signup-social">
                        <button type="button" className="btn-social btn-google">Google</button>
                        <button type="button" className="btn-social btn-apple">Apple</button>
                    </div>

                    <p className="signup-signin">
                        Already have an account? <Link to="/signin" className="signin-link">Sign In</Link>
                    </p>
                </div>
            </div>

            {/* Right Section - Hero */}
            <div className="signup-right">
                <div className="signup-hero">
                    <div className="signup-logo">
                        <img src={logo} alt="6ix Gadgets" className="signup-logo-img" />
                        {/* <span className="signup-logo-text">6IX GADGETS</span> */}
                    </div>
                    <h2 className="signup-hero-title">Join the 6ix Community:<br />Upgrade Your Tech<br />in Ibadan</h2>
                    <p className="signup-hero-description">
                        The easiest way to upgrade, swap, and buy premium tech at the best market prices.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
