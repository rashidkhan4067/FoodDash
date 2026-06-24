import React from 'react';

const Alert = ({
    type = 'info', // success, error, warning, info
    title,
    children,
    className = '',
    onClose
}) => {
    const typeStyles = {
        success: {
            bg: 'var(--bg-success)',
            color: 'var(--color-success-hover)',
            border: 'var(--color-success)',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            )
        },
        error: {
            bg: 'var(--bg-error)',
            color: 'var(--color-error)',
            border: 'var(--color-error)',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            )
        },
        warning: {
            bg: 'var(--bg-warning)',
            color: 'var(--color-warning-hover)',
            border: 'var(--color-warning)',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            )
        },
        info: {
            bg: 'var(--bg-info)',
            color: 'var(--color-info-hover)',
            border: 'var(--color-info)',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            )
        }
    };

    const style = typeStyles[type] || typeStyles.info;

    return (
        <div
            className={`alert ${className}`}
            style={{
                backgroundColor: style.bg,
                color: style.color,
                borderLeft: `4px solid ${style.border}`,
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '1rem'
            }}
            role="alert"
        >
            <div className="alert-icon" style={{ marginTop: '2px' }}>
                {style.icon}
            </div>
            <div className="alert-content" style={{ flex: 1 }}>
                {title && (
                    <h5 style={{
                        margin: '0 0 0.25rem 0',
                        color: 'inherit',
                        fontSize: '1rem',
                        fontWeight: '600'
                    }}>
                        {title}
                    </h5>
                )}
                <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {children}
                </div>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'currentColor',
                        cursor: 'pointer',
                        padding: '4px',
                        opacity: 0.7
                    }}
                    aria-label="Close"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            )}
        </div>
    );
};

export default Alert;
