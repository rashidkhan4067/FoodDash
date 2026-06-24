import React, { useState } from 'react';
import { Button, Modal } from '../ui';
import { FaStar } from 'react-icons/fa';
import reviewService from '../../services/reviewService';
import { useToast } from '../../context/ToastContext';

const ReviewModal = ({ isOpen, onClose, restaurantId, restaurantName, foodItem, onSubmitSuccess }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const targetName = foodItem ? foodItem.name : restaurantName;
    const isFood = !!foodItem;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please select a rating star.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                rating,
                review
            };
            if (isFood) {
                payload.food_item = foodItem.id;
            } else {
                payload.restaurant = restaurantId;
            }

            await reviewService.createRating(payload);
            toast.success("Review submitted!");
            if (onSubmitSuccess) onSubmitSuccess();
            onClose();
        } catch (error) {
            console.error("Review error", error);
            toast.error("Failed to submit review.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={onClose}>
            <div style={{
                background: 'white', padding: '2rem', borderRadius: '12px',
                width: '90%', maxWidth: '500px', position: 'relative'
            }} onClick={e => e.stopPropagation()}>

                <h2 style={{ marginBottom: '1rem' }}>Rate {targetName}</h2>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                    How was your experience? Your feedback helps improves our service.
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index} style={{ cursor: 'pointer', margin: '0 4px' }}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        style={{ display: 'none' }}
                                    />
                                    <FaStar
                                        size={32}
                                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                        style={{ transition: 'color 0.2s' }}
                                    />
                                </label>
                            );
                        })}
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <textarea
                            className="input-field"
                            placeholder="Write your review here (optional)..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Review'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
