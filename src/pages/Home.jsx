import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            {/* Navigation */}
            <nav className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-amber-400 rounded-lg"></div>
                    <span className="text-xl font-bold text-white">PromiseLane</span>
                </div>
                <div className="flex gap-4 items-center">
                    <Link to="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                        Sign In
                    </Link>
                    <Link to="/register"
                        className="px-5 py-2.5 bg-white text-indigo-900 rounded-lg hover:bg-slate-100 transition-all font-semibold text-sm shadow-lg shadow-indigo-500/20">
                        Get Started Free
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 pt-24 pb-32 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-400/20 rounded-full mb-8">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                    <span className="text-amber-300 text-sm font-medium">Now in Active Development</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    From Promise
                    <span className="bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent"> to Payment</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    The project governance platform that tracks every commitment — from raw requirements and agreed scope to verified deliverables and milestone payments. Built for freelancers who demand clarity.
                </p>

                <div className="flex gap-4 justify-center flex-wrap">
                    <Link to="/register"
                        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl hover:from-indigo-500 hover:to-indigo-400 transition-all font-semibold text-lg shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/30 transform hover:-translate-y-0.5">
                        Start Tracking Free →
                    </Link>
                    <a href="#features"
                        className="px-8 py-4 border border-slate-600 text-slate-300 rounded-xl hover:border-slate-400 hover:text-white transition-all font-medium text-lg">
                        See How It Works
                    </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-20">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-white mb-1">100%</p>
                        <p className="text-sm text-slate-500">Scope Clarity</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-white mb-1">₹0</p>
                        <p className="text-sm text-slate-500">Disputed Payments</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-white mb-1">1-Click</p>
                        <p className="text-sm text-slate-500">Client Sharing</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to Stay Protected</h2>
                    <p className="text-slate-400 max-w-xl mx-auto">Stop losing money to scope creep and payment disputes. PromiseLane creates an unbreakable paper trail for every project.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: '📋',
                            title: 'Capture Requirements',
                            desc: 'Log every client ask — chats, emails, calls. Separate what was requested from what was agreed. No more "I never said that."',
                        },
                        {
                            icon: '🔒',
                            title: 'Immutable Timeline',
                            desc: 'Every change, every deliverable, every payment is logged permanently. When disputes happen, you have ironclad proof.',
                        },
                        {
                            icon: '💰',
                            title: 'Milestone Payments',
                            desc: 'Link payments directly to deliverables. Track what\'s paid, what\'s pending, and what\'s overdue. Get paid for every milestone.',
                        },
                        {
                            icon: '🔗',
                            title: 'Shareable Client View',
                            desc: 'Generate a read-only link for clients. They see progress without logging in. Revoke access anytime.',
                        },
                        {
                            icon: '📊',
                            title: 'Real-Time Dashboard',
                            desc: 'Active projects, total earnings, pending payments, upcoming deadlines — all in one glance.',
                        },
                        {
                            icon: '🛡️',
                            title: 'Privacy First',
                            desc: 'Your client data is yours alone. No freelancer sees another\'s clients. Enterprise-grade data isolation.',
                        },
                    ].map((feature, i) => (
                        <div key={i}
                            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-indigo-500/30 hover:bg-slate-800/80 transition-all group">
                            <div className="text-3xl mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto px-4 py-24 text-center">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-3xl p-12 md:p-16 shadow-2xl shadow-indigo-500/20">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Take Control of Your Freelance Projects?</h2>
                    <p className="text-indigo-200 mb-8 max-w-lg mx-auto">Join freelancers who track promises, not just payments. Start free. No credit card required.</p>
                    <Link to="/register"
                        className="px-10 py-4 bg-white text-indigo-900 rounded-xl hover:bg-slate-100 transition-all font-bold text-lg shadow-lg inline-block">
                        Create Your Free Account →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
                    <p>© 2026 PromiseLane. All rights reserved. Built for freelancers, by freelancers.</p>
                </div>
            </footer>
        </div>
    );
}