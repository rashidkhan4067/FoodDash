import React from 'react';

const Card = ({
    children,
    className = '',
    padding = true,
    variant = 'default', // default, glass, elevated
    interactive = false,
    ...props
}) => {
    const variantClass = variant !== 'default' ? `card-${variant}` : '';
    const interactiveClass = interactive || props.onClick ? 'card-interactive' : '';

    return (
        <div
            className={`card ${variantClass} ${interactiveClass} ${className}`}
            style={!padding ? { padding: 0 } : {}}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
