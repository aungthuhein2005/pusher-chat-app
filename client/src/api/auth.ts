import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const register = async (name: string, email: string, password: string) => {
    return axios.post(`${API_URL}/register`, { name, email, password });
};

export const login = async (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
};

export const logout = async (token: string) => {
    return axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getProfile = async (token: string) => {
    return axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
