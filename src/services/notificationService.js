/**
 * Notification API service.
 */
import api from './api';

const notificationService = {
    /**
     * Get all notifications
     */
    getNotifications: async (unreadOnly = false) => {
        const params = unreadOnly ? { unread: 'true' } : {};
        const response = await api.get('/notifications/', { params });
        return response.data;
    },

    /**
     * Get unread notifications count
     */
    /**
     * Get unread notifications count
     */
    getUnreadCount: async () => {
        const response = await api.get('/notifications/unread/count/');
        return response.data;
    },

    /**
     * Mark notification as read
     */
    markAsRead: async (notificationId) => {
        const response = await api.post(`/notifications/${notificationId}/read/`);
        return response.data;
    },

    /**
     * Mark all notifications as read
     */
    markAllAsRead: async () => {
        const response = await api.post('/notifications/mark-all-read/');
        return response.data;
    },

    /**
     * Delete a notification
     */
    deleteNotification: async (notificationId) => {
        const response = await api.delete(`/notifications/${notificationId}/delete/`);
        return response.data;
    },
};

export default notificationService;
