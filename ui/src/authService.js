// src/services/authService.js

import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_URL = 'https://localhost:7129/api/Auth/';

const register = (username, password) => {
    return axios.post(API_URL + 'register', { username, password });
};

const login = (username, password) => {
    return axios.post(API_URL + 'login', { username, password })
        .then(response => {
            if (response.data.token) {
                response.data.username = username;
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const isAuthenticated = () => {
    const user = getCurrentUser();
    if (user && user.token) {
        const decodedToken = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
            return true;
        } else {
            logout();
            return false;
        }
    }
    return false;
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
    isAuthenticated
};
