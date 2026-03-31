import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import logo from '../assets/logo-removebg-preview.png'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const isAdminSide = location.pathname.startsWith('/admin')
    const isAdminPage = location.pathname === '/admin'
    const isLandingPage = location.pathname === '/'

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

    const handleAdminLogout = () => {
        localStorage.removeItem('adminAuthenticated')
        localStorage.removeItem('adminEmail')
        localStorage.removeItem('adminAuthExpiry')
        navigate('/admin-auth')
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
        <nav className={`navbar ${isAdminSide ? 'admin-navbar' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to={isAdminSide ? '/admin' : '/'} className="navbar-logo-link" onClick={closeMenu}>
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
                    {isAdminSide ? (
                        <ul className="nav-menu admin-nav-menu">
                            <li><Link to="/admin" onClick={closeMenu}>Admin Dashboard</Link></li>
                            <li><Link to="/" onClick={closeMenu}>Main Website</Link></li>
                        </ul>
                    ) : (
                        <ul className="nav-menu">
                            <li><a href="#" onClick={(e) => { handleProtectedLink(e, '/dashboard'); closeMenu(); }}>Buy</a></li>
                            <li><a href="#" onClick={(e) => { handleProtectedLink(e, '/dashboard'); closeMenu(); }}>Sell</a></li>
                            <li><Link to="/evaluation" onClick={closeMenu}>Swap Portal</Link></li>
                            <li><a href="#contact" onClick={(e) => { handleContactClick(e); closeMenu(); }}>Contact</a></li>
                        </ul>
                    )}
                </div>

                <div className="navbar-right">
                    {isAdminSide ? (
                        <>
                            <span className="user-greeting admin-greeting">🛡️ Admin {isAdminPage ? (localStorage.getItem('adminEmail') || '') : ''}</span>
                            {isAdminPage ? (
                                <button onClick={handleAdminLogout} className="logout-btn">Admin Logout</button>
                            ) : (
                                <Link to="/" className="signin-btn">Back to Site</Link>
                            )}
                        </>
                    ) : (
                        <>
                            {isAuthenticated ? (
                                <>
                                    {!isLandingPage && <span className="user-greeting">👤 {user?.firstName || 'User'}</span>}
                                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/signin" className="signin-btn">👤Sign in</Link>
                                </>
                            )}
                            <button className="phone-btn">📞07062682010</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar