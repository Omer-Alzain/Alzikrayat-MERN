import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LoginRegister = ({ mode }) => {
    const isRegister = mode === 'register';
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
        location: '', occupation: '', description: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const updateField = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isRegister) {
                await register(form);
            } else {
                await login({ email: form.email, password: form.password });
            }
            navigate('/gallery');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth-page">
            <div className={`auth-card ${isRegister ? 'wide' : ''}`}>
                <div className="auth-card-header">
                    <div className="logo"><span className="logo-badge">A</span></div>
                    <h1>{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
                    <p>{isRegister ? 'Join the Alzikrayat memory archive' : 'Log in to continue to your memories'}</p>
                </div>

                {error && <p className="message error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-fields">
                        {isRegister && (
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input id="firstName" name="firstName" value={form.firstName} onChange={updateField} placeholder="e.g., Ahmed" minLength="2" maxLength="50" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input id="lastName" name="lastName" value={form.lastName} onChange={updateField} placeholder="e.g., Al-Mansoori" minLength="2" maxLength="50" required />
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" name="email" value={form.email} onChange={updateField} placeholder="your.name@university.edu" required />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" name="password" value={form.password} onChange={updateField} minLength="8" required />
                            </div>
                            {isRegister && (
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input id="confirmPassword" type="password" name="confirmPassword" value={form.confirmPassword} onChange={updateField} minLength="8" required />
                                </div>
                            )}
                        </div>

                        {isRegister && (
                            <>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="location">Location <span className="optional">(Optional)</span></label>
                                        <input id="location" name="location" value={form.location} onChange={updateField} placeholder="e.g., Khartoum, Sudan" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="occupation">Occupation <span className="optional">(Optional)</span></label>
                                        <input id="occupation" name="occupation" value={form.occupation} onChange={updateField} placeholder="e.g., Student" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Short Bio <span className="optional">(Optional)</span></label>
                                    <textarea id="description" name="description" value={form.description} onChange={updateField} placeholder="Tell us a bit about your memories..." maxLength="500" />
                                </div>
                            </>
                        )}
                    </div>

                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Please wait...' : isRegister ? 'Create Account & Join Archiving' : 'Login to Alzikrayat'}
                    </button>
                </form>

                <p className="auth-switch">
                    {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                    <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Login here' : 'Register here'}</Link>
                </p>
            </div>
        </section>
    );
};

export default LoginRegister;
