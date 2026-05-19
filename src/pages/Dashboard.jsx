import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    if (loading) return <p>Loading dashboard...</p>;

    return (
        <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Welcome, {user?.name}!</h2>
                <button onClick={handleLogout} style={{ padding: '8px 16px' }}>Logout</button>
            </div>

            {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 24 }}>
                    <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                        <h3>{stats.active_projects}</h3>
                        <p>Active Projects</p>
                    </div>
                    <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                        <h3>₹{stats.total_earned}</h3>
                        <p>Total Earned</p>
                    </div>
                    <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                        <h3>₹{stats.pending_payments}</h3>
                        <p>Pending Payments</p>
                    </div>
                    <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                        <h3>{stats.overdue_milestones}</h3>
                        <p>Overdue Milestones</p>
                    </div>
                </div>
            )}

            {stats?.recent_activity?.length > 0 && (
                <div style={{ marginTop: 32 }}>
                    <h3>Recent Activity</h3>
                    <ul>
                        {stats.recent_activity.map((event) => (
                            <li key={event.id} style={{ marginBottom: 8 }}>
                                <strong>{event.title}</strong>
                                <br />
                                <small>{event.user_name} — {new Date(event.created_at).toLocaleString()}</small>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}