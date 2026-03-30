import React, { useState } from 'react';
import './AdminPage.css';
import { useDevices } from '../context/DeviceContext';

const AdminPage = () => {
    const { devices, loading, createDevice, updateDevice, deleteDevice } = useDevices();

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentDevice, setCurrentDevice] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        color: '',
        storage: '',
        condition: '',
        marketValue: '',
        tradeInValue: '',
        trend: '',
        availability: '',
        availabilityColor: '#10b981'
    });

    const resetForm = () => {
        setFormData({
            name: '',
            image: '',
            color: '',
            storage: '',
            condition: '',
            marketValue: '',
            tradeInValue: '',
            trend: '',
            availability: '',
            availabilityColor: '#10b981'
        });
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const handleAddDevice = () => {
        setModalMode('add');
        resetForm();
        setCurrentDevice(null);
        setShowModal(true);
    };

    const handleEditDevice = (device) => {
        setModalMode('edit');
        setCurrentDevice(device);
        setFormData({
            name: device.name,
            image: device.image,
            color: device.color,
            storage: device.storage,
            condition: device.condition,
            marketValue: device.marketValue,
            tradeInValue: device.tradeInValue,
            trend: device.trend,
            availability: device.availability,
            availabilityColor: device.availabilityColor
        });
        setShowModal(true);
    };

    const handleDeleteDevice = async (device) => {
        if (window.confirm(`Are you sure you want to delete ${device.name}?`)) {
            const result = await deleteDevice(device._id);
            if (result.success) {
                showNotification('Device deleted successfully!', 'success');
            } else {
                showNotification(result.message || 'Failed to delete device', 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (modalMode === 'add') {
            const result = await createDevice(formData);
            if (result.success) {
                showNotification('Device added successfully!', 'success');
                setShowModal(false);
                resetForm();
            } else {
                showNotification(result.message || 'Failed to add device', 'error');
            }
        } else {
            const result = await updateDevice(currentDevice._id, formData);
            if (result.success) {
                showNotification('Device updated successfully!', 'success');
                setShowModal(false);
                resetForm();
            } else {
                showNotification(result.message || 'Failed to update device', 'error');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredDevices = devices.filter(device =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.storage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-page">
            {/* Notification */}
            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            {/* Header */}
            <div className="admin-header">
                <div className="admin-header-content">
                    <div>
                        <h1>Device Management</h1>
                        <p>Add, edit, or remove devices from your inventory</p>
                    </div>
                    <button className="add-device-btn" onClick={handleAddDevice}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add New Device
                    </button>
                </div>
            </div>

            {/* Search and Stats */}
            <div className="admin-controls">
                <div className="search-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search devices by name, color, or storage..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-label">Total Devices</div>
                        <div className="stat-value">{devices.length}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">In Stock</div>
                        <div className="stat-value">
                            {devices.filter(d => d.availability.toLowerCase().includes('stock')).length}
                        </div>
                    </div>
                </div>
            </div>

            {/* Devices Grid */}
            <div className="devices-container">
                {loading && <div className="loading-spinner">Loading...</div>}

                {!loading && filteredDevices.length === 0 && (
                    <div className="empty-state">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        <h3>No devices found</h3>
                        <p>Add your first device to get started</p>
                        <button className="add-device-btn" onClick={handleAddDevice}>
                            Add Device
                        </button>
                    </div>
                )}

                <div className="devices-grid">
                    {filteredDevices.map(device => (
                        <div key={device._id} className="device-card">
                            <div className="device-card-image">
                                <img src={device.image} alt={device.name} />
                                <span className="device-trend" style={{
                                    background: device.trend.includes('-') ? '#ef444420' : '#10b98120',
                                    color: device.trend.includes('-') ? '#ef4444' : '#10b981'
                                }}>
                                    {device.trend.includes('-') ? '↓' : '↑'} {device.trend}
                                </span>
                            </div>
                            <div className="device-card-content">
                                <h3>{device.name}</h3>
                                <div className="device-specs">
                                    <span className="spec-badge">{device.color}</span>
                                    <span className="spec-badge">{device.storage}</span>
                                    <span className="spec-badge">{device.condition}</span>
                                </div>
                                <div className="device-prices">
                                    <div className="price-item">
                                        <span className="price-label">Market Value</span>
                                        <span className="price-value">{device.marketValue}</span>
                                    </div>
                                    <div className="price-item">
                                        <span className="price-label">Trade-In</span>
                                        <span className="price-value trade-in">{device.tradeInValue}</span>
                                    </div>
                                </div>
                                <div className="device-availability">
                                    <span className="availability-badge" style={{
                                        background: device.availabilityColor + '20',
                                        color: device.availabilityColor
                                    }}>
                                        {device.availability}
                                    </span>
                                </div>
                                <div className="device-actions">
                                    <button className="edit-btn" onClick={() => handleEditDevice(device)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                        Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDeleteDevice(device)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{modalMode === 'add' ? 'Add New Device' : 'Edit Device'}</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Device Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., iPhone 14 Pro"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Image URL *</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Color *</label>
                                    <input
                                        type="text"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Space Black"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Storage *</label>
                                    <input
                                        type="text"
                                        name="storage"
                                        value={formData.storage}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 256GB"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Condition *</label>
                                    <select
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Market Value *</label>
                                    <input
                                        type="text"
                                        name="marketValue"
                                        value={formData.marketValue}
                                        onChange={handleInputChange}
                                        placeholder="e.g., ₦850,000"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Trade-In Value *</label>
                                    <input
                                        type="text"
                                        name="tradeInValue"
                                        value={formData.tradeInValue}
                                        onChange={handleInputChange}
                                        placeholder="e.g., ₦680,000"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Trend *</label>
                                    <input
                                        type="text"
                                        name="trend"
                                        value={formData.trend}
                                        onChange={handleInputChange}
                                        placeholder="e.g., +12.4% or -5.2%"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Availability *</label>
                                    <select
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="In Stock">In Stock</option>
                                        <option value="Low Stock">Low Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                        <option value="Pre-Order">Pre-Order</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Availability Color *</label>
                                    <select
                                        name="availabilityColor"
                                        value={formData.availabilityColor}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="#10b981">Green (In Stock)</option>
                                        <option value="#f59e0b">Orange (Low Stock)</option>
                                        <option value="#ef4444">Red (Out of Stock)</option>
                                        <option value="#3b82f6">Blue (Pre-Order)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Saving...' : (modalMode === 'add' ? 'Add Device' : 'Update Device')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
