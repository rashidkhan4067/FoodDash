/**
 * Register Page - Modern Just Eat Style
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { auth, googleProvider } from '../../config/firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import '../../styles/auth/Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const { register, googleLogin } = useAuth();
    const toast = useToast();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        password_confirm: '',
        phone_number: '',
    });
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

        const result = await register(formData);

        if (result.success) {
            toast.success('Account created!');
            toast.info('OTP sent to your email.');
            navigate('/verify-otp', { state: { email: formData.email } });
        } else {
            // Handle detailed backend errors
            if (result.details) {
                const details = result.details;

                // Check for field-specific errors
                if (details.email) {
                    setError(`Email: ${Array.isArray(details.email) ? details.email[0] : details.email}`);
                } else if (details.username) {
                    setError(`Username: ${Array.isArray(details.username) ? details.username[0] : details.username}`);
                } else if (details.password) {
                    setError(`Password: ${Array.isArray(details.password) ? details.password[0] : details.password}`);
                } else if (details.phone_number) {
                    setError(`Phone: ${Array.isArray(details.phone_number) ? details.phone_number[0] : details.phone_number}`);
                } else if (details.non_field_errors) {
                    setError(Array.isArray(details.non_field_errors) ? details.non_field_errors[0] : details.non_field_errors);
                } else if (typeof details === 'string') {
                    setError(details);
                } else {
                    // If details object has multiple fields, show the first one
                    const firstError = Object.values(details)[0];
                    setError(Array.isArray(firstError) ? firstError[0] : firstError);
                }
            } else {
                setError(result.message || 'Registration failed. Please try again.');
            }
        }

        setLoading(false);
    };

    const handleGoogleSignUp = async () => {
        try {
            console.log("Starting Google Sign Up...");
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google Sign In Result:", result);

            // Get the Google ID Token from the credential properties
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.idToken;

            console.log("Google ID Token:", token);

            if (!token) {
                // Fallback to Firebase token (though backend might reject it if it expects Google ID Token)
                // But usually credential.idToken is present if we use GoogleAuthProvider
                throw new Error("Failed to retrieve Google ID token from provider");
            }

            const loginResult = await googleLogin(token);
            console.log("Backend Login Result:", loginResult);

            if (loginResult.success) {
                toast.success('Signed up with Google!');
                navigate('/menu');
            } else {
                setError(loginResult.message || 'Google Sign-Up failed. Please try again.');
            }
        } catch (error) {
            console.error("Firebase Auth Error:", error);
            if (error.code === 'auth/popup-closed-by-user') {
                setError('Sign-up cancelled. Please try again.');
            } else if (error.code === 'auth/popup-blocked') {
                setError('Popup blocked. Please allow popups and try again.');
            } else {
                setError(error.message || 'Google Sign-Up failed. Please try again.');
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
                    <button onClick={handleGoogleSignUp} className="btn-social btn-google">
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

                {/* Register Form */}
                <form onSubmit={handleSubmit}>
                    <div className="auth-section-title">Create account with email</div>

                    <div className="auth-form-group">
                        <input
                            type="text"
                            name="username"
                            className="auth-input"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                        />
                    </div>

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
                            type="tel"
                            name="phone_number"
                            className="auth-input"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="Phone Number (Optional)"
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

                    <div className="auth-form-group">
                        <input
                            type="password"
                            name="password_confirm"
                            className="auth-input"
                            value={formData.password_confirm}
                            onChange={handleChange}
                            placeholder="Confirm Password"
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
                        {loading ? 'Creating Account...' : 'Continue'}
                    </button>
                </form>

                <p className="auth-terms-text">
                    By proceeding you agree to our <a href="#">Terms and Conditions</a>. Please read our <a href="#">Privacy Statement</a> and <a href="#">Cookie Policy</a>.
                </p>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}>
                        Already have an account? Log in
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

export default Register;
