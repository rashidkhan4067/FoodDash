import api from './api';

const reviewService = {
    /**
     * Create a rating/review
     * @param {Object} data - { restaurant: id, food_item: id, rating: 1-5, review: string }
     */
    createRating: async (data) => {
        const response = await api.post('/food/ratings/create/', data);
        return response.data;
    }
};

export default reviewService;
