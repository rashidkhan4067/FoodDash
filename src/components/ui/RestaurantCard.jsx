import React from 'react';
import { Card, Badge } from './index';
import { FaStar, FaClock, FaMotorcycle } from 'react-icons/fa';

const RestaurantCard = ({
    restaurant,
    onClick,
    className = ''
}) => {
    // Safe destructuring with defaults
    const {
        name = 'Restaurant',
        banner,
        logo,
        cuisine_type = 'General',
        rating = 'N/A',
        delivery_time = '30-45',
        delivery_fee = '0.00',
        min_order,
        is_promoted = false
    } = restaurant || {};

    const image = banner || logo;

    return (
        <Card
            className={`restaurant-card ${className}`}
            onClick={onClick}
            interactive={true}
            style={{
                padding: 0,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: 'none',
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
        >
            {/* Image Container */}
            <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                <img
                    src={image || '/assets/placeholder-restaurant.jpg'}
                    alt={name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Gradient Overlay for Text Readability */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)'
                }}></div>

                {/* Promoted Badge */}
                {is_promoted && (
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        zIndex: 10,
                        backgroundColor: '#FF6B6B',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}>
                        Promoted
                    </div>
                )}

                {/* Rating Badge (Bottom Right) */}
                <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'white',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    color: '#333'
                }}>
                    <FaStar color="#FFD700" size={12} /> {rating}
                </div>

                {/* Delivery Time (Bottom Left over image) */}
                <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    <FaClock size={12} /> {delivery_time} min
                </div>
            </div>

            {/* Content Container */}
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h3 style={{
                        margin: 0,
                        fontSize: '1.15rem',
                        fontWeight: '700',
                        color: '#1a1a1a',
                        lineHeight: 1.3
                    }}>
                        {name}
                    </h3>
                </div>

                <p style={{
                    margin: '0 0 12px 0',
                    color: '#6b7280', // Gray-500
                    fontSize: '0.9rem',
                    fontWeight: '500'
                }}>
                    {cuisine_type}
                </p>

                <div style={{
                    marginTop: 'auto',
                    borderTop: '1px solid #f3f4f6',
                    paddingTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '0.85rem',
                    color: '#4b5563' // Gray-600
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaMotorcycle color="#10b981" />
                        {parseFloat(delivery_fee) === 0 ? <span style={{ color: '#10b981', fontWeight: '600' }}>Free Delivery</span> : `$${delivery_fee} Delivery`}
                    </span>
                    {min_order > 0 && (
                        <span>Min. ${min_order}</span>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default RestaurantCard;
