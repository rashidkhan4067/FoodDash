/**
 * Login Page - Modern Just Eat Style
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { auth, googleProvider } from '../../config/firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import '../../styles/auth/Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login, googleLogin } = useAuth();
    const toast = useToast();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(formData);

        if (result.success) {
            toast.success('Welcome back!');
            navigate('/menu');
        } else {
            // Display detailed error message from backend
            if (result.details) {
                // Handle field-specific errors
                const details = result.details;
                if (details.email) {
                    setError(details.email[0]);
                } else if (details.password) {
                    setError(details.password[0]);
                } else if (details.non_field_errors) {
                    setError(details.non_field_errors[0]);
                } else if (typeof details === 'string') {
                    setError(details);
                } else {
                    setError(result.message || 'Login failed. Please check your credentials.');
                }
            } else {
                setError(result.message || 'Login failed. Please check your credentials.');
            }
        }

        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        try {
            console.log("Starting Google Sign In...");
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google Sign In Result:", result);

            // Get the Google ID Token from the credential properties
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.idToken;

            console.log("Google ID Token:", token);

            if (!token) {
                throw new Error("Failed to retrieve Google ID token from provider");
            }

            const loginResult = await googleLogin(token);
            console.log("Backend Login Result:", loginResult);

            if (loginResult.success) {
                toast.success('Welcome back!');
                navigate('/menu');
            } else {
                setError(loginResult.message || 'Google Sign-In failed. Please try again.');
            }
        } catch (error) {
            console.error("Firebase Auth Error:", error);
            if (error.code === 'auth/popup-closed-by-user') {
                setError('Sign-in cancelled. Please try again.');
            } else if (error.code === 'auth/popup-blocked') {
                setError('Popup blocked. Please allow popups and try again.');
            } else {
                setError(error.message || 'Google Sign-In failed. Please try again.');
            }
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <h2 className="auth-title">Log in or create account</h2>

                {error && (
                    <div className="auth-error-msg">
                        <span>⚠️</span> {error}
                    </div>
                )}

                {/* Social Buttons */}
                <div className="social-buttons-stack">
                    <button onClick={handleGoogleSignIn} className="btn-social btn-google">
                        <FaGoogle size={20} />
                        Continue with Google
                    </button>
                    <button className="btn-social btn-apple">
                        <FaApple size={20} />
                        Continue with Apple
                    </button>
                </div>

                <div className="auth-divider">
                    <span>or</span>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit}>
                    <div className="auth-section-title">Continue with email</div>

                    <div className="auth-form-group">
                        <input
                            type="email"
                            name="email"
                            className="auth-input"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            required
                        />
                    </div>

                    <div className="auth-form-group">
                        <input
                            type="password"
                            name="password"
                            className="auth-input"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>

                    {/* Fake Cloudflare Widget */}
                    <div className="cloudflare-widget">
                        <div className="cf-check">
                            <input type="checkbox" className="cf-checkbox" readOnly checked />
                            <span className="cf-label">Verify you are human</span>
                        </div>
                        <div className="cf-logo">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cloudflare_Logo.svg/1200px-Cloudflare_Logo.svg.png" alt="Cloudflare" style={{ height: '12px', opacity: 0.6 }} />
                            <span className="cf-logo-text">Privacy - Terms</span>
                        </div>
                    </div>

                    <button type="submit" className="btn-auth-submit" disabled={loading}>
                        {loading ? 'Processing...' : 'Continue'}
                    </button>
                </form>

                <p className="auth-terms-text">
                    By proceeding you agree to our <a href="#">Terms and Conditions</a>. Please read our <a href="#">Privacy Statement</a> and <a href="#">Cookie Policy</a>.
                </p>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}>
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>

            <div className="auth-page-footer">
                <span>&copy; {new Date().getFullYear()} FoodDash</span>
                <a href="#">Check my cookie preferences</a>
            </div>
        </div>
    );
};

export default Login;
