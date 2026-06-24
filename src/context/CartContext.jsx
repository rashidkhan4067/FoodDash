import React, { createContext, useContext, useState, useEffect } from 'react';
import cartService from '../services/cartService';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const { success: toastSuccess, error: toastError } = useToast();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch cart on mount or auth change
    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [isAuthenticated]);

    const fetchCart = async () => {
        setLoading(true);
        const response = await cartService.getCart();
        if (response.success) {
            setCart(response.data);
        }
        setLoading(false);
    };

    const addToCart = async (foodItem, quantity = 1) => {
        if (!isAuthenticated) {
            // TODO: Handle guest cart later if needed
            window.location.href = '/login';
            return;
        }

        // Optimistic UI update or wait for server? Wait for server to ensure validation (restaurant check)
        const response = await cartService.addToCart(foodItem.id, quantity);

        if (response.success) {
            setCart(response.data);
            toastSuccess(`Added ${foodItem.name} to cart`);
            return true;
        } else {
            // Handle specific errors like "Different restaurant"
            console.error('Add to cart failed', response);

            // Check if there's a restaurant conflict
            if (response.current_restaurant && response.new_restaurant) {
                // Show custom error with option to clear cart
                const message = `Your cart has items from ${response.current_restaurant}. Clear cart to order from ${response.new_restaurant}?`;
                if (window.confirm(message)) {
                    await clearCart();
                    toastSuccess('Cart cleared! You can now add items from the new restaurant.');
                    // Try adding again
                    return addToCart(foodItem, quantity);
                }
                return false;
            }

            toastError(typeof response.error === 'string' ? response.error : 'Failed to add to cart');
            return false;
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return removeFromCart(itemId);

        const response = await cartService.updateCartItem(itemId, quantity);
        if (response.success) {
            setCart(response.data);
        }
    };

    const removeFromCart = async (itemId) => {
        const response = await cartService.removeCartItem(itemId);
        if (response.success) {
            // If empty, backend might return empty cart or 204
            // Usually returns updated cart
            fetchCart();
        }
    };

    const clearCart = async () => {
        const response = await cartService.clearCart();
        if (response.success) {
            setCart(null); // Or empty cart object
            fetchCart();
        }
    };

    const totalItems = cart?.total_items || 0;
    const cartTotal = cart?.total || 0;

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            totalItems,
            cartTotal,
            fetchCart,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
