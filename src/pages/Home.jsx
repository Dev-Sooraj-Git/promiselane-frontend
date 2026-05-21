import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen bg-bg text-text font-sans antialiased">
            {/* Navigation */}
            <nav className="flex justify-between items-center px-6 md:px-14 py-5 border-b border-border bg-bg/85 backdrop-blur-md sticky top-0 z-50">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-accent to-[#F5C97D] rounded-lg flex items-center justify-center font-bold text-sm text-primary shadow-[0_3px_10px_rgba(229,168,75,0.3)]">
                        P
                    </div>
                    <span className="font-bold text-lg tracking-tight text-primary">PromiseLane</span>
                </Link>
                <div className="hidden md:flex items-center gap-7">
                    <a href="#features" className="text-sm font-medium text-text-secondary hover:text-text transition-colors">Features</a>
                    <a href="#how" className="text-sm font-medium text-text-secondary hover:text-text transition-colors">How It Works</a>
                    <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-text transition-colors">Sign In</Link>
                    <Link to="/register" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-br from-accent to-[#D4953A] text-primary shadow-[0_4px_14px_rgba(229,168,75,0.25)] hover:shadow-[0_8px_24px_rgba(229,168,75,0.35)] hover:-translate-y-0.5 transition-all">
                        Get Started Free
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="text-center px-6 py-24 md:py-32 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/8 border border-accent/20 text-sm font-medium text-[#8B6914] mb-7">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    Now in Active Development
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary leading-[1.1] mb-5">
                    From <span className="bg-gradient-to-br from-[#D4953A] to-accent bg-clip-text text-transparent">Promise</span> to Payment.<br />All in One Place.
                </h1>
                <p className="text-base md:text-lg text-text-secondary max-w-lg mx-auto mb-9 leading-relaxed">
                    The project governance platform that brings clarity to every client relationship. 
                    Track requirements, deliverables, and payments in one shared timeline — 
                    so both sides always know exactly where things stand.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <Link to="/register" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold bg-gradient-to-br from-accent to-[#D4953A] text-primary shadow-[0_4px_14px_rgba(229,168,75,0.25)] hover:shadow-[0_8px_24px_rgba(229,168,75,0.35)] hover:-translate-y-0.5 transition-all">
                        Start Tracking Free →
                    </Link>
                    <a href="#how" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-primary border border-border hover:border-accent hover:bg-accent/5 transition-all">
                        See How It Works
                    </a>
                </div>
            </section>

            {/* Problem / Solution */}
           {/* Problem / Solution */}
            <section className="max-w-6xl mx-auto px-6 md:px-14 py-20 md:py-28">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                    <div>
                        <h3 className="text-2xl font-semibold text-primary mb-3">Great Work Deserves Clear Agreements</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            When requirements live in scattered chats and verbal conversations, both sides lose. 
                            Freelancers face scope creep. Clients wonder what they're paying for. 
                            Trust erodes when there's no shared record of what was agreed.
                            <br /><br />
                            PromiseLane creates a single source of truth — visible to both parties — 
                            so expectations are clear, deliverables are verified, and payments are never a surprise.
                        </p>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-10 text-center text-5xl shadow-sm">
                        🤝 → 📋 → ✅
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="max-w-6xl mx-auto px-6 md:px-14 py-20 md:py-28">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">Everything You Need to Stay Protected</h2>
                    <p className="text-text-secondary text-sm max-w-md mx-auto">Stop losing money to scope creep and payment disputes.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: '📋', title: 'Capture Requirements', desc: 'Log every client ask — chats, emails, calls. Separate what was requested from what was agreed.' },
                        { icon: '🔒', title: 'Immutable Timeline', desc: 'Every change, deliverable, and payment is logged permanently. Ironclad proof when disputes happen.' },
                        { icon: '💰', title: 'Milestone Payments', desc: 'Link payments directly to deliverables. Track what\'s paid, pending, and overdue.' },
                        { icon: '🔗', title: 'Shareable Client View', desc: 'Generate a read-only link for clients. They see progress without logging in.' },
                        { icon: '📊', title: 'Real-Time Dashboard', desc: 'Active projects, total earnings, pending payments — all in one glance.' },
                        { icon: '🛡️', title: 'Privacy First', desc: 'Your client data is yours alone. No freelancer sees another\'s clients.' },
                    ].map((f, i) => (
                        <div key={i} className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="text-2xl mb-4">{f.icon}</div>
                            <h4 className="font-semibold text-primary mb-2">{f.title}</h4>
                            <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section id="how" className="max-w-6xl mx-auto px-6 md:px-14 py-20 md:py-28">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">How It Works</h2>
                    <p className="text-text-secondary text-sm">Three steps. No learning curve.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { step: '1', title: 'Capture the Promise', desc: 'Log client requirements, set milestones, and agree on scope — all in one place.' },
                        { step: '2', title: 'Deliver with Proof', desc: 'Upload deliverables against each milestone. Every action is timestamped and logged.' },
                        { step: '3', title: 'Get Paid', desc: 'Track payments against milestones. Share progress with clients. Zero disputes.' },
                    ].map((s, i) => (
                        <div key={i} className="text-center">
                            <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl font-bold mx-auto mb-4">{s.step}</div>
                            <h4 className="font-semibold text-primary mb-2">{s.title}</h4>
                            <p className="text-text-secondary text-sm">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-5xl mx-auto px-6 md:px-14 py-16">
                <div className="bg-gradient-to-br from-primary to-primary-surface rounded-2xl p-12 md:p-16 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-3">Ready to Take Control of Your Freelance Projects?</h2>
                    <p className="text-[#8A8FA3] text-sm mb-7 max-w-md mx-auto">Join freelancers who track promises, not just payments. Start free. No credit card required.</p>
                    <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-br from-accent to-[#D4953A] text-primary shadow-[0_4px_14px_rgba(229,168,75,0.25)] hover:shadow-[0_8px_24px_rgba(229,168,75,0.35)] hover:-translate-y-0.5 transition-all">
                        Create Your Free Account →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-7 text-center text-text-muted text-xs">
                © 2026 PromiseLane. All rights reserved. Built for freelancers, by a freelancer.
            </footer>
        </div>
    );
}