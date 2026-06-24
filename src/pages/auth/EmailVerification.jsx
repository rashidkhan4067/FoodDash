/**
 * Email Verification Page
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import authService from '../../services/authService';
import '../../styles/auth/EmailVerification.css';

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');

    useEffect(() => {
        verifyEmail();
    }, [token]);

    const verifyEmail = async () => {
        try {
            const response = await authService.verifyEmail(token);

            if (response.success) {
                setStatus('success');
                setMessage(response.message || 'Email verified successfully!');
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setStatus('error');
                setMessage(response.error?.message || 'Verification failed');
            }
        } catch (error) {
            setStatus('error');
            setMessage(error.response?.data?.error?.message || 'Verification failed');
        }
    };

    return (
        <div className="email-verification-page">
            <div className="verification-card">
                {status === 'verifying' && (
                    <div className="verifying">
                        <div className="spinner"></div>
                        <h2>Verifying your email...</h2>
                        <p>Please wait while we verify your email address.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="success">
                        <FiCheckCircle size={80} />
                        <h2>Email Verified!</h2>
                        <p>{message}</p>
                        <p className="redirect-text">Redirecting to login...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="error">
                        <FiXCircle size={80} />
                        <h2>Verification Failed</h2>
                        <p>{message}</p>
                        <button onClick={() => navigate('/login')} className="btn btn-primary">
                            Go to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailVerification;
