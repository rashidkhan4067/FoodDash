import React from 'react';

const Input = ({
    label,
    error,
    type = 'text',
    className = '',
    containerClassName = '',
    id,
    ...props
}) => {
    const inputId = id || props.name || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`input-group ${containerClassName}`}>
            {label && (
                <label htmlFor={inputId} className="input-label">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                className={`input-field ${error ? 'input-error' : ''} ${className}`}
                {...props}
            />
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default Input;
