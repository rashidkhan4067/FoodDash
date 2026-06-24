import React from 'react';
import { Card } from './index';

const CategoryCard = ({
    name,
    image,
    isActive,
    onClick,
    className = ''
}) => {
    return (
        <Card
            className={`category-card ${className}`}
            onClick={onClick}
            interactive={true}
            style={{
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                border: isActive ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                backgroundColor: isActive ? 'var(--bg-surface-hover)' : 'var(--bg-surface)',
                transition: 'all 0.2s ease'
            }}
        >
            <div
                className="category-image"
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-input)'
                }}
            >
                <img
                    src={image || '/assets/placeholder-category.png'}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <span style={{
                fontWeight: isActive ? '700' : '500',
                color: isActive ? 'var(--color-primary)' : 'var(--text-primary)'
            }}>
                {name}
            </span>
        </Card>
    );
};

export default CategoryCard;
