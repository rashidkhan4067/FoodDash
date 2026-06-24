/**
 * Payment API service.
 */
import api from './api';

const paymentService = {
    /**
     * Create a payment for an order
     */
    createPayment: async (orderData) => {
        const response = await api.post('/payments/create/', orderData);
        return response.data;
    },

    /**
     * Get payment for an order
     */
    getPaymentByOrder: async (orderId) => {
        const response = await api.get(`/payments/order/${orderId}/`);
        return response.data;
    },

    /**
     * Get all payments for current user
     */
    getUserPayments: async () => {
        const response = await api.get('/payments/');
        return response.data;
    },

    /**
     * Create payment intent (for Stripe)
     */
    createPaymentIntent: async (amount) => {
        const response = await api.post('/payments/intent/create/', { amount });
        return response.data;
    },
};

export default paymentService;
