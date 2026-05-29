import { useState } from 'react';
import { Bug, Lightbulb, MessageSquare, Send, CheckCircle } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Feedback() {
    const [type, setType] = useState('bug');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (message.trim().length < 5) {
            setError('Please provide at least 5 characters.');
            return;
        }

        setSubmitting(true);
        try {
            await api.post('/feedback', { type, message });
            setSubmitted(true);
            setMessage('');
            setTimeout(() => setSubmitted(false), 4000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const types = [
        { id: 'bug', label: 'Bug Report', desc: 'Something is broken', icon: Bug },
        { id: 'feature', label: 'Feature Request', desc: 'Suggest an improvement', icon: Lightbulb },
        { id: 'other', label: 'General Feedback', desc: 'Anything else', icon: MessageSquare },
    ];

    return (
        <div className="max-w-xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-xl font-bold text-primary tracking-tight">Help Us Improve</h1>
                <p className="text-sm text-text-muted mt-1">Report a bug, suggest a feature, or share your thoughts.</p>
            </div>

            {/* Success State */}
            {submitted ? (
                <Card padding="p-8">
                    <div className="text-center py-6">
                        <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={28} className="text-success" />
                        </div>
                        <h2 className="text-base font-semibold text-text">Thank You!</h2>
                        <p className="text-sm text-text-muted mt-1">Your feedback has been received. We appreciate it.</p>
                        <Button variant="outline" className="mt-5" onClick={() => setSubmitted(false)}>
                            Submit Another
                        </Button>
                    </div>
                </Card>
            ) : (
                <Card padding="p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Type Selector */}
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-2">What kind of feedback?</label>
                            <div className="grid grid-cols-3 gap-2">
                                {types.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = type === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setType(item.id)}
                                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center ${
                                                isActive
                                                    ? 'border-accent bg-accent/5 text-accent shadow-sm'
                                                    : 'border-border text-text-muted hover:bg-bg'
                                            }`}
                                        >
                                            <Icon size={20} />
                                            <span className="text-xs font-semibold">{item.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">
                                Your Message <span className="text-text-muted font-normal">(min 5 characters)</span>
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows={6}
                                placeholder={
                                    type === 'bug'
                                        ? "Describe what went wrong. What did you expect to happen?"
                                        : type === 'feature'
                                        ? "Describe the feature you'd like to see. How would it help?"
                                        : "Share your thoughts, suggestions, or questions..."
                                }
                                className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-bg outline-none focus:border-accent transition-colors resize-none"
                            />
                            <div className="flex justify-between mt-1">
                                {error && <p className="text-xs text-danger">{error}</p>}
                                <p className="text-[11px] text-text-muted ml-auto">{message.length}/1000</p>
                            </div>
                        </div>

                        {/* Submit */}
                        <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                            {submitting ? (
                                <>Submitting...</>
                            ) : (
                                <><Send size={15} /> Submit Feedback</>
                            )}
                        </Button>
                    </form>
                </Card>
            )}

            {/* Footer Note */}
            <p className="text-center text-xs text-text-muted mt-5">
                Your feedback helps make PromiseLane better for everyone.
            </p>
        </div>
    );
}