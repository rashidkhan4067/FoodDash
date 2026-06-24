import React from 'react';

const Spinner = ({ size = 'md', color = 'primary', className = '' }) => {
    // Map sizes to pixel values or classes
    const sizeMap = {
        sm: '16px',
        md: '24px',
        lg: '40px',
        xl: '64px'
    };

    const actualSize = sizeMap[size] || size;

    // Map colors to CSS variables
    const colorMap = {
        primary: 'var(--color-primary)',
        white: '#ffffff',
        secondary: 'var(--text-secondary)',
        current: 'currentColor'
    };

    const actualColor = colorMap[color] || color;

    return (
        <div
            className={`spinner ${className}`}
            style={{
                width: actualSize,
                height: actualSize,
                borderColor: 'var(--border-medium)',
                borderTopColor: actualColor,
                borderWidth: size === 'sm' ? '2px' : '3px'
            }}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;
