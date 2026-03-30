import React from 'react'
import './Herosection.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Herosection = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    const handleBrowseStore = () => {
        if (!isAuthenticated) {
            navigate('/signin')
        } else {
            navigate('/dashboard')
        }
    }

    const handleGetQuote = () => {
        if (!isAuthenticated) {
            navigate('/signup')
        } else {
            navigate('/evaluation')
        }
    }


    return (
        <section className="hero-section">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-left">
                        <p className="hero-badge">RELIABLE TECH PARTNER IN IBADAN</p>
                        <h1 className="hero-heading">
                            WE BUY, SELL<br />
                            <span className="hero-highlight">AND SWAP</span>
                        </h1>
                        <p className="hero-description">
                            Upgrade to the latest Apple or Samsung devices today. We trade phones, laptops, and accessories. Get the best market value.
                        </p>

                        <div className="hero-features">
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Instant Bank Transfer</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Doorstep Pickup</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Best Naija Rates</span>
                            </div>
                        </div>

                        <div className="hero-buttons">
                            <button className="btn-primary" onClick={handleGetQuote}>Get a Quote for Swap →</button>
                            <button className="btn-secondary" onClick={handleBrowseStore}>Browse Store</button>
                        </div>
                    </div>

                    <div className="hero-right">
                        <div className="product-grid">
                            <div className="product-card">
                                <div className="product-image">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxj4KtasdPdJZGViM46mbB7x2ERKce14ojyQ&s" alt="iPhone 17 Pro Max" />
                                </div>
                                <h3 className="product-title">Apple iPhones</h3>
                                <p className="product-subtitle">Latest Series Available</p>
                            </div>

                            <div className="product-card">
                                <div className="product-image">
                                    <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&q=80" alt="MacBook Pro Laptop" />
                                </div>
                                <h3 className="product-title">Laptops</h3>
                                <p className="product-subtitle">Macbooks & Windows</p>
                            </div>

                            <div className="product-card">
                                <div className="product-image">
                                    <img src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop&q=80" alt="PlayStation 5 Console" />
                                </div>
                                <h3 className="product-title">PlayStation</h3>
                                <p className="product-subtitle">Accessories</p>
                            </div>

                            <div className="product-card">
                                <div className="product-image">
                                    <img src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop&q=80" alt="Apple Watch" />
                                </div>
                                <h3 className="product-title">Smart Watches</h3>
                                <p className="product-subtitle">Apple & Samsung</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Herosection