import { Link } from 'react-router-dom';

const MinimalHeader = () => {
    return (
        <header style={{
            backgroundColor: '#ffffff',
            padding: '1rem 2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center'
        }}>
            <Link to="/" style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#ff8000'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🍽️</span>
                <span style={{
                    fontSize: '1.5rem',
                    fontWeight: '900',
                    fontStyle: 'italic',
                    fontFamily: "'Takeaway Sans', sans-serif"
                }}>
                    FoodDash
                </span>
            </Link>
        </header>
    );
};

export default MinimalHeader;
