import React, { useState } from 'react'
import './Dashboard.css'
import { useDevices } from '../context/DeviceContext'

const Dashboard = () => {
    const [activeNav, setActiveNav] = useState('market-prices')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { devices } = useDevices()

    return (
        <div className="dashboard">
            {/* Backdrop Overlay for Mobile */}
            {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>}

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
              
                <nav className="nav-list">
                    <div className={`nav-item ${activeNav === 'market-prices' ? 'active' : ''}`} onClick={() => { setActiveNav('market-prices'); if (window.innerWidth <= 1024) setSidebarOpen(false); }}>
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="2" x2="12" y2="22"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        <span>Market Prices</span>
                    </div>
                   
                  
                   
                </nav>

               
            </aside>

            {/* Main Content */}
            <main className="main">
                {/* Topbar */}
                <div className="topbar">
                    <button className={`mobile-menu-btn ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                 
                </div>

                {/* Market Price Index Table */}
                <div className="section">
                    <div className="section-header-with-actions">
                        <div>
                            <h2>Live Market Price Index</h2>
                            <p>Real-time device valuation based on market & usage patterns</p>
                        </div>
                        <div className="table-actions">
                            <button className="filter-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                </svg>
                                Filter
                            </button>
                            <button className="export-btn">Export Data</button>
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="price-table">
                            <thead>
                                <tr>
                                    <th>DEVICE NAME</th>
                                    <th>MARKET VALUE (₦)</th>
                                    <th>TRADE-IN VALUE (₦)</th>
                                    <th>% TREND</th>
                                    <th>AVAILABILITY</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map((device, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div className="device-info">
                                                <img
                                                    src={device.image}
                                                    alt={device.name}
                                                    className="device-image"
                                                    style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
                                                />
                                                <div>
                                                    <div className="device-name">{device.name}</div>
                                                    <div style={{ fontSize: '11px', color: '#7b8494' }}>
                                                        {device.color} • {device.storage}
                                                    </div>
                                                    <div style={{ fontSize: '10px', color: '#a0a8b4', marginTop: '2px' }}>
                                                        {device.condition}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="value-cell">{device.marketValue}</td>
                                        <td className="value-cell" style={{ color: '#ff9800', fontWeight: '600' }}>{device.tradeInValue}</td>
                                        <td>
                                            <span className={`trend ${device.trend.includes('-') ? 'negative' : 'positive'}`}>
                                                {device.trend.includes('-') ? '↓' : '↑'} {device.trend}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="availability" style={{ background: device.availabilityColor + '20', color: device.availabilityColor }}>
                                                {device.availability}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="send-btn">Send</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="table-footer">
                        <div className="showing-text">SHOWING 1-5 OF 254 ITEMS</div>
                        <div className="pagination">
                            <button className="prev-btn">Previous</button>
                            <button className="page-btn active">1</button>
                            <button className="page-btn">2</button>
                            <button className="page-btn">3</button>
                            <button className="next-btn">Next</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard