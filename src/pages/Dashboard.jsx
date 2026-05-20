import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/dashboard')
            .then((res) => setStats(res.data.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-indigo-600">PromiseLane</h1>
                        <p className="text-xs text-slate-500">From promise to payment. All in one place.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-600">Hello, {user?.name}</span>
                        <button onClick={handleLogout}
                            className="text-sm text-slate-500 hover:text-red-600 transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {stats && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <p className="text-sm text-slate-500 mb-1">Active Projects</p>
                                <p className="text-3xl font-bold text-indigo-600">{stats.active_projects}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <p className="text-sm text-slate-500 mb-1">Total Earned</p>
                                <p className="text-3xl font-bold text-emerald-600">₹{stats.total_earned}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <p className="text-sm text-slate-500 mb-1">Pending Payments</p>
                                <p className="text-3xl font-bold text-amber-600">₹{stats.pending_payments}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <p className="text-sm text-slate-500 mb-1">Overdue Milestones</p>
                                <p className="text-3xl font-bold text-red-500">{stats.overdue_milestones}</p>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="mb-8">
                            <Link to="/projects"
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                                📁 My Projects
                            </Link>
                        </div>

                        {/* Recent Activity */}
                        {stats.recent_activity?.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h2>
                                <div className="space-y-3">
                                    {stats.recent_activity.map((event) => (
                                        <div key={event.id} className="flex gap-3 items-start border-b border-slate-100 pb-3 last:border-0">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-indigo-400 flex-shrink-0"></div>
                                            <div>
                                                <p className="text-sm text-slate-700">{event.title}</p>
                                                <p className="text-xs text-slate-400">
                                                    {event.user_name} — {new Date(event.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}