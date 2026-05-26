import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Wallet, Calendar, CheckCircle2, Clock, FileText, Circle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const publicApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: { 'Content-Type': 'application/json' },
});

const statusIcon = (status) => {
    switch (status) {
        case 'agreed':
        case 'delivered':
            return <CheckCircle2 size={13} className="text-success" />;
        case 'requested':
        case 'in_progress':
            return <Clock size={13} className="text-accent" />;
        case 'pending_clarification':
            return <AlertCircle size={13} className="text-danger" />;
        default:
            return <Circle size={13} className="text-text-muted" />;
    }
};

export default function ShareView() {
    const { token } = useParams();
    const [project, setProject] = useState(null);
    const [milestones, setMilestones] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('Milestones:', milestones);
console.log('First milestone:', milestones[0]);
console.log('Requirements:', milestones[0]?.requirements);
        publicApi
            .get(`/share/${token}`)
            .then((res) => {
                const { project, milestones, timeline } = res.data.data;
                setProject(project);
                setMilestones(milestones || []);
                setTimeline(timeline || []);
                if (milestones && milestones.length > 0) {
                    setSelectedMilestone(milestones[0]);
                }
            })
            .catch(() => setError('This share link is invalid or has been revoked.'))
            .finally(() => setLoading(false));
    }, [token]);

    const totalMilestones = milestones.length;
    const completedMilestones = milestones.filter((m) => ['approved', 'paid'].includes(m.status)).length;
    const progressPct = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
    const totalAmount = Number(project?.total_amount) || 0;
    const totalPaid = milestones.reduce((sum, m) => (m.status === 'paid' ? sum + Number(m.amount) : sum), 0);
    const paymentPct = totalAmount > 0 ? Math.round((totalPaid / totalAmount) * 100) : 0;

    const donutRadius = 40;
    const donutCircumference = 2 * Math.PI * donutRadius;
    const donutOffset = donutCircumference - (paymentPct / 100) * donutCircumference;

    const filteredRequirements =
        selectedMilestone?.requirements || [];

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-accent border-r-transparent"></div>
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FileText size={28} className="text-danger" />
                    </div>
                    <p className="text-text font-semibold mb-1">Link Unavailable</p>
                    <p className="text-sm text-text-muted mb-4">{error}</p>
                    <Link to="/" className="text-accent text-sm font-semibold hover:underline">
                        Go to PromiseLane →
                    </Link>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-accent to-accent-soft rounded-xl flex items-center justify-center font-bold text-sm text-primary shadow-lg shadow-accent/20">
                            P
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-text">PromiseLane</p>
                            <p className="text-[10px] text-text-muted">Shared Project View</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-text-muted uppercase tracking-wider">Shared by</p>
                        <p className="text-sm font-semibold text-text">Freelancer</p>
                    </div>
                    <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${project?.status === 'active' ? 'bg-success/10 text-success' : 'bg-border/50 text-text-muted'}`}
                    >
                        ● {project?.status}
                    </span>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Top Row — Project Overview + Payment Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
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
                                    <circle cx="50" cy="50" r={donutRadius} fill="none" stroke="url(#donutGrad)" strokeWidth="10" strokeDasharray={donutCircumference} strokeDashoffset={donutOffset} strokeLinecap="round" className="transition-all duration-700" />
                                    <defs>
                                        <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#E5A84B" />
                                            <stop offset="100%" stopColor="#F5D68A" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-bold text-accent">{paymentPct}%</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-text mb-1">₹{totalPaid.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-text-muted mb-5">of ₹{totalAmount.toLocaleString('en-IN')} total</p>
                        <div className="space-y-3">
                            {milestones.map((m) => {
                                const paid = m.status === 'paid' ? Number(m.amount) : 0;
                                const barPct = Number(m.amount) > 0 ? Math.round((paid / Number(m.amount)) * 100) : 0;
                                return (
                                    <div key={m.id}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-text-secondary truncate">{m.title}</span>
                                            <span className="font-semibold text-text ml-2">₹{paid.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="h-2 bg-border rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-success to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${barPct}%` }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Milestones + Requirements */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                    {/* Milestone Tabs */}
                    <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
                        <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                            <span className="w-1 h-4 bg-accent rounded-full"></span> Milestones
                        </h3>
                        <div className="space-y-1">
                            {milestones.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => setSelectedMilestone(m)}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm ${
                                        selectedMilestone?.id === m.id ? 'bg-accent/8 border border-accent/20 font-semibold text-text' : 'hover:bg-bg text-text-secondary'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${m.status === 'paid' ? 'bg-success' : m.status === 'in_progress' || m.status === 'delivered' ? 'bg-accent' : 'bg-border'}`}></span>
                                        <span className="truncate">{m.title}</span>
                                    </div>
                                    <div className="text-[10px] text-text-muted mt-0.5 ml-4">₹{Number(m.amount).toLocaleString('en-IN')}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Requirements Panel */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm p-6">
                        {selectedMilestone ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-primary">Requirements — {selectedMilestone.title}</h3>
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${selectedMilestone.status === 'paid' ? 'bg-success/10 text-success' : selectedMilestone.status === 'in_progress' ? 'bg-accent/10 text-accent' : 'bg-border/30 text-text-muted'}`}>
                                        ● {selectedMilestone.status?.replace('_', ' ')}
                                    </span>
                                </div>

                                {filteredRequirements.length === 0 ? (
                                    <div className="text-center py-10 border border-dashed border-border rounded-xl">
                                        <FileText size={22} className="mx-auto mb-2 text-text-muted opacity-30" />
                                        <p className="text-xs text-text-muted">No requirements for this milestone</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                                        {filteredRequirements.map((req) => (
                                            <div key={req.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-bg border border-border">
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    {statusIcon(req.status)}
                                                    <span className="text-sm text-text truncate">{req.content}</span>
                                                </div>
                                                <span className={`ml-3 text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${req.status === 'agreed' ? 'bg-success/10 text-success' : req.status === 'requested' ? 'bg-accent/10 text-accent' : req.status === 'pending_clarification' ? 'bg-danger/10 text-danger' : 'bg-border/30 text-text-muted'}`}>
                                                    {req.status?.replace('_', ' ')}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <FileText size={28} className="mx-auto mb-2 text-text-muted opacity-30" />
                                <p className="text-sm text-text-muted">Select a milestone to view requirements</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-6 border-t border-border">
                    <div className="inline-flex items-center gap-2 text-text-muted">
                        <div className="w-5 h-5 bg-gradient-to-br from-accent to-accent-soft rounded-md flex items-center justify-center font-bold text-[10px] text-primary">P</div>
                        <span className="text-xs">
                            Shared via{' '}
                            <Link to="/" className="text-accent hover:underline font-semibold">
                                PromiseLane
                            </Link>{' '}
                            — From promise to payment.
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}