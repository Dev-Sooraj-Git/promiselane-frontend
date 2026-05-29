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
                    Every Project.<br />
                    Every <span className="bg-gradient-to-br from-[#D4953A] to-accent bg-clip-text text-transparent">Agreement</span>.<br />
                    One Place.
                </h1>
                <p className="text-base md:text-lg text-text-secondary max-w-lg mx-auto mb-9 leading-relaxed">
                    PromiseLane brings structure to client projects — capturing requirements, 
                    tracking deliverables, and recording payments in a shared timeline both 
                    sides can trust. Less confusion. Fewer disputes. Better work.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <Link to="/register" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold bg-gradient-to-br from-accent to-[#D4953A] text-primary shadow-[0_4px_14px_rgba(229,168,75,0.25)] hover:shadow-[0_8px_24px_rgba(229,168,75,0.35)] hover:-translate-y-0.5 transition-all">
                        Start for Free →
                    </Link>
                    <a href="#how" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-primary border border-border hover:border-accent hover:bg-accent/5 transition-all">
                        See How It Works
                    </a>
                </div>
            </section>

            {/* Problem / Solution */}
            <section className="max-w-6xl mx-auto px-6 md:px-14 py-20 md:py-28">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                    <div>
                        <h3 className="text-2xl font-semibold text-primary mb-3">
                            Good Projects Fall Apart Without a Shared Record
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            When requirements live in scattered messages and conversations, 
                            misunderstandings are inevitable. What was agreed gets forgotten. 
                            What was delivered gets questioned. Both sides end up frustrated — 
                            not because of bad intentions, but because there was no single 
                            place to point to.
                            <br /><br />
                            PromiseLane creates that place. A shared, structured record of 
                            what was agreed, what was built, and what was paid — visible to 
                            everyone involved, at every stage of the project.
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
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">
                        Built for Projects That Matter
                    </h2>
                    <p className="text-text-secondary text-sm max-w-md mx-auto">
                        Clear agreements. Verified delivery. Payments tied to progress.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: '📋',
                            title: 'Capture Requirements',
                            desc: 'Log every request, decision, and scope change as it happens — so nothing gets misremembered or disputed later.'
                        },
                        {
                            icon: '🔒',
                            title: 'Permanent Timeline',
                            desc: 'Every deliverable, approval, and payment is timestamped and logged. A clear record both parties can refer back to at any time.'
                        },
                        {
                            icon: '💰',
                            title: 'Milestone-Based Payments',
                            desc: 'Link payments directly to deliverables. Everyone knows what triggers payment and when it is due — no surprises on either side.'
                        },
                        {
                            icon: '🔗',
                            title: 'Shareable Project View',
                            desc: 'Share a read-only project link with your client. They see real-time progress without needing an account.'
                        },
                        {
                            icon: '📊',
                            title: 'Project Dashboard',
                            desc: 'Active projects, upcoming milestones, and payment status — all visible at a glance so nothing slips through the cracks.'
                        },
                        {
                            icon: '🛡️',
                            title: 'Private by Design',
                            desc: 'Your project data is yours alone. Isolated per user, never shared, never monetised. You stay in full control.'
                        },
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
                    <p className="text-text-secondary text-sm">Simple to set up. Valuable from day one.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            step: '1',
                            title: 'Define the Scope',
                            desc: 'Create a project, log requirements, and set milestones with clear deliverables and payment amounts — before work begins.'
                        },
                        {
                            step: '2',
                            title: 'Deliver Transparently',
                            desc: 'Upload deliverables against each milestone. Share a live project view with your client so they follow progress in real time.'
                        },
                        {
                            step: '3',
                            title: 'Close With Confidence',
                            desc: 'Record payments against completed milestones. Wrap every project with a clear, documented record of what was done and paid.'
                        },
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
                    <h2 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-3">
                        Projects Work Better When Everyone Is Aligned
                    </h2>
                    <p className="text-[#8A8FA3] text-sm mb-7 max-w-md mx-auto">
                        Start your first project in minutes. No credit card required. 
                        Free to use while in active development.
                    </p>
                    <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-br from-accent to-[#D4953A] text-primary shadow-[0_4px_14px_rgba(229,168,75,0.25)] hover:shadow-[0_8px_24px_rgba(229,168,75,0.35)] hover:-translate-y-0.5 transition-all">
                        Create Your Free Account →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-7 text-center text-text-muted text-xs space-x-4">
                <span>© 2026 PromiseLane. Clarity for every project.</span>
                <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                <Link to="/feedback" className="hover:underline">Feedback</Link>
            </footer>

        </div>
    );
}