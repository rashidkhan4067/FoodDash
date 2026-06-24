import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Footer = () => {
    // Manage state for multiple open sections
    const [openSections, setOpenSections] = useState({
        foodDash: true,       // Default open as per mockup
        regions: true  // Default open as per mockup
    });

    const toggleSection = (key) => {
        setOpenSections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const isOpen = (key) => openSections[key];

    return (
        <footer className="footer">
            <div className="footer-container">

                {/* 1. Header: Logo & Socials */}
                <div className="footer-header">
                    <div className="footer-brand-centered">
                        <span className="brand-icon">🍽️</span>
                        <span className="brand-name">FoodDash</span>
                    </div>

                    <div className="footer-socials">
                        <p className="social-label">Follow us</p>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook"><FaFacebook /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="YouTube"><FaYoutube /></a>
                        </div>
                    </div>
                </div>

                {/* 2. Main Content Accordions */}
                <div className="footer-main-grid">

                    {/* Left Column: FoodDash Links */}
                    <div className="footer-col-left">
                        <div className="accordion-item no-border-desktop">
                            <button
                                className="accordion-header"
                                onClick={() => toggleSection('foodDash')}
                                aria-expanded={isOpen('foodDash')}
                            >
                                <h3>FoodDash</h3>
                                <div className="chevron">
                                    {isOpen('foodDash') ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            </button>
                            <div className={`accordion-content ${isOpen('foodDash') ? 'open' : ''}`}>
                                <ul className="footer-links-list">
                                    <li><Link to="/about">About us</Link></li>
                                    <li><Link to="/contact">Contact us</Link></li>
                                    {/* <li><Link to="/partner">Add your restaurant</Link></li> */}
                                    {/* <li><Link to="/rider">Become a rider</Link></li> */}
                                    <li><Link to="/careers">Careers</Link></li>
                                    <li><Link to="/business">FoodDash for Business</Link></li>
                                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                    <li><Link to="/price-promise">Price promise</Link></li>
                                    <li><Link to="/cookies">Cookies Policy</Link></li>
                                    <li><Link to="/newsroom">Newsroom</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: International & Others */}
                    <div className="footer-col-right">

                        {/* Regions - Special Grey Background Box style */}
                        <div className="accordion-item international-section">
                            <button
                                className="accordion-header"
                                onClick={() => toggleSection('regions')}
                                aria-expanded={isOpen('regions')}
                            >
                                <h3>Regions</h3>
                                <div className="chevron">
                                    {isOpen('regions') ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            </button>
                            <div className={`accordion-content gray-pane ${isOpen('regions') ? 'open' : ''}`}>
                                <div className="international-grid">
                                    <ul className="footer-links-list">
                                        <li><Link to="/region/punjab">Punjab</Link></li>
                                        <li><Link to="/region/sindh">Sindh</Link></li>
                                        <li><Link to="/region/kpk">Khyber Pakhtunkhwa</Link></li>
                                    </ul>
                                    <ul className="footer-links-list">
                                        <li><Link to="/region/balochistan">Balochistan</Link></li>
                                        <li><Link to="/region/islamabad">Islamabad Capital</Link></li>
                                        <li><Link to="/region/gilgit">Gilgit-Baltistan</Link></li>
                                    </ul>
                                    <ul className="footer-links-list">
                                        <li><Link to="/region/ajk">Azad Kashmir</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Top Cuisines */}
                        <div className="accordion-item border-bottom">
                            <button className="accordion-header" onClick={() => toggleSection('cuisines')} aria-expanded={isOpen('cuisines')}>
                                <h3>Top Cuisines</h3>
                                <div className="chevron">{isOpen('cuisines') ? <FaChevronUp /> : <FaChevronDown />}</div>
                            </button>
                            <div className={`accordion-content ${isOpen('cuisines') ? 'open' : ''}`}>
                                <ul className="footer-links-list">
                                    <li><Link to="/cuisine/pakistani">Pakistani</Link></li>
                                    <li><Link to="/cuisine/chinese">Chinese</Link></li>
                                    <li><Link to="/cuisine/biryani">Biryani</Link></li>
                                    <li><Link to="/cuisine/pizza">Pizza</Link></li>
                                    <li><Link to="/cuisine/burgers">Burgers</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Top Cities */}
                        <div className="accordion-item border-bottom">
                            <button className="accordion-header" onClick={() => toggleSection('cities')} aria-expanded={isOpen('cities')}>
                                <h3>Popular Cities</h3>
                                <div className="chevron">{isOpen('cities') ? <FaChevronUp /> : <FaChevronDown />}</div>
                            </button>
                            <div className={`accordion-content ${isOpen('cities') ? 'open' : ''}`}>
                                <ul className="footer-links-list">
                                    <li><Link to="/city/karachi">Karachi</Link></li>
                                    <li><Link to="/city/lahore">Lahore</Link></li>
                                    <li><Link to="/city/islamabad">Islamabad</Link></li>
                                    <li><Link to="/city/rawalpindi">Rawalpindi</Link></li>
                                    <li><Link to="/city/faisalabad">Faisalabad</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Top Brands */}
                        <div className="accordion-item border-bottom">
                            <button className="accordion-header" onClick={() => toggleSection('brands')} aria-expanded={isOpen('brands')}>
                                <h3>Top Brands</h3>
                                <div className="chevron">{isOpen('brands') ? <FaChevronUp /> : <FaChevronDown />}</div>
                            </button>
                            <div className={`accordion-content ${isOpen('brands') ? 'open' : ''}`}>
                                <ul className="footer-links-list">
                                    <li><Link to="/brand/kfc">KFC</Link></li>
                                    <li><Link to="/brand/mcdonalds">McDonald's</Link></li>
                                    <li><Link to="/brand/pizzahut">Pizza Hut</Link></li>
                                    <li><Link to="/brand/savor">Savor Foods</Link></li>
                                    <li><Link to="/brand/bundu-khan">Bundu Khan</Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 3. Footer Bottom Links */}
                <div className="footer-bottom-bar">
                    <div className="bottom-links-row">
                        {/* <Link to="/signup">Sign up a restaurant</Link> */}
                        <Link to="/jobs">Jobs</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/privacy">Privacy statement</Link>
                        <Link to="/cookie">Cookie Statement</Link>
                        <Link to="/accessibility">Accessibility</Link>
                        <Link to="/vulnerability">Report Vulnerability</Link>
                        <Link to="/ethics">Ethics hotline</Link>
                    </div>

                    <div className="copyright-row">
                        <span>&copy; {new Date().getFullYear()} FoodDash</span>
                    </div>

                    <div className="cookie-pref-row">
                        <a href="#">Check my cookie preferences</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
