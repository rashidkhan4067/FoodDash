import { useState, useEffect } from 'react';
import '../../styles/sections/HowItWorks.css';

const HowItWorks = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const steps = [
        {
            id: 1,
            title: "Tell us where you are",
            desc: "We'll show you stores and restaurants nearby you can order from.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="9" r="3" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            id: 2,
            title: "Find what you want",
            desc: "Search for items or dishes, businesses or cuisines.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 8H5V19C5 19.55 5.45 20 6 20H18C18.55 20 19 19.55 19 19V8Z" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 5C14.7614 5 17 6.34315 17 8H7C7 6.34315 9.23858 5 12 5Z" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 8H19" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 12H16" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            id: 3,
            title: "Order for delivery or collection",
            desc: "We'll update you on your order's progress.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 12V13.5C20 17 17.5 20 12 20C6.5 20 4 17 4 13.5V12C4 8 7 4 12 4C17 4 20 8 20 12Z" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12H22" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="12" y1="2" x2="12" y2="4" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="17.5" cy="17.5" r="3.5" fill="white" stroke="#FF8000" strokeWidth="2" />
                    <path d="M16 17.5L17 18.5L19 16.5" stroke="#FF8000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    ];

    // Detect mobile viewport to enable carousel logic or just rely on CSS
    // We'll use CSS snap scrolling for smoothness, but keep React state for dots active class

    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setCurrentStep(index);
    };

    return (
        <section className="how-it-works">
            <div className="hiw-content-wrapper">
                <div className="hiw-header">
                    <span className="hiw-subtitle">How to order</span>
                    <h2 className="hiw-title">It's as easy as this.</h2>
                </div>

                <div
                    className="hiw-steps"
                    onScroll={handleScroll}
                >
                    {steps.map((step) => (
                        <div key={step.id} className="hiw-step">
                            <div className="hiw-icon">
                                {step.icon}
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Mobile Pagination Dots */}
                <div className="hiw-pagination">
                    {steps.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentStep ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
