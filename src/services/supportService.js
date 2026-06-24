import api from './api';

const supportService = {
    // Submit contact form
    submitContact: async (data) => {
        try {
            const response = await api.post('/support/contact/', data);
            return { success: true, ...response.data };
        } catch (error) {
            console.error('Submit contact error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to send message'
            };
        }
    },

    // Submit feedback
    submitFeedback: async (data) => {
        try {
            const response = await api.post('/support/feedback/submit/', data);
            return { success: true, ...response.data };
        } catch (error) {
            console.error('Submit feedback error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to submit feedback'
            };
        }
    },

    // Get feedbacks
    getFeedbacks: async () => {
        try {
            const response = await api.get('/support/feedback/');
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Get feedbacks error:', error);
            return { success: false, data: [] };
        }
    },

    // Get FAQs
    getFAQs: async () => {
        try {
            const response = await api.get('/support/faqs/');
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Get FAQs error:', error);
            return { success: false, data: [] };
        }
    }
};

export default supportService;
