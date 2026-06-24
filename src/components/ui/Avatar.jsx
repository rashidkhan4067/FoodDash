import React, { useState } from 'react';

const Avatar = ({
    src,
    alt = 'User',
    size = 'md', // sm, md, lg, xl
    fallback,
    className = ''
}) => {
    const [hasError, setHasError] = useState(false);

    const sizeMap = {
        sm: '32px',
        md: '48px',
        lg: '64px',
        xl: '96px'
    };

    const actualSize = sizeMap[size] || size;
    const fontSizeMap = {
        sm: '0.875rem',
        md: '1.25rem',
        lg: '1.5rem',
        xl: '2.5rem'
    };

    const getInitials = (name) => {
        return name
            ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
            : '?';
    };

    return (
        <div
            className={`avatar ${className}`}
            style={{
                width: actualSize,
                height: actualSize,
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-surface-hover)',
                border: '2px solid var(--bg-surface)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontWeight: '600',
                fontSize: fontSizeMap[size] || '1rem',
                position: 'relative',
                flexShrink: 0
            }}
        >
            {!hasError && src ? (
                <img
                    src={src}
                    alt={alt}
                    onError={() => setHasError(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            ) : (
                <span>{fallback || getInitials(alt)}</span>
            )}
        </div>
    );
};

export default Avatar;
