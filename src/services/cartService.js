import api from './api';

const handleResponse = (response) => response.data;

const handleError = (error) => {
    const errorData = error.response?.data || {};
    const message = errorData.message || errorData.detail || error.message || 'An error occurred';
    return { success: false, error: message, ...errorData };
};

const cartService = {
    // Get current cart
    getCart: async () => {
        try {
            const response = await api.get('/cart/');
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // Add item to cart
    addToCart: async (foodItemId, quantity = 1, specialInstructions = '') => {
        try {
            const response = await api.post('/cart/add/', {
                food_item_id: foodItemId,
                quantity,
                special_instructions: specialInstructions
            });
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // Update cart item quantity
    updateCartItem: async (itemId, quantity) => {
        try {
            const response = await api.patch(`/cart/items/${itemId}/`, {
                quantity
            });
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // Remove item from cart
    removeCartItem: async (itemId) => {
        try {
            const response = await api.delete(`/cart/items/${itemId}/remove/`);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // Clear cart
    clearCart: async () => {
        try {
            const response = await api.delete('/cart/clear/');
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // Place Order
    placeOrder: async (orderData) => {
        try {
            const response = await api.post('/orders/', orderData);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // Get Orders History
    getOrders: async () => {
        try {
            const response = await api.get('/orders/history/');
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // Get Single Order
    getOrder: async (id) => {
        try {
            const response = await api.get(`/orders/${id}/`);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // Pay for Order
    payOrder: async (orderId) => {
        try {
            const response = await api.post(`/orders/${orderId}/pay/`);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    }
};

export default cartService;
