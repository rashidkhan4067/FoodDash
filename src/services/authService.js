/**
 * Authentication API service.
 */
import api from './api';

const authService = {
    /**
     * Register a new user
     */
    register: async (userData) => {
        const response = await api.post('/accounts/register/', userData);
        return response.data;
    },

    /**
     * Login user
     */
    login: async (credentials) => {
        const response = await api.post('/accounts/login/', credentials);
        return response.data;
    },

    /**
     * Request Password Reset Link
     */
    requestPasswordReset: async (email) => {
        const response = await api.post('/accounts/password/reset/', { email });
        return response.data;
    },

    /**
     * Confirm Password Reset
     */
    confirmPasswordReset: async (data) => {
        // data: { uid, token, password, password_confirm }
        const response = await api.post('/accounts/password/reset/confirm/', data);
        return response.data;
    },

    /**
     * Login with Google Token
     */
    googleLogin: async (token) => {
        console.log("authService.googleLogin sending token:", token);
        const response = await api.post('/accounts/google/', { token });
        return response.data;
    },

    /**
     * Get current user profile
     */
    getProfile: async () => {
        const response = await api.get('/accounts/me/'); // Changed from /profile/ to /me/ based on urls.py
        return response.data;
    },

    /**
     * Update user profile
     * @param {Object|FormData} profileData - Profile data to update
     */
    updateProfile: async (profileData) => {
        const config = {};
        if (profileData instanceof FormData) {
            config.headers = { 'Content-Type': 'multipart/form-data' };
        }

        const response = await api.put('/accounts/profile/', profileData, config); // Backend uses /profile/ for update
        return response.data;
    },

    /**
     * Change password
     */
    changePassword: async (passwordData) => {
        const response = await api.post('/accounts/change-password/', passwordData);
        return response.data;
    },

    /**
     * Delete account
     */
    deleteAccount: async () => {
        const response = await api.delete('/accounts/profile/delete/');
        return response.data;
    },

    /**
     * Verify email with token
     */
    verifyEmail: async (token) => {
        const response = await api.post(`/accounts/verify-email/${token}/`);
        return response.data;
    },

    /**
     * Resend verification email
     */
    resendVerification: async (email) => {
        const response = await api.post('/accounts/resend-verification/', { email });
        return response.data;
    },
};

export default authService;
