import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const DeviceContext = createContext();

export const useDevices = () => {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error('useDevices must be used within a DeviceProvider');
    }
    return context;
};

export const DeviceProvider = ({ children }) => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5555' : '');
    const API_URL = `${API_BASE_URL}/api/devices`;

    // Fetch all devices
    const fetchDevices = async () => {
        try {
            if (!API_BASE_URL) {
                setError('VITE_API_URL is not configured for production');
                return;
            }

            setLoading(true);
            setError(null);
            const response = await axios.get(API_URL);
            if (response.data.status) {
                setDevices(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching devices:', err);
            setError(err.response?.data?.message || 'Failed to fetch devices');
        } finally {
            setLoading(false);
        }
    };

    // Create new device
    const createDevice = async (deviceData) => {
        try {
            if (!API_BASE_URL) {
                return { success: false, message: 'VITE_API_URL is not configured for production' };
            }

            setLoading(true);
            setError(null);
            const response = await axios.post(API_URL, deviceData);
            if (response.data.status) {
                setDevices([response.data.data, ...devices]);
                return { success: true, data: response.data.data };
            }
        } catch (err) {
            console.error('Error creating device:', err);
            const errorMessage = err.response?.data?.message || 'Failed to create device';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Update device
    const updateDevice = async (id, deviceData) => {
        try {
            if (!API_BASE_URL) {
                return { success: false, message: 'VITE_API_URL is not configured for production' };
            }

            setLoading(true);
            setError(null);
            const response = await axios.put(`${API_URL}/${id}`, deviceData);
            if (response.data.status) {
                setDevices(devices.map(device =>
                    device._id === id ? response.data.data : device
                ));
                return { success: true, data: response.data.data };
            }
        } catch (err) {
            console.error('Error updating device:', err);
            const errorMessage = err.response?.data?.message || 'Failed to update device';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Delete device
    const deleteDevice = async (id) => {
        try {
            if (!API_BASE_URL) {
                return { success: false, message: 'VITE_API_URL is not configured for production' };
            }

            setLoading(true);
            setError(null);
            const response = await axios.delete(`${API_URL}/${id}`);
            if (response.data.status) {
                setDevices(devices.filter(device => device._id !== id));
                return { success: true };
            }
        } catch (err) {
            console.error('Error deleting device:', err);
            const errorMessage = err.response?.data?.message || 'Failed to delete device';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Fetch devices on mount
    useEffect(() => {
        fetchDevices();
    }, []);

    const value = {
        devices,
        loading,
        error,
        fetchDevices,
        createDevice,
        updateDevice,
        deleteDevice
    };

    return (
        <DeviceContext.Provider value={value}>
            {children}
        </DeviceContext.Provider>
    );
};
