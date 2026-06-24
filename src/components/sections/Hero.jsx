import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/sections/Hero.css';

const Hero = () => {
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (address.trim()) {
            navigate(`/menu?q=${encodeURIComponent(address)}`);
        }
    };

    return (
        <section className="hero">
            <div className="hero-container">
                {/* LEFT CONTENT */}
                <div className="hero-left">
                    <h1 className="hero-headline">
                        Order food and more
                    </h1>

                    <p className="hero-subheadline">
                        Restaurants and grocery stores delivering near you
                    </p>

                    <form className="hero-search-form" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="e.g. 123 Main St, Gulberg, Lahore"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <button type="submit" className="search-btn">
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* RIGHT VISUAL */}
                <div className="hero-right">
                    <div className="visual-content">
                        <div className="fun-text">
                            <h3>DID<br />SOMEBODY<br />SAY</h3>
                        </div>

                        <div className="hero-image-container">
                            <img
                                src="/hero-food.png"
                                alt="Delicious food"
                                className="hero-food-img"
                            />
                        </div>

                        <div className="hero-brand-logo">
                            <span className="brand-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 10L12 2L21 10V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 22V12H15V22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span className="brand-text">FoodDash</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
