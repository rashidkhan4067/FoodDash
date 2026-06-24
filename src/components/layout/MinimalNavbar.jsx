import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useTheme } from '../../context/ThemeContext'; // Removed
import '../../styles/layout/MinimalNavbar.css';

const MinimalNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    // const { theme, toggleTheme } = useTheme(); // Removed

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        // Prevent scrolling when menu is open
        if (!menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    // Close menu on resize to avoid stuck state
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setMenuOpen(false);
                document.body.style.overflow = 'auto';
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <nav className="minimal-navbar">
                <div className="navbar-container">
                    {/* Logo (Left) */}
                    <Link to="/" className="navbar-logo">
                        <span className="logo-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 10L12 2L21 10V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10Z" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 22V12H15V22" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="logo-text">FoodDash</span>
                    </Link>

                    {/* Right Side Icons & Links */}
                    <div className="navbar-right">
                        {/* Desktop Links (Hidden on mobile) */}
                        <div className="desktop-links">
                        </div>

                        {/* Log in - Visible on all screens, positioned before hamburger on mobile */}
                        <Link to="/login" className="nav-icon-link">
                            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span>Log in</span>
                        </Link>

                        {/* Hamburger Menu Trigger */}
                        <button
                            className={`menu-trigger ${menuOpen ? 'active' : ''}`}
                            onClick={toggleMenu}
                            aria-label="Menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Modal Overlay / Menu */}
            {menuOpen && (
                <div className="menu-overlay" onClick={toggleMenu}>
                    <div className="menu-sidebar" onClick={(e) => e.stopPropagation()}>
                        <div className="menu-header">
                            <h2>My account</h2>
                            <button className="close-btn" onClick={toggleMenu}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="menu-content">
                            {/* Perks Banner */}
                            <div className="perks-banner">
                                <div className="perks-text">
                                    <h3>Join for more perks</h3>
                                    <ul>
                                        <li>Exclusive Pakistani deals</li>
                                        <li>Fast local delivery</li>
                                        <li>Order tracking</li>
                                    </ul>
                                </div>
                                <div className="perks-icon">🇵🇰🍗</div>

                                <div className="perks-actions">
                                    <Link to="/register" className="btn-create-account" onClick={toggleMenu}>Create account</Link>
                                    <Link to="/login" className="btn-login" onClick={toggleMenu}>Log in</Link>
                                </div>
                            </div>

                            {/* Menu Links */}
                            <div className="menu-links">
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MinimalNavbar;
