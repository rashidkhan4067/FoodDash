import MinimalNavbar from '../../components/layout/MinimalNavbar';
import Hero from '../../components/sections/Hero';
import HowItWorks from '../../components/sections/HowItWorks';
import AppDownload from '../../components/sections/AppDownload';
import YourTime from '../../components/sections/YourTime';
import Footer from '../../components/layout/Footer';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <MinimalNavbar />
            <main>
                <Hero />
                <HowItWorks />
                <AppDownload />
                <YourTime />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
