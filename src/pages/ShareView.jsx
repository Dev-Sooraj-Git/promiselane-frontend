import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Wallet, Calendar, FileText } from 'lucide-react';
import axios from 'axios';

const publicApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: { 'Content-Type': 'application/json' },
});

export default function ShareView() {
    const { token } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        publicApi.get(`/share/${token}`)
            .then((res) => setProject(res.data.data))
            .catch(() => setError('This share link is invalid or has been revoked.'))
            .finally(() => setLoading(false));
    }, [token]);

    const totalAmount = Number(project?.total_amount) || 0;
    const totalMilestones = project?.milestones_total || 0;
    const completedMilestones = project?.milestones_completed || 0;
    const progressPct = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

    // Donut chart values
    const donutRadius = 40;
    const donutCircumference = 2 * Math.PI * donutRadius;
    const donutOffset = donutCircumference - (progressPct / 100) * donutCircumference;

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-accent border-r-transparent"></div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
            <div className="text-center max-w-sm">
                <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText size={28} className="text-danger" />
                </div>
                <p className="text-text font-semibold mb-1">Link Unavailable</p>
                <p className="text-sm text-text-muted mb-4">{error}</p>
                <Link to="/" className="text-accent text-sm font-semibold hover:underline">Go to PromiseLane →</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-accent to-accent-soft rounded-xl flex items-center justify-center font-bold text-sm text-primary shadow-lg shadow-accent/20">P</div>
                        <div>
                            <p className="text-sm font-semibold text-text">PromiseLane</p>
                            <p className="text-[10px] text-text-muted">Shared Project View</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-text-muted uppercase tracking-wider">Shared by</p>
                        <p className="text-sm font-semibold text-text">Freelancer</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${project?.status === 'active' ? 'bg-success/10 text-success' : 'bg-border/50 text-text-muted'}`}>
                        ● {project?.status}
                    </span>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                {/* Project Overview + Payment Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
                    {/* Project Overview */}
                    <div className="bg-white rounded-2xl border border-border shadow-sm p-7">
                        <h2 className="text-lg font-bold text-primary tracking-tight mb-4">{project?.title}</h2>
                        <div className="flex gap-4 text-sm text-text-secondary mb-5 flex-wrap">
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>{project?.client_name}</span>
                            <span className="flex items-center gap-1.5"><Wallet size={14} />₹{totalAmount.toLocaleString('en-IN')}</span>
                            {project?.started_at && (
                                <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(project.started_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                            )}
                        </div>
                        {/* Status Cards */}
                        <div className="grid grid-cols-3 gap-3 mb-5">
                            <div className="bg-success/5 border border-success/10 rounded-xl p-3 text-center">
                                <p className="text-xl font-bold text-success">{completedMilestones}</p>
                                <p className="text-[10px] text-text-muted mt-0.5">Complete</p>
                            </div>
                            <div className="bg-accent/5 border border-accent/10 rounded-xl p-3 text-center">
                                <p className="text-xl font-bold text-accent">{totalMilestones - completedMilestones}</p>
                                <p className="text-[10px] text-text-muted mt-0.5">Pending</p>
                            </div>
                            <div className="bg-border/20 border border-border rounded-xl p-3 text-center">
                                <p className="text-xl font-bold text-text-muted">{totalMilestones}</p>
                                <p className="text-[10px] text-text-muted mt-0.5">Total</p>
                            </div>
                        </div>
                        {/* Progress bar */}
                        <div>
                            <div className="flex justify-between text-xs text-text-muted mb-1.5">
                                <span>Overall Progress</span>
                                <span className="font-semibold text-accent">{progressPct}%</span>
                            </div>
                            <div className="h-2.5 bg-border rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-accent to-accent-soft rounded-full transition-all duration-700" style={{ width: `${progressPct}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Overview */}
                    <div className="bg-white rounded-2xl border border-border shadow-sm p-7">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-primary tracking-tight">Payment Overview</h2>
                            <div className="relative w-16 h-16">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="#EBEBE8" strokeWidth="10" />
                                    <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="url(#donutGrad)" strokeWidth="10"
                                        strokeDasharray={donutCircumference} strokeDashoffset={donutOffset}
                                        strokeLinecap="round" className="transition-all duration-700" />
                                    <defs>
                                        <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#E5A84B" />
                                            <stop offset="100%" stopColor="#F5D68A" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-bold text-accent">{progressPct}%</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-text mb-1">₹{totalAmount.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-text-muted mb-5">Total project budget</p>
                        <div className="bg-accent/5 border border-accent/10 rounded-xl p-4">
                            <p className="text-xs text-text-secondary">
                                <span className="font-semibold text-accent">{completedMilestones} of {totalMilestones}</span> milestones completed
                            </p>
                            {project?.next_milestone && (
                                <p className="text-xs text-text-muted mt-1">
                                    Next: {project.next_milestone}
                                    {project.next_due_date && ` · Due ${new Date(project.next_due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-6 border-t border-border">
                    <div className="inline-flex items-center gap-2 text-text-muted">
                        <div className="w-5 h-5 bg-gradient-to-br from-accent to-accent-soft rounded-md flex items-center justify-center font-bold text-[10px] text-primary">P</div>
                        <span className="text-xs">Shared via <Link to="/" className="text-accent hover:underline font-semibold">PromiseLane</Link> — From promise to payment.</span>
                    </div>
                </div>
            </main>
        </div>
    );
}