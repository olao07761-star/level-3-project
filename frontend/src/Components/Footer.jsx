import React from 'react'
import logo from '../assets/logo-removebg-preview.png'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Left Section - Logo & Description */}
                <div className="footer-section footer-brand">
                    <div className="footer-logo">
                        <img src={logo} alt="6ix Gadgets Logo" className="footer-logo-img" />

                    </div>
                    <p className="footer-description">
                        The ultimate destination for tech enthusiasts in Ibadan. We provide quality gadgets with flexible swap options to keep you up to date with technology.
                    </p>
                </div>

                {/* Middle Section - Quick Links */}
                <div className="footer-section">
                    <h4 className="footer-section-title">Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="#buy">Buy Gadgets</a></li>
                        <li><a href="#swap">Swap Portal</a></li>
                        <li><a href="#sell">Sell Your Device</a></li>
                        <li><a href="#repairs">Repairs</a></li>
                    </ul>
                </div>

                {/* Right Section - Store Info */}
                <div className="footer-section">
                    <h4 className="footer-section-title">Store Info</h4>
                    <ul className="footer-info">
                        <li><span>Challenge, Ibadan, Nigeria</span></li>
                        <li><span>Mon - Sat: 9am - 7pm</span></li>
                        <li><span>07062682010</span></li>
                        <li><span>@6ix_gadgets</span></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="footer-bottom">
                <p className="footer-copyright">© 2026 6ix Gadgets. All rights reserved.</p>
                <div className="footer-bottom-links">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                </div>
            </div>

            {/* Chat Button */}
            <button className="footer-chat-btn" aria-label="Chat with us">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </button>
        </footer>
    )
}

export default Footer