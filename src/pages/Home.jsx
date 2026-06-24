import { useAuth } from '../context/AuthContext';
import LandingPage from './home/LandingPage';
import '../styles/Home.css';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="home-page-wrapper">
            <LandingPage />
        </div>
    );
};

export default Home;
