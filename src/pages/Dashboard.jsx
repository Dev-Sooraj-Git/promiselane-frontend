import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FolderKanban, Wallet, Clock, AlertTriangle, Plus, ArrowRight, DollarSign, Target, CheckCircle, FileText } from 'lucide-react';
import api from '../api/axios';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ActivityItem from '../components/ui/ActivityItem';

export default function Dashboard() {
    const { user } = useAuth();
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
        switch (type) {
            case 'payment_recorded': return DollarSign;
            case 'project_created': return FolderKanban;
            case 'milestone_created': return Target;
            case 'milestone_status_updated': return CheckCircle;
            default: return FileText;
        }
    };

    const activityColor = (type) => {
        switch (type) {
            case 'payment_recorded': return '#2D8A6E';
            case 'milestone_status_updated': return '#2D8A6E';
            default: return '#E5A84B';
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-bg">
            <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 mx-auto mb-3 border-accent border-r-transparent"></div>
                <p className="text-sm text-text-muted">Loading your workspace...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Welcome */}
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">{greeting}</p>
                <h1 className="text-2xl font-bold text-text">Here's your overview</h1>
                <p className="text-sm text-text-secondary mt-1">Track your projects, payments, and client commitments — all in one place.</p>
            </div>

            {stats && (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard icon={FolderKanban} value={stats.active_projects} label="Active Projects" color="#E5A84B" />
                        <StatCard icon={Wallet} value={`₹${Number(stats.total_earned).toLocaleString('en-IN')}`} label="Total Earned" color="#2D8A6E" />
                        <StatCard icon={Clock} value={`₹${Number(stats.pending_payments).toLocaleString('en-IN')}`} label="Pending Payments" color="#E5A84B" />
                        <StatCard icon={AlertTriangle} value={stats.overdue_milestones} label="Overdue" color="#D14343" />
                    </div>

                    {/* Two Column */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Recent Activity */}
                        <Card className="lg:col-span-2" padding="p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-sm font-semibold text-text">Recent Activity</h2>
                                <Link to="/projects" className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
                                    View all <ArrowRight size={12} />
                                </Link>
                            </div>

                            {stats.recent_activity?.length > 0 ? (
                                <div className="space-y-0">
                                    {stats.recent_activity.slice(0, 5).map((event) => (
                                        <ActivityItem
                                            key={event.id}
                                            icon={activityIcon(event.event_type)}
                                            title={event.title}
                                            name={event.user_name}
                                            date={new Date(event.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            color={activityColor(event.event_type)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-2xl mb-2">📋</div>
                                    <p className="text-sm font-medium text-text-secondary">No activity yet</p>
                                    <p className="text-xs text-text-muted mt-1">Create your first project to get started.</p>
                                </div>
                            )}
                        </Card>

                        {/* Sidebar Actions */}
                        <div className="space-y-4">
                            <Link to="/projects">
                                <Button variant="primary" fullWidth>
                                    <Plus size={16} /> New Project
                                </Button>
                            </Link>

                            <Card padding="p-5">
                                <h3 className="text-xs font-semibold text-text mb-3">QUICK STATS</h3>
                                <div className="space-y-2.5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">Upcoming Deadlines</span>
                                        <span className="font-semibold text-text">{stats.upcoming_deadlines || 0}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">Total Projects</span>
                                        <span className="font-semibold text-text">{stats.active_projects || 0}</span>
                                    </div>
                                </div>
                            </Card>

                            <div className="rounded-xl p-4 border bg-accent/5 border-accent/15">
                                <p className="text-xs font-semibold text-[#8B6914]">💡 Pro Tip</p>
                                <p className="text-xs mt-1 leading-relaxed text-[#A16207]">
                                    Share your project timeline with clients via a read-only link. No login required.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}