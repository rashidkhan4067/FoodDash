import api from './api';

const riderService = {
    getAvailableOrders: async () => {
        const response = await api.get('/rider/available/');
        return response.data;
    },

    getMyOrders: async () => {
        const response = await api.get('/rider/orders/');
        return response.data;
    },

    acceptOrder: async (orderId) => {
        const response = await api.post(`/rider/orders/${orderId}/accept/`);
        return response.data;
    },

    updateStatus: async (orderId, status) => {
        const response = await api.post(`/rider/orders/${orderId}/status/`, { status });
        return response.data;
    }
};

export default riderService;
