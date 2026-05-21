import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg px-4">
            <div className="w-full max-w-md">
                {/* Logo + Brand */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent to-[#F5C97D] rounded-xl mx-auto mb-4 shadow-[0_4px_14px_rgba(229,168,75,0.3)]">
                        <span className="font-bold text-lg text-primary">P</span>
                    </Link>
                    <h2 className="text-xl font-bold text-primary tracking-tight">Welcome back</h2>
                    <p className="text-text-secondary text-sm mt-1">Sign in to your PromiseLane account</p>
                </div>

                {/* Card */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                    {error && (
                        <div className="bg-danger/5 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl mb-5">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-text text-sm font-medium mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2.5 border border-border rounded-xl bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-text text-sm font-medium mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 pr-11 border border-border rounded-xl bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-br from-accent to-[#D4953A] text-primary shadow-[0_4px_14px_rgba(229,168,75,0.25)] hover:shadow-[0_8px_24px_rgba(229,168,75,0.35)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-text-secondary text-sm mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-accent hover:underline font-semibold">Create one</Link>
                </p>
            </div>
        </div>
    );
}