import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState(searchParams.get('email') || '');
    const [token] = useState(searchParams.get('token') || '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!token) {
            setError('Invalid reset link. Please request a new password reset link.');
            return;
        }

        if (password !== passwordConfirmation) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            await api.post('/auth/reset-password', {
                email,
                token,
                password,
                password_confirmation: passwordConfirmation,
            });

            setSuccess(true);

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired reset link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-[#F5C97D] rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="font-bold text-lg text-primary">P</span>
                    </div>
                    <h2 className="text-xl font-bold text-primary">Set New Password</h2>
                    <p className="text-text-secondary text-sm mt-1">
                        Choose a new password for your PromiseLane account.
                    </p>
                </div>

                <Card>
                    {success ? (
                        <div className="text-center py-6">
                            <CheckCircle size={42} className="text-success mx-auto mb-3" />
                            <p className="text-sm font-semibold text-text">Password reset successful</p>
                            <p className="text-xs text-text-muted mt-2">Redirecting to login...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-danger/5 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-text text-sm font-medium mb-1.5">Email</label>
                                <div className="relative">
                                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-text text-sm font-medium mb-1.5">New Password</label>
                                <div className="relative">
                                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-9 pr-10 py-2.5 border border-border rounded-xl bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                                        placeholder="Minimum 8 characters, include letters and numbers"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-text text-sm font-medium mb-1.5">Confirm Password</label>
                                <input
                                    type="password"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 border border-border rounded-xl bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                                    placeholder="Re-enter your new password"
                                />
                            </div>

                            <Button type="submit" variant="primary" fullWidth disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </form>
                    )}
                </Card>

                {!success && (
                    <p className="text-center text-text-secondary text-sm mt-6">
                        <Link to="/login" className="text-accent hover:underline font-semibold inline-flex items-center gap-1">
                            <ArrowLeft size={14} /> Back to Login
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}