import React, { useState } from 'react';
import { Card, Button } from './index';
import { useCart } from '../../context/CartContext';

const FoodCard = ({
    item,
    className = ''
}) => {
    const { addToCart } = useCart();
    const [adding, setAdding] = useState(false);

    const handleAdd = async (e) => {
        e.stopPropagation();
        setAdding(true);
        await addToCart(item);
        setAdding(false);
    };
    const {
        name,
        image,
        description,
        price,
        final_price,
        discount_price
    } = item || {};

    // Display logic
    const displayPrice = final_price || price;
    const originalPrice = discount_price && final_price !== price ? price : null;

    return (
        <Card
            className={`food-card ${className}`}
            style={{
                padding: '12px',
                display: 'flex',
                gap: '16px',
                height: '100%',
                alignItems: 'center'
            }}
        >
            <div className="food-info" style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>{name}</h4>
                <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {description}
                </p>
                <div className="food-price-action" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="price">
                        {originalPrice ? (
                            <>
                                <span style={{ fontWeight: 'bold', color: 'var(--color-primary)', marginRight: '8px' }}>
                                    ${displayPrice}
                                </span>
                                <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    ${originalPrice}
                                </span>
                            </>
                        ) : (
                            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                                ${displayPrice}
                            </span>
                        )}
                    </div>
                    <Button size="sm" onClick={handleAdd} variant="outline" disabled={adding}>
                        {adding ? '...' : 'Add'}
                    </Button>
                </div>
            </div>

            <div className="food-image" style={{ width: '100px', height: '100px', flexShrink: 0 }}>
                <img
                    src={image || '/assets/placeholder-food.jpg'}
                    alt={name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-md)'
                    }}
                />
            </div>
        </Card>
    );
};

export default FoodCard;
