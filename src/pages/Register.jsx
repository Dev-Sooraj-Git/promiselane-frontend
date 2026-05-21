import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const { register } = useAuth();
    const navigate = useNavigate();

    const validateField = (field, value) => {
        const errors = { ...fieldErrors };
        switch (field) {
            case 'name':
                if (value.length > 0 && value.length < 2) errors.name = 'Name must be at least 2 characters.';
                else if (value && !/^[a-zA-Z\s]+$/.test(value)) errors.name = 'Only letters and spaces allowed.';
                else delete errors.name;
                break;
            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = 'Enter a valid email address.';
                else delete errors.email;
                break;
            case 'password':
                if (value && value.length < 8) errors.password = 'Password must be at least 8 characters.';
                else delete errors.password;
                break;
        }
        setFieldErrors(errors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirmation) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password, passwordConfirmation);
            navigate('/dashboard');
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                const firstField = Object.keys(errors)[0];
                setError(errors[firstField][0]);
            } else {
                setError(err.response?.data?.message || 'Registration failed.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg px-4 py-10">
            <div className="w-full max-w-md">
                {/* Logo + Brand */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent to-[#F5C97D] rounded-xl mx-auto mb-4 shadow-[0_4px_14px_rgba(229,168,75,0.3)]">
                        <span className="font-bold text-lg text-primary">P</span>
                    </Link>
                    <h2 className="text-xl font-bold text-primary tracking-tight">Create your account</h2>
                    <p className="text-text-secondary text-sm mt-1">Start tracking promises, not just payments</p>
                </div>

                {/* Card */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                    {error && (
                        <div className="bg-danger/5 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl mb-5">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-text text-sm font-medium mb-1.5">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onChange={(e) => validateField('name', e.target.value)}
                                required
                                className="w-full px-4 py-2.5 border border-border rounded-xl bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                                placeholder="Sooraj"
                            />
                            {fieldErrors.name && <p className="text-danger text-xs mt-1">{fieldErrors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-text text-sm font-medium mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onChange={(e) => validateField('email', e.target.value)}
                                required
                                className="w-full px-4 py-2.5 border border-border rounded-xl bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                                placeholder="you@example.com"
                            />
                            {fieldErrors.email && <p className="text-danger text-xs mt-1">{fieldErrors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-text text-sm font-medium mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onChange={(e) => validateField('password', e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 pr-11 border border-border rounded-xl bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                                    placeholder="Min. 8 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {fieldErrors.password && <p className="text-danger text-xs mt-1">{fieldErrors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-text text-sm font-medium mb-1.5">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 pr-11 border border-border rounded-xl bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                                    placeholder="Re-enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                                >
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Password match indicator */}
                        {passwordConfirmation.length > 0 && password === passwordConfirmation && (
                            <p className="text-success text-xs flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-success"></span>
                                Passwords match
                            </p>
                        )}
                        {passwordConfirmation.length > 0 && password !== passwordConfirmation && (
                            <p className="text-danger text-xs flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-danger"></span>
                                Passwords do not match
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-br from-accent to-[#D4953A] text-primary shadow-[0_4px_14px_rgba(229,168,75,0.25)] hover:shadow-[0_8px_24px_rgba(229,168,75,0.35)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-text-secondary text-sm mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-accent hover:underline font-semibold">Sign in</Link>
                </p>
            </div>
        </div>
    );
}