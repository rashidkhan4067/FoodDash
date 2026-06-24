import React from 'react';
import { useLocation } from 'react-router-dom';
import MinimalHeader from '../components/layout/MinimalHeader';
import AppRoutes from '../routes/AppRoutes';

const RootLayout = () => {
    const location = useLocation();

    // Define independent auth routes that get the distinct layout
    const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-otp', '/verify-email'];

    const isAuthPage = authRoutes.includes(location.pathname);
    const isLandingPage = location.pathname === '/';
    const isFullPage = isAuthPage || isLandingPage;

    return (
        <div className="app">
            {/* If Auth Page, show MinimalHeader. If Full Page, show nothing (it has its own). */}
            {isAuthPage && <MinimalHeader />}

            <main className={isFullPage ? '' : 'main-content'}>
                <AppRoutes />
            </main>
        </div>
    );
};

export default RootLayout;
