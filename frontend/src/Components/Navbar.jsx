import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import logo from '../assets/logo-removebg-preview.png'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleProtectedLink = (e, path) => {
        if (!isAuthenticated) {
            e.preventDefault()
            navigate('/signin')
        } else {
            navigate(path)
        }
    }

    const handleContactClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault()
            navigate('/signin')
        }
        // If authenticated, let the default href="#contact" behavior work
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to="/" className="navbar-logo-link" onClick={closeMenu}>
                        <div className="navbar-logo">
                            <img src={logo} alt="6ix Gadgets Logo" className="logo-icon" />
                        </div>
                    </Link>
                </div>

                <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={menuOpen ? 'active' : ''}></span>
                    <span className={menuOpen ? 'active' : ''}></span>
                    <span className={menuOpen ? 'active' : ''}></span>
                </button>

                <div className={`navbar-center ${menuOpen ? 'active' : ''}`}>
                    <ul className="nav-menu">
                        <li><a href="#" onClick={(e) => { handleProtectedLink(e, '/dashboard'); closeMenu(); }}>Buy</a></li>
                        <li><a href="#" onClick={(e) => { handleProtectedLink(e, '/dashboard'); closeMenu(); }}>Sell</a></li>
                        <li><Link to="/evaluation" onClick={closeMenu}>Swap Portal</Link></li>
                        <li><a href="#contact" onClick={(e) => { handleContactClick(e); closeMenu(); }}>Contact</a></li>
                        <li><Link to="/admin" style={{ color: '#EC7F13', fontWeight: 'bold' }} onClick={closeMenu}>Admin</Link></li>
                    </ul>
                </div>

                <div className="navbar-right">
                    {isAuthenticated ? (
                        <>
                            <span className="user-greeting">👤 {user?.firstName || 'User'}</span>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signin" className="signin-btn">👤Sign in</Link>
                        </>
                    )}
                    <button className="phone-btn">📞07062682010</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar