import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FolderKanban, Wallet, Clock, AlertTriangle, Plus, ArrowRight, FileText, Target, CheckCircle, DollarSign } from 'lucide-react';
import api from '../api/axios';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 17) setGreeting('Good afternoon');
        else setGreeting('Good evening');

        api.get('/dashboard')
            .then((res) => setStats(res.data.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const activityIcon = (type) => {
        const props = { size: 14, color: '#0D9488' };
        switch (type) {
            case 'payment_recorded': return <DollarSign {...props} />;
            case 'project_created': return <FolderKanban {...props} />;
            case 'milestone_created': return <Target {...props} />;
            case 'milestone_status_updated': return <CheckCircle {...props} />;
            default: return <FileText {...props} />;
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 40%, #F0FDFA 100%)' }}>
            <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 mx-auto mb-3" style={{ borderColor: '#0D9488', borderRightColor: 'transparent' }}></div>
                <p className="text-sm" style={{ color: '#A8A29E' }}>Loading your workspace...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 40%, #F0FDFA 100%)' }}>
            <main className="max-w-7xl mx-auto px-4 py-4">
                {/* Welcome */}
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0D9488' }}>{greeting}</p>
                    <h1 className="text-2xl font-bold" style={{ color: '#44403C' }}>Here's your overview</h1>
                    <p className="text-sm mt-1" style={{ color: '#A8A29E' }}>Track your projects, payments, and client commitments — all in one place.</p>
                </div>

                {stats && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {[
                                { label: 'Active Projects', value: stats.active_projects, Icon: FolderKanban, color: '#0D9488' },
                                { label: 'Total Earned', value: `₹${Number(stats.total_earned).toLocaleString('en-IN')}`, Icon: Wallet, color: '#10B981' },
                                { label: 'Pending Payments', value: `₹${Number(stats.pending_payments).toLocaleString('en-IN')}`, Icon: Clock, color: '#F59E0B' },
                                { label: 'Overdue', value: stats.overdue_milestones, Icon: AlertTriangle, color: '#EF4444' },
                            ].map((stat, i) => (
                                <div key={i}
                                    className="rounded-xl p-5 border transition-all duration-200 hover:-translate-y-0.5"
                                    style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E6E1' }}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '15' }}>
                                            <stat.Icon size={18} color={stat.color} />
                                        </div>
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stat.color }}></div>
                                    </div>
                                    <p className="text-2xl font-bold mb-0.5" style={{ color: stat.color }}>{stat.value}</p>
                                    <p className="text-xs font-medium" style={{ color: '#A8A29E' }}>{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Two Column */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            {/* Recent Activity */}
                            <div className="lg:col-span-2 rounded-xl p-6 border" style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E6E1' }}>
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-sm font-semibold" style={{ color: '#44403C' }}>Recent Activity</h2>
                                    <Link to="/projects" className="inline-flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: '#0D9488' }}>
                                        View all <ArrowRight size={12} />
                                    </Link>
                                </div>

                                {stats.recent_activity?.length > 0 ? (
                                    <div className="space-y-0">
                                        {stats.recent_activity.slice(0, 5).map((event, i) => (
                                            <div key={event.id} className="flex items-start gap-3 py-2.5 rounded-lg transition-colors">
                                                <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#0D9488' + '12' }}>
                                                    {activityIcon(event.event_type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate" style={{ color: '#44403C' }}>{event.title}</p>
                                                    <p className="text-xs mt-0.5" style={{ color: '#A8A29E' }}>
                                                        {event.user_name} · {new Date(event.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-2xl mb-2">📋</div>
                                        <p className="text-sm font-medium" style={{ color: '#78716C' }}>No activity yet</p>
                                        <p className="text-xs mt-1" style={{ color: '#A8A29E' }}>Create your first project to get started.</p>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-4">
                                <Link to="/projects"
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-white rounded-xl transition-all font-semibold text-sm hover:-translate-y-0.5"
                                    style={{ backgroundColor: '#0D9488', boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)' }}>
                                    <Plus size={16} /> New Project
                                </Link>

                                <div className="rounded-xl p-5 border" style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E6E1' }}>
                                    <h3 className="text-xs font-semibold mb-3" style={{ color: '#44403C' }}>QUICK STATS</h3>
                                    <div className="space-y-2.5">
                                        <div className="flex justify-between text-sm">
                                            <span style={{ color: '#A8A29E' }}>Upcoming Deadlines</span>
                                            <span className="font-semibold" style={{ color: '#44403C' }}>{stats.upcoming_deadlines || 0}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span style={{ color: '#A8A29E' }}>Total Projects</span>
                                            <span className="font-semibold" style={{ color: '#44403C' }}>{stats.active_projects || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl p-4 border" style={{ backgroundColor: '#F59E0B' + '14', borderColor: '#F59E0B' + '30' }}>
                                    <p className="text-xs font-semibold" style={{ color: '#92400E' }}>💡 Pro Tip</p>
                                    <p className="text-xs mt-1 leading-relaxed" style={{ color: '#A16207' }}>
                                        Share your project timeline with clients via a read-only link. No login required.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}