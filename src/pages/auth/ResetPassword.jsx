/**
 * Reset Password Page
 */
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import authService from '../../services/authService';
import { useToast } from '../../context/ToastContext';
import '../../styles/auth/Auth.css';

const ResetPassword = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const [formData, setFormData] = useState({ password: '', password_confirm: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.password_confirm) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await authService.confirmPasswordReset({
                uid,
                token,
                password: formData.password,
                password_confirm: formData.password_confirm
            });

            if (result.success !== false) { // Assuming wrapper returns data directly on success or handles errors
                toast.success('Password reset successful! You can now login.');
                navigate('/login');
            } else {
                setError(result.message || 'Failed to reset password.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired link.');
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
                        <h1>Set New Password</h1>
                        <p>Create a strong password for your account.</p>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit} className="modern-form">
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="password_confirm"
                                value={formData.password_confirm}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Reseting...' : 'Set New Password'}
                        </button>
                    </form>

                    <div className="auth-footer-link" style={{ marginTop: '30px' }}>
                        <Link to="/login">Back to Login</Link>
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="auth-image-side">
                    <img
                        src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2070&auto=format&fit=crop"
                        alt="Food Art"
                    />
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
