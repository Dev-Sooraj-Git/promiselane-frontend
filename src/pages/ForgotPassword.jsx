import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.post('/auth/forgot-password', { email });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to process your request. Please try again.');
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
                    <h2 className="text-xl font-bold text-primary">Forgot Password</h2>
                    <p className="text-text-secondary text-sm mt-1">
                        Enter your email and we’ll send you a reset link.
                    </p>
                </div>

                <Card>
                    {success ? (
                        <div className="text-center py-6">
                            <CheckCircle size={42} className="text-success mx-auto mb-3" />
                            <p className="text-sm font-semibold text-text">Check your email</p>
                            <p className="text-xs text-text-muted mt-2">
                                If that email exists, a password reset link has been sent.
                            </p>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-1 mt-5 text-accent text-sm font-semibold hover:underline"
                            >
                                <ArrowLeft size={14} /> Back to Login
                            </Link>
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

                            <Button type="submit" variant="primary" fullWidth disabled={loading}>
                                {loading ? 'Sending...' : 'Send Reset Link'}
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