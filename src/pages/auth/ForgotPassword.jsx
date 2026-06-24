/**
 * Forgot Password Page
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import '../../styles/auth/Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await authService.requestPasswordReset(email);
            setStatus({ type: 'success', message: response.message || 'If an account exists, a reset link has been sent.' });
        } catch (error) {
            const errorMessage = error.response?.data?.error?.message
                || error.response?.data?.message
                || error.response?.data?.detail
                || 'Failed to send reset link. Please try again.';
            setStatus({ type: 'error', message: errorMessage });
        }

        setLoading(false);
    };

    return (
        <div className="auth-page-split">
            <div className="auth-card-split" style={{ minHeight: '500px' }}>
                {/* Left Side: Form */}
                <div className="auth-form-side">
                    <div className="auth-header">
                        <Link to="/" className="brand-logo">FoodDelivery</Link>
                        <h1>Forgot Password?</h1>
                        <p>Enter your email to receive a reset link.</p>
                    </div>

                    {status.message && (
                        <div className={`error-message ${status.type === 'success' ? 'success' : ''}`}
                            style={status.type === 'success' ? { background: '#e6fffa', color: '#2c7a7b', borderColor: '#b2f5ea' } : {}}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="modern-form">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className="auth-footer-link" style={{ marginTop: '30px' }}>
                        Remember your password? <Link to="/login">Sign In</Link>
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="auth-image-side">
                    <img
                        src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1974&auto=format&fit=crop"
                        alt="Sweet Cake"
                    />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
