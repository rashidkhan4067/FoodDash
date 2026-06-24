import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { API_BASE_URL } from '../services/api';
import authService from '../services/authService';
import axios from 'axios';
import { isTokenExpired } from '../utils/jwt';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (storedUser && token) {
                // Check if access token is valid
                if (!isTokenExpired(token)) {
                    setUser(JSON.parse(storedUser));
                }
                // If access token expired but we have refresh token, try to refresh
                else if (refreshToken) {
                    if (!isTokenExpired(refreshToken)) {
                        try {
                            const response = await axios.post(`${API_BASE_URL}/accounts/token/refresh/`, {
                                refresh: refreshToken
                            });

                            const { access } = response.data;
                            localStorage.setItem('accessToken', access);
                            // Optionally update stored user if needed, or just keep existing
                            setUser(JSON.parse(storedUser));
                        } catch (error) {
                            console.error('Failed to refresh token on init:', error);
                            logout();
                        }
                    } else {
                        // Refresh token is also expired
                        logout();
                    }
                } else {
                    // No valid tokens
                    logout();
                }
            } else {
                setLoading(false);
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const result = await authService.login(credentials);
            if (result.success) {
                const { user, tokens } = result.data;
                localStorage.setItem('accessToken', tokens.access);
                localStorage.setItem('refreshToken', tokens.refresh);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                return { success: true };
            }
            return { success: false, message: 'Invalid response' };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.response?.data?.message || 'Login failed',
                details: error.response?.data?.error?.details || error.response?.data?.errors
            };
        }
    };

    const register = async (userData) => {
        try {
            const result = await authService.register(userData);
            if (result.success) {
                return { success: true };
            }
            return { success: false, message: 'Registration failed' };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.error?.message || 'Registration failed',
                details: error.response?.data?.error?.details
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    const googleLogin = async (token) => {
        try {
            const result = await authService.googleLogin(token);
            if (result.success) {
                const { user, tokens } = result.data;
                localStorage.setItem('accessToken', tokens.access);
                localStorage.setItem('refreshToken', tokens.refresh);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                return { success: true };
            }
            return { success: false, message: 'Google login failed' };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.response?.data?.error?.message || 'Google login failed'
            };
        }
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthenticated: !!user,
            isAdmin: user?.is_staff || false,
            login,
            register,
            logout,
            googleLogin,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
