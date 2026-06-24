import React from 'react';

const Skeleton = ({
    width = '100%',
    height = '1rem',
    borderRadius = 'var(--radius-sm)',
    className = ''
}) => {
    return (
        <div
            className={`skeleton ${className}`}
            style={{
                width,
                height,
                borderRadius,
                backgroundColor: 'var(--bg-surface-hover)',
                animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
        >
            <style jsx="true">{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default Skeleton;
