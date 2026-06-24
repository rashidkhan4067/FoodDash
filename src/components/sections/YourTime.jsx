import { useState } from 'react';
import '../../styles/sections/YourTime.css';

const YourTime = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const cards = [
        {
            id: 1,
            title: "Loyalty rewards",
            icon: (
                <svg viewBox="0 0 64 64" fill="none" className="card-icon-svg">
                    {/* Rosette ribbon style */}
                    <path d="M32 8L37 18H48L40 24L43 34L32 28L21 34L24 24L16 18H27L32 8Z" stroke="#FF8000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M32 45V58L24 53L16 58V45" stroke="#FF8000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M32 45V58L40 53L48 58V45" stroke="#FF8000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="32" cy="24" r="14" stroke="#FF8000" strokeWidth="2.5" />
                    <path d="M32 20C33.5 19 35.5 19 37 20.5C38.5 22 38.5 24 37 25.5L32 30L27 25.5C25.5 24 25.5 22 27 20.5C28.5 19 30.5 19 32 20Z" fill="#FF8000" stroke="none" />
                </svg>
            ),
            items: [
                <span>Collect <a href="#">reward points</a>, unlock exclusive deals, and stay updated with our latest news</span>
            ]
        },
        {
            id: 2,
            title: "Our commitment",
            icon: (
                <svg viewBox="0 0 64 64" fill="none" className="card-icon-svg">
                    {/* Chat bubble with Star */}
                    <path d="M10 16C10 11.5817 13.5817 8 18 8H46C50.4183 8 54 11.5817 54 16V40C54 44.4183 50.4183 48 46 48H18L10 56V16Z" stroke="#FF8000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M32 20L34.5 25L40 26L36 30.2L37 36L32 33.6L27 36L28 30.2L24 26L29.5 25L32 20Z" fill="#FF8000" stroke="none" />
                </svg>
            ),
            items: [
                "Top-tier customer support",
                "Genuine reviews from real foodies"
            ]
        },
        {
            id: 3,
            title: "Your perk's",
            icon: (
                <svg viewBox="0 0 64 64" fill="none" className="card-icon-svg">
                    {/* Scalloped Badge / Seal */}
                    <path d="M32 6L36.5 10.5L42.5 9.5L44.5 15.5L50.5 17L49.5 23L54 27L50.5 32L54 37L49.5 41L50.5 47L44.5 48.5L42.5 54.5L36.5 53.5L32 58L27.5 53.5L21.5 54.5L19.5 48.5L13.5 47L14.5 41L10 37L13.5 32L10 27L14.5 23L13.5 17L19.5 15.5L21.5 9.5L27.5 10.5L32 6Z" stroke="#FF8000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M32 24L34.5 29L40 29.8L36 33.7L37.2 39.2L32 36.5L26.8 39.2L28 33.7L24 29.8L29.5 29L32 24Z" stroke="#FF8000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            items: [
                "Thousands of restaurants nearby",
                "Flexible payment options",
                "Order anytime, on any device"
            ]
        }
    ];

    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setCurrentSlide(index);
    };

    return (
        <section className="your-time-section">
            <div className="yt-container">
                <div className="yt-header">
                    <span className="yt-brand">FoodDash</span>
                    <h2 className="yt-title">FoodDash Time</h2>
                </div>

                <div className="yt-cards-wrapper" onScroll={handleScroll}>
                    {cards.map((card) => (
                        <div key={card.id} className="yt-card">
                            <div className="yt-icon-wrapper">
                                {card.icon}
                            </div>
                            <h3 className="yt-card-title">{card.title}</h3>
                            <ul className="yt-list">
                                {card.items.map((item, idx) => (
                                    <li key={idx}>
                                        <span className="check-icon">
                                            {/* Simple checkmark */}
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </span>
                                        <span className="list-text">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Mobile Pagination */}
                <div className="yt-pagination">
                    {cards.map((_, idx) => (
                        <span
                            key={idx}
                            className={`yt-dot ${currentSlide === idx ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default YourTime;
