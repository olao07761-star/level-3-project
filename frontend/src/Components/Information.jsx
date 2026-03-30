import React from 'react'
import './Information.css'

const Information = () => {
    return (
        <section className="information-section" id="contact">
            <div className="information-container">
                <div className="info-grid">
                    {/* Visit Store Card */}
                    <div className="info-card">
                        <div className="info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EC7F13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                        <h3 className="info-title">Visit Store</h3>
                        <p className="info-description">
                            CHALLENGE, IBADAN. Nigeria's #1 Tech Hub.
                        </p>
                        <a href="#directions" className="info-link">
                            Get Directions
                        </a>
                    </div>

                    {/* Instagram Card */}
                    <div className="info-card">
                        <div className="info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EC7F13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <circle cx="17.5" cy="6.5" r="1.5"></circle>
                            </svg>
                        </div>
                        <h3 className="info-title">Instagram</h3>
                        <p className="info-description">
                            Follow us @6IX_GADGETS for daily updates.
                        </p>
                        <a href="#instagram" className="info-link">
                            Follow Us
                        </a>
                    </div>

                    {/* Call/WhatsApp Card */}
                    <div className="info-card">
                        <div className="info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EC7F13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <h3 className="info-title">Call/WhatsApp</h3>
                        <p className="info-description">
                            Chat with us anytime at 07062682010.
                        </p>
                        <a href="#call" className="info-link call-now">
                            Call Now
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Information