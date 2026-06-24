/**
 * OTP Verification Page - Modern 6-digit Input
 */
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import '../../styles/auth/Auth.css';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { updateUser } = useAuth();

    // Get email from navigation state
    const email = location.state?.email || '';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(600); // 10 minutes in seconds

    const inputRefs = useRef([]);

    // Countdown timer
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        // Only allow digits
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take last character
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('');
        while (newOtp.length < 6) newOtp.push('');
        setOtp(newOtp);
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/verify-otp/', {
                email,
                otp: otpString
            });

            if (response.data.success) {
                const { user, tokens } = response.data.data;

                // Store tokens
                localStorage.setItem('accessToken', tokens.access);
                localStorage.setItem('refreshToken', tokens.refresh);
                localStorage.setItem('user', JSON.stringify(user));

                updateUser(user);
                setSuccess('✅ Email verified successfully!');

                setTimeout(() => navigate('/menu'), 1500);
            }
        } catch (err) {
            setError(err.response?.data?.error?.message || 'Invalid OTP. Please try again.');
        }

        setLoading(false);
    };

    const handleResend = async () => {
        setResending(true);
        setError('');
        setSuccess('');

        try {
            await api.post('/auth/resend-otp/', { email });
            setSuccess('OTP resent to your email!');
            setTimer(600); // Reset timer
        } catch (err) {
            setError(err.response?.data?.error?.message || 'Failed to resend OTP.');
        }

        setResending(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!email) {
        return (
            <div className="auth-page-split">
                <div className="auth-card-split" style={{ minHeight: '400px', maxWidth: '600px' }}>
                    <div className="auth-form-side" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                        <h1>⚠️ No Email Provided</h1>
                        <p>Please register first to receive your OTP.</p>
                        <Link to="/register" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                            Go to Register
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page-split">
            <div className="auth-card-split" style={{ minHeight: '550px', maxWidth: '700px' }}>
                {/* Form Side */}
                <div className="auth-form-side">
                    <div className="auth-header">
                        <Link to="/" className="brand-logo">FoodDelivery</Link>
                        <h1>Verify Your Email</h1>
                        <p>We've sent a 6-digit code to <strong>{email}</strong></p>
                    </div>

                    {error && (
                        <div style={{
                            backgroundColor: '#fee2e2',
                            border: '1px solid #fca5a5',
                            borderLeft: '4px solid #dc2626',
                            borderRadius: '8px',
                            padding: '14px 16px',
                            marginBottom: '20px',
                            color: '#991b1b',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div style={{
                            backgroundColor: '#d1fae5',
                            border: '1px solid #6ee7b7',
                            borderLeft: '4px solid #10b981',
                            borderRadius: '8px',
                            padding: '14px 16px',
                            marginBottom: '20px',
                            color: '#065f46',
                            fontSize: '0.95rem',
                            fontWeight: '600'
                        }}>
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    style={{
                                        width: '50px',
                                        height: '60px',
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        border: '2px solid #e9ecef',
                                        borderRadius: '8px',
                                        backgroundColor: '#f8f9fa',
                                        transition: 'all 0.2s',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#ff6b6b'}
                                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                                />
                            ))}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#636e72' }}>
                        {timer > 0 ? (
                            <p>Code expires in <strong style={{ color: '#ff6b6b' }}>{formatTime(timer)}</strong></p>
                        ) : (
                            <p style={{ color: '#dc2626' }}>OTP expired!</p>
                        )}
                        <button
                            onClick={handleResend}
                            disabled={resending || timer > 540}
                            className="btn btn-secondary"
                            style={{ marginTop: '10px', fontSize: '0.9rem' }}
                        >
                            {resending ? 'Sending...' : 'Resend OTP'}
                        </button>
                    </div>
                </div>

                {/* Image Side */}
                <div className="auth-image-side">
                    <img
                        src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&auto=format&fit=crop"
                        alt="Email Verification"
                    />
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
