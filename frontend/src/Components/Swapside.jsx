import React, { useState } from 'react'
import './Swapside.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Swapside = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    const handleCustomSwap = () => {
        if (!isAuthenticated) {
            navigate('/signup')
        } else {
            navigate('/evaluation')
        }
    }

    const [activeStep, setActiveStep] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState('Phones')
    const [selectedBrand, setSelectedBrand] = useState(null)

    const categories = [
        { id: 1, name: 'Phones', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxj4KtasdPdJZGViM46mbB7x2ERKce14ojyQ&s' },
        { id: 2, name: 'Laptops', icon: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&h=150&fit=crop&q=80' },
        { id: 3, name: 'Consoles', icon: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=150&h=150&fit=crop&q=80' },
        { id: 4, name: 'Accessories', icon: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=150&h=150&fit=crop&q=80' }
    ]

    const brands = [
        { name: 'Apple', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
        { name: 'Samsung', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-7XzrWoxqTo43VxADuvQQCNNoCFoD5NNVQ&s' },
        { name: 'Google', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
        { name: 'Sony', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' }
    ]

    return (
        <section className="swap-section">
            <div className="swap-container">
                <div className="swap-header">
                    <h2 className="swap-title">Swap Portal</h2>
                    <p className="swap-subtitle">Find out how much your device is worth today.</p>
                </div>

                <div className="swap-steps">
                    <div className={`step ${activeStep >= 1 ? 'active' : ''}`}>
                        <span className="step-number">1</span>
                        <span className="step-label">Old Device</span>
                    </div>
                    <div className={`step ${activeStep >= 2 ? 'active' : ''}`}>
                        <span className="step-number">2</span>
                        <span className="step-label">Condition</span>
                    </div>
                    <div className={`step ${activeStep >= 3 ? 'active' : ''}`}>
                        <span className="step-number">3</span>
                        <span className="step-label">Quote</span>
                    </div>
                </div>

                <div className="swap-content">
                    <div className="swap-sidebar">
                        <h3 className="sidebar-title">CATEGORIES</h3>
                        <div className="category-list">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category.name)}
                                >
                                    <img src={category.icon} alt={category.name} className="category-image" />
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="swap-main">
                        <div className="brand-section">
                            <h3 className="section-title">Select Brand</h3>
                            <div className="brand-grid">
                                {brands.map((brand) => (
                                    <button
                                        key={brand.name}
                                        className={`brand-card ${selectedBrand === brand.name ? 'active' : ''}`}
                                        onClick={() => setSelectedBrand(brand.name)}
                                    >
                                        <img src={brand.icon} alt={brand.name} className="brand-logo" />
                                        <span className="brand-name">{brand.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="help-section">
                            <h3 className="help-title">Need help with your swap?</h3>
                            <p className="help-text">Chat with our experts for a custom quote.</p>
                            <button className="btn-custom-swap" onClick={handleCustomSwap}>Start Custom Swap →</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Swapside