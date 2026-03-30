import api from "../lib/api";

export const signUpService = async (userData) => {
    try {
        const response = await api("/api/user/signup", "POST", userData);
        return response;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const loginService = async (credentials) => {
    try {
        const response = await api("/api/user/login", "POST", credentials);
        return response;
    } catch (err) {
        throw new Error(err.message);
    }
};