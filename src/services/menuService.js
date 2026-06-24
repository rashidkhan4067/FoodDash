/**
 * Menu API service.
 */
import api from './api';

const menuService = {
    /**
     * Get all categories
     */
    getCategories: async () => {
        const response = await api.get('/categories/');
        return response.data;
    },

    /**
     * Get all restaurants
     */
    getRestaurants: async (params = {}) => {
        const response = await api.get('/restaurants/', { params });
        return response.data;
    },

    /**
     * Get restaurant details by slug
     */
    getRestaurant: async (slug) => {
        const response = await api.get(`/restaurants/${slug}/`);
        return response.data;
    },

    /**
     * Get restaurant menu
     */
    getRestaurantMenu: async (slug, params = {}) => {
        const response = await api.get(`/restaurants/${slug}/menu/`, { params });
        return response.data;
    },

    /**
     * Get food items (global search/filter)
     */
    getFoodItems: async (params = {}) => {
        const response = await api.get('/food-items/', { params });
        return response.data;
    },

    /**
     * Get single food item
     */
    getFoodItem: async (id) => {
        const response = await api.get(`/food-items/${id}/`);
        return response.data;
    },
};

export default menuService;
