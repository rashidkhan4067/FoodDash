import React from 'react';

const Button = ({
    children,
    variant = 'primary', // primary, secondary, outline, gradient, glass, ghost
    size = 'md', // sm, md, lg
    className = '',
    fullWidth = false,
    isLoading = false,
    disabled = false,
    type = 'button',
    leftIcon,
    rightIcon,
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = size !== 'md' ? `btn-${size}` : '';
    const widthClass = fullWidth ? 'btn-full' : '';

    return (
        <button
            type={type}
            className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
            disabled={disabled || isLoading}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            {...props}
        >
            {isLoading && (
                <div
                    className="spinner"
                    style={{
                        width: '1em',
                        height: '1em',
                        borderWidth: '2px',
                        borderTopColor: 'currentColor',
                    }}
                />
            )}
            {!isLoading && leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
        </button>
    );
};

export default Button;
