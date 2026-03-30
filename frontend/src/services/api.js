const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5555' : '');

export const signup = async (userData) => {
    if (!API_BASE_URL) {
        throw new Error('VITE_API_URL is not configured for production');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const login = async (credentials) => {
    if (!API_BASE_URL) {
        throw new Error('VITE_API_URL is not configured for production');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
};
