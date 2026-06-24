/**
 * Cart and Order API service.
 */
import api from './api';

const orderService = {
    // Cart operations
    getCart: async () => {
        const response = await api.get('/orders/cart/');
        return response.data;
    },

    addToCart: async (foodItemId, quantity = 1) => {
        const response = await api.post('/orders/cart/add/', {
            food_item_id: foodItemId,
            quantity,
        });
        return response.data;
    },

    updateCartItem: async (itemId, quantity) => {
        const response = await api.put(`/orders/cart/items/${itemId}/update/`, {
            quantity,
        });
        return response.data;
    },

    removeFromCart: async (itemId) => {
        const response = await api.delete(`/orders/cart/items/${itemId}/remove/`);
        return response.data;
    },

    clearCart: async () => {
        const response = await api.delete('/orders/cart/clear/');
        return response.data;
    },

    // Order operations
    createOrder: async (orderData) => {
        const response = await api.post('/orders/create/', orderData);
        return response.data;
    },

    getUserOrders: async () => {
        const response = await api.get('/orders/');
        return response.data;
    },

    getOrder: async (orderId) => {
        const response = await api.get(`/orders/${orderId}/`);
        return response.data;
    },

    // Admin operations
    getAllOrders: async () => {
        const response = await api.get('/orders/all/');
        return response.data;
    },

    updateOrderStatus: async (orderId, status) => {
        const response = await api.patch(`/orders/${orderId}/status/`, { status });
        return response.data;
    },
};

export default orderService;
